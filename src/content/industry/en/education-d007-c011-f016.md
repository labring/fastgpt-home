---
title: Forms and User Interaction for School Exam Question Setting and Grading: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c011-f016
page_type: 行业问题页
application_area: education
meta_title: School Exams | Forms | Review
meta_description: School Exams: review forms for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for School Exam Question Setting and Grading: Trace Exceptions and Review Results

## What this category's data looks like

This page addresses the scenario of exam question setting and grading in primary and secondary schools. The core materials include the question-setting two-way specification table, the exam paper, and the scoring rubric. All three are produced in batches and continuously revised along the rhythm of question setting, question review, grading, and review. The specification table records knowledge points, question types, score distribution, and the question setter's signature date; the exam paper records question numbers, question stems, answers, and the question reviewer's signature; the scoring rubric records scoring points, scoring rules, and the reviewer's signature. When the materials enter the form input function, the specification table plays the role of source anchoring, the exam paper plays the role of verifying question statements and scores, and the scoring rubric plays the role of verifying scoring and signature receipts. The field names, quantities, dates, and signatures of the three must be compared item by item during exception tracing. If any material version is not synchronized or lacks a signature receipt, the exception record cannot be traced back to the source material.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The "exception list and review conclusion" is completed by subsequent nodes or manually afterward. After the form input node is triggered, the conversation enters the interaction state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Question-setting two-way specification table | The name, quantity, date, and signature must be aligned item by item with the exam paper and scoring rubric | In the node configuration, check the field names one by one, confirm that the specification table name, number of knowledge points, question-setting date, and question setter signature fields are consistent with the original materials, and use `formInput` to reference the fields in a test run |
| Exam paper | Question numbers, question stems, scores, and question reviewer signature must not fail to match the same record in the specification table and scoring rubric | Check the required settings one by one, confirm that question numbers, scores, question review date, and question reviewer signature are required, and after submission subsequent nodes reference `selectResult` to obtain the corresponding field values |
| Scoring rubric | Scoring points, scoring rules, reviewer signature, and receipt must be synchronized with the versions of the exam paper and specification table | Reference this field in subsequent nodes and run a test to confirm that the number of scoring points, scoring rules, review date, and reviewer signature can be traced back to the source materials. If the signature or receipt is missing, submission must not be allowed |
| Exception list and review conclusion | The exception has original record support and the reviewer's signature, and is handed to the person in charge for handling | Create an exception record, check whether the name, quantity, and date in the list can be traced back item by item in the specification table, exam paper, and scoring rubric, and confirm that the reviewer signature field has been filled in |

## Three common errors

- Symptom: The same exception record has mismatched knowledge point names and question quantities in the specification table and exam paper. Cause: The form fields do not correspond one-to-one with the material fields, and after submission subsequent nodes obtain misaligned values.
- Symptom: The scoring rubric version is not synchronized, and the review conclusion references the old scoring rules. Cause: After the materials are revised, the form is not resubmitted, and the workflow state recorded in the interaction state still points to the old field values.
- Symptom: The exception list lacks the reviewer's signature or receipt, and the person in charge cannot handle it. Cause: Key material fields are not marked as required, so submission is possible even when required items are empty, and the conversation remains in the interaction state without being noticed.

## How to verify the setup

Acceptance of this function: fill out the form once and submit it, check the field values obtained by subsequent nodes, and confirm that the `formInputResult` and `selectResult` references can obtain the corresponding fields of the specification table, exam paper, and scoring rubric, and that submission is not possible when required items are empty.

Business test: create an exception record, see whether it can be traced back to the source materials, check the name, quantity, date, and signature receipt item by item, and confirm that the exception has original record support and the reviewer's signature is complete.

- In the node configuration, check the field names and required markers one by one to ensure that the key fields of the specification table, exam paper, and scoring rubric correspond one-to-one with the original materials.
- Reference the form fields in subsequent nodes and run a test to confirm that the field values can be passed after submission, and that the exception list and review conclusion can be handed to the person in charge for handling.
