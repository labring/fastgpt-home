---
title: Forms and User Interaction for Modern Apprenticeships and Employer-Sponsored Classes: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c031-f016
page_type: 行业问题页
application_area: education
meta_title: Apprenticeships | Forms | Intake
meta_description: Apprenticeships: review forms for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Modern Apprenticeships and Employer-Sponsored Classes: Handle Questions and Collect Missing Information

## What this category's data looks like

Materials for modern apprenticeship and order class management mainly consist of school-enterprise cooperation agreements, order class training plans, and master-apprentice mentoring records. They are mostly submitted separately by academic affairs offices, secondary colleges/departments, and partner enterprises at different time points, and their update cadence rolls forward with semesters, agreement cycles, and mentoring batches. When these three types of materials enter the question acceptance and missing-item follow-up scenario, they play different roles: school-enterprise cooperation agreements provide fields for cooperation entities, duration, and rights and responsibilities; order class training plans provide fields for class, courses, headcount, and assessment; master-apprentice mentoring records provide fields for master, apprentice, mentoring date, and signed receipt. Field characteristics are concentrated in four categories: name, quantity, date, and signature. The same record often has mismatched name, quantity, or date across two materials, versions are not synchronized, or signatures and receipts are missing.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). After triggering, the conversation enters the interaction state and records the workflow state. After the user completes the required items and submits, the form information is passed to subsequent nodes for use. "Acceptance records and items to be completed" are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| School-enterprise cooperation agreement | Whether the fields, dates, and signatures are consistent with the cooperation entity and duration in the order class training plan | Check the field names one by one in the node configuration, confirm whether the agreement name, quantity, date, and signed receipt fields correspond to the training plan, and test-run referencing `formInputResult` |
| Order class training plan | Whether the class, courses, headcount, and assessment date match the batch, quantity, and date in the master-apprentice mentoring records | Check the required settings one by one, confirm that the key fields of the training plan are marked as required, and reference `selectResult` in subsequent nodes to test-run retrieving the corresponding field values |
| Master-apprentice mentoring record | Whether the master, apprentice, mentoring date, and signed receipt are complete, and whether the version is synchronized | Reference this field in subsequent nodes and test-run, and check whether the name, quantity, date, and signed receipt of the mentoring record can be retrieved by subsequent nodes |
| Form input node | Whether it can be submitted when required items are empty, and whether subsequent nodes can retrieve the field values after submission | Check the required settings and field passing one by one, fill in and submit once, and check the field values retrieved by subsequent nodes |

## Three common errors

- Phenomenon: The name, quantity, and date of the same order class do not match between the training plan and the mentoring records. Cause: The two materials are filled in by different roles at different times, without field alignment and date validation.
- Phenomenon: The version of the school-enterprise cooperation agreement is not synchronized, and the old duration and rights and responsibilities are referenced during acceptance. Cause: The materials have different update cadences, and the form does not require filling in a version identifier and update date.
- Phenomenon: Master-apprentice mentoring records lack signatures or receipts but are still submitted as complete materials. Cause: Key material fields are not marked as required, and after submission subsequent nodes cannot retrieve complete field values.

## How to verify the setup

Acceptance of this feature: fill in and submit once, check the field values retrieved by subsequent nodes, and confirm that the field values corresponding to `formInputResult` and `selectResult` can be referenced by subsequent nodes.

Business test: submit a question missing key information and see whether it first asks a follow-up question before answering.

- Check the field names and required settings one by one in the node configuration, and confirm that key material fields are marked as required.
- Reference this field in subsequent nodes and test-run, confirm that field passing works normally after submission and that the conversation does not remain in the interaction state.
