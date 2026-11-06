---
title: Forms and User Interaction for Enrollment Changes and Graduation Eligibility: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c021-f016
page_type: 行业问题页
application_area: education
meta_title: Graduation Eligibility | Forms | Handover
meta_description: Graduation Eligibility: review forms for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Enrollment Changes and Graduation Eligibility: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

For student status changes and graduation eligibility review, the main materials for material drafting and responsibility handover include leave-of-absence and return-to-school applications, major transfer applications, and graduation review checklists. Leave-of-absence and return-to-school applications come from student submissions and initial departmental review; major transfer applications come from student preferences and the receiving department's opinion; graduation review checklists come from comparison between the academic affairs system's grades and the curriculum plan. These materials are updated according to semester milestones: leave-of-absence and return-to-school are handled according to application batches, major transfers according to selection cycles, and graduation review in a concentrated manner during graduation season. Field characteristics center on name, student ID, major, change type, effective date, signature field, and receipt. When materials enter the form input node, their respective roles are to provide fields to be filled in and the basis for handover: leave-of-absence and return-to-school applications provide the reason for the change and the start and end times; major transfer applications provide the transferring-out and transferring-in majors and the assessment conclusion; graduation review checklists provide course credits and the review conclusion.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The material drafts that can be issued and the handover records are completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters the interaction state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Leave-of-absence and return-to-school application | Fields complete, responsible person clear, version and date consistent | In the node configuration, check the field names one by one, and confirm that the change type, start and end dates, signature field, and leave-of-absence and return-to-school application template correspond one-to-one; use `formInput` to reference the fields in a trial run, and check that after submission the subsequent nodes can retrieve the corresponding field values |
| Major transfer application | The name, quantity, and date of the same record do not match in the two materials | Check whether the names of the transferring-out major and transferring-in major, the assessment conclusion date, and the signature field are consistent with the major transfer application template; use `userSelect` to select the change type and submit, and check whether the field values retrieved by subsequent nodes match the selection |
| Graduation review checklist | Version not synchronized, missing signature or receipt | Check whether the course names, credit quantities, and review date are consistent with the graduation review checklist template; confirm that required markers have been set on key material fields, and after submission check whether subsequent nodes can retrieve the corresponding field values |
| Handover record | Responsible person clear, version and date consistent | Check whether the signatures of both parties in the handover, the handover date, and the material version number are complete; in the node configuration, check the required settings one by one, and confirm that submission is impossible when required items are empty |

## Three common errors

- Phenomenon: The name, student ID, and date of the same student do not match between the leave-of-absence and return-to-school application and the major transfer application. Cause: The two materials are filled in separately, and no cross-material field consistency check was performed.
- Phenomenon: The course names and credit quantities in the graduation review checklist are inconsistent with the transcript. Cause: The checklist version was not synchronized, and old curriculum plan data was used.
- Phenomenon: The handover record lacks a signature or receipt, and subsequent steps cannot acknowledge receipt. Cause: Required markers did not cover the signature and receipt fields, so missing items were not blocked at submission.

## How to verify the setup

Acceptance for this feature: fill in once and submit, check the field values retrieved by subsequent nodes, and confirm that the fields referenced by `formInputResult` and `selectResult` can retrieve the corresponding values.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- In the node configuration, check the field names and required settings one by one, and confirm that key material fields have been marked as required.
- Reference the form fields in subsequent nodes and run a trial, and confirm that after submission the subsequent nodes can retrieve the corresponding field values.
