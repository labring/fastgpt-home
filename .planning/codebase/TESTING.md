# Testing Patterns

**Analysis Date:** 2026-08-10

## Test Framework

**Runner:**
- Node.js scripts with `assert` in `scripts/verify-*.js`
- Verification steps focus on built artifacts in `out/`

**Assertion Library:**
- Built-in `node:assert/strict`
- Checks rely on `equal`, `ok`, and explicit assertion messages

**Run Commands:**
```bash
npm run build
node scripts/verify-p0.js
npm run verify:p1
npm run verify:p2
npm run verify:i18n-seo
```

## Test File Organization

**Location:**
- Verification scripts live in `scripts/`
- The site output under `out/` becomes the test target after build
- Source content and locale data live under `src/content/`, `src/locales/`, and `src/faq/`

**Naming:**
- `verify-p0.js`, `verify-p1.js`, `verify-p2.js`, and `verify-i18n-seo.js`
- `generate-*.js` and `clean-*.js` scripts support build and content upkeep

**Structure:**
```
scripts/
  verify-p0.js
  verify-p1.js
  verify-p2.js
  verify-i18n-seo.js
out/
  index.html
  faq/
  price.html
  sitemap.xml
```

## Test Structure

**Suite Organization:**
- Each script loads the static export, parses HTML tags, and asserts SEO and routing rules
- Failures stop the script with a non-zero exit code
- Success prints a short confirmation line

**Patterns:**
- Build artifacts are the source of truth
- Regular expressions extract tags and attributes from exported HTML
- `sharp` inspects image dimensions and file size budgets
- `zlib` checks initial JavaScript payload size in `scripts/verify-p1.js`

## Mocking

**Framework:**
- The current suite uses live built output and local files as the verification surface

**Patterns:**
- External services are handled by the application runtime, while verification scripts inspect exported artifacts
- Pure helper functions in `src/lib/` stay easy to exercise directly in future tests

**What to Mock:**
- A future unit-test layer can mock `fetch`, `fs`, and browser globals around content helpers

**What to Keep Real:**
- Build output, image assets, redirect files, and sitemap content

## Fixtures and Factories

**Test Data:**
- Exported pages in `out/`
- Locale dictionaries in `src/locales/`
- FAQ and tech-center content in `src/faq/` and `src/content/tech-center/`

**Location:**
- Source fixtures are authored content and generated export

## Coverage

**Requirements:**
- Coverage is verification-driven rather than percentage-driven
- The practical gate is successful build and artifact checks

**Configuration:**
- `npm run build` produces the artifact set
- Verification scripts inspect the generated `out/` tree

**View Coverage:**
```bash
node scripts/verify-p0.js
npm run verify:p1
npm run verify:p2
npm run verify:i18n-seo
```

## Test Types

**Unit Tests:**
- Pure helpers in `src/lib/` are good candidates for future unit coverage
- Current workflow leans on direct helper composition and build checks

**Integration Tests:**
- `verify-p1.js`, `verify-p2.js`, and `verify-i18n-seo.js` act as integration-style checks against the exported site

**E2E Tests:**
- Browser flows such as locale switching, CTA behavior, and analytics delivery still benefit from manual QA

## Common Patterns

**Async Testing:**
- `scripts/verify-p0.js` wraps image validation and static checks inside an async `main()` function

**Error Testing:**
- Scripts use `assert(fs.existsSync(filePath), 'Missing exported file')` style checks

**Snapshot Testing:**
- HTML structure is checked through explicit assertions

---

*Testing analysis: 2026-08-10*
*Update when test patterns change*
