---
phase: 08
slug: production-delivery-live-verification
audited: 2026-08-18T02:34:00Z
status: verified
asvs_level: 1
security_block_on: high
threats_registered: 15
threats_closed: 15
threats_open: 0
register_authored_at_plan_time: true
---

# Phase 8 Security Audit

> Per-phase security contract: threat register, accepted risks, and audit trail.

## Trust Boundaries

| Boundary | Description | Data Crossing |
| --- | --- | --- |
| Artifact build → release archive | Verified static output becomes a content-addressed release bundle. | HTML, assets, manifest, tree and archive digests |
| Workflow inputs/secrets → provider APIs | GitHub Actions receives deployment targets and provider credentials. | Rollback targets, kubeconfig, Cloudflare credentials |
| Archive/manifest → providers | Verified bundles are consumed by Docker/Kubernetes and Cloudflare Pages. | Immutable archive, image digest, Pages deployment |
| Public HTTP → release verdict | Live responses are compared with the release contract. | Status, HTML identity, headers and body digests |
| Evidence → phase completion | Provider receipts and live reports support the deployment decision. | Revision, artifact/tree/archive digests and verification reports |

## Verdict

**SECURED** — all 15 threat-register entries are closed, including both T-08-SC supply-chain controls. No high-severity threats remain open.

Auditor: `gsd-security-auditor`  
Implementation baseline: `43780c7`  
Provider delivery baseline: `32053216857`

## Threat Register

| Threat ID | Category | Severity | Disposition | Evidence |
| --- | --- | --- | --- | --- |
| T-08-01 | Tampering | high | CLOSED | `scripts/release-artifact.js` recomputes sorted tree and archive SHA-256 digests; archive/digest regressions pass. |
| T-08-02 | Elevation of privilege | high | CLOSED | Release packager rejects traversal, symlinks, and non-regular files before archive/provider use. |
| T-08-03 | Repudiation | medium | CLOSED | Prepared manifests, provider receipts, rollback targets, workflow IDs, and evidence sidecars persist source and deployed identity. |
| T-08-04 | Spoofing | medium | CLOSED | Variant/host allow-list and registry-derived route checks bind release identity to CN/IO ownership. |
| T-08-SC (Plan 01) | Supply chain | high | CLOSED | Artifact tooling uses Node built-ins and native `tar`; repository lockfile remains authoritative. |
| T-08-05 | Elevation of privilege | high | CLOSED | Workflow permissions are minimal; provider credentials are guarded before mutation and never echoed. |
| T-08-06 | Tampering | high | CLOSED | Archive checksum/tree verification precedes provider use; CN image is digest-pinned through Kubernetes. |
| T-08-07 | Repudiation | high | CLOSED | CN/IO provider receipts retain deployed revision, previous/rollback target, purge evidence, workflow run, and source commit. |
| T-08-08 | Denial of service | high | CLOSED | Explicit rollback targets, provider consistency checks, and completed rollout status gate success. |
| T-08-SC (Plan 02) | Supply chain | high | CLOSED | Provider audit checks out the repository before `npm ci --ignore-scripts`; local locked Wrangler 4.123.0 is used; Dockerfile pins the multi-arch Nginx digest `sha256:1982def7c54f70db5186b30fa2e4a1fdf6116f42b45d95627594bd872a75cf6e`; structural tests enforce ordering and versions. |
| T-08-09 | Tampering | high | CLOSED | Strict live verifier checks H1, canonical, alternates, sitemap, manifest identity, headers, and body digests. |
| T-08-10 | Spoofing | high | CLOSED | `verify-guide-live.js` requires `manifest.expectedHost === host` and matching variant; fixture mutation regression fails on host drift. |
| T-08-11 | Denial of service | high | CLOSED | AbortController timeout, manual redirect handling, and explicit 404/redirect failure states prevent false success. |
| T-08-12 | Repudiation | medium | CLOSED | Timestamped JSON/TXT live report and uploaded provider/evidence bundle provide reproducible release records. |
| T-08-13 | Information disclosure | medium | CLOSED | Live diagnostics are bounded and hashed; provider-audit previews redact credential-like fields and cap values. |

## Verification Evidence

- `npm ci --ignore-scripts` succeeds with locked Wrangler 4.123.0; `./node_modules/.bin/wrangler --version` reports 4.123.0.
- `node --test scripts/release-artifact.test.js scripts/verify-guide-live.test.js scripts/verify-release.test.js`: 21 passed, 1 documented case-sensitive filesystem skip.
- `npm run verify:guide-live-regression`: 5 passed.
- `npm run release:purge-cloudflare-regression`: 3 passed.
- `npm run verify:release -- --source-only`: passed.
- `npx tsc --noEmit`: passed.
- Workflow YAML parse and `git diff --check`: passed.
- Existing local Docker CLI absence prevented local `docker buildx imagetools inspect`; the exact multi-arch digest is pinned in both Dockerfile runtime stages and enforced by structural tests.
- Historical `npm audit --omit=dev --audit-level=high` reports pre-existing application dependency advisories (Next.js/PostCSS/sharp/nanoid/picomatch); this audit scope covers the T-08-SC control implementation and does not claim those unrelated advisories are remediated.

## Accepted Risks Log

No accepted risks.

## Audit Trail

| Date | Action | Result |
| --- | --- | --- |
| 2026-08-17 | Phase 8 production workflow run 32053216857 | CN/IO delivery and strict public live evidence passed. |
| 2026-08-18 | T-08-SC hardening commit 9513999 | Exact Wrangler lock, local CLI, and pinned Nginx base added. |
| 2026-08-18 | T-08-10/T-08-SC remediation commit 43780c7 | Manifest host binding, mutation regression, and provider-audit checkout added. |
| 2026-08-18 | gsd-security-auditor re-audit | 15/15 closed; `threats_open: 0`. |

## Sign-Off

- [x] All threats have a disposition (mitigate / accept / transfer)
- [x] Accepted risks documented in Accepted Risks Log
- [x] `threats_open: 0` confirmed
- [x] `status: verified` set in frontmatter

**Approval:** verified 2026-08-18
