# Pitfalls Research

**Domain:** Next.js static-export FAQ metadata and URL migration
**Researched:** 2026-08-15
**Confidence:** MEDIUM

## Critical Pitfalls

### Pitfall 1: Metadata import changes the approved value during rendering

**What goes wrong:**
The workbook value is imported correctly but the browser emits a different title or description. In the current code, `normalizeFaqMetadata` truncates titles to a 60-character budget including ` - FastGPT`, adds the suffix, normalizes whitespace, and can append `...`. The audit has already recorded 38 title failures caused by truncation.

**Why it happens:**
Metadata presentation rules are treated as harmless formatting and applied after a fidelity import. A character-count rule also differs from a search-snippet preference: approved metadata is an exact delivery requirement for this milestone.

**How to avoid:**
Keep the approved workbook fields verbatim in one generated data file. Give exact imported values priority over the generic normalizer, with a narrow explicit policy for brand suffix ownership. Compare the rendered HTML `title`, description, and keywords against the approved source after build; count Unicode code points only where a documented limit is genuinely required.

**Warning signs:**
- A title ends in `...`, has a duplicated `FastGPT` suffix, or differs only in collapsed whitespace.
- Imported-record count is 1,195 while exact rendered-title count is smaller.
- A metadata helper receives every FAQ item without distinguishing approved records.

**Smallest runnable check:**
Run a Node assertion that loads the approved registry and emitted `out/faq/*.html`, then requires exact equality for each approved title, description, and keyword sequence.

**Phase to address:**
Phase 2 — approved-metadata import and fidelity regression check.

---

### Pitfall 2: A short-slug collision serves a plausible HTTP 200 page with the wrong FAQ identity

**What goes wrong:**
Two distinct questions share a legacy short slug, so one static page overwrites or represents the group. The URL returns HTTP 200, canonical and hreflang look valid, yet the H1 and JSON-LD belong to a different question. The audit measured 150 real collision groups after deduplication and 24 identity failures in the sampled import.

**Why it happens:**
Availability is used as a proxy for identity. Keys derived from the first few words collapse semantically different questions, and `Record<string, FaqItem>` silently admits only one value per key.

**How to avoid:**
Create a versioned FAQ route registry keyed by immutable source identity. Preserve a healthy existing key only when it maps to exactly one in-scope question; assign a deterministic repaired slug to each missing or unsafe identity. Hard-fail the generator on duplicate canonical slugs, duplicate normalized route paths, duplicate independent questions, or a registry entry lacking content.

**Warning signs:**
- More source questions than canonical IDs or generated static parameters.
- A route has 200 status but H1, JSON-LD question, or approved metadata belongs to another source record.
- Collision resolution selects the first array element without a documented identity decision.

**Smallest runnable check:**
Run `node scripts/verify-faq-migration.js` with assertions that canonical slug count equals in-scope identity count and every registry slug resolves to the expected `Question`.

**Phase to address:**
Phase 1 — identity inventory, deduplication, and canonical-slug registry.

---

### Pitfall 3: A collided legacy URL receives an arbitrary redirect destination

**What goes wrong:**
A single old path represents multiple distinct FAQ identities. Emitting several redirect rows makes the final destination depend on map order, and choosing a default silently sends visitors and search signals to unrelated content. This is redirect ambiguity, not an implementation detail.

**Why it happens:**
Redirects are generated from a source-to-target list that assumes every legacy path has one target. `Map#set` overwrites a prior value, so ambiguity can disappear during generation.

**How to avoid:**
Model redirect sources separately from canonical routes. Emit a 301 only when one legacy source has one approved destination. Preserve a healthy old URL as canonical when that keeps identity intact. For a collided source with no unambiguous equivalent, retain the serving page only for its verified identity and route remaining repair through new canonical URLs, with a documented no-redirect exception for the ambiguous source.

**Warning signs:**
- The number of unique redirect sources is lower than redirect input rows.
- A redirect map has the same source repeated in input or a target selected by insertion order.
- The migration table labels a multi-question legacy slug as a one-to-one 301.

**Smallest runnable check:**
Assert `new Set(source).size === source.length` after grouping; permit every source group only when its target set has size one, otherwise require an explicit `ambiguous: true` disposition and emit no redirect row.

**Phase to address:**
Phase 3 — redirect decision table and generated edge configuration.

---

### Pitfall 4: Encoding, punctuation, or case creates a second route identity

**What goes wrong:**
IDs with spaces, `%`, apostrophes, Unicode punctuation, or differing case are encoded in one subsystem and decoded in another. Static parameters, canonical URLs, sitemap URLs, HTML file paths, and redirect-map keys then describe different URL strings. A double-encoded `%25`, decoded redirect-map lookup, or trailing slash can produce a 404 or duplicate indexable page.

**Why it happens:**
The route page decodes `id`, while `getOwnedFaqPath` encodes it, and the redirect generator separately builds `encodeURIComponent(id)` values plus raw-ID aliases. These transformations are currently distributed across several modules.

**How to avoid:**
Make canonical registry slugs ASCII-safe and lower-case by construction for repaired entries. For preserved keys, define one route-segment encoder and one decoder contract, then use the canonical encoded path everywhere. Keep legacy raw-path aliases only where real request logs or the audit establish that form. Treat encoded, decoded, slash-terminated, and case variants as explicit test vectors.

**Warning signs:**
- `decodeURIComponent` errors are swallowed and the raw string is used as an ID.
- A sitemap location contains `%25` unexpectedly, a canonical URL differs from its anchor `href`, or Nginx and Worker maps use different source spellings.
- Two IDs normalize to the same encoded URL or differ only by case.

**Smallest runnable check:**
For every registry and legacy source, assert `decodeURIComponent(encodeURIComponent(id)) === id`, unique canonical encoded paths, and existence of the corresponding emitted `out/faq/<encoded-id>.html` file.

**Phase to address:**
Phase 1 — route-registry contract; Phase 4 — encoded-route build verification.

---

### Pitfall 5: Canonical and hreflang point at a slug that is absent or belongs to another locale record

**What goes wrong:**
The English repair changes an ID while Chinese data still uses the old ID. `getFaqTranslationLocales` determines language availability by identical keys, while `getFaqAlternates` generates cross-domain URLs from that key. The page can therefore emit a Chinese alternate that 404s, a false translation pair, or lose the intended alternate silently.

**Why it happens:**
The current architecture uses the FAQ ID as both route identity and translation join key. A migration that changes only one locale breaks that hidden join.

**How to avoid:**
Add a translation mapping to the route registry for each repaired FAQ: English canonical ID, Chinese canonical ID, and an explicit `none` state when no equivalent published content exists. Generate canonical, hreflang, navigation links, JSON-LD breadcrumb URLs, and sitemap records from this mapping. Require reciprocal alternate links only for verified translation pairs.

**Warning signs:**
- English and Chinese FAQ ID sets diverge after the migration.
- `getFaqTranslationLocales` drops `zh` for a record that should be paired, or its target output page is missing.
- Canonical URL uses the repaired slug while an alternate still uses the legacy slug.

**Smallest runnable check:**
Build the site and parse each FAQ HTML document: every canonical must be self-referencing; every `hreflang` target must exist in the matching site export and reciprocate with the same language pair; `x-default` must equal the English canonical where English exists.

**Phase to address:**
Phase 4 — SEO graph and cross-domain export verification.

---

### Pitfall 6: Sitemap, internal links, static params, and page metadata read different FAQ key sets

**What goes wrong:**
The visible list links to a repaired URL while `generateStaticParams` excludes it, or the sitemap indexes an old alias while `generateMetadata` chooses a new canonical. With `dynamicParams = false`, any omitted parameter becomes a 404 in the static export even though related features appear healthy.

**Why it happens:**
Route consumers pull IDs through independent calls (`getFaqData`, `getFaqIds`, locale overlays, page wrappers, and sitemap generation). A one-off slug map applied in one location fails to propagate through every build-time consumer.

**How to avoid:**
Expose final canonical FAQ IDs only through the registry-backed FAQ accessors already used by page, sitemap, and redirect generation. Keep aliases outside the published ID collection. Make the migration verifier compare exact sets: in-scope canonical paths, static params, sitemap URLs, rendered internal FAQ links, and canonical links.

**Warning signs:**
- Sitemap URL count, `generateStaticParams` count, and canonical-registry count disagree.
- Build succeeds but a direct request to a sitemap FAQ URL is 404.
- An internal FAQ link points at `/en/faq/`, an old slug, or a route missing from output.

**Smallest runnable check:**
Extract `getFaqIds('en')`, sitemap FAQ URLs, static parameter IDs, and `out/faq/*.html`; assert equal canonical sets and reject aliases in the sitemap.

**Phase to address:**
Phase 4 — single-source route wiring and static-export regression suite.

---

### Pitfall 7: Redirect behavior drifts across Cloudflare Worker, Nginx, and obsolete `_redirects` files

**What goes wrong:**
One host redirects `/en/faq/<id>` while another serves 404, retains a stale destination, drops the query string, or applies a differently encoded key. This repository deliberately removes `out/_redirects`, creates `_worker.js`, and generates an Nginx map from the same build step; reintroducing a hand-edited `_redirects` restores a third conflicting source of truth.

**Why it happens:**
Static export has no runtime Next.js redirect layer. Edge and server behavior must be built separately, and hand-maintained host rules drift from application data.

**How to avoid:**
Generate both Worker and Nginx mappings exclusively from the validated redirect decision table. Keep `_redirects` absent, preserve query strings in the Worker, and test the Nginx `$uri` matching form with encoded and trailing-slash legacy fixtures. Include the generated `.next/nginx-redirects.conf` in the production image as the Dockerfile already expects.

**Warning signs:**
- `out/_redirects` exists, Worker and Nginx source counts differ, or a redirect fixture has different destinations by host.
- A legacy URL with `?utm_source=` loses its query string.
- A generated Nginx map is empty for the IO variant after a migration that has legacy paths.

**Smallest runnable check:**
After `npm run build`, assert `_redirects` is absent; parse `_worker.js` and `.next/nginx-redirects.conf` into maps; require equal source-to-target pairs and test representative raw, encoded, and slash variants.

**Phase to address:**
Phase 3 — generated redirect artifacts; Phase 5 — production-build release gate.

---

### Pitfall 8: Static export verifies code paths but release assets omit new FAQ pages or routing artifacts

**What goes wrong:**
The TypeScript registry passes unit-like checks, while the production export lacks an HTML file, contains an outdated sitemap, or lacks the generated Nginx redirect map in the container. Static hosting serves only generated assets, so production behavior follows `out/` and the container copy step.

**Why it happens:**
Developing with `next dev` exercises on-demand routes. Static export executes at build time, and `dynamicParams = false` converts a missing build-time path into a permanent 404 until the next deployment.

**How to avoid:**
Treat `npm run build` as the acceptance environment. Run the migration verifier before and after build, inspect exported page files and sitemap output, and run the existing SEO verification scripts. Keep one deterministic fixture for each repaired slug and each redirect disposition.

**Warning signs:**
- Dev works for a route that has no corresponding file under `out/faq/`.
- A release build skips `clean-locale-output.js`, or Docker cannot copy `.next/nginx-redirects.conf`.
- The post-build sitemap has fewer in-scope English canonical URLs than the registry.

**Smallest runnable check:**
Run `npm run build && node scripts/verify-faq-migration.js`; require zero missing canonical files, zero missing in-scope static routes, complete sitemap coverage, and present Worker/Nginx artifacts.

**Phase to address:**
Phase 5 — release-ready production build and artifact audit.

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Apply a first-five-words slug rule to every FAQ | Small generator | Recreates known collision groups and wrong-page 200s | Never for canonical URLs |
| Use a `Map` of redirects without pre-grouping sources | Few lines of code | Last-write-wins masks collision ambiguity | Only after a one-to-one validator runs |
| Keep title truncation in the approved metadata path | Uniform snippets | Fails exact metadata fidelity and weakens intended query coverage | Only for unapproved, authored fallback metadata |
| Hand-edit Worker, Nginx, or `_redirects` independently | Fast emergency patch | Hosts diverge and next build overwrites part of the change | A time-boxed incident patch with a same-release generator update |
| Generate only changed routes in static params | Faster local build | Repaired or preserved URLs can become exported 404s | Never with `dynamicParams = false` |

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Approved metadata workbook | Join rows by mutable slug or title | Join by stable source identity; report missing, duplicate, and unused records before writing data |
| Next.js App Router export | Expect `redirects`, rewrites, or on-demand dynamic routes from `next.config.js` | Generate every canonical FAQ parameter at build and serve redirects at Worker/Nginx |
| Cloudflare Worker and Nginx | Encode map keys independently or update only one host | Build both maps from the validated redirect table and diff their entries |
| Cross-domain locales | Infer a translation from matching short slugs | Use an explicit verified translation mapping and require reciprocal `hreflang` targets |

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Reparse the workbook or scan all exported HTML once per FAQ | Slow verification and high memory churn | Parse authoritative generated data once; build maps and sets; scan output once | Around 1,195 records in CI, sooner on slower runners |
| O(n²) duplicate/collision checks | Local verifier feels slow as FAQ records grow | Group IDs and encoded paths with `Map`/`Set` in one pass | Current 1,400-record data is manageable; recurring migrations make it needless friction |
| Add all legacy aliases to sitemap | Inflated crawl surface and duplicate canonical signals | Sitemap only final canonical URLs; redirects remain outside it | Immediately, because aliases are never canonical |

## Security Mistakes

| Mistake | Risk | Prevention |
|---------|------|------------|
| Serialize spreadsheet fields into TS/JSON without escaping validation | Build breakage or injected markup in metadata/JSON-LD | Parse structured data, validate required string fields, and use serializers rather than source-text interpolation |
| Let a decoded path select arbitrary object keys | Route confusion through malformed percent encoding | Catch invalid decoding as a hard 404; look up only registry IDs and verify the encoded canonical path |
| Redirect a collision to an unrelated commercial FAQ | Misleading navigation and search-quality loss | Require unique source-to-target mapping or an explicit no-redirect disposition |

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Redirecting a collided legacy slug to an arbitrary FAQ | Visitor lands on a convincing but irrelevant answer | Preserve the verified legacy identity and give repaired questions their own clear canonical URLs |
| Preserving a 200 URL whose H1 has changed identity | Search visitor sees an answer for a different question | Verify H1, JSON-LD question, title, and canonical target as one identity tuple |
| Publishing alternates for unpaired languages | Language switcher or search alternate reaches 404/wrong content | Emit alternate links only for verified published counterparts |

## "Looks Done But Isn't" Checklist

- [ ] **Metadata import:** 1,195 rows appear in generated data — verify rendered title, description, and keywords exactly match every approved row.
- [ ] **Slug repair:** every repaired ID is unique — verify H1 and JSON-LD question match the registry identity for every canonical path.
- [ ] **Redirects:** every old path returns 301 — verify each source has one approved destination and each final destination is a static 200 page.
- [ ] **Canonical/hreflang:** HTML tags are present — verify targets are final canonical URLs, exported, and reciprocal across verified language pairs.
- [ ] **Sitemap:** URL count rises — verify it contains each canonical FAQ exactly once and contains no redirect aliases.
- [ ] **Static export:** `next build` succeeds — verify `out/faq/` files, `_worker.js`, and `.next/nginx-redirects.conf` contain the migration artifacts.
- [ ] **Route aliases:** `/en/faq/` redirects in a browser — verify raw, encoded, query-string, and trailing-slash forms consistently at every hosting edge.

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Wrong-page 200 from slug collision | HIGH | Remove the ambiguous canonical assignment, restore the verified legacy identity, allocate unique repaired routes, regenerate artifacts, and re-submit final sitemap URLs. |
| Metadata title mutation | MEDIUM | Restore exact approved value, change the metadata policy for approved records, run HTML fidelity checks, and rebuild. |
| Ambiguous redirect deployed | HIGH | Remove the redirect immediately, preserve only confirmed one-to-one mappings, publish a documented disposition for the source, then rebuild Worker and Nginx artifacts. |
| Encoded-path 404 | MEDIUM | Identify raw versus encoded request form from the registry and edge logs, repair the shared path generator/map key, add the fixture, and rebuild. |
| Sitemap/static-param mismatch | MEDIUM | Rewire both consumers to registry-backed IDs, regenerate output, then compare output file, sitemap, and canonical sets. |

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Duplicate question and canonical-slug collision | Phase 1 — identity inventory and registry | Independent questions, canonical slugs, and encoded route paths have one-to-one set equality. |
| Metadata mutation and title truncation | Phase 2 — approved metadata import | Built HTML values exactly equal all approved source fields. |
| Collision redirect ambiguity and alias drift | Phase 3 — redirect decision table | Every emitted source maps to one target; ambiguous sources have an explicit no-redirect disposition. |
| Canonical, hreflang, sitemap, and static-param divergence | Phase 4 — SEO graph and export validation | Parse generated HTML/sitemap and compare final canonical route sets. |
| Worker/Nginx artifact drift and release-only 404s | Phase 5 — production release gate | Successful production build plus generated-artifact map diff and static-file assertions. |

## Sources

- [Next.js static export guide](https://nextjs.org/docs/app/guides/static-exports) — MEDIUM confidence, verified against the repository’s `output: 'export'` configuration.
- [Next.js generateStaticParams reference](https://nextjs.org/docs/app/api-reference/functions/generate-static-params) — MEDIUM confidence, verified against FAQ dynamic routes using `dynamicParams = false`.
- [Google Search Central: site moves with URL changes](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes) — MEDIUM confidence, verified against the migration requirements.
- [Nginx map module](https://nginx.org/en/docs/http/ngx_http_map_module.html) — MEDIUM confidence, verified against the generated `$uri` redirect map.
- Internal evidence: `.planning/PROJECT.md`, `src/lib/faqMetadata.ts`, `src/faq/index.ts`, `src/app/[lang]/faq/[id]/page.tsx`, `src/app/sitemap.ts`, `scripts/lib/redirects.js`, `nginx.conf`, and the 2026-08-14 acceptance audit.

---
*Pitfalls research for: FastGPT English FAQ SEO repair*
*Researched: 2026-08-15*
