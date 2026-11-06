---
title: Forms and User Interaction for Vocational Training Subsidy Applications: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c037-f016
page_type: 行业问题页
application_area: education
meta_title: Training Subsidies | Forms | Review
meta_description: Training Subsidies: review forms for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Vocational Training Subsidy Applications: Trace Exceptions and Review Results

## What this category's data looks like

This page addresses exception tracing and manual review in vocational training subsidy claims. There are three types of materials: training class filing, attendance records, and completion assessment forms. Class filing is submitted by the training institution before the class starts, and contains the class name, trade, start and end dates, and the responsible person's signature; attendance records are generated daily and contain the trainee's name, date, and personal signature; completion assessment forms are compiled at completion and contain the trainee's name, assessment result, and assessor's signature. The three types of materials update at different rhythms: filing is finalized before the class starts, attendance is appended daily as training progresses, and assessment forms are formed in a batch after completion. Field characteristics are concentrated in four categories: name, quantity, date, and signature, and the same trainee and the same class appear repeatedly across the three materials. When entering the form input step, the three types of materials each play a different role: class filing provides the baseline for the class and personnel, attendance records provide evidence of the attendance process, and completion assessment forms provide the basis for results and signatures, jointly supporting the original-record comparison for the exception list.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, and outputs the field values filled in by the user (passed to subsequent nodes after submission). The "exception list and review conclusion" is completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters the interaction state and records the workflow state; after the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Form fields | Field names correspond one-to-one with the material fields to be collected, covering the name, quantity, date, and signature items of the class filing, attendance records, and completion assessment forms | Check the field names one by one in the node configuration, and confirm that every material field has a corresponding input item |
| Required markers | Key material fields are marked as required, and fields missing a signature or receipt cannot be submitted empty | Check the required settings one by one, and try submitting empty values to observe whether they are blocked |
| Field passing after submission | Subsequent nodes can obtain the corresponding field values for comparing the name, quantity, and date of the three materials | Reference the field in a subsequent node and run a test to confirm that the retrieved value matches the submitted content |
| Interaction state | After triggering, the conversation enters the interaction state and records the workflow state, and continues executing downward after submission | Trigger `formInput` once, confirm that the conversation stays in the interaction state, and that the workflow continues after submission |

## Three common errors

- Symptom: the same trainee's name is written differently in the class filing and the attendance records. Cause: the two materials are filled in at different stages, and the name was not entered against the same baseline, so it cannot be matched during tracing.
- Symptom: the date range of the attendance records conflicts with the date range of the completion assessment form. Cause: attendance is appended daily while the assessment form is formed in a batch after completion, and versions were not synchronized, causing date misalignment.
- Symptom: the completion assessment form is missing the assessor's signature or receipt. Cause: key material fields were not marked as required, so submission was not blocked, and the review conclusion lacks signature support.

## How to verify the setup

Acceptance of this feature: fill in the form once and submit it, check the field values retrieved by subsequent nodes, and confirm that after `formInput` submission the subsequent nodes can retrieve the corresponding field values and that required items cannot be submitted when empty.

Business test: create an exception record, see whether the source material can be traced, and check whether the name, quantity, date, and signature of the class filing, attendance records, and completion assessment forms are traceable.

- Check the field names one by one in the node configuration, confirm that they correspond one-to-one with the fields of the class filing, attendance records, and completion assessment forms, and use `userSelect` to try selecting once.
- Check the required settings one by one, try submitting empty values, and confirm that fields missing a signature or receipt cannot be submitted and that subsequent nodes can retrieve the field values after submission.
