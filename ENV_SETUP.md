# Environment Variables Setup

This document explains how to set up the required environment variables for the quote form functionality.

## Required Environment Variables

### 1. RESEND_API_KEY
**Purpose:** Used to send email notifications when quotes are submitted.

**How to get it:**
1. Go to [resend.com](https://resend.com)
2. Sign up for a free account
3. Navigate to the API Keys section
4. Click "Create API Key"
5. Copy the generated API key
6. Add to your `.env.local` file:
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxx
   ```

### 2. TWILIO_ACCOUNT_SID
**Purpose:** Your Twilio account identifier for SMS service.

**How to get it:**
1. Go to [twilio.com](https://twilio.com)
2. Sign up for a free account
3. Go to the Twilio Console Dashboard
4. Find your "Account SID" on the dashboard
5. Add to your `.env.local` file:
   ```
   TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxx
   ```

### 3. TWILIO_AUTH_TOKEN
**Purpose:** Authentication token for Twilio API access.

**How to get it:**
1. In the Twilio Console Dashboard
2. Find your "Auth Token" (click the eye icon to reveal it)
3. Add to your `.env.local` file:
   ```
   TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxx
   ```

### 4. TWILIO_PHONE_NUMBER
**Purpose:** The phone number that will send SMS notifications.

**How to get it:**
1. In your Twilio Console
2. Go to "Phone Numbers" → "Manage" → "Buy a number"
3. Purchase a phone number (free trial includes credits)
4. Copy the phone number in E.164 format (e.g., +1234567890)
5. Add to your `.env.local` file:
   ```
   TWILIO_PHONE_NUMBER=+1234567890
   ```

## Complete .env.local Example

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxx
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxx
TWILIO_PHONE_NUMBER=+1234567890
```

## Vercel Deployment

When deploying to Vercel, add these environment variables in your Vercel dashboard:

1. Go to your project in Vercel
2. Click "Settings" → "Environment Variables"
3. Add each variable with the same names and values

## Testing

To test the setup:
1. Install dependencies: `npm install resend twilio`
2. Create your `.env.local` file with the variables above
3. Start your development server: `npm run dev`
4. Submit a test quote through the contact form
5. Check that you receive both email and SMS notifications

## Troubleshooting

- **Email not sending:** Verify your Resend API key is correct and your domain is verified
- **SMS not sending:** Check that your Twilio phone number is verified and you have sufficient credits
- **Environment variables not loading:** Make sure your `.env.local` file is in the root directory and restart your dev server