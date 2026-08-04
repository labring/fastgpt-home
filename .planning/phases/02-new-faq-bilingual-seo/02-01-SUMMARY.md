---
phase: 02-new-faq-bilingual-seo
plan: 01
completed: 2026-08-04
status: complete
---

# Plan 01 Summary

Generated `src/faq/w2.ts` directly from the committed Phase 1 baseline and
merged it into the existing Chinese overlay through `faqW2Zh`.  The English
source remains the 1,400-record route boundary; W2 keys are Chinese-only.

Added a TypeScript compiler API validator and regression suite that compares
all 60 slugs and six runtime fields, checks the locked source fingerprint and
field hashes, rejects missing/duplicate/drifted records, and confirms no W2
key collides with English FAQ data.

## Verification

- `node scripts/phase2/validate_w2_faq.mjs`: passed, 60 runtime rows, 1,400 English rows.
- `node scripts/phase2/test_w2_faq.mjs`: passed, including five drift/blocking cases.
- `npx tsc --noEmit`: passed.
