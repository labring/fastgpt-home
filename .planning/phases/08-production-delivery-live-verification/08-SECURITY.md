---
phase: 08
slug: production-delivery-live-verification
status: verified
threats_open: 0
asvs_level: 1
created: 2026-08-18
---

# Phase 08 — Security

> Per-phase security contract: threat register, accepted risks, and audit trail.

## Trust Boundaries

| Boundary | Description | Data Crossing |
|----------|-------------|---------------|
| Artifact build → release archive | Generated static output becomes a content-addressed release bundle. | HTML, assets, manifest, tree and archive digests |
| Manifest inputs → release identity | Variant, host, source revision and release metadata define the public identity. | Release metadata and expected host values |
| Archive filesystem → tar | Repository files are staged before archive creation. | Paths, file types and archive entries |
| Workflow inputs/secrets → provider APIs | GitHub Actions receives deployment targets and provider credentials. | Rollback targets, kubeconfig, Cloudflare credentials |
| Archive/manifest → providers | Verified bundles are consumed by Docker/Kubernetes and Cloudflare Pages. | Immutable archive, image digest, Pages deployment |
| Provider state → rollback | Current CN image and IO deployment state establish rollback targets. | Image references, deployment IDs and URLs |
| Public HTTP → release verdict | Live responses are compared with the release contract. | Status, HTML identity, headers and body digests |
| Evidence → phase completion | Provider receipts and live reports support the deployment decision. | Revision, artifact/tree/archive digests and verification reports |

## Threat Register

| Threat ID | Category | Component | Severity | Disposition | Mitigation | Status |
|-----------|----------|-----------|----------|-------------|------------|--------|
| T-08-01 | Tampering | Release artifact packager | high | mitigate | Recomputes sorted tree and archive SHA-256 digests before acceptance (`scripts/release-artifact.js`). | closed |
| T-08-02 | Elevation of privilege | Release artifact packager | high | mitigate | Rejects traversal, symlinks, non-regular files and unsafe tar entries before staging. | closed |
| T-08-03 | Repudiation | Release receipts | medium | mitigate | Persists source/deployed revisions, rollback targets and evidence sidecars in the workflow receipts. | closed |
| T-08-04 | Spoofing | Registry and route validation | medium | mitigate | Whitelists `io`/`cn`, expected hosts and registry-derived routes. | closed |
| T-08-05 | Elevation of privilege | GitHub Actions workflow | high | mitigate | Uses least-privilege permissions, pre-mutation credential guards and secret-echo regression coverage. | closed |
| T-08-06 | Tampering | Provider deployment | high | mitigate | Verifies checksum, extraction, manifest and tree before deployment; CN rollout uses an immutable image digest. | closed |
| T-08-07 | Repudiation | Provider receipts and evidence | high | mitigate | Records provider IDs, rollback targets, artifact identity, workflow run and uploaded evidence. | closed |
| T-08-08 | Denial of service | Rollback and rollout controls | high | mitigate | Requires explicit rollback inputs, validates provider-current targets and waits for rollout status. | closed |
| T-08-09 | Tampering | Live verifier | high | mitigate | Performs exact HTML, H1, canonical, alternate, sitemap and manifest comparisons with body/header digests. | closed |
| T-08-10 | Spoofing | Live manifest binding | high | mitigate | Requires exact `manifest.expectedHost === host` equality and self-canonical validation; mismatch regression is covered. | closed |
| T-08-11 | Denial of service | Live verifier | high | mitigate | Uses bounded `AbortController` fetches and fails on non-200 responses or redirects. | closed |
| T-08-12 | Repudiation | Live verification report | medium | mitigate | Emits a timestamped structured report and uploads it with the provider artifact bundle. | closed |
| T-08-13 | Information disclosure | Diagnostics and provider audit | medium | mitigate | Records bounded status/digest diagnostics, avoids response-body logging and redacts provider-sensitive fields. | closed |
| T-08-SC | Supply chain | Wrangler and runtime base images | high | mitigate | Pins Wrangler `4.123.0` in `package.json`/`package-lock.json`, checks out before `npm ci --ignore-scripts`, invokes the local binary, and pins both Nginx runtime bases by digest. | closed |

*Status: open · closed · open — below high (non-blocking)*
*Severity: critical > high > medium > low — only open threats at or above the blocking severity count toward `threats_open`.*
*Disposition: mitigate (implementation required) · accept (documented risk) · transfer (third-party).* 

## Accepted Risks Log

No accepted risks.

## Security Audit Trail

| Audit Date | Threats Total | Closed | Open | Run By |
|------------|---------------|--------|------|--------|
| 2026-08-18 | 14 | 14 | 0 | gsd-security-auditor and Codex |

## Sign-Off

- [x] All threats have a disposition (mitigate / accept / transfer)
- [x] Accepted risks documented in Accepted Risks Log
- [x] `threats_open: 0` confirmed
- [x] `status: verified` set in frontmatter

**Approval:** verified 2026-08-18
