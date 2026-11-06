---
title: Forms and User Interaction for Journal Publication Licensing and Annual Verification: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c069-f016
page_type: 行业问题页
application_area: education
meta_title: Journal Licensing | Forms | Handover
meta_description: Journal Licensing: review forms for material handover. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Journal Publication Licensing and Annual Verification: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

Journal publishing licenses and annual verification involve three types of materials: the journal publishing license, the annual verification form, and the rectification report. The license is issued by the competent authority, and its fields include journal name, journal number, sponsoring organization, validity period, and signature; the annual verification form is updated on an annual cycle, and its fields include journal name, journal number, publishing status, verification conclusion, and signature; the rectification report is submitted according to rectification matters, and its fields include problem description, rectification measures, completion date, and signature. When these three types of materials enter the form input node, each plays a different role: the license and the annual verification form provide basic information and annual status, while the rectification report supplements the problems and completion status. The source of the materials is offline drafting or system import, and the update rhythm is triggered by the annual verification cycle and rectification matters. Field characteristics are concentrated in names, quantities, dates, and signatures, and must be mapped item by item in the form.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, and outputs the field values filled in by the user (passed to subsequent nodes after submission). The "issuable material drafts and handover records" are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Journal publishing license | Fields are complete, and the name, journal number, validity period, and signature are consistent | Check the field names and required markers one by one in the node configuration, and confirm that the license fields correspond one-to-one with the template |
| Annual verification form | Fields are complete, and the journal name, journal number, publishing status, verification conclusion, and date are consistent | Check the required settings one by one, and confirm that the annual verification form fields match the name, quantity, and date in the license record |
| Rectification report | Fields are complete, and the problem description, rectification measures, completion date, and signature are consistent | Reference this field in a subsequent node and run a trial to confirm that the rectification report field values can be retrieved and the version is synchronized |
| Form input node | Required markers and field passing meet the requirements | Check the `formInputResult` and `selectResult` field names in the node configuration, and run a trial to confirm that subsequent nodes retrieve the corresponding field values after submission |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the license and the annual verification form. Cause: The two materials were drafted separately, the fields were not checked in a unified way, and the versions were not synchronized.
- Symptom: The rectification report lacks a signature or receipt, and the handover record is incomplete. Cause: The signature step was not included as a required item in the form, and it was not confirmed item by item during handover.
- Symptom: After submission, subsequent nodes cannot retrieve the values, and the conversation remains in the interaction state. Cause: Submission is still possible when required items are empty, and field passing was not referenced and trial-run in subsequent nodes.

## How to verify the setup

Acceptance for this feature: fill it out once and submit, check the field values retrieved by subsequent nodes, and confirm that the `formInputResult` and `selectResult` field names correspond and that empty required items are blocked.

Business test: draft one copy according to the template and complete one handover, and see whether missing items are blocked.

- Check the field names and required markers one by one in the node configuration, and confirm that they correspond one-to-one with the material template.
- Reference this field in a subsequent node and run a trial to confirm that after submission the field values are passed correctly and the version and date are consistent.
