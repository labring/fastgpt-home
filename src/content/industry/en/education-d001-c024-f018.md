---
title: Reranking and Hybrid Retrieval for Graduate Admissions Interviews and Selection: Find Supporting Evidence
slug: /en/industry/education-d001-c024-f018
page_type: 行业问题页
application_area: education
meta_title: Graduate Admissions | Reranking | Evidence
meta_description: Graduate Admissions: review reranking for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Reranking and Hybrid Retrieval for Graduate Admissions Interviews and Selection: Find Supporting Evidence

## What this category's data looks like

This page addresses the graduate admissions re-examination and admission scenario; the materials include three categories: re-examination plans, candidate score sheets, and transfer/adjustment lists. A re-examination plan contains batch, major, re-examination ratio, score weights, signature field, and date; a candidate score sheet contains candidate number, preliminary exam total score, re-examination score, total score, ranking, and signature; a transfer/adjustment list contains adjustment batch, candidate number, original applied major, proposed admitted major, receipt confirmation, and date. Materials are updated by admissions year and batch, and the same record across the plan, score sheet, and transfer/adjustment list must have names, quantities, dates, and signatures that corroborate one another. When entering this function, the re-examination plan, score sheet, and transfer/adjustment list serve as candidate sources; hybrid retrieval simultaneously runs a vector path and a full-text path and merges the results; the rerank model sorts the merged candidates and filters by rerank score; citation trimming and answer generation then produce basis entries that can be traced back to the original text, for replying to parents or writing into the plan.

## Configuration and implementation checks

This step is executed by the rerank model in the retrieval service, which outputs the sorted candidates and rerank scores. The basis entries that can be traced back to the original text are then completed by citation trimming and answer generation. Hybrid retrieval simultaneously runs a vector path and a full-text path and merges the results; after merging, the scope is large and similarity filtering cannot be applied directly, so the rerank model is usually then used to sort and filter by rerank score.

| Object | Check | Verification action |
| --- | --- | --- |
| Re-examination plan | Batch, major, re-examination ratio, score weights, signature, and date match the current version | Check the plan date and signature field to confirm the version is current; check the correspondence of the batch and major fields with the score sheet and transfer/adjustment list |
| Candidate score sheet | Candidate number, preliminary exam total score, re-examination score, total score, ranking, signature, and date match the original text | Compare candidate number and total score item by item, and check the signature and date; in the search parameters, check the `searchMode` two-path switches and the `usingReRank` binding status |
| Transfer/adjustment list | Adjustment batch, candidate number, original applied major, proposed admitted major, receipt confirmation, and date match the original text | Check the receipt confirmation and date, and confirm that the names, quantities, and dates of the same record are consistent across the re-examination plan and the score sheet; record the number of candidates and the scores |
| Retrieval service | Candidates come from both the vector and full-text paths, and the ordering and scores before and after reranking can be compared | Observe the number of candidates and the scores, check the return order under the `similarity` and `limit` values, and record the array length separately |

## Three common errors

- Symptom: the name or quantity for the same candidate number does not match between the score sheet and the transfer/adjustment list. Cause: the two materials were entered separately, and cross-material verification by candidate number was not performed.
- Symptom: the dates or batches of the re-examination plan and the transfer/adjustment list do not match. Cause: versions were not synchronized, and materials from an old batch remain in the candidate scope.
- Symptom: the transfer/adjustment list lacks a signature or receipt confirmation, and the basis entries cannot be traced back to the original text. Cause: material archiving is incomplete, and the corresponding fields cannot be found during citation trimming.

## How to verify the setup

This function's acceptance: compare the order and scores of the first three items before and after enabling reranking, check the number of candidates and the score changes, and confirm that `usingReRank` takes effect and that both paths of `searchMode` are enabled.

Business test: ask a cross-material basis question and see whether the answer provides a traceable source.

- In the search parameters, check the `searchMode` two-path switches and the `usingReRank` binding status, and compare the order and scores of the first three items before and after reranking.
- Compare the names, quantities, dates, and signatures item by item across the re-examination plan, candidate score sheet, and transfer/adjustment list by candidate number, and record the number of candidates and the scores.
