---
title: Knowledge Base Retrieval for Vocational School Student Internships: Track Progress and Check Statistics
slug: /en/industry/education-d006-c030-f015
page_type: 行业问题页
application_area: education
meta_title: Student Internships | Retrieval | Progress
meta_description: Student Internships: review retrieval for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Vocational School Student Internships: Track Progress and Check Statistics

## What this category's data looks like

This page addresses progress records and statistical verification in vocational school student internship management. The source materials are internship agreements, internship plans, and internship logs, with an update cadence summarized weekly or monthly. Field characteristics include student name, internship organization, position name, start and end dates, signatures, and receipts. The three types of materials play different roles when entering knowledge base retrieval and recall: internship agreements provide the baseline fields for organization and position, internship plans provide phase tasks and time nodes, and internship logs provide daily records and signature status. During retrieval, the fields, dates, and signatures of agreements, plans, and logs need to be aligned, identifying differences in names, quantities, and dates for the same record across different materials, as well as situations such as versions not being synchronized, missing signatures or receipts, so as to provide candidate snippets and similarity scores for subsequent nodes or manual generation of progress tables and statistical scope statements.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after pattern, merge, re-rank, filter, and upper-limit trimming). The "progress table and statistical scope statement" is completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Internship agreement | Whether the fields, dates, and signatures match the plan and logs | In the search test, search using the organization and position names in the agreement, and check whether the candidate snippets under `searchMode` cover the agreement fields and signature page |
| Internship plan | Whether the phase tasks and time nodes are consistent with the daily records in the logs | Switch `searchMode` to compare semantic and full-text candidates, and check whether the start and end dates in the plan and the log dates are in the same candidate set |
| Internship log | Whether the names, quantities, dates, and signature receipts of daily records are complete | Compare the top few rankings before and after enabling `usingReRank`, record the number of candidates and scores, and separately record the number of citations |
| Statistical scope statement | Whether the header states the aggregate scope and exceptions for the number of records and the number of statistics | Use one week of records to verify the total, check whether the candidate snippets retain the key snippets of the original text, and verify the cited text tokens against the citation upper limit |

## Three common errors

- Symptom: The organization name or position name for the same student does not match between the agreement and the log. Cause: The two materials' versions are not synchronized, or the field scope was not unified during data entry.
- Symptom: The start and end dates in the internship plan are inconsistent with the daily dates in the log. Cause: The log was not written back after the plan was adjusted, or the plan version was not checked when the log was supplemented.
- Symptom: The log lacks a signature or receipt but is included in the total during statistics. Cause: Signature status was not included in field verification, or the receipt was not updated in sync with the log.

## How to verify the setup

Acceptance of this feature: test once each with synonym-rewritten questions, compare candidates and scores, then toggle re-ranking to observe the top few rankings; at the same time, record the number of candidates and scores, and separately record the number of citations.

Business test: use one week of records to verify the total, see whether the scope and exceptions are clearly stated, and check whether the header states the aggregation rules for the number of records and the number of statistics.

- In the knowledge base search test, switch `searchMode` to compare candidate snippets and scores under the semantic, full-text, and hybrid modes, and record the number of candidates.
- Enable and disable `usingReRank`, compare changes in the top few rankings, and check the impact of `similarity` and `limit` on the number of candidates and cited text tokens.
