---
phase: quick
plan: 260816-kq6
verified: 2026-08-16T07:19:03Z
status: human_needed
score: 2/4 must-haves verified
behavior_unverified: 2
overrides_applied: 0
re_verification:
  previous_status: human_needed
  previous_score: 2/4
  gaps_closed:
    - "Fixture skip now probes the active filesystem instead of applying to every Darwin host."
  gaps_remaining: []
  regressions: []
behavior_unverified_items:
  - truth: "A metadata-verifier CLI run loads and validates the English FAQ artifact, authored records, and route identity once, then reuses that same source context for optional HTML verification."
    test: "Run `npm run verify:release-regression` on a case-sensitive filesystem."
    expected: "The real `--html --variant io` child process exits 0 after 1,195 pages and its preload read counter observes exactly one read of `src/faq/generated-en-metadata.json`."
    why_human: "The current APFS workspace is case-insensitive, so the fixture child-process test is skipped before it exercises the runtime call chain."
  - truth: "An HTML-mode regression drives the real CLI entry point across all 1,195 io fixtures and fails unless that child process reads the approved metadata artifact exactly once."
    test: "Execute the release regression on a case-sensitive Linux/CI runner and retain its TAP output."
    expected: "Six tests pass with zero skips; the HTML CLI test reports `io, 1195 FAQ pages` and exits successfully only with one approved-artifact read."
    why_human: "The current APFS workspace is case-insensitive and the local TAP run recorded one skipped test."
human_verification:
  - test: "Run `npm run verify:release-regression` on a case-sensitive Linux or CI runner."
    expected: "The metadata HTML CLI test runs, reports `io, 1195 FAQ pages`, and the suite has six passes and zero skips."
    why_human: "The current APFS volume aliases three route-key pairs differing only by case."
  - test: "Synchronize the skipped-test ledger descriptions."
    expected: "The Markdown table and embedded JSON in `WINDOWS.md` both describe the CaseProbe contract: case-insensitive volumes skip; Linux and case-sensitive APFS execute."
    why_human: "The Markdown table retains the earlier `case-insensitive macOS` / `case-sensitive CI` wording, while its embedded JSON contains the new volume/Linux/case-sensitive-APFS wording."
---

# Quick 260816-kq6 Verification Report

**Goal:** Thread the validated source context through `verify-faq-metadata` HTML verification and remove duplicate artifact validation.
**Verified:** 2026-08-16T07:19:03Z
**Status:** human_needed
**Re-verification:** Yes — after CaseProbe correction

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
| --- | --- | --- | --- |
| 1 | A CLI run loads one validated source context and reuses it in optional HTML verification. | ⚠️ PRESENT_BEHAVIOR_UNVERIFIED | `main()` creates `sourceContext` once at lines 394-401, then passes it to `verifyHtmlExport()`, which passes it to `buildOwnerExpectationSet()`. The runtime one-read assertion awaits a case-sensitive volume. |
| 2 | HTML expectations preserve 1,195 io and 1,490 cn records, route keys, metadata fields, identity checks, and diagnostics. | ✓ VERIFIED | `buildOwnerExpectationSet('io')` and `('cn')` passed the direct-helper test with counts 1,195/1,490, owner keys, and populated Chinese-only fields. `node scripts/verify-faq-metadata.js` passed 1,195 mapped, 205 fallback, and 1,400 total source checks including failure diagnostics. The diff retains the existing HTML assertion loop. |
| 3 | Direct callers retain the internal `buildOwnerExpectationSet(variant)` fallback. | ✓ VERIFIED | The function uses `sourceContext ?? loadSourceContext()` after variant validation; the direct io and cn calls in `scripts/verify-release.test.js` passed. |
| 4 | A real HTML CLI regression creates 1,195 io fixtures and proves one approved-artifact read. | ⚠️ PRESENT_BEHAVIOR_UNVERIFIED | `isCaseSensitiveFilesystem()` writes `CaseProbe` and checks `caseprobe`; the current probe aliases these names, so the collision-aware test skips before child execution. Case-sensitive Linux and APFS proceed into the real CLI path. |

**Score:** 2/4 truths verified (2 present, behavior-unverified)

## Required Artifacts

| Artifact | Expected | Status | Details |
| --- | --- | --- | --- |
| `scripts/verify-faq-metadata.js` | One validated source context flows through HTML expectation generation. | ✓ VERIFIED | Exists and is substantive. `main` → `verifyHtmlExport` → `buildOwnerExpectationSet` forwards the same object; standalone calls load the fallback context. |
| `scripts/verify-release.test.js` | CLI regression observes single-load reuse with direct-helper fallback coverage. | ✓ VERIFIED | Exists and is substantive. A temporary `CaseProbe` selects the fixture path by volume behavior, then the test preserves `out/`, creates all fixtures, preloads a counter, spawns the CLI, restores state in `finally`, and retains direct-helper coverage. |

## Key Link Verification

| From | To | Via | Status | Details |
| --- | --- | --- | --- |
| `main()` | `verifyHtmlExport()` | `verifyHtmlExport(options.variant, sourceContext)` | ✓ WIRED | Lines 396-401 create one context and pass the exact binding. |
| `verifyHtmlExport()` | `buildOwnerExpectationSet()` | `buildOwnerExpectationSet(variant, sourceContext)` | ✓ WIRED | Lines 364-368 forward the same argument. |
| `scripts/verify-release.test.js` | `main() → verifyHtmlExport() → buildOwnerExpectationSet()` | CaseProbe-selected spawned `--html --variant io` child with one-read preload | ⚠️ PRESENT_BEHAVIOR_UNVERIFIED | The test is correctly wired at lines 128-183; the current volume skip prevented runtime proof. |

## Data-Flow Trace

| Artifact | Data Variable | Source | Produces Real Data | Status |
| --- | --- | --- | --- | --- |
| `scripts/verify-faq-metadata.js` | `sourceContext` | `loadSourceContext()` reads authored English FAQ, route identity, and approved metadata then validates them | Yes; consumed by source checks and HTML owner expectations | ✓ FLOWING |
| `scripts/verify-release.test.js` | `ioExpectations` | Direct `buildOwnerExpectationSet('io')` fallback | Yes; maps every approved record to a fixture path | ✓ FLOWING |

## Behavioral Spot-Checks

| Behavior | Command | Result | Status |
| --- | --- | --- | --- |
| Source artifact, route identity, catalog overlay, and diagnostics validate | `node scripts/verify-faq-metadata.js` | `passed source checks (1195 mapped, 205 fallback, 1400 total)` | ✓ PASS |
| Owner expectation regression and CLI one-read test | `npm run verify:release-regression` | 5 pass, 1 skipped: CaseProbe reports the current filesystem as case-insensitive | ? SKIP |
| Aggregate release source gate | `npm run verify:release -- --source-only` | All source checks passed; reports full mode needs a case-sensitive filesystem | ✓ PASS |
| Scope formatting | `git diff --check -- scripts/verify-faq-metadata.js scripts/verify-release.test.js` | Exit 0 | ✓ PASS |

## Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
| --- | --- | --- | --- |
| VERIFY-03 | `260816-kq6-PLAN.md` | Exported FAQ HTML verifies intended H1, approved metadata, canonical URL, and hreflang for every applicable final route. | ⚠️ NEEDS HUMAN | Existing source checks and expectation data passed; 1,195-page HTML runtime verification awaits a case-sensitive runner. |

## Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
| --- | --- | --- | --- |
| `scripts/verify-faq-metadata.js` | 206 | Existing `placeholders` comment | ℹ️ Info | The comment documents tolerated framework JSON-LD parsing. It has no fixture or user-visible data path. |

## Human Verification Required

### 1. Full 1,195-fixture CLI execution

**Test:** Run `npm run verify:release-regression` on case-sensitive Linux or case-sensitive APFS.

**Expected:** Six tests pass with zero skips. The HTML CLI test prints `io, 1195 FAQ pages` and its preload process exit hook observes one artifact read.

**Why human:** CaseProbe reports this workspace as case-insensitive and it collapses these three pairs: `How-AI-Helps-in-Planning` / `How-AI-helps-in-planning`, `How-AI-Intelligent-Assistants-Predict` / `How-AI-intelligent-assistants-predict`, and `How-AI-Intelligent-Platforms-Enhance` / `How-AI-intelligent-platforms-enhance`.

### 2. Skipped-test ledger consistency

**Test:** Update the Markdown table or embedded JSON so both state the same CaseProbe policy.

**Expected:** Both representations state: case-insensitive volumes skip; Linux and case-sensitive APFS hosts run the full regression.

**Why human:** The source code now uses the correct volume probe. `WINDOWS.md` has two different descriptions: its Markdown table says `case-insensitive macOS` and `case-sensitive CI`, while its JSON says `case-insensitive volumes`, `Linux`, and `case-sensitive APFS`.

## Gaps Summary

The source-context refactor, direct-helper fallback, and active-volume CaseProbe are implemented and source checks pass. The only unresolved evidence is the runtime child-process path on a case-sensitive filesystem. The current environment is the sole skip condition observed in this verification, so it remains a human-verification item rather than a code gap. The ledger needs its two descriptions synchronized.

---

_Verified: 2026-08-16T07:19:03Z_
_Verifier: gsd-verifier_
