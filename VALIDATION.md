# Validation and release notes

Validated against the local **production static build**, not a public deployment.

## Passed

- Strict TypeScript check and Vite/React prerender build.
- **46 generated HTML pages:** Home, About, Products, Contact, 41 unique product details and 404.
- **5 unit tests:** all workbook rows and BTS identity retained; multi-term/model/part-number search; OR within facets and AND across facets; URL serialization and unsupported-value handling; WhatsApp Unicode/reserved-character encoding.
- **7 browser tests:** search/filter combinations, removable pills, empty-state reset, URL reload and Back/Forward; all 41 direct detail URLs; catalog/detail content with JavaScript disabled; WhatsApp draft composition with opening stubbed (no real message); mobile menu/dialog and focus return; local image fallback; responsive overflow and automated accessibility.
- The mobile dialog test includes accessible-name verification and an automated accessibility scan while the dialog is open.
- Responsive checks at **320, 390, 768, 1024 and 1440px** across all five main page types. No page-wide horizontal overflow in those checks.
- Automated axe WCAG 2/2.1/2.2 AA tags: no violations in the tested resting pages or open mobile filter dialog. This is not an accessibility certification.
- Static-output check: exactly one title and H1 per HTML file, all generated local asset/navigation targets exist, sitemap contains 45 public routes and excludes 404.
- Screenshot round: all five page types at 1440px desktop and 390px mobile, with fonts and lazy images loaded. Render checks found no unloaded images or horizontal overflow. Affected views were recaptured after review fixes.
- Impeccable detector: returned `[]`. Independent visual review requested two corrections (dialog accessible name and placement of product-family metadata); both were fixed, recaptured and scored resolved. Final disposition: **ship within the reviewed scope**, not production-readiness certification.

## Lighthouse

Final local Chromium Lighthouse mobile run, default simulated mobile throttling, homepage served by a plain local static server:

| Category | Score |
| --- | --- |
| Performance | 99 |
| Accessibility | 100 |
| Best practices | 100 |
| SEO | 100 |

Measured FCP 1.1s, LCP 1.1s, total blocking time 0ms, CLS 0.082. Scores vary with host, cache, device, network and Lighthouse version. These are local lab results, not production field measurements. Raw report: `.impeccable/review/lighthouse.json`.

## Before public deployment

- Confirm the brochure number **+966 56 370 2823** is the intended WhatsApp account. Registration and message delivery were not verified; no enquiry was sent. `whatsappVerified` remains false in company JSON.
- Confirm the brochure-derived canonical origin **https://www.ososalbenaa.com**. Change `canonicalOrigin` or set `SITE_URL` and rebuild if deploying to another domain.
- **13 products intentionally use fallback images.** 28 have source-matched brochure illustrations. Add approved product photographs/illustrations through product JSON as they become available.
- The hero is AI-generated, visibly labeled illustrative, and is not a verified OBC facility. Image provenance and original generation prompt are recorded.
- Certification/entity details have not been independently verified; certification claims and the full private brochure are not published.
- Only English is shipped. JSON separation supports future localization work; translated routes, RTL and a CMS have not been implemented or claimed.
- Static hosting must serve directory index files and map missing URLs to `404.html`. HTTPS, compression, cache headers and real-device/assistive-technology checks belong to the production host/release process.

These checks do not constitute a production deployment. See Git history for source publication and README.md for build/deployment and data editing instructions.
