---
title: Forms and User Interaction for School Exam Question Setting and Grading: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c011-f016
page_type: 行业问题页
application_area: education
meta_title: School Exams | Forms | Access
meta_description: School Exams: review forms for authorized access. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for School Exam Question Setting and Grading: Manage Authorized Access and External Services

## What this category's data looks like

This page focuses on the primary and secondary school exam question setting and grading category. The materials come from exam question specification tables, exam papers, scoring rubrics, and form receipts generated in the authorized access and external services step. The exam question specification table lists items by subject, grade, unit, question type, score, and cognitive level, and its update cadence advances with exam milestones; exam papers are organized by question number, question stem, options, answers, and scores, and versions change with review rounds; scoring rubrics are organized by question number, scoring points, score bands, and signature fields, and are often revised in sync with exam papers. When the materials enter the forms and interaction feature, the exam question specification table plays the role of structural constraint, the exam paper plays the role of content subject, the scoring rubric plays the role of scoring basis, and authorized access and external services map the visibility scope and submission fields of these materials, so that subsequent nodes or humans can open entry points based on them.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The externally available entry points and authorization scope are then completed by subsequent nodes or humans. After the form input node is triggered, the conversation enters the interaction state and the workflow state is recorded. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Exam question specification table | Field names correspond item by item with the subject, grade, question number, score, and cognitive level in the exam paper and scoring rubric; date and signature fields must not be blank | Check field names one by one in the node configuration, and confirm that required markers fall on key material fields |
| Exam paper | Question number, question stem, options, answers, and scores match in name, quantity, and date across the two materials, and version numbers are in sync | Access once with a restricted identity to see whether the visibility scope matches the settings, and check whether the exam paper version and the specification table are from the same batch |
| Scoring rubric | Scoring points, score bands, and question numbers are consistent with the exam paper, signatures or receipts are complete, and it must not be exposed externally when versions are not in sync | Reference this field in a subsequent node and run a test to confirm that the subsequent node can retrieve the corresponding field value |
| Authorized access and external services | Visitor identity matches the visibility scope, unauthorized content is not visible, and when opening to parents or superiors the entry point and authorization scope are consistent | Check field passing in the `formInputResult` and `selectResult` configurations, and after submission check the values retrieved by subsequent nodes |

## Three common errors

- Symptom: The question number, score, and date of the same record do not match between the exam question specification table and the exam paper. Cause: The two materials were revised separately and were not checked in sync under the same version.
- Symptom: The scoring points in the scoring rubric are inconsistent with the number of answers in the exam paper, and signatures or receipts are missing. Cause: The review rounds were not closed-loop, and the signature fields were not updated with the version.
- Symptom: After submission, subsequent nodes cannot retrieve values, or required items can be submitted even when empty, and the conversation stays in the interaction state. Cause: Required markers and field passing were not checked item by item in the node configuration.

## How to verify the setup

Feature acceptance: Fill out the form once and submit, check the field values retrieved by subsequent nodes, and confirm that submission is not possible when required items are empty and that the conversation continues to execute downward after submission.

Business test: Access once with a restricted identity to see whether the visibility scope matches the settings, and confirm that unauthorized content is not visible.

- Check field names and required markers one by one in the node configuration, and confirm that they correspond one-to-one with the fields in the exam question specification table, exam paper, and scoring rubric.
- Reference the `formInput` or `selectResult` output in a subsequent node and run a test to check field passing and visibility scope after submission.
