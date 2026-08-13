# Codebase Concerns

**Analysis Date:** 2026-08-13

## Tech Debt

**Static export repaired after compilation:**
- Issue: The production artifact is correct only after one script deletes Next.js RSC payloads and another rewrites every exported `<html>` tag with regular expressions.
- Files: `package.json`, `scripts/clean-faq-rsc.js`, `scripts/fix-html-lang.js`, `next.config.js`
- Impact: A Next.js output naming or HTML serialization change can silently remove the wrong files, leave incorrect language metadata, or publish an artifact that differs from the framework build output.
- Fix approach: Treat both transforms as versioned build contracts, add fixture checks for representative default, localized, RTL, FAQ, and non-FAQ routes, and replace each transform when Next.js exposes a supported static-export hook.

**Deployment policy is duplicated across targets:**
- Issue: Redirects, cache rules, and security headers are maintained independently for Cloudflare Pages and Nginx.
- Files: `public/_headers`, `public/_redirects`, `nginx.conf`, `nginx-security-headers.conf`, `scripts/verify-p0.js`, `scripts/verify-i18n-seo.js`
- Impact: A routing or CSP update can behave differently between preview and production, while the current assertions cover selected rules and counts rather than semantic equivalence.
- Fix approach: Generate both target configurations from one declarative routing/security policy and verify the generated files in CI.

**Large content registries have multiple sources of truth:**
- Issue: The technical center combines 668 Markdown files, a generated-looking 415 KB registry, and hard-coded category totals; FAQ metadata and category overlays are split across several large TypeScript maps.
- Files: `src/content/tech-center/`, `src/components/tech-center/entries.json`, `src/components/tech-center/data.ts`, `src/faq/en.ts`, `src/faq/zh.ts`, `src/faq/legacyMeta.ts`, `src/faq/legacyCategories.ts`
- Impact: Editors can update content while leaving summaries, counts, slugs, metadata, or overlays stale. TypeScript compilation spends time parsing multi-megabyte generated data modules.
- Fix approach: Generate registries, category counts, and overlays from validated content metadata in one deterministic script, then fail the build when generated output has drifted.

**China image build mutates checked source inside the container:**
- Issue: The Docker build rewrites documentation and cloud URLs across source files with broad `find | grep | sed` pipelines.
- Files: `Dockerfile`, `src/config/site.ts`, `src/lib/siteRouting.ts`
- Impact: The container build follows a behavior path that local builds and preview CI do not exercise, and a newly added matching string can be changed outside its intended routing context.
- Fix approach: Resolve regional URLs through `src/lib/siteRouting.ts` and configuration inputs, then remove source-text replacement from `Dockerfile`.

## Known Bugs

**Declared Node.js support includes incompatible runtimes:**
- Symptoms: Installation or build can fail on Node.js 18 through 20.8 because the locked Next.js 16.2.6 package requires Node.js 20.9 or newer.
- Files: `package.json`, `package-lock.json`
- Trigger: Run the documented dependency installation or build under a runtime accepted by `engines.node` at version 18.x or 20.0-20.8.
- Workaround: Use Node.js 22 or 24, matching `Dockerfile` and `.github/workflows/preview.yml`; update `engines.node` to `>=20.9.0` as the durable correction.

**Language switching can abort before navigation:**
- Symptoms: Selecting another locale leaves the visitor on the current page when browser storage access throws a `SecurityError`.
- Files: `src/lib/clientNavigation.ts`, `src/components/header/LangSwitcher.tsx`
- Trigger: Block site storage, use a browser context that rejects `localStorage`, then choose a locale; `rememberPreferredLanguage()` throws before `navigateTo()` runs.
- Workaround: Allow site storage. The durable correction is to make preference persistence best-effort and always execute navigation.

**FAQ search sees only the first 100 answer characters:**
- Symptoms: A term visible later on a FAQ detail page produces zero results on the FAQ index unless it also appears in the question, category, or first 100 answer characters.
- Files: `src/app/[lang]/faq/page.tsx`, `src/components/faq/FAQList.tsx`, `src/faq/en.ts`, `src/faq/zh.ts`
- Trigger: Search for a phrase located after character 100 in any FAQ answer.
- Workaround: Search by question text. The durable correction is to pass a compact full-text search field or a prebuilt search index separately from the card excerpt.

**Manual preview dispatch lacks pull-request identity:**
- Symptoms: A manually dispatched preview build writes an empty PR number; the deploy workflow derives the branch `pr-` and skips the preview comment.
- Files: `.github/workflows/preview.yml`, `.github/workflows/preview-deploy.yml`
- Trigger: Run the `workflow_dispatch` event declared in `.github/workflows/preview.yml`.
- Workaround: Trigger previews from a pull request. The durable correction is to require a PR-number input for manual dispatch and resolve its head SHA explicitly.

## Security Considerations

**CSP permits broad script execution:**
- Risk: An HTML or script injection has a larger execution surface because production CSP permits both `'unsafe-inline'` and `'unsafe-eval'` and trusts wildcard analytics domains.
- Files: `public/_headers`, `nginx-security-headers.conf`, `src/app/layout.tsx`, `src/app/GoogleAnalytics.tsx`
- Current mitigation: `frame-ancestors 'none'`, `base-uri 'self'`, `form-action 'self'`, HSTS, MIME sniffing protection, and referrer restrictions are present on both deployment targets.
- Recommendations: Move inline scripts to nonce- or hash-authorized scripts, remove `'unsafe-eval'` after validating dependencies, and narrow third-party hosts to exact origins.

**Anonymous attribution starts without an in-app consent gate:**
- Risk: On idle after every initial page load, the browser creates or reuses a visitor identifier and can send locale, landing path, referrer path, UTM values, click ID, and touch timestamps to the configured CRM endpoint.
- Files: `src/app/LeadAttribution.tsx`, `src/lib/leadAttribution.ts`, `src/lib/visitorId.ts`, `src/lib/attribution/primitives/url.ts`, `src/app/layout.tsx`
- Current mitigation: URL canonicalization strips query strings, stored fields have size and shape validation, failures are isolated from page rendering, and reporting stays disabled when `NEXT_PUBLIC_CRM_API_URL` is empty.
- Recommendations: Gate analytics and attribution behind jurisdiction-aware consent, honor withdrawal and global privacy signals, document retention, and enforce server-side schema validation, CORS, rate limits, and abuse controls on `/visitors/track`.

**Visitor identity accepts an unsigned URL value:**
- Risk: Any syntactically valid `visitor_id` query value becomes the browser identity and is forwarded to the cloud entry URL, allowing attribution poisoning or unintended identity correlation through shared links.
- Files: `src/lib/visitorId.ts`, `src/lib/cloudEntryUrl.ts`, `src/lib/leadAttribution.ts`
- Current mitigation: Values are limited to 64 characters and a conservative character set.
- Recommendations: Accept cross-domain identity only from a short-lived signed token, rotate locally generated identifiers, and prevent user-controlled identifiers from overriding an established stored identity.

**Production deployment executes mutable third-party artifacts:**
- Risk: Upstream changes can alter the deployed binary or gain access to deployment credentials without a repository change.
- Files: `Dockerfile`, `.github/workflows/fastgpt-home-image.yml`
- Current mitigation: GitHub job permissions are scoped and the container registry login uses the workflow token.
- Recommendations: Pin `fholzer/nginx-brotli` by digest and `actions-hub/kubectl@master` by immutable commit SHA; prefer a maintained, least-privilege Kubernetes deployment action.

## Performance Bottlenecks

**Technical-center catalog ships and scans the entire registry:**
- Problem: The client bundle includes a 415 KB JSON catalog containing all 668 entries, then filters every entry on each query change and copies/sorts result arrays for alternate sort modes.
- Files: `src/components/tech-center/entries.json`, `src/components/tech-center/data.ts`, `src/components/tech-center/TechCenterPage.tsx`
- Cause: Search, filtering, pagination, and category counts all operate on one client-side array.
- Improvement path: Emit a compact search index with only display/search fields, debounce query updates, and load result pages or category chunks when the catalog grows beyond the current 668 entries.

**FAQ index serializes every entry into a client component:**
- Problem: Each FAQ index sends 1,400 records to the browser while initially rendering 30 cards; filtering scans the complete object on each keystroke.
- Files: `src/app/[lang]/faq/page.tsx`, `src/components/faq/FAQList.tsx`, `src/faq/en.ts`, `src/faq/zh.ts`
- Cause: Infinite rendering limits DOM growth while data transfer, hydration, and search retain the full catalog.
- Improvement path: Generate a compact search index, virtualize or page results, and keep card excerpts separate from searchable full text.

**GitHub star caching never serves a fresh cache hit:**
- Problem: Every homepage mount calls the unauthenticated GitHub API in the browser, and every server render attempts a `cache: 'no-store'` request before using the filesystem cache only as an error fallback.
- Files: `src/lib/githubStars.ts`, `src/lib/githubStarsClient.ts`, `src/components/home/HomeHeroSection.tsx`, `src/app/page.tsx`, `src/app/[lang]/page.tsx`
- Cause: Both cache records store `updatedAt`, while neither read path applies a freshness TTL before fetching.
- Improvement path: Return fresh cached values immediately, refresh stale values on a bounded schedule during build, and remove the per-visitor API request from the client.

**Static generation performs thousands of synchronous content operations:**
- Problem: FAQ route multiplication, 668 technical articles, full output tree rewrites, and synchronous filesystem traversal increase build time and disk I/O with every content addition.
- Files: `src/app/faq/[id]/page.tsx`, `src/app/[lang]/faq/[id]/page.tsx`, `src/app/[lang]/[section]/[slug]/page.tsx`, `src/lib/tech-center-content.ts`, `scripts/clean-faq-rsc.js`, `scripts/fix-html-lang.js`
- Cause: Full static export materializes every route and post-build scripts traverse generated files synchronously.
- Improvement path: Measure route and file-count budgets in CI, cache parsed content during one build, and move high-cardinality content to a hosting model with incremental generation when static limits become binding.

## Fragile Areas

**Locale, canonical, and redirect ownership graph:**
- Files: `src/lib/siteRouting.ts`, `src/lib/seo.ts`, `src/app/sitemap.ts`, `src/app/[lang]/layout.tsx`, `public/_redirects`, `nginx.conf`, `scripts/generate-robots.js`, `scripts/verify-i18n-seo.js`
- Why fragile: Locale ownership spans two domains, default-locale aliases, static parameters, metadata, sitemap entries, Cloudflare rules, and Nginx rewrites; locale lists and representative slugs are repeated across modules.
- Safe modification: Change the central locale/routing model first, regenerate both site variants, then verify canonical, hreflang, robots, sitemap, redirect, and 404 behavior on both hosts.
- Test coverage: `scripts/verify-i18n-seo.js` checks selected pages and four hard-coded comparison slugs; the workflow in `.github/workflows/preview.yml` does not execute it and covers only the international variant.

**Attribution storage and migration state machine:**
- Files: `src/lib/leadAttribution.ts`, `src/lib/visitorId.ts`, `src/lib/attribution/storage/adapter.ts`, `src/lib/attribution/storage/migration.ts`, `src/lib/attribution/storage/cookie.ts`, `src/lib/attribution/storage/local-storage.ts`
- Why fragile: Cookies, legacy local storage, shared-domain scope, malformed data recovery, capacity fallback, visitor migration, and deduplicated reporting interact through browser-only state while most exceptions are intentionally swallowed.
- Safe modification: Preserve bounded envelopes and best-effort page behavior, exercise migrations from every stored format, and validate behavior with storage blocked, malformed, oversized, cross-subdomain, and partially writable states.
- Test coverage: Source-level unit and browser tests are absent for the complete attribution flow; `scripts/verify-*.js` only inspect static artifacts.

**Hand-written Markdown parser and front-matter reader:**
- Files: `src/components/tech-center/MarkdownContent.tsx`, `src/lib/tech-center-content.ts`, `src/content/tech-center/`
- Why fragile: Regular expressions implement a limited Markdown subset, front matter splits on the first colon, nested lists and escaped delimiters have no grammar, and supported links are restricted to absolute HTTP(S) or mailto URLs.
- Safe modification: Define the supported content grammar explicitly, add corpus fixtures from production Markdown, and use an existing parser already approved for the project when authoring requirements exceed the current subset.
- Test coverage: Parser branches, malformed front matter, fenced-code edge cases, tables, and link handling have no dedicated executable checks.

**FAQ artifact cleanup relies on generated filename heuristics:**
- Files: `scripts/clean-faq-rsc.js`, `package.json`, `src/app/faq/[id]/page.tsx`, `src/app/[lang]/faq/[id]/page.tsx`
- Why fragile: Cleanup identifies disposable payloads through filename prefixes, `.txt`/`.html` siblings, and directory shape instead of a manifest supplied by Next.js.
- Safe modification: Snapshot a representative export before framework upgrades, assert preserved HTML and required navigation paths after cleanup, and fail when an unrecognized payload layout appears.
- Test coverage: No dedicated test invokes cleanup against fixture directories; current artifact scripts run after the mutation and cannot prove that only intended payloads were deleted.

## Scaling Limits

**Cloudflare Pages file ceiling:**
- Current capacity: Cloudflare Pages permits 20,000 files; the source currently contains 1,400 FAQ entries per maintained FAQ locale plus 668 technical articles and all supporting static assets.
- Limit: The build already requires `scripts/clean-faq-rsc.js` to remove FAQ RSC payloads specifically to stay below the 20,000-file ceiling.
- Files: `scripts/clean-faq-rsc.js`, `src/faq/en.ts`, `src/faq/zh.ts`, `src/components/tech-center/entries.json`, `src/app/[lang]/faq/[id]/page.tsx`
- Scaling path: Track generated route/file counts as a hard CI budget, reduce duplicate localized artifacts, and move high-cardinality article delivery away from full static export before the remaining margin is consumed.

**Browser-resident search catalogs:**
- Current capacity: FAQ search scans 1,400 records and technical-center search scans 668 records in memory on the main thread.
- Limit: Transfer size, hydration cost, and per-keystroke linear scans grow directly with content count; mobile devices experience the limit first.
- Files: `src/components/faq/FAQList.tsx`, `src/app/[lang]/faq/page.tsx`, `src/components/tech-center/TechCenterPage.tsx`, `src/components/tech-center/entries.json`
- Scaling path: Establish client payload and interaction-latency budgets, then adopt compact indexes, result pagination, or server/edge search when those budgets fail.

**Full-repository production image rebuild:**
- Current capacity: Every production release copies the repository, performs broad text rewrites, installs all dependencies, exports every page, and packages the complete `out/` tree.
- Limit: Build time and image reproducibility degrade as content and dependency counts increase; dependency layers receive little reuse because `COPY . ./` precedes installation.
- Files: `Dockerfile`, `.github/workflows/fastgpt-home-image.yml`, `package-lock.json`
- Scaling path: Copy manifests and install with a frozen lockfile in a cacheable layer, copy source afterward, and cache Next.js build data where the CI trust model permits.

## Dependencies at Risk

**Mixed package managers without a pnpm lockfile:**
- Risk: The repository commits `package-lock.json`, preview CI resolves dependencies with pnpm 9, and Docker resolves them with npm using non-frozen install commands.
- Impact: Preview and production can install different transitive versions from the same commit, and caret ranges can change build output over time.
- Files: `package.json`, `package-lock.json`, `.github/workflows/preview.yml`, `Dockerfile`
- Migration plan: Standardize on one package manager, declare it in `packageManager`, commit its lockfile, and use `npm ci` or `pnpm install --frozen-lockfile` everywhere.

**Mutable runtime image and deployment action:**
- Risk: `fholzer/nginx-brotli:latest` and `actions-hub/kubectl@master` move independently of this repository.
- Impact: Production serving behavior or deployment code can change between identical source revisions; the Kubernetes step receives cluster credentials.
- Files: `Dockerfile`, `.github/workflows/fastgpt-home-image.yml`
- Migration plan: Pin image digests and action commit SHAs, record an update cadence, and validate Nginx configuration before deployment.

**Dependency vulnerability monitoring is absent:**
- Risk: Package and action advisories rely on manual discovery because no dependency update bot, audit command, CodeQL workflow, or equivalent scanner is tracked.
- Impact: Vulnerable versions can remain in `package-lock.json`, `Dockerfile`, and GitHub Actions workflows until a developer notices an advisory.
- Files: `package.json`, `package-lock.json`, `.github/workflows/`, `Dockerfile`
- Migration plan: Enable automated dependency updates and a scheduled advisory scan, then gate merges on actionable production vulnerabilities.

## Missing Critical Features

**Consent and preference control for analytics:**
- Problem: Enabled analytics and attribution components initialize from `src/app/layout.tsx`, while the application contains no consent state, withdrawal control, or global privacy signal handling.
- Blocks: Privacy-compliant rollout in jurisdictions or customer contexts that require opt-in tracking and auditable preference changes.
- Files: `src/app/layout.tsx`, `src/app/LeadAttribution.tsx`, `src/app/GoogleAnalytics.tsx`, `src/app/BaiDuAnalytics.tsx`, `src/app/ClarityAnalytics.tsx`, `src/app/RybbitAnalytics.tsx`

**Enforced CI quality gate:**
- Problem: PR and production workflows run builds while omitting lint, strict type checking, all four artifact verification commands, and the China/international variant matrix.
- Blocks: Reliable detection of source quality, SEO, CSP/redirect, asset-budget, and cross-domain routing regressions before deployment.
- Files: `.github/workflows/preview.yml`, `.github/workflows/fastgpt-home-image.yml`, `package.json`, `scripts/verify-p0.js`, `scripts/verify-p1.js`, `scripts/verify-p2.js`, `scripts/verify-i18n-seo.js`

**Client-side failure observability:**
- Problem: Attribution, storage, GitHub API, and analytics-loading failures are commonly swallowed or reduced to fallbacks without a health signal.
- Blocks: Detecting data loss, browser-policy breakage, third-party outages, and regional failures before business metrics diverge.
- Files: `src/lib/leadAttribution.ts`, `src/lib/githubStars.ts`, `src/lib/githubStarsClient.ts`, `src/lib/attribution/storage/local-storage.ts`, `src/app/LeadAttribution.tsx`

## Test Coverage Gaps

**Attribution policy, storage, and identity:**
- What's not tested: Channel classification, URL canonicalization, cookie-domain resolution, envelope limits, storage fallback, migrations, visitor fixation, report deduplication, and CRM request behavior.
- Files: `src/lib/leadAttribution.ts`, `src/lib/visitorId.ts`, `src/lib/attribution/primitives/`, `src/lib/attribution/storage/`
- Risk: Marketing data can become silently corrupted, privacy constraints can regress, and blocked-storage browsers can follow unexercised paths.
- Priority: High

**Locale routing and post-build transforms:**
- What's not tested: Exhaustive locale/route combinations across both domains, RTL `dir`, unknown routes, manual preview dispatch, and cleanup/HTML-patching fixtures around Next.js output changes.
- Files: `src/lib/siteRouting.ts`, `src/lib/seo.ts`, `scripts/clean-faq-rsc.js`, `scripts/fix-html-lang.js`, `.github/workflows/preview.yml`
- Risk: Canonical tags, redirects, crawlability, or published files can regress during framework, locale, or hosting changes.
- Priority: High

**Interactive browser workflows:**
- What's not tested: Language switching under storage restrictions, FAQ search and infinite loading, technical-center URL state and pagination, mobile viewport behavior, keyboard interaction, and browser console errors.
- Files: `src/components/header/LangSwitcher.tsx`, `src/components/faq/FAQList.tsx`, `src/components/tech-center/TechCenterPage.tsx`, `src/components/home/Navbar.tsx`, `src/components/home/GlobeCanvas.tsx`
- Risk: Build and artifact checks can pass while core visitor interactions fail in real browsers.
- Priority: High

**Content parsing and registry integrity:**
- What's not tested: Markdown grammar edge cases, front-matter parsing, registry-to-file completeness, hard-coded category counts, duplicate slugs, and metadata derivation for the 668-article corpus.
- Files: `src/components/tech-center/MarkdownContent.tsx`, `src/lib/tech-center-content.ts`, `src/components/tech-center/data.ts`, `src/components/tech-center/entries.json`, `src/content/tech-center/`
- Risk: A single malformed content file can break a full static build or publish incomplete, misleading, or inaccessible article output.
- Priority: Medium

**Source-level regression coverage:**
- What's not tested: Application branches, functions, and components have no instrumented unit or component suite and no enforced coverage threshold.
- Files: `src/`, `package.json`, `.github/workflows/preview.yml`, `.github/workflows/fastgpt-home-image.yml`
- Risk: Refactors can preserve representative HTML assertions while changing unobserved runtime behavior.
- Priority: Medium

---

*Concerns audit: 2026-08-13*
