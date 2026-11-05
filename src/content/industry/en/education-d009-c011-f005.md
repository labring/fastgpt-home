---
title: Multi-Turn Conversation and Prompts for School Exam Question Setting and Grading: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c011-f005
page_type: 行业问题页
application_area: education
meta_title: School Exams | Conversation | Multilingual
meta_description: School Exams: review conversation for multilingual work. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Multi-Turn Conversation and Prompts for School Exam Question Setting and Grading: Handle Multilingual Materials and Terminology

## What this category's data looks like

This page addresses the scenario of exam question setting and marking in primary and secondary schools; the materials include the question-setting two-way specification table, exam papers, and marking rubrics. The specification table comes from the question-setting group and is updated per exam session; its fields include question number, assessment point, cognitive level, score, question type, question setter, date, and signature. The exam paper comes from the question review and proofreading stage; its fields include title, question order, question stem, options, answer, score, version number, date, and signature. The marking rubric comes from the marking group; its fields include question number, answer key points, scoring points, marking notes, receipt, date, and signature. When these three types of materials enter multilingual materials and terminology processing, the specification table serves as the index of terminology and assessment points, the exam paper serves as the body text for comparing translated names with question stems, and the marking rubric serves as the basis for checking scoring terminology and receipts; the same term must be written consistently across the three materials and its translated name must be able to refer back to the original text.

## Configuration and implementation checks

This part is executed by the memory turns and prompt configuration in the application settings, outputting the range of historical messages referenced and the answer constraints. Memory turns control how many previous turns of dialogue can be referenced at most when answering; if the value is too small, the preceding text cannot be used, and if the value is too large, irrelevant content is brought in and consumption increases. "Unified terminology list and comparison draft" is then completed by the model, while the external entry point and authorization are handled by the publishing service and file permissions.

| Object | Check | Verification action |
| --- | --- | --- |
| Question-setting two-way specification table | Assessment point terminology, question numbers, scores, dates, and signatures must be traceable item by item between the specification table and the exam paper | Check the current memory turns value in the application settings, run a trial with two consecutive questions, and compare whether the question numbers, scores, dates, and signatures in the specification table and the exam paper are consistent |
| Exam paper | The same term must be written consistently throughout, the translated name must be able to refer back to the original text, and the version number and date must be synchronized with the specification table | Check each term in `messages` back against the specification table and marking rubric, record differences in version number and date, and list separately any items missing a signature or receipt |
| Marking rubric | Scoring terminology, answer key points, receipts, and dates must match the exam paper and specification table | Register terminology and receipt status in `variables`, compare the usage records of two runs, and check whether the names, quantities, and dates in the rubric and exam paper are consistent |

## Three common errors

- Phenomenon: the same term is written differently in the specification table and the exam paper, and the translated name cannot refer back to the original text. Cause: terminology was not registered uniformly, and question setting and proofreading each continued to use old drafts.
- Phenomenon: the exam paper's version number and date do not match the specification table, and the marking rubric still assigns scores according to the old version. Cause: the version was not synchronized, and missing receipts and signatures led to changes not being confirmed.
- Phenomenon: during consecutive follow-up questions, the second question uses a reference but the answer does not address the question, and responses become slower with increased consumption. Cause: the memory turns value does not match the range of preceding text required by the question.

## How to verify the setup

This feature's acceptance: ask two consecutive follow-up questions, see whether the second question correctly carries forward the reference from the first question, and check whether the range of historical messages referenced in `messages` and the answer constraints match.

Business test: sample three terms and check whether their writing is consistent throughout, confirm that the translated names can refer back to the original text, and align the names, quantities, dates, and signatures of the specification table, exam paper, and marking rubric item by item.

- Check the current memory turns value in the application settings, match it with the range of preceding text required by the question, and compare the usage records of two runs.
- Run a trial with two consecutive questions, check whether the second round correctly carries forward the reference from the first round, and register terminology and receipt status in `variables`.
