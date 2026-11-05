---
title: Knowledge Base Retrieval for Research Project Annual Progress and Acceptance: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c060-f015
page_type: 行业问题页
application_area: education
meta_title: Research Progress | Retrieval | Review
meta_description: Research Progress: review retrieval for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Research Project Annual Progress and Acceptance: Trace Exceptions and Review Results

## What this category's data looks like

This category's data involves three types of materials: annual progress reports, mid-term review materials, and acceptance reports. Annual progress reports are submitted at annual milestones, recording phase tasks, indicators, and budget execution; mid-term review materials are consolidated in the middle of the project cycle, checking goal deviations and adjustment explanations; acceptance reports are formed at project completion, summarizing results, indicator achievement, and signed receipts. When these three types of materials enter knowledge base retrieval and recall, each plays a different role: annual progress reports provide the phase baseline, mid-term review materials provide comparison and deviation clues, and acceptance reports provide the final conclusion and signed evidence. Material fields include project name, undertaking unit, indicator item, quantity, date, signature, and receipt. The update rhythm is annual submission, mid-term consolidation, and finalization at completion, and versions are prone to being out of sync. During retrieval, original record support must be retained to facilitate exception tracing and manual review.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The exception list and review conclusions are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Annual progress report | Project name, indicator item, quantity, date, and signature must be aligned item by item with the mid-term review materials and acceptance report | In the knowledge base search test, switch `searchMode`, search once each by the name and date of the same record, and record the number of candidates and the score |
| Mid-term review materials | If the name, quantity, and date of the same record do not match across the two materials, it must be marked as an exception pending review | Turn `usingReRank` on or off, compare the order of the top few candidates, and check whether the hit snippets contain the original date and quantity |
| Acceptance report | The signature and receipt fields must be complete; if the signature or receipt is missing, it must not directly enter the review conclusion | Check the `similarity` and cited text of the returned candidates to confirm whether the signature page and receipt page are recalled |
| Exception list and review conclusion | Exceptions must be supported by original records, and only after the reviewer signs may they be handed to the responsible person for handling | Record the number of items in the citation array according to `limit`, check the cited text tokens separately, and do not compare the two for equality |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the annual progress report and the acceptance report. Cause: The two materials are maintained separately, versions are out of sync, and retrieval hits different snippets.
- Symptom: The number of indicator items in the mid-term review materials and the acceptance report is inconsistent, and the original record cannot be found during review. Cause: After the materials were updated, they were not written back to the knowledge base, and the candidate snippets remain at the old version.
- Symptom: The acceptance report lacks a signature or receipt, yet the exception list is still advanced for handling. Cause: Retrieval only returns candidates and cited content; signature completeness must be manually checked in the original materials.

## How to verify the setup

This feature acceptance: test once each with synonym-rewritten questions, compare candidates and similarity scores, then toggle rerank to inspect the ordering of the top few, and switch `searchMode` to observe the difference between semantic and full-text results.

Business test: create an exception record, see whether the source material can be traced, and check whether the name, quantity, date, and signature receipt are consistent.

- In the knowledge base search test, fix one exception record, search separately using the field expressions in the annual progress report, mid-term review materials, and acceptance report, and record the number of candidates and `similarity`.
- Check the returned citations one by one against the name, quantity, date, and signature receipt of the original record, confirm that the exception is supported by the original record, and hand it to the reviewer for signature.
