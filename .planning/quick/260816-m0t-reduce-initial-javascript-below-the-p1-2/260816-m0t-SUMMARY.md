---
phase: quick
plan: 260816-m0t
subsystem: performance
tags: [nextjs, static-export, javascript, contact-form, analytics, seo]
requires:
  - phase: 04-redirects-and-release-gate
    provides: Fixed artifact-based P1 JavaScript budget and release gates
provides:
  - On-demand modal contact form with localized accessible loading feedback
  - Idle-loaded optional site integrations outside the initial homepage graph
  - Server-rendered dark root theme with the existing homepage light override
affects: [release, homepage, contact, analytics]
tech-stack:
  added: []
  patterns:
    - Module-scope next/dynamic boundary for action-triggered client UI
    - Idle client boundary for optional integration mounts
key-files:
  created:
    - src/components/contact/dialogCopy.ts
    - src/app/DeferredSiteIntegrations.tsx
    - src/app/DeferredSiteIntegrationsContent.tsx
  modified:
    - src/components/contact/ConsultationProvider.tsx
    - src/app/layout.tsx
    - src/components/home/HomeThemeFix.tsx
key-decisions:
  - "Keep ContactForm directly imported by the dedicated contact route and defer only its modal use."
  - "Keep optional integration implementations unchanged behind one idle client boundary."
  - "Render the fixed dark root state in HTML and preserve HomeThemeFix as the homepage override."
requirements-completed: [VERIFY-01, VERIFY-02, VERIFY-03]
actuals:
  tokens: 2181
  tasks: 2
  commits: 1
coverage:
  - id: D1
    description: "Both production variants meet the fixed 260 KiB homepage initial-JavaScript gzip budget."
    requirement: VERIFY-02
    verification:
      - kind: integration
        ref: "NEXT_PUBLIC_SITE_VARIANT=io NEXT_PUBLIC_HOME_URL=https://fastgpt.io npm run build && npm run verify:p1"
        status: pass
      - kind: integration
        ref: "NEXT_PUBLIC_SITE_VARIANT=cn NEXT_PUBLIC_HOME_URL=https://fastgpt.cn npm run build && npm run verify:p1"
        status: pass
    human_judgment: false
  - id: D2
    description: "Modal contact interaction retains accessible loading, focus containment, and focus restoration."
    verification:
      - kind: other
        ref: "Protected-surface zero-diff gate and TypeScript check"
        status: pass
    human_judgment: true
    rationale: "Network-throttled screen-reader and keyboard interaction require browser observation."
completed: 2026-08-16
status: complete
---

# Quick 260816-m0t: Reduce Initial JavaScript Below P1 Summary

**The homepage now meets the unchanged P1 bundle budget by loading the modal form on demand and optional integrations after idle.**

## Accomplishments

- Moved the modal-only `ContactForm` behind a module-scope `next/dynamic` boundary with a localized polite loading status.
- Kept dialog close, Escape, focus trap, scroll restoration, trigger-focus restoration, and the dedicated `/contact` direct form path intact.
- Deferred the five optional integration mounts until idle without changing their implementations.
- Replaced the unused theme runtime with static dark HTML state; `HomeThemeFix` continues to supply the homepage light override.

## Verification

- io production export: dark HTML contract passed; P1 passed at `260.0 KiB`.
- cn production export: dark HTML contract passed; P1 passed at `260.0 KiB`.
- `npm run verify:release-regression` passed: 5 tests passed, 1 pre-existing case-sensitive-filesystem skip.
- `npm run verify:release -- --source-only`, `npx tsc --noEmit`, `git diff --check`, and the protected-surface zero-diff gate passed.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Updated stale HomeThemeFix rationale after removing ThemeProvider**
- **Found during:** Task 2
- **Issue:** The comment attributed the dark root state to the removed runtime provider.
- **Fix:** Documented the static root dark shell and existing homepage override.
- **Files modified:** `src/components/home/HomeThemeFix.tsx`

## Known Stubs

None.

## Manual Review Notes

Use browser network throttling to confirm the localized loading announcement on first modal open, keyboard focus containment, Escape/close focus restoration, and `/contact` form rendering.

## Self-Check: PASSED

- All three new boundary/copy files exist.
- io and cn emitted root HTML include `class="dark"` and `color-scheme:dark`.
- Protected source, verifier, package, and integration implementation files retain zero diff.
