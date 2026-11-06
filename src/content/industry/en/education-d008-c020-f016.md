---
title: Forms and User Interaction for Grade Entry and Credit Recognition: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c020-f016
page_type: 行业问题页
application_area: education
meta_title: Grades and Credits | Forms | Access
meta_description: Grades and Credits: review forms for authorized access. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Grade Entry and Credit Recognition: Manage Authorized Access and External Services

## What this category's data looks like

This page focuses on the grade entry and credit recognition scenario, outlining the field, date, and signature characteristics of three types of materials: transcripts, deferred exam applications, and makeup exam arrangements. Transcripts are usually exported from the academic affairs system or submitted by teachers, and their fields include course name, credits, grade, instructor signature, and date; deferred exam applications are initiated by students and approved by counselors or departments, and their fields include the deferred exam course, reason, application date, and approval signature; makeup exam arrangements are published by academic affairs or departments, and their fields include the makeup exam course, time, location, and responsible teacher signature. When the three types of materials enter the form input node, their roles differ: transcripts are entered item by item as the basis for recognition, deferred exam applications are submitted as the process entry point, and makeup exam arrangements are referenced as subsequent notifications. In terms of update cadence, transcripts are updated as semester grades are released, deferred exam applications change with approval status, and makeup exam arrangements are synchronized with exam administration adjustments. For external services, it is necessary to ensure that visitor identity matches the visible scope, and unauthorized content must not be visible.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The externally available entry points and authorization scope are then completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters the interaction state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Form fields | Correspond one-to-one with the material fields to be collected for transcripts, deferred exam applications, and makeup exam arrangements, including course name, credits, grade, date, and signature | Check the field names one by one in the node configuration, and use `formInput` to reference the field values after submission |
| Required markers | Key material fields are marked as required; fields missing a signature or receipt must not be left blank | Check the required settings one by one, and confirm that submission is impossible when required items are empty |
| Field passing after submission | Subsequent nodes can retrieve the corresponding field values, and the name, quantity, and date of the same record are consistent between the transcript and the makeup exam arrangement | Reference the field in subsequent nodes and run a test, and check whether the versions are synchronized |
| Visible scope for restricted identities | Visitor identity matches the visible scope, and when opened to parents or superiors, there is no unauthorized access | Access once with a restricted identity, check whether the visible scope matches the settings, and if necessary use `userSelect` to select an identity |

## Three common errors

- Symptom: The course name, quantity, and date of the same record do not match between the transcript and the makeup exam arrangement. Cause: The two materials are entered separately, without field alignment and version synchronization.
- Symptom: A deferred exam application lacks an approval signature or receipt, but subsequent nodes can still retrieve values. Cause: The required marker does not cover the signature field, and submission is not blocked.
- Symptom: After submission, subsequent nodes cannot retrieve values, and the conversation stays in the interaction state. Cause: The field names are inconsistent with subsequent references, or submission is still possible when required items are empty.

## How to verify the setup

Acceptance of this feature: fill it out once and submit, then check whether the field values retrieved by subsequent nodes are consistent with the form entries, focusing on checking the field names and values passed by `formInput`.

Business test: access once with a restricted identity, and see whether the visible scope matches the settings and unauthorized content is not visible.

- Check the field names and required settings one by one in the node configuration, and confirm that they correspond one-to-one with the fields, dates, and signatures of transcripts, deferred exam applications, and makeup exam arrangements.
- Reference the `formInputResult` fields in subsequent nodes and run a test, and use `userSelect` to select a restricted identity to verify the visible scope and that unauthorized content is not visible.
