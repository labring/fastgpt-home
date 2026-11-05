---
title: Reranking and Hybrid Retrieval for Vocational Training Subsidy Applications: Find Supporting Evidence
slug: /en/industry/education-d001-c037-f018
page_type: 行业问题页
application_area: education
meta_title: Training Subsidies | Reranking | Evidence
meta_description: Training Subsidies: review reranking for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Reranking and Hybrid Retrieval for Vocational Training Subsidy Applications: Find Supporting Evidence

## What this category's data looks like

This page addresses the business basis query for vocational training subsidy applications. The materials come from three categories archived by this park: training class filing records, attendance records, and completion assessment forms. Class filing records register the class name, start and end dates, and the handler's signature; attendance records register student attendance and makeup-signature receipts on a daily basis; completion assessment forms register the assessment conclusion, date, and assessor's signature. The three material categories are grouped by class and batch, and are usually updated in batches along with application progress; within the same batch, the latest archived version is the current one. When the materials enter hybrid retrieval, the vector path handles semantically similar expressions, and the full-text path handles literal hits such as names, quantities, and dates. After the results from the two paths are merged, the candidate scope is large, so a reranking model then sorts them and filters by rerank score, so that subsequent citation trimming and answer generation can produce basis entries that can be traced back to the original text.

## Configuration and implementation checks

This step is executed by the reranking model in the retrieval service, which outputs the sorted candidates and rerank scores. The basis entries that can be traced back to the original text are then completed by citation trimming and answer generation. Hybrid retrieval simultaneously runs the vector and full-text paths and merges the results; after merging, the scope is large and similarity filtering cannot be applied directly, so the reranking model is usually then used to sort and filter by rerank score.

| Object | Check | Verification action |
| --- | --- | --- |
| Hybrid retrieval | Both the vector and full-text paths are enabled | Check the switches for both paths in the search parameters, confirm that `searchMode` covers both paths, and then see whether candidates come from both paths at the same time |
| Multi-path merge | The results from the two paths have been merged | Check the number of candidates and the source distribution after merging, confirm that both paths have hits, and record the number of candidates |
| Reranking model | Bound and used for sorting and filtering | Compare the order of the top three before and after reranking and the rerank scores, filter by score, and verify that `usingReRank` has taken effect |
| Training class filing records, attendance records, completion assessment forms | Fields, dates, and signatures match the original text | Check the class name, number of students, start and end dates, and handler's signature one by one, and confirm that the same record is consistent across the three materials and is the current version |

## Three common errors

- Symptom: The name, quantity, and dates of the same class do not match between the class filing records and the attendance records. Cause: The two materials were entered separately, and the fields were not aligned by class and batch.
- Symptom: The completion assessment form uses an old version, and its dates are inconsistent with the current class filing records. Cause: The versions were not synchronized, and the latest version was not used to overwrite during archiving.
- Symptom: The attendance records lack signatures or receipts, and the entries cannot be traced back to the original text. Cause: The makeup-signature process was not closed-loop, and receipts were not archived together with the materials.

## How to verify the setup

This feature's acceptance: compare the order of the top three and the rerank scores before and after enabling reranking, verify that `usingReRank` has taken effect, that the number of candidates and the scores can be recorded, and confirm that similarity filtering is performed by rerank score.

Business test: ask a basis question that spans materials, see whether the answer gives traceable sources, and trace each one back to the original text location in the class filing records, attendance records, or completion assessment forms.

- Check the switches for both paths and `searchMode` in the search parameters, confirm that both the vector and full-text paths are enabled, and record the number of candidates after merging.
- Compare the ordering and scores before and after reranking, and filter by rerank score; for the citation limit, check only the tokens of the cited text, record the number of array entries separately, and do not compare it for equality with `quoteMaxToken`.
