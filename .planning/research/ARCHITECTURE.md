# Architecture Research

**Domain:** Static-export Next.js FAQ SEO migration
**Researched:** 2026-08-15
**Confidence:** HIGH for the current call paths; MEDIUM for host-runtime behavior, verified against current official documentation.

## Standard Architecture

### System Overview

```text
┌──────────────────────────────────────────────────────────────────────┐
│ Authoring and import                                                   │
│ Week04 workbook ──> stdlib importer ──> en-seo-registry.json          │
│ Existing en.ts bodies ───────────────────────────────────────┐        │
└──────────────────────────────────────────────────────────────┼────────┘
                                                               ▼
┌──────────────────────────────────────────────────────────────────────┐
│ FAQ catalog (`src/faq/index.ts` / catalog helper)                     │
│ contentId ↔ canonicalSlug, approved metadata, unique legacy aliases  │
│                 invariant validation occurs here once                 │
└───────┬───────────────────┬────────────────────┬─────────────────────┘
        │                   │                    │
        ▼                   ▼                    ▼
┌──────────────┐  ┌──────────────────┐  ┌─────────────────────────────┐
│ App routes   │  │ SEO consumers    │  │ Deployment redirect builder │
│ static params│  │ canonical,       │  │ Worker/Nginx maps from      │
│ detail lookup│  │ hreflang, links, │  │ unique legacy aliases       │
│ list cards   │  │ JSON-LD, sitemap │  │ collision aliases excluded  │
└───────┬──────┘  └─────────┬────────┘  └──────────────┬──────────────┘
        └───────────────────┴───────────────────────────┘
                            ▼
                 `next build` static output and checks
```

The smallest durable change is a single generated English SEO registry. It owns the mapping between a stable content identity and its final public slug. `src/faq/en.ts` continues to own authored questions, answers, and categories; the registry adds approved metadata and path history. Runtime routes, SEO helpers, sitemap generation, and deployment redirect scripts all obtain route data from the catalog built from these two inputs.

### Component Responsibilities

| Component | Responsibility | Typical implementation |
|---|---|---|
| Week04 importer | Read the approved workbook and produce a reviewable runtime artifact | One Python stdlib script, following the repository's `scripts/sync-w3-faq.py` XML/ZIP approach |
| `src/faq/en-seo-registry.json` | Authoritative `contentId → canonicalSlug`, approved metadata, unique redirect aliases, and collision audit records | Generated JSON shared by TypeScript and CommonJS scripts |
| FAQ catalog | Join English body data to registry and validate all identity/slug invariants | `src/faq/index.ts` plus a small catalog helper; expose typed read APIs only |
| App Router FAQ pages | Resolve a route slug, render one catalog item, and enumerate canonical slugs for static generation | Existing `src/app/faq/[id]/page.tsx` and `src/app/[lang]/faq/[id]/page.tsx`; `[id]` remains the on-disk segment while local variables become `faqSlug` |
| URL/SEO layer | Build locale/domain URLs from a canonical slug and produce reciprocal alternates by content identity | Keep generic URL assembly in `siteRouting.ts`; make the catalog supply the slug for each locale |
| Sitemap | Publish only canonical catalog routes on the owner domain | `src/app/sitemap.ts` iterates catalog route records |
| Redirect builder | Emit exact host-level redirects only for unique legacy source paths | `scripts/lib/redirects.js` reads the same JSON registry |
| Verification | Prove source fidelity and generated-output integrity | One focused `scripts/verify-faq-seo-repair.js`, then existing build and SEO checks |

## Recommended Project Structure

```text
src/faq/
├── en.ts                     # Existing authored English FAQ bodies, keyed by stable contentId
├── en-seo-registry.json      # Generated SEO route registry, shared source for runtime and scripts
├── catalog.ts                # Join and invariant enforcement; typed public FAQ route APIs
├── index.ts                  # Compatibility facade for existing FAQ consumers
├── legacyMeta.ts             # Retire after the registry fully carries approved metadata
└── legacyCategories.ts       # Existing category overlay remains independent

scripts/
├── import-week04-faq.py      # Workbook -> en-seo-registry.json, using Python standard library
├── lib/redirects.js          # Reads registry aliases to create Worker/Nginx maps
└── verify-faq-seo-repair.js  # Registry, export, sitemap, and redirect assertions
```

### Structure Rationale

- **`en.ts`:** Preserve content ownership and its existing stable keys. A repaired URL only changes registry data, keeping question/answer payload churn out of a route migration.
- **`en-seo-registry.json`:** It is the sole identity-to-public-slug mapping and can be imported by Next.js and read directly by CommonJS without a second parser or generated map.
- **`catalog.ts`:** One construction boundary prevents each route, sitemap, and script from independently joining `en.ts`, metadata overlays, and aliases.
- **`scripts/`:** Import and verification stay build-time tools, compatible with `output: 'export'` and the existing dependency constraint.

## Architectural Patterns

### Pattern 1: Stable Content Identity with Separate Canonical Slug

**What:** Treat the existing English object key as `contentId`, an internal durable identifier. Treat `canonicalSlug` as the public route token. The SEO registry stores both together, keeping a retained healthy slug equal to its identity where appropriate and assigning a new safe slug only for a repair.

**When to use:** Any route migration where content persists while public URL quality changes.

**Trade-offs:** It adds one generated data file, while it eliminates route-key renames, metadata overlays keyed to changing URLs, and per-consumer slug rules.

**Example:**

```typescript
type EnglishFaqSeoRecord = {
  contentId: string;
  canonicalSlug: string;
  approvedMetadata?: { title: string; description: string; keywords: string };
  legacyPaths: string[]; // only paths with exactly one destination
  collisionPaths: string[]; // audit-only: no redirect can be emitted
};

function createCatalog(bodyById: Record<string, FaqItem>, registry: EnglishFaqSeoRecord[]) {
  const bySlug = new Map<string, EnglishFaqSeoRecord>();
  for (const record of registry) {
    if (!bodyById[record.contentId] || bySlug.has(record.canonicalSlug)) {
      throw new Error(`Invalid FAQ registry entry: ${record.contentId}`);
    }
    bySlug.set(record.canonicalSlug, record);
  }
  return { bySlug };
}
```

The real catalog constructor must additionally require one registry row per current English body, a unique `contentId`, safe non-empty slug/path syntax, exact approved metadata for all 1,195 workbook matches, alias uniqueness, and no alias that overlaps a canonical path. This is the one invariant boundary for every route consumer.

### Pattern 2: Canonical Route Records, Not Raw Object Keys

**What:** Public APIs expose records such as `{ contentId, slug, item }`, `getFaqBySlug(locale, slug)`, `getCanonicalSlug(locale, contentId)`, `getCanonicalFaqRoutes(locale)`, and `getFaqRedirects()`. `getFaqIds` can remain temporarily as a compatibility alias for canonical route slugs during the migration.

**When to use:** Wherever current code derives a URL from an FAQ object's key.

**Trade-offs:** Renaming route-facing variables from `id` to `slug` touches several adapters, while all URL generation becomes explicit and testable.

**Example:**

```typescript
const route = getFaqBySlug(faqLangName, faqSlug);
if (!route) notFound();

const alternates = getFaqAlternatesForContent(route.contentId, route.availableLocales);
const canonicalUrl = getOwnedFaqUrl(langName, route.slug);
```

`siteRouting.ts` remains a generic locale/domain encoder: it receives a final public slug and must not import FAQ data. The catalog resolves identity-to-slug first, which avoids a routing/content circular dependency.

### Pattern 3: Redirects Are a Deployment Projection

**What:** Redirect definitions are derived from catalog aliases after registry validation. They are a projection for the selected deployment target, rather than route logic inside Next.js.

**When to use:** This project uses `output: 'export'` in production. Dynamic App Router redirects are unavailable in a static export, while the repository already emits a Cloudflare Worker map for `io` and an Nginx map for `cn`.

**Trade-offs:** Redirect behavior is verified after a production build. The result matches the actual host capabilities and keeps static route generation deterministic.

For an English repair, emit the direct root-path source (`/faq/<old>`) when it was historically live, plus locale-prefixed cross-domain aliases (`/en/faq/<old>`) where the current deployment convention supports them. Each source has one canonical `https://fastgpt.io/faq/<new>` destination. Preserve the request query string through the existing Worker/Nginx behavior.

### Pattern 4: Collision Ledger Rather Than Guesswork

**What:** Keep historically collided paths in `collisionPaths` with every affected `contentId` and no redirect target.

**When to use:** The W3 audit already reports historic short-slug collisions. One URL request lacks enough information to select among several intended FAQ identities.

**Trade-offs:** A collided legacy path remains unresolved until content governance assigns a unique owner. This preserves redirect correctness and creates a visible backlog.

The current `Map` implementation would silently let one insertion overwrite another. Registry validation must reject a duplicate redirect source before `scripts/lib/redirects.js` runs. Cloudflare also applies one selected rule for duplicate sources, so rule order cannot recover the lost identity.

## Data Flow

### Import and Catalog Flow

```text
Week04 workbook + route/audit mapping
        ↓ importer validates row count and match identity
`en-seo-registry.json` (contentId, slug, metadata, aliases)
        +
`en.ts` (body)
        ↓ createCatalog() validates once
canonical FAQ route records
        ├── App Router static params and detail resolution
        ├── metadata, links, canonical/hreflang, JSON-LD, sitemap
        └── redirect source → canonical URL specifications
```

The workbook is metadata authority for its 1,195 approved rows. The import must preserve title, description, and keywords byte-for-byte after the repository's explicit metadata normalization policy. Existing body data remains content authority. Rows outside the approved set retain current metadata through the catalog's existing fallback until a future authority is supplied.

### Request Flow

```text
/faq/<faqSlug>
    ↓ static HTML route generated from getCanonicalFaqRoutes('en')
`[id]/page.tsx` decodes faqSlug
    ↓ getFaqBySlug('en', faqSlug)
catalog route record
    ├── page body and related links
    ├── getOwnedFaqUrl(locale, canonicalSlug)
    └── alternate locales resolved by contentId → locale slug
```

Current call paths establish why every consumer must move together:

1. `src/app/[lang]/faq/[id]/page.tsx` and its root alias currently use `getFaqItem(id)` and `getFaqIds()` for lookup and `generateStaticParams()`. Both segments set `dynamicParams = false`, so the catalog's canonical slugs define the entire valid static route set.
2. `src/components/faq/FAQCard.tsx`, the detail page's related links, `src/lib/localizedRoutes.ts`, and `src/lib/siteRouting.ts` currently encode the same key into links and absolute URLs. Feed them catalog slugs only.
3. `generateMetadata()` currently calls `getFaqAlternates(faqLangName, faqId, ...)`. Refactor that boundary to accept `contentId`, look up each locale's canonical slug through the catalog, then call the existing generic URL builder. This retains correct cross-language alternates when English and Chinese public slugs differ.
4. `src/app/sitemap.ts` currently iterates `getFaqIds(locale)`. Iterate canonical route records, which prevents aliases and retired raw keys entering the sitemap.
5. `scripts/lib/redirects.js` currently extracts keys from `src/faq/en.ts`; it must read the shared registry and emit only its validated unique aliases. Chinese data may keep its existing static-key path until a separate migration requires it.

### State Management

FAQ data is build-time immutable. The catalog is a module-level derived value with no request-time mutation, database, API call, or client state. This matches Next.js static export: all valid dynamic paths must be known during `next build`, and `dynamicParams = false` serves only those paths.

## Migration Order

1. **Build the importer and registry contract.** Parse the Week04 workbook with Python standard library, match rows to stable English `contentId`s using the supplied audit mapping, and generate the complete registry. Keep healthy slugs unchanged. Record repaired canonical slugs, unique legacy aliases, and collision paths separately. Add a source-level check before any route code changes.
2. **Add catalog construction and invariants.** Join `en.ts`, existing category overlay, approved metadata, and registry records in one place. Preserve current exported API shapes where they return canonical slugs, then add identity-aware APIs for alternate generation and redirects. This phase makes a no-route-change build possible and catches data defects early.
3. **Move all route and SEO consumers to catalog APIs.** Detail resolution, root/localized `generateStaticParams`, cards, related links, metadata, canonical/hreflang helpers, JSON-LD breadcrumb URLs, and sitemap consume canonical route records. Build-time output now reflects repaired URLs consistently.
4. **Project legacy aliases into deployment maps.** Update `scripts/lib/redirects.js` and the existing output cleanup flow to read catalog redirect specifications. Validate Cloudflare Worker and Nginx maps against the same specifications; collision records produce no per-detail redirect.
5. **Run end-to-end verification.** Execute importer verification, the focused FAQ SEO verifier, `npm run build`, and the existing `verify:p2` plus `verify:i18n-seo` checks for every deployment variant used by release.

The order keeps metadata matching and identity validation ahead of route emission, keeps canonical static files ahead of redirects, and verifies the host artifacts only after their actual production build exists.

## Scaling Considerations

| Scale | Architecture adjustments |
|---|---|
| Current ~1,400 records | Static JSON registry and in-memory maps are trivial at build time; one catalog is sufficient. |
| 10,000 records | Retain generated JSON; optimize validation and static build reporting before considering a storage service. |
| 100,000+ records | Reassess static-export build duration and artifact count; partition sitemap and content publishing only when measurements show a release bottleneck. |

### Scaling Priorities

1. **First bottleneck:** data quality. Duplicate slugs, mismatched workbook rows, and alias overlap cause SEO faults at any size; catalog validation handles them deterministically.
2. **Second bottleneck:** static-build artifact volume. Measure `next build` duration and `out/` size before changing the static architecture.

## Anti-Patterns

### Anti-Pattern 1: Making the FAQ Object Key Serve Both Identity and URL Forever

**What people do:** Rename keys in `en.ts` to repair a path, then use the renamed key for content lookup, translation matching, static params, metadata, and redirects.

**Why it's wrong:** A path repair changes identity references across all consumers and loses the old source token needed for redirects and audit matching.

**Do this instead:** Keep `contentId` stable and obtain every public slug from the registry-backed catalog.

### Anti-Pattern 2: Per-Consumer Metadata and Slug Overlays

**What people do:** Add separate URL exceptions in pages, sitemap, `siteRouting.ts`, and redirect scripts.

**Why it's wrong:** Any overlooked consumer produces a 404, an alias in the sitemap, or a canonical/hreflang mismatch.

**Do this instead:** Validate and expose one catalog route record, then make every consumer call it.

### Anti-Pattern 3: Redirecting a Collided Historical URL to an Arbitrary Detail Page

**What people do:** Let last-write-wins `Map` insertion choose a destination.

**Why it's wrong:** A 301 tells search engines and users that one specific page replaces the shared URL, while the source cannot identify that page.

**Do this instead:** Keep collision paths audit-only until an owner is chosen. A deliberately approved generic fallback can be modeled separately if product policy later requires it.

### Anti-Pattern 4: Relying on Next.js Runtime Redirects

**What people do:** Add a route-level redirect to a project that exports static HTML.

**Why it's wrong:** Production `output: 'export'` generates files at build time and has no Next.js runtime for redirect handling.

**Do this instead:** Continue generating Cloudflare Worker and Nginx redirect artifacts from the validated catalog.

## Integration Points

### External Services

| Service | Integration pattern | Notes |
|---|---|---|
| Week04 XLSX source | Offline import during development/CI using Python standard library | The workbook is authoritative only for the approved 1,195 metadata rows; retain a reproducible input path or source hash in generated output. |
| Cloudflare Workers Static Assets | Generated exact-path redirect map runs before asset fetch in the repository's `_worker.js` | Worker code owns redirects; the `_redirects` file does not apply to requests served by Worker code. |
| Nginx deployment | Generated `.next/nginx-redirects.conf` included by the existing production image | Use the same redirect specifications and preserve query strings. |

### Internal Boundaries

| Boundary | Communication | Notes |
|---|---|---|
| Workbook importer ↔ registry | Generated JSON artifact | Importer verifies row mapping, exact metadata, slug rules, and provenance before writing. |
| `en.ts` ↔ catalog | Direct module import keyed by stable `contentId` | Catalog rejects incomplete or duplicate records. |
| catalog ↔ App Router | Typed lookup/enumeration functions | `generateStaticParams()` receives canonical slugs only. |
| catalog ↔ SEO helpers | `contentId` resolves each locale's final slug before URL construction | This preserves canonical and hreflang consistency. |
| catalog ↔ redirect builder | Shared JSON registry / redirect-spec API | Unique aliases produce redirects; collision ledger produces assertions. |
| catalog ↔ verification | Same public enumerators and JSON source | Tests compare the registry, generated files, sitemap, and redirect maps. |

## Verification Contract

The focused verifier should assert all of the following before release:

1. The importer matches exactly 1,195 approved workbook rows and copies their title, description, and keywords exactly according to the documented normalization rule.
2. Every current English body has one catalog record; every canonical slug is safe and unique; every retained healthy URL remains its canonical slug; every repaired record has a deterministic canonical slug.
3. A route alias has one destination, never collides with a canonical route, and collision ledger paths have zero emitted detail redirects.
4. `getCanonicalFaqRoutes('en')` equals the root and localized `generateStaticParams()` slug set. With `dynamicParams = false`, zero missing params means zero missing in-scope static routes.
5. Every exported canonical FAQ file has the approved metadata, canonical link, matching Open Graph/Twitter values, correct hreflang targets derived by identity, and a sitemap entry exactly once.
6. Every emitted redirect destination resolves to a canonical exported file; Cloudflare Worker and Nginx artifacts equal the unique registry redirect specifications; query-string preservation remains covered by the existing deployment checks.

## Sources

- Current repository call paths: `src/faq/index.ts`, FAQ App Router pages, `src/lib/siteRouting.ts`, `src/lib/seo.ts`, `src/app/sitemap.ts`, `scripts/lib/redirects.js`, `scripts/clean-locale-output.js`, and existing verifiers. **Confidence: HIGH** (direct code inspection).
- [Next.js `generateStaticParams`](https://nextjs.org/docs/app/api-reference/functions/generate-static-params) and [route segment configuration](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config): build-time dynamic params and `dynamicParams = false`. **Confidence: MEDIUM** (official documentation; provider classification).
- [Next.js static export guide](https://nextjs.org/docs/app/guides/static-exports): static build constraints, including redirect support. **Confidence: MEDIUM** (official documentation; provider classification).
- [Cloudflare Workers Static Assets redirects](https://developers.cloudflare.com/workers/static-assets/redirects/): Worker redirect ownership and duplicate-source behavior. **Confidence: MEDIUM** (official documentation; provider classification).

---
*Architecture research for: FastGPT English FAQ SEO repair*
*Researched: 2026-08-15*
