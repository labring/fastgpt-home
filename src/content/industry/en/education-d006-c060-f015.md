---
title: Knowledge Base Retrieval for Research Project Annual Progress and Acceptance: Track Progress and Check Statistics
slug: /en/industry/education-d006-c060-f015
page_type: 行业问题页
application_area: education
meta_title: Research Progress | Retrieval | Progress
meta_description: Research Progress: review retrieval for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Research Project Annual Progress and Acceptance: Track Progress and Check Statistics

## What this category's data looks like

Annual progress and acceptance materials for research projects include annual progress reports, mid-term review materials, and acceptance reports. Sources are project team submissions and management department consolidation. Update cadence is quarterly supplementary entry, annual finalization, and centralized verification before mid-term and acceptance. Field characteristics are project name, responsible person, start and end dates, funding amount, task completion volume, signatures, and receipts. Annual progress reports focus on phase tasks and budget execution, mid-term review materials focus on milestones and deviation explanations, and acceptance reports focus on results lists and conclusions. When these three types of materials enter knowledge base retrieval and recall, each is indexed as an independent fragment, for subsequent nodes or humans to retrieve the original textual basis when verifying names, quantities, dates, and signatures.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after mode, merge, rerank, filter, and limit trimming). The progress table and statistical scope description are then completed by subsequent nodes or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| Annual progress report | Align item by item with mid-term review materials and acceptance report on project name, task quantity, start and end dates, and signature fields | In the search test, search once by project name and once by task name, record the number of candidates and scores, and check whether the corresponding fields of the three materials are consistent |
| Mid-term review materials | Milestone dates and deviation explanations must be synchronized with the versions of the annual progress report and acceptance report | Switch `searchMode` to semantic, full-text, and hybrid, compare whether candidates simultaneously contain semantic and full-text results, then enable `usingReRank` to see changes in the ranking of the top few results |
| Acceptance report | Results list, funding amount, and signature receipts must be consistent with the scope of the annual progress report and mid-term review materials | Search by results name, view the key original fragments retained after `similarity` filtering, record the array count separately, and check whether the tokens of the quoted text are within the `limit` and `quoteMaxToken` budgets |
| Progress table and statistical scope description | The header states the statistical scope and exceptions, and the recorded count matches the statistical count | Use one week of records to verify the total, compare item by item the names, quantities, dates, and signature receipts in the candidate fragments, and confirm that the scope and exceptions are clearly stated |

## Three common errors

- Phenomenon: The name and quantity of the same record do not match between the annual progress report and the acceptance report. Cause: The reporting scopes in the two places are not unified, and retrieval candidates have not been field-aligned.
- Phenomenon: The version of the mid-term review materials is not synchronized, and dates and signature fields are missing. Cause: The revised draft was not returned, and the retrieved hits are still old fragments.
- Phenomenon: There are many candidates but the top-ranked ones are irrelevant, and the answer lacks key paragraphs. Cause: Rerank is not enabled, or similarity filtering and quote limit trimming are too tight.

## How to verify the setup

Acceptance of this feature: Test once each with synonym-rewritten questions, compare candidates and `similarity` scores, then toggle `usingReRank` to see the ranking of the top few results; switch `searchMode` and record the number of candidates, and check `limit` and the tokens of the quoted text.

Business test: Use one week of records to verify the total, and see whether the scope and exceptions are clearly stated.

- In the knowledge base search test, switch `searchMode`, compare the candidate results among semantic, full-text, and hybrid, and record the number of candidates and scores.
- Compare the order of the top few results before and after enabling `usingReRank`, and view the tokens of the quoted text after `similarity` filtering and `limit` trimming; record the array count separately.
