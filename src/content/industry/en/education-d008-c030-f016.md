---
title: Forms and User Interaction for Vocational School Student Internships: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c030-f016
page_type: 行业问题页
application_area: education
meta_title: Student Internships | Forms | Access
meta_description: Student Internships: review forms for authorized access. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Vocational School Student Internships: Manage Authorized Access and External Services

## What this category's data looks like

This category's data covers three types of materials: internship agreements, internship plans, and internship logs. Agreements are signed between the school and the internship organization, and contain the student's name, position, duration, signature, and receipt; plans come from the on-campus supervising teacher, and contain the batch, week number, tasks, and dates; logs are filled in weekly by students, and contain attendance, tasks, and signature. Materials are updated on a rolling basis with the internship batch, and the version is determined by the signature or receipt. When entering the external service entry point, the agreement and plan determine the visible scope, and the log determines the process trail; the fields of the three must be aligned before they can support viewing by parents or superiors.

## Configuration and implementation checks

This step is performed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). "The externally available entry point and authorization scope" are then completed by subsequent nodes or manually. The form does not automatically recognize material content, nor does it determine whether materials are authentic.

| Object | Check | Verification action |
| --- | --- | --- |
| Internship agreement | Name, quantity, date, and signature are consistent across the agreement and the plan | Check the field names one by one in the node configuration, access once with a restricted identity, and see whether the visible scope matches the setting |
| Internship plan | Batch, week number, tasks, and dates are consistent across the two materials, and versions are in sync | Check the required settings one by one, and reference this field in a subsequent node and run a test |
| Internship log | Attendance, tasks, signature, and receipt are complete, and dates align with the plan | Reference the `formInputResult` and `selectResult` fields in a subsequent node and run a test, and check the retrieved values |
| External entry point and authorization scope | Visitor identity matches the visible scope, and unauthorized access is not visible | Access once with a restricted identity, and see whether the visible scope matches the setting |

## Three common errors

- Symptom: the name, quantity, and date of the same record do not match between the agreement and the plan. Cause: the two materials are filled in separately, without field alignment and version synchronization.
- Symptom: a log is missing a signature or receipt but is still circulated as valid material. Cause: the required markers do not cover the signature and receipt fields, and no check is performed after submission.
- Symptom: after submission, subsequent nodes cannot retrieve the values, and the conversation stays in the interaction state. Cause: field names were not checked one by one, or an empty required item can still be submitted.

## How to verify the setup

Acceptance of this feature: fill in the required items once and submit, check the field values retrieved by subsequent nodes, and confirm that `formInputResult` and `selectResult` are passed correctly.

Business test: access once with a restricted identity, see whether the visible scope matches the setting, and confirm that unauthorized content is not visible.

- Check the field names and required markers one by one in the node configuration, and confirm that they correspond one-to-one with the agreement, plan, and log fields.
- Reference `formInputResult` and `selectResult` in a subsequent node and run a test, check the retrieved field values, and confirm that the conversation continues to execute downward.
