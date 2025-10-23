# Quote Email and SMS Flow

This document explains in detail how customer email and phone are handled in the quote request flow: how they’re captured on the frontend, processed by the API, and used to notify the business via email and SMS.

## Frontend Capture

- Fields: `name`, `email`, `phone`, `service`, `message` (email and phone are required).
- Normalization: trims all inputs; lowercases email; leaves phone as typed (no masking or formatting).
  - Code: `src/components/Contact.tsx:30-36`, required check at `src/components/Contact.tsx:38-41`.
- Submission: POSTs JSON to `POST /api/submit-quote`.
  - Code: `src/components/Contact.tsx:46-54`.

## API Handler (`POST /api/submit-quote`)

- Method guard: only accepts POST.
  - Code: `pages/api/submit-quote.ts:8-10`.
- Env preflight: requires email and SMS env vars; responds 500 if missing.
  - Email: `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `QUOTE_ALERT_EMAIL`.
  - SMS: `TEXTBELT_API_KEY`, `TEXTBELT_PHONE`.
  - Code: `pages/api/submit-quote.ts:12-20`.
- Payload validation: requires `name`, `email`, `phone`, `service`; `message` optional.
  - Code: `pages/api/submit-quote.ts:22-26`.

### Email Notification (Resend)

- Client: `Resend` initialized with `RESEND_API_KEY`.
  - Code: `pages/api/submit-quote.ts:5`.
- Injection safety: all user fields escaped; message line breaks -> `<br />`.
  - Code: `pages/api/submit-quote.ts:29-45`.
- Branded HTML email includes Name, Email, Phone, Service, Message, plus a “Reply to Client” mailto button.
  - Template: starts at `pages/api/submit-quote.ts:47`.
- Minified to avoid Gmail clipping.
  - Code: `pages/api/submit-quote.ts:129-133`.
- Send params:
  - `from`: `RESEND_FROM_EMAIL` (verified sender).
  - `to`: `QUOTE_ALERT_EMAIL` (destination team inbox).
  - `replyTo`: customer’s email (enables one‑click reply to the customer).
  - `subject`: "New Quote Request from {name}".
  - Code: `pages/api/submit-quote.ts:134-141`.

Behavior implications:

- Customer email appears in the email body and is set as `replyTo`.
- Customer phone appears in the email body as provided (escaped), no server‑side formatting or validation beyond required presence.

### SMS Alert (Textbelt)

- Purpose: send an alert to the business phone configured in env (not to the customer).
- Sanitization:
  - Replaces URL‑like substrings in the message with `[link removed]` to keep texts clean.
    - Code: `pages/api/submit-quote.ts:145-151`.
  - Obfuscates email for SMS readability (`@` -> `[at]`, `.` -> `[dot]`).
    - Code: `pages/api/submit-quote.ts:152-159`.
- SMS body lines:
  - "New quote request from {name}"
  - "Email: {sanitized email}"
  - "Phone: {raw phone}"
  - "Service: {service}"
  - Optional: "Message: {message}" (truncated to 120 chars)
  - Code: `pages/api/submit-quote.ts:161-171`.
- Delivery: POST to Textbelt with `phone`=`TEXTBELT_PHONE`, `message` as above, `key`=`TEXTBELT_API_KEY`.
  - Code: `pages/api/submit-quote.ts:176-187`.

Behavior implications:

- SMS goes to your business phone (`TEXTBELT_PHONE`), not to the customer.
- Customer email is obfuscated in the SMS; phone is included verbatim for quick call‑back.

## Error Handling and UI Feedback

- SMS failure: API still returns 200 with `smsStatus: 'failed'` and includes an error; the frontend shows a specific “We’ll reach out by email” message.
  - API: `pages/api/submit-quote.ts:204-212`.
  - UI copy key: `public/locales/en/translation.json:173-180` (`contact.form.alerts.smsFailure`).
- Email/env failure: API returns 500 if email/SMS config missing.
  - Code: `pages/api/submit-quote.ts:12-20`.
- Success: returns 200 `{ message, smsStatus }` and the form resets on the frontend.

## Environment Variables

- `RESEND_API_KEY`: Resend API key.
- `RESEND_FROM_EMAIL`: Verified sender address used for outbound quote emails.
- `QUOTE_ALERT_EMAIL`: Destination inbox that receives incoming quote emails.
- `TEXTBELT_API_KEY`: Textbelt API key for SMS.
- `TEXTBELT_PHONE`: Destination phone number for SMS alerts (E.164 or 10‑digit).
- Examples: see `.env.example` and `ENV_SETUP.md` for setup and troubleshooting.

## Current Limitations and Suggestions

- Validation: No strict server‑side email/phone validation. Consider adding `zod`/`validator` and libphonenumber for E.164 normalization.
- Anti‑spam: No CAPTCHA/rate limiting. Consider hCaptcha/Turnstile and lightweight IP‑based throttling.
- Phone formatting: Optionally format phone for display and normalize for consistency.
- Content: Success/error copy is managed via i18n keys; customize in `public/locales/*/translation.json`.

