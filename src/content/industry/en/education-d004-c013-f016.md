---
title: Forms and User Interaction for School Teacher Training Credits: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c013-f016
page_type: 行业问题页
application_area: education
meta_title: Teacher Credits | Forms | Handover
meta_description: Teacher Credits: review forms for material handover. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for School Teacher Training Credits: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page addresses the scenario of credit management for primary and secondary school teacher training. Materials come from three types of files: training notices, credit recognition forms, and attendance rosters. Training notices are usually issued by the project office before the class starts, with fields including training name, start and end dates, class hours, and assessment method; credit recognition forms are compiled and submitted by the school where the participating teacher works, with fields including name, ID number, training project, recognized credits, and signature field; attendance rosters are provided by the organizing unit, with fields including serial number, name, unit, and sign-in status. The three types of materials have different update rhythms: notices are revised as the project is adjusted, recognition forms are submitted version by version as batches are compiled, and rosters are supplemented in real time as sign-ins occur. When entering the form input node, the notice assumes the role of field template, the recognition form assumes the role of main record, and the roster assumes the role of verification basis. The field names, dates, and signature fields of the three must be aligned within the same version to form a signable material draft and handover record.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The signable material draft and handover record are completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters the interaction state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Training notice | Fields correspond one-to-one with the credit recognition form and attendance roster, and dates and signature fields are consistent within the category verification dimension | Check field names one by one in the node configuration, and confirm that the training name, start and end dates, and class hours in the notice are aligned with the recognition form and roster in the same version |
| Credit recognition form | Key material fields are marked as required, and the responsible person's signature and receipt field are not empty | Check the required settings one by one, and check whether the signature and receipt fields are passed along with the form submission |
| Attendance roster | Subsequent nodes can retrieve the corresponding field values, and the roster name, quantity, and date are consistent with the recognition form | Reference this field in a subsequent node and run a trial. After submitting with `formInput`, check whether the roster field values are readable |
| Handover record | Version and date are consistent, missing items are blocked, and the responsible person is clear | Draft one according to the template and complete one handover. Check whether the version selected by `userSelect` and the date submitted by `formInput` are the same version |

## Three common errors

- Symptom: The same teacher's name and class hours do not match between the notice and the recognition form. Cause: The two materials maintain fields separately and are not aligned according to the same version template.
- Symptom: The recognition form has been revised, but the attendance roster still uses the old version's date and signature field. Cause: The versions were not synchronized, and the version number and date were not checked during handover.
- Symptom: The handover record lacks a signature or receipt, and subsequent nodes cannot retrieve values. Cause: Required items can be submitted even when empty, and the conversation stays in the interaction state.

## How to verify the setup

Acceptance of this feature: Fill in once and submit, check the field values retrieved by subsequent nodes, and confirm that the required fields submitted by `formInput` and the options selected by `userSelect` are both read by subsequent nodes.

Business test: Draft one according to the template and complete one handover. See whether missing items are blocked, and check whether the name, quantity, date, and signature receipt are complete.

- Check field names and required markers one by one in the node configuration, and confirm that the fields of the training notice, credit recognition form, and attendance roster correspond one-to-one.
- Reference this field in a subsequent node and run a trial. Check the output values of `formInputResult` and `selectResult`, and confirm that the handover record version and date are consistent.
