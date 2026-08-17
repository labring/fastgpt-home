# Phase 6: Guide Hubs, Articles & SEO Graph - Discussion Log

> **Audit trail only.** Decisions are captured in `06-CONTEXT.md`.

**Date:** 2026-08-17
**Phase:** 6-Guide Hubs, Articles & SEO Graph
**Mode:** `--auto` (recommended choices selected autonomously per user instruction)
**Areas discussed:** Route topology and locale ownership, Hub taxonomy and authored rendering, SEO and structured data graph

---

## Route topology and locale ownership

| Option | Description | Selected |
|--------|-------------|----------|
| Root owned-domain routes with localized adapters | `/guide` and `/guide/<slug>` are canonical on each owned domain; `[lang]` adapters feed static export and root aliases use the default locale. | ✓ |
| Locale-prefixed canonical routes | Canonical routes retain `/zh/` and `/en/` prefixes. | |

**Decision:** Use root owned-domain routes with `getOwnedLocalePath()`/`getOwnedLocaleUrl()`, filtered static params, and `dynamicParams = false`.

## Hub taxonomy and authored rendering

| Option | Description | Selected |
|--------|-------------|----------|
| Registry-backed groups + existing Markdown renderer | Add a validated publication group to each registry entry, render three server groups, reuse `readGuideDocument`, `MarkdownContent`, and the existing article shell/image pattern. | ✓ |
| Separate hub catalog and bespoke body parser | Keep taxonomy outside the registry and introduce a second content/rendering pipeline. | |

**Decision:** Use the registry as publication identity, preserve authored bodies, render optional required assets only when approved, and expose only explicit configured internal links.

## SEO and structured data graph

| Option | Description | Selected |
|--------|-------------|----------|
| One Guide SEO/JSON-LD/sitemap graph from registry | Specialized three-target alternates, self canonical/OG URL, hub collection/item-list/breadcrumb data, article/article-or-HowTo/breadcrumb data, and current-variant sitemap entries all consume the registry. | ✓ |
| Reuse generic all-locale metadata and ad-hoc page schema | Use broad existing alternates and page-local URL literals. | |

**Decision:** Add a focused Guide SEO helper and JSON-LD route components that always emit `zh-CN`, `en`, and `x-default`, then extend sitemap with one owned hub and eight owned article URLs per current variant.

## the agent's Discretion

- Exact Guide component filenames/CSS boundaries.
- Exact helper placement between `src/lib/seo.ts` and a focused Guide module.
- Smallest approved mappings for any currently available internal-link targets.
- Dependency-free regression fixture shape and command name.

## Deferred Ideas

- Same-slug language switcher, hub search/filtering, CMS authoring, more articles, Phase 7 export evidence, Phase 8 deployment/live checks, and unrelated compare hreflang repair remain deferred.

