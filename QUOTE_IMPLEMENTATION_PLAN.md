## Quote Request Delivery Plan

### Goal
Ensure the Quote button routes users to a reliable form submission flow that sends a formatted email notification to the Pro Touch contacts.

### Environment Variables
Set these in your `.env.local` (or hosting provider secrets) before deploying:

| Key | Description | Example |
| --- | --- | --- |
| `RESEND_API_KEY` | Resend API token with email-sending permissions. | `re_xxxxxxxxxxxxxxxxxxxxxxxxx` |
| `RESEND_FROM_EMAIL` | Verified sender address for Resend. | `noreply@protouchpainting.com` |
| `QUOTE_ALERT_EMAIL` | Destination email address for quote alerts. | `jorgeruizpaint@yahoo.com` |

### Implementation Steps

1. **Audit & UX Alignment**
   - Confirm `src/components/Contact.tsx` is the canonical form and that every “Quote” CTA scrolls or routes to it.
   - Verify required fields (`name`, `email`, `phone`, `service`) and optional `message` cover the quoting needs.

2. **Payload & Validation Design**
   - Normalize emails before submission and ensure phone input (if collected) is optional; block empty or malformed email values client-side and server-side.
   - Finalize notification copy: concise intro, bullet-style details, and clear contact info in the email HTML.

3. **Front-End Enhancements**
   - Replace `alert` calls with inline success/error banners and keep the submit button disabled while sending.
   - Add field-level validation feedback and reset the form on success.
   - (Optional) Smooth-scroll the Quote CTA to the form for consistent UX on mobile/desktop.

4. **Backend/API Hardening**
   - Update `pages/api/submit-quote.ts` to pull `RESEND_FROM_EMAIL` and `QUOTE_ALERT_EMAIL` from env vars.
   - Add structured logging for failures and return explicit error messages to the client.
   - Build a single formatted email payload with timestamp, service selected, and contact details for callback.

5. **Validation & Monitoring**
   - Test locally with Resend sandbox/test credentials and inspect console/server logs.
   - Add optional monitoring hooks (e.g., Sentry) or log aggregation to track delivery errors post-deploy.
   - Document fallback steps (e.g., queue requests or show user guidance if email delivery fails).

### Deployment Checklist
- [ ] All environment variables populated in production.
- [ ] Manual form submission tested end-to-end (email received).
- [ ] Error handling verified by forcing API failures (e.g., invalid credentials).
- [ ] Logs/monitoring reviewed to ensure visibility into future issues.
