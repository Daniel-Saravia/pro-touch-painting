# Pro Touch Painting & Drywall Website

Marketing website for Pro Touch Painting & Drywall, built with Next.js 14 (App Router) and a quote request API.

## Highlights

- Responsive marketing layout with services, testimonials, and calls to action
- English and Spanish copy via i18next with a language toggle
- 3D hero model powered by react-three-fiber and drei
- Gallery page backed by S3 (with a static fallback set of images)
- Quote form that sends email via Resend and SMS alerts via Textbelt
- SEO metadata for key routes

## Tech Stack

- Next.js 14 / React 18 / TypeScript
- CSS Modules and global styles
- i18next + react-i18next
- AWS SDK v3 (S3)
- Resend + Textbelt

## Project Structure

- `src/app` - App Router pages, including `/gallery`
- `pages/api/submit-quote.ts` - Quote submission API
- `src/components` - UI sections and shared components
- `src/lib` - i18n and gallery helpers
- `public/locales` - translation JSON files
- `public/assets` - images and 3D models

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open `http://localhost:3000`.

## Environment Variables

Create a `.env.local` in the project root. For full setup instructions, see `ENV_SETUP.md`.

### Required for quote notifications

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend API key used to send email alerts |
| `RESEND_FROM_EMAIL` | Verified sender address for Resend |
| `QUOTE_ALERT_EMAIL` | Destination inbox for quote alerts |
| `TEXTBELT_API_KEY` | Textbelt API key for SMS alerts |
| `TEXTBELT_PHONE` | Destination phone number for SMS alerts |

### Optional branding

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_NAME` | Overrides the brand name used in quote emails |

### Optional gallery (S3)

These enable live listing of gallery images from S3. If they are not set, the site uses a built-in fallback list that points at the default sample bucket.

| Variable | Purpose |
| --- | --- |
| `GALLERY_BUCKET_NAME` | S3 bucket containing gallery assets |
| `GALLERY_BUCKET_REGION` or `AWS_REGION` | AWS region for the bucket |
| `GALLERY_BUCKET_BASE_URL` | Base URL for image URLs (overrides bucket/region) |
| `GALLERY_CABINETS_PREFIX` | Prefix for cabinet images (default `Cabinets/`) |
| `GALLERY_HOUSE_PREFIX` | Prefix for house images (default `House/`) |
| `AWS_ACCESS_KEY_ID` | AWS credential for S3 listing |
| `AWS_SECRET_ACCESS_KEY` | AWS credential for S3 listing |

Example:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@yourdomain.com
QUOTE_ALERT_EMAIL=owner@example.com
TEXTBELT_API_KEY=xxxxxxxxxxxxxxxxxxxx
TEXTBELT_PHONE=+16025550123
NEXT_PUBLIC_SITE_NAME=Pro Touch Painting & Drywall
```

## Content Updates

- Update copy in `public/locales/en/translation.json` and `public/locales/es/translation.json`.
- Swap images and 3D models in `public/assets`.

## Scripts

- `npm run dev` - Start the dev server
- `npm run build` - Build for production
- `npm run start` - Start the production server
- `npm run lint` - Run Next.js linting

## Deployment

This project is Vercel-ready:

1. Push to GitHub
2. Import into Vercel
3. Add the same environment variables from `.env.local`

## Documentation

- `ENV_SETUP.md` - Detailed environment variable setup
- `docs/QUOTE_EMAIL_PHONE.md` - Quote email/SMS payload and flow

## License

(c) 2025 Pro Touch Painting & Drywall. All rights reserved.
