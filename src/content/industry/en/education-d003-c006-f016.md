---
title: Forms and User Interaction for Kindergarten Operations and Quality Self-Assessment: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c006-f016
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Quality | Forms | Intake
meta_description: Kindergarten Quality: review forms for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Kindergarten Operations and Quality Self-Assessment: Handle Questions and Collect Missing Information

## What this category's data looks like

Kindergarten operation behavior and quality self-assessment materials include self-assessment reports, issue lists, and rectification plans. They are usually filled out by the kindergarten on a semester or assessment-cycle basis, then summarized by the handler and transferred for processing. The three types of materials play different roles in the Q&A acceptance and missing-item follow-up stage: the self-assessment report provides overall conclusions and indicator scores, the issue list sets out specific missing items and information to be supplemented, and the rectification plan gives responsible persons and deadlines. Field characteristics center on name, quantity, date, signature, receipt, and version number, and the same record should remain consistent across the three materials. When materials enter this function, the form input node is responsible for collecting the field values filled in by the user, and subsequent nodes or manual staff use them to form the acceptance record and the questions to be completed.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, and outputs the field values filled in by the user (passed to subsequent nodes after submission). The "acceptance record and questions to be completed" are then completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Self-assessment report | Name, quantity, date, signature, receipt, and version number must be consistent item by item with the issue list and rectification plan | Check field names and required markers one by one in the form input node configuration, and after submission check whether subsequent nodes can retrieve the corresponding field values |
| Issue list | Whether missing items are identified and followed up on, and whether answers are based on materials | Ask a question missing key information and see whether it follows up first before answering; check whether submission is possible when required items are empty |
| Rectification plan | Whether the responsible person and deadline are consistent with the corresponding records in the self-assessment report and issue list | Reference the `formInputResult` field in subsequent nodes and run a test to confirm that the field values are passed correctly |
| Form fields | One-to-one correspondence with the material fields to be collected | Check field names one by one and confirm that the value paths of `formInputResult` and `selectResult` are consistent |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the self-assessment report and the issue list. Cause: The two materials were filled in separately without cross-checking.
- Symptom: The rectification plan version was not synchronized, and the old responsible person and deadline are still referenced. Cause: The version number was not updated with the material and was not validated at submission.
- Symptom: The self-assessment report lacks a signature or receipt, but the issue list shows it has been accepted. Cause: The signature and receipt fields were not set as required and were not blocked at submission.

## How to verify the setup

Fill it out once and submit, check the field values retrieved by subsequent nodes, and confirm that `formInputResult` and `selectResult` output correctly.

Business test: ask a question missing key information, see whether it follows up first before answering, and check whether the answer is based on materials.

- Check field names and required markers one by one in the form input node configuration, and confirm that key material fields are marked as required.
- Reference the `formInputResult` field in subsequent nodes and run a test to confirm that the field values are passed correctly after submission.
