# Testing Patterns

**Analysis Date:** 2026-08-12

## Test Framework

**Runner:**
- The repository uses standalone Node verification programs invoked through npm scripts in `package.json`: `verify:p0`, `verify:p1`, `verify:p2`, and `verify:i18n-seo`.
- A suite runner is not detected. `package.json` and `package-lock.json` contain no Jest, Vitest, Mocha, Playwright, or Cypress test dependency, and the tracked tree contains no matching runner configuration.
- The verification programs are post-build artifact checks. Each reads the static export under `out/`; `scripts/verify-p0.js` and `scripts/verify-p1.js` also inspect source assets and deployment configuration.
- Config: commands are defined in `package.json`; each executable owns its configuration at the top of `scripts/verify-p0.js`, `scripts/verify-p1.js`, `scripts/verify-p2.js`, or `scripts/verify-i18n-seo.js`.

**Assertion Library:**
- Node's built-in strict assertions via `node:assert/strict` in all four `scripts/verify-*.js` files.
- `sharp` supplies image metadata in `scripts/verify-p0.js` and `scripts/verify-p1.js`; `node:zlib` measures initial JavaScript gzip size in `scripts/verify-p1.js`.
- Assertions terminate the program through the top-level catch path, which logs the error and calls `process.exit(1)` in every `scripts/verify-*.js` file.

**Static Analysis:**
- ESLint 9 with Next Core Web Vitals is configured in `eslint.config.mjs` and run through `npm run lint` in `package.json`.
- TypeScript 5.9 uses `strict: true` and `noEmit: true` in `tsconfig.json`; invoke it directly with `npx tsc --noEmit`.
- `npm run build` in `package.json` is the compile, route generation, static export, and post-build integration gate.

**Run Commands:**
```bash
npm run lint                    # Lint JavaScript/TypeScript under src/
npx tsc --noEmit                # Run strict TypeScript validation
npm run build                   # Generate and export the current site variant into out/
npm run verify:p0               # Check FAQ social metadata/assets and deployment redirects/headers
npm run verify:p1               # Check SEO copy, image budgets, and initial JavaScript budget
npm run verify:p2               # Check headings, metadata, canonicals, FAQ migration, and sitemap paths
npm run verify:i18n-seo         # Check domain ownership, hreflang, canonicals, redirects, and sitemap
```

- Run artifact verification after a fresh build with the same environment. The international build uses the `io` variant and English default configured in `.github/workflows/preview.yml`:

```bash
export NEXT_PUBLIC_HOME_URL=https://fastgpt.io
export NEXT_PUBLIC_HOME_URL=https://fastgpt.io
export NEXT_PUBLIC_CN_HOME_URL=https://fastgpt.cn
export NEXT_PUBLIC_IO_HOME_URL=https://fastgpt.io
export NEXT_PUBLIC_LANGUAGE_REGION=international
npm run build
npm run verify:p0
npm run verify:p1
npm run verify:p2
npm run verify:i18n-seo
```

- The China build requires the matching `cn` variant and Chinese default used by `.github/workflows/fastgpt-home-image.yml`:

```bash
export NEXT_PUBLIC_HOME_URL=https://fastgpt.cn
export NEXT_PUBLIC_HOME_URL=https://fastgpt.cn
export NEXT_PUBLIC_CN_HOME_URL=https://fastgpt.cn
export NEXT_PUBLIC_IO_HOME_URL=https://fastgpt.io
export NEXT_PUBLIC_LANGUAGE_REGION=zh
npm run build
npm run verify:p0
npm run verify:p1
npm run verify:p2
npm run verify:i18n-seo
```

- Watch mode is not defined because the repository has no suite runner configuration in `package.json`.
- Coverage mode is not defined because the repository has no coverage provider or threshold configuration in `package.json`.

## Test File Organization

**Location:**
- Artifact verification lives centrally in `scripts/verify-p0.js`, `scripts/verify-p1.js`, `scripts/verify-p2.js`, and `scripts/verify-i18n-seo.js`.
- Application and domain code under `src/` has no co-located `*.test.*`, `*.spec.*`, or `__tests__/` files.
- Build integration gates live in `.github/workflows/preview.yml`, `.github/workflows/preview-deploy.yml`, and `.github/workflows/fastgpt-home-image.yml`.
- Verification inputs span generated `out/`, production assets under `public/`, deployment rules in `public/_redirects`, `nginx.conf`, `nginx-security-headers.conf`, and shared metadata limits in `src/lib/faqMetadata.constants.json`.

**Naming:**
- Name artifact checks `scripts/verify-<scope>.js`; existing scopes are milestone priorities (`p0`, `p1`, `p2`) and the domain concern `i18n-seo`.
- Name internal assertion groups `verify<Concern>()`, following `verifyNginxHeaders()` in `scripts/verify-p0.js`, `verifyHeroAssets()` in `scripts/verify-p1.js`, and `verifySitemap()` in `scripts/verify-i18n-seo.js`.
- Use `resolve*`, `get*`, `read*`, and `walk*` for setup and extraction helpers, following `resolveHtml()` in all four verification files and `walkHtmlFiles()` in `scripts/verify-p2.js`.

**Structure:**
```text
fastgpt-home/
|-- scripts/
|   |-- verify-p0.js            # Social image, FAQ metadata, headers, redirects
|   |-- verify-p1.js            # Metadata, copy, image and JavaScript budgets
|   |-- verify-p2.js            # Headings, metadata, canonical and migration coverage
|   `-- verify-i18n-seo.js      # Cross-domain locale ownership and comparison SEO
|-- src/                         # Application/domain code; no dedicated test files
|-- public/                      # Production inputs inspected by verification scripts
|-- out/                         # Fresh static-export fixture generated by npm run build
|-- .github/workflows/           # Build, artifact upload, preview deploy, image build
`-- package.json                 # Verification and static-analysis commands
```

## Test Structure

**Suite Organization:**
```javascript
function verifyHeadingSequence(route, html) {
  const levels = getHeadingLevels(html);
  assert(levels.length > 0, `${route} has no headings`);
  assert.equal(levels[0], 1, `${route} must begin with an h1`);
  return levels;
}

function main() {
  const htmlByRoute = new Map(routes.map((route) => [route, resolveHtml(route)]));
  for (const [route, html] of htmlByRoute) {
    verifyHeadingSequence(route, html);
  }
}

try {
  main();
} catch (error) {
  console.error(error);
  process.exit(1);
}
```

- This pattern comes from `scripts/verify-p2.js`: private extraction helpers feed named verification groups, `main()` coordinates them, and one top-level failure path produces a nonzero exit.

**Patterns:**
- Setup is filesystem-based: resolve the repository root from `__dirname`, bind `outDir`, read environment-derived URLs/locales, then load the exact generated HTML or asset. All four `scripts/verify-*.js` files use this pattern.
- Assertions carry route, asset, byte budget, or expected metadata context so CI output identifies the failing contract; examples appear throughout `scripts/verify-p1.js` and `scripts/verify-i18n-seo.js`.
- Optional route variants are probed with `resolveHtml(route, false)` in `scripts/verify-p1.js` and `scripts/verify-p2.js`; canonical routes remain required.
- Teardown hooks are not applicable because verification scripts perform synchronous reads and short-lived image inspection. They leave `out/` intact for preview deployment, as required by `.github/workflows/preview.yml`.
- Verification programs read production artifacts and configuration. Build generators and maintenance scripts such as `scripts/clean-locales.js` and `scripts/generate-robots.js` have real write effects and belong in setup, outside assertion helpers.

## Artifact Verification Matrix

| Command | Primary contracts | Inputs | File |
|---------|-------------------|--------|------|
| `npm run verify:p0` | FAQ Open Graph/Twitter image tags, FAQ JSON-LD, 1200x630 image under 200,000 bytes, exported asset equality, Nginx security headers and redirect order, Cloudflare redirect presence/order | `out/`, `public/faq-social-preview.png`, `public/_redirects`, `nginx.conf`, `nginx-security-headers.conf` | `scripts/verify-p0.js` |
| `npm run verify:p1` | Canonicals, robots meta, target homepage/FAQ copy, social metadata, JSON-LD, hero and solution dimensions/size/export equality, selected locale asset, initial JavaScript at or below 260 KiB gzip, deferred analytics | `out/`, `public/images/`, `NEXT_PUBLIC_HOME_URL`, `NEXT_PUBLIC_LANGUAGE_REGION` | `scripts/verify-p1.js` |
| `npm run verify:p2` | One `h1`, sequential heading levels, FAQ title/description limits, social metadata parity, canonical targets, all FAQ detail metadata, default-locale migration coverage, sitemap prefix cleanup | `out/`, `NEXT_PUBLIC_HOME_URL`, `NEXT_PUBLIC_LANGUAGE_REGION`, `src/lib/faqMetadata.constants.json` | `scripts/verify-p2.js` |
| `npm run verify:i18n-seo` | Variant-owned robots/sitemap, cross-domain redirects, canonical and hreflang maps, comparison routes, comparison metadata lengths, sitemap uniqueness and ownership | `out/`, `public/robots.txt`, `public/_redirects`, `nginx.conf`, `NEXT_PUBLIC_HOME_URL` | `scripts/verify-i18n-seo.js` |

## Mocking

**Framework:** Not detected. `package.json` has no mocking library, and the repository contains no test spy, stub, or fake declarations.

**Patterns:**
```text
Artifact checks use real generated HTML, real repository configuration, and real image files.
No mock layer is present in scripts/verify-*.js.
```

**What to Mock:**
- A future unit suite should isolate external and browser APIs at their existing seams: server `fetch` and cache filesystem access in `src/lib/githubStars.ts`, client `fetch` and `localStorage` in `src/lib/githubStarsClient.ts`, and `window`, cookies, and storage in `src/lib/attribution/storage/`.
- Browser component tests would need controlled `IntersectionObserver`, `visualViewport`, timers, and navigation APIs used in `src/components/faq/FAQList.tsx`, `src/components/home/Navbar.tsx`, `src/components/home/GlobeCanvas.tsx`, and `src/components/header/LangSwitcher.tsx`.
- Preserve dependency injection already present in storage helpers. `src/lib/attribution/storage/cookie.ts` accepts hostname and cookie-string overrides, allowing deterministic tests with minimal global replacement.

**What NOT to Mock:**
- Exercise pure policy functions directly: `resolveCookieDomain()` in `src/lib/attribution/primitives/domain.ts`, `validateStoredAttribution()` in `src/lib/attribution/primitives/envelope.ts`, `encodeWithinBudget()` in `src/lib/attribution/primitives/capacity.ts`, and URL helpers in `src/lib/siteRouting.ts`.
- Keep artifact verification grounded in real `out/`, production images, redirect rules, and Nginx configuration because this cross-file consistency is the purpose of `scripts/verify-*.js`.
- Use production content registries for build-level route coverage through `src/content/competitor/index.ts`, `src/components/tech-center/entries.json`, and `src/faq/index.ts`; reduced fixtures would miss static-export inventory regressions.

## Fixtures and Factories

**Test Data:**
```javascript
const faqId = 'Why-are-enterprises-paying-more';
const compareSlugs = [
  'dify-vs-fastgpt',
  'ragflow-vs-fastgpt',
  'maxkb-vs-fastgpt',
  'self-build-vs-platform'
];
```

- `faqId` is hard-coded in all four `scripts/verify-*.js` files as a stable representative FAQ detail route.
- `compareSlugs` is a fixed route inventory in `scripts/verify-i18n-seo.js` and should remain synchronized with `src/content/competitor/index.ts`.

**Location:**
- The main integration fixture is a freshly generated `out/` directory from `npm run build`; it is consumed by every `scripts/verify-*.js` file.
- Production source assets under `public/images/` and `public/faq-social-preview.png` act as image fixtures for `scripts/verify-p0.js` and `scripts/verify-p1.js`.
- Production content is stored in `src/faq/`, `src/content/competitor/`, `src/content/tech-center/`, and `src/components/tech-center/entries.json`; dedicated fixture or factory directories are not detected.
- Metadata thresholds shared across TypeScript and CommonJS live in `src/lib/faqMetadata.constants.json` and are imported by `src/lib/faqMetadata.ts` and `scripts/verify-p2.js`.

## Coverage

**Requirements:** No statement, branch, function, or line-coverage target is enforced in `package.json`, `eslint.config.mjs`, `tsconfig.json`, or `.github/workflows/`.

**View Coverage:**
```bash
# No coverage command or report provider is configured in package.json.
```

- Artifact assertions cover selected output contracts, with broad FAQ metadata traversal in `scripts/verify-p2.js` and sitemap traversal in `scripts/verify-i18n-seo.js`.
- Source-level execution coverage is unavailable for `src/lib/`, `src/components/`, `src/app/`, and the verification helpers themselves because no instrumented suite is configured.

## Test Types

**Unit Tests:**
- Not used. Pure logic under `src/lib/attribution/primitives/`, `src/lib/siteRouting.ts`, `src/lib/faqMetadata.ts`, and `src/content/competitor/loader.ts` has no `*.test.*` or `*.spec.*` files.
- Add future unit tests beside or in a dedicated test tree only after selecting a runner; the repository currently establishes no placement convention in `src/` or `package.json`.

**Integration Tests:**
- `npm run build` is the primary integration gate in `package.json`: npm runs `prebuild`, Next compiles and exports routes, then `scripts/clean-faq-rsc.js` and `scripts/fix-html-lang.js` mutate the final artifact.
- The four `npm run verify:*` commands are assertion-based integration checks over the build output and deployment files, defined in `package.json` and implemented in `scripts/verify-*.js`.
- `.github/workflows/preview.yml` installs dependencies and runs `pnpm run build` for pull requests, then uploads `out/` for `.github/workflows/preview-deploy.yml`.
- `.github/workflows/fastgpt-home-image.yml` builds and publishes the China Docker image on `main`; Docker packaging supplies another production-build integration gate.

**E2E Tests:**
- Not used. No Playwright, Cypress, or browser harness configuration exists in the tracked repository.
- `.github/workflows/preview-deploy.yml` publishes a Cloudflare Pages preview and comments its URL on the pull request; interaction, layout, and browser-console validation remain manual.

**Static Tests:**
- `npm run lint` applies Next/Core Web Vitals rules to `src/**/*.{js,jsx,ts,tsx}` via `eslint.config.mjs`.
- `npx tsc --noEmit` applies strict TypeScript checks from `tsconfig.json`.
- `npm run build` validates the App Router graph and static generation paths while producing the artifact consumed by `scripts/verify-*.js`.

## Common Patterns

**Async Testing:**
```javascript
async function main() {
  const rootHtml = verifyRootMetadata();
  await verifyHeroAssets(rootHtml);
  await verifySolutionAssets(rootHtml);
  verifyInitialJavaScript(rootHtml);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
```

- Use the `scripts/verify-p1.js` pattern when checks rely on asynchronous libraries such as `sharp`: await each verification group, emit success after all groups finish, and convert rejection into exit status 1.
- Synchronous artifact checks use a guarded `main()` in `scripts/verify-p2.js` and `scripts/verify-i18n-seo.js`.

**Error Testing:**
```javascript
assert(htmlPath, `Missing static HTML for ${route}`);
assert.equal(actualUrl, expectedUrl, `Unexpected canonical for ${route}`);
```

- Use strict equality for exact contracts and truthy assertions for presence, ranges, and predicates, following all `scripts/verify-*.js` files.
- Include actual counts or sizes in failure messages. `scripts/verify-p1.js` reports gzip KiB against its 260 KiB budget, while `scripts/verify-i18n-seo.js` reports sitemap URL counts and metadata lengths.
- Assert absence for regressions such as superseded PNG assets, initial external analytics scripts, and foreign-host sitemap URLs in `scripts/verify-p1.js` and `scripts/verify-i18n-seo.js`.
- Keep expected runtime failure cases separate from artifact assertions. Typed failures in `src/lib/attribution/primitives/envelope.ts` and fallback behavior in `src/lib/githubStarsClient.ts` currently require future unit coverage.

## CI Quality Gates

| Gate | Trigger and command | Coverage | File |
|------|---------------------|----------|------|
| PR build | Pull request; `pnpm install` then `pnpm run build` | International static export with `io`/English environment | `.github/workflows/preview.yml` |
| PR preview deploy | Successful preview-build workflow | Downloads and deploys the exact `out/` artifact | `.github/workflows/preview-deploy.yml` |
| Main image build | Push to `main` or manual dispatch; Docker Buildx | China static build packaged into the production image | `.github/workflows/fastgpt-home-image.yml` |
| Local lint | `npm run lint` | Source ESLint and Next Core Web Vitals | `package.json`, `eslint.config.mjs` |
| Local type check | `npx tsc --noEmit` | Strict TypeScript | `tsconfig.json` |
| Local artifact checks | `npm run verify:p0`, `verify:p1`, `verify:p2`, `verify:i18n-seo` after build | SEO, routing, assets, performance, deployment configuration | `package.json`, `scripts/verify-*.js` |

- The tracked GitHub workflows call `build` and deployment actions; they do not invoke `lint`, `tsc --noEmit`, or any `verify:*` command in `.github/workflows/preview.yml` or `.github/workflows/fastgpt-home-image.yml`.
- The `prepare` script in `package.json` invokes Husky, while no tracked `.husky/` directory is present; repository-defined commit hooks provide no quality gate.

## Verification Guidance

| Changed surface | Minimum verification | Additional evidence | Paths |
|-----------------|----------------------|---------------------|-------|
| Shared TypeScript logic | `npm run lint`, `npx tsc --noEmit`, `npm run build` | Direct edge-case checks until a unit runner exists | `src/lib/`, `src/content/competitor/loader.ts` |
| Routes, metadata, locale ownership | Build both site variants and run all four `verify:*` commands | Inspect canonical, hreflang, sitemap, redirects, and generated HTML | `src/app/`, `src/lib/seo.ts`, `src/lib/siteRouting.ts`, `scripts/verify-*.js` |
| FAQ behavior or content | `npm run build`, `npm run verify:p0`, `npm run verify:p1`, `npm run verify:p2`, `npm run verify:i18n-seo` | Check reserved-character navigation and representative detail pages in the preview | `src/faq/`, `src/components/faq/`, `src/app/faq/`, `src/app/[lang]/faq/` |
| Comparison content or routes | Build both variants and run `npm run verify:i18n-seo` | Inspect hub/detail navigation, layout, and all registered slugs | `src/content/competitor/`, `src/components/compare/`, `src/app/compare/` |
| Homepage assets or performance | `npm run build`, `npm run verify:p1` | Inspect desktop/mobile preview and browser console | `src/components/home/`, `public/images/home/`, `public/images/hero/` |
| Redirects and security headers | `npm run build`, `npm run verify:p0`, `npm run verify:i18n-seo` | Validate deployed host/path behavior on the preview or target environment | `nginx.conf`, `nginx-security-headers.conf`, `public/_redirects`, `public/_headers` |
| Build and maintenance scripts | Run the affected script in a disposable or reviewed worktree, inspect `git diff`, then rebuild | Confirm generated `public/` and `out/` artifacts | `scripts/`, `package.json` |
| Interactive components | `npm run lint`, `npx tsc --noEmit`, `npm run build` | Manual keyboard, pointer, viewport, and responsive checks in the deployed preview | `src/components/faq/FAQList.tsx`, `src/components/header/LangSwitcher.tsx`, `src/components/home/Navbar.tsx`, `src/components/home/GlobeCanvas.tsx` |

- Review `git diff` after `npm run build` because `prebuild` writes crawler artifacts through `scripts/generate-robots.js` and `scripts/generate-llms.js`.
- Keep the environment that produced `out/` active while running verification; canonical URLs, default-locale routes, selected assets, robots output, and sitemap ownership depend on values consumed by `package.json`, `src/lib/siteRouting.ts`, and `scripts/verify-*.js`.
- Treat a successful static export as compile and route-generation evidence. Browser interaction and visual behavior still require preview inspection because automated browser tests are absent from `package.json` and `.github/workflows/`.

---

*Testing analysis: 2026-08-12*
