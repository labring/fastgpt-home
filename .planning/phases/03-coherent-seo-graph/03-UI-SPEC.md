---
phase: 03
slug: coherent-seo-graph
status: approved
shadcn_initialized: false
preset: none
created: 2026-08-16
---

# Phase 03 — UI Design Contract

> Metadata/SEO-surface contract for the existing FAQ list and detail routes. This phase changes document identity, links, structured data, canonical metadata, alternates, and sitemap evidence. It introduces no visual redesign or new interaction.

## Design System

| Property | Value |
|----------|-------|
| Tool | none |
| Preset | not applicable |
| Component library | existing FAQ route primitives; no new UI dependency |
| Icon library | existing Lucide React icons remain unchanged |
| Font | existing Inter body and IBM Plex Sans display variables |

The implementation keeps the current FAQ shell, cards, filters, and responsive layout. The contract applies to serialized document surfaces that search crawlers and assistive technologies consume.

## Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Existing inline FAQ labels and icon gaps |
| sm | 8px | Existing compact category and navigation spacing |
| md | 16px | Existing FAQ card/detail padding |
| lg | 24px | Existing content separation |
| xl | 32px | Existing route grid gaps |
| 2xl | 48px | Existing detail section breaks |
| 3xl | 64px | Existing page-level spacing |

Exceptions: none; SEO graph work preserves all established layout values.

## Typography

| Role | Size | Weight | Line Height |
|------|-------|--------|-------------|
| Body | existing 17–18px FAQ body | 400 | 1.8–1.9 |
| Label | existing 11–14px route labels | 600 | 1.35–1.6 |
| Heading | existing 36–48px detail H1 | 600 | 1.2 |
| Display | existing IBM Plex Sans display tokens | 600 | inherited |

H1 text remains the resolved authored `FaqItem.Question`; SEO metadata does not replace visible typography or copy.

## Color

| Role | Value | Usage |
|------|-------|-------|
| Dominant (60%) | existing `#ffffff` / dark theme surface tokens | Existing FAQ surfaces |
| Secondary (30%) | existing slate and `#070d1d` shell tokens | Existing cards/sidebar |
| Accent (10%) | existing blue focus tokens | Existing focus treatment only |
| Destructive | existing validation/error text tokens | Route/verifier diagnostics only |

Accent reserved for: existing focus rings and route controls. Canonical, hreflang, JSON-LD, and sitemap changes add no visual accent.

## Copywriting Contract

| Element | Copy |
|---------|------|
| Primary CTA | Existing FAQ detail and list CTA copy remains unchanged |
| Empty state heading | Existing FAQ list empty-state copy remains unchanged |
| Empty state body | Existing FAQ list empty-state copy remains unchanged |
| Error state | Unknown identity and missing counterpart diagnostics include the contentId/route and a corrective path |
| Destructive confirmation | No destructive UI action; graph generation and verification fail closed before publishing artifacts |

Identity copy is sourced from the resolved locale `FaqItem.Question` and `FaqItem.Answers` for H1, FAQ JSON-LD, breadcrumbs, and related cards. Approved metadata fields remain presentation metadata.

## UI Considerations

Applicable state considerations resolved: 4 covered, 0 backstop, 0 unresolved

| Category | Element(s) | Status | Resolution / Reason |
|----------|------------|--------|---------------------|
| populated | FAQ detail/list | ✅ covered | Every generated route resolves one durable contentId and renders the existing FAQ surface with its authored question identity. |
| long-text | FAQ H1/question and answer | ✅ covered | Existing responsive wrapping is preserved; verifier checks the same Question/Answers values in HTML and FAQ JSON-LD. |
| overflow | canonical/alternate/link metadata | ✅ covered | URL helpers encode final route keys, and the graph verifier checks exact owner-domain paths, hreflang values, and duplicate handling. |
| zero-one-many | published counterpart locales | ✅ covered | Bilingual records emit `en`, `zh-CN`, and `x-default`; unavailable translations are omitted without synthetic 404 links. |

## Registry Safety

| Registry | Blocks Used | Safety Gate |
|----------|-------------|-------------|
| Existing FAQ route and locale registries | `src/faq/index.ts`, `generated-en-route-registry.json`, `site-routing.json` | Route/metadata verifier plus focused SEO graph checks |

No third-party registry or component block is introduced. A specialized UI agent could not be spawned in this runtime because the shared thread limit was reached; this contract records the existing-surface boundary and was self-checked against all six dimensions.

## Checker Sign-Off

- [x] Dimension 1 Copywriting: PASS — authored Question/Answers identity and existing UI copy are explicit.
- [x] Dimension 2 Visuals: PASS — no new visual surface; existing FAQ shell and cards remain authoritative.
- [x] Dimension 3 Color: PASS — existing color tokens remain unchanged.
- [x] Dimension 4 Typography: PASS — existing Inter/IBM Plex Sans and FAQ type scale remain unchanged.
- [x] Dimension 5 Spacing: PASS — existing 4px-based scale remains unchanged.
- [x] Dimension 6 Registry Safety: PASS — all route/locale links consume committed registries and owned URL helpers.

**Approval:** approved 2026-08-16 (metadata/SEO-focused fallback self-check; specialized UI agent slot unavailable)
