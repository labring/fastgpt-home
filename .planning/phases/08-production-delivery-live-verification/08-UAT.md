---
status: complete
phase: 08-production-delivery-live-verification
source:
  - 08-01-SUMMARY.md
  - 08-02-SUMMARY.md
  - 08-03-SUMMARY.md
  - 08-VERIFICATION.md
  - 08-LIVE-EVIDENCE.json
started: 2026-08-17T12:59:32Z
updated: 2026-08-17T18:12:50Z
decision_mode: automated-authorized
---

## Current Test

[re-verification complete — all acceptance checks passed]

## Tests

### 1. Immutable release artifact contract

expected: A verified CN or IO export can be archived with a stable tree identity, prepared manifest, archive checksum, and rollback target.  
result: pass  
source: automated  
evidence: `npm run release:artifact-regression` — 6 passed; production run 32053216857 verify/package jobs retained exact output trees and archives.

### 2. Provider rollback and receipt controls

expected: Before provider mutation, the workflow validates each dispatch rollback target against provider-derived state. CN normalizes and pins the image digest; IO records the current deployment when available or the explicit first-publish sentinel. Final receipts contain deployed revisions, archive/tree/artifact identity, and rollback targets.  
result: pass  
source: automated  
evidence: Production run 32053216857 completed CN digest-pinned rollout and IO Pages production deployment. CN receipt records image digest `sha256:5f8010205aad3aac5cc174ae0fb50be07b087be653dcf91839a6e643663ee008`; IO receipt records deployment `c806b88f-186a-43c9-8e20-64d212e3e6a3` and URL `https://c806b88f.fastgpt-home.pages.dev`.

### 3. Published provider delivery path

expected: The authorized production repository exposes the guarded workflow and a completed run records provider-derived CN/IO rollback targets plus final immutable provider revisions.  
result: pass  
source: automated  
evidence: [GitHub Actions run 32053216857](https://github.com/labring/fastgpt-home/actions/runs/32053216857) completed verify, package, deploy-cn, deploy-io, and evidence jobs successfully. Receipt artifacts: [CN](https://github.com/labring/fastgpt-home/actions/runs/32053216857/artifacts/9295637713), [IO](https://github.com/labring/fastgpt-home/actions/runs/32053216857/artifacts/9295608965).

### 4. Public bilingual Guide release

expected: `/guide` and all eight Guide articles return 200 on each owned domain with required SEO, cache, sitemap, manifest, and provider-revision evidence.  
result: pass  
source: automated  
evidence: [Live evidence artifact](https://github.com/labring/fastgpt-home/actions/runs/32053216857/artifacts/9295648744) reports 9 CN + 9 IO routes, all status 200, zero route failures, and both manifests/sitemaps status 200. Strict verifier status is `passed`.

### 5. Auditable sitemap and manifest evidence

expected: The live JSON report records structured HTTP status, final URL, headers, body digest, and timestamps for the two sitemaps and two release manifests.  
result: pass  
source: automated  
evidence: `08-LIVE-EVIDENCE.json` is sourced from the real run report and records four support surfaces with `no-store` manifest cache policy and matching X-Release revision/artifact headers.

## Summary

total: 5
passed: 5
issues: 0
pending: 0
skipped: 0
blocked: 0

DEPLOY-01 and DEPLOY-02 pass with immutable provider receipts and strict public 200/SEO/cache/revision evidence from run 32053216857.

## Gaps

None. The first IO publish uses the documented `initial-production` rollback sentinel and records `previousDeploymentUrl: null` as the expected first-publish state.

## Reproduction

```text
npm run release:artifact-regression
npm run release:purge-cloudflare-regression
npm run verify:guide-live-regression
node --test scripts/verify-release.test.js
npm run build
node scripts/verify-guide-live.js \
  --provider-evidence /tmp/guide-release-32053216857/cn/cn-provider-receipt.json \
  --provider-evidence /tmp/guide-release-32053216857/io/io-provider-receipt.json \
  --report /tmp/guide-release-32053216857/strict-live.json
```

All listed commands completed successfully; the local `verify:release` case-sensitive filesystem probe remains a host-specific skip/failure path, while the hosted Ubuntu workflow passed the complete release gate.

