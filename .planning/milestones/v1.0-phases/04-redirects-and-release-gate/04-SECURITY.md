---
phase: 04
slug: redirects-and-release-gate
status: verified
threats_open: 0
asvs_level: 1
created: 2026-08-16
---

# Phase 04 — Security

> Per-phase security contract: threat register, accepted risks, and audit trail.

## Trust Boundaries

| Boundary | Description | Data Crossing |
|----------|-------------|---------------|
| Route registry → redirect projection | Registry dispositions decide which legacy paths receive redirects. | Committed route IDs and collision dispositions |
| Request path/query → edge writers | Worker and Nginx writers map untrusted request paths to prevalidated owner URLs. | URL pathname and query string |
| Build environment → static artifacts | Explicit owner variant and filesystem semantics determine generated routes. | Build-time environment variables and generated HTML |
| Child verifier → release result | Subprocess status and diagnostics determine release eligibility. | Exit status, stdout/stderr, route context |
| Generated artifacts → repository worktree | Snapshot and cleanup logic controls generated files and retained failure evidence. | Tracked public files and disposable build output |

## Threat Register

| Threat ID | Category | Component | Severity | Disposition | Mitigation | Status |
|-----------|----------|-----------|----------|-------------|------------|--------|
| T-04-01 | Tampering | Registry-backed alias projection | high | mitigate | Registry target, repaired disposition, one-to-one mapping, deterministic output, and focused redirect checks. | closed |
| T-04-02 | Spoofing | Collision ledger and denied aliases | high | mitigate | Record and ledger deny sets plus exact Worker/Nginx artifact assertions for 572/149 denied sources. | closed |
| T-04-03 | Open redirect/injection | Worker/Nginx target writers | high | mitigate | Owner-host allowlist, encoded path segments, query preservation, and direct 301 assertions. | closed |
| T-04-04 | Integrity | Variant build orchestration | high | mitigate | Explicit io/cn environments, stale-output cleanup, immediate checks, and 1,400/1,490 cardinality assertions. | closed |
| T-04-05 | Environment | Case-insensitive filesystem | high | mitigate | Pre-build case-sensitivity probe with conflicting route diagnostics and compatible-host guidance. | closed |
| T-04-06 | Error handling | Aggregate verifier subprocesses | high | mitigate | Captured exit status/output, variant and record context, immutable failures, and nonzero exit on child failure. | closed |
| T-04-07 | Artifact integrity | Cleanup and generated public files | medium | mitigate | Tracked-file snapshot/restore, disposable output cleanup, and `--keep-artifacts` retention. | closed |
| T-04-08 | Supply chain | Release command dependencies | medium | mitigate | Release checks use committed snapshots and current Node/npm tooling; runtime `FAQ_ROUTE_EVIDENCE` remains an explicit maintainer-controlled input boundary. | open — below high threshold (non-blocking) |

*Status: open · closed · open — below high threshold (non-blocking)*
*Severity: critical > high > medium > low — only open threats at or above the high block threshold count toward threats_open*
*Disposition: mitigate (implementation required) · accept (documented risk) · transfer (third-party)*

## Accepted Risks Log

No accepted risks. T-04-08 remains a documented non-blocking mitigation follow-up below the configured high threshold.

## Security Audit Trail

| Audit Date | Threats Total | Closed | Open | Run By |
|------------|---------------|--------|------|--------|
| 2026-08-16 | 8 | 7 | 1 non-blocking | gsd-security-auditor |

## Sign-Off

- [x] All threats have a disposition (mitigate / accept / transfer)
- [x] Accepted risks documented in Accepted Risks Log
- [x] `threats_open: 0` confirmed
- [x] `status: verified` set in frontmatter

**Approval:** verified 2026-08-16
