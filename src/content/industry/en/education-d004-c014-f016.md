---
title: Forms and User Interaction for School Moral Education and Class Teacher Work: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c014-f016
page_type: 行业问题页
application_area: education
meta_title: Pastoral Education | Forms | Handover
meta_description: Pastoral Education: review forms for material handover. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for School Moral Education and Class Teacher Work: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This category's data looks like this: School moral education and homeroom teacher work daily produces three types of materials: themed class meeting plans, student comprehensive quality records, and home visit records. The sources are class activities, daily observation, and home-school communication, and the update rhythm advances with weeks, semester milestones, and emergencies. Themed class meeting plans focus on activity objectives, process, and signature confirmation; student comprehensive quality records focus on indicator items, quantities, and dates; home visit records focus on time, subject, receipt, and signature. When the three types of materials enter the forms and interaction stage, each plays a different role: class meeting plans provide activity fields, comprehensive quality records provide indicator fields, and home visit records provide time and receipt fields, together forming a signable material draft and handover record.

## Configuration and implementation checks

Configuration and implementation checks: This step is executed by the form input node (interaction node) in the workflow, and outputs the field values filled in by the user (passed to subsequent nodes after submission). The signable material draft and handover record are completed by subsequent nodes or manually afterward. After the form input node is triggered, the conversation enters the interaction state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Themed class meeting plan | Fields are complete, the responsible person is clear, and version and date are consistent | Check the field names one by one in the node configuration, and check the required settings and signature receipt |
| Student comprehensive quality record | Name, quantity, and date match across the three materials | Reference this field in subsequent nodes and run a trial to check field passing |
| Home visit record | Time, subject, receipt, and signature are not missing | Check the required markers and confirm that submission is blocked when items are missing |
| formInputResult and selectResult | Field values and selected options can be passed to subsequent nodes | Reference `formInputResult` and `selectResult` in subsequent nodes and run a trial |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the class meeting plan and the home visit record. Cause: Field names were not aligned item by item, and the values retrieved by subsequent nodes were not checked after submission.
- Symptom: The version is not synchronized, and the dates of the old draft and the new draft conflict. Cause: The form did not record the version and date, and the handover was not signed for according to the latest field values.
- Symptom: Missing signatures or receipts are still advanced to the next stage. Cause: Key material fields were not marked as required, and missing-item blocking was not checked after submission.

## How to verify the setup

How to verify the setup: Acceptance for this feature: fill it out once and submit, check the field values retrieved by subsequent nodes, and confirm that both `formInputResult` and `selectResult` can be referenced.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- Check the field names and required markers one by one in the node configuration, and confirm that key material fields are marked as required.
- Reference `formInputResult` and `selectResult` in subsequent nodes and run a trial to confirm that field values are passed successfully.
