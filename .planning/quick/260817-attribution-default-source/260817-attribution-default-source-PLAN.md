---
quick_task: 260817-attribution-default-source
status: complete
created: 2026-08-17
description: Configure a build-time default source for first-party Home contact submissions
---

# Quick Task 260817: Home attribution default source

## Goal

Use `NEXT_PUBLIC_ATTRIBUTION_SOURCE` as the Home attribution fallback when a URL has no explicit `?source=` query. Preserve query precedence and keep `未知` as the fallback when the environment variable is empty.

## Tasks

1. Read and normalize the public build-time source configuration in the browser attribution SDK.
2. Pass the variable through the static-export Docker build and CI preview/production configuration.
3. Document the variable and verify that TypeScript and the production build still pass.

## Risks

- This is a public build-time value, so it must not contain a secret.
- Existing attribution state is not rewritten; the configured value applies when new visits are classified without a query source.

## Done

- Added `NEXT_PUBLIC_ATTRIBUTION_SOURCE` as the Home default when `?source=` is absent; explicit query values still take precedence.
- Wired the variable through `.env.template`, Docker build arguments, production image workflow, preview workflow, and README.
- Verified TypeScript, lint, formatting, `git diff --check`, and the production static build (3,679 pages).
