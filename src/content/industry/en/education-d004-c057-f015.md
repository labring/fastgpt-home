---
title: Knowledge Base Retrieval for National Key Research and Development Applications: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c057-f015
page_type: 行业问题页
application_area: education
meta_title: National R&D Grants | Retrieval | Handover
meta_description: National R&D Grants: review retrieval for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for National Key Research and Development Applications: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

National Key R&D Program project applications involve three types of materials: the project application form, the budget application form, and the cooperation agreement. Their sources are the application guidelines, the unit's internal master data, and historical project approval archives. The update cadence rolls with the special program batches, and the field characteristics center on project name, equipment quantity, funding amount, start and end dates, signatures, and receipts. When entering the knowledge base retrieval service, the project application form serves as the text source for the technical route and assessment indicators, the budget application form serves as the text source for budget subjects and calculation bases, and the cooperation agreement serves as the text source for division of labor, intellectual property ownership, and supporting commitments. Together, the three form a candidate snippet pool for subsequent nodes or manual extraction and drafting of issuable materials.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after mode, merge, re-rank, filter, and upper-limit trimming). The issuable material drafts and handover records are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Project application form | The project name, assessment indicators, and start and end dates must be item-by-item consistent with the budget application form and the cooperation agreement, and the signature field and version number must be synchronized | In the search test, run one retrieval each with synonymous questions, record the number of candidates and the similarity scores, and check the name and date fields of the three materials |
| Budget application form | The budget subjects, equipment quantity, and calculation basis must match the project application form, and the same record must not show inconsistent quantities | Switch `searchMode` among semantic, full-text, or hybrid, and compare whether the candidates cover both the subject names and the calculation paragraphs |
| Cooperation agreement | The division-of-labor clauses, intellectual property ownership, and supporting commitments must be consistent with the application form, and versions lacking signatures or receipts must not enter handover | Compare the order of the top few candidates before and after enabling `usingReRank`, and after filtering by `similarity`, record the number of citations under `limit` trimming |
| Handover record | The responsible person, version number, date, and signed receipt must all be present, and missing items must be blocked | Draft one according to the template and complete one handover, then check that the fields are complete and the responsible person is clear |

## Three common errors

- Symptom: the same equipment name is written differently in the project application form and the budget application form. Cause: the field definitions were not unified during drafting, and the retrieval candidates each took one version without cross-checking.
- Symptom: the cooperation agreement version was not synchronized, and an old division-of-labor clause was cited. Cause: the knowledge base update cadence is out of step with the material issuance cadence, and candidates were not filtered by date.
- Symptom: a handover record still entered the next stage despite missing a signature or receipt. Cause: retrieval only returns candidate snippets and scores, does not perform field-completeness determination, and no item-by-item verification was done before manual receipt.

## How to verify the setup

This feature's acceptance: test once each with synonymously rewritten questions, compare the candidates and similarity scores, then toggle re-ranking to observe the order of the top few, and record the number of candidates under `searchMode`, `limit`, and `usingReRank`.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- In the knowledge base search test, run one retrieval each with synonymous questions, record the number of candidates and the similarity scores, and check whether the name, quantity, and date fields of the project application form, budget application form, and cooperation agreement are consistent.
- Run once with re-ranking enabled and once disabled, compare the order of the top few candidates; after filtering by `similarity`, separately record the number of items in the citation array, and when a citation upper limit is involved, check the tokens of the cited text rather than comparing it for equality with the item count.
