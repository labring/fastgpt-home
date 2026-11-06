---
title: Forms and User Interaction for Vocational School Student Internships: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c030-f016
page_type: 行业问题页
application_area: education
meta_title: Student Internships | Forms | Intake
meta_description: Student Internships: review forms for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Vocational School Student Internships: Handle Questions and Collect Missing Information

## What this category's data looks like

This page focuses on vocational school student internship management. The materials come from three categories: internship agreements, internship plans, and internship logs. They are submitted in batches by academic affairs staff or internship instructors, and the update cadence follows the internship cycle and monthly archiving. Internship agreements include student and organization names, position, start and end dates, and signatures/seals; internship plans include batch, number of people, dates, supervising instructor, and signature; internship logs include date, position, number of tasks, and student and mentor signatures. When entering the form input node, each of the three material types serves as a field source: the agreement provides position and dates, the plan provides batch and number of people, and the log provides tasks and quantity. After the fields are matched item by item, they are submitted for subsequent nodes or manual acceptance and follow-up questions.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, and outputs the field values filled in by the user (passed to subsequent nodes after submission). Acceptance records and follow-up questions for completion are handled by subsequent nodes or manually. After the node is triggered, the conversation enters the interaction state and records the workflow state. After the required items are filled in and submitted, the field values are passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Form fields | Correspond one-to-one with the material fields to be collected in the internship agreement, internship plan, and internship log | Check the field names one by one in the node configuration, and confirm that there are corresponding fields for agreement position and dates, plan batch and number of people, and log tasks and quantity |
| Required markers | Key material fields are marked as required, and fields missing signatures or receipts are not omitted | Check the required settings one by one, and confirm that key fields such as agreement signature, plan signature, and log receipt are marked |
| Field passing after submission | Subsequent nodes can retrieve the corresponding field values and use them to ask follow-up questions about missing items | Reference the field in subsequent nodes and run a test, use `formInputResult` and `selectResult` to verify the values, and check that the field values are readable after `formInput` submission |
| Material version | The name, quantity, and date of the same record are consistent across the agreement, plan, and log, and the versions are synchronized | Compare the name, quantity, and date of the three materials item by item, and confirm that items whose versions are not synchronized or do not match are identified as missing items and followed up with questions |

## Three common errors

- Symptom: The position name for the same student does not match between the agreement and the log. Cause: The two materials were filled in separately, no field-level comparison was performed, and the missing item was not identified.
- Symptom: The planned number of people is inconsistent with the number of tasks and dates in the log. Cause: The versions were not synchronized, the old plan was still referenced, and no follow-up question was asked after submission.
- Symptom: The agreement is missing a signature or the log is missing a receipt, but it still enters acceptance. Cause: Key fields were not marked as required, and no follow-up question was triggered after submission.

## How to verify the setup

Acceptance for this feature: fill it out once and submit, check the field values retrieved by subsequent nodes, and confirm that the `formInputResult` and `selectResult` field values are readable.

Business test: submit a question that is missing key information, and see whether it asks a follow-up question before answering.

- Check the field names and required settings one by one in the node configuration, and confirm that the agreement, plan, and log fields correspond one-to-one.
- Reference the fields in subsequent nodes and run a test, confirm that the field values are readable after submission, and that missing items are followed up with questions.
