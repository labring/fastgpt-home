---
title: Vector Models and Indexes for School Exam Question Setting and Grading: Find Supporting Evidence
slug: /en/industry/education-d001-c011-f004
page_type: 行业问题页
application_area: education
meta_title: School Exams | Vector Indexes | Evidence
meta_description: School Exams: review vector indexes for evidence lookup. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Vector Models and Indexes for School Exam Question Setting and Grading: Find Supporting Evidence

## What this category's data looks like

This page addresses business basis queries in the scenario of exam question setting and grading in primary and secondary schools. The materials include three types: the question-setting two-way specification table, the exam paper, and the grading rubric. The question-setting two-way specification table contains question number, assessment point, question type, score, cognitive level, question setter's signature and date; the exam paper contains question number, question stem, options, answer, score, question setter's and reviewer's signatures; the grading rubric contains question number, scoring point, score band, deduction explanation, review signature and effective date. The three types of materials are updated by semester or exam batch, and the version is marked as current by signature and date. When entering this function, the two-way specification table and the grading rubric serve as basis sources, and the exam paper serves as the object to be checked; together the three support the recall and back-reference of basis entries across materials. Field verification focuses on whether names, quantities, dates and signatures are consistent, whether versions are synchronized, and whether receipts are complete.

## Configuration and implementation checks

This step is executed by the index service and the vector database, outputting vectors and index status (whether recall is possible, whether data in the same group is merged). "Basis entries that can be back-referenced to the original text" is then completed by subsequent AI nodes, code nodes, or manual work (retrieval and citation trimming only take supporting materials). Vectors are stored in the vector database, and the original data is stored in the business database data table with index fields recording multiple vector identifiers; retrieval first recalls vectors, then merges back to the original data by identifier, and for the same group of data takes the highest score.

| Object | Check | Verification action |
| --- | --- | --- |
| Index model | Consistent with the vector model actually used by the knowledge base; after changing the model, rebuild is triggered only for data that has already completed indexing | Check the index model in the knowledge base settings, and view the data range covered by the rebuild task records |
| Index field of the data row | All multiple vector identifiers of one piece of data are present, the status is indexed, and data in the same group is merged after retrieval taking the highest score | Open one data row to check the index field, and retrieve once to see whether the same group is merged |
| Question-setting two-way specification table | Question number, assessment point, score, and cognitive level match the exam paper and grading rubric, and the signature and date are the current version | Compare question numbers and scores one by one, check the signature and date, and confirm that versions are synchronized |
| Grading rubric | Scoring points, score bands, and deduction explanations are consistent with the exam paper answers, and the review signature and effective date are complete | Extract cross-material entries, and check whether names, quantities, dates and receipts are consistent |

## Three common errors

- Symptom: duplicate entries appear in retrieval results. Inspect the following: multiple vector identifiers of the same group of data are not merged, or the original data index field records are incomplete.
- Symptom: recall quality drops after changing the model. Inspect the following: the rebuild task only covers data that has already completed indexing; data pending indexing does not participate in recall, so indexing must be completed before rebuilding.
- Symptom: the question number, score, and date of the same record do not match between the two-way specification table and the grading rubric. Inspect the following: versions are not synchronized, or signatures or receipts are missing.

## How to verify the setup

This function's acceptance: sample one data row to check the index field, confirm that multiple vector identifiers are all present and the status is indexed; then retrieve once to see whether data in the same group is merged and whether the score takes the highest; view the data range covered by the rebuild task records.

Business test: ask a cross-material basis question, see whether the answer gives a back-referenceable source, and check the number of citations, the tokens of the cited text, and the `limit` budgets; array counts are recorded separately.

- In the knowledge base settings, check whether the index model is consistent with the vector model actually used by the knowledge base, and view the data range covered by the rebuild task records.
- Open one data row to check the index field, confirm that multiple vector identifiers are all present and the status is indexed, then retrieve once to see whether the same group is merged.
