---
title: Citations and Source Traceability for School Exam Question Setting and Grading: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c011-f010
page_type: 行业问题页
application_area: education
meta_title: School Exams | Citations | Review
meta_description: School Exams: review citations for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for School Exam Question Setting and Grading: Trace Exceptions and Review Results

## What this category's data looks like

This page focuses on three types of materials in the exam question setting and grading scenario for primary and secondary schools: the two-way specification table for question setting, the exam paper, and the scoring rubric. These materials are updated by the teaching and research group and the question-setting group at checkpoints before, during, and after the exam, and their fields include question number, knowledge point, ability level, score, scoring point, question setter, reviewer, date, and signature column. When entering the knowledge base retrieval node, the two-way specification table plays the traceability role for question-setting structure and coverage of test points, the exam paper plays the traceability role for question statements and score presentation, and the scoring rubric plays the traceability role for scoring points and review basis. The versions and dates of the three types of materials need to corroborate each other, and the names, quantities, and dates of the same record in the specification table, exam paper, and scoring rubric must be consistent. After materials are updated, old versions should be replaced synchronously; missing signatures and receipts will directly affect the traceability of the review conclusion.

## Configuration and implementation checks

This link is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and source identifier, and the length can be 0. The exception list and review conclusion are completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Two-way specification table for question setting | Question number, knowledge point, score, question setter and reviewer signatures, and date must correspond to the exam paper and scoring rubric | Compare the original specification table fragments and source identifiers one by one in the citation output, and record field items that are consistent and inconsistent |
| Exam paper | Question statement names, quantities, and dates must be consistent with the specification table and scoring rubric, and the version must be the currently effective version | Open the citation superscript to trace back to the original exam paper text, check question numbers and scores, and inspect the version date and signature column |
| Scoring rubric | Scoring points, scoring standards, reviewer signature, and receipt must be complete, and must correspond one-to-one with the exam paper question numbers | Use `quoteList` to view cited fragments, check rubric entries against exam paper question numbers, and inspect signatures and receipts |
| Cited content output | The number of returned items is consistent with the matched materials; being empty is also normal, and the chain continues to run through | Try running a question with no matching materials, see that the array is empty while the chain continues, and record the array length and the `quoteMaxToken` budget |

## Three common errors

- Symptom: the names, quantities, and dates of the same record do not match between the specification table and the exam paper. Cause: question setting and question review were updated separately, without field-level comparison and version synchronization.
- Symptom: the scoring rubric version was not synchronized, and old scoring points are still cited. Cause: after material replacement, the currently effective version and date were not checked, and cited fragments trace back to the old text.
- Symptom: the review conclusion lacks a signature or receipt, making it impossible to trace the handling person. Cause: during the review step, items were not confirmed one by one according to the material signature column, and the ledger did not record the receipt number.

## How to verify the setup

This feature's acceptance: ask a question with original-text basis, and check whether the citation array and superscript can trace back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through.

Business test: create an exception record, see whether the source material can be traced, and check the fields, dates, and signatures of the specification table, exam paper, and scoring rubric.

- In the node, check whether the selected knowledge base collections and their vector models are consistent, and open the search parameter panel to check the values item by item.
- Use `responseData` (non-streaming module results returned with detailed output enabled) to view the number of items in the citation array, record the array length separately, and check `quoteMaxToken` as the cited content budget; do not compare the two for equality.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
