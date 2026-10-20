# SPR Web Studio — Demo #1

Premium landscaping/hardscaping portfolio website. **Alder & Stone is fictional.** Photography is licensed stock inspiration; project narratives are fictional concepts. No backend, analytics, fabricated testimonials, staff, awards, metrics or real service offer.

## Run locally

Node.js 22.12+ (tested with Node 24.21), npm.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:4321. For a production preview:

```sh
npm run check
npm run build
npm run preview
```

On Windows PowerShell, use `npm.cmd` if execution policy blocks `npm.ps1`. Set `ASTRO_TELEMETRY_DISABLED=1` if desired. Do not disable certificate validation on normal installations; this workstation required a command-scoped workaround for its proxy, which is not saved in the project.

## Stack and structure

Astro 7.4, Tailwind CSS 4 via its Vite plugin, TypeScript strict, GSAP. Static HTML, no hydration framework. Reusable Layout, Photo, CTA, ProjectGrid and BeforeAfter components.

- `src/data/site.ts`: brand and reusable service/project content.
- `src/pages`: Home, Services, About, Projects, Contact, Privacy, three concept details, 404.
- `src/styles/global.css`: design tokens, editorial layouts, responsive and reduced-motion styles.
- `public/images`: local responsive WebP and original comparison SVGs.
- `tests/qa.mjs`: browser regression and axe accessibility checks.
- `docs`: asset rights, skill selection, QA evidence and screenshots.

## Change the brand

1. Update `src/data/site.ts`, then update the logo wordmark in Layout and narrative copy in pages. Search for `Alder`, `Stone`, `fictional`, `demo` to review every disclosure; retain disclosures while this remains a portfolio demo.
2. Change CSS variables `--ink`, `--paper`, `--muted`, `--line`, and Tailwind theme colors in global.css. The design uses local system fonts.
3. Replace images with approved assets in all three sizes (640/1280/1920, 3:2); update alt text and docs/ASSETS.md. Before/after artwork must remain labeled illustration unless replaced with a documented genuine pair.
4. Set `SITE_URL` to your final origin at build time. It defaults to example.com deliberately; this must be changed before deployment so canonical/Open Graph URLs are correct.
5. Run check/build/browser QA after content changes.

## Cloudflare Pages deployment

Deploy the static site without an adapter or server dependency. In Cloudflare Pages connect the source repository, select the project root (or this subdirectory in a monorepo), use `npm run build`, and output directory `dist`. Set `NODE_VERSION=24` and `SITE_URL=https://your-domain.example` in build environment variables. Deploy `dist` by direct upload if preferred. `_headers` is included for Cloudflare security headers. `404.html` prevents an accidental SPA fallback.

No account credentials or public deployment were created in this delivery. Official guide: https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/

## Form behavior

Validation uses native required/email/ZIP/minlength rules. With JavaScript the form shows a local success message and clears fields. It never calls fetch, a remote endpoint, mail, localStorage or sessionStorage. Inline submit prevention and a disabled submit button prevent accidental default submission before script initialization or when JavaScript is disabled. Please enter sample details only.

## Before accepting real leads

- Confirm the real legal brand, service area, phone/contact details, scope, licenses and substantiated claims. Use only authorized project photos and written permission for testimonials.
- Connect a reviewed backend with server validation, request size limits, rate limiting/spam controls, safe email handling, secret storage, access control and a retention/deletion policy. Do not put email-service keys in frontend code. Add explicit collection and consent information; test delivery and error handling.
- Replace Privacy with an accurate notice for actual processing and hosting. Review accessibility manually with keyboard, screen readers and real devices.
- Set the final origin and social share assets. Keep `noindex` and robots disallow for portfolio demos. For an approved real business launch, deliberately change the head robots meta, `_headers` X-Robots-Tag and robots.txt together; add a sitemap and verified LocalBusiness schema only after real facts exist.
- Run field performance checks on the deployed origin and verify cache headers, HTTPS, 404s, forms and search tools. No Lighthouse or Core Web Vitals score is claimed here.

## QA

```sh
npm run check
npm run build
node tests/qa.mjs
```

Browser QA expects the production preview running on port 4321 and an installed Google Chrome (`channel: 'chrome'`). Screenshots and machine-readable results are saved to docs. See docs/QA.md for actual observed results and limitations. Automated axe checks are useful coverage, not a guarantee of complete WCAG conformance.
