---
title: Forms and User Interaction for School Safety Inspections and Incident Reporting: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c016-f016
page_type: 行业问题页
application_area: education
meta_title: Campus Safety | Forms | Review
meta_description: Campus Safety: review forms for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for School Safety Inspections and Incident Reporting: Trace Exceptions and Review Results

## What this category's data looks like

For the category of school safety hazard inspections and campus incident reporting, there are three core types of materials: safety inspection checklists, hazard rectification ledgers, and emergency incident reports. Safety inspection checklists are filled out by duty-week teachers or security personnel during weekly patrols, with fields including inspection date, location name, hazard description, and preliminary severity level; hazard rectification ledgers are summarized monthly by logistics or the safety office, with fields including hazard name, rectification quantity, responsible person, closure date, and signature; emergency incident reports are submitted by the on-site discoverer on the day of the incident, with fields including incident name, number of people involved, occurrence date, handling receipt, and review signature. When the three types of materials enter the form input node, their roles differ: safety inspection checklists provide the original discovery records, rectification ledgers provide the basis for handling and closure, and emergency incident reports provide the source materials for abnormal traceability. In terms of update cadence, checklists are weekly, ledgers are monthly, and reports are triggered by incidents; the date and signature fields are the key anchors for aligning the two materials during subsequent manual review.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The "abnormal list and review conclusion" is completed by subsequent nodes or manually. After the node is triggered, the conversation enters the interaction state and records the workflow state; after the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Safety inspection checklist | Fields, dates, and signatures must be aligned item by item with the hazard rectification ledger; the same hazard name, quantity, and discovery date must not mismatch between the two materials | Check the field names one by one in the node configuration, confirm that the hazard name, quantity, inspection date, and inspector signature fields are consistent with the ledger; reference the fields with `formInputResult` and run a trial |
| Hazard rectification ledger | The version must be synchronized with the safety inspection checklist; if the closure date or responsible person's signature is missing, it is deemed not closed-loop and must not directly enter handling | Check whether the required markers cover the closure date and signature; use `userSelect` to select the ledger version and submit, then check whether the field values obtained by subsequent nodes include the signature and receipt |
| Emergency incident report | The incident name, number of people involved, and occurrence date must be consistent with the original records; if the review signature or handling receipt is missing, the abnormal list must not be generated | Check the required settings one by one, confirm that the review signature and receipt are required; after submission, check that the conversation leaves the interaction state and whether subsequent nodes can obtain the corresponding field values |

## Three common errors

- Symptom: The same hazard's name and quantity mismatch between the inspection checklist and the rectification ledger. Cause: The two materials are filled out separately, without using the original records as the anchor for field-by-field alignment, making it impossible to trace the source during manual review.
- Symptom: The ledger version is not synchronized, and the old version still shows as not closed. Cause: The update cadences differ, with checklists weekly and ledgers monthly, and the version and date fields are not checked at submission.
- Symptom: The emergency incident report lacks a review signature or handling receipt. Cause: The required markers do not cover the signature and receipt fields, so after submission subsequent nodes cannot obtain the values, and the abnormal list cannot be handed to the responsible person for handling.

## How to verify the setup

Acceptance of this feature: Fill out a safety inspection checklist once and submit it, check whether the field values obtained by subsequent nodes include the hazard name, quantity, date, and signature, and confirm that the `formInputResult` and `selectResult` references are valid.

Business test: Create an abnormal record, see whether it can be traced back to the source material, verify that the abnormality is supported by original records and the reviewer's signature, and then hand it to the responsible person for handling.

- Check the field names and required markers one by one in the node configuration, confirm that the key material fields are marked as required, and that submission is not possible when required items are empty.
- Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a trial, confirm that the corresponding field values can be obtained after submission and that the conversation does not get stuck in the interaction state.
