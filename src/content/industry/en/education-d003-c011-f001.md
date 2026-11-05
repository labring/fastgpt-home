---
title: HTTP Integrations for School Exam Question Setting and Grading: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c011-f001
page_type: 行业问题页
application_area: education
meta_title: School Exams | HTTP | Intake
meta_description: School Exams: review HTTP for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# HTTP Integrations for School Exam Question Setting and Grading: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the scenario of primary and secondary school exam question setting and grading. The materials include three types: the question-setting two-way specification table, the exam paper, and the grading rubric. The question-setting two-way specification table comes from the question-setting team, is updated by exam session, and contains question numbers, question types, scores, cognitive levels, and the question setter's signature and date; the exam paper comes from the question review and printing stages and contains the paper's question numbers, question stems, scores, version numbers, and review signatures; the grading rubric comes from the grading team and contains question numbers, answer key points, score bands, and the grader's signature and receipt. When these three types of materials enter the question answering intake and missing-item follow-up function, the specification table serves as the baseline for question numbers and scores, the exam paper serves for paper presentation and version verification, and the grading rubric serves as the basis for scoring and for verifying signatures and receipts. Common fields in the materials include name, quantity, date, version number, signature, and receipt. The update cadence advances by exam session or review session, and the same record across materials must be aligned item by item.

## Configuration and implementation checks

This step is executed by the HTTP node in the workflow, which outputs the response body, status code, and returned fields. The intake records and the completed follow-up questions are parsed from the response by subsequent nodes, or handled by an external system according to the agreement to finish the process. The HTTP node is only responsible for sending requests to the target address. Path parameters, request body, and request headers can all use variable placeholders, and the variables come from global variables, system variables, or the output of preceding nodes.

| Object | Check | Verification action |
| --- | --- | --- |
| Question-setting two-way specification table | Check whether question numbers, question types, scores, cognitive levels, and the question setter's signature and date are complete | In the variable panel, check the source of each placeholder and confirm that the question number and score fields can be traced to the specific source in the specification table |
| Exam paper | Check whether the paper's question numbers, question stems, scores, version number, and review signature are consistent with the specification table | Use a sample request to compare the return and check whether the name, quantity, and date are aligned item by item with the specification table |
| Grading rubric | Check whether question numbers, answer key points, score bands, and the grader's signature and receipt are complete | In the request preview, view the fully rendered address and check the `Authorization` request header and the source of its value |
| HTTP request return | Check whether the status code and returned fields are returned according to the external interface agreement | Check the correspondence between `responseData` and `variables`, and confirm the empty-field and timeout cases |

## Three common errors

- Symptom: The question numbers, scores, and dates of the same record do not match between the specification table and the exam paper. Cause: The two materials are maintained separately and are not synchronized and checked by exam session.
- Symptom: The exam paper version referenced by the grading rubric is inconsistent with the current paper version. Cause: The version is not synchronized, and the old rubric is still in use.
- Symptom: The grading rubric lacks the grader's signature or receipt. Cause: The signature and receipt step is not closed-loop, and the materials enter circulation before being completed.

## How to verify the setup

Acceptance of this function: preview the rendered request, check the status code and returned fields, and then compare the result against a sample; at the same time, check the value sources and correspondence of the three identifiers `Authorization`, `variables`, and `responseData`.

Business test: submit a question that lacks key information and see whether it asks a follow-up question before answering.

- In the variable panel, check the source of each placeholder and confirm that the question number, score, and date fields can be traced to the specific source in the specification table, exam paper, or grading rubric.
- In the request preview, view the fully rendered address, check the request header names and the source of their values, and use a sample request to compare the returned fields.
