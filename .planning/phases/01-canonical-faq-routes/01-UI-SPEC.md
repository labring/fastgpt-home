---
phase: 01
slug: canonical-faq-routes
status: draft
shadcn_initialized: false
preset: none
created: 2026-08-16
---

# Phase 01 — UI Design Contract

> Minimal routing-focused contract. This phase preserves the existing FAQ list/detail presentation while changing route identity data.

## Design System

| Property | Value |
|----------|-------|
| Tool | Tailwind CSS |
| Preset | not applicable |
| Component library | HeroUI primitives plus existing FAQ components |
| Icon library | lucide-react (existing) |
| Font | Inter body with IBM Plex Sans display (existing `src/app/layout.tsx`) |

## Spacing Scale

Declared values (must be multiples of 4):

| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Icon gaps, inline padding |
| sm | 8px | Compact element spacing |
| md | 16px | Default element spacing |
| lg | 24px | Card and section padding |
| xl | 32px | Layout gaps |
| 2xl | 48px | Detail content breaks |
| 3xl | 64px | Page-level spacing |

Exceptions: Existing FAQ detail uses 80px and 96px page offsets; preserve those established route-layout values without adding new scale tokens.

## Typography

| Role | Size | Weight | Line Height |
|------|------|--------|-------------|
| Body | 16px | 400 | 1.5 |
| Label | 12px | 600 | 1.33 |
| Heading | 24px | 600 | 1.33 |
| Display | 48px | 600 | 1.21 |

## Color

| Role | Value | Usage |
|------|-------|-------|
| Dominant (60%) | `#ffffff` / existing `--home-light-bg` | FAQ page background and reading surface |
| Secondary (30%) | `#f8fafc` / existing slate surfaces | FAQ cards, keyword panel, category labels |
| Accent (10%) | `#3b82f6` / existing `primary` token | Focus-visible ring and the single primary navigation/action emphasis |
| Destructive | `#dc2626` | Reserved for future destructive controls; none in this phase |

Accent reserved for: keyboard focus ring and the existing primary FAQ navigation/action emphasis. Route identity work adds no new accent usage.

## Visual Hierarchy

- FAQ detail: the question H1 is the focal point, followed by answer content, then related navigation.
- FAQ list: the search/filter row is the interaction anchor, followed by the FAQ card grid.
- Canonical route changes preserve the existing hierarchy and component geometry.

## Copywriting Contract

| Element | Copy |
|---------|------|
| Primary CTA | `Back to FAQ list` |
| Empty state heading | `No matching FAQ questions` |
| Empty state body | `Clear filters to view every FAQ question.` |
| Error state | `This FAQ page is unavailable. Return to the FAQ list to choose another question.` |
| Destructive confirmation | None; this phase has no destructive UI action. |

## UI Considerations

Applicable state considerations resolved: 4 covered, 1 backstop, 0 unresolved

| Category | Element(s) | Status | Resolution / Reason |
|----------|------------|--------|---------------------|
| populated | FAQ list/detail | ✅ covered | Every final canonical route renders the existing FAQ list or detail surface with the intended question identity. |
| empty | FAQ list search/filter | ✅ covered | Empty results show `No matching FAQ questions` and the `Clear filters` action from the Copywriting Contract. |
| error | FAQ detail route | ✅ covered | An unknown or malformed FAQ identity reaches the existing not-found path and exposes the documented return-to-list guidance. |
| long-text | FAQ detail question/answer | 🧪 backstop | Long questions and answers remain readable through the existing wrapping and responsive layout at the final canonical path. |
| overflow | FAQ list card grid | ✅ covered | Final slug changes preserve card links and responsive one/two/three-column layout without introducing a second visual surface. |

## Registry Safety

| Registry | Blocks Used | Safety Gate |
|----------|-------------|-------------|
| none | none | not applicable |

## Checker Sign-Off

- [ ] Dimension 1 Copywriting: PASS
- [ ] Dimension 2 Visuals: PASS
- [ ] Dimension 3 Color: PASS
- [ ] Dimension 4 Typography: PASS
- [ ] Dimension 5 Spacing: PASS
- [ ] Dimension 6 Registry Safety: PASS

**Approval:** pending
