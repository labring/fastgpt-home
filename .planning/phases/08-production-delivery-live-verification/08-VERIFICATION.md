---
phase: 08-production-delivery-live-verification
verified: 2026-08-17T18:12:50Z
status: passed
score: 6/6 must-haves verified
behavior_unverified: 0
overrides_applied: 0
re_verification:
  previous_status: gaps_found
  previous_score: 4/6
  gaps_closed:
    - "The authorized workflow produced immutable CN and IO provider receipts with deployed revisions and rollback targets."
    - "Both production Guide domains passed the strict 18-route and support-surface verifier."
  gaps_remaining: []
  regressions: []
gaps: []
---

# Phase 8: Production Delivery & Live Verification Report

**Phase Goal:** The verified bilingual Guide release is live on both owned domains with traceable artifact and health evidence.  
**Verified:** 2026-08-17T18:12:50Z  
**Status:** passed  
**Workflow run:** [32053216857](https://github.com/labring/fastgpt-home/actions/runs/32053216857)  
**Head SHA:** `7e700bd97dc857bf50a8d4f9dab180d53f3df4a9`

## Goal Achievement

| # | Truth | Status | Evidence |
| --- | --- | --- | --- |
| 1 | Verified CN/IO static trees become content-addressed archives with manifests, route inventories, tree digests, archive checksums, and rollback targets. | ✓ VERIFIED | `npm run release:artifact-regression` passed 6/6; production verify and package jobs retained the exact trees and release bundle. |
| 2 | Provider-derived rollback state is checked before mutation and final immutable provider receipts are written after successful deployment. | ✓ VERIFIED | Run 32053216857: CN digest-pinned rollout completed; IO Pages deployment completed with deployment ID/URL and `initial-production` rollback sentinel. |
| 3 | The live matrix fails closed and validates SEO, cache, manifests, sitemaps, and receipts. | ✓ VERIFIED | `npm run verify:guide-live-regression` passed 5/5; strict public verification with both downloaded receipts returned `status=passed`. |
| 4 | An authorized production workflow run records deployed revisions and rollback targets for both providers. | ✓ VERIFIED | [Run 32053216857](https://github.com/labring/fastgpt-home/actions/runs/32053216857) completed verify, package, CN, IO, and evidence jobs successfully. |
| 5 | Both public Guide hubs and all 16 article URLs satisfy final 200/SEO/cache/sitemap/revision evidence. | ✓ VERIFIED | The live artifact contains 9 CN + 9 IO routes, every route has status 200 and zero failures; both manifests and sitemaps return 200. |
| 6 | The live report preserves a structured support-surface status/cache/revision matrix. | ✓ VERIFIED | [Live evidence artifact](https://github.com/labring/fastgpt-home/actions/runs/32053216857/artifacts/9295648744) records status, final URL, selected headers, body digest, and failures for every route, sitemap, and manifest. |

**Score:** 6/6 truths verified.

## Provider and Artifact Evidence

| Variant | Release revision | Artifact/tree digest | Archive digest | Rollback target | Deployed provider revision |
| --- | --- | --- | --- | --- | --- |
| CN | `52b673022aad5344232676359b3af5cf9e5cda2213d6b94d9f5c84a28b3ec313` | `3c0afe9001c6605a6d0387615fc2dac99656e3747a387cb3aa5dca1b10a4d099` | `8f3891cfba85971b9b90345a937684d6dc24d297509d97936ec81df96ba8a2be` | `ghcr.io/labring/fastgpt-home@sha256:4528487b97eaf9f767a6d9a15dd83469caed1be1cab29677420b7f502afb0671` | `ghcr.io/labring/fastgpt-home@sha256:5f8010205aad3aac5cc174ae0fb50be07b087be653dcf91839a6e643663ee008`; rollout completed |
| IO | `3be314ef102f224259f51b289e095d7f58ca8fca26fcf90505d142568b04e451` | `efa418c814c04417db0c11ec211fe7f6bb02e96dac1a1041dae1e8c1baed3054` | `2bf6d96527291c2bf4fb33a506698aae3b2743364e22d4b934ecbea8ff8516ac` | `initial-production` | Pages deployment `c806b88f-186a-43c9-8e20-64d212e3e6a3`, [URL](https://c806b88f.fastgpt-home.pages.dev), environment production |

Receipts are retained in the [CN provider artifact](https://github.com/labring/fastgpt-home/actions/runs/32053216857/artifacts/9295637713) and [IO provider artifact](https://github.com/labring/fastgpt-home/actions/runs/32053216857/artifacts/9295608965). The verified trees and immutable archives are retained in [workflow artifacts](https://github.com/labring/fastgpt-home/actions/runs/32053216857).

## Public Live Matrix

| Variant | Sitemap | Manifest | Guide routes | Manifest cache policy | Revision headers |
| --- | --- | --- | --- | --- | --- |
| CN | 200 | 200 | 9/9 at 200, zero failures | `no-store` | revision `52b673...`, artifact `3c0afe...` |
| IO | 200 | 200 | 9/9 at 200, zero failures | `no-store` | revision `3be314...`, artifact `efa418...` |

The strict verifier recorded reciprocal `zh-CN`, `en`, and `x-default` alternates, localized H1 values, self canonicals, explicit indexable robots metadata, sitemap membership, cache freshness, and body digests for all 18 routes.

## Required Artifacts

| Artifact | Status | Evidence |
| --- | --- | --- |
| `scripts/release-artifact.js` | ✓ VERIFIED | Idempotent injected `/__release/manifest.json` block includes `! Cache-Control`, `Cache-Control: no-store`, and X-Release identity headers. |
| `scripts/release-artifact.test.js` | ✓ VERIFIED | 6/6 tests pass, including existing-block normalization and repeated invocation stability. |
| `scripts/purge-cloudflare-cache.js` | ✓ VERIFIED | Purge regression passes 3/3 with credential redaction. |
| `scripts/verify-release.js` | ✓ VERIFIED | Source/release checks pass; production verify retained both exact output trees. |
| `Dockerfile`, `nginx.conf`, `public/_headers` | ✓ VERIFIED | CN runtime copies the verified archive tree; manifest is explicitly uncached on both providers. |
| `.github/workflows/guide-production-release.yml` | ✓ VERIFIED | Run 32053216857 completed all provider and evidence jobs successfully. |
| `scripts/verify-guide-live.js` | ✓ VERIFIED | Strict public report passed with both provider receipts. |
| `08-LIVE-EVIDENCE.json` | ✓ VERIFIED | Updated from the real run artifact with `status=passed`, 18 route results, and four support surfaces. |
| Provider receipts and release bundle | ✓ VERIFIED | [CN receipt](https://github.com/labring/fastgpt-home/actions/runs/32053216857/artifacts/9295637713), [IO receipt](https://github.com/labring/fastgpt-home/actions/runs/32053216857/artifacts/9295608965), [bundle](https://github.com/labring/fastgpt-home/actions/runs/32053216857/artifacts/9295569552). |

## Key Link Verification

| From | To | Via | Status |
| --- | --- | --- | --- |
| Retained CN/IO trees | Immutable archives | `verify:release --retain-success-artifacts` → `release-artifact.js package` | ✓ WIRED AND EXECUTED |
| CN archive | Kubernetes revision | checksum → exact extraction → release-runtime image → GHCR digest → digest-pinned rollout → receipt | ✓ WIRED AND EXECUTED |
| IO archive | Pages revision | checksum → exact extraction → Pages deploy → deployment ID/URL receipt | ✓ WIRED AND EXECUTED |
| Provider receipts | Public verifier | evidence job passes both receipt paths to `verify-guide-live.js` | ✓ WIRED AND EXECUTED |
| Public routes | SEO and cache contract | strict 18-route matrix, sitemap, manifest, header, body-digest checks | ✓ WIRED AND EXECUTED |

## Behavioral Spot-Checks

| Behavior | Command or evidence | Result |
| --- | --- | --- |
| Immutable artifact contract | `npm run release:artifact-regression` | 6 passed, 0 failed |
| Cloudflare purge boundary | `npm run release:purge-cloudflare-regression` | 3 passed, 0 failed |
| Local live matrix | `npm run verify:guide-live-regression` | 5 passed, 0 failed |
| Release workflow structure | `node --test scripts/verify-release.test.js` | 10 passed, 1 documented case-sensitive skip |
| Production build | `npm run build` | Next.js build and 3,695 static pages completed, exit 0 |
| Strict public matrix | `node scripts/verify-guide-live.js --provider-evidence ...` | `status=passed`; 18 routes and 4 support surfaces |
| Provider delivery | [Run 32053216857](https://github.com/labring/fastgpt-home/actions/runs/32053216857) | verify/package/deploy/evidence jobs all successful |

## Requirements Coverage

| Requirement | Status | Evidence |
| --- | --- | --- |
| DEPLOY-01 | ✓ VERIFIED | Immutable CN and IO artifacts were consumed by the production workflow; deployed provider revisions, archive/tree/artifact digests, and rollback targets are recorded in final receipts. |
| DEPLOY-02 | ✓ VERIFIED | Both domains expose 9 Guide routes, 2 support surfaces, status 200, localized H1, self canonical, reciprocal alternates, indexability, sitemap membership, cache freshness, no-store manifests, and matching revision headers. |

## Disconfirmation Findings

- No route, sitemap, manifest, cache, revision, or provider-receipt failures remain in the strict live report.
- The IO first publish uses the explicit `initial-production` rollback sentinel with a null previous deployment URL; this is recorded as the expected first-publish state.
- The local case-insensitive filesystem skip remains a documented host limitation; the hosted Ubuntu verification job passed the production release gate.

**Verification result:** Phase 8 DEPLOY-01 and DEPLOY-02 are satisfied by the immutable release artifacts, provider receipts, and strict public evidence from run 32053216857.

---

_Verified: 2026-08-17T18:12:50Z_  
_Verifier: Phase 8 production workflow and strict live verifier_

