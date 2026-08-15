# Requirements: FastGPT English FAQ SEO Repair

**Defined:** 2026-08-15
**Core Value:** Every in-scope English FAQ has a stable, reachable canonical URL and renders its approved metadata without disrupting healthy indexed URLs.

## v1 Requirements

Requirements for the release-ready repair milestone. Each requirement maps to exactly one roadmap phase.

### Metadata Import

- [x] **META-01**: A maintainer can regenerate the committed metadata data from the approved Week04 workbook, consuming exactly 1,195 unique rows and failing on duplicate or unmapped rows.
- [x] **META-02**: Each of the 1,195 mapped English FAQ pages renders the approved title with exactly one ` - FastGPT` suffix, the approved description, and the approved keywords.
- [x] **META-03**: Importing approved metadata preserves every in-scope FAQ question, answer, and category verbatim.

### FAQ Identity and URLs

- [x] **URL-01**: Every English FAQ record currently present in the repository has one stable identity and one safe, unique canonical slug.
- [x] **URL-02**: Every current FAQ route that returns the intended record keeps its existing public URL.
- [x] **URL-03**: Every in-scope record with a missing or unsafe route receives a deterministic repaired slug that resolves to its intended FAQ page.
- [ ] **URL-04**: Every changed legacy path with one valid destination redirects permanently to that canonical page in one hop, while ambiguous collision paths remain without a guessed redirect.

### SEO Surface

- [ ] **SEO-01**: Every final FAQ page renders an H1 and FAQ JSON-LD question that match the intended record identity.
- [ ] **SEO-02**: Every final FAQ page emits a self-referencing canonical URL and valid `en`, `zh-CN`, and `x-default` alternates for published counterpart routes.
- [ ] **SEO-03**: FAQ list links, related links, static parameters, sitemap entries, and redirect targets all use the same final slug mapping; the sitemap contains each canonical FAQ URL once and excludes legacy aliases.

### Release Verification

- [ ] **VERIFY-01**: A single repository command validates workbook coverage, exact metadata, preserved URL stability, final-slug uniqueness, redirect integrity, route identity, and SEO-surface alignment with record-level failures.
- [ ] **VERIFY-02**: The production build succeeds with every final in-scope English FAQ route included in the static export.
- [ ] **VERIFY-03**: Exported FAQ HTML verifies the intended H1, approved metadata, canonical URL, and expected hreflang values for every applicable final route.

## v2 Requirements

Deferred capabilities tracked outside the current roadmap.

### Reporting

- **REPORT-01**: A maintainer can generate a durable record-by-record migration decision report.
- **REPORT-02**: A maintainer can compare a future approved workbook revision with committed metadata and view an idempotent drift report.

### Historical Recovery

- **HIST-01**: A maintainer can restore historical FAQ records after receiving an authoritative source containing their missing answer bodies.

## Out of Scope

| Feature | Reason |
|---------|--------|
| Recovering the full historical 1,990-question catalog | The current repository lacks authoritative answer bodies for roughly 590 questions, and the user limited this milestone to current records. |
| Rewriting FAQ questions, answers, or categories | This milestone isolates metadata and routing repairs while preserving authored content. |
| Full-catalog slug normalization | Incremental repair preserves healthy indexed URLs and limits migration risk. |
| Guessed redirects for ambiguous historical collision paths | One shared old path cannot identify multiple destinations safely. |
| Production deployment and live crawl monitoring | The approved delivery endpoint is verified, release-ready code. |

## Definition of Done

- All v1 requirements pass the runnable FAQ SEO repair verifier.
- The production static export completes successfully.
- Existing authored FAQ content remains byte-for-byte equivalent for question, answer, and category fields.
- Every preserved or repaired in-scope route has coherent page identity and SEO output.
- All implementation and verification changes are committed.

## Traceability

Roadmap creation assigns each v1 requirement to exactly one phase.

| Requirement | Phase | Status |
|-------------|-------|--------|
| META-01 | Phase 2 | Complete |
| META-02 | Phase 2 | Complete |
| META-03 | Phase 2 | Complete |
| URL-01 | Phase 1 | Complete |
| URL-02 | Phase 1 | Complete |
| URL-03 | Phase 1 | Complete |
| URL-04 | Phase 4 | Pending |
| SEO-01 | Phase 3 | Pending |
| SEO-02 | Phase 3 | Pending |
| SEO-03 | Phase 3 | Pending |
| VERIFY-01 | Phase 4 | Pending |
| VERIFY-02 | Phase 4 | Pending |
| VERIFY-03 | Phase 4 | Pending |

**Coverage:**

- v1 requirements: 13 total
- Mapped to phases: 13
- Unmapped: 0

---
*Requirements defined: 2026-08-15*
*Last updated: 2026-08-15 after initial definition*
