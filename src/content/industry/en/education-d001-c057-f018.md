---
title: Reranking and Hybrid Retrieval for National Key Research and Development Applications: Find Supporting Evidence
slug: /en/industry/education-d001-c057-f018
page_type: 行业问题页
application_area: education
meta_title: National R&D Grants | Reranking | Evidence
meta_description: National R&D Grants: review reranking for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Reranking and Hybrid Retrieval for National Key Research and Development Applications: Find Supporting Evidence

## What this category's data looks like

This category's data looks like this: National Key R&D Program project applications involve three types of materials: project application forms, budget application forms, and cooperation agreements. The project application form contains research objectives, task breakdown, assessment indicators, and start and end dates; the budget application form contains subject amounts, calculation basis, and annual allocation; the cooperation agreement contains partner institutions, division of labor, funding disbursement, and signatures/seals. Materials are updated by application batch and revision round. The same record often shows cross-material differences in name, quantity, and date, and unsynchronized versions or missing signed receipts are also common. When these three types of materials enter this function, the project application form and budget application form provide the basis for indicators and funding, while the cooperation agreement provides the basis for division of labor and disbursement. During retrieval, each participates as an independent candidate source in hybrid retrieval and reranking.

## Configuration and implementation checks

Configuration and implementation checks: This step is executed by the reranking model in the retrieval service, which outputs the sorted candidates and rerank scores. Basis items that can be traced back to the original text are then completed by citation trimming and answer generation. Hybrid retrieval simultaneously runs vector and full-text paths and merges the results. After merging, the scope is large and similarity filtering cannot be applied directly, so a reranking model is usually then used to sort and filter by rerank score.

| Object | Check | Verification action |
| --- | --- | --- |
| Project application form | Research objectives, task breakdown, assessment indicators, and start and end dates must be aligned item by item with the budget application form and cooperation agreement | Check whether the name, quantity, and date of the same indicator are consistent in the two materials, and check whether signatures and receipts are complete |
| Budget application form | Subject amounts, calculation basis, and annual allocation must match the task cycle in the project application form | Check the correspondence between funding subjects and task breakdown, and check whether version numbers and revision records are synchronized |
| Cooperation agreement | Partner institutions, division of labor, funding disbursement, and signatures/seals must be consistent with the application materials | Check the names of partner institutions and disbursement amounts, and confirm that signatures/seals and receipts are complete |
| Reranking model | Bound and used for sorting and filtering | Compare the order and scores before and after reranking, and check the number of candidates and scores |

## Three common errors

- Phenomenon: The name, quantity, or date of the same indicator does not match in the two materials. Cause: The project application form and budget application form were revised separately, without cross-material field alignment.
- Phenomenon: The version of a retrieved basis item does not match the current materials. Cause: Revision rounds were not synchronized, and old-version candidates still participate in sorting.
- Phenomenon: The cooperation agreement lacks a signature or receipt, and the basis item cannot be traced back. Cause: The signature/seal process was not closed-loop, and completeness verification was not performed before the materials entered retrieval.

## How to verify the setup

Acceptance for this function: turn reranking on and off to compare the order of the first three items and the rerank scores, and check the number of candidates and scores; check whether `searchMode` enables both the vector and full-text paths, whether `usingReRank` is bound to the reranking model, and whether `similarity` and `limit` are set according to the candidate scope.

Business test: ask a cross-material basis question, see whether the answer provides a traceable source, and check that the tokens of the cited text and the number of array items are recorded separately.

- In the search parameters, check the two-path switches of `searchMode` and the binding status of `usingReRank`, and compare the order and scores of the first three items before and after reranking.
- Check the fields, dates, and signatures of the project application form, budget application form, and cooperation agreement item by item, and record differences in the name, quantity, and date of the same record in the two materials.
