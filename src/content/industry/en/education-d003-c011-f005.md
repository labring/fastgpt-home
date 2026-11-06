---
title: Multi-Turn Conversation and Prompts for School Exam Question Setting and Grading: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c011-f005
page_type: 行业问题页
application_area: education
meta_title: School Exams | Conversation | Intake
meta_description: School Exams: review conversation for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Multi-Turn Conversation and Prompts for School Exam Question Setting and Grading: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the scenario of primary and secondary school exam question setting and grading. The materials include three types: the question-setting two-way specification table, the exam paper, and the grading rubric. The question-setting two-way specification table usually contains question number, content dimension, ability level, question type, score, estimated difficulty, and the question setter's signature and date; the exam paper contains question number, question stem, options or answer area, score, answer, and the question setter's and reviewer's signatures; the grading rubric contains question number, scoring points, score, level descriptions, and the grader's signature and receipt. In the intake stage, the three types of materials respectively serve as the task basis, the answer carrier, and the scoring basis. When entering Q&A intake and missing-item follow-up, they need to be cross-checked against one another by the name, quantity, date, version, and signature status of the same record. In terms of update cadence, the specification table and grading rubric are often revised once after question setting and once after review, while the exam paper may still undergo proofreading changes after finalization, so version synchronization and signature receipts are common gaps. In terms of field characteristics, the same question number may have inconsistent names in the specification table and the exam paper, the same score may not match in quantity between the exam paper and the grading rubric, and dates and signature fields are often missing, so they need to be identified and followed up on first during intake.

## Configuration and implementation checks

This part is executed by the memory turns and prompt configuration in the application settings, and outputs the reference range of historical messages and the answer constraints. "Intake records and completed follow-up items" are then completed by the model. The memory turns control how many previous dialogue turns can be referenced at most when answering. If the value is too small, the preceding context cannot be used; if too large, irrelevant content is brought in and consumption increases.

| Object | Check | Verification action |
| --- | --- | --- |
| Memory turns | Matches the range of preceding context required by the question | Check the current value in the application settings, and run a trial with two consecutive questions to confirm that the second round can carry forward the reference from the first round; at the same time, check the actual number of historical entries brought into `messages` |
| Question-setting two-way specification table | Question number, content dimension, ability level, question type, score, estimated difficulty, and question setter's signature and date are complete, and the name of the same question number is consistent with the exam paper | Compare the specification table and the exam paper item by item by question number, and check whether the name, quantity, and date match; record missing signatures or receipts as missing items |
| Exam paper | Question number, question stem, options or answer area, score, answer, and question setter's and reviewer's signatures are complete, and the version is synchronized with the specification table | Check the exam paper version number and date, and check whether the score and question type of the same question number are consistent between the specification table and the exam paper; for missing items, follow up first before answering |
| Grading rubric | Question number, scoring points, score, level descriptions, and grader's signature and receipt are complete, and consistent with the exam paper score | Compare the grading rubric and the exam paper by question number for score and number of scoring points; record unsynchronized versions or missing signatures and receipts as follow-up items to be completed |

## Three common errors

- Phenomenon: the same question number has inconsistent names or scores in the specification table and the exam paper, and after follow-up the answer is still given based on a single material. Cause: during intake, the two materials were not compared item by item by question number, and missing items were not identified.
- Phenomenon: the grading rubric and the exam paper versions are not synchronized, and the number of scoring points or dates for the same scoring point are inconsistent. Cause: changes after finalization were not written back to the other material, and the version number and date were not checked.
- Phenomenon: the question setter's or grader's signature or receipt is missing, yet the intake record is still circulated as complete material. Cause: missing-item follow-up did not cover the signature and receipt fields, and the follow-up step missed items.

## How to verify the setup

Acceptance of this feature: use two consecutive follow-up questions to see whether the second question carries forward the reference from the first question, and check the historical range brought into `messages` and the conversation record corresponding to `chatId` to confirm that the answer constraints take effect.

Business test: ask a question that lacks key information and see whether it follows up first before answering.

- Check the current value of memory turns in the application settings, run a trial with two consecutive questions, compare the usage records of the two runs, and confirm that usage changes accordingly after adjusting the turns.
- Compare the question-setting two-way specification table, exam paper, and grading rubric item by item by question number for name, quantity, date, version, and signature receipt, write missing items into the intake record, and forward them to the responsible person for handling.
