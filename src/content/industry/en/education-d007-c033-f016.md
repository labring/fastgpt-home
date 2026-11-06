---
title: Forms and User Interaction for Vocational College Skills Competition Organization: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c033-f016
page_type: 行业问题页
application_area: education
meta_title: Skills Competitions | Forms | Review
meta_description: Skills Competitions: review forms for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Vocational College Skills Competition Organization: Trace Exceptions and Review Results

## What this category's data looks like

Competition organization materials for vocational colleges consist mainly of competition regulations, registration forms, and training plans. Sources are competition event notices, departmental submissions, and training records, and the update cadence changes with competition progress and personnel adjustments. Competition regulations state group, event, time, and signature/seal requirements; registration forms record contestants, instructors, identity information, and receipts; training plans reflect stage arrangements, venues, and trainers. When these three types of materials enter exception tracing and manual review, the regulations serve as the judgment baseline, while registration forms and training plans serve as the records being compared. Fields are concentrated in names, quantities, dates, and signatures. It is common for the same record to mismatch across two materials, for versions to be out of sync, or for signatures or receipts to be missing, requiring item-by-item verification to form an exception list and review conclusion.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The exception list and review conclusion are completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Competition regulations | Whether the group, event, time, and signature/seal requirements are consistent with the registration form and training plan | Check the names, quantities, and dates of the regulations against the registration form and training plan one by one by field name, and check whether signatures or receipts are complete |
| Registration form | Whether the contestants, instructors, identity information, and receipts match the regulations and training plan | In the node configuration, check the field names and required settings. After submission, reference `formInputResult` in subsequent nodes to retrieve field values and run a test |
| Training plan | Whether the stage arrangements, venues, and trainers are in sync with the versions of the regulations and registration form | Check dates and signatures, and confirm that when versions are out of sync or signatures are missing, the source material can be traced |
| Form fields | Whether they correspond one-to-one with the material fields to be collected | In the node configuration, check the field names one by one. Key material fields have been marked as required. After submission, reference `selectResult` in subsequent nodes to retrieve field values and run a test |

## Three common errors

- Symptom: The name and quantity of the same record do not match between the regulations and the registration form. Cause: The two materials are filled in separately and are not compared item by item using the same field names.
- Symptom: The dates in the training plan and registration form are inconsistent, and the versions are out of sync. Cause: After modification, only one material is updated, while the other remains the old version.
- Symptom: The registration form lacks a signature or receipt, and subsequent nodes cannot retrieve values after submission. Cause: Required items can be submitted even when empty, or the conversation remains in the interactive state.

## How to verify the setup

Acceptance of this feature: fill in and submit once, check the field values retrieved by subsequent nodes, and confirm that the `formInputResult` and `selectResult` references are correct.

Business test: create an exception record and see whether the source material can be traced.

- In the node configuration, check the field names and required settings one by one, and run a test to confirm that subsequent nodes can retrieve the corresponding field values.
- Compare the names, quantities, dates, and signatures of the regulations, registration form, and training plan by field name, and record any mismatches.
