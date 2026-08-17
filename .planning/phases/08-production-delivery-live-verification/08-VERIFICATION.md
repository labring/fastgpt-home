---
phase: 08-production-delivery-live-verification
verified: 2026-08-17T13:08:48Z
status: gaps_found
score: 3/6 must-haves verified
behavior_unverified: 0
overrides_applied: 0
re_verification:
  previous_status: gaps_found
  previous_score: 4/6
  gaps_closed: []
  gaps_remaining:
    - "A release operator can deploy the verified immutable cn and io artifacts with recorded deployed revisions and rollback targets."
    - "Both production Guide hubs and all sixteen article URLs satisfy the final public 200/SEO/cache/revision contract."
  regressions: []
gaps:
  - truth: "The local CN and IO workflow captures provider-derived rollback state before mutation and records final immutable provider receipts after successful deployment."
    status: failed
    reason: "The workflow accepts rollback targets as dispatch inputs, has no pre-mutation Kubernetes current-image read, lists Pages deployments only after deployment, and writes the CN receipt before `kubectl rollout status`; the uploaded CN receipt has no completed-rollout result."
    artifacts:
      - path: ".github/workflows/guide-production-release.yml"
        issue: "Lines 60-65 bind operator-supplied rollback strings; line 114 writes `cn-provider-receipt.json` before lines 120-121 mutate and await Kubernetes; line 156 reads Pages deployment state after Wrangler deploy."
    missing:
      - "Read and validate each provider's current immutable revision before mutation, then bind it as the rollback target."
      - "Write the final CN receipt only after successful digest-pinned rollout and record the rollout result/reference; retain the equivalent final IO receipt and purge result."
      - "Add a sequencing regression that proves these provider observations and final-receipt fields."
  - truth: "A release operator can deploy the verified immutable cn and io artifacts with recorded deployed revisions and rollback targets."
    status: failed
    reason: "The local-only workflow is absent from both configured GitHub default branches and no provider receipt, deployment revision, rollback record, or release bundle exists."
    artifacts:
      - path: ".github/workflows/guide-production-release.yml"
        issue: "GitHub REST returned 404 for this workflow in `yangchuansheng/fastgpt-home` and `labring/fastgpt-home`; both remotes use `main` as HEAD."
    missing:
      - "Publish the corrected guarded workflow to the authorized production repository and run it with real CN and IO credentials plus provider-derived rollback targets."
      - "Preserve the final CN and IO provider receipts, purge evidence, archive, manifest, and live report as one release bundle."
  - truth: "Both production Guide hubs and all sixteen article URLs satisfy the final public 200/SEO/cache/revision contract."
    status: failed
    reason: "The independent public baseline at 2026-08-17T13:07:31Z found 9/9 Guide paths returning 404 on each domain and both public release manifests returning 404."
    artifacts:
      - path: ".planning/phases/08-production-delivery-live-verification/08-LIVE-EVIDENCE.json"
        issue: "The committed baseline is blocked and retains the complete 18-route plus two-sitemap/two-manifest response matrix."
    missing:
      - "Complete the authorized delivery, wait for propagation and cache invalidation, then rerun the live verifier without `--allow-blocked-baseline` using both final provider receipts."
---

# Phase 8: Production Delivery & Live Verification Report

**Phase Goal:** The verified bilingual Guide release is live on both owned domains with traceable artifact and health evidence.
**Verified:** 2026-08-17T13:08:48Z
**Status:** gaps_found
**Re-verification:** Yes — after structured live-support-surface evidence update

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
| --- | --- | --- | --- |
| 1 | A verified cn/io static tree becomes a content-addressed archive with prepared manifest, route inventory, tree digest, archive checksum, and rollback target. | ✓ VERIFIED | `release-artifact.js` consumes the registry through `verify-guide-export.js`; `npm run release:artifact-regression` passed 6/6. |
| 2 | The local workflow captures provider-derived rollback state before mutation and records final immutable CN/IO provider receipts after successful deployment. | ✗ FAILED | Rollback targets are supplied inputs; CN receipt write precedes Kubernetes mutation/rollout; Pages state is read only after deployment. The structural test checks markers, not this ordering invariant. |
| 3 | The native live-matrix command fails closed and a local 18-page fixture proves route SEO, cache, manifest-header, sitemap, and receipt validation. | ✓ VERIFIED | `npm run verify:guide-live-regression` passed 4/4; fixture output retains two structured `variants.<variant>.surfaces` objects. |
| 4 | An operator currently has an executable published production workflow with real provider revisions and rollback targets recorded. | ✗ FAILED | Both configured GitHub default branches return 404 for `.github/workflows/guide-production-release.yml`; the repository contains no provider receipt or release bundle. |
| 5 | Both public hubs and all 16 public article URLs return final 200 with H1, canonical, alternates, indexability, sitemap, cache, and deployed-revision evidence. | ✗ FAILED | Fresh baseline: 9/9 Guide paths are 404 on `fastgpt.cn`, 9/9 are 404 on `fastgpt.io`, and both public release manifests are 404. |
| 6 | The live report preserves a complete structured support-surface status/cache/revision matrix. | ✓ VERIFIED | The committed evidence records `status`, `finalUrl`, selected headers, `bodyDigest`, and scoped failures for each variant sitemap and manifest; regression assertions cover each field. |

**Score:** 3/6 truths verified (0 present, behavior-unverified).

### Required Artifacts

| Artifact | Expected | Status | Details |
| --- | --- | --- | --- |
| `scripts/release-artifact.js` | Immutable archive, prepared manifest, checksum, and receipt identity seam | ✓ VERIFIED | 357 substantive lines; silent import and 6 regression cases pass. |
| `scripts/release-artifact.test.js` | Archive and identity mutation regressions | ✓ VERIFIED | 6/6 passing Node tests. |
| `scripts/purge-cloudflare-cache.js` | Credential-guarded Cloudflare purge evidence | ✓ VERIFIED | 3/3 passing Node tests covering dry run, errors, and secret redaction. |
| `scripts/verify-release.js` | Same-lifecycle verified-output retention | ✓ VERIFIED | Source-only verification passed; 10/10 applicable structural tests pass with one documented case-sensitive skip. |
| `Dockerfile`, `nginx.conf`, `public/_headers` | CN direct archive-tree runtime and release-manifest cache policy | ✓ VERIFIED | `release-runtime` copies `release-out/`; Nginx and Pages configure `__release/manifest.json` as `no-store`. |
| `.github/workflows/guide-production-release.yml` | Provider promotion, rollback capture, final receipt, purge, and live-gate wiring | ✗ PARTIAL | Immutable archive extraction and live-gate wiring exist; previous-provider capture and final post-rollout CN receipt do not. The workflow is also unpublished remotely. |
| `scripts/verify-guide-live.js` | Route and support-surface public evidence matrix | ✓ VERIFIED LOCALLY | Fixture proves all 18 routes plus sitemap, manifest, cache, and receipt checks. |
| `08-LIVE-EVIDENCE.json` | Timestamped public baseline | ✓ VERIFIED | Current committed `blocked` report retains all response surfaces without a deployment claim. |
| CN/IO provider receipts | Actual deployed revision and rollback evidence | ✗ MISSING | No receipt files or release bundle exist locally or on the checked remote defaults. |

### Key Link Verification

| From | To | Via | Status | Details |
| --- | --- | --- | --- | --- |
| `release-artifact.js` | Guide registry | `verify-guide-export.js` → `buildGuideExpectation()` | ✓ WIRED | Both packager and live verifier call the registry-backed expectation helper; the generic link query misses this indirect import. |
| `verify-release.js` | retained `cn/io/out` | `--retain-success-artifacts` before cleanup | ✓ WIRED | Workflow supplies `$RELEASE_ROOT`; packaging reads the retained output only. |
| CN archive | Nginx runtime/Kubernetes receipt | checksum → extract → `release-runtime` → image digest → rollout | ⚠️ PARTIAL | The source flow uses the archive and a digest-pinned image, while the receipt is emitted before rollout completion and excludes its result. |
| IO archive | Pages receipt/purge | checksum → extract → Wrangler Pages → deployment list → receipt → purge | ⚠️ PARTIAL | The source flow consumes the archive, while its rollback target is not derived from a pre-mutation provider read. |
| Provider receipts | live verifier | evidence job passes both `--provider-evidence` paths | ⚠️ SOURCE-ONLY | The local workflow contains the connection; no published workflow, receipts, public manifest, or deployed revision exists. |

### Data-Flow Trace (Level 4)

| Artifact | Data Variable | Source | Produces Real Data | Status |
| --- | --- | --- | --- | --- |
| Release archive | route inventory, tree and archive digests | Phase 7 retained output plus registry-backed expectations | Yes, in local fixtures | ✓ FLOWING |
| CN release path | archive → `release-out/` → image digest → Kubernetes reference | checksum-verified archive | Source wiring only; final provider receipt absent | ⚠️ PARTIAL |
| IO release path | archive → `release-out/` → Pages deployment ID/URL | checksum-verified archive | Source wiring only; rollback capture occurs too late | ⚠️ PARTIAL |
| Public live report | page, sitemap, manifest response data → receipt comparison | public HTTP and explicit receipt files | Yes for structured HTTP data; provider receipts absent | ⚠️ BLOCKED |

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
| --- | --- | --- | --- |
| Immutable archive validation | `npm run release:artifact-regression` | 6 passed, 0 failed | ✓ PASS |
| Cloudflare purge boundary | `npm run release:purge-cloudflare-regression` | 3 passed, 0 failed | ✓ PASS |
| Local live matrix | `npm run verify:guide-live-regression` | 4 passed, 0 failed | ✓ PASS |
| Release workflow structure | `node --test scripts/verify-release.test.js` | 10 passed, 1 documented case-sensitive skip | ✓ PASS |
| Release source graph | `npm run verify:release -- --source-only` | passed | ✓ PASS |
| Public production matrix | `node scripts/verify-guide-live.js --allow-blocked-baseline --timeout-ms 8000 --report .planning/phases/08-production-delivery-live-verification/08-LIVE-EVIDENCE.json` | exit 2; 18 Guide 404s and 2 manifest 404s | ✗ BLOCKED |

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
| --- | --- | --- | --- | --- |
| DEPLOY-01 | 08-01, 08-02 | Immutable CN/IO provider delivery with recorded revisions and rollback targets | ✗ BLOCKED | Local primitives pass, while receipt/rollback sequencing is incomplete, the workflow is unpublished, and no provider receipt exists. |
| DEPLOY-02 | 08-03 | Both Guide hubs and 16 articles have complete public health/revision evidence | ✗ BLOCKED | Public baseline records 18 page 404s, two manifest 404s, no Guide sitemap rows, and no provider receipts. |

### Anti-Patterns and Disconfirmation Findings

| Area | Finding | Severity | Impact |
| --- | --- | --- | --- |
| Workflow receipt lifecycle | CN receipt is created before rollout status and is uploaded without a rollout-result field; rollback values are trusted inputs rather than provider reads. | 🛑 BLOCKER | DEPLOY-01 lacks an auditable final provider receipt contract. |
| Structural regression | The passing workflow test asserts required command markers and misses provider-state timing and final receipt contents. | 🛑 BLOCKER | The test suite can pass while the delivery evidence invariant fails. |
| Public release | The passing local fixture simulates the complete surface; the owned domains currently serve only 404s for all Guide routes and manifests. | 🛑 BLOCKER | DEPLOY-01 and DEPLOY-02 remain blocked. |
| Source hygiene | No unresolved `TBD`, `FIXME`, `XXX`, `TODO`, `HACK`, or user-visible placeholder markers appeared in phase files. | ℹ️ INFO | No debt-marker blocker. |

### Gaps Summary

The phase contains working local artifact and verification tooling. Its production objective remains unachieved: the delivery workflow needs provider-derived rollback capture and final receipts, then must be published and run with authorized credentials. A strict live run can close DEPLOY-02 only after both receipt files exist and every one of the 18 public Guide pages returns 200.

---

_Verified: 2026-08-17T13:08:48Z_
_Verifier: the agent (gsd-verifier)_
