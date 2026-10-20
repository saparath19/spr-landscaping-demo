# SPR Web Studio — Demo #1 — V2 Premium Editorial Refresh

Date: 2026-10-20. Source update **only**; not yet pushed to GitHub or deployed.

## What changed

- Landing-page skill patterns: stronger above-the-fold value proposition, primary/secondary CTA distinction, feature-to-benefit copy, intent-driven section labels, clear demo disclosure.
- Landscape-led hero replaces the original house/pool lead photo and includes a framed hardscaping inspiration image on desktop. Original licensed stock photo sources are retained.
- Premium editorial CSS in `src/styles/premium-v2.css`, responsive title sizes, typography and contrast adjustments, richer photo framing, polished Before/After controls, gentle entrance/reveal animation only when user has not requested reduced motion.
- Portfolio concept images have different crops and color grading, making the home page less visually repetitive without pretending these are new client projects.
- Added botanical and paving details to the **fictional** `after.svg` illustration. Before/after is still an illustration, not photographic evidence of a completed job.
- The default site origin now matches the already established `https://spr-landscaping-demo.pages.dev`. Set SITE_URL explicitly if migrating.

## Applied Skills from Skills(5).zip

- `09-sales-page-landing-page/hero-section.SKILL.md`
- `09-sales-page-landing-page/headline-bank-20.SKILL.md`
- `09-sales-page-landing-page/cta-block.SKILL.md`
- `09-sales-page-landing-page/feature-benefit.SKILL.md`
- `09-sales-page-landing-page/sales-page-service.SKILL.md`
- `27-seo-blog-website-content/website-design.SKILL.md`
- `27-seo-blog-website-content/mobile-seo.SKILL.md`

These are conceptual checklists, not instructions overriding the user or proof of actual conversions. No invented testimonials, prices, business achievements, or urgency claims added.

## Deployment using GitHub Desktop

1. Back up your cloned repo `spr-landscaping-demo` or create a temporary feature branch (`Branch > New branch`).
2. Extract the **Patch ZIP** directly *into the root* of that cloned repo (same level as `package.json`), replacing named files. Do not create an extra nested folder.
3. Use GitHub Desktop to review Changes. Commit message: `Refresh demo landing page V2`.
4. Push to GitHub. Cloudflare Pages connected to `main` should deploy the next build automatically. If using a feature branch, review Cloudflare preview before merging to `main`.
5. Inspect production desktop and mobile, gallery cards, comparison slider, all CTAs and contact demo. Check build logs if deploy fails.

## Verification notes

- XML of both SVG comparison images parsed successfully.
- All V2 image sizes/files and static source references checked by the local audit script.
- **Astro build and browser screenshots NOT independently verified in this execution environment:** Node is 22.16.0, below Astro 7.4's required >=22.22.0, and the package registry is unavailable; installed Chromium blocks local navigation by administrator policy. Use your Windows Node 24.21 installation or Cloudflare's Node 24.21 builder for the required build and browser checks.
- The design intentionally remains `noindex` and the contact form remains a local **demo with no backend**.

## Work still recommended before selling

- Review on actual iPhone/Android devices (360px, 390px, 768px, desktop); run Lighthouse and axe audits on the deployment.
- For photographic before/after claims, replace both conceptual SVGs with one *genuine documented pair*, with owner permission, and update labels; never misrepresent stock as real jobs.
- Before making a client's website live, integrate a secure contact backend and real privacy notice, verify right to use client photos, obtain approval, and remove demo disclosures only when their business is real.
