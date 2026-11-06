---
title: Knowledge Base Retrieval for School Exam Question Setting and Grading: Track Progress and Check Statistics
slug: /en/industry/education-d006-c011-f015
page_type: 行业问题页
application_area: education
meta_title: School Exams | Retrieval | Progress
meta_description: School Exams: review retrieval for progress tracking. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for School Exam Question Setting and Grading: Track Progress and Check Statistics

## What this category's data looks like

This page addresses progress records and statistical verification materials in exam question setting and marking scenarios for primary and secondary schools, including three types of sources: question-setting two-way specification tables, exam papers, and scoring rubrics. The two-way specification table records the basis for question setting by knowledge block, question type, score, and difficulty distribution; the exam paper carries the question text and paper structure; the scoring rubric gives scoring points, deduction points, and scoring explanations. Materials are updated across the three stages of question setting, question review, and marking: during the question-setting stage, the specification table and draft exam paper are formed; during the question-review stage, versions are synchronized and signatures are added; during the marking stage, the scoring rubric and progress records are filled in. When these three types of materials enter the knowledge base retrieval and recall function, each participates in retrieval in the form of fragments: specification table fragments are used to verify knowledge points and score standards, exam paper fragments are used to verify question numbers and scores, and scoring rubric fragments are used to verify scoring points and receipts. Field characteristics are concentrated in record names, quantities, dates, version numbers, and signature fields. During retrieval, the paragraphs containing these fields must be retained so that subsequent nodes or humans can generate progress tables and statistical standard explanations based on candidate fragments.

## Configuration and implementation checks

The knowledge base retrieval service (retrieval node and search test) only outputs candidate fragments and similarity scores (after mode, merging, reranking, filtering, and upper-limit trimming). Progress tables and statistical standard explanations must be produced by subsequent nodes or humans. The retrieval mode switches among semantic, full-text, and hybrid. Multiple candidate paths are merged and then secondarily sorted by reranking, and finally filtered by similarity and trimmed by citation upper limit.

| Object | Check | Verification action |
| --- | --- | --- |
| Question-setting two-way specification table | Fields include knowledge block, question type, score, difficulty, and date; the signature field should be consistent with the question-review record | Retrieve specification table fragments in the search test, verify whether fields and signatures are complete, and record the number of candidates and scores |
| Exam paper | Question numbers, scores, dates, and version numbers should correspond item by item with the specification table; missing signatures or receipts indicate inconsistency | Switch `searchMode` to compare semantic and full-text recall, and see whether exam paper fragments cover question number and score fields |
| Scoring rubric | Scoring points, deduction points, receipts, and dates should be synchronized with the exam paper version, and names and quantities must not mismatch | Compare the ranking of the first few items before and after enabling reranking, and verify the names, quantities, and dates of rubric fragments and exam paper fragments |
| Progress records and statistical standard explanations | The number of records and the statistical count should be consistent; standards should be written in the header, and exceptions should be noted item by item | Use one week of records to verify the total, check whether standards and exceptions are clearly written, and record the number of candidates under `similarity` and `limit` |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match between the specification table and the exam paper. Cause: The two places were entered separately and no field-level verification was performed; retrieval candidates are only for reference, and hits and associations must be verified first.
- Phenomenon: The scoring rubric version is not synchronized, and the receipt or signature field is blank. Cause: Modifications after question review were not filled back, and the candidate fragments returned by retrieval still point to the old version; the version number and date must be manually compared.
- Phenomenon: There are many candidates, but the ones ranked first are all irrelevant, and the answer lacks key paragraphs. Cause: The retrieval mode does not match the material form, or reranking is not enabled; the mode must be switched and rankings compared.

## How to verify the setup

Acceptance of this function: test once each with synonym-rewritten questions, compare the number of candidates and `similarity` scores, then toggle reranking on and off to observe the ranking of the first few items, and record candidate differences under `searchMode`.

Business test: use one week of records to verify the total, check whether standards and exceptions are clearly written, and verify whether the number of records and the statistical count are consistent.

- In the search test, retrieve the same question using semantic, full-text, and hybrid modes respectively, record the number of candidates and scores, and verify ranking changes before and after toggling `usingReRank`.
- Extract one paragraph each from the specification table, exam paper, and scoring rubric, verify names, quantities, dates, and signatures item by item, and write inconsistencies into the exception column of the statistical standard explanation.
