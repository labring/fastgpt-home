---
title: Knowledge Base Retrieval for College Admissions and Application Placement: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c052-f015
page_type: 行业问题页
application_area: education
meta_title: College Admissions | Retrieval | Review
meta_description: College Admissions: review retrieval for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for College Admissions and Application Placement: Trace Exceptions and Review Results

## What this category's data looks like

Exception tracing and manual review of admissions filing in regular higher education institutions draws on three types of materials: admissions plans, filing rules, and admission rosters. Admissions plans provide institution-major groups and planned numbers; filing rules provide filing ratios, single-subject requirements, and tie-breaking procedures; admission rosters record candidate numbers, scores, preference order, and admission conclusions. The three types of materials are updated according to batch milestones, and fields include names, quantities, dates, and signature columns. The same record often appears in different materials with inconsistent name spellings, quantity definitions, and date milestones, and versions and receipts are also prone to being missing. When entering knowledge base retrieval and recall, admissions plans and filing rules are recalled as the basis for determination, while admission rosters are recalled as the objects being verified; together, the three support the generation of exception lists and review conclusions.

## Configuration and implementation checks

This step is performed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The "exception list and review conclusions" are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Admissions plan materials | Whether the institution-major group names, planned quantities, batch dates, and signature columns match the admission roster | In the search test, use the major group names and quantities from the plan as the query, and check whether the returned candidates' `similarity` scores and snippets point to the same record |
| Filing rule materials | Whether the versions and effective dates of filing ratios, single-subject requirements, and tie-breaking clauses are synchronized | Switch `searchMode` to semantic, full-text, and hybrid and test each once, see whether candidates contain both rule clauses and roster records, and record the number of candidates |
| Admission roster materials | Whether the names and dates of candidate numbers, scores, preference order, and admission conclusions are consistent with the plan and rules | Compare the ranking of the top few results before and after enabling `usingReRank`, and check whether the roster snippets retain the original key fields and signature receipts |
| Exception records and review conclusions | Whether the exception is supported by original records, whether the reviewer has signed, and whether it has been handed over to the responsible person for handling | Record the number of items in the citation array according to `limit`, separately check the tokens budget of the cited text, and confirm that the exception can be traced back to the source materials |

## Three common errors
- Phenomenon: The same candidate's major group name is written differently in the admission roster and the admissions plan. Cause: The two materials are entered at different stages, the name definitions are not unified, and after a retrieval hit, the original record must be checked.
- Phenomenon: The filing rule version is not synchronized, and old ratio clauses are still recalled. Cause: The material update rhythms are inconsistent, the effective dates of rule clauses and batch milestones are misaligned, and the candidate score is high but not applicable.
- Phenomenon: The exception record lacks the reviewer's signature or receipt and cannot be handed over to the responsible person for handling. Cause: The review step leaves no trace, the roster and conclusion lack signature column support, and the traceability chain breaks at the manual node.

## How to verify the setup

Acceptance of this function: test once each with synonym-rewritten queries, compare candidate snippets and `similarity` scores, then toggle `usingReRank` on and off to observe changes in the ranking of the top few results, and record the number of candidates and the tokens of the cited text.

Business test: create an exception record, see whether it can be traced back to the source materials, and confirm that the exception is supported by original records and, after the reviewer signs, is handed over to the responsible person for handling.

- In the search test, for the same exception record, retrieve separately using field queries from the admissions plan, filing rules, and admission roster, check whether the candidates point to the same record, and record `similarity` and the number of candidates.
- Compare the ranking of the top few results with `usingReRank` enabled and disabled, and check whether the number of items in the citation array and the tokens of the cited text under the `searchMode` and `limit` settings meet review needs.
