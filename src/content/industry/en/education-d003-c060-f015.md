---
title: Knowledge Base Retrieval for Research Project Annual Progress and Acceptance: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c060-f015
page_type: 行业问题页
application_area: education
meta_title: Research Progress | Retrieval | Intake
meta_description: Research Progress: review retrieval for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Research Project Annual Progress and Acceptance: Handle Questions and Collect Missing Information

## What this category's data looks like

The annual progress and acceptance scenario for research projects involves three types of materials: annual progress reports, mid-term review materials, and acceptance reports. Annual progress reports are updated on an annual cycle and contain fields such as task completion status, funding execution, and stage results; mid-term review materials are submitted midway through project execution and contain indicator achievement, personnel input, and signature fields; acceptance reports are formed at the end of the project and contain final indicators, funding final accounts, acceptance opinions, and signed receipts. When these three types of materials enter the knowledge base retrieval and recall function, they serve as sources of candidate snippets respectively: annual progress reports provide stage tasks and date fields, mid-term review materials provide indicators and signature status, and acceptance reports provide final conclusions and receipt information. Common problems among the materials include inconsistent names, quantities, and dates for the same record, unsynchronized versions, and missing signatures or receipts. During the retrieval stage, relevant snippets must first be recalled, and then handed off to subsequent nodes or humans for comparison and follow-up questions.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after pattern, merge, rerank, filter, and limit truncation). Intake records and the completed follow-up items are then handled by subsequent nodes or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| Annual progress report | Contains task name, quantity, date, and signature fields, and must be compared item by item with the mid-term review materials | In the search test, switch `searchMode` to semantic, full-text, or hybrid, check whether the candidate snippets cover the name, quantity, and date fields, and record the number of candidates and scores |
| Mid-term review materials | Contains indicator achievement, personnel input, and signature fields, and the version must be checked for synchronization with the annual progress report | Search the indicator and signature fields with synonymous questions, compare the ranking of the top few items before and after enabling `usingReRank`, and confirm whether the signature and receipt snippets are recalled |
| Acceptance report | Contains final indicators, funding final accounts, acceptance opinions, and signed receipts, and the dates and quantities must be checked for consistency with the other two materials | Adjust `similarity` to observe changes in the number of candidates and scores, check whether the quoted text still retains key fields after `limit` truncation, and record the array count separately |

## Three common errors

- Symptom: The name and quantity of the same record do not match between the annual progress report and the acceptance report. Cause: The versions of the two materials are not synchronized, and the candidate snippets recalled by retrieval come from different versions.
- Symptom: The mid-term review materials lack a signature or receipt, and no answer can be given even after follow-up questions. Cause: The signature field snippet was not recalled or was truncated during similarity filtering.
- Symptom: There are many candidates, but the ones ranked at the top are all irrelevant, and the answer lacks key paragraphs. Cause: Rerank was not enabled, or the retrieval mode does not match the material form.

## How to verify the setup

Acceptance of this function: test once each with synonymously rewritten questions, compare candidate snippets and similarity scores, then toggle rerank on and off to inspect the ranking of the top few items; check the effects of `searchMode`, `usingReRank`, `similarity`, and `limit`, record the number of quoted items separately, and check the tokens of the quoted text separately.

Business test: ask a question that lacks key information, and see whether it asks a follow-up question before answering, and whether the follow-up item falls on the name, quantity, date, signature, or receipt.

- In the knowledge base search test, search the annual progress report, mid-term review materials, and acceptance report respectively with synonymous questions, record the number of candidates and scores, and compare the ranking before and after toggling rerank.
- Check whether the quoted text retains the name, quantity, date, signature, or receipt snippets; record the number of quoted items and the tokens of the quoted text separately, and do not write index status values.
