---
title: Reranking and Hybrid Retrieval for Academic Misconduct Reports and Investigations: Find Supporting Evidence
slug: /en/industry/education-d001-c063-f018
page_type: 行业问题页
application_area: education
meta_title: Research Misconduct | Reranking | Evidence
meta_description: Research Misconduct: review reranking for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Reranking and Hybrid Retrieval for Academic Misconduct Reports and Investigations: Find Supporting Evidence

## What this category's data looks like

This page addresses the scenario of investigating and handling academic misconduct reports. The core materials include report materials, investigation reports, and expert appraisal opinions. Report materials record the reporter, the reported person, the matter, and the date; investigation reports record the investigation process, conclusions, and signatures; expert appraisal opinions record the appraisal institution, experts, conclusions, and date. The materials come from the acceptance and investigation stages of this park and are updated in batches as the investigation progresses, with the current archived version prevailing. Field characteristics center on names, quantities, dates, signatures, and receipts. When the materials enter this function, the report materials provide the original clues, the investigation reports provide the process and conclusions, and the expert appraisal opinions provide professional judgment; together, the three constitute a citable source of basis, used to reply to parents or to write into a plan.

## Configuration and implementation checks

This step is performed by the rerank model in the retrieval service, which outputs the sorted candidates and rerank scores. Hybrid retrieval runs both the vector and full-text paths simultaneously and merges the results; after merging, the scope is large and similarity filtering cannot be applied directly, so the rerank model is usually then used to sort and filter by rerank score. The basis entries that can cite the original text are then completed by citation trimming and answer generation.

| Object | Check | Verification action |
| --- | --- | --- |
| Report materials | The fields include the reporter, the reported person, the matter, the date, and the signature; the name, quantity, and date of the same record in the two materials must match | In the search parameters, check the two-path switches of `searchMode`, confirm that both the vector and full-text paths are enabled, and see whether the candidates come from both paths at the same time |
| Investigation reports | The fields include the investigation process, conclusions, date, and signature; the version must be current, and a missing signature or receipt cannot be used as a basis | Compare the ordering and scores before and after reranking, check that `usingReRank` is bound and used for sorting and filtering, and record the number of candidates and the scores |
| Expert appraisal opinions | The fields include the appraisal institution, experts, conclusions, and date; the name, quantity, and date of the same record in the two materials must match | Check that `limit` controls the number of candidates, confirm that the top few after reranking are relevant to the question, and separately record the number of entries in the citation array |

## Three common errors

- Symptom: The name, quantity, and date of the same record in the report materials and the investigation report do not match. Cause: The two materials are entered separately, without field-level comparison and citation verification.
- Symptom: The version of the investigation report is not synchronized, and old conclusions are still hit by retrieval. Cause: The version was not updated as the investigation progressed, and the current archive does not cover the old version.
- Symptom: An expert appraisal opinion lacks a signature or receipt but still appears in the top few candidates. Cause: The rerank score only considers relevance and does not verify the signature and receipt fields.

## How to verify the setup

This function's acceptance: compare the order and scores of the top three before and after enabling reranking, check the number of candidates and the score changes, and confirm that `usingReRank` takes effect.

Business test: ask a basis question that spans materials and see whether the answer gives a citable source.

- In the search parameters, check the two-path switches of `searchMode`, confirm that both the vector and full-text paths are enabled, and see whether the candidates come from both paths at the same time.
- Compare the ordering and scores before and after reranking, check that `usingReRank` is bound and used for sorting and filtering, and record the number of candidates and the scores.
