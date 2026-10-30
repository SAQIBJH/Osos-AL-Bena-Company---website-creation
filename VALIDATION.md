# Validation and release notes

Validated against the local **production static build**, not a public deployment.

## Passed

- Strict TypeScript check and Vite/React prerender build.
- **46 generated HTML pages:** Home, About, Products, Contact, 41 unique product details and 404.
- **5 unit tests:** all workbook rows and BTS identity retained; multi-term/model/part-number search; OR within facets and AND across facets; URL serialization and unsupported-value handling; WhatsApp Unicode/reserved-character encoding.
- **8 browser tests:** search/filter combinations, removable pills, empty-state reset, URL reload and Back/Forward; all 41 direct detail URLs; catalog/detail content with JavaScript disabled; WhatsApp draft composition with opening stubbed (no real message); mobile menu/dialog and focus return; local image fallback; responsive overflow and automated accessibility; full-width overlay hero colors/blur, manual slider wrapping, inactive-image deferral and initial HTML without JavaScript.
- The mobile dialog test includes accessible-name verification and an automated accessibility scan while the dialog is open.
- Responsive checks at **320, 390, 768, 1024 and 1440px** across all five main page types. No page-wide horizontal overflow in those checks.
- Automated axe WCAG 2/2.1/2.2 AA tags: no violations in the tested resting pages or open mobile filter dialog. This is not an accessibility certification.
- Static-output check: exactly one title and H1 per HTML file, all generated local asset/navigation targets exist, sitemap contains 45 public routes and excludes 404.
- Current screenshots: `.impeccable/review/option-b/`. Screenshot round: all five page types at 1440px desktop and 390px mobile, with fonts and lazy images loaded. Render checks found no unloaded images or horizontal overflow. Affected views were recaptured after review fixes.
- Impeccable detector: returned `[]`. Independent visual review requested two corrections (dialog accessible name and placement of product-family metadata); both were fixed, recaptured and scored resolved. Final disposition: **ship within the reviewed scope**, not production-readiness certification.

## Lighthouse

Current Option B local Chromium Lighthouse mobile run, default simulated mobile throttling, homepage served by a plain uncompressed local static server:

| Category | Score |
| --- | --- |
| Performance | 81 |
| Accessibility | 100 |
| Best practices | 100 |
| SEO | 100 |

Measured FCP 1.1s, LCP 4.9s, total blocking time 0ms, CLS 0.080. The full-width hero is now the largest contentful element; this is a mobile lab-performance regression from the prior text-led layout despite responsive AVIF, first-image priority and deferred inactive imagery. Verify compression/cache settings and field performance on the actual production host; no production performance score is claimed. Scores vary with host, cache, device, network and Lighthouse version. These are local lab results, not production field measurements. Raw report: `.impeccable/review/option-b/lighthouse.json`.

## Before public deployment

- Confirm the brochure number **+966 56 370 2823** is the intended WhatsApp account. Registration and message delivery were not verified; no enquiry was sent. `whatsappVerified` remains false in company JSON.
- Confirm the brochure-derived canonical origin **https://www.ososalbenaa.com**. Change `canonicalOrigin` or set `SITE_URL` and rebuild if deploying to another domain.
- **13 products intentionally use fallback images.** 28 have source-matched brochure illustrations. Add approved product photographs/illustrations through product JSON as they become available.
- Both hero scenes are AI-generated, visibly labeled illustrative, and are not verified OBC facilities. Image provenance and original generation prompt are recorded.
- Certification/entity details have not been independently verified; certification claims and the full private brochure are not published.
- Only English is shipped. JSON separation supports future localization work; translated routes, RTL and a CMS have not been implemented or claimed.
- Static hosting must serve directory index files and map missing URLs to `404.html`. HTTPS, compression, cache headers and real-device/assistive-technology checks belong to the production host/release process.

These checks do not constitute a production deployment. See Git history for source publication and README.md for build/deployment and data editing instructions.

## Option B refinement review

Approved red-led Option B, with the user-requested full-width hero exception, is implemented. White overlay text, red primary/white secondary CTAs, 1.5px blur with a solid dark readability overlay, native manual slide controls and a polite slide count were verified. Separate boxed panels and subtle product-card shadows were reviewed at desktop/mobile sizes. Independent visual review returned ship for the requested scope, then confirmed the AVIF/on-demand-loading refinement. No production deployment, real WhatsApp delivery, or mobile field-performance result was verified.
