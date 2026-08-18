---
quick_task: 260817-submit-source-only
status: complete
created: 2026-08-17
description: Keep explicit source only on submitted CRM opportunities
---

# Quick Task 260817: Submit-only source

## Goal

Keep Home's explicit `source` as a submission-time value. Anonymous visitor tracking continues to send UTM and channel attribution, but does not send `source` to the visitor tracking endpoint.

## Tasks

1. Keep client-side source extraction available for form submission.
2. Exclude `source` from anonymous visitor tracking payloads.
3. Update tests/docs and run typecheck, lint, and production build.

## Risks

- Source may remain in browser attribution state only to survive navigation until submit; it must not be persisted by the anonymous tracking API.

## Done

- Removed `source` from the anonymous attribution payload.
- Added `getSubmissionSource()` and used it only when submitting the Home contact form.
- Verified TypeScript, lint, formatting, diff checks, and the 3,679-page production build.
