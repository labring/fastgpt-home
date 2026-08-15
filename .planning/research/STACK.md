# Stack Research

**Domain:** Static-export FAQ metadata and URL-repair migration
**Researched:** 2026-08-15
**Confidence:** MEDIUM — current repository evidence is direct; external documentation was fetched through the MEDIUM-confidence websearch provider.

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended | Confidence |
|------------|---------|---------|-----------------|------------|
| Existing Next.js App Router static export | `next@16.2.6` | Render every final FAQ route, canonical, hreflang, JSON-LD, and sitemap entry during `next build`. | `src/app/[lang]/faq/[id]/page.tsx` and `src/app/faq/[id]/page.tsx` already derive static params from `getFaqIds`, while `src/app/sitemap.ts` consumes the same IDs. Keep the final slug registry inside this existing data path so all SEO surfaces move together. | HIGH (repository), MEDIUM (official docs) |
| Existing Node.js build-script runtime | Declared `>=18`; Docker `22`; local `24.13.0` | Run post-import checks, inspect generated static HTML, and construct deployment redirect maps. | The repository already uses CommonJS `node:fs`, `node:path`, `node:assert/strict`, `encodeURIComponent`, and TypeScript's AST in `scripts/`. These are sufficient for deterministic source inspection and validation at this scale. | HIGH |
| Existing Python XLSX importer pattern | Python 3.11+ with standard library | Read the approved Week04 workbook and render reviewed metadata plus a slug migration registry deterministically. | `scripts/sync-w3-faq.py` already parses XLSX with `zipfile` and `xml.etree.ElementTree`, then emits stable TypeScript. The Week04 workbook has inline strings and no `xl/sharedStrings.xml`, so the same small parser fits the authoritative input. Use `re`, `json`, and `hashlib` from the standard library for validation, rendering, and collision suffixes. | HIGH (repository/workbook), MEDIUM (official docs) |
| Existing post-build redirect generators | Current `scripts/lib/redirects.js`, `scripts/clean-locale-output.js`, Nginx map, Cloudflare Worker | Emit permanent redirects for changed legacy FAQ paths on both production targets. | Static export has no request-time Next.js redirect layer. This repository already generates an Nginx `map` for the CN image and a Cloudflare Worker `Map` for the IO deployment, preserving query strings and handling encoded paths. Extend that single generator from the slug migration registry. | HIGH (repository), MEDIUM (official docs) |

### Supporting Libraries

| Library | Version | Purpose | When to Use | Confidence |
|---------|---------|---------|-------------|------------|
| `typescript` | `5.9.3` (existing dev dependency) | Parse `src/faq/en.ts` object keys inside Node verification/build scripts. | Reuse `scripts/lib/redirects.js`'s current AST reader when a script must inspect TypeScript source. Generated migration data should otherwise be plain deterministic JSON or a simple object literal to keep Node and App Router consumers aligned. | HIGH |
| `node:assert/strict` | Node built-in | Fail the migration check on unmatched rows, duplicate canonical slugs, invalid slug format, redirect ambiguity, or missing output pages. | Use in one new `scripts/verify-faq-seo-repair.js`, following the existing `verify-*.js` convention. | HIGH |
| `node:fs`, `node:path`, `encodeURIComponent` | Node built-ins/global | Read generated source and `out/`, resolve export filenames, and compare redirect keys with URL-safe route values. | Use synchronous APIs in the short build-time check, matching all current verification scripts. Encode each emitted path exactly as `getFaqPath` and `getOwnedFaqUrl` do. | HIGH |
| `src/faq/legacyMeta.ts` | Existing module | Hold approved title, description, and keyword overrides keyed by the final canonical FAQ ID. | Extend the existing English overlay instead of adding a second runtime metadata system. Expand its picked fields to include `Keywords` only when the imported workbook differs from authored keywords. | HIGH |
| `scripts/lib/redirects.js` | Existing module | Build canonical cross-domain and legacy redirect maps. | Add changed English legacy-to-canonical mappings here; retain its existing `addRedirect` behavior for slash variants and its `encodeURIComponent` handling for encoded variants. | HIGH |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| `scripts/sync-w3-faq.py` | Local reference implementation for XLSX-to-TypeScript generation and source drift checking. | Add a sibling Week04 importer with `--write` and default `--check` behavior. It should read only the workbook path supplied on the command line and overwrite only its generated artifact with sorted, stable output. |
| `npm run verify:i18n-seo` | Existing build-output SEO and redirect verification. | Run after the production build; it already validates HTML existence, canonical URLs, sitemap uniqueness, and generated Cloudflare/Nginx maps. Add the migration-specific verifier before or alongside it. |
| `npm run build` | Existing static export and output finalization. | The command runs `next build`, then `clean-locale-output.js`, `clean-faq-rsc.js`, and `fix-html-lang.js`. Redirect validation must inspect the post-build `out/` and `.next/nginx-redirects.conf` artifacts. |
| Working Python interpreter | Execute the standard-library importer. | This checkout's default `python3` resolves to Python 3.14.4 whose `pyexpat` extension currently fails to load. `/Users/longnv/.local/bin/python3.12` and `python3.11` import `zipfile` and `xml.etree.ElementTree` successfully. Preflight the interpreter in development and CI. |

## Recommended Data and Script Pattern

1. Add `scripts/import-week04-faq-meta.py` by adapting `scripts/sync-w3-faq.py`. Parse the Week04 sheet with `zipfile` and `xml.etree.ElementTree`, require the eleven observed headers, and reject blank or duplicate online URLs.
2. Have that script emit one reviewable generated FAQ migration artifact. Each record should include the existing source slug, final canonical slug, approved `Title`, `Description`, and `Keywords`. Use sorted records and `json.dumps`/stable escaping so `--check` detects drift without formatting noise.
3. Preserve every source slug that is already healthy by making its canonical slug identical. For a repaired record, derive an ASCII lower-case `a-z0-9-` slug from the approved question; reserve existing and earlier generated slugs; add a fixed short `hashlib.sha256(question.encode('utf-8'))` suffix only when a collision occurs. A committed registry is the authority after generation, so later title edits never change established URLs.
4. Make `src/faq/index.ts` resolve canonical IDs from that registry before its existing metadata overlay. Feed the same registry to `scripts/lib/redirects.js`; emit a 301 only where source and canonical IDs differ and the destination exists exactly once.
5. Add `scripts/verify-faq-seo-repair.js` and one package command. It should assert 1,195 exact metadata matches, one-to-one canonical slug uniqueness, healthy-slug identity, valid changed redirects in the generated platform maps, and exported HTML for every in-scope canonical path. Keep `npm run verify:i18n-seo` as the cross-cutting build-output check.

## Installation

No npm package or production-service change is warranted.

```bash
npm ci

WORKBOOK='/Users/longnv/bin/repo/fastgpt-data/Week04/存量修复-补Meta第2批/FastGPT-存量FAQ补Meta-第2批1195条-V1.0-星触达-20260811.xlsx'
PYTHON='/Users/longnv/.local/bin/python3.12'

"$PYTHON" -c 'import zipfile, xml.etree.ElementTree'
"$PYTHON" scripts/import-week04-faq-meta.py "$WORKBOOK" --write
"$PYTHON" scripts/import-week04-faq-meta.py "$WORKBOOK" --check

npm run verify:faq-seo-repair
NEXT_PUBLIC_SITE_VARIANT=io npm run build
npm run verify:i18n-seo
```

`verify:faq-seo-repair` is the recommended new package script pointing to the single migration verifier. The importer and verifier belong in source control; the workbook stays outside the application bundle.

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Python standard-library XLSX reader copied from `sync-w3-faq.py` | `xlsx`, `exceljs`, or Python `openpyxl` | Use a parser dependency only if a future workbook relies on formulas, shared strings, merged-cell semantics, or unsupported cell types that the checked-in standard-library reader explicitly rejects. The supplied Week04 input needs none of those capabilities. |
| Committed canonical-slug registry with identity entries for healthy paths | Regenerate every FAQ key from its current question/title | Use a complete URL rewrite only for a deliberate site-wide migration with a full redirect inventory. The active milestone protects indexed paths and benefits from an explicit change set. |
| Existing Nginx/Cloudflare post-build maps | `next.config.js` redirects, route-level `redirect()`, or client JavaScript | Use Next redirect mechanisms on a server-rendered deployment. This project exports static files, while the existing deployment generators provide the request-time redirect layer. |
| One Node assert verifier plus current `verify:i18n-seo` | New test framework or browser E2E suite | Add E2E coverage when interaction behavior changes. This milestone's correctness is build artifacts, generated source, and redirect data. |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| New spreadsheet parsing package | It adds a dependency surface for a one-time, deterministic development import already covered by a repository script pattern and standard libraries. | A sibling Python standard-library importer. |
| Dynamic runtime data fetch or server-side redirect | `output: 'export'` requires route data during build and excludes request-dependent server behavior. | Static generated data plus the existing platform redirect maps. |
| Slug changes inferred on every build | Content edits would silently alter canonical URLs and create unstable redirects. | A committed source-to-canonical registry with explicit identity mappings and collision handling. |
| Blind whole-file string replacement in `src/faq/en.ts` | FAQ bodies are authored content and the source contains roughly 1,400 records. | An importer that validates rows first, writes one generated metadata/migration artifact, and leaves body content untouched. |
| Default `python3` on this workstation | Its `xml.etree.ElementTree` import currently fails because `pyexpat` cannot load. | A preflighted Python 3.12/3.11 interpreter until the Homebrew Python installation is repaired. |

## Stack Patterns by Variant

**If an existing FAQ URL is healthy:**
- Keep its source and canonical slug equal in the registry.
- Preserve its current static page, canonical, sitemap entry, and zero migration redirect.

**If an existing FAQ slug is unsafe or missing:**
- Allocate the canonical slug once during import and retain its source-to-canonical mapping.
- Generate the canonical static path through `getFaqIds` and one 301 in the existing Nginx/Cloudflare maps after destination uniqueness passes.

**If the approved workbook changes:**
- Run the importer in `--check` mode in CI before allowing generated artifact drift.
- Require a reviewed regenerated diff, so the approved metadata and route mapping remain auditable.

**If a machine runs the importer:**
- Run `"$PYTHON" -c 'import zipfile, xml.etree.ElementTree'` first.
- Select a working Python 3.11+ interpreter when the host `python3` fails that preflight.

## Version Compatibility

| Package A | Compatible With | Notes |
|-----------|-----------------|-------|
| `next@16.2.6` | Existing App Router static export | Every repaired canonical ID must be returned by the existing `generateStaticParams`; `dynamicParams = false` makes missing IDs a build/publication error surface. |
| Node `>=18` | `typescript@5.9.3`, current CommonJS scripts | The existing scripts and Docker build already use these APIs. The direct repository evidence covers the recommended `node:fs`, `node:path`, assertions, URL encoding, and TypeScript AST approach. |
| Python 3.11+ | `zipfile`, `xml.etree.ElementTree`, `json`, `re`, `hashlib` | All are standard library modules. The script must preflight XML support because the checked-out host's default Python 3.14 installation is currently broken. |
| Generated FAQ registry | `src/faq/index.ts`, `src/app/sitemap.ts`, `scripts/lib/redirects.js` | Keep one source-to-canonical mapping consumed by runtime routes and post-build redirects; separate maps would allow sitemap, canonical, and redirect drift. |

## Sources

- [Next.js Static Exports](https://nextjs.org/docs/app/guides/static-exports) — static output, static-host constraints, and redirect limitations; MEDIUM confidence via verified websearch.
- [Next.js generateStaticParams](https://nextjs.org/docs/app/api-reference/functions/generate-static-params) — build-time dynamic route enumeration; MEDIUM confidence via verified websearch.
- [Node.js File System API](https://nodejs.org/api/fs.html) and [Path API](https://nodejs.org/api/path.html) — built-in file and path APIs; MEDIUM confidence via verified websearch.
- [Python `zipfile`](https://docs.python.org/3/library/zipfile.html) and [Python `xml.etree.ElementTree`](https://docs.python.org/3/library/xml.etree.elementtree.html) — standard-library XLSX container and XML parsing primitives; MEDIUM confidence via verified websearch.
- Repository evidence: `scripts/sync-w3-faq.py`, `scripts/lib/redirects.js`, `scripts/clean-locale-output.js`, `scripts/verify-i18n-seo.js`, `src/faq/index.ts`, `src/app/[lang]/faq/[id]/page.tsx`, `src/app/sitemap.ts`, and `package.json`; HIGH confidence.

---
*Stack research for: FastGPT English FAQ SEO Repair*
*Researched: 2026-08-15*
