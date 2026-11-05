---
title: Knowledge Base Retrieval for Graduate Admissions Interviews and Selection: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c024-f015
page_type: 行业问题页
application_area: education
meta_title: Graduate Admissions | Retrieval | Checks
meta_description: Graduate Admissions: review retrieval for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Graduate Admissions Interviews and Selection: Compare Documents and Locate Differences

## What this category's data looks like

This page focuses on the graduate admissions re-examination and admission scenario. The materials come from three types of documents: re-examination plans, candidate score sheets, and transfer/adjustment lists. The update cadence is synchronized with admission batches, and they are commonly imported in a concentrated manner before the re-examination and continuously supplemented during the transfer/adjustment stage. Field characteristics include candidate name, candidate number, preliminary exam total score, re-examination score, proposed admission major, date, and signature field. After the re-examination plan enters this function, it serves as the rule basis for comparing the timing and requirements of each stage; the candidate score sheet serves as process data, providing clues on scores and rankings; the transfer/adjustment list serves as result data, carrying proposed admissions and transfer/adjustment destinations. The three types of materials each play different roles during retrieval, but all are returned as candidate snippets for subsequent nodes or manual field-level comparison and discrepancy localization.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after mode, merge, rerank, filter, and upper-limit trimming). The discrepancy list is then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Re-examination plan | Whether the dates and signatures in the re-examination plan, score sheets, and transfer/adjustment list are consistent | Use `searchMode` to switch between semantic, full-text, or hybrid mode, check whether the time nodes and signature fields in the plan appear completely in the candidate snippets, and record the number of candidates and scores |
| Candidate score sheet | Whether the name, quantity, and date of the same candidate match between the score sheet and the transfer/adjustment list | Retrieve the same candidate number, compare the candidate snippets returned by the two materials, check whether the name, total score, and re-examination score fields are consistent, and record the number of candidates and scores |
| Transfer/adjustment list | Whether the proposed admission major, date, signature, or receipt in the transfer/adjustment list match the ledger | Compare the top few rankings before and after enabling `usingReRank`, check the major name and date fields in the transfer/adjustment list, separately record the number of items in the citation array, and view the candidates after `similarity` filtering |
| Retrieval result citations | Whether the cited snippets retain the key original fields and do not exceed budget | Check the tokens of the cited text against the `limit` and `quoteMaxToken` settings, confirm that the number of array items and the citation content budget are recorded separately, and do not compare the two as equal |

## Three common errors

- Symptom: The name or total score of the same candidate does not match between the score sheet and the transfer/adjustment list. Cause: The two material versions are not synchronized, or the field definitions are inconsistent at entry, and the candidate snippets returned by retrieval are independent of each other.
- Symptom: The dates in the re-examination plan are inconsistent with the dates in the score sheet and transfer/adjustment list. Cause: The ledger was not written back after the plan was updated, or rolling supplementation during the transfer/adjustment stage was not synchronized to the plan, causing the same record's date to mismatch.
- Symptom: The transfer/adjustment list lacks the signature or receipt field. Cause: The signature step was not completed during material circulation, or the receipt was not imported together with the list, so that field is missing from the retrieval candidate snippets.

## How to verify the setup

This function's acceptance: test once each with synonym-rewritten questions, compare candidates and scores, then toggle rerank on and off to observe the top few rankings; at the same time switch `searchMode` to observe changes in the number of candidates and `similarity` scores.

Business test: use one real record to find fields inconsistent with the ledger, record the number of candidates and scores, and hand it to the reviewer for confirmation and write-back.

- In the knowledge base search test, switch `searchMode`, compare the number of candidates and scores returned by semantic, full-text, and hybrid modes, and confirm they match the material form.
- Compare the top few rankings before and after enabling `usingReRank`, check the tokens of the cited text against the `limit` and `quoteMaxToken` settings, and separately record the number of items in the citation array.
