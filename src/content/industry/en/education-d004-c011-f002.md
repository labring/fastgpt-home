---
title: Context and Token Budgets for School Exam Question Setting and Grading: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c011-f002
page_type: 行业问题页
application_area: education
meta_title: School Exams | Context & Tokens | Handover
meta_description: School Exams: review context & tokens for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Context and Token Budgets for School Exam Question Setting and Grading: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page is for the exam question setting and marking scenario in primary and secondary schools. Materials include the question setting two-way specification table, exam papers, marking rubrics, handover records, and receipts. The question setting two-way specification table registers item by item according to subject, question type, ability level, score, and question number source, with complete dates and signatures of the question setters; exam papers are registered by question number, question stem, answer, score, and page number, and the version number and date must be consistent with the specification table; marking rubrics are registered by question number, scoring point, score allocation, and grade description, and signatures and dates must be consistent with the exam papers; handover records register the transferor, receiver, handover date, and receipt status. The material source is batch submission by the question setting group and the marking group, and the update rhythm is once before each round of question setting and marking, with version numbers and dates synchronized when revisions occur. When entering this function, the specification table and exam papers serve as context materials, while the marking rubrics and handover records serve as materials pending receipt. The response limit is used to control the length of a single answer, so that drafts and handover records can be handed to the next stage for receipt after the fields are complete, the responsible persons are clear, and the version and date are consistent.

## Configuration and implementation checks

This part is executed by application settings (response limit, etc.), outputting the length of a single answer and the range of context that can be accommodated. "Material drafts and handover records that can be issued" are then completed by the model. The response limit uses a slider to control the length of a single answer; if set too low, the answer will be truncated, and if set too high, consumption will increase.

| Object | Check | Verification action |
| --- | --- | --- |
| Question setting two-way specification table | Subject, question type, ability level, score, question number source, date, and question setter signature are complete, and correspond item by item with the exam paper question numbers | In the application settings, check the position of the response limit slider, and check item by item against the question numbers, scores, dates, and signatures of the specification table and exam papers; check whether `maxResponse` matches the required answer length |
| Exam paper | Question number, question stem, answer, score, page number, and version number are consistent with the specification table, and dates and signatures are complete | Ask a question that requires a long answer and see whether the ending is complete, and check whether the names, quantities, and dates of the exam paper and specification table match; record the context range covered by `maxContext` |
| Marking rubric | Question number, scoring point, score allocation, and grade description are consistent with the exam paper, and signatures and dates are complete | Check the question numbers, score allocations, dates, and signatures of the marking rubric and exam paper; record the tokens of the quoted text, record the number of array entries separately, and `quoteMaxToken` is only used as the budget for quoted content |
| Handover record and receipt | Transferor, receiver, handover date, and receipt status are clear, and version and date are consistent | Go through a handover and see whether missing items are blocked; check whether the dates, versions, and signatures of the record and receipt are synchronized |

## Three common errors

- Symptom: The names, quantities, and dates of the same record do not match between the specification table and the exam paper. Cause: Fields were not synchronized from the same version source during drafting, and item-by-item verification was not done before handover.
- Symptom: The marking rubric and exam paper versions are not synchronized, and differences appear in question numbers or score allocations. Cause: After revision, only one material was updated, while the other still used the old version number and date.
- Symptom: The handover record lacks a signature or receipt, and the next stage cannot receive it. Cause: The transferor, receiver, and date were not fully filled in, and the receipt status was not confirmed.

## How to verify the setup

This function's acceptance: ask a question that requires a long answer and see whether the ending is complete; check whether the position of the response limit slider matches the required answer length, and record the change in single-use consumption.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked; check whether the fields, dates, and signatures of the specification table, exam papers, marking rubrics, and handover records are complete and consistent.

- In the application settings, check the response limit switch and slider position, ask a question that requires a long answer to see whether the ending is complete, and compare the consumption changes between two runs.
- Draft the specification table, exam papers, marking rubrics, and handover records according to the template, check item by item the names, quantities, dates, versions, and signatures, and go through a handover to see whether missing items are blocked.
