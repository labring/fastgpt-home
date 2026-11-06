---
title: Forms and User Interaction for Graduate Admissions Interviews and Selection: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c024-f016
page_type: 行业问题页
application_area: education
meta_title: Graduate Admissions | Forms | Intake
meta_description: Graduate Admissions: review forms for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Graduate Admissions Interviews and Selection: Handle Questions and Collect Missing Information

## What this category's data looks like

This page focuses on Q&A intake and missing-item follow-up in the graduate admissions re-examination and admission category. The source materials include three types: re-examination plans, candidate score sheets, and transfer lists. Re-examination plans are updated by admissions year or batch, with fields including program name, re-examination subjects, weights, and dates; candidate score sheets advance along with grading and score verification, with fields including candidate number, subject scores, total score, and ranking; transfer lists are confirmed after each round of transfer, with fields including transfer candidate number, original application program, proposed admission program, and signature field. When these three types of materials enter the forms and interaction feature, each plays a different role: re-examination plans are used to verify the process and field definitions, candidate score sheets are used to verify scores and rankings, and transfer lists are used to verify the list and signature receipt. During Q&A intake, missing-item follow-up revolves around these fields, ensuring that the intake record and the completed follow-up items are traceable.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The "intake record and completed follow-up items" are then completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Re-examination plan | Whether the fields, dates, and signature are consistent with the candidate score sheet and transfer list, and whether the version is synchronized | Check the field names one by one in the node configuration, and confirm that the program name, re-examination subjects, weights, and date fields in the plan correspond to those in the score sheet and transfer list; reference the `formInputResult` field and run a trial to check whether subsequent nodes can retrieve the plan field values |
| Candidate score sheet | Whether the candidate number, subject scores, total score, and ranking match those in the transfer list and re-examination plan | Check the required settings one by one, and confirm that the candidate number, subject scores, total score, and ranking are required; reference the `selectResult` output in subsequent nodes and run a trial to check whether the field values are passed successfully after submission |
| Transfer list | Whether the transfer candidate number, original application program, proposed admission program, date, and signature receipt are complete and consistent with the score sheet | Check the required settings one by one, and confirm that the transfer candidate number, original application program, proposed admission program, and signature receipt are required; reference this field in subsequent nodes and run a trial to check whether the corresponding field values can be retrieved after submission |

## Three common errors

- Symptom: The same candidate's name, number, or date does not match between the score sheet and the transfer list. Cause: The two materials are entered in different stages, lacking unified field verification and signature receipt confirmation.
- Symptom: The re-examination plan has been updated, but the form fields are still collected according to the old version. Cause: The version is not synchronized, and the field names in the node configuration have not been updated with the plan.
- Symptom: Subsequent nodes cannot retrieve values after submission. Cause: Submission is possible even when required items are empty, or the field names are inconsistent with the references in subsequent nodes.

## How to verify the setup

Fill it out once and submit, then check the field values retrieved by subsequent nodes, and confirm that the `formInputResult` and `selectResult` field values can be passed to subsequent nodes.

Business test: Submit a question missing key information and see whether it asks a follow-up question before answering.

- Check the field names and required settings one by one in the node configuration, and confirm that the fields of the re-examination plan, candidate score sheet, and transfer list correspond one to one.
- Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a trial to check whether the field values are passed successfully after submission.
