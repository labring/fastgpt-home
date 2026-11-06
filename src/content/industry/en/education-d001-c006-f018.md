---
title: Reranking and Hybrid Retrieval for Kindergarten Operations and Quality Self-Assessment: Find Supporting Evidence
slug: /en/industry/education-d001-c006-f018
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Quality | Reranking | Evidence
meta_description: Kindergarten Quality: review reranking for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Reranking and Hybrid Retrieval for Kindergarten Operations and Quality Self-Assessment: Find Supporting Evidence

## What this category's data looks like

Kindergarten operation behavior and quality self-assessment materials mainly come from three types of text: the kindergarten's own self-assessment report, the problem list, and the rectification plan. The update cadence follows the self-assessment cycle and rectification progress, and is usually synchronized by semester or special node. The self-assessment report fields include operating conditions, safety and hygiene, care and education, faculty and staff team, and internal management. The problem list fields include problem description, responsible department, and rectification deadline. The rectification plan fields include measures, responsible person, completion date, and signature. When the three types of materials enter this function, their roles differ: the self-assessment report serves as the main source of basis, the problem list serves as the clue for locating problems, and the rectification plan serves as evidence of measures and deadlines. If the name, quantity, or date of the same record does not match across two materials, the version is not synchronized, or a signature or receipt is missing, the basis item cannot be traced back to the original text.

## Configuration and implementation checks

This step is executed by the reranking model in the retrieval service, which outputs the sorted candidates and reranking scores. The basis items that can be traced back to the original text are then completed by citation trimming and answer generation. Hybrid retrieval simultaneously runs the vector and full-text paths and merges the results. After merging, the scope is large and similarity filtering cannot be applied directly, so the reranking model is usually then used to sort and filter by reranking score.

| Object | Check | Verification action |
| --- | --- | --- |
| Self-assessment report | Fields include operating conditions, safety and hygiene, care and education, faculty and staff team, and internal management; dates and signatures are complete; the version is the current one | Check the report cover date and signature field, and confirm that it references the same version as the problem list and rectification plan |
| Problem list | The problem description, responsible department, and rectification deadline are consistent with the name, quantity, and date of the corresponding item in the self-assessment report | Compare the same record in the problem list and the self-assessment report item by item; if the name, quantity, or date does not match, mark it |
| Rectification plan | Measures, responsible person, completion date, and signature or receipt are complete, and connect with the rectification deadline in the problem list | Check the signature or receipt of the rectification plan, and check whether the deadline and responsible person are synchronized with the problem list |
| Reranking model | Has been bound and is used for sorting and filtering; compare the order and scores before and after reranking | Check the two-path switches and `searchMode` in the search parameters, confirm that `usingReRank` is enabled, and observe changes in the number of candidates and scores before and after reranking |

## Three common errors

- Symptom: the name, quantity, or date of the same record does not match between the self-assessment report and the problem list. Cause: the two materials are maintained separately, and cross-material field comparison and synchronization are not performed.
- Symptom: the self-assessment report version referenced by the rectification plan has been updated, but the plan is still filled in according to the old version. Cause: the version is not synchronized, the material update cadence is inconsistent, and a version check step is missing.
- Symptom: the rectification plan lacks a signature or receipt, and the basis item cannot be traced back to the original text. Cause: signatures and receipts are not included in the material archiving check, and field completeness is not checked.

## How to verify the setup

Function acceptance: turn reranking on and off to compare the order and reranking scores of the first three items, check changes in the number of candidates and scores, confirm that filtering by reranking score takes effect, and check the status of `usingReRank` and `searchMode`.

Business test: ask a cross-material basis question, see whether the answer gives a traceable source, and check that the number of citations and the tokens of the cited text are recorded separately.

- In the search parameters, check the vector and full-text path switches, confirm that `searchMode` and `usingReRank` are enabled, and record the number of candidates and scores before and after reranking.
- Compare the same record in the self-assessment report, problem list, and rectification plan item by item, check the name, quantity, date, signature, or receipt, and mark items whose versions are not synchronized.
