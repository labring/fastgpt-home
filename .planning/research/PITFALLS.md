# Pitfalls Research

**Domain:** FastGPT bilingual Guide content center on Next.js static export
**Researched:** 2026-08-16
**Confidence:** HIGH for repository-specific risks; MEDIUM for current external platform guidance

## Critical Pitfalls

### Pitfall 1: Domain ownership is bypassed by a locale-prefixed or single-domain Guide route

**What goes wrong:**
Guide pages appear under `/zh/guide/<slug>`, `/en/guide/<slug>`, or both domains. The required public URLs are exactly `https://fastgpt.cn/guide/<slug>` for Chinese and `https://fastgpt.io/guide/<slug>` for English. Publishing English on `.cn` is especially costly because the supplied release specification records a Googlebot restriction there.

**Why it happens:**
The repository has both legacy locale-prefixed technical routes and domain-owned default-locale routes. A route copied from `src/app/[lang]/[section]/[slug]` follows the former topology, while `getOwnedLocalePath()` deliberately treats `en` and `zh` as unprefixed paths.

**How to avoid:**
Use `getOwnedLocaleUrl('zh', '/guide/...')` and `getOwnedLocaleUrl('en', '/guide/...')` as the sole URL source. Add a small Guide route helper/registry that accepts only the paired `zh` and `en` records, then assert every canonical, link, sitemap entry, and JSON-LD URL uses it. Treat `/zh/guide/**` and `/en/guide/**` as absent routes unless a deliberate migration contract is added.

**Warning signs:**
- A static export contains `out/zh/guide` or `out/en/guide`.
- A Guide canonical contains a language prefix, the wrong host, or a preview host.
- An English article is discoverable in the cn sitemap or a Chinese article in the io sitemap.

**Phase to address:**
Phase 1 — Guide registry and owned-route contract.

---

### Pitfall 2: The two source sets drift from their required same-slug one-to-one mapping

**What goes wrong:**
One language is published without its counterpart, two filenames produce divergent route keys, or an article is accidentally mapped to a neighboring translation. The page can render and still form an invalid international SEO pair.

**Why it happens:**
The 16 source filenames are editorial labels, while slug/canonical data live inside an HTML comment. The eight slugs must be read from the source metadata, then joined as a set; filename order is not a route identity.

**How to avoid:**
Build one committed Guide registry from the approved documents with `{ slug, zh, en }` records. Validate exactly eight unique lower-case slugs, every record has both language bodies, and `new Set(zhSlugs) === new Set(enSlugs)`. The route, hub cards, metadata, sitemap, related links, and release verifier must consume this registry.

**Warning signs:**
- Static params are created independently for Chinese and English.
- A fallback lets a missing translation render the other language.
- Registry cardinality differs from `8 × 2`, or a hub card’s href lacks a paired source record.

**Phase to address:**
Phase 1 — source intake, pairing, and fidelity validation.

---

### Pitfall 3: Canonical and hreflang form a conflicting or incomplete cluster

**What goes wrong:**
The Chinese and English pages point a canonical at each other, emit different alternate sets, omit self references, or send `x-default` to the Chinese URL. Search engines then receive conflicting consolidation and locale signals.

**Why it happens:**
Existing `getAlternates()` supports broad locale collections, while Guide needs a strict two-language cluster. Existing `verify-i18n-seo.js` only checks fixed representative paths and four comparison slugs; it contains no Guide traversal.

**How to avoid:**
For every member of a Guide pair, generate a self canonical plus the identical three alternates: `zh-CN → cn/guide/<slug>`, `en → io/guide/<slug>`, and `x-default → io/guide/<slug>`. Use a Guide-specific equivalent of `getCompareAlternates()` and verify all 16 exported HTML files from the registry, including metadata URL, `og:url`, and Article/BreadcrumbList URLs.

**Warning signs:**
- The two exported pages have different `hreflang` key sets or values.
- A canonical target does not equal its page’s owned URL.
- The cn or io sitemap contains a foreign-host Guide URL.

**Phase to address:**
Phase 2 — routes, metadata, structured data, and SEO graph.

---

### Pitfall 4: Delivery metadata leaks into the public article body

**What goes wrong:**
The source documents begin with an HTML-comment delivery block containing canonical, keyword, internal-link, source, and approval information. `MarkdownContent` has no HTML-comment token and will treat those lines as ordinary paragraph text if it receives the raw file.

**Why it happens:**
The existing tech loader expects YAML-like front matter delimited by `---`, while the Week04 Guide package uses `<!-- ... -->`. Reusing the renderer without a source adapter publishes editorial instructions, including approval context, in the article body.

**How to avoid:**
At the repository-owned content boundary, parse and remove exactly one leading delivery comment; reject missing, unterminated, duplicate, or trailing delivery comments. Map approved fields to typed metadata and pass only the original Markdown body beginning at its `#` title to the renderer. Assert the exported HTML excludes delivery-only labels and retains the intended H1/body.

**Warning signs:**
- Rendered HTML includes `Delivery metadata`, `交付元数据`, `canonical:`, `签发:`, or `配图需求:`.
- The first visible text precedes the H1, or a delivery field becomes an H2/paragraph.
- A parser silently accepts a malformed comment block.

**Phase to address:**
Phase 1 — source adapter and content-fidelity gate.

---

### Pitfall 5: “Helpful” normalization changes approved editorial content or facts

**What goes wrong:**
Article bodies, titles, descriptions, tables, inline links, dates, numbers, case-study anonymization, or English wording change during import. A successful build can still violate the approved Week04 source of truth.

**Why it happens:**
The current tech-content parser derives descriptions when metadata is absent, normalizes Markdown, and supports a limited grammar. The source package also includes irregular delivery fields, including blank/malformed image guidance, so a generic fallback can conceal input defects.

**How to avoid:**
Preserve each approved body byte-for-byte after newline normalization and keep title/description as approved values. Validate a manifest of source body hashes, exact slugs, metadata, heading sequence, and prohibited delivery-text markers before build; do not derive alternate copy. Escalate malformed metadata for an explicit editorial decision instead of guessing.

**Warning signs:**
- A generated description comes from `getTechArticleDescription()` rather than an approved Guide field.
- Numeric tokens, dates, named/anonymous case descriptions, or external links differ from source.
- Markdown conversion flattens a table, nested list, code block, or allowed relative link.

**Phase to address:**
Phase 1 — approved-content import and manifest verification.

---

### Pitfall 6: Required images become broken, oversized, or unverified social previews

**What goes wrong:**
Articles whose delivery metadata requests diagrams launch with missing assets, wrong alt text, source-only files, or large hero images that degrade the static export. An absent image can be intentional only where the approved document specifies no image.

**Why it happens:**
The reusable article component renders `next/image` only when its typed article image exists, while the Week04 image requests are prose in the stripped delivery block. Current image checks focus on existing FAQ/home assets, not Guide source-to-asset mapping.

**How to avoid:**
Make image disposition explicit per Guide record: `none` or a committed public asset with approved alt text, dimensions, and both output and Open Graph references. Keep images static and local; extend the existing Sharp/export-equality checks to every declared Guide asset. A source request with no supplied image needs a recorded release decision before it can be marked `none`.

**Warning signs:**
- A requested image is lost when delivery metadata is stripped.
- Exported Guide HTML references an asset missing under `out/`.
- Hero image dimensions, alt text, or social-image URL differ by language without an approved record.

**Phase to address:**
Phase 1 — content asset inventory; Phase 3 — artifact budget and export checks.

---

### Pitfall 7: Static generation produces only a subset, the wrong variant, or case-colliding output

**What goes wrong:**
All pages work in development but one owner build omits eight routes, emits a 404 for the hub, or writes paths that collide on a case-insensitive workstation. With `output: 'export'` and `dynamicParams = false`, omitted params have no runtime recovery.

**Why it happens:**
The existing tech route intentionally slices parameters outside preview. The repository also has a release gate that fails closed on case-insensitive hosts because content filename/path collisions have already occurred. Adding dynamic Guide routes without an explicit variant-aware inventory repeats both failure modes.

**How to avoid:**
Generate Guide hub and detail static params from the paired registry for the current owner variant, then assert exact expected files in `out/` after each clean io and cn build. Run the full release gate on Linux, Docker, or case-sensitive APFS. Reject case-insensitive duplicate normalized paths at source-check time.

**Warning signs:**
- `generateStaticParams()` contains a sample slice, a hard-coded slug list, or locale fallback.
- A build passes while its `out/guide` count is less than eight.
- Output inspection runs only once, after the second owner build has overwritten `out/`.

**Phase to address:**
Phase 3 — two-owner static-export release gate.

---

### Pitfall 8: Hub, article links, sitemap, and JSON-LD use separate inventories

**What goes wrong:**
The 16 detail pages exist, yet the hub omits an article, internal links lead to legacy/prefixed routes, the sitemap omits a canonical URL, or structured data names a different page. The pages become difficult for visitors and crawlers to discover.

**Why it happens:**
The current site has several content registries and hard-coded route fixtures. `sitemap.ts`, navigation-shell exclusions, and `verify-i18n-seo.js` all require direct Guide updates; copying content into one component leaves the other surfaces stale.

**How to avoid:**
Derive both hubs, detail links, breadcrumb items, related links, sitemap entries, and Article JSON-LD from the same Guide registry. Extend the release verifier to traverse all 16 output documents and assert: one H1, canonical URL, three alternates, Article plus BreadcrumbList, owner sitemap membership, a hub-to-detail link, and only reachable internal targets.

**Warning signs:**
- The hub is hard-coded separately from `generateStaticParams()`.
- A sitemap count increases by fewer than nine URLs per owner (hub plus eight details).
- `HomeLayoutSwitcher` or nav handling leaves Guide inside the landing-page shell unexpectedly.

**Phase to address:**
Phase 2 — hub/article integration; Phase 3 — output graph verification.

---

### Pitfall 9: Deployment publishes a correct local build with stale routing, cache, or crawl policy

**What goes wrong:**
The code and local `out/` pass, yet production serves a previous artifact, a target-specific routing policy, cached 404, wrong HTML language, or stale sitemap. Preview validates only one environment while China and international deployment paths differ.

**Why it happens:**
Cloudflare and Nginx keep redirects/headers separately, production image tooling performs source rewrites, and existing CI does not enforce the complete verifier matrix. Static files have no application server that can repair a bad deployment after upload.

**How to avoid:**
Promote only the exact two verified build artifacts and retain the prior artifact/image for rollback. Before release, record deployment revision, owner-variant environment, route count, sitemap digest, and cache purge scope. After release, fetch each canonical URL without following redirects and inspect the final HTML, `robots.txt`, and sitemap from both public domains; roll back on any identity, indexability, or owner mismatch.

**Warning signs:**
- Preview evidence is used as production evidence.
- The deployed sitemap timestamp or hash differs from the tested artifact.
- A CDN returns 404/old HTML for a new Guide URL while the origin build contains it.

**Phase to address:**
Phase 4 — deployment runbook, rollback, and live verification.

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Copy the tech-center parser and route unchanged | Fast first render | It assumes `/zh/<section>/<slug>`, only Chinese content, and YAML front matter | Never for Guide routing or source parsing |
| Hard-code eight slugs in page, sitemap, and verifier | Few lines now | Drift creates silent discovery and hreflang gaps | Never; one typed registry is smaller than three lists |
| Render the raw source after deleting the first few lines | Minimal importer | Comment layout changes leak metadata or truncate body | Never; parse one bounded leading block |
| Rebuild on the deploy host without owner-specific artifact evidence | Fewer CI steps | Dependency/environment drift and case sensitivity invalidate the proof | Only for an emergency rollback to an already verified revision |
| Treat all image requests as optional | Avoids asset work | Approved visual requirements and social previews silently disappear | Only after a documented content-owner decision per record |

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| `siteRouting.ts` | Compose host/path strings locally or use `/zh` and `/en` prefixes | Use owned URL helpers from the Guide registry for every public URL |
| Next.js static export | Depend on runtime dynamic routing or check one build only | Enumerate owner-variant params and verify concrete `out/guide` files in both builds |
| `MarkdownContent` | Send delivery-comment source directly to renderer | Strip and validate the leading comment before passing the approved body |
| Sitemap/robots | Add only detail routes or inspect source sitemap code | Include each owner hub plus eight owner details and inspect generated XML/robots |
| Nginx and Cloudflare | Assume preview redirect/cache behavior equals production | Validate the deployed target’s headers, status, canonical HTML, and sitemap separately |

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Add client-side Guide catalog/search for eight documents | Extra hydration and initial JavaScript over the fixed 260 KiB gzip gate | Render a server hub from the registry; defer interaction until a concrete need exists | Immediately on the existing P1 budget |
| Parse all article files repeatedly during build | Longer builds and needless filesystem work | Read/validate registry once per build process and keep article loading deterministic | As content centers grow beyond this batch |
| Ship large unoptimized requested diagrams | Slow LCP and large static artifacts | Pre-size/compress local images and assert source/export dimensions and byte budgets | The first large hero image on mobile |
| Rely on static pages alone for discovery | Pages exist but have weak crawl paths | Hub links, sitemap entries, breadcrumbs, and related links from one registry | At launch for orphaned details |

## Security Mistakes

| Mistake | Risk | Prevention |
|---------|------|------------|
| Treat delivery comments as trusted renderable Markdown | Approval notes, internal source details, or editorial instructions become public | Parse delivery metadata at a strict boundary and render body only |
| Allow arbitrary Markdown link protocols or raw HTML during Guide import | Unsafe link schemes or unreviewed markup reach public pages | Retain the renderer’s URL allowlist and validate source links against it before import |
| Add a cross-domain redirect for guessed Guide aliases | Visitors and crawlers land on unrelated localized content | Publish only registry-backed, one-to-one aliases; all other paths stay absent |

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Hub shows only one language or mismatched cards | Visitors cannot discover their language’s full eight-article set | Render a complete owner-language hub from the paired registry |
| Article shell retains tech-center labels, `/tech-center` breadcrumb, or Chinese chrome on English pages | Content context and navigation feel incorrect | Parameterize reusable presentation with Guide label, hub path, locale, and published language set |
| Article Markdown begins with duplicate H1 or leaked delivery metadata | Heading hierarchy and reading flow degrade | Use the approved H1 once, strip delivery block, and validate exported headings |
| Internal recommendations target absent pages | Visitors hit 404s and crawl paths weaken | Resolve editorial link suggestions through a verified destination map; omit unresolved suggestions from launch |

## "Looks Done But Isn't" Checklist

- [ ] **Pair registry:** exactly eight unique slugs, each with Chinese and English body, approved title/description, and explicit image disposition.
- [ ] **Content fidelity:** exported H1/body contain no delivery-comment fields; hashes or equivalent exact source checks pass after newline normalization.
- [ ] **Owner paths:** only cn `/guide` plus eight Chinese details and io `/guide` plus eight English details exist in their respective exports.
- [ ] **SEO pair:** each of 16 documents has a self canonical and the same `zh-CN`, `en`, and `x-default` alternate targets.
- [ ] **Discovery graph:** both sitemaps have the owner hub plus eight owner details; hub, breadcrumb, JSON-LD, and related/internal links use those routes.
- [ ] **Static artifacts:** clean io and cn builds each have all expected, case-safe Guide HTML and exported assets; P1 remains within 260 KiB gzip.
- [ ] **Production:** all 16 canonical URLs return 200 without a redirect, match the deployed sitemap/robots policy, and expose the verified canonical/hreflang HTML.
- [ ] **Rollback:** release revision, prior artifact/image, cache-purge path, and a stop condition for mismatched live output are recorded.

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Wrong owner route or canonical | HIGH | Stop rollout, restore prior artifact, correct the registry-derived route/metadata, rebuild both owners, then validate live before re-purge/release |
| Missing or mismatched language pair | MEDIUM | Remove the incomplete page from hub/sitemap, restore the pair from approved source, regenerate alternates and both owner outputs |
| Delivery metadata visible in article | MEDIUM | Roll back or unpublish affected artifact, fix bounded comment parsing, compare rendered bodies with source, then redeploy |
| Missing/broken image | LOW to MEDIUM | Add the approved optimized asset or record `none`, rerun export/image verification, purge asset and page caches |
| Partial/stale deployment | HIGH | Roll back to prior verified revision, invalidate affected cache paths, compare live artifact digest/route list to release evidence, redeploy immutable verified artifacts |

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Wrong domain/prefix ownership | Phase 1 — registry contract | Registry URL assertions plus owner-output path inventory |
| Missing same-slug counterpart | Phase 1 — source intake | Exact eight-pair set equality and source-body presence assertions |
| Comment metadata leakage or source drift | Phase 1 — content adapter | Delivery-block parser tests, body/metadata manifest, exported text scan |
| Canonical/hreflang conflict | Phase 2 — metadata/SEO | All-16 output inspection for canonical and exact alternate map |
| Missing hub/internal/sitemap/JSON-LD links | Phase 2 — integration | Registry-to-hub, sitemap, breadcrumb, and structured-data graph traversal |
| Incomplete static export or path case collision | Phase 3 — release gate | Clean case-sensitive io/cn build, expected files, assets, route cardinality, P1 budget |
| Deployment/caching/crawl failure | Phase 4 — live release | Public 200/no-redirect crawl matrix, live HTML/robots/sitemap assertions, recorded rollback evidence |

## Sources

- Repository routing helpers and current SEO implementation: `src/lib/siteRouting.ts`, `src/lib/seo.ts`, `src/app/sitemap.ts`, `scripts/verify-i18n-seo.js` — HIGH.
- Existing Markdown/content behavior: `src/lib/tech-center-content.ts`, `src/components/tech-center/MarkdownContent.tsx`, `src/components/tech-center/TechArticlePage.tsx` — HIGH.
- Existing static-release risks and test coverage: `.planning/codebase/CONCERNS.md`, `.planning/codebase/TESTING.md`, `.planning/milestones/v1.0-phases/04-redirects-and-release-gate/04-VERIFICATION.md` — HIGH.
- Approved Week04 source package and Guide route/hreflang specification: `/Users/longnv/bin/repo/fastgpt-data/Week04/README.md`, `附-深度内容栏目路由与hreflang规格.md`, and the 16 paired Markdown documents — HIGH.
- [Next.js static export guidance](https://nextjs.org/docs/app/guides/static-exports), [generateStaticParams reference](https://nextjs.org/docs/app/api-reference/functions/generate-static-params), [Google canonical guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) — MEDIUM, verified 2026-08-16.

---
*Pitfalls research for: FastGPT v1.1 Guide Content Center*
*Researched: 2026-08-16*
