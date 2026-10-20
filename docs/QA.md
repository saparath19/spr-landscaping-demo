> **V2 status (2026-10-20):** The build and browser evidence below was produced for the original V1 delivery and does **not** certify V2. For V2 see `V2_RELEASE_NOTES.md`, run `python tests/v2_static_audit.py`, then `npm run check`, `npm run build`, and `node tests/qa.mjs` with Node 24 and Chrome on your machine. The current environment could not install dependencies offline or navigate a local test page in Chromium.

# QA results — 2026-10-18

Environment: Windows, Node 24.21, npm 11.19, Astro 7.4.0, locally installed Google Chrome driven by Playwright. Tested production static build at http://127.0.0.1:4321.

- `npm run check`: zero TypeScript/Astro errors, warnings or hints.
- `npm run build`: successful; 10 generated pages including 404 and three project-detail pages.
- Dependency audit after updating Astro: zero reported vulnerabilities (289 packages audited at install time).
- Nine content routes checked at 1440, 390 and 320px: HTTP 200, image decode succeeds, one H1 per page, no horizontal overflow.
- axe checks using WCAG 2 A/AA and WCAG 2.1 AA tags: zero automated violations across the 27 route/viewport combinations. This does not certify full accessibility conformance.
- Menu opens and closes; Escape closes and restores focus. Before/after range responds to keyboard. Gallery filters to one Hardscape concept and restores all three. Service query parameter preselects the correct option.
- Valid sample form submission shows a truthful confirmation and clears inputs. Observed zero submission network requests and zero local/session storage entries. With JavaScript disabled the submit button remains disabled.
- Homepage internal links resolve. No browser JavaScript errors observed.
- Visual inspection: full-page desktop/mobile screenshots reviewed; corrected a black fill in the comparison illustration and improved hardscape photo relevance. SVG comparison is explicitly illustrative, not a construction result.
- Reduced-motion preference used throughout the main regression run; GSAP only activates under no-preference. CSS transitions and smooth scrolling disabled for reduced-motion users. Content remains present without animation.

Evidence: `qa-results.json` and `screenshots/`. Reproduce with preview server running, then `node tests/qa.mjs`.

Performance design: static HTML, a shared small browser module for menu and GSAP, local system fonts, 640/1280/1920 WebP sources, responsive sizes, high-priority hero and lazy secondary images. No analytics or third-party requests at runtime. Images were compressed locally before the final build. No measured Lighthouse, Core Web Vitals, screen-reader, Safari/iOS, real touch-device or deployed-edge performance score is claimed. Validate these before a real business launch.

Portfolio is intentionally noindex through HTML metadata, robots.txt and Cloudflare headers. Canonical/Open Graph origin defaults to example.com until SITE_URL is configured. No fabricated LocalBusiness entity, reviews, address or ratings schema is emitted. No backend or public deployment was created.

Supplemental focused checks also passed: normal-motion GSAP content visibility, invalid/incomplete form submission blocked without requests, mobile navigation with JavaScript disabled, and an unknown URL returning HTTP 404. Evidence: supplemental-qa.json. Reproduce with node tests/supplemental.mjs.
