# Gallery Page Implementation Plan

## Objectives
- Add a prominent `View Our Work` call-to-action button that routes to a new gallery page.
- Deliver a gallery page that reuses the site's global layout (navbar, footer) and includes the existing Contact/Quote form.
- Provide a Back button on the gallery page for quick return to the originating page.
- Showcase S3-hosted project imagery split into Cabinets and House sections, pulling every image under each prefix.

## Preparation
- Confirm the Phoenix Project Gallery section component/file that should host the new `View Our Work` button and note any existing button styles there.
- Locate reusable layout pieces (`Navbar`, `Footer`, shared layout wrapper) and the Contact/Quote form component so they can be imported without duplication.
- Verify the S3 bucket structure that will host gallery assets (`https://protouchgallery.s3.us-east-2.amazonaws.com`) and ensure ListObjects permissions are available for the `Cabinets/` and `House/` prefixes.
- Capture AWS credentials or signed URL approach needed for read-only access; document any environment variables required for listing the bucket.

## Implementation Steps
1. **Create gallery route**: Add `pages/gallery.tsx` (or the equivalent route in the app directory) that wraps content with the shared layout component and sets an SEO-friendly title/description.
2. **Implement S3 data source**:
   - Use the AWS SDK (or a lightweight fetch to a signed JSON manifest) to list all objects under `Cabinets/` and `House/` prefixes.
   - Normalize the response into an array of `{ section, key, src, alt }` objects; store alt text either via naming convention or a manual map.
   - Decide whether to fetch the data at build time (`getStaticProps`), on the server (`getServerSideProps`), or through a Next.js API route depending on credential exposure.
   - For initial QA, confirm Cabinet assets (`buleCabinets.jpg`, `greyCabinets.jpg`, `greyCabinets2.jpg`, `greyCabinets3.jpg`, `whiteCabinets.jpg`) and House assets (`1.JPEG`, `2.JPEG`, `3.JPEG`, `4.JPEG`, `brown.jpg`, `catus.JPEG`, `dreamHouse.jpg`, `grey.jpg`, `greyHouse.jpg`, `greyHouse2.jpg`, `inProgress.jpg`, `nicePool.jpg`, `offWhiteHouse.jpg`, `outsideWorker.jpg`, `outsideWorker2.jpg`, `redLights.jpg`, `tallCeiling.jpg`, `white.jpg`) are returned.
3. **Build gallery content section**:
   - Structure the page content under a top-level `<main>` with accessible headings.
   - Define two subsections (`Cabinets`, `House`) that iterate over the fetched object arrays so every current and future image under those prefixes renders automatically.
   - Implement a responsive grid/list for project images or cards; use existing design tokens/utilities for spacing and typography.
   - Include captions, alt text, or hover states that describe each image; add placeholders if additional content is pending.
4. **Add Back navigation**: Place a `Link`-wrapped button near the top of the gallery page that routes to the originating page (default to `/` if no referrer is stored).
5. **Reuse Contact/Quote form**: Import the existing form component and position it beneath the gallery content with consistent spacing.
6. **Insert CTA button in Phoenix Project Gallery section**:
   - Import `Link` from `next/link`.
   - Render the `View Our Work` button within the Phoenix Project Gallery section using the local button layout/variants.
   - Verify focus styles and mobile behavior.
7. **Update navigation (optional)**: If the gallery should appear in the main nav/footer, add a `Gallery` entry; otherwise ensure the CTA is the primary entry point.

## Validation
- Manually exercise desktop and mobile breakpoints to ensure the gallery grid, buttons, and form layout remain intact.
- Confirm all new links prefetch and navigate correctly, and the Back button returns to the intended page.
- Run the existing lint/test suite (`npm run lint`, `npm run test` if available) to guard against regressions.
- Confirm S3 assets load without CORS issues and that newly uploaded images automatically appear without code changes.
- Validate graceful handling for empty prefixes or failed list calls (e.g., fallback message).
