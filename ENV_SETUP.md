# Environment Variables Setup

This document explains how to configure the environment variables required for the quote form email and SMS notifications.

## Required Environment Variables

### RESEND_API_KEY
**Purpose:** Sends the quote notification email through Resend.

**How to get it:**
1. Go to [https://resend.com](https://resend.com) and sign in.
2. Open the **API Keys** section.
3. Click **Create API Key** and copy the generated value.
4. Add to `.env.local`:
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxx
   ```

### RESEND_FROM_EMAIL
**Purpose:** Verified sender address used for outbound quote emails.

**How to set it:**
1. Verify a domain or individual email in Resend.
2. Copy the sender address you want to use (e.g., `noreply@protouchpainting.com`).
3. Add to `.env.local`:
   ```
   RESEND_FROM_EMAIL=noreply@yourdomain.com
   ```

### QUOTE_ALERT_EMAIL
**Purpose:** Destination inbox that receives the incoming quote emails.

**How to set it:**
1. Choose the business email that should receive quote alerts.
2. Add to `.env.local`:
   ```
   QUOTE_ALERT_EMAIL=owner@example.com
   ```

### TEXTBELT_API_KEY
**Purpose:** Authenticates Textbelt when sending the SMS alert to your team.

**How to get it:**
1. Sign in at [https://textbelt.com](https://textbelt.com).
2. Open the **API Keys** area of the dashboard.
3. Copy the active key.
4. Add to `.env.local`:
   ```
   TEXTBELT_API_KEY=xxxxxxxxxxxxxxxxxxxx
   ```

### TEXTBELT_PHONE
**Purpose:** The cell number where the business should receive the SMS alert.

**How to set it:**
1. Use the number that should receive notifications (mobile or SMS-capable).
2. Enter it in E.164 format (`+16025550123`) or standard 10-digit format.
3. Add to `.env.local`:
   ```
   TEXTBELT_PHONE=+16025550123
   ```

## Optional Legacy Twilio Variables

If you still have Twilio-based alerts running elsewhere, keep these values. They are no longer required for the primary quote flow.

| Variable | Purpose |
| --- | --- |
| `TWILIO_ACCOUNT_SID` | Twilio account identifier |
| `TWILIO_AUTH_TOKEN` | Twilio API auth token |
| `TWILIO_PHONE_NUMBER` | Twilio sender number |

## Complete `.env.local` Example

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@yourdomain.com
QUOTE_ALERT_EMAIL=owner@example.com
TEXTBELT_API_KEY=xxxxxxxxxxxxxxxxxxxx
TEXTBELT_PHONE=+16025550123
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxx
TWILIO_PHONE_NUMBER=+1234567890
```

## Vercel Deployment

When deploying to Vercel, add these variables in your project settings:

1. Go to your project in Vercel.
2. Click **Settings → Environment Variables**.
3. Add each variable with the same names and values as your `.env.local`.

## Testing

To validate the configuration locally:
1. Install dependencies: `npm install resend` (Textbelt uses the built-in fetch API; no extra package required).
2. Create your `.env.local` file with the variables above.
3. Start the development server: `npm run dev`.
4. Submit a test quote through the contact form.
5. Confirm you receive both the email and SMS alerts.

## Troubleshooting

- **Email not sending:** Verify the Resend API key is correct and the sender domain is verified.
- **SMS not sending:** Confirm your Textbelt key has credits remaining and the destination phone number is valid.
- **Environment variables not loading:** Ensure `.env.local` is in the project root and restart the dev server after changes.
