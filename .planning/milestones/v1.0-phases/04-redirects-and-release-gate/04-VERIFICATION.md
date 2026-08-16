---
phase: 04-redirects-and-release-gate
verified: 2026-08-16T09:45:28Z
status: passed
score: 3/3 must-haves verified
behavior_unverified: 0
overrides_applied: 0
re_verification:
  previous_status: blocked
  previous_score: 2/3
  gaps_closed:
    - "The fixed 260 KiB initial-JavaScript gate blocked case-sensitive io and cn releases."
  gaps_remaining: []
  regressions: []
verification_diagnostics:
  - "ROADMAP.md retains mode: mvp while its Phase 4 goal is not a User Story; user-story.validate returned valid=false. The parent workflow directed this historical metadata diagnostic to remain non-blocking for the already implemented technical re-verification."
---

# Phase 4: Redirects and Release Gate Verification Report

**Phase Goal:** Legacy URL migration and the complete static SEO surface are verified as release-ready.
**Verified:** 2026-08-16T09:45:28Z
**Status:** passed
**Re-verification:** Yes — after the P1 bundle-gap closure in `d1d6e03`.

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
| --- | --- | --- | --- |
| 1 | Changed legacy English FAQ paths with one valid destination redirect permanently in one hop, while ambiguous collision paths receive no guessed redirect. | ✓ VERIFIED | Current `npm run verify:faq-redirects -- --source` passed with 42 eligible redirects, 572 denied repaired sources, and 149 collision-ledger entries. Its source assertions reject duplicate and many-to-one mappings, non-canonical targets, encoded/slash omissions, and confirm Worker `url.search` plus Nginx `$is_args$args`. |
| 2 | One repository command validates record-level source contracts and independently coordinates clean case-sensitive io and cn static exports. | ✓ VERIFIED | Current `npm run verify:release -- --source-only` passed route-registry, metadata, route, SEO-graph, redirect, and TypeScript checks. `scripts/verify-release.js` runs the explicit io/cn build and post-build verifier sequence, route/sitemap cardinality checks (1,400 io; 1,490 cn), and cleanup. Current full-mode execution correctly exits 1 on this case-insensitive host before a build. The recorded case-sensitive quick evidence executed both owner builds with P1 at `260.0 KiB`. |
| 3 | Exported final FAQ HTML preserves the intended H1, approved metadata, canonical URL, applicable hreflang, FAQ JSON-LD, owner domain, and sitemap membership. | ✓ VERIFIED | The retained case-sensitive evidence recorded io metadata HTML for all 1,195 approved English mappings and cn metadata plus SEO HTML for all 1,490 published Chinese routes. `verify-release.js` binds those checks to each variant immediately after build; its P1 guard remains the unchanged `260 * 1024` limit. |

**Score:** 3/3 truths verified (0 present, behavior-unverified).

### Required Artifacts

| Artifact | Expected | Status | Details |
| --- | --- | --- | --- |
| `scripts/lib/redirects.js` | Registry-backed unique legacy-alias projection and query-preserving writers | ✓ VERIFIED | Substantive projection reads the route registry, validates unique sources/canonical targets, rejects collisions and many-to-one edges, and emits Worker/Nginx writers. |
| `scripts/verify-faq-redirects.js` | Source and generated-map redirect verifier | ✓ VERIFIED | Current source run passed exact eligibility, deny-set, canonical-target, encoding, trailing-slash, and query-preservation assertions. |
| `scripts/verify-release.js` | Aggregate source/build/HTML release gate | ✓ VERIFIED | Calls each source verifier, probes host case sensitivity, builds each selected owner variant, runs HTML checks, checks cardinality, aggregates failures, and cleans generated outputs. |
| `package.json` | Maintainer redirect and release commands | ✓ VERIFIED | Wires `verify:faq-redirects`, `verify:release`, and `verify:release-regression` to their executable Node entry points. |
| `scripts/verify-p0.js` | Registry-backed deployment/redirect fixture | ✓ VERIFIED | Present and called by the per-variant release sequence. |
| `scripts/verify-p1.js` | Registry-backed canonical metadata fixture and fixed P1 budget guard | ✓ VERIFIED | Uses `How-to-check-the-number` from the registry; line 21 retains the fixed `260 * 1024` gzip threshold. `d1d6e03` contains zero changes to this guard or the release/redirect scripts. |
| `scripts/verify-i18n-seo.js` | Registry-backed canonical route fixture and owner-SEO assertions | ✓ VERIFIED | Present and called by the per-variant release sequence. |

**Artifacts:** 7/7 verified at existence, substantive implementation, and consumer wiring levels.

### Key Link Verification

| From | To | Via | Status | Details |
| --- | --- | --- | --- | --- |
| `src/faq/generated-en-route-registry.json` | `scripts/lib/redirects.js` | Registry data to deterministic redirect projection | ✓ WIRED | `readRouteRegistry()` feeds `getFaqRedirectProjection()` with `legacySources`, `routeStatus`, `collisionDisposition`, and the collision ledger. Current projection reports 42 eligible and 572 denied sources. |
| `scripts/lib/redirects.js` | `out/_worker.js`, `.next/nginx-redirects.conf` | Variant-owned writers | ✓ WIRED | `scripts/clean-locale-output.js` calls `buildRedirects()`, `writeCloudflareWorker()`, and `writeNginxRedirectMap()`. The redirect verifier asserts generated-map one-hop entries and query contracts. |
| `scripts/verify-faq-redirects.js` | Registry and edge artifacts | Exact source/target/deny-set checks | ✓ WIRED | The verifier imports `getFaqRedirectProjection()` and runs source assertions on every execution; artifact mode parses Worker and Nginx maps. |
| `scripts/verify-release.js` | `package.json` build and existing verifiers | Variant environments, immediate post-build checks, and failure aggregation | ✓ WIRED | `runVariantChecks()` runs `npm run build`, P0/P1/P2/i18n, metadata HTML, SEO HTML, redirect artifacts, and cardinality for io then cn. |
| `scripts/verify-release.js` | Generated route registry and metadata | Source checks and exported-HTML identity coverage | ✓ WIRED | `runSourceChecks()` invokes the registry and metadata generators plus source verifiers; per-variant checks add metadata and SEO HTML assertions. |

The automated key-link query uses literal target-name matching and returned false for these generated/runtime edges. The manual traces above establish the actual imports, calls, arguments, and source data flow.

### Data-Flow Trace (Level 4)

| Artifact | Data Variable | Source | Produces Real Data | Status |
| --- | --- | --- | --- | --- |
| `scripts/lib/redirects.js` | `faqProjection.eligible`, `deniedSources` | Committed English route registry and collision ledger | Validated registry records feed generated maps | ✓ FLOWING |
| `scripts/verify-release.js` | Variant build/verifier results | Executable verifier subprocesses and exported files | Results are aggregated into an exit status with retained failure evidence | ✓ FLOWING |

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
| --- | --- | --- | --- |
| Redirect source projection | `npm run verify:faq-redirects -- --source` | `eligible=42, denied=572, ledger=149` | ✓ PASS |
| Release regression semantics | `npm run verify:release-regression` | 5 passed; 1 pre-existing case-sensitive-filesystem skip | ✓ PASS |
| Aggregate source gate | `npm run verify:release -- --source-only` | All seven source checks passed | ✓ PASS |
| Case-sensitive host requirement | `npm run verify:release` | Exit 1 before build with the published mixed-case collision pair named | ✓ PASS — expected fail-closed host policy |
| Owner P1 build budget | Case-sensitive quick `io` and `cn` production builds | Each recorded `P1 verification passed ... 260.0 KiB initial JavaScript gzip` | ✓ PASS |

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
| --- | --- | --- | --- | --- |
| URL-04 | 04-01 | Unique changed legacy paths redirect permanently in one hop while ambiguous collision paths have no guessed redirect. | ✓ SATISFIED | Current redirect source check passes all exact counts and deny/target contracts. |
| VERIFY-01 | 04-01 | One command validates workbook, metadata, URL, redirect, identity, and SEO-surface alignment with record-level failures. | ✓ SATISFIED | Current source-only release command passes; coordinator code wires the full per-owner release checks. |
| VERIFY-02 | 04-01 | Production builds include every final in-scope English FAQ route in the static export. | ✓ SATISFIED | Case-sensitive io export evidence covers 1,400 FAQ routes; cn covers 1,490 published routes. Both now meet the fixed P1 budget. |
| VERIFY-03 | 04-01 | Exported FAQ HTML verifies intended H1, approved metadata, canonical URL, and expected hreflang. | ✓ SATISFIED | Case-sensitive io metadata evidence covers 1,195 approved English mappings; cn metadata/SEO evidence covers 1,490 published routes. |

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
| --- | --- | --- | --- | --- |
| `scripts/verify-release.js` | 175 | `return []` for an absent directory | ℹ️ Info | Guard for optional build-output traversal; callers validate expected cardinality afterward. |
| `scripts/verify-i18n-seo.js` | 312, 355-356 | Empty-object parser result and HTML input placeholders | ℹ️ Info | Existing parsing/UI values; neither reaches the Phase 4 redirect or release verdict as a stub. |

No Phase 4 `TBD`, `FIXME`, or `XXX` debt markers were found.

## Re-verification Context

The earlier blocker was real: P1 measured `267.0 KiB` against an unchanged `260 KiB` limit. Quick optimization commit `d1d6e03` deferred modal-only and optional client code while leaving the release gate, redirect projection, `package.json`, and P1 verifier byte-for-byte unchanged. Its case-sensitive io and cn builds each measured exactly `260.0 KiB` gzip, so the aggregate gate’s hard threshold now passes without relaxing release policy.

The current workstation is case-insensitive. Full `verify:release` correctly reports the `How-AI-helps-in-planning` / `How-AI-Helps-in-Planning` collision and exits before a potentially misleading build. This remains a required release-host policy; Linux, Docker, or case-sensitive APFS supplies full owner-export execution.

## MVP Metadata Diagnostic

`roadmap.get-phase 4` retains `Mode: mvp`, while `user-story.validate` reports `valid: false` for the historical technical goal. The parent workflow accepted this as non-blocking metadata context for an already implemented and otherwise fully evidenced technical Phase 4. This report therefore evaluates the stated release outcome and its roadmap success criteria.

---

_Verified: 2026-08-16T09:45:28Z_
_Verifier: Codex goal-backward verification subagent_
