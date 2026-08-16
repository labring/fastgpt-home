---
phase: 04
slug: redirects-and-release-gate
status: approved
shadcn_initialized: false
preset: none
created: 2026-08-16
---

# Phase 04 — UI Design Contract

> Release/redirect phase contract. It changes deployment artifacts and maintainer CLI output while preserving every existing FAQ visual surface and interaction.

## Design System

| Property | Value |
|----------|-------|
| Tool | none |
| Preset | not applicable |
| Component library | existing FAQ shell; no new component |
| Icon library | existing Lucide React remains unchanged |
| Font | existing Inter body and IBM Plex Sans display variables remain unchanged |

## Spacing Scale

The browser-facing FAQ shell keeps the established 4px-based scale: xs 4px, sm 8px, md 16px, lg 24px, xl 32px, 2xl 48px, and 3xl 64px. Redirect and release commands add no visual layout.

Exceptions: none.

## Typography

| Role | Size | Weight | Line Height |
|------|------|--------|-------------|
| Body | existing 17–18px FAQ body | 400 | 1.8–1.9 |
| Label | existing 11–14px route labels | 600 | 1.35–1.6 |
| Heading | existing 36–48px FAQ H1 | 600 | 1.2 |
| Display | existing IBM Plex Sans display tokens | 600 | inherited |

## Color

| Role | Value | Usage |
|------|-------|-------|
| Dominant (60%) | existing `#ffffff` / dark theme surface tokens | Existing FAQ pages |
| Secondary (30%) | existing slate and `#070d1d` shell tokens | Existing FAQ cards and navigation |
| Accent (10%) | existing blue focus tokens | Existing focus treatment only |
| Destructive | existing validation/error text tokens | Release verifier diagnostics in terminal output |

Accent reserved for: existing focus rings and route controls. Redirect maps, sitemap checks, and CLI logs introduce no browser accent.

## Copywriting Contract

| Element | Copy |
|---------|------|
| Primary CTA | Existing FAQ detail/list CTA copy remains unchanged |
| Empty state heading | Existing FAQ list empty-state copy remains unchanged |
| Empty state body | Existing FAQ list empty-state copy remains unchanged |
| Error state | Unknown/denied redirect and release-check diagnostics identify sourceSlug, contentId, route, variant, and corrective command |
| Destructive confirmation | No browser destructive action; release writes fail closed before replacing committed artifacts |

## UI Considerations

Applicable state considerations resolved: 2 covered, 0 backstop, 0 unresolved

| Category | Element(s) | Status | Resolution / Reason |
|----------|------------|--------|---------------------|
| populated | FAQ detail/list | ✅ covered | Existing FAQ pages, H1, answers, metadata, and visual shell remain unchanged after redirect/release work. |
| error | Release verifier diagnostics | ✅ covered | Failed source/build/artifact checks print a record-level path and corrective command; browser error surfaces remain unchanged. |

## Registry Safety

| Registry | Blocks Used | Safety Gate |
|----------|-------------|-------------|
| Phase 1 route registry | `legacySources`, `routeStatus`, `collisionDisposition`, `collisionLedger` | Focused redirect verifier and aggregate release gate |
| Phase 2 metadata snapshot | Approved title/description/keywords and authored digests | Existing metadata source/HTML verifier |
| Phase 3 SEO graph verifier | Canonical, hreflang, H1, FAQ JSON-LD, sitemap checks | Existing source/HTML verifier composed by release gate |

No third-party UI registry or component block is introduced. A specialized UI agent could not be spawned because the shared thread limit was reached; this metadata/release-focused contract was self-checked against all six dimensions.

## Checker Sign-Off

- [x] Dimension 1 Copywriting: PASS — existing FAQ copy remains authoritative; diagnostics name record and corrective path.
- [x] Dimension 2 Visuals: PASS — no browser visual surface changes.
- [x] Dimension 3 Color: PASS — existing color tokens remain unchanged.
- [x] Dimension 4 Typography: PASS — existing FAQ typography remains unchanged.
- [x] Dimension 5 Spacing: PASS — existing FAQ spacing remains unchanged.
- [x] Dimension 6 Registry Safety: PASS — redirect and release checks consume committed registries and existing owned URL helpers.

**Approval:** approved 2026-08-16 (metadata/release-focused inline fallback; specialized UI agent slot unavailable)
