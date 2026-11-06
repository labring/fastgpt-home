---
title: Context and Token Budgets for Self-Study Exam Records and Graduation Review: Find Supporting Evidence
slug: /en/industry/education-d001-c054-f002
page_type: 行业问题页
application_area: education
meta_title: Self-Study Exams | Context & Tokens | Evidence
meta_description: Self-Study Exams: review context & tokens for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Context and Token Budgets for Self-Study Exam Records and Graduation Review: Find Supporting Evidence

## What this category's data looks like

This page addresses the self-taught examination registration records and graduation review scenario; the materials include three types: registration records, course pass certificates, and graduation application forms. Registration records document the candidate's identity information, examination registration number, major name, and enrollment status, with fields including name, ID number, registration date, change records, and handler signature; course pass certificates document the course code, course name, passing score, examination date, and seal of the examining institution; graduation application forms document the intended graduation major, number of courses, total credits, application date, and review receipt. When these three types of materials enter the response limit feature, registration records and course pass certificates serve as the basis sources, and the graduation application form serves as the context for the review conclusion, based on which the model generates basis entries that can be traced back to the original text. Materials are updated by examination session and review batch; field names, counts, dates, and signatures must be aligned with the current effective version.

## Configuration and implementation checks

This step is executed by the application settings (response limit, etc.), which output the length of a single answer and the range of context that can be accommodated. The "basis entries that can be traced back to the original text" are then completed by the model. The response limit uses a slider to control the length of a single answer; if set too low, the answer will be truncated, and if set too high, consumption will increase.

| Object | Check | Verification action |
| --- | --- | --- |
| Registration records | Fields include name, ID number, registration date, and handler signature; dates and signatures must be consistent with the current effective version | In the application settings, check the response limit switch and slider position to confirm that the single-answer length matches the context range; check whether the name, ID number, registration date, and signature are complete |
| Course pass certificates | Fields include course code, course name, passing score, examination date, and seal of the examining institution; names and counts must match the registration records | Ask a question that requires a long answer and see whether the ending is complete; check the course code, course name, passing score, and examination date; record the number of citations, check the `quoteMaxToken` budget of the cited text, and record the array count separately |
| Graduation application form | Fields include intended graduation major, number of courses, total credits, application date, and review receipt; the number of courses and credits must match the course pass certificates | Compare the usage of two runs; check the intended graduation major, number of courses, total credits, and review receipt; confirm whether the length ranges corresponding to `maxContext` and `maxResponse` match the page requirements |
| Response limit | Matches the answer length required by the page; the single-answer length and the range of context that can be accommodated are determined by the slider | In the application settings, check the switch and slider position to confirm the single-answer length corresponding to `maxResponse`; observe whether the answer breaks off mid-sentence and whether the length clearly exceeds what is needed |

## Three common errors

- Symptom: the same candidate's name is written differently on the registration records and the course pass certificates. Cause: the two materials were entered at different times and were not checked for consistency against the current effective version.
- Symptom: the number of courses on the graduation application form does not match the count on the course pass certificates. Cause: the course pass certificates contain retake records, and the statistical criteria for counting courses have not been unified.
- Symptom: the registration records lack a handler signature or the graduation application form lacks a review receipt. Cause: the material circulation step was not backfilled, and signatures and receipts were not updated with the batch.

## How to verify the setup

Feature acceptance: ask a question that requires a long answer, see whether the ending is complete, and confirm that the single-answer length and the range of context that can be accommodated meet the page requirements.

Business test: ask a cross-material basis question, see whether the answer provides traceable sources, check the number of citations and the `quoteMaxToken` budget, and record the array count separately.

- In the application settings, check the response limit switch and slider position, confirm that the single-answer length matches the context range, and observe whether the answer ending is complete.
- Compare the usage of two runs, check the lengths and budgets corresponding to `maxContext`, `quoteMaxToken`, and `maxResponse`, and record the number of citations.
