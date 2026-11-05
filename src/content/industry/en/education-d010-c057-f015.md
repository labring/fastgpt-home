---
title: Knowledge Base Retrieval for National Key Research and Development Applications: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c057-f015
page_type: 行业问题页
application_area: education
meta_title: National R&D Grants | Retrieval | Operations
meta_description: National R&D Grants: review retrieval for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for National Key Research and Development Applications: Coordinate Operations and Application Handover

## What this category's data looks like

This category covers the deployment, operations, and application handover of National Key R&D Program project applications. The materials mainly consist of project applications, budget applications, and cooperation agreements. The project application provides the research content, task breakdown, and assessment indicators; the budget application provides the funding categories, calculation basis, and annual allocation; the cooperation agreement provides the division of labor among participating units, intellectual property, and signature pages. When these three types of materials enter the knowledge base retrieval and recall function, each plays a different role: the project application serves as the source of the technical route and indicators, the budget application serves as the source of funding and dates, and the cooperation agreement serves as the source of entities and signatures. The update cadence of materials changes with application milestones and consortium negotiations, with many versions, dense dates, and frequent cross-referencing of fields. The name, quantity, and date of the same record often differ across materials, requiring item-by-item verification based on retrieval candidates and scores.

## Configuration and implementation checks

This step is performed by the knowledge base retrieval service (retrieval node and search test), which outputs candidate chunks and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The handover-ready deployment status and operation records are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Project application | Whether the fields, dates, and signatures are consistent with the budget application and cooperation agreement | In the search test, search separately by the same record name, verify the candidate chunks and similarity scores, and record the number of array entries |
| Budget application | Whether the funding categories, quantities, and annual dates match the project application | Switch `searchMode` to semantic, full-text, or hybrid, and compare whether the candidates include sources from both types of materials |
| Cooperation agreement | Whether the names of participating units, task division, and signature receipts are complete | Compare the ranking of the top few results before and after enabling `usingReRank`, and verify whether the signature pages and receipt chunks are recalled |
| Deployment status and operation records | Whether the version, connection, and task records are consistent | Verify item by item according to the handover checklist, record the number of candidates and scores, and check whether key chunks are retained after `similarity` filtering |

## Three common errors

- Symptom: The same equipment name is written differently in the project application and the budget application. Cause: The two materials are maintained separately, names and quantities are not uniformly mapped, and no item-by-item comparison is performed after retrieval hits.
- Symptom: The signature page of the cooperation agreement is missing or the receipt is not attached. Cause: Versions were not synchronized after consortium negotiations, and the old agreement version is still participating in recall in the knowledge base.
- Symptom: Task dates differ by several days between the two materials. Cause: After the application milestone was adjusted, only one place was updated while the other retained the old date, and similar retrieval scores led to confusion.

## How to verify the setup

This feature's acceptance: test once each with synonym-rewritten questions, compare candidate chunks and similarity scores, then toggle rerank on and off to observe the ranking of the top few results; switch `searchMode` and `usingReRank`, record the number of candidates and scores, check the tokens of the quoted text after `similarity` filtering, and record the number of array entries separately.

Business test: verify item by item once according to the handover checklist to see which record is missing; check whether the version, connection, and task records are consistent, and if any item is missing, supplement or roll back.

- In the search test, fix the same question, switch respectively to semantic, full-text, and hybrid modes, record the number of candidates and similarity scores, and verify whether the candidates come from different recall channels and have been merged.
- Take the top few results before and after enabling rerank, compare the order changes; check whether the key chunks of the original text are still retained after similarity filtering and reference limit trimming, and record the quoted text tokens and the number of array entries separately.
