# Codebase Concerns

**Analysis Date:** 2026-08-10

## Tech Debt

**Post-build output mutation**
- Issue: `package.json` runs `node scripts/clean-faq-rsc.js` and `node scripts/fix-html-lang.js` after `next build`, so the shipped `out/` tree is a patched export rather than the raw Next output.
- Files: `package.json`, `scripts/clean-faq-rsc.js`, `scripts/fix-html-lang.js`, `src/app/layout.tsx`, `src/lib/htmlLang.ts`
- Impact: locale tags, FAQ payload files, and crawler-visible HTML depend on script order and output layout.
- Fix approach: keep locale handling inside the app build where possible, or keep the patch step narrow and enforce it with explicit export checks.

**Locale and routing drift**
- Issue: `src/lib/i18n.ts`, `src/lib/localizedRoutes.ts`, and `src/lib/siteRouting.ts` each derive locale behavior through separate fallback rules, and `src/components/tech-center/data.ts` hardcodes category counts.
- Files: `src/lib/i18n.ts`, `src/lib/localizedRoutes.ts`, `src/lib/siteRouting.ts`, `src/components/tech-center/data.ts`, `src/components/tech-center/TechCenterPage.tsx`
- Impact: a missing or changed env var can shift canonical paths, static params, and `TechCenterPage` counters out of sync.
- Fix approach: centralize default-locale derivation and compute category counts from `TECH_ENTRIES`.

**Synthetic sitemap timestamps**
- Issue: `src/app/sitemap.ts` stamps stable home, price, and FAQ URLs with `new Date()` on every build.
- Files: `src/app/sitemap.ts`
- Impact: sitemap diffs churn on every build and stable pages always appear freshly modified.
- Fix approach: use content-derived timestamps where available and omit `lastModified` on pages that rarely change.

## Known Bugs

**Locale switcher exposes dead routes on zh-only pages**
- Symptoms: switching language from a comparison page or a tech-article page can land on a 404.
- Files: `src/components/header/LangSwitcher.tsx`, `src/app/[lang]/compare/[slug]/page.tsx`, `src/app/[lang]/[section]/[slug]/page.tsx`
- Trigger: `LangSwitcher` offers all locales on every non-FAQ route, while `compare` and tech-article routes only exist for `zh`.
- Workaround: switch locale from home or FAQ pages.
- Safe modification: build the locale menu from per-route availability before rendering it.

**Case studies carousel hydrates differently on mobile**
- Symptoms: the homepage case carousel can jump or warn during hydration on narrow screens.
- Files: `src/components/home/CaseStudies.tsx`
- Trigger: `window.innerWidth` is read during render to choose the slide offset.
- Workaround: none in the current component.
- Safe modification: move breakpoint selection into state or CSS-driven layout rules.

## Security Considerations

**Browser-controlled visitor IDs feed attribution and CRM**
- Risk: `visitor_id` is accepted from `window.location.search`, persisted in `localStorage`, and forwarded into attribution URLs and CRM payloads.
- Files: `src/lib/visitorId.ts`, `src/lib/cloudEntryUrl.ts`, `src/lib/leadAttribution.ts`, `src/app/LeadAttribution.tsx`
- Current mitigation: visitor IDs are length-capped and attribution failures are swallowed so the site keeps working.
- Recommendations: accept signed or server-issued IDs, gate CRM submission behind consent or policy, and whitelist accepted query parameters at the server boundary.

## Performance Bottlenecks

**GitHub stars are fetched twice**
- Problem: `getGitHubStars()` in `src/app/page.tsx` and `src/app/[lang]/page.tsx` hits GitHub during render, and `HomeHeroSection` immediately re-fetches the same API in the browser.
- Files: `src/app/page.tsx`, `src/app/[lang]/page.tsx`, `src/lib/githubStars.ts`, `src/lib/githubStarsClient.ts`, `src/components/home/HomeHeroSection.tsx`
- Cause: both paths use uncached fetches, so each locale page and each first client visit pays an external request.
- Improvement path: cache the server result across locale pages and skip the client refetch unless freshness matters.

**Tech-center rendering scales linearly with content size**
- Problem: 668 markdown articles are read from disk repeatedly for article pages, metadata, last-modified timestamps, and the sitemap.
- Files: `src/components/tech-center/data.ts`, `src/lib/tech-center-content.ts`, `src/app/[lang]/tech-center/page.tsx`, `src/app/[lang]/[section]/[slug]/page.tsx`, `src/app/sitemap.ts`, `src/content/tech-center`
- Cause: `fs.readFileSync` and `fs.statSync` run once per article across several code paths.
- Improvement path: build a manifest or cached index once and reuse it for metadata, sitemap, and article rendering.

**Homepage case assets and motion budget are heavy**
- Problem: the homepage loads multi-MB PNG case assets and keeps several animation layers active.
- Files: `src/components/home/CaseStudies.tsx`, `src/components/home/Hero.tsx`, `src/components/home/GradientBlobs.tsx`, `src/components/home/GlobeCanvas.tsx`, `public/images/home/cases/cases-i18n/`
- Cause: `public/images/home/cases/cases-i18n/case3-en.png` and `case3-zh.png` are 2.9 MiB each, and the hero area runs continuous Framer Motion and canvas updates.
- Improvement path: compress the case images, reduce always-on effects, and keep heavy visuals behind interaction or viewport gates.

## Fragile Areas

**Default locale and path helpers can drift**
- Files: `src/lib/i18n.ts`, `src/lib/localizedRoutes.ts`, `src/lib/siteRouting.ts`
- Why fragile: `defaultLocale` falls back to the current site variant in `src/lib/i18n.ts`, while `buildDefaultLocale` in `src/lib/localizedRoutes.ts` falls back to `en`; `parseSiteVariant()` in `src/lib/siteRouting.ts` parses `NEXT_PUBLIC_HOME_URL` at import time.
- Safe modification: centralize default-locale derivation and validate `NEXT_PUBLIC_HOME_URL` before any module-level routing work.
- Test coverage: no automated route tests cover env mismatch or malformed URL handling.

**Count-up animation has no cancellation path**
- Files: `src/components/home/Stats.tsx`
- Why fragile: the `requestAnimationFrame` loop in `useCountUp()` keeps running until completion and never stores a cancel handle for unmount cleanup.
- Safe modification: store the frame id and cancel it in cleanup.
- Test coverage: no hook tests cover quick route changes or unmount during animation.

**Build output cleanup depends on the Cloudflare file budget**
- Files: `scripts/clean-faq-rsc.js`, `package.json`
- Why fragile: the cleanup script assumes the exported `out/` layout and exists to stay under Cloudflare Pages' 20,000-file limit.
- Safe modification: keep the export layout stable or move to a smaller generated surface.
- Test coverage: only script-level verification exists.

## Scaling Limits

**Cloudflare Pages file count is already part of the build contract**
- Current capacity: `scripts/clean-faq-rsc.js` removes FAQ RSC payload files after export to keep the site under the 20,000-file limit.
- Files: `scripts/clean-faq-rsc.js`, `src/components/tech-center/data.ts`, `src/content/tech-center`
- Limit: content growth adds more static HTML, RSC payloads, and sitemap entries.
- Scaling path: reduce generated file count, compress route fan-out, or move to a host with a larger file budget.

## Test Coverage Gaps

**No general test runner is configured**
- What's not tested: route helpers, attribution logic, hydration-sensitive components, and star-fetch fallbacks.
- Files: `package.json`, `src/lib/siteRouting.ts`, `src/lib/leadAttribution.ts`, `src/components/home/CaseStudies.tsx`, `src/lib/githubStars.ts`
- Risk: regressions surface only after build or manual validation.
- Priority: high

**Validation is script-driven**
- Files: `scripts/verify-p0.js`, `scripts/verify-p1.js`, `scripts/verify-p2.js`, `scripts/verify-i18n-seo.js`
- What's covered: exported HTML, redirects, headers, SEO metadata, and asset budgets.
- Gap: no component or unit coverage around locale switches, client hydration, or attribution storage.

---

*Concerns audit: 2026-08-10*
