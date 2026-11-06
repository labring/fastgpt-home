---
title: Vector Models and Indexes for National Key Research and Development Applications: Find Supporting Evidence
slug: /en/industry/education-d001-c057-f004
page_type: 行业问题页
application_area: education
meta_title: National R&D Grants | Vector Indexes | Evidence
meta_description: National R&D Grants: review vector indexes for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Vector Models and Indexes for National Key Research and Development Applications: Find Supporting Evidence

## What this category's data looks like

In the National Key R&D Program project application scenario, the materials are mainly project applications, budget applications, and cooperation agreements, supplemented by signature pages and receipts. The sources are the official application notices for each special program and internal finalized versions, and the update cadence rolls with application batches and budget adjustments. The field characteristics center on project name, undertaking unit, project number, budget subject, amount, start and end dates, and signature and seal positions. When entering the vector model and index function, the project application carries the basis for tasks and assessment indicators, the budget application carries the basis for funding and subjects, and the cooperation agreement carries the basis for division of labor and supporting contributions; the three are split separately and written into data rows, and the index field records the corresponding multiple vector identifiers. During retrieval, vectors are first recalled and then merged back into the original data by identifier, and the highest score is taken for the same group of data. The material version and signature status determine whether the basis can point back to the current original text.

## Configuration and implementation checks

This step is executed by the index service and the vector database, and outputs vectors and index status (whether recall is possible and whether the same group of data is merged). "Basis entries that can point back to the original text" are then completed by subsequent AI nodes, code nodes, or manual work (retrieval and citation trimming only take supporting materials). The index model must be consistent with the vector model actually used by the knowledge base, and the index field of a data row must retain the multiple vector identifiers of one piece of data.

| Object | Check | Verification action |
| --- | --- | --- |
| Project application | The basis comes from the institution’s materials and the version is current; the fields include project name, project number, start and end dates, and signature page; the name, quantity, and dates must match those in the budget application and cooperation agreement | Open a project application data row and check whether the index field contains multiple vector identifiers, run a retrieval to see whether the same group is merged, and check the signature and receipt |
| Budget application | The basis comes from the institution’s materials and the version is current; the budget subjects, amounts, and corresponding records in the project application and cooperation agreement must be consistent | In the knowledge base settings, check that the index model is consistent with the vector model actually used by the knowledge base; after changing the model, trigger rebuild only for data that has already been indexed, and view the data scope covered by the rebuild task |
| Cooperation agreement | The basis comes from the institution’s materials and the version is current; the undertaking unit, division of labor, and supporting fields must match those in the project application and budget application, and the signature and receipt must be complete | Open a cooperation agreement data row and check the index field, run a cross-material question retrieval to see whether recalled vectors are merged back into the original data by identifier, and whether the highest score is taken for the same group of data |
| Data row index field | Multiple vector identifiers of one piece of data are all present, the status is indexed, and the rebuild task record is queryable | View the data scope covered by the rebuild task record, check the values of `limit` in the citation text budget, and record the citation count separately |

## Three common errors

- Symptom: duplicate entries appear in retrieval results. Inspect the following: the name, quantity, or dates of the same record do not match between the project application and the budget application, or the index field does not merge the same group of data.
- Symptom: recall quality drops after changing the model. Inspect the following: the version is not synchronized, rebuild is triggered only for data that has already been indexed, and the old index model is inconsistent with the current materials.
- Symptom: a data row has content but cannot be retrieved. Inspect the following: missing signature or receipt leaves the material unfinalized, the index field does not record the corresponding vector identifier, or the status is still indexing.

## How to verify the setup

This function's acceptance: sample a data row and look at the index field, check whether multiple vector identifiers of one piece of data are all present and whether the status is indexed, then run a retrieval to see whether the same group of data is merged and whether the vector score takes the highest score; after changing the model, trigger rebuild only for data that has already been indexed, and view the data scope covered by the rebuild task record.

Business test: ask a cross-material basis question and see whether the answer gives a traceable source, whether the basis comes from the institution’s materials, whether the version is current, whether the entries match the original text, and check that the tokens and array count of the citation text are recorded separately.

- In the knowledge base settings, check that the index model is consistent with the vector model actually used by the knowledge base, and open a data row to check whether the index field contains multiple vector identifiers.
- Run a retrieval to see whether the same group of data is merged and whether the vector score takes the highest score, and view the data scope covered by the rebuild task record and whether the status is indexed.
