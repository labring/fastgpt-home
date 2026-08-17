---
phase: 08-production-delivery-live-verification
plan: "02"
subsystem: infra
tags: [github-actions, docker, kubernetes, cloudflare-pages, immutable-release]
requires:
  - phase: 08-production-delivery-live-verification
    provides: Content-addressed release archives and manifest contract
provides:
  - Retained successful cn/io release trees
  - Credential-guarded immutable CN and IO delivery workflow
  - Cloudflare purge evidence and public release manifest cache policy
affects: [08-03, production-release]
actuals:
  tokens: 6074
  tasks: 2
  commits: 4
tech-stack:
  added: []
  patterns: [Verified-output retention before cleanup, digest-pinned provider promotion]
key-files:
  created: [scripts/purge-cloudflare-cache.js, scripts/purge-cloudflare-cache.test.js, .github/workflows/guide-production-release.yml]
  modified: [scripts/verify-release.js, Dockerfile, nginx.conf, public/_headers, package.json]
key-decisions:
  - "Release providers consume retained archive trees and never run a source rebuild."
  - "Missing provider credentials or rollback targets block before any mutation."
requirements-completed: []
coverage:
  - id: D1
    description: Immutable CN/IO production delivery workflow and cache-purge adapter
    verification:
      - kind: integration
        ref: npm run release:purge-cloudflare-regression && node --test scripts/verify-release.test.js
        status: pass
    human_judgment: true
    rationale: Real provider credentials and deployment state are required for promotion evidence.
status: complete
---

# Phase 08 Plan 02: Immutable Provider Delivery Summary

**CN and IO now have a credential-guarded immutable archive delivery workflow with rollback capture, cache evidence, and blocked pre-mutation guards.**

## Performance

- **Duration:** 18m
- **Started:** 2026-08-17T12:38:00Z
- **Completed:** 2026-08-17T12:56:00Z
- **Tasks:** 2/2
- **Files modified:** 9

## Accomplishments

- Retained each successful `verify:release` output before cleanup for exact archive packaging.
- Added a native, timeout-bounded Cloudflare URL purge command with dry-run and JSON evidence.
- Added manual CN/IO provider jobs that verify archives before direct Nginx/Pages delivery and capture receipt inputs.

## Task Commits

1. **Task 1: Add credential-guarded Cloudflare purge and provider response evidence** - `a43fa2c`, `5f6f2ef`
2. **Task 2: Wire immutable CN/IO delivery, rollback capture, manifest serving, and cache evidence** - `d96ff54`, `6999190`

## Decisions Made

- Nginx `release-runtime` copies only the extracted `release-out/` tree and has no build command.
- Provider receipts bind logical artifact identity to external revisions after credential guards.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Corrected workflow archive-digest environment propagation**
- **Found during:** Task 2
- **Issue:** Receipt generation needed the sidecar digest in Node.
- **Fix:** Set `ARCHIVE` inline for the Node identity extraction step in both provider jobs.
- **Files modified:** `.github/workflows/guide-production-release.yml`
- **Verification:** `node --test scripts/verify-release.test.js`
- **Committed in:** `6999190`

## Issues Encountered

Provider credentials and current production rollback state are unavailable locally. The workflow records blocked guards before deployment mutation; no provider success is claimed.

## User Setup Required

Authorized CI needs Kubernetes context/registry access for CN and Cloudflare token, account, zone, and Pages project access for IO.

## Next Phase Readiness

08-03 can consume the public manifest and provider receipts for live validation. DEPLOY-01 remains pending an authorized workflow run with real provider evidence.

## Self-Check: PASSED

- Required purge, retained-output, Docker, cache-policy, and workflow files exist.
- Commits `a43fa2c`, `5f6f2ef`, `d96ff54`, and `6999190` exist.
- `npm run release:purge-cloudflare-regression` and `node --test scripts/verify-release.test.js` passed.
