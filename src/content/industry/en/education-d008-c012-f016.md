---
title: Forms and User Interaction for District Teaching Research and Classroom Reviews: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c012-f016
page_type: 行业问题页
application_area: education
meta_title: Teaching Reviews | Forms | Access
meta_description: Teaching Reviews: review forms for authorized access. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for District Teaching Research and Classroom Reviews: Manage Authorized Access and External Services

## What this category's data looks like

District and county teaching research activities and lesson observation and evaluation materials include three types: teaching research activity notices, lesson observation records, and lesson evaluation minutes. Notices come from teaching research department scheduling, lesson observation records are filled in on site by observers, and lesson evaluation minutes are organized by the host after the activity. The update rhythm advances weekly or per activity: notices are sent first, records are generated during the lesson, and minutes are added after the activity. Field characteristics center on activity name, date, instructor, observer, evaluation points, signature, and receipt. When materials enter the form input node, the notice provides the activity scope and authorization targets, the lesson observation record provides participant identity and visibility scope, and the lesson evaluation minutes provide conclusions and receipt status; together the three determine the external entry point and authorization scope.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The external entry point and authorization scope are then completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and records the workflow state; after the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Teaching research activity notice | The activity name, date, participation scope, and authorization targets in the notice are consistent | Check the field names one by one in the node configuration, confirm that the notice fields correspond one-to-one with the material fields to be collected, and use `formInput` to reference the field values |
| Lesson observation record | The observer, instructor, date, and signature receipt in the lesson observation record are complete | Check the required settings one by one, confirm that observer, date, and signature are required; use `userSelect` to select an identity and run a trial to see whether subsequent nodes can retrieve the corresponding field values |
| Lesson evaluation minutes | The name, quantity, and date in the lesson evaluation minutes match the notice and lesson observation record | Reference this field in subsequent nodes and run a trial, check whether the name, quantity, and date of the same record are consistent across the three materials, and mark it as not externally available when signature or receipt is missing |
| Form fields | Field names correspond one-to-one with the material fields to be collected | Check the field names one by one in the node configuration, confirm the required markers and the field transfer path after submission |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the notice and the lesson evaluation minutes. Cause: The two materials are filled in by different personnel, and no cross-check is done before submission.
- Symptom: The lesson observation record version is not synchronized, and the old version remains at the external entry point. Cause: After updating, it was not resubmitted in the form input node, and subsequent nodes still retrieve the old field values.
- Symptom: The lesson evaluation minutes lack a signature or receipt but are still treated as externally available material. Cause: The required markers do not cover the signature and receipt fields, and submission is not blocked.

## How to verify the setup

Acceptance for this feature: fill in once and submit, check the field values retrieved by subsequent nodes, and confirm that the `formInputResult` and `selectResult` field values can be passed to subsequent nodes.

Business test: access once with a restricted identity and see whether the visibility scope matches the setting

- Check the field names and required markers one by one in the node configuration, and confirm that they correspond one-to-one with the fields of the teaching research activity notice, lesson observation record, and lesson evaluation minutes.
- Reference this field in subsequent nodes and run a trial, confirm that after submission subsequent nodes can retrieve the corresponding field values, and that unauthorized identities cannot see them.
