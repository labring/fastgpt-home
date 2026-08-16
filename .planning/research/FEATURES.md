# Feature Research

**Domain:** Static-export, bilingual Guide content center for FastGPT
**Researched:** 2026-08-16
**Confidence:** HIGH for milestone scope and repository patterns; MEDIUM for crawler behavior, verified against Google Search Central.

## Feature Landscape

### Table Stakes (Users Expect These)

#### Visitor-facing

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Two usable Guide hubs | A visitor arriving at either owned domain needs an index that makes eight long-form articles discoverable. | LOW | `https://fastgpt.cn/guide` lists the eight Chinese articles; `https://fastgpt.io/guide` lists the eight English articles. Each card has localized title, summary, category, and direct `/guide/<slug>` link. The hub groups the fixed corpus as **decision**, **implementation**, and **industry**, following the supplied routing specification. |
| Sixteen stable article pages | Every approved article must open at its specified owned-domain URL. | MEDIUM | The eight exact slugs are `saas-platform-enterprise-gaps`, `self-build-three-year-tco`, `server-sizing-guide`, `complex-doc-golden-set`, `support-bot-four-steps`, `manufacturing-itops-invoice-audit`, `pharma-compliance-docs`, and `education-retail-support-insight`. Chinese renders at `fastgpt.cn/guide/<slug>` and English at `fastgpt.io/guide/<slug>`. |
| Faithful long-form reading surface | These documents use headings, prose, lists, tables, and occasional images; a flat card or excerpt loses the approved decision guidance. | MEDIUM | Reuse the existing article presentation: site shell, breadcrumbs, responsive Markdown body, table rendering, optional hero image, related/internal links, and conversion CTA. The published body excludes the source-file delivery-metadata comment. Article text stays verbatim. |
| Contextual navigation | Long-form readers need a way back to the hub and onward to relevant approved FastGPT surfaces. | LOW | Breadcrumbs read Home → Guide → current article. Every supplied internal-link target is rendered through owned-domain URL helpers and resolves in the release artifact. Related Guide cards may derive only from the eight-entry registry. |
| Required article imagery | Some supplied articles specify a visual requirement, so the article layout needs a safe, accessible media slot. | LOW | Use the existing optional `next/image` path with supplied, approved assets and authored alt text. A preflight check names every source article with a non-empty image requirement and fails when its asset record is absent. |

#### Crawler and SEO-facing

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| One owned self-canonical per page | A Chinese article and its English counterpart serve distinct audiences and each needs its own search result URL. | LOW | Chinese canonical is its `fastgpt.cn/guide/<slug>` URL; English canonical is its `fastgpt.io/guide/<slug>` URL. Canonical, internal links, Open Graph URL, JSON-LD URL, and sitemap entry all use the same final address. |
| Complete reciprocal language clusters | Search engines need an explicit relationship between same-slug Chinese and English pages. | LOW | Each of the 16 detail pages emits the same three absolute alternates: `zh-CN` → `.cn` peer, `en` → `.io` peer, and `x-default` → `.io` peer. The two hubs receive the matching hub alternates. Google documents that a localized page must list every alternate, including itself; `x-default` provides the fallback. |
| Article and breadcrumb structured data | The source metadata explicitly calls for `Article + BreadcrumbList` and gives article-specific titles/descriptions. | LOW | Each article outputs `Article` and `BreadcrumbList` with localized headline, description, owned URL, language, and approved image when supplied. The hub outputs `CollectionPage` plus `ItemList` and `BreadcrumbList`, matching the existing comparison-hub pattern. |
| Guide sitemap and crawlable internal discovery | A hub alone supports navigation, while a canonical-only sitemap gives a complete crawl inventory and release surface. | MEDIUM | The sitemap emits both canonical Guide hubs and all 16 article canonicals exactly once; Guide cards and article internal links use those addresses. Use absolute HTTPS URLs. A Guide-specific sitemap partition is valuable for Search Console attribution and aligns with the supplied release specification. |
| Indexable static HTML | The production site uses Next.js static export, so crawlers and users must receive complete page content at build time. | MEDIUM | All 16 detail paths and two hubs are generated from build-time registry data; unknown guide slugs return the static not-found path. Every exported page contains article body, metadata, canonical, hreflang, and JSON-LD in the generated output. |

#### Maintainer-facing publishing

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| One 8-pair Guide registry | The source package has matching slugs and locale-specific metadata; one data owner prevents parallel route, SEO, and hub lists from drifting. | MEDIUM | Registry fields: slug, `zh`/`en` source body, title, description, keywords, category, schema type, required image, dates, and internal-link targets. It drives both hubs, route lookup, static params, metadata, JSON-LD, and sitemap enumeration. |
| Import boundary that preserves source authority | Maintainers need to publish approved material without manually copying invisible delivery instructions into a page. | MEDIUM | Read exactly the supplied 16 Markdown documents; strip the leading delivery-metadata HTML comment from rendered body while retaining its approved metadata as structured project data. Reject missing pair, duplicate slug, locale mismatch, unrecognized schema type, or a body whose rendered H1 diverges from its source Markdown H1. |
| Pair-completeness and link validation | A same-slug pair is a release unit; one missing locale or broken internal link produces an incomplete content center. | LOW | The check asserts eight unique slugs, two locales per slug, 16 generated detail routes, two generated hubs, all required images, and a resolvable final URL for every configured internal link. |
| Reused presentation and routing services | The existing site already has content-center/article components and owned-domain SEO helpers. | LOW | Extend these proven seams. Guide remains a small fixed corpus; it needs no new CMS, search index, runtime database, or package. |

#### Release operations

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Single Guide release gate | A release needs observable evidence from source registry through exported artifact. | MEDIUM | One runnable command checks the pair registry, content fidelity, static params, hub cards, canonical/hreflang graph, JSON-LD types, sitemap coverage, internal-link targets, image references, and exported `out/` HTML. It exits nonzero with the slug and surface that failed. |
| Production build and 16-URL live check | The milestone definition ends with deployment and verification on both production domains. | MEDIUM | Build succeeds under the production static-export configuration, deploy the resulting export, then probe the 16 owned URLs plus both hubs. Live evidence checks `200`, final URL, H1, canonical, and all three alternates for each article. |

### Differentiators (Competitive Advantage)

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Decision-oriented hub grouping | The eight articles become a coherent evaluation journey instead of a chronological blog list. | LOW | Use the source specification's decision / implementation / industry groups. Each group gives a short localized orientation and preserves the supplied article order within it. |
| Language-pair reader link | A bilingual buyer can move from an article to its exact same-slug counterpart without re-searching. | LOW | Add one unobtrusive Chinese/English counterpart link near the article header. It is a convenience link; the SEO relationship remains the canonical hreflang cluster. |
| Source-aware publishing report | Release reviewers can see the complete 8×2 matrix, article assets, and SEO URLs at a glance. | LOW | Emit a checked-in or CI artifact with slug, locale, title, source file, final URL, image state, and validation status. It derives from the same registry. |

### Anti-Features (Commonly Requested, Often Problematic)

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Client-side search, filters, sorting, or pagination | The existing technical center has these controls. | Eight fixed articles are fully visible in three groups; interactive catalog state adds JavaScript, URL parameters, and test surface without improving discovery. | One grouped hub with direct cards and clear links. Add search after the Guide corpus materially grows. |
| A general-purpose Guide CMS or editorial admin UI | Publishing workflows often grow toward authoring interfaces. | This milestone imports exactly 16 approved documents and uses build-time export; a CMS adds roles, storage, preview, and moderation work outside its release value. | A typed registry plus source-file validation. Revisit after recurring Guide authoring has an approved workflow. |
| Machine translation, article rewriting, or regenerated metadata | Bilingual pages invite automation. | The supplied English documents are approved counterparts with independent buyer language and title/description rules. Changing them breaks content authority and pair verification. | Publish both approved bodies verbatim and track editorial revisions as a governed content release. |
| New locale-prefixed Guide routes or cross-language canonicals | Existing legacy technical content contains locale-prefixed paths. | The approved public topology is two domains with identical `/guide/<slug>` paths; extra aliases dilute route ownership and expand redirect requirements. | Publish only the owned-domain Guide topology, self-canonicalize it, and connect peers with hreflang. |
| `FAQPage` markup for article tables | Several Guide pages contain questions, steps, and tables. | The source metadata selects `Article + BreadcrumbList`; FAQ markup would misrepresent the content and create a second schema contract. | Use the article schema types supplied per document, including `HowTo + Article + BreadcrumbList` where explicitly approved. |
| Scope expansion to Week04 technical/reference pages, comparison hreflang repair, lead forms, or new Guide articles | The supplied package contains adjacent SEO work and the routing specification identifies a comparison follow-up. | These are independently publishable workstreams with their own content inventories and operational checks. | Ship the approved 8×2 Guide corpus first; plan adjacent changes as later milestones. |
| Runtime content fetches and server-only publishing | Dynamic publication can appear flexible. | Production is a static export and the route inventory must be known before build. | Keep content, metadata, and route data in the build-time registry. |

## Feature Dependencies

```text
16 approved Week04 Markdown documents
    └──requires──> one 8-pair Guide registry
                           ├──drives──> two grouped Guide hubs
                           ├──drives──> 16 static article routes
                           ├──drives──> article metadata and JSON-LD
                           └──drives──> sitemap and release assertions

Approved image requirements ──require──> verified asset records ──enable──> article media

Owned-domain route helpers ──require──> pair registry ──enable──> canonical + hreflang + internal links

Static export ──requires──> hubs + 16 static params + source registry
Production live check ──requires──> successful static export + deployment

Technical-center search/filter UI ──conflicts──> fixed eight-article Guide MVP
```

### Dependency Notes

- **The Guide registry requires the 16 approved documents:** each source supplies one locale body and delivery metadata; the same-slug pair establishes the release inventory.
- **Hubs, routes, metadata, sitemap, and validation require the same registry:** every independent copy of the slug list risks an orphan card, unexported page, or broken language pair.
- **Static export requires the final pair inventory:** `dynamicParams = false` patterns require all valid paths before `npm run build`.
- **Image display requires approved assets:** several article sources specify images; the file path and alt text are an explicit publishing input.
- **Production validation requires deployment authority:** code can prove the artifact locally; the final 18 production URL probes follow the deployment step.

## MVP Definition

### Launch With (v1)

- [ ] **Fixed 8×2 Guide registry and importer** — one exact Chinese and English record per approved slug, with delivery comments excluded from page bodies.
- [ ] **Two grouped hubs and 16 detail pages** — owned-domain `/guide` and `/guide/<slug>` routes, existing shell/article rendering, breadcrumbs, required assets, and supplied internal links.
- [ ] **SEO graph and structured data** — self-canonical URLs, reciprocal `zh-CN`/`en`/`x-default` alternates, approved article schema, hub collection schema, and canonical sitemap entries.
- [ ] **Release gate, static build, deployment, and live evidence** — registry-to-export checks followed by both-hub and all-article production probes.

### Add After Validation (v1.x)

- [ ] **Language-pair reader link** — add when navigation testing shows bilingual readers use counterpart articles.
- [ ] **Search and filters** — add when article count or user research shows the three fixed groups no longer support discovery.
- [ ] **Registry-derived publishing report** — add when multiple release reviewers need a durable approval artifact beyond CI logs.

### Future Consideration (v2+)

- [ ] **Editorial CMS and preview workflow** — justify after recurring Guide publishing introduces collaborative authoring requirements.
- [ ] **Additional Guide batches and taxonomy expansion** — justify from approved content inventory and search-performance evidence.
- [ ] **Adjacent SEO migrations** — address programmatic technical pages, comparison hreflang repair, FAQ expansion, and first-party lead capture through separate scoped plans.

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| 16 owned-domain, same-slug Guide articles | HIGH | MEDIUM | P1 |
| Grouped bilingual Guide hubs | HIGH | LOW | P1 |
| Canonical/hreflang/sitemap/internal-link/JSON-LD coherence | HIGH | MEDIUM | P1 |
| Source-faithful pair registry and import checks | HIGH | MEDIUM | P1 |
| Static-export release gate and production live checks | HIGH | MEDIUM | P1 |
| Language-pair reader link | MEDIUM | LOW | P2 |
| Hub search/filter/pagination | LOW | MEDIUM | P3 |
| CMS and editorial admin UI | LOW | HIGH | P3 |

**Priority key:**

- P1: Must have for launch
- P2: Add after core behavior proves valuable
- P3: Future consideration

## Acceptance Behavior

| Surface | Observable check | Pass condition |
|---------|------------------|----------------|
| Visitor | Open `/guide` on each owned domain. | Each hub contains exactly eight localized cards grouped into decision, implementation, and industry, with direct article links. |
| Visitor | Open every `<domain>/guide/<slug>`. | Each of the 16 URLs renders its approved localized H1/body, breadcrumb, responsive content structures, approved images, and valid internal links. |
| Crawler | Parse the HTML `<head>` for every article and hub. | Each page has its self canonical; each article has absolute `zh-CN`, `en`, and `x-default` alternates that form the same-slug pair; metadata matches its approved locale record. |
| Crawler | Parse JSON-LD and sitemap output. | Detail pages use the source-approved article schema plus breadcrumbs, hubs use collection/list schema, and sitemap contains each canonical Guide URL exactly once. |
| Maintainer | Run the Guide registry check. | It reports exactly eight unique slugs × two locales, catches body/metadata/pair/image/link failures by slug, and confirms static-param coverage. |
| Release | Run production build, deploy, then probe production. | Build succeeds; both hubs and all 16 articles return `200` at their owned URLs with matching H1, canonical, and alternates. |

## Sources

- `/Users/longnv/.codex/worktrees/d484/fastgpt-home/.planning/PROJECT.md` — active milestone, scope boundaries, static-export constraints, and release endpoint. **HIGH**
- `/Users/longnv/.codex/worktrees/d484/fastgpt-home/src/components/tech-center/TechCenterPage.tsx` and `TechArticlePage.tsx` — reusable hub/article behavior and existing optional image, breadcrumbs, related content, CTA, and Markdown presentation. **HIGH**
- `/Users/longnv/.codex/worktrees/d484/fastgpt-home/src/components/compare/ComparisonPage.tsx` plus comparison route patterns — current same-domain path conventions and internal-link rendering. **HIGH**
- `/Users/longnv/bin/repo/fastgpt-data/Week04/README.md` and `附-深度内容栏目路由与hreflang规格.md` — 8×2 inventory, owned-domain `/guide` topology, three-way hreflang contract, hub grouping, and release requirements. **HIGH**
- The 16 Markdown documents under `/Users/longnv/bin/repo/fastgpt-data/Week04/深度内容-第2批8篇/` and `/Users/longnv/bin/repo/fastgpt-data/Week04/深度内容-英文版8篇/` — approved body/metadata, internal links, schema, asset requirements, and same-slug counterparts. **HIGH**
- [Google Search Central: localized versions](https://developers.google.com/search/docs/advanced/crawling/localized-versions) and [sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) — reciprocal hreflang clusters, `x-default`, absolute sitemap URLs, and canonical URL inclusion. **MEDIUM** (official documentation retrieved through web search)

---
*Feature research for: FastGPT v1.1 Guide Content Center*
*Researched: 2026-08-16*
