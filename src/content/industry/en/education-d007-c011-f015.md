---
title: Knowledge Base Retrieval for School Exam Question Setting and Grading: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c011-f015
page_type: 行业问题页
application_area: education
meta_title: School Exams | Retrieval | Review
meta_description: School Exams: review retrieval for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for School Exam Question Setting and Grading: Trace Exceptions and Review Results

## What this category's data looks like

This page addresses the category of exam question setting and grading in primary and secondary schools. Materials include the two-way specification table for question setting, exam papers, grading rubrics, as well as exception records and review conclusions. The specification table lists the basis for question setting by knowledge point, question type, score, and difficulty; exam papers carry question stems, options, answers, and paper identifiers; grading rubrics give scoring points, deduction points, and grading notes. Materials come from the question-setting group, the question-review group, and the grading group, and are updated by semester and exam batch. Fields include name, quantity, date, signature, and receipt. After entering the knowledge base retrieval service, the specification table is used to check question coverage and score distribution, exam papers are used to locate original answers and paper records, grading rubrics are used to check scoring points and review criteria, and exception records are used to link source materials with handling destinations.

## Configuration and implementation checks

This step is performed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The exception list and review conclusions are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Two-way specification table for question setting | Knowledge points, question types, scores, and difficulty correspond item by item with the exam paper; name, quantity, date, and signature can be verified | In the search test, check once each using the same exception record rephrased, compare the number of candidates and scores, and verify the specification table fields and signature |
| Exam paper | Question stems, answers, and paper identifiers can be traced to the original records; question numbers, scores, and dates are consistent with the specification table | Switch `searchMode` to semantic, full-text, or hybrid, see whether candidates include both semantic and full-text results, then verify the paper fields |
| Grading rubric | Scoring points, deduction points, and grading notes correspond to the exam paper answers; version and date are synchronized; signature and receipt are complete | Compare the order of the top few items before and after enabling rerank, verify the effect of `usingReRank`, and verify the rubric version and signature |
| Exception records and review conclusions | Exceptions are supported by original records, the reviewer signs, and the destination is handed to the responsible person for handling | Observe candidates and scores by `similarity` and `limit`, verify the referenced text tokens, and record the array count separately |

## Three common errors

- Symptom: The name, quantity, and date of the same exception record do not match between the specification table and the exam paper. Cause: The versions of the two materials were not synchronized, and they were not checked against the same batch during entry.
- Symptom: The grading rubric lacks a signature or receipt, and the review conclusion is not supported by original records. Cause: A signature was missed in the circulation step, and the receipt was not archived with the materials.
- Symptom: The same question cannot be recalled when rephrased, and although there are many candidates, the ones ranked first are all irrelevant. Cause: The retrieval mode does not match the material form, rerank is not enabled, or similarity filtering is too strict.

## How to verify the setup

Acceptance of this feature: test once each with synonym-rewritten questions, compare candidates and scores, then toggle rerank on and off to see the ordering of the top few items.

Business test: create an exception record and see whether it can be traced to the source material.

- In the knowledge base search test, switch `searchMode`, compare the number of candidates and scores among semantic, full-text, and hybrid, and record the array count.
- Enable and disable `usingReRank`, compare the ordering of the top few items, and verify the referenced text tokens by `similarity` and `limit`.
