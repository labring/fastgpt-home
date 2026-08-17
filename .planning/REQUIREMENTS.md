# Requirements: FastGPT SEO Content Publishing

**Defined:** 2026-08-17
**Core Value:** Every in-scope SEO page has one stable canonical URL, renders its approved localized content and metadata, and is proven release-safe.

## v1.1 Requirements

Requirements for the Guide Content Center production milestone. Each requirement maps to exactly one roadmap phase.

### Guide Content Contract

- [ ] **GUIDE-01**: A maintainer can enumerate exactly eight unique Guide slugs, each backed by one approved Chinese document and one approved English document from the Week04 source package.
- [ ] **GUIDE-02**: A maintainer can build a publishable body for each Guide document by removing exactly one leading delivery-metadata comment while preserving the approved article body after newline normalization.
- [ ] **GUIDE-03**: A maintainer receives a slug-specific build failure for any duplicate slug, incomplete locale pair, metadata mismatch, invalid schema type, missing required approved asset, or unresolved configured internal link.

### Guide Visitor Experience

- [ ] **HUB-01**: A visitor can open `/guide` on `fastgpt.cn` and `fastgpt.io` and see exactly eight localized article cards grouped as decision, implementation, and industry content.
- [ ] **ARTICLE-01**: A visitor can open every owned-domain `/guide/<slug>` URL and read the approved localized H1 and complete long-form body, including headings, lists, tables, and code where authored.
- [ ] **ARTICLE-02**: A visitor can navigate from each Guide article through its Home → Guide → article breadcrumb, return to the localized Guide hub, and follow every configured internal link to its owned canonical destination.
- [ ] **ARTICLE-03**: A visitor sees each required approved article image through the existing responsive image surface with authored alternative text.

### Guide SEO Surface

- [ ] **SEO-04**: Each Guide hub and article emits localized title and description metadata, one self-referencing owned-domain canonical URL, and an Open Graph URL equal to that canonical URL.
- [ ] **SEO-05**: Each Guide hub and article emits a reciprocal `zh-CN`, `en`, and `x-default` alternate cluster whose Chinese target belongs to `fastgpt.cn`, whose English and `x-default` targets belong to `fastgpt.io`, and whose article targets share the same slug.
- [ ] **SEO-06**: Each Guide article emits approved article and breadcrumb structured data, while each Guide hub emits collection, item-list, and breadcrumb structured data using owned canonical URLs.
- [ ] **SEO-07**: Each site variant's sitemap contains its owned Guide hub and eight owned article canonical URLs exactly once, and every Guide card, breadcrumb, related link, static parameter, and schema URL derives from the same Guide registry.

### Release Verification

- [ ] **VERIFY-04**: A maintainer can run one repository command that validates the Guide pair registry, source fidelity, metadata, required assets, internal links, route inventory, SEO graph, sitemap coverage, and exported HTML with slug-specific failures.
- [ ] **VERIFY-05**: Clean case-sensitive production builds for the cn and io variants each succeed with exactly one owned Guide hub and eight owned Guide article paths while preserving the existing initial-JavaScript release budget.

### Production Delivery

- [ ] **DEPLOY-01**: A release operator can deploy the verified immutable cn and io artifacts to `fastgpt.cn` and `fastgpt.io` with recorded artifact revisions and rollback targets.
- [ ] **DEPLOY-02**: A release operator can verify both production Guide hubs and all 16 production article URLs for final `200` responses, localized H1, self canonical, reciprocal alternates, indexability, sitemap presence, cache freshness, and deployed revision evidence.

## Future Requirements

Capabilities tracked for later milestones.

### Guide Enhancements

- **ARTICLE-04**: A visitor can move directly from a Guide article to its same-slug language counterpart.
- **HUB-02**: A visitor can search or filter the Guide hub after the article corpus grows beyond the fixed launch set.
- **REPORT-03**: A maintainer can generate a durable registry-derived publishing report containing the complete locale, source, asset, URL, and validation matrix.
- **CMS-01**: An editor can author, preview, review, and publish recurring Guide batches through a governed content workflow.

## Out of Scope

| Feature | Reason |
|---------|--------|
| Machine translation, article rewriting, or regenerated metadata | The supplied Chinese and English documents are the approved content authority for this milestone. |
| Additional Guide articles or taxonomy expansion | v1.1 publishes the fixed Week04 8×2 corpus. |
| Programmatic technical/reference pages | This is an independent publishing inventory with separate demand and duplication gates. |
| FAQ expansion or further FAQ migration | The v1.0 FAQ milestone is complete and archived. |
| First-party lead form delivery | This is an independent conversion and CRM integration milestone. |
| Client-side Guide sorting, pagination, or catalog state | Eight fixed articles remain fully discoverable through three server-rendered groups. |

## Definition of Done

- All v1.1 requirements pass the runnable Guide release verifier.
- Clean cn and io production static exports each contain one localized Guide hub and eight localized article pages.
- All approved article bodies remain faithful after the delivery-comment boundary is removed.
- Both production Guide hubs and all 16 production article URLs pass the recorded live verification matrix.
- Verified immutable artifacts, deployment revisions, rollback targets, and live evidence are recorded.
- All implementation, verification, and planning changes are committed.

## Traceability

Roadmap creation assigns each v1.1 requirement to exactly one phase.

| Requirement | Phase | Status |
|-------------|-------|--------|
| GUIDE-01 | Phase 5 | Pending |
| GUIDE-02 | Phase 5 | Pending |
| GUIDE-03 | Phase 5 | Pending |
| HUB-01 | Phase 6 | Pending |
| ARTICLE-01 | Phase 6 | Pending |
| ARTICLE-02 | Phase 6 | Pending |
| ARTICLE-03 | Phase 6 | Pending |
| SEO-04 | Phase 6 | Pending |
| SEO-05 | Phase 6 | Pending |
| SEO-06 | Phase 6 | Pending |
| SEO-07 | Phase 6 | Pending |
| VERIFY-04 | Phase 7 | Pending |
| VERIFY-05 | Phase 7 | Pending |
| DEPLOY-01 | Phase 8 | Pending |
| DEPLOY-02 | Phase 8 | Pending |

**Coverage:**

- v1.1 requirements: 15 total
- Mapped to phases: 15
- Unmapped: 0

---
*Requirements defined: 2026-08-17*
*Last updated: 2026-08-17 after v1.1 roadmap creation*
