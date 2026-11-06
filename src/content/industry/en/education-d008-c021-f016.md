---
title: Forms and User Interaction for Enrollment Changes and Graduation Eligibility: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c021-f016
page_type: 行业问题页
application_area: education
meta_title: Graduation Eligibility | Forms | Access
meta_description: Graduation Eligibility: review forms for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Enrollment Changes and Graduation Eligibility: Manage Authorized Access and External Services

## What this category's data looks like

Student status changes and graduation qualification review involve materials such as suspension/resumption applications, major transfer applications, and graduation review checklists. They come from the academic affairs system and departmental submissions, and their update cadence changes with semester milestones and approval batches. Suspension/resumption applications include the change type, effective date, parent signature, and departmental opinion; major transfer applications include the original major, target major, assessment conclusion, and signatures from both parties; graduation review checklists include course names, credit amounts, completion dates, and review conclusions. When the materials enter the form input node, each plays a different role: suspension/resumption applications provide the starting point of the change and the effective time, major transfer applications provide the basis for the major change and the approval chain, and graduation review checklists provide the course and credit records needed for the graduation qualification determination. Together, the three support authorized access and external services, and the entry point and visibility scope are defined by subsequent nodes or manually based on field values.

## Configuration and implementation checks

This part is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The externally available entry point and authorization scope are then completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters the interaction state and the workflow state is recorded. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Suspension/resumption application | Whether the change type, effective date, parent signature, and departmental opinion are complete, and whether the date is consistent with the approval record | Check the field names and required markers one by one in the node configuration, and after submission check whether subsequent nodes can retrieve the corresponding field values |
| Major transfer application | Whether the names of the original major and target major, the assessment conclusion, and the signatures from both parties are consistent with the academic affairs records | Check the field names in the node configuration, and after a trial run reference the field in a subsequent node and verify the value |
| Graduation review checklist | Whether the course names, credit amounts, completion dates, and review conclusions are consistent with the grade database | Check the field names and required settings in the node configuration, and after submission verify the field values retrieved by subsequent nodes |
| Form input node | Whether it can be submitted when required items are empty, and whether the conversation stays in the interaction state | Check the required markers, run a trial once, and confirm that after submission the conversation continues and subsequent nodes can reference the `formInputResult` field |

## Three common errors

- Symptom: The name or date of the same student does not match between the suspension/resumption application and the graduation review checklist. Cause: The two materials are entered separately, the fields are not cross-checked, and the versions are not synchronized.
- Symptom: The major transfer application lacks a parent signature or departmental receipt, but the review still continues. Cause: The required markers do not cover the signature and receipt fields, and empty values are not blocked at submission.
- Symptom: After submission, subsequent nodes cannot retrieve the field values, and the conversation stays in the interaction state. Cause: The field names are inconsistent with the subsequent references, or required items can still be submitted when empty, and the state is not recorded correctly.

## How to verify the setup

Acceptance of this feature: fill it out once and submit, verify the field values retrieved by subsequent nodes, confirm that the `formInputResult` field is consistent with the node configuration, that the `userSelect` options can be passed correctly, and that submission is not possible when required items are empty.

Business test: access once with a restricted identity, see whether the visibility scope matches the setting, and confirm that unauthorized content is not visible.

- Check the field names and required markers one by one in the node configuration, ensuring they correspond one-to-one with the material fields of the suspension/resumption application, major transfer application, and graduation review checklist.
- Run a trial once, reference the `formInputResult` and `selectResult` fields in subsequent nodes, and confirm that the corresponding field values can be retrieved after submission and that the conversation continues to execute downward.
