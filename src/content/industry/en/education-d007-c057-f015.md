---
title: Knowledge Base Retrieval for National Key Research and Development Applications: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c057-f015
page_type: 行业问题页
application_area: education
meta_title: National R&D Grants | Retrieval | Review
meta_description: National R&D Grants: review retrieval for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for National Key Research and Development Applications: Trace Exceptions and Review Results

## What this category's data looks like

National Key R&D Program project application materials center on the project application form, budget application form, and cooperation agreement. Their sources are the application system and offline signed documents, and their update cadence keeps pace with application rounds and correction notices. The project application form contains research objectives, task decomposition, assessment indicators, participating units, and start/end dates; the budget application form contains subject amounts, calculation bases, undertaking units, and self-funding ratios; the cooperation agreement contains partner names, task division, funding allocation, signing dates, and sealed pages. When these three types of materials enter the knowledge base retrieval and recall function, each serves as an independent retrieval source: the project application form provides technical route and indicator fields, the budget application form provides amount and subject fields, and the cooperation agreement provides entity and signature fields. For the same record, the names, quantities, and dates in the two types of materials need cross-source comparison; versions not being synchronized and missing signature receipts are key review points.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after pattern, merge, rerank, filter, and upper-limit trimming). The exception list and review conclusions are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Project application form | Check whether names, quantities, dates, and signatures are consistent with the budget application form and cooperation agreement | In the search test, use indicator names and start/end dates as the query, switch `searchMode` to semantic, full-text, or hybrid, and record the number of candidates and scores |
| Budget application form | Check whether subject amounts, undertaking units, and self-funding ratios are consistent with the project application form | Use subject names and amounts as the query, compare the top few rankings before and after enabling `usingReRank`, and check whether candidate snippets cover the calculation basis |
| Cooperation agreement | Check partner names, task division, funding allocation, and signing dates against the project application form | Use partner names and signing dates as the query, adjust `similarity` to observe candidate changes, and check whether sealed pages and receipts are recalled |
| Exception list and review conclusions | Exceptions are supported by original records, and reviewers sign off | Trace candidate snippets back to source material page numbers and fields, and record the number of candidates, scores, and cited text tokens; array length is recorded separately |

## Three common errors

- Symptom: The names, quantities, and dates of the same record do not match between the project application form and the budget application form. Cause: The two sources are updated separately, without cross-source field comparison and version synchronization.
- Symptom: The cooperation agreement lacks signatures or receipts, and the review conclusion has no signing basis. Cause: Offline signed documents were not returned, and retrieval candidates did not cover sealed pages and receipt fields.
- Symptom: There are many candidates, but the top-ranked ones are all irrelevant, and the answer lacks key paragraphs. Cause: The retrieval mode does not match the material form, rerank is not enabled, or similarity filtering is too broad.

## How to verify the setup

This function's acceptance: test once each with synonym-rewritten queries, compare candidates and scores, then toggle rerank to inspect the top few rankings; switch `searchMode`, adjust `similarity`, toggle `usingReRank`, record the number of candidates and scores, and record the number of citations by array length.

Business test: create one exception record and see whether it can be traced back to the source material.

- In the search test, retrieve once each using different phrasings of the same field, compare candidate snippets and similarity scores, and confirm whether key paragraphs appear stably.
- For each exception record, trace it back to the source material page numbers and fields one by one, check names, quantities, dates, and signature receipts, and record cited text tokens and array length.
