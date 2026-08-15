# Roadmap: FastGPT English FAQ SEO Repair

## Overview

This MVP repairs the SEO surface for English FAQ records already present in the repository. It first establishes stable canonical routes, then imports approved metadata, aligns the full SEO graph, and proves redirect and static-export readiness. The delivery endpoint is release-ready code; production deployment and historical missing-body recovery remain out of scope.

## Phases

**Phase Numbering:**
- Integer phases are planned MVP work.
- Decimal phases are urgent insertions placed between their surrounding integer phases.

- [ ] **Phase 1: Canonical FAQ Routes** - Give every current English FAQ a stable identity and safe canonical path while preserving healthy URLs.
- [ ] **Phase 2: Approved Metadata** - Import and render the approved Week04 metadata without altering authored FAQ content.
- [ ] **Phase 3: Coherent SEO Graph** - Make final FAQ pages, alternates, links, and sitemap agree on canonical identity.
- [ ] **Phase 4: Redirects and Release Gate** - Project safe legacy redirects and verify the complete static release artifact.

## Phase Details

### Phase 1: Canonical FAQ Routes
**Goal**: Every English FAQ currently in the repository is reachable at one safe canonical URL, with healthy public URLs preserved.
**Mode:** mvp
**Depends on**: Nothing (first phase)
**Requirements**: URL-01, URL-02, URL-03
**Success Criteria** (what must be TRUE):
  1. A visitor can reach every current English FAQ record through one safe, unique canonical URL.
  2. A visitor using a healthy existing English FAQ URL reaches the same intended FAQ page at that public URL.
  3. A visitor can reach every in-scope FAQ with a missing or unsafe route through its deterministic repaired canonical URL and see the intended content.
**Plans**: TBD
**UI hint**: yes

### Phase 2: Approved Metadata
**Goal**: The approved Week04 metadata is reproducibly applied to its matching English FAQ pages while authored content stays intact.
**Mode:** mvp
**Depends on**: Phase 1
**Requirements**: META-01, META-02, META-03
**Success Criteria** (what must be TRUE):
  1. A maintainer can regenerate committed metadata from the approved workbook, with exactly 1,195 unique mapped rows and clear failures for duplicate or unmapped rows.
  2. A visitor to each mapped FAQ page sees its approved title with exactly one ` - FastGPT` suffix, approved description, and approved keywords.
  3. Each imported FAQ page continues to present its existing question, answer, and category verbatim.
**Plans**: TBD
**UI hint**: yes

### Phase 3: Coherent SEO Graph
**Goal**: Every final FAQ page and discovery surface consistently represents the same canonical FAQ identity.
**Mode:** mvp
**Depends on**: Phase 2
**Requirements**: SEO-01, SEO-02, SEO-03
**Success Criteria** (what must be TRUE):
  1. A visitor and search crawler see an H1 and FAQ JSON-LD question that identify the intended FAQ record on every final page.
  2. Every final FAQ page provides its self-referencing canonical URL and valid published `en`, `zh-CN`, and `x-default` alternates.
  3. FAQ lists, related links, static routes, and the sitemap use final canonical slugs; the sitemap contains each canonical FAQ URL once and contains no legacy alias.
**Plans**: TBD
**UI hint**: yes

### Phase 4: Redirects and Release Gate
**Goal**: Legacy URL migration and the complete static SEO surface are verified as release-ready.
**Mode:** mvp
**Depends on**: Phase 3
**Requirements**: URL-04, VERIFY-01, VERIFY-02, VERIFY-03
**Success Criteria** (what must be TRUE):
  1. A visitor using any changed legacy path with one valid destination receives a one-hop permanent redirect to its canonical page, while ambiguous collision paths retain no guessed redirect.
  2. A maintainer can run one repository command that reports record-level workbook coverage, metadata fidelity, URL stability, slug uniqueness, redirect integrity, route identity, and SEO-graph alignment.
  3. The production build completes with every final in-scope English FAQ route in the static export.
  4. Exported FAQ HTML demonstrates the intended H1, approved metadata, canonical URL, and applicable hreflang values for every final route.
**Plans**: TBD
**UI hint**: yes

## Progress

**Execution Order:** Phases execute in numeric order: 1 → 2 → 3 → 4.

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Canonical FAQ Routes | 0/TBD | Not started | - |
| 2. Approved Metadata | 0/TBD | Not started | - |
| 3. Coherent SEO Graph | 0/TBD | Not started | - |
| 4. Redirects and Release Gate | 0/TBD | Not started | - |
