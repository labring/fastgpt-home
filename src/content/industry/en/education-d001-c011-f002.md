---
title: Context and Token Budgets for School Exam Question Setting and Grading: Find Supporting Evidence
slug: /en/industry/education-d001-c011-f002
page_type: 行业问题页
application_area: education
meta_title: School Exams | Context & Tokens | Evidence
meta_description: School Exams: review context & tokens for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Context and Token Budgets for School Exam Question Setting and Grading: Find Supporting Evidence

## What this category's data looks like

In the scenario of exam question setting and grading in primary and secondary schools, the materials entering the business basis query mainly fall into three categories: the two-way specification table for question setting, the exam paper, and the grading rubric. The specification table carries the distribution of test points and the ratio of question types, the exam paper carries the question stems and scores, and the grading rubric carries the scoring points and deduction explanations. The three are usually updated by semester or exam batch, and the fields include name, quantity, date, signature, and receipt. When the materials enter this function, the specification table and grading rubric serve as basis sources, and the exam paper serves as the object to be checked, each retaining its original text location for subsequent back-reference citations. The update rhythm is synchronized with the exam schedule, and old versions need to be clearly marked as to whether they are current, to avoid mixing with the current version.

## Configuration and implementation checks

This part is executed by application settings (response limit, etc.), which output the length of a single answer and the range of context that can be accommodated. "Basis items that can be back-referenced to the original text" are then completed by the model, and entry and authorization are handled by the publishing service and file permissions.

| Object | Check | Verification action |
| --- | --- | --- |
| Response limit | Matches the answer length required by the page; the slider position determines how much content a single answer can accommodate | Check the switch and slider position in application settings, and confirm that the `maxResponse` value is consistent with the expected length |
| Two-way specification table for question setting | Whether the test point names, number of question types, question-setting date, and signature match the exam paper and grading rubric | Compare the name, quantity, and date of the specification table and exam paper item by item, and check whether the signature and receipt are complete |
| Grading rubric | Whether the scoring points and deduction explanations are consistent with the exam paper's question stems and scores, and whether the version is current | Check the corresponding items in the rubric and exam paper, and confirm that the version is marked as current and has no missing signatures |
| Quoted content | Whether the tokens of the quoted text are within the `quoteMaxToken` budget; the number of array items is recorded separately | Check the token usage of the quoted paragraphs, and record the number of quoted items and the `maxContext` range |

## Three common errors

- Symptom: The name or quantity of the same test point does not match in two materials. Cause: The materials were revised separately without cross-checking.
- Symptom: The grading rubric is still an old version and does not match the current exam paper. Cause: The version was not synchronized and the current status was not marked.
- Symptom: The specification table lacks a signature or receipt, and the basis items cannot be back-referenced. Cause: Signature and receipt archiving were omitted in the circulation process.

## How to verify the setup

Acceptance of this function: ask a question that requires a long answer, see whether the end of the answer is complete, and check whether the `maxResponse` and `maxContext` settings match the expected length.

Business test: ask a basis question that spans materials, and see whether the answer gives a back-referenceable source.

- Check the response limit switch and slider position in application settings, and confirm that `maxResponse` matches the answer length required by the page.
- Compare the name, quantity, date, and signature of the specification table, exam paper, and grading rubric, and confirm that the version is current and the items can be matched to the original text.
