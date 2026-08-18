---
phase: quick
plan: 260818-is5
subsystem: contact-sales
tags: [contact, crm, attribution, preview, static-export]
requires:
  - phase: contact-sales-page
    provides: Contact page, CRM form, and production image configuration
provides:
  - Canonical locale-aware Contact routes with attribution query forwarding
  - Self-contained Contact embed routes
  - Lazy-loaded local WebP Contact service visuals without third-party image/font requests
  - Preview CI coverage for CRM-disabled and configured builds
  - Static Contact verification for reachable CTAs, CRM state, and legacy-resource removal
affects: [homepage, pricing, preview, production-image]
tech-stack:
  added: []
  patterns:
    - Forward only the shared attribution query allowlist into conversion routes
    - Keep static-export verification aligned with the active site variant
    - Render embeddable form surfaces without importing the full page shell
key-decisions:
  - "Use /contact for the active default locale and locale-prefixed paths for non-default Contact locales."
  - "Keep custom plan CTAs inside the Contact page so CRM submission and attribution remain one flow."
  - "Reuse existing local WebP solution assets for service cards, lazy-load them below the fold, and enforce per-image and per-language size caps."
  - "Build Preview twice: once with CRM disabled for safe deployment and once with an unreachable configured URL to exercise the configured form branch."
requirements-completed: [CONTACT-URL, CONTACT-ATTRIBUTION, CONTACT-EMBED, CONTACT-STATIC-VERIFY, CONTACT-PREVIEW-CI]
actuals:
  tokens: 0
  tasks: 3
  commits: 0
coverage:
  - id: C1
    description: "Homepage and pricing Contact CTAs resolve to reachable default or localized static routes."
    requirement: CONTACT-URL
    verification:
      - kind: integration
        ref: "npm run verify:contact"
        status: pass
    human_judgment: false
  - id: C2
    description: "Approved source, UTM, and click-id query values survive Contact navigation while unrelated values are removed."
    requirement: CONTACT-ATTRIBUTION
    verification:
      - kind: integration
        ref: "npm run verify:contact"
        status: pass
    human_judgment: false
  - id: C3
    description: "CN production and both Preview CRM states render and verify successfully."
    requirement: CONTACT-PREVIEW-CI
    verification:
      - kind: integration
        ref: "NEXT_PUBLIC_CRM_API_URL='' NEXT_PUBLIC_SITE_VARIANT=cn npm run build && npm run verify:contact && npm run verify:i18n-seo"
        status: pass
      - kind: integration
        ref: "NEXT_PUBLIC_CRM_API_URL='' NEXT_PUBLIC_SITE_VARIANT=preview npm run build && npm run verify:contact && npm run verify:i18n-seo"
        status: pass
      - kind: integration
        ref: "NEXT_PUBLIC_CRM_API_URL=https://crm-preview.invalid NEXT_PUBLIC_SITE_VARIANT=preview npm run build && npm run verify:contact && npm run verify:i18n-seo"
        status: pass
    human_judgment: false
duration: 35min
completed: 2026-08-18
status: complete
---

# Quick 260818-is5: Apply Contact Sales Maintainer Feedback Summary

## Accomplishments

- Preserved attribution through Contact CTA navigation with a shared allowlist for `source`, UTM fields, and `click_id`.
- Normalized Contact routes so the active default locale uses `/contact` and other supported Contact locales keep a prefix.
- Routed custom plan CTAs into the in-site Contact form and removed the retired custom-plan environment override.
- Removed the legacy Feishu URL, Picsum backgrounds, and Fontshare stylesheet from source and exported assets; Contact service cards now use lazy-loaded local WebP assets.
- Decoupled root and localized embed routes to a small wrapper plus `ContactForm`.
- Extended `verify:contact` to inspect actual static HTML, route reachability, query forwarding, CRM UI states, and forbidden resources.
- Added Preview workflow coverage for CRM-disabled deployment output and a configured-form build using a non-writing fake URL.

## Files Modified

- `.github/workflows/fastgpt-home-image.yml`
- `.github/workflows/preview.yml`
- `Dockerfile`
- `scripts/verify-contact-page.js`
- `src/app/contact/embed/page.tsx`
- `src/app/[lang]/contact/embed/page.tsx`
- `src/components/contact/ContactPage.tsx`
- `src/components/home/CTA.tsx`
- `src/components/home/CaseStudies.tsx`
- `src/components/home/Hero.tsx`
- `src/components/home/Navbar.tsx`
- `src/components/home/Solutions.tsx`
- `src/components/home/hooks/useContactUrl.ts`
- `src/components/price/PPlan.tsx`
- `src/config/site.ts`
- `src/lib/attribution/primitives/envelope.ts`
- `src/lib/contact.ts`
- `src/types/siteConfig.ts`

## Verification

- `git diff --check` — passed.
- `npm run lint` — passed with the existing `react-hooks/set-state-in-effect` warnings in `ContactForm.tsx` and `useContactUrl.ts`.
- `npx tsc --noEmit` — passed.
- CN production build with CRM disabled — passed.
- Preview build with CRM disabled — passed.
- Preview build with `https://crm-preview.invalid` configured — passed.
- `npm run verify:contact` — passed for all three build states.
- `npm run verify:i18n-seo` — passed for all three build states.
- Local service WebP asset checks — passed with 250 KB per-image and 800 KB per-language caps.

## Deviations from Plan

None.

## Known Stubs

- The configured CRM endpoint remains an external deployment dependency. Production CI keeps the non-empty secret gate and the frontend submits to `${NEXT_PUBLIC_CRM_API_URL}/contacts/submit`.

## Self-Check: PASSED

- Contact URL, form, embed, workflow, Docker, and verification changes are present.
- Built artifacts contain no retired Feishu, Picsum, or Fontshare resources.
