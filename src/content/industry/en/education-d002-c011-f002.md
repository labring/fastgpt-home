---
title: Context and Token Budgets for School Exam Question Setting and Grading: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c011-f002
page_type: 行业问题页
application_area: education
meta_title: School Exams | Context & Tokens | Checks
meta_description: School Exams: review context & tokens for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Context and Token Budgets for School Exam Question Setting and Grading: Compare Documents and Locate Differences

## What this category's data looks like

In the scenario of exam question setting and grading in primary and secondary schools, materials include three types: the question-setting two-way specification table, the exam paper, and the grading rubric. The question-setting two-way specification table comes from the teaching and research group's question-setting plan and is updated by exam batch; its fields include question number, knowledge point, cognitive level, score, and question setter's signature. The exam paper comes from the question-setting group's final draft and is updated by subject and version number; its fields include question type, question number, question stem, options, answer, score, and reviewer's signature. The grading rubric comes from the grading group and is updated by grading standard version; its fields include question number, scoring point, score band, deduction explanation, and reviewer's receipt. When these three types of materials enter this function, the specification table and the exam paper serve as the field comparison baseline, and the grading rubric serves as the basis for checking the grading criteria, used to find out whether the name, quantity, and date of the same record are consistent across the two materials, whether the versions are synchronized, and whether the signatures or receipts are complete.

## Configuration and implementation checks

This part is executed by application settings (response limit, etc.), which output the length of a single answer and the range of context that can be accommodated. The "discrepancy list" is then completed by the model. The response limit is controlled by a slider for the length of a single answer; if set too low, the answer will be truncated, and if set too high, consumption will increase.

| Object | Check | Verification action |
| --- | --- | --- |
| Question-setting two-way specification table | Check with the exam paper whether the question number, knowledge point, score, date, and question setter's signature are consistent | Compare question numbers and scores one by one, record fields whose name, quantity, and date do not match, check signatures and receipts, and check whether `maxContext` can accommodate the entire table |
| Exam paper | Check with the grading rubric whether the question number, question type, score, answer, and reviewer's signature are consistent | Align the two materials by question number, mark entries whose versions are not synchronized, check items missing signatures or receipts, and pay attention to the impact of `maxResponse` on the length of the discrepancy list |
| Grading rubric | Check with the specification table whether the scoring points, score bands, and reviewer's receipt are consistent | Compare scoring points and score bands, record differences in name, quantity, and date of the same record across the two materials, use `quoteMaxToken` to check quoted text tokens, and record the number of array items separately |

## Three common errors

- Phenomenon: The question number or score of the same record does not match between the specification table and the exam paper. Cause: The two materials are updated separately, versions are not synchronized, and there is no unified verification step.
- Phenomenon: The score bands in the grading rubric are inconsistent with the answers on the exam paper. Cause: The grading standard version is not synchronized, the reviewer's receipt is missing, and the discrepancy has not been located.
- Phenomenon: The signature of the question setter or reviewer is missing at the end of the material. Cause: Signatures and receipts were not archived in sync with the materials, so the responsible fields cannot be confirmed during verification.

## How to verify the setup

This function's acceptance: ask a question that requires a long answer, see whether the ending is complete, confirm that the response limit matches the answer length required by the page, and that the `maxResponse` setting does not affect the amount of quoted content.

Business test: use a real record to find fields inconsistent with the ledger, check the name, quantity, and date, and submit to the reviewer for confirmation and write-back.

- In application settings, check the response limit switch and slider position, and ask a question that requires a long answer to see whether the ending is complete.
- Compare the usage of two runs, check the change in single-run usage after adjusting the limit, and confirm the respective scope of `maxContext` and `quoteMaxToken`.
