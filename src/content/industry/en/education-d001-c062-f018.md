---
title: Reranking and Hybrid Retrieval for Research Ethics Review: Find Supporting Evidence
slug: /en/industry/education-d001-c062-f018
page_type: 行业问题页
application_area: education
meta_title: Research Ethics | Reranking | Evidence
meta_description: Research Ethics: review reranking for evidence lookup. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Reranking and Hybrid Retrieval for Research Ethics Review: Find Supporting Evidence

## What this category's data looks like

This page focuses on three types of materials in the research ethics review scenario: ethics review applications, informed consent form templates, and risk assessment forms. The materials come from the internal archive of this park, are updated by batch, and the current effective version shall prevail. The fields of each material include applicant, project name, number of people involved, review date, signature, and receipt. When entering the retrieval service, the ethics review application serves as the primary basis, the informed consent form template provides signing and version clues, and the risk assessment form supplements the risk level and handling records. Together, the three support traceable verification of the basis entries.

## Configuration and implementation checks

The reranking model in the retrieval service only outputs the sorted candidates and reranking scores; the basis entries that can be traced back to the original text must be handled next by citation trimming and answer generation. Hybrid retrieval simultaneously runs the vector and full-text paths and merges the results. After merging, the scope is large and similarity filtering cannot be performed directly, so the reranking model is usually then used to sort and filter by reranking score.

| Object | Check | Verification action |
| --- | --- | --- |
| Ethics review application | Whether the fields, dates, and signatures are consistent with the current version | Check the applicant, project name, number of people involved, review date, and signature, and inspect whether candidates from both paths appear simultaneously under `searchMode` |
| Informed consent form template | Whether the name, quantity, and date match the ethics review application | Compare the template version number and signing date, and confirm whether the reranking score and `similarity` filtering are reasonable after `usingReRank` is enabled |
| Risk assessment form | Whether the risk level, handling records, and receipt are complete | Check the risk level, handling date, and signature receipt, record the number of candidates and scores, and confirm that the first few entries can still be traced back after truncation by `limit` |
| Hybrid retrieval candidates | Whether the candidates come from both the vector and full-text paths | Inspect the sources of the merged candidates, compare the ranking and scores before and after reranking, and confirm that filtering is performed by reranking score |

## Three common errors

- Phenomenon: The project name, number of people involved, and date of the same record do not match between the ethics review application and the informed consent form template. Cause: The two materials are maintained separately, and the versions are not synchronized.
- Phenomenon: The risk assessment form lacks a signature or receipt, and the basis entry cannot be traced back to the original text. Cause: The signing step was not completed when the material was archived, and retrieval still returns that entry.
- Phenomenon: There are many candidates, but the first few are irrelevant, and similarity filtering appears to be ineffective. Cause: After merging, the scope is large, and filtering is not performed by reranking score, so the results are biased toward keyword hits.

## How to verify the setup

Acceptance of this feature: Compare the order and reranking scores of the first three entries before and after enabling reranking, check the number of candidates and score changes, and confirm that `usingReRank` and `similarity` filtering take effect.

Business test: Ask a basis question that spans materials, see whether the answer provides traceable sources, and check the tokens of the cited text and the number of array entries and record them separately.

- In the search parameters, check the two-path switches of `searchMode`, confirm that both vector and full-text are enabled, and inspect whether candidates come from both paths simultaneously.
- Compare the ranking and scores before and after reranking, confirm that `usingReRank` is bound and used for ranking and filtering, and use `limit` to control the number of candidates when necessary.
