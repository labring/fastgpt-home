---
phase: 08-production-delivery-live-verification
verified: 2026-08-17T13:23:31Z
status: gaps_found
score: 4/6 must-haves verified
behavior_unverified: 0
overrides_applied: 0
re_verification:
  previous_status: gaps_found
  previous_score: 3/6
  gaps_closed:
    - "The local CN and IO workflow captures provider-derived rollback state before mutation and records final immutable provider receipts after successful deployment."
  gaps_remaining:
    - "A release operator can deploy the verified immutable cn and io artifacts with recorded deployed revisions and rollback targets."
    - "Both production Guide hubs and all sixteen article URLs satisfy the final public 200/SEO/cache/revision contract."
  regressions: []
gaps:
  - truth: "A release operator can deploy the verified immutable cn and io artifacts with recorded deployed revisions and rollback targets."
    status: failed
    reason: "The guarded workflow exists only in this local worktree. Both configured production remotes return HTTP 404 for it on main, and no real CN/IO provider receipt, release bundle, deployed revision, or rollback record is available."
    artifacts:
      - path: ".github/workflows/guide-production-release.yml"
        issue: "The provider-safe source workflow has no published, completed production execution."
    missing:
      - "Publish the guarded workflow to the authorized production repository and run it with real CN Kubernetes and IO Cloudflare credentials."
      - "Retain the final CN/IO provider receipts, IO purge evidence, archive, manifests, and live matrix as one release bundle."
  - truth: "Both production Guide hubs and all sixteen article URLs satisfy the final public 200/SEO/cache/revision contract."
    status: failed
    reason: "The fresh 2026-08-17T13:21:26Z public baseline is blocked: all 18 Guide routes and both public release manifests return 404."
    artifacts:
      - path: ".planning/phases/08-production-delivery-live-verification/08-LIVE-EVIDENCE.json"
        issue: "The structured public report records the current absence of the release rather than deployment success."
    missing:
      - "Complete the authorized provider promotion, cache purge, and propagation."
      - "Rerun the live verifier without --allow-blocked-baseline using both final provider receipts, with every Guide route returning 200."
---

# Phase 8: Production Delivery & Live Verification Report

**Phase Goal:** The verified bilingual Guide release is live on both owned domains with traceable artifact and health evidence.
**Verified:** 2026-08-17T13:23:31Z
**Status:** gaps_found
**Re-verification:** Yes — after provider rollback and final-receipt guards

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
| --- | --- | --- | --- |
| 1 | A verified cn/io static tree becomes a content-addressed archive with prepared manifest, route inventory, tree digest, archive checksum, and rollback target. | ✓ VERIFIED | `npm run release:artifact-regression` passed 6/6; the packager consumes `buildGuideExpectation()` from the registry-backed export verifier. |
| 2 | The local workflow captures provider-derived rollback state before mutation and records final immutable CN/IO provider receipts after successful deployment. | ✓ VERIFIED | The CN job authenticates GHCR, preserves an existing digest or resolves a tag with `docker buildx imagetools inspect`, compares the normalized `repo@sha256:...` target, waits for `kubectl rollout status`, then writes a receipt with `rollout.status: completed`. The IO job reads the active production Pages deployment ID/URL before `pages deploy`; a first publish may use the explicit `initial-production` sentinel and records `previousDeploymentUrl: null`, while subsequent releases require the exact active production ID. `verify-release.test.js` covers workflow ordering and identity guards; `verify-guide-live.test.js` covers the first-publish receipt shape. |
| 3 | The native live-matrix command fails closed and a local 18-page fixture proves route SEO, cache, manifest-header, sitemap, and receipt validation. | ✓ VERIFIED | `npm run verify:guide-live-regression` passed 4/4, including the complete 18-route fixture and CN receipt completion guard. |
| 4 | An operator currently has an executable published production workflow with real provider revisions and rollback targets recorded. | ✗ FAILED | GitHub API probes returned HTTP 404 for `.github/workflows/guide-production-release.yml` on `main` in both `yangchuansheng/fastgpt-home` and `labring/fastgpt-home`; no real provider receipt exists in the worktree. |
| 5 | Both public hubs and all 16 public article URLs return final 200 with H1, canonical, alternates, indexability, sitemap, cache, and deployed-revision evidence. | ✗ FAILED | The fresh baseline records 18 Guide route 404s and two manifest 404s. Both sitemaps return 200, while their Guide rows and release identity cannot be present before promotion. |
| 6 | The live report preserves a complete structured support-surface status/cache/revision matrix. | ✓ VERIFIED | `08-LIVE-EVIDENCE.json` records `status`, `finalUrl`, selected headers, and a SHA-256 `bodyDigest` for every route, sitemap, and manifest surface. |

**Score:** 4/6 truths verified (0 present, behavior-unverified).

### Required Artifacts

| Artifact | Expected | Status | Details |
| --- | --- | --- | --- |
| `scripts/release-artifact.js` | Immutable archive, prepared manifest, checksum, and receipt identity seam | ✓ VERIFIED | 357 substantive lines; import-safe and 6 regression cases pass. |
| `scripts/release-artifact.test.js` | Archive and identity mutation regressions | ✓ VERIFIED | 6/6 Node tests pass. |
| `scripts/purge-cloudflare-cache.js` | Credential-guarded Cloudflare purge evidence | ✓ VERIFIED | 3/3 Node tests pass; evidence redacts credentials. |
| `scripts/verify-release.js` | Same-lifecycle verified-output retention and workflow structure | ✓ VERIFIED | `npm run verify:release -- --source-only` passes; structural suite passes 10 tests with one documented case-sensitive filesystem skip. |
| `Dockerfile`, `nginx.conf`, `public/_headers` | CN archive runtime and release-manifest cache policy | ✓ VERIFIED | The runtime copies `release-out/`; both server configurations mark `__release/manifest.json` `no-store`. |
| `.github/workflows/guide-production-release.yml` | Provider promotion, provider-derived rollback capture, final receipts, purge, and live-gate wiring | ✓ VERIFIED LOCALLY | YAML parses; dispatch inputs are required; explicit structural checks prove provider reads precede each mutation and final CN receipt follows rollout. |
| `scripts/verify-guide-live.js` | Route and support-surface public evidence matrix | ✓ VERIFIED LOCALLY | Fixture tests prove all 18 routes, sitemap, manifest/cache, and provider receipt checks. |
| `08-LIVE-EVIDENCE.json` | Timestamped public baseline | ✓ VERIFIED | Current `blocked` report has full route/surface evidence and makes no release-success claim. |
| CN/IO provider receipts and release bundle | Actual deployed revisions, rollback targets, and purge evidence | ✗ MISSING | Produced only by an authorized successful remote workflow execution. |

### Key Link Verification

| From | To | Via | Status | Details |
| --- | --- | --- | --- | --- |
| `release-artifact.js` | Guide registry | `verify-guide-export.js` → `buildGuideExpectation()` | ✓ WIRED | The indirect registry link is present in source; the generic link query misses the indirect import. |
| `verify-release.js` | retained `cn/io/out` | `--retain-success-artifacts` before cleanup | ✓ WIRED | The workflow supplies `$RELEASE_ROOT`; packaging reads retained output only. |
| CN archive | Kubernetes receipt | checksum → extract → `release-runtime` image → provider current tag/digest normalized through GHCR → rollout → final receipt | ✓ WIRED LOCALLY | Dispatch target is compared with the normalized `kubectl get` image; completion is required before receipt write. |
| IO archive | Pages receipt and purge evidence | checksum → extract → current Pages ID/URL → Wrangler deploy → final receipt → purge JSON | ✓ WIRED LOCALLY | The receipt carries prior deployment URL and the workflow retains `io-purge.json`. |
| Provider receipts | live verifier | evidence job passes both `--provider-evidence` paths | ✓ WIRED LOCALLY | Live verifier requires CN digest-pinned Kubernetes reference and completed rollout, plus IO Pages deployment ID/URL. |
| Local workflow | production providers | published GitHub Actions workflow and real credentials | ✗ NOT WIRED REMOTELY | Both probed default branches lack the workflow, so this link has no executable production path. |

### Data-Flow Trace (Level 4)

| Artifact | Data Variable | Source | Produces Real Data | Status |
| --- | --- | --- | --- |
| Release archive | route inventory, tree and archive digests | retained Phase 7 output plus registry-backed expectations | Yes, in local regression fixtures | ✓ FLOWING |
| CN release path | current image → rollback target → digest-pinned rollout → receipt | Kubernetes `kubectl get deployment` and build digest | Source path and ordering test pass; provider run absent | ⚠️ BLOCKED REMOTELY |
| IO release path | previous production ID/URL or `initial-production` sentinel → rollback target → deployment ID/URL → purge evidence | Wrangler deployment lists and Pages deployment output | Source path and ordering test pass; provider run absent | ⚠️ BLOCKED REMOTELY |
| Public live report | response/status/headers/body digest → receipt comparison | public HTTP and explicit provider receipts | Public HTTP data flows; current release/receipts absent | ⚠️ BLOCKED |

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
| --- | --- | --- | --- |
| Immutable archive validation | `npm run release:artifact-regression` | 6 passed, 0 failed | ✓ PASS |
| Cloudflare purge boundary | `npm run release:purge-cloudflare-regression` | 3 passed, 0 failed | ✓ PASS |
| Local live matrix | `npm run verify:guide-live-regression` | 4 passed, 0 failed | ✓ PASS |
| Release workflow structure | `node --test scripts/verify-release.test.js` | 10 passed, 1 documented case-sensitive filesystem skip | ✓ PASS |
| Release source graph | `npm run verify:release -- --source-only` | passed | ✓ PASS |
| Workflow YAML and dispatch/sequencing | Ruby YAML parse plus required-input/order assertions | parsed; CN and IO provider reads precede mutation; CN final receipt follows rollout | ✓ PASS |
| Public production matrix | `node scripts/verify-guide-live.js --allow-blocked-baseline --report .planning/phases/08-production-delivery-live-verification/08-LIVE-EVIDENCE.json` | exit 2; 18 Guide 404s, 2 sitemap 200s, and 2 manifest 404s | ✗ BLOCKED |

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
| --- | --- | --- | --- | --- |
| DEPLOY-01 | 08-01, 08-02 | Immutable CN/IO provider delivery with recorded revisions and rollback targets | ✗ BLOCKED | Provider-safe local wiring passes, while no remote workflow is published or has produced authenticated provider receipts, revisions, rollback records, or a release bundle. |
| DEPLOY-02 | 08-03 | Both Guide hubs and 16 articles have complete public health/revision evidence | ✗ BLOCKED | The fresh public report records 18 Guide 404s and 2 manifest 404s; strict verification requires 200 responses and final receipts. |

### Anti-Patterns and Disconfirmation Findings

| Area | Finding | Severity | Impact |
| --- | --- | --- | --- |
| Workflow sequencing | Required dispatch-target and ordering assertions pass: provider reads precede mutation; CN receipt follows a completed rollout. | ℹ️ INFO | The earlier local source gap is closed. |
| Structural regression scope | The workflow test proves source ordering and receipt fields. A hosted workflow run with real Kubernetes/Cloudflare responses remains unexercised. | ⚠️ WARNING | Production receipts remain required evidence for DEPLOY-01. |
| Local fixture scope | The 18-route fixture passes against controlled content, while the public domains currently return 404. | 🛑 BLOCKER | DEPLOY-02 remains blocked. |
| Source hygiene | No unresolved `TBD`, `FIXME`, `XXX`, `TODO`, `HACK`, or user-visible placeholder markers appeared in phase implementation files. | ℹ️ INFO | No debt-marker blocker. |

### Gaps Summary

The local delivery workflow now enforces provider-derived rollback capture, CN tag-to-digest normalization through authenticated GHCR, explicit IO first-publish sentinel handling, final CN rollout receipts, IO prior-deployment and purge evidence, and completed-rollout receipt validation. Production evidence remains absent: the workflow has not reached either configured remote default branch, no authorized provider run has emitted receipts, and the public Guide release still returns 404. DEPLOY-01 and DEPLOY-02 remain blocked until that remote promotion and strict live verification complete.

---

_Verified: 2026-08-17T13:23:31Z_
_Verifier: the agent (gsd-verifier)_
