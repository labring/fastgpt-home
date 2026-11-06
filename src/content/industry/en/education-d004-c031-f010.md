---
title: Citations and Source Traceability for Modern Apprenticeships and Employer-Sponsored Classes: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c031-f010
page_type: 行业问题页
application_area: education
meta_title: Apprenticeships | Citations | Handover
meta_description: Apprenticeships: review citations for material handover. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Modern Apprenticeships and Employer-Sponsored Classes: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This category's data involves three core types of materials: school-enterprise cooperation agreements, order class training plans, and mentor apprenticeship records. School-enterprise cooperation agreements state the cooperating entities, training positions, term, and signatures/seals; order class training plans state course modules, credit-hour allocation, assessment methods, and signatures of both parties; mentor apprenticeship records state the mentoring master, apprentice name, position rotation, dates, and receipts. In the material drafting and responsibility handover stages, the three types of materials respectively serve as the basis for authorization, the basis for training execution, and the basis for process traceability; after entering the knowledge base retrieval node, they are split, vectorized, and output as citation sources. In terms of update cadence, agreements are revised by academic year or cooperation cycle, training plans are synchronized with course adjustments, and apprenticeship records are registered weekly or monthly. Field characteristics are concentrated in names, quantities, dates, version numbers, signatures, and receipts; if any field is inconsistent between two materials, the handover sign-off will be blocked.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each item containing the original text fragment and source identifier, and the length can be 0. Even if no content is retrieved, the output chain will still run through. The "issuable material drafts and handover records" are completed by subsequent AI nodes, code nodes, or manual work, and are used to compare fields, write ledgers, and generate reports.

| Object | Check | Verification action |
| --- | --- | --- |
| School-enterprise cooperation agreement | Check whether the cooperating entities, training positions, term, signature/seal, and receipt fields are complete, and whether the dates and version numbers are consistent | In the citation array, trace each item back to the original agreement paragraph, and compare against the signature page and receipt page |
| Order class training plan | Check whether the course modules, credit-hour allocation, assessment methods, signatures of both parties, and version date are consistent with the agreement | Open the citation markers and compare the names, quantities, and dates in the original plan text with those in the agreement |
| Mentor apprenticeship record | Check whether the mentoring master, apprentice name, position rotation, dates, and receipts are registered item by item and aligned with the training plan | Use `quoteList` to view the matched fragments and confirm that each citation can be traced back to the original apprenticeship record text |
| Knowledge base retrieval node | Check that the selected knowledge bases belong to the same vector model, that the number of citations matches the hit materials, and that being empty is also normal | Run a test with a question that has no matching materials, confirm that the output is empty while the chain continues, and check `quoteMaxToken` and `responseData` (non-streaming module results returned with detailed output enabled) |

## Three common errors

- Symptom: The names, quantities, and dates of the same record do not match between the agreement and the training plan. Cause: During drafting, each side referenced old-version fields and did not use the same version as the baseline for cross-checking.
- Symptom: The training plan has been revised, but apprenticeship records are still registered according to the old version. Cause: The versions were not synchronized, and the version number and effective date were not checked during handover.
- Symptom: The agreement or apprenticeship record lacks signatures or receipts, but the handover is still released. Cause: Field completeness was not blocked during the drafting stage, and item-by-item comparison was not performed before sign-off.

## How to verify the setup

Acceptance of this feature: ask a question with original-text support and check whether the citation array and markers can be traced back to the original text; then ask a question with no matching materials and confirm that the array is empty while the chain runs through.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- Open the citation markers, compare item by item against the source documents, confirm that the cited fragments are consistent with the original text, and record the number of array items.
- Run a test with a question that has no matching materials, confirm that the output is empty while the chain continues, and check `quoteMaxToken` and `responseData`.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
