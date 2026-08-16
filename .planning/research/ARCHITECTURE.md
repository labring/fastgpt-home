# Architecture Research

**Domain:** Bilingual SEO content center in an existing Next.js static-export site
**Researched:** 2026-08-16
**Confidence:** HIGH for repository integration; LOW for external framework lookup because the research seam classified the web-search provider as LOW.

## Standard Architecture

### System Overview

```text
                         authored Week04 article pairs
                  8 Chinese Markdown + 8 English Markdown
                                      │
                                      ▼
┌──────────────────────────────────────────────────────────────────────────┐
│ Guide content boundary                                                     │
│ `src/content/guide` registry: slug, locale pair, category, SEO fields     │
│ `src/lib/guide-content.ts`: server-only body loading and validation        │
└───────────────────────────┬──────────────────────────────────────────────┘
                            │ complete build-time catalog
             ┌──────────────┼──────────────────┐
             ▼              ▼                  ▼
┌────────────────┐ ┌──────────────────┐ ┌─────────────────────────────┐
│ `/guide` hub   │ │ `/guide/[slug]`  │ │ `src/app/sitemap.ts`         │
│ root route     │ │ root route        │ │ selected-domain URLs only    │
└───────┬────────┘ └────────┬─────────┘ └──────────────┬──────────────┘
        │                   │                            │
        ▼                   ▼                            ▼
┌──────────────────────────────────────────────────────────────────────────┐
│ Shared presentation and SEO                                                │
│ Guide hub/article components + existing MarkdownContent, Navbar, Footer,  │
│ ArticleJsonLd, BreadcrumbJsonLd, getAlternates, getOwnedLocaleUrl         │
└───────────────────────────┬──────────────────────────────────────────────┘
                            │
                            ▼
┌──────────────────────────────────────────────────────────────────────────┐
│ Variant build and static delivery                                          │
│ io build → English root routes → fastgpt.io                                │
│ cn build → Chinese root routes → fastgpt.cn                                │
│ preview → review artifact with existing noindex policy                     │
└──────────────────────────────────────────────────────────────────────────┘
```

The Guide catalog is a paired, bilingual domain model. One registry entry represents one stable slug and requires both `zh` and `en` published records. Each build renders only the record owned by its site variant: Chinese in the cn build and English in the io build. Canonical and `hreflang` remain cross-domain metadata derived from that same paired record.

### Component Responsibilities

| Component | Responsibility | Typical implementation |
|-----------|----------------|------------------------|
| Guide registry | Own the eight permitted slugs, locale-pair completeness, card fields, dates, image policy, categories, and explicit related/internal links | New `src/content/guide/index.ts` and `types.ts` |
| Guide loader | Read an article body at build time, remove delivery-only metadata, validate its published title/slug and return a typed article | New server-only `src/lib/guide-content.ts` using Node `fs` and `path` |
| Guide root routes | Select the current build locale, enumerate all slug paths, return 404 for unknown slugs, and generate static metadata | New `src/app/guide/page.tsx` and `src/app/guide/[slug]/page.tsx` |
| Guide presentation | Render the indexable hub, article body, breadcrumb, related links, existing shell, and one CTA surface | New `src/components/guide/*`, reusing `MarkdownContent`, `Navbar`, `Footer`, `HomeThemeFix`, and `CloudEntryLink` |
| SEO and schema | Derive each canonical, the exact `en`/`zh-CN`/`x-default` alternate set, Article, BreadcrumbList, CollectionPage, and ItemList | Existing `getAlternates`, `getOwnedLocaleUrl`, `ArticleJsonLd`, `BreadcrumbJsonLd`, and `JsonLdScript` |
| Sitemap and verification | Add only the local build's hub and eight owned article URLs; inspect generated HTML and sitemap for route/metadata parity | Modify `src/app/sitemap.ts`, `scripts/verify-i18n-seo.js`, and release checks |
| Delivery | Export the selected variant and deploy it to its owned production host | Existing static build, cn container workflow, and a required io production delivery path |

## Recommended Project Structure

```text
content/
└── guides/
    ├── zh/                              # eight approved Chinese article bodies
    │   └── <same-slug>.md
    └── en/                              # eight approved English article bodies
        └── <same-slug>.md

src/
├── app/
│   └── guide/
│       ├── page.tsx                     # unprefixed owned-domain Guide hub
│       └── [slug]/page.tsx              # unprefixed owned-domain Guide detail
├── components/
│   └── guide/
│       ├── GuideHubPage.tsx             # server-rendered cards grouped by category
│       ├── GuideArticlePage.tsx         # shell + reused MarkdownContent article view
│       └── GuideJsonLd.tsx              # CollectionPage/ItemList schema only when needed
├── content/
│   └── guide/
│       ├── index.ts                     # single paired registry and public accessors
│       └── types.ts                     # GuideArticleSummary and GuideLocale types
└── lib/
    └── guide-content.ts                 # server-only Markdown loader and body validation

scripts/
└── verify-guide-content.js              # source/content-pair validation, called by release gate
```

### New versus modified files

| Change | Files | Why |
|--------|-------|-----|
| New | `content/guides/zh/*.md`, `content/guides/en/*.md` | Keep the approved bodies authored, paired, reviewable, and separate from route code. |
| New | `src/content/guide/types.ts`, `src/content/guide/index.ts` | Keep the public route catalog, metadata, categories, dates, and pair identity in one typed registry. |
| New | `src/lib/guide-content.ts` | Keep filesystem access and delivery-comment stripping on the server/build boundary. |
| New | `src/app/guide/page.tsx`, `src/app/guide/[slug]/page.tsx` | Create the approved root-level public topology for both domain variants. |
| New | `src/components/guide/GuideHubPage.tsx`, `GuideArticlePage.tsx`, `GuideJsonLd.tsx` | Add thin Guide composition while reusing existing Markdown and marketing-shell components. |
| New | `scripts/verify-guide-content.js` | Keep the paired content contract executable without a new dependency. |
| Modify | `src/app/sitemap.ts` | Add the selected variant's `/guide` and its eight own-domain detail URLs from the registry. |
| Modify | `scripts/verify-i18n-seo.js` | Verify each exported Guide hub/article has canonical, all three alternates, robots, local sitemap membership, and rendered internal links. |
| Modify | `scripts/verify-release.js`, `package.json` | Run the Guide source gate and both variant export checks through the existing release command. |
| Modify after operational confirmation | production workflow/deployment configuration for io | The checked-in image workflow explicitly builds only `NEXT_PUBLIC_SITE_VARIANT=cn`; English production requires a corresponding io artifact and deployment target. |

### Structure Rationale

- **`content/guides/`:** Markdown holds only publishable article content. The original delivery comment contains operational notes and stays outside rendered output.
- **`src/content/guide/`:** The registry is the sole route identity catalog. Route params, hub cards, related links, sitemap, metadata, and verification consume its slug list.
- **`src/lib/guide-content.ts`:** File reads occur during static generation, matching `src/lib/tech-center-content.ts` and keeping browser components free of filesystem APIs.
- **`src/app/guide/`:** Root-level routes match the approved `fastgpt.cn/guide/<slug>` and `fastgpt.io/guide/<slug>` topology. They are the public aliases; no locale-prefixed Guide route belongs in the release surface.
- **`src/components/guide/`:** Guide-specific composition remains small. `src/components/tech-center/MarkdownContent.tsx` already handles headings, paragraphs, lists, tables, quotes, code, and links, so it should be reused rather than copied.

## Architectural Patterns

### Pattern 1: Paired registry as the route and SEO authority

**What:** One immutable catalog lists the eight slugs and requires a Chinese and English entry for every slug. Every record carries the exact fields needed at build time: title, description, keywords, summary, category, dates, asset, body path, and curated links.

**When to use:** For this approved batch and later bilingual Guide batches with stable same-slug identity.

**Trade-offs:** A registry is a small maintenance step per article pair. It removes divergent slug lists and lets the build fail before a partial language pair can reach sitemap or metadata.

**Example:**

```typescript
export const guidePages = {
  'saas-platform-enterprise-gaps': {
    zh: { locale: 'zh', sourceFile: 'zh/saas-platform-enterprise-gaps.md', category: 'decision' },
    en: { locale: 'en', sourceFile: 'en/saas-platform-enterprise-gaps.md', category: 'decision' }
  }
} as const;

export const guideSlugs = Object.keys(guidePages) as Array<keyof typeof guidePages>;
```

The concrete records must include the approved title, description, dates, links, and asset data; the abbreviated example only shows identity.

### Pattern 2: Current-site root alias, selected at build time

**What:** Match the successful Compare topology. `src/app/guide/page.tsx` and `src/app/guide/[slug]/page.tsx` derive `defaultLocale` from `siteRouting`, then render `zh` for the cn build and `en` for the io build. `generateStaticParams()` returns every registered slug and `dynamicParams = false` preserves the explicit public route set.

**When to use:** For the unprefixed public URLs mandated by the Week04 specification.

**Trade-offs:** A physical route exists only once in each exported variant, which aligns files, canonical URLs, and hosting ownership. Preview can render both localizations through the existing variant policy when required by preview QA; production remains one host per export.

**Example:**

```typescript
export function generateStaticParams() {
  return guideSlugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const locale = defaultLocale === 'zh' ? 'zh' : 'en';
  const page = getGuidePage(slug, locale);
  if (!page) return { robots: { index: false, follow: false } };
  return { alternates: getAlternates(locale, `/guide/${page.slug}`, ['en', 'zh']) };
}
```

`getAlternates` already calls `getOwnedLocaleUrl`, produces the self canonical, uses `en` and `zh-CN` keys from the route manifest, and assigns `x-default` to English. Guide needs no parallel domain-routing helper.

### Pattern 3: Server-only content load, shared body renderer

**What:** The route resolves summary data from the registry then loads a single localized Markdown body in a server-only function. It validates the filename/slug pairing, removes the initial delivery comment, and hands only publishable Markdown to a Guide article component that composes the existing `MarkdownContent` and shell.

**When to use:** All Guide detail rendering and source verification.

**Trade-offs:** Markdown retains authored tables and copy directly. The parser already supports the source format. The Guide component should normalize only explicit, registry-backed internal links; broad regex rewriting of article prose would create an untestable content transformation layer.

### Pattern 4: One URL model for canonical, hreflang, JSON-LD, sitemap, and links

**What:** The registry exposes `getGuidePath(slug) => /guide/<slug>`. URLs are always derived through `getOwnedLocaleUrl(locale, path)`. Metadata calls `getAlternates(locale, path, ['en', 'zh'])`; Article and Breadcrumb schema use the same canonical values; sitemap adds only the selected build's owned URL.

**When to use:** Every Guide hub/article output and every internal link added to Guide or other content.

**Trade-offs:** This keeps href construction centralized and makes checking deterministic. It requires avoiding copied absolute URLs from the source delivery comments.

## Data Flow

### Build and request flow

```text
Guide registry + locale Markdown pair
              │
              ├── generateStaticParams ──► `out/guide/<slug>.html`
              │
              ├── generateMetadata ─────► canonical + en/zh-CN/x-default head tags
              │
              ├── GuideHubPage ─────────► hub cards + internal article links
              │
              ├── GuideArticlePage ─────► Article/Breadcrumb JSON-LD + rendered body
              │
              └── sitemap.ts ───────────► one hub + eight own-domain URL entries
                                               │
                             selected cn or io static export
                                               │
                                 verify exported HTML and sitemap
                                               │
                                    deploy to the owned domain
```

### Key data flows

1. **Article detail:** `/guide/<slug>` resolves the current build locale, looks up the paired record, loads the matching body, emits `notFound()` for any absent record, and renders the existing navigation/footer plus article content.
2. **Hub discovery:** The hub reads the compact registry only, groups eight cards by `decision`, `implementation`, and `industry`, and links through the owned `/guide/<slug>` paths. It never reads all Markdown bodies to form its list.
3. **Cross-domain SEO:** The detail and hub metadata use `getAlternates` with exactly `['en', 'zh']`. Chinese canonical is `https://fastgpt.cn/guide/<slug>`; English canonical is `https://fastgpt.io/guide/<slug>`; every paired page emits both alternates and English `x-default`.
4. **Sitemap separation:** A cn build adds the Chinese hub and eight Chinese article URLs. An io build adds the English hub and eight English article URLs. Existing sitemap host checks therefore retain one-host-per-export behavior.
5. **Release evidence:** The source verifier confirms eight complete pairs and approved-body integrity. The generated HTML verifier confirms all routes, metadata, schema links, internal links, and sitemap entries after each production build. Live checks then fetch the same sixteen URLs from their owned domains.

### State Management

Guide pages need no client state for this milestone. Registry data and Markdown bodies are resolved at build time. Any future filter/search interaction can be added as a small client leaf over the compact registry after the static hub works; the initial eight-card hub benefits from zero browser state.

## Static Export and Deployment Boundaries

| Boundary | Required behavior | Repository evidence |
|----------|-------------------|---------------------|
| Dynamic detail routes | Emit all eight slugs with `generateStaticParams` and keep `dynamicParams = false` | Existing FAQ, Compare, and technical detail routes use this pattern. Official Next.js documentation also describes this static-export requirement. |
| Root aliases | Build `src/app/guide/**` directly; the unprefixed path is the owned public path | `siteRouting.getOwnedLocalePath` keeps `en` and `zh` unprefixed, while root Compare routes already select the default locale per variant. |
| Locale-prefixed output | Keep `/zh/guide/**` and `/en/guide/**` outside the published Guide contract | The required topology and current URL helpers make the domain own language. The locale cleanup script removes non-owned locale output. |
| Static content | Keep Markdown, registry, and assets available to Node during `next build` | Production uses `output: 'export'`; `tech-center-content.ts` shows the accepted build-time filesystem pattern. |
| cn deploy | Build with `NEXT_PUBLIC_SITE_VARIANT=cn` and serve the static export through the existing Nginx image path | `Dockerfile` rejects every variant except `cn`; the checked-in image workflow passes `cn`. |
| io deploy | Build a separate static artifact with `NEXT_PUBLIC_SITE_VARIANT=io` and publish it to fastgpt.io's production delivery target | The repository's checked-in production image workflow has no io deployment. Treat creation or confirmation of this delivery path as a release dependency. |
| Preview | Use the existing noindex review artifact; run explicit cn and io builds when both localized Guide outputs need HTML evidence | `preview` owns all locales and `clean-locale-output.js` removes sitemap plus patches robots. |

## Build Order

1. **Define the content contract and import the paired Markdown.** Create the paired registry, loader, and the sixteen files. Validate the eight exact same-slug pairs, body extraction, dates, required metadata, and no delivery-comment leakage. This establishes the only route catalog.
2. **Build server-rendered Guide presentation.** Add hub and article components using the existing marketing shell and `MarkdownContent`; add Article/Breadcrumb and hub CollectionPage/ItemList JSON-LD; route curated related links through the registry.
3. **Add root routes and metadata.** Add `/guide` and `/guide/[slug]`, static params, `dynamicParams = false`, `notFound`, and `getAlternates(locale, path, ['en', 'zh'])`. Verify cn and io choose their own content before broad integration.
4. **Integrate discovery.** Add Guide hub/articles to `sitemap.ts` for the selected variant and add owned-domain links from appropriate existing navigation/content surfaces only where approved. Keep link targets registry-derived.
5. **Extend release evidence.** Add a focused Guide source check; extend generated HTML checks for eight local pages per build, canonical/hreflang triple, JSON-LD, internal-link targets, and sitemap cardinality. Include those checks in `verify:release`.
6. **Produce both production variants and deploy.** Run the release gate on a case-sensitive Linux/Docker filesystem, build cn and io artifacts, deploy each to its owned target, and live-check all sixteen approved URLs without redirect hops.

The order is dependency-safe: presentation has typed published input before it renders; routing consumes the same slug catalog before sitemap and links expose it; verification observes built artifacts before production deployment. The io delivery dependency becomes visible before release day.

## Scaling Considerations

| Scale | Architecture adjustments |
|-------|--------------------------|
| Current 8 pairs | Static registry, Markdown files, server-rendered hub, and one detail route are sufficient. |
| Hundreds of pairs | Keep the same registry contract; generate compact hub pages with pagination or category routes while retaining static params and sitemap partitioning. |
| Thousands of pairs | Split registries and sitemap metadata routes by content section, introduce build-time generated indexes, and measure build duration before adding a CMS/runtime fetch path. |

### Scaling Priorities

1. **First bottleneck:** Static build duration and sitemap review grow with article count. Split catalog and sitemap generation by content section only after measured pressure.
2. **Second bottleneck:** Manual pair integrity. Make pair completeness, unique slugs, metadata, and internal-link validation part of the import check before increasing publishing volume.

## Anti-Patterns

### Anti-Pattern 1: Separate slug lists for routes, hubs, and sitemap

**What people do:** Maintain one array in a page, another in a component, and hand-written sitemap URLs.

**Why it's wrong:** A localized article can render while its twin lacks an alternate, a hub link, or sitemap discovery.

**Do this instead:** Export every list from the one paired Guide registry and validate eight complete pairs.

### Anti-Pattern 2: Copying the technical-center loader or comparison parser wholesale

**What people do:** Extend the zh-only technical content model or force Guide prose into the comparison-specific structured parser.

**Why it's wrong:** The technical loader enforces `/zh/<section>/<slug>` and the comparison parser adds evidence/table semantics unrelated to Guide. Both create artificial routing and content constraints.

**Do this instead:** Reuse the generic `MarkdownContent` renderer and shared shell/schema components; implement the small bilingual guide loader that matches the supplied source format.

### Anti-Pattern 3: Publishing locale-prefixed Guide aliases

**What people do:** Add `/zh/guide/<slug>` and `/en/guide/<slug>` because the App Router supports `[lang]` routes.

**Why it's wrong:** It creates duplicate static URLs outside the approved topology and makes canonical/internal-link cleanup harder.

**Do this instead:** Publish only root `/guide/<slug>` in production, with locale selected by the build's owned domain.

### Anti-Pattern 4: Treating cn delivery as an English release path

**What people do:** Add English routes to source and consider them shipped after the cn Docker workflow succeeds.

**Why it's wrong:** The Dockerfile explicitly allows only the cn variant; an io export needs its own production artifact and deployment destination.

**Do this instead:** Gate the milestone on a successful io build, deployed fastgpt.io artifact, and live checks alongside the cn release.

## Integration Points

### Internal boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Guide registry ↔ routes | Direct typed functions | `getGuidePage`, `guideSlugs`, and hub records form the complete build-time route catalog. |
| Guide loader ↔ components | Typed article object | Loader owns source-path/body validation; components receive already-safe publishable content. |
| Routes ↔ SEO helpers | Direct pure helper calls | Use existing `getAlternates` and `getOwnedLocaleUrl`; `siteRouting.ts` needs no new Guide rule. |
| Guide components ↔ shared UI | Props and composition | Reuse Navbar/Footer/HomeThemeFix/CloudEntryLink/MarkdownContent; keep new Guide UI only where layout differs. |
| Registry ↔ sitemap/verifiers | Direct imports in server/build scripts | Ensures URLs, expected pairs, and final static output share the same identity map. |
| Build ↔ deployment | Environment-selected static artifact | `NEXT_PUBLIC_SITE_VARIANT` selects ownership; deployment sends cn and io exports to different production hosts. |

### External services

| Service | Integration pattern | Notes |
|---------|---------------------|-------|
| Nginx/Kubernetes cn production | Existing Docker static export | Guide requires no server runtime feature; cn image already serves the generated `out/`. |
| fastgpt.io production delivery | Separate io static export and deployment configuration | This delivery path requires confirmation or implementation before release. |
| Cloudflare Pages preview | Existing `out/` artifact deployment | Useful for dual-locale visual and generated-HTML review; preview stays noindex. |
| Search crawlers | Static head tags, JSON-LD, sitemap, internal links | Each production host receives its own local URLs and both `hreflang` alternates. |

## Sources

- Current repository routing, metadata, static export, sitemap, verification, Docker, and workflow files listed in the research brief — HIGH confidence.
- Week04 Guide route and hreflang specification, plus the supplied paired article documents — HIGH confidence as the project content/topology authority.
- [Next.js `generateStaticParams`](https://nextjs.org/docs/app/api-reference/functions/generate-static-params), [Static Exports](https://nextjs.org/docs/app/guides/static-exports), and [sitemap metadata](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap) — official documentation; LOW confidence label from the configured web-search classification seam.

---
*Architecture research for: FastGPT v1.1 Guide Content Center*
*Researched: 2026-08-16*
