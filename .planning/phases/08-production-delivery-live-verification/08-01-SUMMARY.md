---
phase: 08-production-delivery-live-verification
plan: "01"
subsystem: infra
tags: [release-artifact, sha256, tar, node-test]
requires:
  - phase: 07-dual-variant-release-evidence
    provides: Verified case-sensitive cn and io static exports
provides:
  - Content-addressed release archives with prepared manifests and checksum sidecars
  - Provider-receipt validation bound to immutable release identity
affects: [08-02, 08-03, production-release]
actuals:
  tokens: 5669
  tasks: 2
  commits: 4
tech-stack:
  added: []
  patterns: [Native SHA-256 tree identity, native tar archive verification]
key-files:
  created: [scripts/release-artifact.js, scripts/release-artifact.test.js]
  modified: [package.json]
key-decisions:
  - "The prepared manifest identifies its output by the digest of all files except itself, preventing a self-referential hash."
  - "Provider deployment state remains in an external receipt so prepared artifacts never claim a deployment."
patterns-established:
  - "Release archives contain a release-out root for direct provider extraction."
requirements-completed: []
coverage:
  - id: D1
    description: Immutable manifest, archive, checksum, and provider receipt seam
    verification:
      - kind: unit
        ref: npm run release:artifact-regression
        status: pass
    human_judgment: false
status: complete
---

# Phase 08 Plan 01: Immutable Release Artifact Summary

**Dependency-free cn/io release archives now carry a stable tree identity, prepared manifest, checksum sidecar, and provider receipt contract.**

## Performance

- **Duration:** 16m
- **Started:** 2026-08-17T12:21:00Z
- **Completed:** 2026-08-17T12:37:54Z
- **Tasks:** 2/2
- **Files modified:** 3

## Accomplishments

- Added an import-safe native Node packager for verified Guide output trees.
- Enforced exact nine-route variant inventory, path containment, symlink rejection, stable tree digests, and archive checksums.
- Added regression coverage and stable npm commands without new dependencies.

## Task Commits

1. **Task 1: Implement the import-safe manifest and content-addressed packager** - `a442abd`, `44bbfae`
2. **Task 2: Lock packager behavior with temporary-output regression coverage and npm commands** - `1c537a1`, `c4ceb43`

## Files Created/Modified

- `scripts/release-artifact.js` - Prepared manifest, tar package, checksum, archive, and provider receipt validation.
- `scripts/release-artifact.test.js` - Temporary-tree tests for both variants and tampering failures.
- `package.json` - Artifact packaging and regression commands.

## Decisions Made

- Exclude `__release/manifest.json` from the tree digest, then include it in the archive under `release-out/`.
- Keep deployment-specific revisions exclusively in provider receipts.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - this plan creates local release tooling only.

## Next Phase Readiness

08-02 can retain verified outputs, package them, and bind the release identity to the provider receipts. DEPLOY-01 remains pending real provider promotion evidence.

## Self-Check: PASSED

- `scripts/release-artifact.js`, `scripts/release-artifact.test.js`, and `package.json` exist.
- Commits `a442abd`, `44bbfae`, `1c537a1`, and `c4ceb43` exist.
- `npm run release:artifact-regression` passed.
