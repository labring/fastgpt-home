---
title: Reranking and Hybrid Retrieval for School Exam Question Setting and Grading: Find Supporting Evidence
slug: /en/industry/education-d001-c011-f018
page_type: 行业问题页
application_area: education
meta_title: School Exams | Reranking | Evidence
meta_description: School Exams: review reranking for evidence lookup. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Reranking and Hybrid Retrieval for School Exam Question Setting and Grading: Find Supporting Evidence

## What this category's data looks like

In the scenario of exam question setting and grading in primary and secondary schools, the materials entering the basis query usually fall into three categories: the question-setting two-way specification table, the exam paper, and the grading rubric. The question-setting two-way specification table gives the distribution of test points and the score arrangement, the exam paper gives the original question text and question numbers, and the grading rubric gives scoring points, deduction explanations, and signature fields. The three types of materials are updated by semester and exam batch. Within the same batch, the specification table may come out first, then the exam paper, and finally the grading rubric may be supplemented, so the update rhythm is not synchronized. Fields together with dates, signatures, and receipts are the key to determining whether the basis is usable. When entering this function, the specification table, exam paper, and grading rubric participate in retrieval separately as candidate sources. The retrieval results are then handed to subsequent steps to trim citations and generate basis entries that can point back to the original text, for use in replying to parents or writing into a plan.

## Configuration and implementation checks

This step is executed by the reranking model in the retrieval service, which outputs the sorted candidates and reranking scores. The basis entries that can point back to the original text are then completed by citation trimming and answer generation. Hybrid retrieval simultaneously runs the vector and full-text paths and merges the results. After merging, the scope is large and similarity filtering cannot be directly applied, so the reranking model is usually used again to sort and filter by reranking score.

| Object | Check | Verification action |
| --- | --- | --- |
| Question-setting two-way specification table | Whether the test point names, scores, dates, and signatures are consistent with the current version | In the search parameters, check the two-path switches and `searchMode`, confirm that the specification table, exam paper, and grading rubric all enter the candidates, and record the number of candidates and scores |
| Exam paper | Whether the question numbers, question stems, scores, dates, and signatures can be matched item by item with the specification table | Compare the order and scores before and after reranking, use `usingReRank` to confirm that reranking has participated, and check whether the first few items come from both paths |
| Grading rubric | Whether the scoring points, deduction explanations, receipts, and signatures are complete and are the current version | Check whether the candidates come from both paths at the same time, filter by reranking score, check `similarity` and `limit`, and record the number of candidates and scores |
| Basis entry | Whether the entry can point back to the original text location in the specification table, exam paper, or grading rubric | Check the tokens of the cited text, record the number of array items separately, and do not compare the number of citation items with the citation content budget as equal |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match between the specification table and the exam paper. Cause: The two materials were updated separately and were not checked in sync for the same batch.
- Phenomenon: The grading rubric version is not synchronized, and old scoring points are still cited. Cause: The new rubric did not replace the old file, and retrieval recalls both versions at the same time.
- Phenomenon: The basis entry lacks a signature or receipt, and the source is incomplete when replying to parents. Cause: The signature fields and receipts were not completed when the materials were archived.

## How to verify the setup

Acceptance of this function: compare the order and scores of the first three items before and after enabling reranking, check the number of candidates and score changes, and confirm that `usingReRank` has taken effect.

Business test: ask a basis question that spans materials, see whether the answer gives a source that can be pointed back to, and check whether the source can point back to the original text of the specification table, exam paper, or grading rubric.

- In the search parameters, check the two-path switches and `searchMode`, and confirm that both the vector and full-text paths are enabled and merged.
- Compare the order and scores before and after reranking, filter by reranking score, record the number of candidates and scores, and check `similarity` and `limit`.
