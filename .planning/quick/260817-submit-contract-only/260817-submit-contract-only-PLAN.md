---
quick_task: 260817-submit-contract-only
status: complete
created: 2026-08-17
description: Separate form submission and visitor reporting contracts
---

# Quick Task 260817: Submit/report contract separation

## Goal

Send only form fields, `visitor_id`, and the submission `source` to `/contacts/submit`; send UTM/channel attribution only through the independent visitor reporting call.

## Tasks

1. Remove attribution fields from the Home submit request body.
2. Keep the independent anonymous reporting call unchanged.
3. Update documentation and verify the static build.

## Risks

- The submit endpoint must remain usable when the asynchronous visitor report has not completed yet.

## Done

- Reduced the Home submit JSON to form fields, `visitor_id`, and `source`.
- Kept visitor attribution reporting on the independent `/visitors/track` request.
- Verified TypeScript, lint, formatting, diff checks, and the 3,679-page production build.
