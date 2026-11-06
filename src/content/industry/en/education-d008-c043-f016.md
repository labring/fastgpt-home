---
title: Forms and User Interaction for Training Provider Admissions and Inquiry Follow-Up: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c043-f016
page_type: 行业问题页
application_area: education
meta_title: Training Admissions | Forms | Access
meta_description: Training Admissions: review forms for authorized access. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Training Provider Admissions and Inquiry Follow-Up: Manage Authorized Access and External Services

## What this category's data looks like

This page addresses the training institution enrollment consultation conversion scenario. The materials come from three categories: enrollment brochures, consultation records, and trial class arrangements. Enrollment brochures provide course names, class types, class hours, and fee definitions, and are the source of form fields; consultation records carry parent contact information, intended courses, and communication dates, and after entering the form become transferable field values; trial class arrangements include trial times, instructors, and confirmation receipts, and must be aligned item by item with the class type names and class hour quantities in the brochures. The material update cadence is once after each enrollment batch adjustment. When the brochure is revised, consultation records and trial class arrangements must be reviewed on the same day. Field characteristics are concentrated in four categories: names, quantities, dates, and signed receipts. If the name, quantity, or date of the same record does not match across two materials, it is considered out of sync. When materials enter the form input node, each plays a different role: brochure fields are used for identity and visible scope determination, consultation record fields are used for follow-up, and trial class arrangement fields are used for scheduling and receipt verification.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, and outputs the field values filled in by the user (passed to subsequent nodes after submission). The externally available entry point and authorization scope are completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters the interaction state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Enrollment brochure | Course name, class type, class hour quantity, and date must be consistent item by item with the consultation records, and signatures or receipts must be complete | Check the field names one by one in the node configuration, and confirm that the brochure fields correspond one-to-one with the form fields |
| Consultation record | Parent contact information, intended course, and communication date must match the trial class arrangements, and versions must be in sync | Check the required settings one by one, and confirm that key material fields are marked as required |
| Trial class arrangement | Trial time, instructor, and confirmation receipt must match the brochure class type and class hour quantity | Reference this field in subsequent nodes and run a test to confirm that subsequent nodes can retrieve the corresponding field value |
| Form input node | After triggering, it enters the interaction state and records the workflow state; submission is not allowed if required items are empty | Check `formInputResult` field passing and `userSelect` options, and confirm that field values can be referenced after submission |

## Three common errors

- Symptom: The class type name and class hour quantity of the same consultation record do not match between the brochure and the trial class arrangement. Cause: The two materials are updated separately, same-day review is not performed, and versions are out of sync.
- Symptom: The trial class arrangement lacks a parent signature or receipt, but subsequent nodes still retrieve field values. Cause: The required marker does not cover the signature receipt field, and submission validation is ineffective.
- Symptom: After submission, subsequent nodes cannot retrieve values, and the conversation remains in the interaction state. Cause: The field name is inconsistent with the reference in subsequent nodes, or submission is still allowed when required items are empty.

## How to verify the setup

Acceptance for this feature: fill out the form once and submit it, check the field values retrieved by subsequent nodes, and confirm that the `formInputResult` and `selectResult` field values are passed correctly.

Business test: access once with a restricted identity, check whether the visible scope matches the setting, and confirm that unauthorized content is not visible.

- Check the field names one by one in the node configuration, and confirm that they correspond one-to-one with the fields of the enrollment brochure, consultation records, and trial class arrangements
- Check the required settings one by one, and reference the field in subsequent nodes for a test run to confirm that the field value can be retrieved after submission
