---
phase: 05-guide-content-contract
verified: 2026-08-17T04:30:40Z
status: passed
score: 9/9 must-haves verified
behavior_unverified: 0
overrides_applied: 0
human_verification: []
---

# Phase 5: Guide Content Contract Verification Report

**Phase Goal:** Maintainers have one validated, source-faithful bilingual contract for all publishable Guide articles.
**Verified:** 2026-08-17T04:30:40Z
**Status:** passed
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
| --- | --- | --- | --- |
| 1 | Exactly eight unique Guide slugs each have one approved Chinese and one approved English document. | ✓ VERIFIED | `registry.json` has eight unique entries; its mapped 8 zh + 8 en files are the full repository inventory. Direct byte comparison against both Week04 delivery directories passed; the delivery-only English GSC appendix remains excluded. |
| 2 | The contract has one typed identity source usable by later build code. | ✓ VERIFIED | `registry.ts` imports the JSON manifest, validates the exact `en,slug,zh` shape, exposes `guideEntries`/`guideSlugs`, and the direct loader check exercised all 16 registry-selected sources. |
| 3 | Every publishable body removes exactly one byte-zero delivery comment and preserves the remaining LF-normalized content. | ✓ VERIFIED | `readGuideDocument()` built all 16 bodies and requires `\\n\\n#` after the one leading comment. It verifies both raw-source and normalized-body SHA-256 digests; the regression suite also rejects missing, unterminated, and doubled leading comments plus body drift. |
| 4 | Each locale is checked against its own approved H1, metadata, canonical, hreflang, schema, directives, and digest. | ✓ VERIFIED | The loader compares every parsed field to its locale snapshot; the full verifier passed all 16 documents. The source-boundary byte comparison independently confirms the snapshots refer to approved delivery bytes, including intentionally truncated English metadata. |
| 5 | Image directives remain source data until an approved asset exists, and future required assets fail safely when invalid. | ✓ VERIFIED | Current manifest statuses are `none`, `requested-unapproved`, or `source-exception`; no inferred assets are emitted. Regression and an independent mutation both reject `server-sizing-guide: zh: required asset is missing or invalid` for a missing contained public asset. |
| 6 | Raw source link labels remain unpublished until configured, and an unresolved configured target fails with slug and label. | ✓ VERIFIED | `configuredInternalLinks` is distinct from source labels. Regression injects empty, fragment, foreign, malformed, and unknown targets and verifies slug-plus-label failures. |
| 7 | Source reads are server-only, dependency-free, and contained within the repository boundary. | ✓ VERIFIED | `guideContent.ts` imports `server-only`, uses Node `fs`/`path`/`crypto`, checks basename and resolved locale-root containment, and has no Downloads-path reference. TypeScript compilation passed. |
| 8 | Duplicate slug, incomplete pair, metadata mismatch, invalid schema, missing asset, invalid link, malformed comment, and body drift all yield actionable failures. | ✓ VERIFIED | `node --test scripts/verify-guide-content.test.js` and the npm regression command each passed 8 tests covering all required failure classes with affected slug; configured-link cases also assert the source label. |
| 9 | Maintainers have stable, runnable complete-contract verification commands without dependency or lockfile changes. | ✓ VERIFIED | `verify:guide-content` and `verify:guide-content-regression` exist in `package.json`; the full command reports `8 slugs, 16 documents`, all checks pass, and `git diff --exit-code -- package-lock.json` exits 0. |

**Score:** 9/9 truths verified (0 present, behavior-unverified)

### Required Artifacts

| Artifact | Expected | Status | Details |
| --- | --- | --- | --- |
| `src/content/guides/registry.json` | Cross-runtime eight-pair identity manifest | ✓ VERIFIED | Eight lower-case unique slugs, exact locale pairs, and 16 mapped source records; each mapped file is byte-identical to Week04. |
| `src/content/guides/zh` | Eight approved Chinese documents | ✓ VERIFIED | Eight files; every registry source name resolves and byte comparison passed. |
| `src/content/guides/en` | Eight approved English documents | ✓ VERIFIED | Eight files; every registry source name resolves and byte comparison passed; the ninth delivery-package appendix is excluded. |
| `src/content/guides/registry.ts` | Typed registry facade | ✓ VERIFIED | Substantive runtime validation plus exported entry/slug/source lookup API; direct loader execution consumes it. |
| `src/lib/guideContent.ts` | Server-only strict parser and body builder | ✓ VERIFIED | Reads 16 contained paths, parses delivery metadata, checks exact hashes, and returns normalized bodies in the direct execution probe. |
| `scripts/verify-guide-content.js` | Standalone contract verifier | ✓ VERIFIED | Full corpus CLI passed; it validates registry shape, pair count, schema, assets, links, paths, metadata, comments, and digests. |
| `scripts/verify-guide-content.test.js` | Mutation regression matrix | ✓ VERIFIED | 171-line substantive Node test suite; direct import of the verifier is silent and every required negative class is exercised. |
| `package.json` | Stable verifier command names | ✓ VERIFIED | Both Guide commands are wired to the source verifier and Node test runner; dependency objects remain unchanged. |

### Key Link Verification

| From | To | Via | Status | Details |
| --- | --- | --- | --- | --- |
| `registry.ts` | `registry.json` | TypeScript JSON import and runtime registry validation | ✓ WIRED | `import registry from './registry.json'`; the registry facade passed TypeScript compilation and served the direct all-16 loader probe. |
| `guideContent.ts` | `registry.ts` | `getGuideSource()` selects source name before contained `readFileSync` | ✓ WIRED | Source imports `getGuideSource`; the direct loader probe read every zh/en registry selection successfully. |
| `verify-guide-content.js` | `registry.json` | CommonJS file read from repository root | ✓ WIRED | Script reads `src/content/guides/registry.json`; full CLI completed all 16 source checks. |
| `registry.json` | zh/en source directories | `sourceName`, raw and normalized digests | ✓ WIRED | Every one of 16 manifest paths resolved, passed verifier hashes, and matched the delivery package byte-for-byte. |
| `verify-guide-content.test.js` | `verify-guide-content.js` | Direct pure-function imports and isolated fixtures | ✓ WIRED | `require('./verify-guide-content')`; 8/8 Node tests passed. |
| `package.json` | regression test | `verify:guide-content-regression` | ✓ WIRED | `npm run verify:guide-content-regression` runs `node --test scripts/verify-guide-content.test.js` and passed. |

`verify.key-links` reported three false negatives because the declared patterns use an over-escaped `registry\\.json` expression or the obsolete field name `sourceFile`. Direct source inspection and successful execution above verify the intended connections.

### Data-Flow Trace (Level 4)

| Artifact | Data Variable | Source | Produces Real Data | Status |
| --- | --- | --- | --- | --- |
| `registry.ts` + `guideContent.ts` | `guideEntries` → locale snapshot → `GuideDocument.body` | `registry.json` → committed Week04-identical Markdown | All 16 selected sources read, parsed, digest-checked, and returned | ✓ FLOWING |
| `verify-guide-content.js` | registry entry → source path → parsed body/metadata | Same manifest and committed raw corpus | Full CLI validates all 16 data paths | ✓ FLOWING |

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
| --- | --- | --- | --- |
| Full corpus validates exactly 8×2 | `node scripts/verify-guide-content.js` | `Guide content verified: 8 slugs, 16 documents` | ✓ PASS |
| Required mutation matrix is executable | `node --test scripts/verify-guide-content.test.js` | 8 passed, 0 failed | ✓ PASS |
| Stable npm regression command is wired | `npm run verify:guide-content-regression` | 8 passed, 0 failed | ✓ PASS |
| TypeScript contract compiles | `npx --no-install tsc --noEmit` | Exit 0 | ✓ PASS |
| Server-only reader builds every body | In-memory TypeScript execution probe over `readGuideDocument()` | 16 normalized publishable bodies built | ✓ PASS |
| Delivery source is byte-faithful | Node byte comparison over registry-mapped files and Week04 | 8 zh + 8 en equal; appendix excluded | ✓ PASS |
| Supply-chain boundary remains intact | `git diff --exit-code -- package-lock.json` | Exit 0 | ✓ PASS |

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
| --- | --- | --- | --- |
| GUIDE-01 | 05-01, 05-02, 05-03 | Enumerate eight unique bilingual Guide slugs from the Week04 source package. | ✓ SATISFIED | Registry has exactly eight unique entries and 16 exact byte-matched source documents; GSC appendix exclusion was independently checked. |
| GUIDE-02 | 05-01, 05-02, 05-03 | Build each body by removing exactly one leading delivery comment and preserving the normalized approved body. | ✓ SATISFIED | Loader execution built all 16 bodies; source/body hashes and malformed-comment/body-drift regression checks passed. |
| GUIDE-03 | 05-01, 05-04 | Return slug-specific failures for duplicate pairs, metadata/schema mismatches, missing assets, and unresolved links. | ✓ SATISFIED | Node mutation suite passed all prescribed failure categories, including slug-plus-label internal-link assertions. |

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
| --- | --- | --- | --- |
| `src/content/guides/en/06-EN-3-Year-Total-Cost-of-Ownership-for-Self--V1.0-XstraStar-20260811.md` | 41 | Source text contains the phrase `not available` | ℹ️ Info | Approved article prose preserved byte-for-byte; it has no execution or placeholder role. |

No `TBD`, `FIXME`, `XXX`, `TODO`, `HACK`, or placeholder markers were found in Phase 5 implementation code. No Phase 6 Guide route, UI, metadata-output, JSON-LD, sitemap, asset-rendering, or export-verification surface exists under `src/app/**/guide/**`.

### Human Verification Required

None. This phase is a build-time source contract; its observable runtime behavior is exercised by the full verifier, mutation suite, byte comparison, and direct server-only loader probe.

### Gaps Summary

No blocking gaps. The automated key-link query's pattern-level false negatives were manually traced to valid current imports and source resolution, then confirmed by execution. Phase 6 visitor routes and SEO output remain deliberately deferred by the roadmap and are absent from this phase's implementation.

---

_Verified: 2026-08-17T04:30:40Z_
_Verifier: the agent (gsd-verifier)_
