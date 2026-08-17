# Roadmap: FastGPT SEO Content Publishing

## Overview

v1.1 turns the approved Week04 Chinese and English Guide corpus into a production-verified content center. It first establishes one validated eight-pair source contract, then publishes the owned-domain hubs and article SEO graph, proves both static exports, and releases matching immutable artifacts to `fastgpt.cn` and `fastgpt.io` with live evidence.

## Milestones

- ✅ **v1.0 English FAQ SEO Repair** — Phases 1-4 (shipped 2026-08-16)
- 🚧 **v1.1 Guide Content Center** — Phases 5-8 (in progress)

## Phases

**Phase Numbering:**

- Integer phases are planned milestone work.
- Decimal phases are urgent insertions placed between their surrounding integer phases.

- [x] **Phase 5: Guide Content Contract** - Establish the complete, faithful bilingual source contract for the fixed Guide corpus. (completed 2026-08-17)
- [ ] **Phase 6: Guide Hubs, Articles & SEO Graph** - Publish the bilingual visitor experience and one coherent discovery graph from that contract.
- [ ] **Phase 7: Dual-Variant Release Evidence** - Prove the complete cn and io static artifacts meet the Guide release contract.
- [ ] **Phase 8: Production Delivery & Live Verification** - Deliver both verified artifacts and record production evidence for every Guide URL.

## Phase Details

### Phase 5: Guide Content Contract

**Goal**: Maintainers have one validated, source-faithful bilingual contract for all publishable Guide articles.
**Depends on**: Phase 4 (v1.0 complete)
**Requirements**: GUIDE-01, GUIDE-02, GUIDE-03
**Success Criteria** (what must be TRUE):

  1. A maintainer can enumerate exactly eight unique Guide slugs, each with one approved Chinese source document and one approved English source document.
  2. A maintainer can build every publishable Guide body with its one leading delivery-metadata comment removed and the approved article content preserved after newline normalization.
  3. A maintainer receives a slug-specific build failure for a duplicate slug, incomplete pair, mismatched metadata or schema, required missing asset, or unresolved configured internal link.

**Plans**: 4/4 plans executed

- [x] 05-01-PLAN.md
- [x] 05-02-PLAN.md
- [x] 05-03-PLAN.md
- [x] 05-04-PLAN.md

### Phase 6: Guide Hubs, Articles & SEO Graph

**Goal**: Visitors and crawlers can discover and use every paired Guide page through one owned-domain route and SEO graph.
**Depends on**: Phase 5
**Requirements**: HUB-01, ARTICLE-01, ARTICLE-02, ARTICLE-03, SEO-04, SEO-05, SEO-06, SEO-07
**Success Criteria** (what must be TRUE):

  1. A visitor can open `/guide` on `fastgpt.cn` and `fastgpt.io` and see exactly eight localized article cards grouped as decision, implementation, and industry content.
  2. A visitor can open every owned-domain `/guide/<slug>` URL and read its approved localized H1 and complete authored body; every configured required image renders through the responsive image surface with its authored alternative text.
  3. A visitor can follow each article's Home → Guide → article breadcrumb, return to the localized hub, and reach every configured internal link at its owned canonical destination.
  4. A search crawler receives localized title and description metadata, a self-referencing owned-domain canonical and matching Open Graph URL, plus reciprocal `zh-CN`, `en`, and `x-default` alternates for every Guide hub and article.
  5. A search crawler receives the required article, collection, item-list, and breadcrumb structured data, while each variant sitemap lists its one Guide hub and eight owned article canonicals exactly once from the shared Guide registry.

**Plans**: 0/4 plans executed
**UI hint**: yes

- [ ] 06-01-PLAN.md — Prove one root article tracer, then add validated groups, dates, and all root article routes.
- [ ] 06-02-PLAN.md — Complete all article rendering surfaces and closed localized adapters.
- [ ] 06-03-PLAN.md — Publish the exact three-group, eight-card owned Guide hubs.
- [ ] 06-04-PLAN.md — Add registry-derived sitemap rows and the complete Phase 6 regression gate.

### Phase 7: Dual-Variant Release Evidence

**Goal**: Maintainers can reproduce and inspect complete, release-safe Guide exports for both owned site variants.
**Depends on**: Phase 6
**Requirements**: VERIFY-04, VERIFY-05
**Success Criteria** (what must be TRUE):

  1. A maintainer can run one repository command that validates the Guide pair registry, source fidelity, metadata, assets, internal links, route inventory, SEO graph, sitemap coverage, and exported HTML with slug-specific failures.
  2. A maintainer can produce clean case-sensitive cn and io production exports, each containing exactly one owned Guide hub and eight owned Guide article paths while retaining the existing initial-JavaScript release budget.

**Plans**: TBD

### Phase 8: Production Delivery & Live Verification

**Goal**: The verified bilingual Guide release is live on both owned domains with traceable artifact and health evidence.
**Depends on**: Phase 7
**Operational prerequisite**: A confirmed or implemented `fastgpt.io` immutable artifact, deployment, cache-purge, revision-recording, and rollback path is available before this phase can close.
**Requirements**: DEPLOY-01, DEPLOY-02
**Success Criteria** (what must be TRUE):

  1. A release operator can deploy the verified immutable cn and io artifacts to `fastgpt.cn` and `fastgpt.io`, with each deployed revision and rollback target recorded.
  2. A release operator can verify both production Guide hubs and all 16 production article URLs for final `200` responses, localized H1, self canonical, reciprocal alternates, indexability, sitemap presence, cache freshness, and deployed revision evidence.

**Plans**: TBD

## Progress

**Execution Order:** Phases execute in numeric order: 5 → 6 → 7 → 8.

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 5. Guide Content Contract | 4/4 | Complete    | 2026-08-17 |
| 6. Guide Hubs, Articles & SEO Graph | 0/4 | Planned    |  |
| 7. Dual-Variant Release Evidence | 0/TBD | Not started | - |
| 8. Production Delivery & Live Verification | 0/TBD | Not started | - |
