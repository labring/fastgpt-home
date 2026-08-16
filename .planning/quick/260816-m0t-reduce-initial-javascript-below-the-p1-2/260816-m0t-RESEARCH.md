# Quick Task 260816-m0t: Reduce Initial JavaScript Below P1 - Research

**Researched:** 2026-08-16  
**Domain:** Next.js App Router client-bundle deferral  
**Confidence:** HIGH for the local cause; MEDIUM for the framework-loading mechanics.

## Summary

The release block is a hard P1 failure at 267.0 KiB gzip, 7.0 KiB above the fixed 260 KiB budget. The check sums every `/_next/*.js` script emitted in `out/index.html`; the threshold and assertion must remain unchanged. Quote: `const maxInitialJavaScriptGzipBytes = 260 * 1024;` [VERIFIED: scripts/verify-p1.js:15-21] Quote: `gzipBytes <= maxInitialJavaScriptGzipBytes` [VERIFIED: scripts/verify-p1.js:293-314]

**Primary recommendation:** defer the modal-only `ContactForm` from `ConsultationProvider` with a top-level `next/dynamic` import and `ssr: false`, retaining an accessible in-dialog loading state. The provider is a Client Component, the form is only rendered after `mounted && open`, and the dedicated `/contact` page continues to import the form directly for its static route. [VERIFIED: src/components/contact/ConsultationProvider.tsx:1-9] Quote: `mounted && open && createPortal(` [VERIFIED: src/components/contact/ConsultationProvider.tsx:114-167] [VERIFIED: src/components/contact/ContactPage.tsx:1-9] Quote: `<ContactForm locale={normalizedLocale} />` [VERIFIED: src/components/contact/ContactPage.tsx:81-86]

The existing modal form is 691 source lines and directly imports attribution, contact-copy, validation, and icon code; its source alone gzips to 6.2 KiB and its directly imported source subtree is 15.5 KiB before bundler deduplication. This is the sole smallest safe deferral point with a realistic margin above the 7 KiB gap. [VERIFIED: src/components/contact/ContactForm.tsx:1-20] [VERIFIED: src/components/contact/ConsultationProvider.tsx:1-9]

## Project Constraints (from AGENTS.md)

- Preserve static export, canonical and metadata behavior, FAQ content, URL stability, and current Node.js/repository tooling; add no dependency. [VERIFIED: AGENTS.md:20-33]
- Keep code changes surgical, follow existing Next.js server/client boundaries, and leave a runnable verification result. [VERIFIED: AGENTS.md:34-49]
- The P1 limit stays at 260 KiB; historical 266.9 KiB is advisory-only. [VERIFIED: .planning/STATE.md:65-81]

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|---|---|---|---|
| Initial homepage HTML, metadata, and JSON-LD | Frontend server / static build | CDN / Static | `page.tsx` creates metadata and schema before rendering `HomeLanding`. [VERIFIED: src/app/page.tsx:1-49] |
| Consultation modal behavior | Browser / Client | — | The provider tracks click, focus, modal state, and portal rendering. [VERIFIED: src/components/contact/ConsultationProvider.tsx:16-167] |
| Contact form submit workflow | Browser / Client | API / Backend | The form is a client component that posts to the configured CRM endpoint. [VERIFIED: src/components/contact/ContactForm.tsx:1-20] |

## Evidence and Recommendation

### Current Bundle Evidence

| Measure | Result | Interpretation |
|---|---:|---|
| P1 gzip total | 273,451 bytes / 267.0 KiB | 7.0 KiB above the fixed budget. [VERIFIED: out/index.html; scripts/verify-p1.js:293-314] |
| Homepage initial scripts | 15 | P1 counts all 15 emitted Next.js scripts. [VERIFIED: out/index.html; scripts/verify-p1.js:293-308] |
| Homepage-only chunks vs. `/faq` | 39.0 KiB gzip | Broad homepage animation refactors have larger visual/regression risk than the required saving. [VERIFIED: out/index.html; out/faq.html] |
| Modal-only form source | 24,417 bytes / 6,329 gzip bytes | Form code plus imported-only dependencies has enough plausible removal headroom; measure the emitted artifact. [VERIFIED: src/components/contact/ContactForm.tsx:1-20] |

### Smallest Safe Change

1. In `src/components/contact/ConsultationProvider.tsx`, replace its static `ContactForm` import with a module-scope `next/dynamic` definition using `ssr: false` and an in-dialog, localized `role="status"` / `aria-live="polite"` loading message.
2. Leave the existing `mounted && open` portal gate, dialog attributes, close button, focus trapping, and `ContactPage` direct import unchanged. The modal remains absent from initial static HTML today, while `/contact` keeps its form in that route's static render. [VERIFIED: src/components/contact/ConsultationProvider.tsx:114-167] [VERIFIED: src/components/contact/ContactPage.tsx:81-86]
3. Run a production build and the unchanged P1 check. Accept only an emitted `out/index.html` total at or below 260 KiB. Verify one consultation click manually: dialog opens, loading state is announced, fields become usable, Escape/close restore focus, and `/contact` still renders the form.

Next.js documents this exact boundary: `ssr: false` belongs in a Client Component and excludes its SSR output; dynamically importing a Client Component from a Server Component does not provide automatic splitting. `ConsultationProvider` already has `'use client';`, so it is the correct boundary. [CITED: https://nextjs.org/docs/app/guides/lazy-loading]

## Do Not Change

| Avoid | Reason |
|---|---|
| `scripts/verify-p1.js` budget or script-selection logic | It is the release gate and must stay fixed. [VERIFIED: scripts/verify-p1.js:293-328] |
| `HomeLanding` sections or Framer Motion in this task | They account for homepage-only chunks, yet visual/interaction behavior is broad and the modal deferral has a smaller blast radius. [VERIFIED: src/components/home/HomeLanding.tsx:1-43] |
| Server-component dynamic import from `HomeLanding` | Next.js records that it does not automatically split a dynamically imported Client Component from a Server Component. [CITED: https://nextjs.org/docs/app/guides/lazy-loading] |
| New packages or a custom loader | `next/dynamic` is already provided by the current framework; project constraints prohibit adding packages. [VERIFIED: AGENTS.md:20-33] |

## Common Pitfalls

- **Using `ssr: false` above the client boundary:** Next.js rejects it in Server Components and Server-to-Client dynamic imports do not automatically split. Keep it in `ConsultationProvider`. [CITED: https://nextjs.org/docs/app/guides/lazy-loading]
- **Removing the dialog fallback:** keep `role="status"` and polite live announcement while the first on-demand form chunk loads; dialog labels, close control, and focus handling remain present. [VERIFIED: src/components/contact/ConsultationProvider.tsx:126-163]
- **Claiming success from source size:** only `out/index.html` plus `node scripts/verify-p1.js` proves the gzip total used by the gate. [VERIFIED: scripts/verify-p1.js:293-330]

## Validation

```bash
npm run build
npm run verify:p1
npm run verify:release -- --keep-artifacts
```

Manual accessibility check: open a consultation link on `/`, confirm the dialog announces loading, then verify form keyboard navigation, Escape, close-button focus restoration, and `/contact` form availability.

## Sources

- [VERIFIED: `.planning/STATE.md:65-81`] current 267.0 KiB release blocker and fixed budget.
- [VERIFIED: `scripts/verify-p1.js:293-330`] exact P1 script enumeration and gzip algorithm.
- [VERIFIED: `src/components/contact/ConsultationProvider.tsx:1-167`] modal-only render gate and accessibility controls.
- [VERIFIED: `src/components/contact/ContactPage.tsx:1-86`] direct static-route form use.
- [Next.js Lazy Loading guide](https://nextjs.org/docs/app/guides/lazy-loading) — client boundary and SSR constraints.
