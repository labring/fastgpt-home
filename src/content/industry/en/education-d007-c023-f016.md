---
title: Forms and User Interaction for Student Discipline and Appeals: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c023-f016
page_type: 行业问题页
application_area: education
meta_title: Student Appeals | Forms | Review
meta_description: Student Appeals: review forms for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Student Discipline and Appeals: Trace Exceptions and Review Results

## What this category's data looks like

In the student disciplinary and appeal handling category, materials include three types: disciplinary fact materials, disciplinary decision documents, and appeal statements. Disciplinary fact materials are submitted by the investigating party after the incident, recording time, place, behavior description, and evidence list; disciplinary decision documents are issued by the reviewing body after fact determination, including the type of disciplinary action, the clauses relied upon, effective date, and seal; appeal statements are filed by the student or a representative against an already effective disciplinary action, including the appeal request, reasons, date, and receipt. The three types of materials have different update rhythms: fact materials are supplemented and corrected as the investigation progresses, decision documents are finalized with the review conclusion, and appeal statements are triggered by the appeal deadline. Field characteristics center on name, student ID, reason, quantity, date, signature, and receipt number; the same record must maintain consistent name, quantity, and date across the three materials. When materials enter the form input node, each assumes its own role as a field source: fact materials are for exception comparison, decision documents are for conclusion citation, and appeal statements are for review triggering.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, outputting the field values filled in by the user (passed to subsequent nodes after submission). The "exception list and review conclusion" is completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and records the workflow state; after the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Disciplinary fact materials | Compare item by item with the disciplinary decision document and appeal statement: whether the name, quantity, and date of the same record are consistent, and whether signatures and receipts are complete | Check the field names one by one in the node configuration, confirm that the material fields correspond one-to-one with the form fields, and use `formInput` to reference the fields in a trial run |
| Disciplinary decision document | Check the type of disciplinary action, clauses relied upon, effective date, and seal against the disciplinary fact materials and appeal statement, and check whether the versions are synchronized | Check the required settings one by one, confirm that key material fields are marked as required, and after submission check whether subsequent nodes can obtain the corresponding field values |
| Appeal statement | Check the appeal request, reasons, date, and receipt against the disciplinary fact materials and disciplinary decision document, and confirm whether missing signatures or receipts can be identified | Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a trial to confirm that after submission the field values can be passed to the exception list |
| Form input node | Whether the correspondence between the three items—field names, required markers, and field passing after submission—and the material fields holds | Check the field names and required settings one by one in the node configuration, and after submission check whether the field values obtained by subsequent nodes are complete |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the disciplinary fact materials and the disciplinary decision document. Cause: The two materials are entered separately, without item-by-item comparison and version synchronization.
- Symptom: The appeal statement lacks a signature or receipt but still enters the review process. Cause: The required markers do not cover the signature and receipt fields, and completeness is not verified after submission.
- Symptom: After submission, subsequent nodes cannot obtain the field values, and the conversation remains in the interactive state. Cause: The field names are not aligned with the references in subsequent nodes, or required items can be submitted even when empty.

## How to verify the setup

Acceptance for this feature: fill out the form once and submit it, then check whether the field values obtained by subsequent nodes are consistent with the filled-in content, focusing on whether the `formInputResult` and `selectResult` references obtain values.

Business test: create an exception record, see whether it can be traced back to the source material, and confirm that the exception is supported by original records and the reviewer's signature.

- Check the field names one by one in the node configuration, and confirm that they correspond one-to-one with the fields of the disciplinary fact materials, disciplinary decision document, and appeal statement.
- Check the required settings one by one, and after submission check whether subsequent nodes can obtain the corresponding field values, and confirm that the exception list and review conclusion are handed to the responsible person for handling.
