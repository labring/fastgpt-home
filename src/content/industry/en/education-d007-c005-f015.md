---
title: Knowledge Base Retrieval for Kindergarten Safety and Emergency Drills: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c005-f015
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Safety | Retrieval | Review
meta_description: Kindergarten Safety: review retrieval for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Kindergarten Safety and Emergency Drills: Trace Exceptions and Review Results

## What this category's data looks like

This page focuses on kindergarten safety protection and emergency drill materials, covering hazard inspection ledgers, rectification notices and receipts, drill plans and sign-in sheets, access control and school bus inspection records, responsible person signature pages, etc. The materials are updated weekly and monthly by the kindergarten safety post; drill-related materials are supplemented according to activity milestones, and inspection-related materials are registered by shift or by day. When entering the knowledge base retrieval and recall function, hazard items and rectification deadlines serve as comparable fields, drill headcount and sign-in serve as verifiable fields, access control and school bus inspection items serve as item-by-item comparison fields, and responsible person signatures serve as traceable fields. Exception tracing and manual review must produce an exception list and review conclusions; exceptions must be supported by original records and signed by the reviewer, then handed over to the responsible person for disposition. The materials each have different roles: the ledger provides source records, receipts and sign-in sheets provide closed-loop evidence, inspection forms provide item-by-item basis, and signature pages provide attribution of responsibility.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after pattern, merge, rerank, filter, and upper-limit trimming). The exception list and review conclusions are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Hazard inspection ledger and rectification receipts | Whether hazard items and rectification deadlines correspond item by item and whether they form a closed loop | Retrieve once each using synonymous phrasings of the same question, record the number of candidates and scores, check whether the hazard item and rectification deadline fields fall in the same chunk, and then check whether the receipt is complete |
| Drill plan and sign-in sheet | Whether the drill headcount and sign-in are consistent and whether the records match the plan | Switch `searchMode` to semantic, full-text, and hybrid and run each once, compare whether the candidates contain both the plan and the sign-in, and check whether the headcount and sign-in entries match |
| Access control and school bus inspection records | Whether inspection items are missing and whether responsible person signatures are complete | Turn `usingReRank` on and off to compare the ordering of the top few results, check access control and school bus inspection items one by one, and check whether the responsible person signature page is recalled |
| Exception records and source materials | Whether the exception is supported by original records and whether the source can be traced | Use the exception description as input for retrieval, see whether the candidates hit the original ledger text, and adjust `similarity` and `limit` to observe changes in the number of candidates and scores |

## Three common errors

- Phenomenon: A hazard is shown as handled in the list, but the receipt and signature cannot be found. Cause: The rectification receipt was not entered into the knowledge base or was not associated with the hazard item, so retrieval can only recall the original ledger text.
- Phenomenon: The headcount in the drill record does not match the plan, and the sign-in entries do not match. Cause: The plan and sign-in belong to different materials, and recall hits only one side without item-by-item verification.
- Phenomenon: Access control and school bus inspection items are missing, yet the review conclusion is still judged as qualified. Cause: Inspection form entries were trimmed by the citation upper limit, key chunks did not enter the candidates, and manual review did not go back to the original text.

## How to verify the setup

In the knowledge base search test, retrieve the same question with different phrasings, record the number of candidates and scores, and compare the order of the top few results before and after enabling rerank.

Check hazard items and rectification deadlines, drill headcount and sign-in, access control and school bus inspection items, and responsible person signatures one by one, list mismatched items in the exception list, and note the source materials.

- This function's acceptance: test once each with synonymously rewritten questions, compare candidates and scores, then turn rerank on and off to see the ordering of the top few results; at the same time switch `searchMode`, adjust `similarity` and `limit`, record the number of candidates and scores, record the number of citations separately by array length, and check only the tokens of the cited text for the citation upper limit.
- Business test: create an exception record, see whether the source material can be traced, then form an exception list and review conclusion based on the candidate chunks and sign.
