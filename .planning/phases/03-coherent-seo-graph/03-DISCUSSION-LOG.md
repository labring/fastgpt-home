# Phase 3: Coherent SEO Graph - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in `03-CONTEXT.md`; this log preserves the alternatives considered.

**Date:** 2026-08-16
**Phase:** 3-Coherent SEO Graph
**Mode:** `--auto` (all gray areas selected, recommended options chosen in one pass)
**Areas discussed:** FAQ identity source, locale route keys, canonical and alternate URLs, published-counterpart fallback, discovery slug source, sitemap duplicate semantics, static build coverage

---

## FAQ identity source

| Option | Description | Selected |
|--------|-------------|----------|
| Durable contentId + resolved locale item | Use the Phase 1 registry identity, then read the locale catalog's authored Question/Answers/Category fields. | ✓ |
| Metadata title/source URL | Let approved title or workbook URL identify the page record. | |
| Per-route generated copy | Reconstruct page identity from each public slug or metadata record at render time. | |

**Auto-selected choice:** Durable contentId + resolved locale item (recommended default).
**Notes:** The existing English registry and the Chinese catalog already share durable content IDs; metadata remains a presentation layer.

---

## Locale route keys

| Option | Description | Selected |
|--------|-------------|----------|
| Convert identity to each locale's route key | English uses `canonicalSlug`; Chinese uses the translated `contentId` key before URL construction. | ✓ |
| Reuse one id string for every locale | Pass the English canonical slug to every locale URL. | |
| Allocate a new shared slug layer | Introduce a second cross-locale slug registry. | |

**Auto-selected choice:** Convert identity to each locale's route key (recommended default).
**Notes:** Repaired English slugs differ from Chinese source keys, so direct cross-locale reuse can create a 404 alternate.

---

## Canonical and alternate URLs

| Option | Description | Selected |
|--------|-------------|----------|
| Owner-domain URL helpers with exact public path | Use `siteRouting` ownership, unprefixed default-locale paths, and the current canonical route key. | ✓ |
| Current request host and path | Treat whichever host/path rendered the request as canonical. | |
| Prefix every locale explicitly | Use `/en/faq` and `/zh/faq` as canonical paths on both sites. | |

**Auto-selected choice:** Owner-domain URL helpers with exact public path (recommended default).
**Notes:** English canonical URLs belong to `fastgpt.io`; Simplified Chinese canonical URLs belong to `fastgpt.cn`; preserved mixed-case paths remain exact.

---

## Published-counterpart fallback

| Option | Description | Selected |
|--------|-------------|----------|
| Emit published counterparts only | Include `en`/`zh-CN` when the durable content ID exists; set `x-default` to English; omit unavailable keys. | ✓ |
| Emit all supported locales with English fallback | Point missing FAQ translations at a guessed or fallback route. | |
| Always emit all three keys | Publish hreflang values even when a target route is not generated. | |

**Auto-selected choice:** Emit published counterparts only (recommended default).
**Notes:** A bilingual record receives the valid `en`, `zh-CN`, and `x-default` pairing. A missing counterpart never creates a broken hreflang target; an English URL remains the x-default whenever it is published.

---

## Discovery slug source

| Option | Description | Selected |
|--------|-------------|----------|
| Registry/catalog helpers everywhere | Lists, related links, static params, breadcrumbs, and sitemap read committed final route IDs. | ✓ |
| Rebuild from Question or metadata | Derive a new slug in each consumer. | |
| Use legacy sources plus ad hoc canonical patches | Keep aliases in discovery surfaces and patch selected routes. | |

**Auto-selected choice:** Registry/catalog helpers everywhere (recommended default).
**Notes:** `getFaqPath` remains the public-path normalization boundary; locale catalogs provide the route IDs used by static parameters.

---

## Sitemap duplicate semantics

| Option | Description | Selected |
|--------|-------------|----------|
| Exact absolute URL de-duplication over canonical routes | Add one root/detail URL per owner-locale route, preserving distinct case-sensitive paths and excluding aliases. | ✓ |
| Case-insensitive URL collapse | Treat mixed-case canonical paths as the same URL. | |
| Include legacy aliases | Publish source/collision paths and rely on redirects later. | |

**Auto-selected choice:** Exact absolute URL de-duplication over canonical routes (recommended default).
**Notes:** `sourceSlug`, `legacySources`, collision-ledger entries, prefixed default-locale aliases, and `x-default` values stay outside sitemap entries. Redirect projection remains Phase 4.

---

## Static build coverage

| Option | Description | Selected |
|--------|-------------|----------|
| Dual owner-site static coverage with fail-closed resolution | The `io` build covers all English canonical slugs; the `cn` build covers all published Chinese content IDs; unknown IDs and duplicates fail. | ✓ |
| One default-site probe | Validate only whichever site variant is active during a local run. | |
| Dynamic fallback for missing routes | Let runtime lookup fill static-parameter gaps. | |

**Auto-selected choice:** Dual owner-site static coverage with fail-closed resolution (recommended default).
**Notes:** `dynamicParams = false` stays in force. Cross-domain alternates reference the counterpart site's build artifact without expanding the current site's sitemap.

---

## the agent's Discretion

- Select the smallest typed identity/route-key helper shape and keep URL ownership in existing routing modules.
- Reuse current JSON-LD, catalog, path, sitemap, and verification patterns without adding packages or network reads.
- Pick deterministic fixtures for preserved mixed-case, repaired lowercase, bilingual, and unavailable-counterpart cases.

## Deferred Ideas

- Phase 4 redirect projection for unique legacy paths and collision-ledger handling.
- Phase 4 aggregate verification, release build gate, and exported-HTML release audit.
- New translations, authored FAQ rewrites, metadata policy changes, historical body recovery, deployment, and crawl monitoring.

