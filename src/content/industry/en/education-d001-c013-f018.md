---
title: Reranking and Hybrid Retrieval for School Teacher Training Credits: Find Supporting Evidence
slug: /en/industry/education-d001-c013-f018
page_type: 行业问题页
application_area: education
meta_title: Teacher Credits | Reranking | Evidence
meta_description: Teacher Credits: review reranking for evidence lookup. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Reranking and Hybrid Retrieval for School Teacher Training Credits: Find Supporting Evidence

## What this category's data looks like

This page addresses the scenario of credit management for primary and secondary school teacher training. The materials come from three categories: training notices, credit recognition forms, and participant lists. They are usually updated by training batch or semester, and the fields include teacher name, ID number, training project name, class hours, credits, recognition date, and signature field. The training notice provides the project and class-hour definitions; the credit recognition form carries the recognition results and signatures; the participant list provides the correspondence between personnel and attendance. When the three categories of materials enter the retrieval service, they each participate in hybrid retrieval as candidate source bases, and after merging and reranking they form citable candidate entries, for checking the original text item by item when answering parents or writing into a plan.

## Configuration and implementation checks

This step is executed by the reranking model in the retrieval service, which outputs the sorted candidates and rerank scores. The citable basis entries that can point back to the original text are then completed by citation trimming and answer generation. Reranking does not rewrite the original text, nor does it generate a finished business product.

| Object | Check | Verification action |
| --- | --- | --- |
| Training notice | Whether the project name, class-hour definitions, effective date, and issuing signature are consistent with the current version | Check the original notice against the current version, confirm that the project name, class hours, date, and signature are complete, then compare against the source of the candidate entries |
| Credit recognition form | Whether the teacher name, credit quantity, recognition date, and signature field correspond to the participant list | Open the original recognition form, compare the name, quantity, date, and signature item by item, and record the original text location pointed to by the candidate entries |
| Participant list | Whether the personnel names, attendance records, and training batch dates are consistent with the notice and recognition form | Compare the original list with the notice and recognition form, confirm that the name, quantity, and date of the same record match, then check the rerank score and the number of candidates |
| Retrieval service | Candidates come from the merge of two paths; the order and scores before and after reranking can be compared | Check `searchMode` and `usingReRank` in the search parameters, and use `similarity` and `limit` to observe changes in the number of candidates and scores |

## Three common errors

- Symptom: the same teacher name is written differently in the recognition form and the participant list. Cause: the two materials were not unified when entered, and after reranking the original text names pointed to by the candidate entries do not match.
- Symptom: the class-hour definitions in the training notice are inconsistent with the quantity in the recognition form. Cause: the notice version was not synchronized, the old version still participates in retrieval, and the candidate entries cite an expired basis.
- Symptom: the recognition form lacks a signature or receipt. Cause: the material archiving is incomplete; although the candidate entries can point back to the original text, the basis entries do not satisfy the current validity conditions.

## How to verify the setup

This feature's acceptance: compare the order and rerank scores of the first three items before and after enabling reranking, check changes in the number of candidates, and confirm the actual values of `usingReRank`, `similarity`, and `limit` in the search parameters.

Business test: ask a basis question that spans materials, see whether the answer provides a citable source, and check the name, quantity, date, and signature in the original text item by item.

- Check the two-path switches of hybrid retrieval and `searchMode` in the search parameters, and confirm that candidates come from both the vector and full-text paths.
- Compare the order and scores before and after reranking, record the number of candidates and the rerank scores, and check whether the first few items are relevant and point back to the original text.
