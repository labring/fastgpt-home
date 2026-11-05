---
title: Reranking and Hybrid Retrieval for Graduate Employment Contracts and Destination Statistics: Find Supporting Evidence
slug: /en/industry/education-d001-c027-f018
page_type: 行业问题页
application_area: education
meta_title: Graduate Destinations | Reranking | Evidence
meta_description: Graduate Destinations: review reranking for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Reranking and Hybrid Retrieval for Graduate Employment Contracts and Destination Statistics: Find Supporting Evidence

## What this category's data looks like

This page centers on university employment signing and graduation destination statistics. The materials include employment agreements, graduation destination registration forms, and employer certificates. The sources are the employment work ledgers of each college and the archives of the university-level employment management department. The update cadence rolls forward in sync with graduation batches and signing progress. The field characteristics center on employer name, position name, signing date, reporting date, signature, and receipt. When the materials enter this feature, the employment agreement serves as the primary basis for signing, the graduation destination registration form serves as the basis for destination summary, and the employer certificate serves as the supplementary basis for the fact of signing. Together, the three form a pool of basis entries that can be traced back to the original text.

## Configuration and implementation checks

This step is executed by the reranking model in the retrieval service, which outputs the sorted candidates and rerank scores. "Basis entries that can be traced back to the original text" are then completed by citation trimming and answer generation. Hybrid retrieval runs both the vector path and the full-text path and merges the results. After merging, the scope is large and similarity filtering cannot be applied directly; usually the reranking model is then used to sort and filter by rerank score.

| Object | Check | Verification action |
| --- | --- | --- |
| Employment agreement | Check whether the employer name, position name, signing date, and signature are complete, and whether they are consistent with the corresponding record in the graduation destination registration form | In the search parameters, check the two-path switches of `searchMode` and confirm that both the vector path and the full-text path are enabled; compare the top three candidates and scores before and after reranking |
| Graduation destination registration form | Check whether the destination type, employer name, reporting date, and receipt are complete, and whether they are consistent with the corresponding record in the employment agreement | Check whether the candidates come from both paths at the same time; use `usingReRank` to confirm that the reranking model is bound and used for sorting and filtering |
| Employer certificate | Check whether the employer name, position name, certificate date, and seal are complete, and whether they are consistent with the corresponding records in the employment agreement and the graduation destination registration form | Compare the ordering and scores before and after reranking, and record the number of candidates and the scores; check the tokens of the cited text separately, and record the number of array items separately |
| Reranking model | Check whether the sorted candidates and rerank scores are used for filtering, and whether the original text content is left unchanged | Adjust `limit` to observe changes in the number of candidates and the scores, and confirm that the rerank score is used for filtering and does not rewrite the original text |

## Three common errors

- Symptom: For the same record, the employer name and signing date in the employment agreement and the graduation destination registration form do not match. Cause: The two materials were entered at different times, and no cross-check was performed.
- Symptom: An employer certificate is missing a signature or receipt but still enters the basis entries. Cause: The completeness of the signature and receipt fields was not validated when the material was archived.
- Symptom: There are many candidates, but the top few are irrelevant, and similarity filtering appears to have failed. Cause: After hybrid retrieval merges results, the scope is large, and rerank scores were not used for filtering.

## How to verify the setup

Feature acceptance: compare the order and scores of the top three before and after enabling reranking, and confirm that the number of candidates and the rerank scores are used for filtering and that the original text content is not changed.

Business test: ask a cross-material basis question and see whether the answer provides a traceable source.

- In the search parameters, check the two-path switches of `searchMode`, confirm that both the vector path and the full-text path are enabled, and check whether the candidates come from both paths at the same time.
- Compare the ordering and scores before and after reranking, confirm that `usingReRank` has bound the reranking model, and filter candidates by rerank score.
