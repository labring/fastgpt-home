---
title: Knowledge Base Retrieval for Graduate Admissions Interviews and Selection: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c024-f015
page_type: 行业问题页
application_area: education
meta_title: Graduate Admissions | Retrieval | Review
meta_description: Graduate Admissions: review retrieval for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Graduate Admissions Interviews and Selection: Trace Exceptions and Review Results

## What this category's data looks like

Graduate admissions re-examination and admission materials mainly consist of re-examination plans, candidate score sheets, and adjustment lists, sourced from the original records and receipts submitted by each admissions unit at the prescribed milestones. The update cadence advances with re-examination batches: plans come first, score sheets are supplemented as interviews proceed, and adjustment lists are updated after each round of adjustment. Field characteristics center on candidate number, name, preliminary and re-examination scores, major direction, date, and signature fields, and the same record often appears across three materials. When entering the knowledge base retrieval and recall function, the re-examination plan plays the role of the basis for rules and procedures, the candidate score sheet plays the role of the basis for individual scores and rankings, and the adjustment list plays the role of the basis for adjustment eligibility and destination; together, the three form the comparison worksheet for abnormal traceback, so that after candidate snippets and similarity scores are returned, manual verification of names, quantities, dates, and signatures can be performed.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The "exception list and review conclusions" are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Re-examination plan | Check whether the candidate number, major direction, date, and signature fields in the plan are consistent with the score sheet and adjustment list | In the search test, switch `searchMode`, use semantic, full-text, and hybrid recall respectively, and record the number of candidates and scores |
| Candidate score sheet | Check whether the same candidate's name, number of scores, and re-examination date match across the two materials, and whether the versions are synchronized | Enable and disable `usingReRank`, compare the order of the top few candidates, and confirm whether the score sheet snippets still rank at the top |
| Adjustment list | Check whether the names, number of people, dates, and receipt signatures in the adjustment list are consistent with the plan and score sheet | Adjust the `similarity` threshold, observe changes in the number of candidates, and confirm whether the key paragraphs of the list are still retained |
| Exception list and review conclusions | Check whether each exception is supported by original records and whether the reviewer signature field is complete | Use `limit` to control the token budget of the cited text, review candidate snippets and scores one by one, and confirm that exceptions can be traced back to the source materials |

## Three common errors

- Phenomenon: The same candidate's name, number of scores, or re-examination date does not match between the score sheet and the adjustment list. Cause: The two materials are entered at different stages, versions are not synchronized, and retrieval only returns candidate snippets, so manual review of the original records for comparison is required.
- Phenomenon: After the re-examination plan is updated, the score sheet and adjustment list still reference the old version's major direction and date. Cause: The materials have different update cadences, retrieval hits old snippets, and similarity scores are close, so it is necessary to verify the hits and associations before judging.
- Phenomenon: The exception list lacks a reviewer signature or adjustment receipt. Cause: Review conclusions are completed by subsequent nodes or manually, and retrieval returns candidates and cited content; it does not automatically generate signature fields or receipt status.

## How to verify the setup

Acceptance of this function: test once each with synonym-rewritten questions, compare the number of candidates and scores, then toggle rerank on and off to see the ordering of the top few; at the same time, switch `searchMode`, adjust `similarity` and `limit`, and observe changes in candidates and cited content.

Business test: create an exception record, see whether it can be traced back to the source materials, and check whether the names, quantities, dates, and signatures in the three materials—re-examination plan, candidate score sheet, and adjustment list—are consistent.

- In the knowledge base search test, use semantic, full-text, and hybrid recall for the same exception respectively, record the number of candidates and scores, then enable rerank to compare the order of the top few.
- Review candidate snippets and cited content one by one according to the exception list, check the fields, dates, and signatures of the re-examination plan, candidate score sheet, and adjustment list, and after confirming the reviewer signature, hand it over to the person in charge for handling.
