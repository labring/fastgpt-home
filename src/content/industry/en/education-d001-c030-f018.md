---
title: Reranking and Hybrid Retrieval for Vocational School Student Internships: Find Supporting Evidence
slug: /en/industry/education-d001-c030-f018
page_type: 行业问题页
application_area: education
meta_title: Student Internships | Reranking | Evidence
meta_description: Student Internships: review reranking for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Reranking and Hybrid Retrieval for Vocational School Student Internships: Find Supporting Evidence

## What this category's data looks like

This page addresses vocational school student internship management materials, including three categories: internship agreements, internship plans, and internship logs. Internship agreements contain the position name, start and end dates, enterprise signature, and school seal; internship plans contain the batch, number of positions, supervising teacher, and date; internship logs contain daily records, signatures, and receipts. The three categories of materials are updated by semester or batch; the name, quantity, and date of the same record may be inconsistent across different materials, versions may not be synchronized, and signatures or receipts may be missing. When entering this feature, internship agreements and internship plans serve as basis sources, and internship logs serve as process evidence; hybrid retrieval simultaneously runs the vector and full-text paths and merges the results, and the rerank model ranks the candidates and filters by rerank score, providing candidates for subsequent citation trimming and answer generation.

## Configuration and implementation checks

This step is executed by the rerank model in the retrieval service, which outputs the ranked candidates and rerank scores. "Basis items that can be traced back to the original text" are then completed by citation trimming and answer generation. Hybrid retrieval simultaneously runs the vector and full-text paths and merges the results; after merging, the scope is large and similarity filtering cannot be applied directly, so the rerank model is usually used again to rank and filter by rerank score.

| Object | Check | Verification action |
| --- | --- | --- |
| Internship agreement | Fields contain the position name, start and end dates, enterprise signature, and school seal; dates and signatures must match the internship plan | Check whether the position name, quantity, and dates in the agreement and the plan are consistent, and check whether signatures and seals are complete; in the search parameters, check whether both paths of `searchMode` are enabled |
| Internship plan | Fields contain the batch, number of positions, supervising teacher, and date; the version must be current and synchronized with the agreement | Check whether the plan version is current and compare it item by item with the number of positions and dates in the agreement; check whether candidates come from both paths at the same time, and record the number of candidates and scores |
| Internship log | Fields contain daily records, signatures, and receipts; dates must fall within the start and end dates of the agreement | Check whether the log dates fall within the start and end dates of the agreement, and check whether signatures and receipts are missing; compare the ranking and scores before and after reranking, and pay attention to whether `usingReRank` takes effect |
| Rerank model | Bound and used for ranking and filtering, outputting ranked candidates and rerank scores | Compare the ranking and scores before and after reranking, and filter by rerank score; the number of citations is the array length, the tokens of the citation text are recorded separately, `quoteMaxToken` is the citation content budget, and the two are not compared for equality |

## Three common errors

- Symptom: the same position name does not match between the internship agreement and the internship plan. Cause: the two materials are updated separately, and the name or quantity is not synchronized, so the basis items cannot be traced back to the same original text.
- Symptom: the internship log date falls outside the start and end dates of the agreement. Cause: versions are not synchronized, the old agreement was not replaced, or the current agreement dates were not checked when the log was retroactively entered.
- Symptom: the internship log lacks a signature or receipt, and the agreement lacks an enterprise signature. Cause: signatures and receipts were not checked item by item during material collection, and after entering retrieval they are still treated as complete basis candidates.

## How to verify the setup

Acceptance of this feature: turn on the before-and-after reranking comparison of the order and scores of the first three items, check the number of candidates and score changes, and confirm that `usingReRank` takes effect and that `similarity` and `limit` are queryable in the search parameters.

Business test: ask a cross-material basis question, see whether the answer gives a traceable source, and check whether the source matches the original text of the internship agreement, internship plan, or internship log.

- In the search parameters, check the two path switches of `searchMode`, see whether candidates come from both the vector and full-text paths at the same time, and record the number of candidates and scores.
- Compare the ranking and scores before and after reranking, and filter by rerank score; check that the number of citations is the array length, the tokens of the citation text are recorded separately, and `quoteMaxToken` is only used as the citation content budget.
