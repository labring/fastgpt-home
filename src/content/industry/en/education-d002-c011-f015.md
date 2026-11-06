---
title: Knowledge Base Retrieval for School Exam Question Setting and Grading: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c011-f015
page_type: 行业问题页
application_area: education
meta_title: School Exams | Retrieval | Checks
meta_description: School Exams: review retrieval for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for School Exam Question Setting and Grading: Compare Documents and Locate Differences

## What this category's data looks like

This page is for primary and secondary school exam question setting and grading scenarios. Materials include three types: the question-setting two-way specification table, the exam paper, and the grading rubric. The specification table lists assessment objectives, score values, difficulty, and corresponding question numbers by knowledge point and question type; the exam paper provides question stems, options, answers, and score values; the grading rubric specifies per question the scoring points, deduction points, and signature fields. Materials come from the question-setting team, reviewers, and the academic affairs office, and are updated by exam session. Within the same exam session, there are versions such as draft, submitted for review, and final. When these three enter knowledge base retrieval and recall, the specification table serves as the baseline for objectives and score values, the exam paper serves as the baseline for question content and answers, and the grading rubric serves as the baseline for scoring and signatures, together forming the comparison draft for field verification and discrepancy localization.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The discrepancy list is then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Question-setting two-way specification table | Corresponds item by item with the exam paper on question numbers, score values, and assessment objectives, and corresponds with the grading rubric on scoring points | In the search test, initiate retrieval using question numbers or knowledge points, verify the question number, score value, and objective fields in candidate snippets, and record the number of candidates and scores |
| Exam paper | Consistent with the specification table on question numbers, quantity, date, and signature, and consistent with the grading rubric on answers and score values | Switch `searchMode` to compare semantic, full-text, and hybrid recall, and verify the question stem, answer, date, and signature field fields |
| Grading rubric | Corresponds with the exam paper on question numbers, scoring points, and deduction points, and corresponds with the specification table on score distribution | Compare the order of the top few candidates before and after enabling `usingReRank`, and verify the scoring points, deduction points, and signature receipt fields |
| Exam session version record | Two materials for the same exam session are consistent on name, quantity, and date, versions are synchronized, and signature receipts are complete | Retrieve by exam session and date, verify the version identifiers and signature receipts of draft, submitted for review, and final, and record inconsistent fields |

## Three common errors

- Phenomenon: The score value for the same question does not match between the exam paper and the grading rubric. Cause: The versions of the two materials are not synchronized, or the rubric was not updated after the specification table score value was adjusted.
- Phenomenon: The question number, quantity, or date for the same record does not match between the specification table and the exam paper. Cause: The question-setting team and reviewers each maintain their own records, lacking unified write-back.
- Phenomenon: The grading rubric lacks a signature or receipt. Cause: The review process was not completed, the final version did not overwrite the old draft, and the retrieval hit is still a draft snippet.

## How to verify the setup

Acceptance of this feature: Test once each with synonym-rewritten questions, compare candidates and `similarity` scores, then toggle rerank to observe the order of the top few; record the number of candidates and scores, and when a citation limit is involved, verify the tokens of the cited text, recording the array count separately.

Business test: Use one real record to find fields inconsistent with the ledger, and verify the name, quantity, date, and signature receipt.

- In the search test, initiate retrieval by question number, knowledge point, and exam session respectively, record the number of candidates and scores, and annotate the material name and version corresponding to the hit snippets.
- Switch `searchMode` and `usingReRank`, compare changes in candidate order, and observe the number of cited items and content completeness after trimming according to `limit`.
