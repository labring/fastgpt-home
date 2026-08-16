---
phase: 02
slug: approved-metadata
status: approved
shadcn_initialized: false
preset: none
created: 2026-08-16
---

# Phase 02 — UI Design Contract

> Metadata-focused contract for the existing English FAQ detail route. This phase changes build-time metadata values and verification evidence. It carries no visual redesign, new component, or new interaction surface.

---

## Design System

| Property | Value |
|----------|-------|
| Tool | none |
| Preset | not applicable |
| Component library | existing FAQ route primitives; no new UI dependency |
| Icon library | existing Lucide React icons remain unchanged |
| Font | existing Inter body and IBM Plex Sans display variables |

The implementation consumes the current FAQ detail shell and metadata API. A planner may touch route/catalog code only to expose approved values; all visual tokens remain inherited from the existing page.

---

## Spacing Scale

Declared values (must be multiples of 4):

| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Existing inline metadata/keyword gaps |
| sm | 8px | Existing compact FAQ labels |
| md | 16px | Existing FAQ content padding |
| lg | 24px | Existing metadata/detail separation |
| xl | 32px | Existing route content gaps |
| 2xl | 48px | Existing major FAQ section breaks |
| 3xl | 64px | Existing page-level spacing |

Exceptions: none; Phase 2 introduces no layout spacing.

---

## Typography

| Role | Size | Weight | Line Height |
|------|------|--------|-------------|
| Body | existing 17–18px FAQ body | 400 | 1.8–1.9 |
| Label | existing 11–14px labels | 600 | 1.35–1.6 |
| Heading | existing 36–48px FAQ H1 | 600 | 1.2 |
| Display | existing IBM Plex Sans route display tokens | 600 | inherited |

Metadata acceptance is measured from serialized `<title>`, description, and keyword values. It does not alter the visible H1 typography.

---

## Color

| Role | Value | Usage |
|------|-------|-------|
| Dominant (60%) | existing `#ffffff` / dark theme surface tokens | Existing FAQ page surfaces |
| Secondary (30%) | existing slate and `#070d1d` shell tokens | Existing FAQ cards/sidebar |
| Accent (10%) | existing blue focus tokens | Existing focus treatment |
| Destructive | existing error/validation text tokens | Generator/verifier diagnostics only |

Accent reserved for: existing focus rings and route controls. Phase 2 adds no visual accent.

---

## Copywriting Contract

| Element | Copy |
|---------|------|
| Primary CTA | Existing FAQ detail CTA copy remains unchanged |
| Empty state heading | Existing FAQ list copy remains unchanged |
| Empty state body | Existing FAQ list copy remains unchanged |
| Error state | Generator/verifier reports row, `contentId`, and field with actionable remediation |
| Destructive confirmation | No destructive UI action; metadata writes fail closed before replacing artifacts |

Approved Week04 `title`, `description`, and `keywords` strings are the source copy for 1,195 mapped pages. The rendered title appends exactly one ` - FastGPT` suffix. Question, answer, and category copy remains authored source content.

---

## UI Considerations

Applicable state considerations resolved: 4 covered, 0 backstop, 0 unresolved

| Category | Element(s) | Status | Resolution / Reason |
|----------|------------|--------|---------------------|
| long-text | FAQ metadata title and description | ✅ covered | Approved title bases render within the 60-character title budget after one suffix; approved descriptions render within the shared 160-character ceiling. |
| overflow | serialized title/description tags | ✅ covered | Generator and route verifier assert length limits and report the `contentId` plus field when a value overflows. |
| zero-one-many | keyword metadata list | ✅ covered | Every mapped row carries the approved keyword string; route serialization preserves comma-separated order and the verifier checks the complete value. |
| populated | English FAQ detail route | ✅ covered | All 1,195 mapped records resolve through the Phase 1 canonical registry and render metadata at build time. |

---

## Registry Safety

| Registry | Blocks Used | Safety Gate |
|----------|-------------|-------------|
| Existing FAQ catalog and route registry | `src/faq/index.ts`, `generated-en-route-registry.json` | Existing route/metadata verifier plus committed JSON drift check |

No new third-party registry or component blocks are introduced.

---

## Checker Sign-Off

- [x] Dimension 1 Copywriting: PASS — approved metadata strings and unchanged authored content are explicit.
- [x] Dimension 2 Visuals: PASS — existing FAQ shell is reused; no new visual surface is introduced.
- [x] Dimension 3 Color: PASS — existing color tokens remain the contract.
- [x] Dimension 4 Typography: PASS — existing Inter/IBM Plex Sans and FAQ scale remain unchanged.
- [x] Dimension 5 Spacing: PASS — existing 4px-based scale remains unchanged.
- [x] Dimension 6 Registry Safety: PASS — generated metadata joins the committed Phase 1 registry by `contentId`.

**Approval:** approved 2026-08-16 (metadata-focused fallback self-check; specialized UI agent slot unavailable)
