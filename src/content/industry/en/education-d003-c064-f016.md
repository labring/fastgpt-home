---
title: Forms and User Interaction for University Laboratory Safety Classification: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c064-f016
page_type: 行业问题页
application_area: education
meta_title: Lab Safety Categories | Forms | Intake
meta_description: Lab Safety Categories: review forms for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for University Laboratory Safety Classification: Handle Questions and Collect Missing Information

## What this category's data looks like

Materials for university laboratory safety grading and classification come from the laboratory grading and classification table, the hazard source list, and the safety responsibility statement. The grading and classification table lists the level, hazard category, and control tier by room and experimental project, and is updated with each round of safety assessment; the hazard source list records name, quantity, storage location, and responsible person item by item, and is updated as procurement, requisition, and disposal change; the safety responsibility statement states the responsible person and signature and date, and is re-signed by academic year or upon personnel change. When the three types of materials enter this feature, their roles differ: the grading and classification table provides the level and category fields, the hazard source list provides the name, quantity, and date fields, and the safety responsibility statement provides the signature and receipt fields. The field characteristics are cross-table intersection, inconsistent naming conventions, varying date formats, and signature columns that are easily left blank. During intake, values are taken item by item according to the tables; any missing item immediately forms a pending follow-up question item, and after it is completed it is forwarded to the handler.

## Configuration and implementation checks

This step is performed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The intake record and the completed question items are finished by subsequent nodes or manually. After the form input node is triggered, the conversation enters the interaction state and records the workflow state; after the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Laboratory grading and classification table | Whether the room level, hazard category, and control tier fields are consistent with the name, quantity, and date of the same record in the hazard source list; whether the versions are synchronized | In the node configuration, check field names one by one against the column items of the grading and classification table, check the required settings item by item, then reference the field in a subsequent node and do a trial run |
| Hazard source list | Whether the name, quantity, storage location, and responsible person fields can be aligned item by item with the grading and classification table; whether the date falls within the validity period | Use `formInput` to submit a set of list fields, and check the name and quantity retrieved by the subsequent node; trigger a follow-up question for missing fields |
| Safety responsibility statement | Whether the responsible person and the signature and receipt fields are complete; whether the signature date matches the assessment date of the grading and classification table | Check the required markers of the signature and receipt fields one by one, and after submission reference them in a subsequent node and do a trial run to confirm that the signature and date values are retrieved |
| Form fields and required markers | Whether the key material fields have been marked as required, and whether the field names correspond one-to-one with the material column items | In the node configuration, check the field names and required settings one by one, use `userSelect` to choose the question item type, then submit and do a trial run |

## Three common errors

- Symptom: the name, quantity, and date of the same laboratory do not match between the grading and classification table and the hazard source list. Cause: the two tables are maintained separately, without cross-checking and version synchronization.
- Symptom: the safety responsibility statement lacks a signature or receipt, yet the intake record is still treated as complete material. Cause: the signature and receipt fields are not marked as required, and empty values are not blocked at submission.
- Symptom: after submission, subsequent nodes cannot retrieve the field values, and the conversation stays in the interaction state. Cause: the field names are inconsistent with the references in subsequent nodes, or required items can still be submitted when empty.

## How to verify the setup

Acceptance of this feature: fill in the form once and submit it, check the field values retrieved by subsequent nodes, and confirm that the values of `formInputResult` and `selectResult` can be passed to subsequent nodes.

Business test: submit a question that lacks key information, and see whether it asks a follow-up question first before answering.

- In the node configuration, check field names one by one against the column items of the grading and classification table, the hazard source list, and the safety responsibility statement, and check the required settings one by one.
- After submission, reference the corresponding fields in subsequent nodes and do a trial run to confirm that the name, quantity, date, signature, and receipt values can all be retrieved.
