---
title: Forms and User Interaction for Training Provider Scheduling and Lesson Records: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c044-f016
page_type: 行业问题页
application_area: education
meta_title: Training Schedules | Forms | Review
meta_description: Training Schedules: review forms for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Training Provider Scheduling and Lesson Records: Trace Exceptions and Review Results

## What this category's data looks like

This page addresses the class scheduling and class cancellation scenarios of training institutions. The source materials are three types of original evidence: class schedules, class cancellation records, and class adjustment applications. Class schedules are published weekly and record class, teacher, time slot, and classroom; class cancellation records are filled in by the instructor after each class and include the student list, number of class hours, and signature; class adjustment applications are initiated by the applicant and include the original class session, target class session, reason, and approval signature. When the three types of materials enter exception tracing, their roles differ: the class schedule is the baseline, the class cancellation record is the execution evidence, and the class adjustment application is the basis for change. In terms of update cadence, the class schedule is refreshed at a fixed time each week, class cancellation records are generated during class, and class adjustment applications are submitted as needed. Field characteristics are concentrated in four items: name, quantity, date, and signature. The same record often shows inconsistencies across two materials, such as different name spellings, discrepancies in the number of class hours, misaligned dates, or missing signatures or receipts, requiring item-by-item comparison to locate the source of the exception.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The "exception list and review conclusion" is completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Class schedule | Class schedule fields must be aligned item by item with the class cancellation record and class adjustment application: class name, teacher name, number of class hours, class date, classroom, signature column | In the node configuration, check one by one whether the field names correspond one-to-one with the class schedule material fields, and check that key material fields are marked as required |
| Class cancellation record | The class cancellation record must be traceable to the original class session in the class schedule and the basis for change in the class adjustment application, and check whether the name, quantity, date, and signature receipt are complete | Reference this field in a subsequent node and run a test to confirm that the subsequent node can retrieve the corresponding field value |
| Class adjustment application | The class adjustment application must clearly state the original class session, target class session, reason, and approval signature, and check whether the version is synchronized with the class schedule | In the node configuration, check the field names and required settings, and reference this field in a subsequent node for a test run |
| Form input node | The form input node only collects the field values filled in by the user; it does not automatically identify material content, nor does it determine whether the material is authentic | Fill it out once and submit, check the field values retrieved by subsequent nodes, and confirm that the conversation has not stopped in the interactive state |

## Three common errors

- Symptom: The name and number of class hours for the same record do not match between the class schedule and the class cancellation record. Cause: The two materials are filled in separately, without item-by-item comparison using unified field names, and the discrepancy is carried into the review.
- Symptom: The class adjustment application and the class schedule version are not synchronized, and the dates are misaligned. Cause: After the class adjustment application is submitted, it is not written back to the class schedule, and the subsequent node still retrieves the old version of the field values.
- Symptom: The class cancellation record lacks a signature or receipt, and the review conclusion cannot be written. Cause: Key material fields are not marked as required, so submission is possible even when required items are empty, and the source material is incomplete.

## How to verify the setup

Acceptance of this feature: Fill out the form once and submit it, check the field values retrieved by subsequent nodes, and confirm that the fields passed by `formInput` are consistent with the filled-in content and that the `userSelect` selection items are correctly returned.

Business test: Create an exception record, see whether it can be traced to the source material, and check the name, quantity, date, and signature of the three materials: class schedule, class cancellation record, and class adjustment application.

- In the node configuration, check the field names one by one to ensure they correspond one-to-one with the fields of the class schedule, class cancellation record, and class adjustment application, and check the required settings one by one.
- Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a test to confirm that after submission the subsequent nodes can retrieve the corresponding field values and that the conversation has not stopped in the interactive state.
