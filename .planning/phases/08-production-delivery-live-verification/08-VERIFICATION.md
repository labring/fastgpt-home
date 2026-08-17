---
phase: 08-production-delivery-live-verification
verified: 2026-08-17T12:59:32Z
status: gaps_found
score: 3/6 must-haves verified
behavior_unverified: 0
overrides_applied: 0
gaps:
  - truth: "A release operator can deploy the verified immutable cn and io artifacts with recorded deployed revisions and rollback targets."
    status: failed
    reason: "Neither repository default branch exposes `guide-production-release.yml`; no provider receipt, deployment revision, rollback record, or public release manifest exists."
    artifacts:
      - path: ".github/workflows/guide-production-release.yml"
        issue: "Implemented only in the local commit history; GitHub REST returned 404 for this workflow in both `yangchuansheng/fastgpt-home` and `labring/fastgpt-home`."
    missing:
      - "Publish the guarded workflow to the authorized production repository and run it with real CN and IO rollback targets and credentials."
      - "Preserve CN post-rollout evidence in its receipt and collect the final release bundle with archive, manifest, receipts, purge evidence, and live report."
  - truth: "The verifier records structured status, headers, body digest, final URL, and timestamp for both sitemaps and both release manifests."
    status: partial
    reason: "`verify-guide-live.js` stores those fields only for pages; support surfaces are reduced to failure strings, and parsed `--manifest` is unused."
    artifacts:
      - path: "scripts/verify-guide-live.js"
        issue: "Lines 60-63 omit structured sitemap/manifest response records; line 17 parses `--manifest` with no later consumer."
    missing:
      - "Emit one structured evidence object per sitemap and manifest, then add success and failure regression assertions."
  - truth: "Both production Guide hubs and all sixteen article URLs satisfy the final public 200/SEO/cache/revision contract."
    status: failed
    reason: "The independent public baseline at 2026-08-17T12:56:43Z found 9/9 Guide paths returning 404 on each domain and both public release manifests returning 404."
    artifacts:
      - path: ".planning/phases/08-production-delivery-live-verification/08-LIVE-EVIDENCE.json"
        issue: "Committed baseline is blocked with the same 9+9 Guide 404 result and no provider evidence."
    missing:
      - "Complete an authorized delivery, wait for propagation/cache invalidation, then rerun the live verifier without `--allow-blocked-baseline` and attach both provider receipts."
---

# Phase 8: Production Delivery & Live Verification Report

**Phase Goal:** The verified bilingual Guide release is live on both owned domains with traceable artifact and health evidence.
**Verified:** 2026-08-17T12:59:32Z
**Status:** gaps_found
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
| --- | --- | --- | --- |
| 1 | A verified cn/io static tree becomes a content-addressed archive with prepared manifest, route inventory, tree digest, archive checksum, and rollback target. | ✓ VERIFIED | `release-artifact.js` derives its route inventory through `verify-guide-export.js` → Guide registry, writes `__release/manifest.json`, validates archive entries/digests, and 6/6 artifact regressions passed. |
| 2 | The local workflow structurally retains Phase 7 output and promotes only checksum-verified archive trees through CN release-runtime and IO Pages paths. | ✓ VERIFIED | `verify-release.js` retains successful `out`; workflow verifies/extracts each archive before CN `release-runtime` or `wrangler pages deploy`; structural regression passed. |
| 3 | The native live-matrix command fails closed and a local 18-page fixture proves route SEO, cache, manifest-header, sitemap, and receipt validation. | ✓ VERIFIED | `npm run verify:guide-live-regression` passed 4/4, including 18 pages and both variant receipts. |
| 4 | An operator currently has an executable published production workflow with real provider revisions and rollback targets recorded. | ✗ FAILED | GitHub REST found no `guide-production-release.yml` in either configured remote's default branch; repository has no provider receipts or release bundle. |
| 5 | Both public hubs and all 16 public article URLs return final 200 with H1, canonical, alternates, indexability, sitemap, cache, and deployed-revision evidence. | ✗ FAILED | Fresh independent probe: cn 9/9 Guide paths 404; io 9/9 Guide paths 404; both `__release/manifest.json` endpoints 404. |
| 6 | The live report preserves a complete structured support-surface status/cache/revision matrix. | ✗ FAILED | The script records page fields, while sitemap/manifest results remain only failure strings; it also accepts unused `--manifest`. |

**Score:** 3/6 truths verified.

### Required Artifacts

| Artifact | Expected | Status | Details |
| --- | --- | --- | --- |
| `scripts/release-artifact.js` | Immutable archive, prepared manifest, checksum, receipt identity checks | ✓ VERIFIED | 357 substantive lines; direct dependency on `verify-guide-export.js` reaches the registry-derived route projection; import is silent. |
| `scripts/release-artifact.test.js` | Mutation regression for archive and identity failures | ✓ VERIFIED | 6/6 Node tests passed. |
| `scripts/purge-cloudflare-cache.js` | Credential-guarded Cloudflare purge evidence | ✓ VERIFIED | 3/3 Node tests passed; dry-run and missing-credential paths are covered. |
| `scripts/verify-release.js` | Same-lifecycle verified-output retention | ✓ VERIFIED | Regression passed; successful `out` is copied before `clearBuildArtifacts()`. |
| `Dockerfile`, `nginx.conf`, `public/_headers` | CN direct archive-tree runtime and manifest/cache serving contract | ✓ VERIFIED | `release-runtime` copies `release-out/`; Nginx and Pages headers configure `__release/manifest.json` as `no-store`. Public endpoints remain unavailable. |
| `.github/workflows/guide-production-release.yml` | Provider promotion, receipt, purge, and live-gate wiring | ⚠️ PRESENT, NOT PUBLISHED | Source wires all jobs and the live gate; it is absent from both checked GitHub default branches and therefore cannot supply real receipts. |
| `scripts/verify-guide-live.js` | Route and support-surface public evidence matrix | ⚠️ PARTIAL | 18-page fixture and blocked baseline work. Sitemaps/manifests lack structured response entries and `--manifest` has no effect. |
| `08-LIVE-EVIDENCE.json` | Timestamped public baseline | ✓ VERIFIED | Existing committed baseline is `blocked`, contains both variants, 18 path results, and manifest failures; no false deployment claim. |

### Key Link Verification

| From | To | Via | Status | Details |
| --- | --- | --- | --- | --- |
| `release-artifact.js` | Guide registry | `verify-guide-export.js` → `buildGuideExpectation()` | ✓ WIRED | Tool query missed the indirect import; source trace and artifact tests establish the link. |
| `verify-release.js` | retained `cn/io/out` | `--retain-success-artifacts` before cleanup | ✓ WIRED | Workflow passes `$RELEASE_ROOT`, then packaging reads only those retained trees. |
| CN archive | Nginx runtime/Kubernetes | checksum → extract → `release-runtime` → pushed digest → `kubectl set image @sha256` | ✓ WIRED (source) | Flow is present at workflow lines 85-123; no provider execution evidence exists. CN receipt currently precedes rollout-status completion, so it does not itself retain a completed-rollout result. |
| IO archive | Pages/receipt/purge | checksum → extract → Wrangler Pages → deployment list → receipt → purge | ✓ WIRED (source) | Flow is present at lines 139-160; no real deployment receipt exists. |
| Provider receipts | live verifier | evidence job passes both `--provider-evidence` paths | ✗ NOT WIRED IN PRODUCTION | Local workflow source has the connection; no remote workflow, receipt, or public manifest makes it executable today. |

### Data-Flow Trace

| Artifact | Data | Source | Status |
| --- | --- | --- | --- |
| Release archive | route inventory → manifest/tree/archive digests | Phase 7 retained output → `buildGuideExpectation()` | ✓ FLOWING locally |
| CN deployment | archive → `release-out/` → Docker image digest → Kubernetes image reference | checksum-verified archive | ✓ FLOWING in workflow source; provider execution absent |
| IO deployment | archive → `release-out/` → Pages deployment ID/URL → purge evidence | checksum-verified archive | ✓ FLOWING in workflow source; provider execution absent |
| Public live report | pages → sitemap/manifest checks → receipt comparison | public HTTP + explicit receipt files | ⚠️ PARTIAL: support-surface response objects are not emitted |

### Local Regression and Integrity Checks

| Command | Result |
| --- | --- |
| `npm run release:artifact-regression` | ✓ 6 passed, 0 failed |
| `npm run release:purge-cloudflare-regression` | ✓ 3 passed, 0 failed |
| `node --test scripts/verify-release.test.js` | ✓ 10 passed, 1 documented case-sensitive skip |
| `npm run verify:guide-live-regression` | ✓ 4 passed, 0 failed |
| `npm run verify:release -- --source-only` | ✓ passed, including strict TypeScript source verification |
| `git diff --check` | ✓ passed |
| `git diff --exit-code -- package-lock.json` | ✓ passed |

### Public Production Evidence

Probe command:

```text
node scripts/verify-guide-live.js --allow-blocked-baseline --timeout-ms 8000 --report /tmp/phase8-live-verification-20260817.json
```

The command returned the documented blocked result. The full same-shape committed baseline remains at `08-LIVE-EVIDENCE.json`; the independent verifier report is retained at `/tmp/phase8-live-verification-20260817.json`.

| Surface | fastgpt.cn | fastgpt.io |
| --- | --- | --- |
| `/guide` | 404 | 404 |
| Eight `/guide/<slug>` articles | 8 × 404 | 8 × 404 |
| `/sitemap.xml` | 200; cache `public, max-age=3600`; Guide rows absent | 200; cache `public, max-age=3600, stale-while-revalidate=86400`; Guide rows absent |
| `/__release/manifest.json` | 404 | 404 |
| Provider receipt / deployed revision / rollback target | absent | absent |

The HTTP header probes also identify the currently serving edges as `istio-envoy` for cn and Cloudflare for io. They supply no release identity for this Guide release.

### Requirements Coverage

| Requirement | Status | Evidence |
| --- | --- | --- |
| DEPLOY-01 | ✗ BLOCKED | The immutable artifact and guarded source workflow exist locally, while neither remote default branch exposes the workflow and no provider-run receipt, deployed revision, rollback target, release manifest, or combined release evidence bundle exists. |
| DEPLOY-02 | ✗ BLOCKED | Fixture regression passes, while public production has 18 Guide 404s, two manifest 404s, absent receipts/revisions, absent Guide sitemap rows, and incomplete structured support-surface report fields. |

### Anti-Patterns and Disconfirmation Findings

| Area | Finding | Severity | Impact |
| --- | --- | --- | --- |
| Public release | A passing fixture proves only a simulated endpoint; the independently probed owned domains remain entirely 404 for the Guide surface. | 🛑 BLOCKER | Prevents both deployment and live-verification requirements. |
| Workflow evidence | CN receipt is written before `kubectl rollout status`; final receipt has no rollout-result field. Package, provider, and live evidence are uploaded as separate artifacts. | ⚠️ WARNING | A successful operational record requires a post-rollout receipt update and one retained final bundle. |
| Live matrix | Sitemap/manifest response details are dropped after validation; `--manifest` is accepted but unused. | 🛑 BLOCKER | The requested support-surface status/cache/revision evidence cannot be audited from the generated report. |

### Gaps Summary

The local release primitives and negative-path tests are solid, while Phase 8's result is a release-ready implementation rather than a completed production delivery. Publishing and executing the guarded workflow with authorized provider access is the external prerequisite. The verifier must also preserve structured sitemap/manifest outcomes so that the succeeding provider run produces an auditable DEPLOY-02 matrix.

---

_Verified: 2026-08-17T12:59:32Z_
_Verifier: the agent (gsd-verifier)_
