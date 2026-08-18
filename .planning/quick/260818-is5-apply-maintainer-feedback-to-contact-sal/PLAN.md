---
quick_id: 260818-is5
status: in-progress
---

# Apply maintainer feedback to contact sales PR

## Goal

Make the contact sales page and its production/preview delivery paths satisfy all maintainer feedback in PR #215.

## Tasks

1. Normalize Contact URLs and preserve approved attribution query parameters.
   - Files: `src/lib/contact.ts`, `src/lib/attribution/primitives/envelope.ts`, `src/components/home/hooks/useContactUrl.ts`, Contact CTA callers, `src/components/price/PPlan.tsx`
   - Verify: all Contact CTAs resolve default-locale routes and forward only approved query keys after hydration.

2. Remove legacy Contact dependencies and decouple embeds.
   - Files: `src/config/site.ts`, `src/types/siteConfig.ts`, `Dockerfile`, `.github/workflows/fastgpt-home-image.yml`, `src/components/contact/ContactPage.tsx`, embed routes
   - Verify: source/build artifacts contain no Feishu form URL, Picsum URL, or Fontshare URL; embed routes render only the form wrapper.

3. Expand contact verification and preview CI coverage.
   - Files: `scripts/verify-contact-page.js`, `.github/workflows/preview.yml`, GSD quick artifacts
   - Verify: preview and fake-CRM builds pass TypeScript, lint, contact verification, i18n SEO verification, and `git diff --check`.

## Must-haves

- `/contact` is used for the configured default locale; published non-default locales keep a locale prefix.
- Approved attribution keys survive Contact CTA navigation.
- Production custom plan CTAs always enter the in-site Contact page.
- Contact service cards use existing local WebP assets with lazy loading and executable size caps.
- Embed routes do not load the full ContactPage shell or dictionary.
- Preview CI tests both empty and configured CRM build states.
