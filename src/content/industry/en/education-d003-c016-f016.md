---
title: Forms and User Interaction for School Safety Inspections and Incident Reporting: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c016-f016
page_type: 行业问题页
application_area: education
meta_title: Campus Safety | Forms | Intake
meta_description: Campus Safety: review forms for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for School Safety Inspections and Incident Reporting: Handle Questions and Collect Missing Information

## What this category's data looks like

This page focuses on intake question-answering for school safety hazard inspections and campus incident reporting, with materials drawn from three categories: safety inspection checklists, hazard rectification ledgers, and emergency incident reports. Safety inspection checklists are updated weekly or monthly, with fields including inspection date, inspector, hazard name, quantity, rectification deadline, and signature; hazard rectification ledgers are updated according to the rectification closure cadence, with fields including hazard number, rectification responsible person, completion date, acceptance inspector, and receipt; emergency incident reports are submitted immediately when an incident occurs, with fields including incident name, occurrence time, number of people involved, reporter, and receiving signature. When these three categories of materials enter the form input node, each plays a different role: safety inspection checklists provide the original hazard records, hazard rectification ledgers provide the rectification process and acceptance evidence, and emergency incident reports provide the incident overview and reporting trail. For the same hazard, the name, quantity, and date in the safety inspection checklist and the rectification ledger must be compared item by item; when versions are not synchronized or signatures/receipts are missing, the intake record and the follow-up questions to be completed should prioritize asking about the missing fields.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The intake record and the follow-up questions to be completed are then handled by subsequent nodes or manually. After the form input node is triggered, the conversation enters the interaction state and records the workflow state; after the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Safety inspection checklist | Whether inspection date, inspector, hazard name, quantity, rectification deadline, and signature are complete | Check the field names and required markers one by one in the node configuration, and after a trial run confirm that subsequent nodes can retrieve the corresponding field values |
| Hazard rectification ledger | Whether hazard number, rectification responsible person, completion date, acceptance inspector, and receipt are consistent with the safety inspection checklist | Compare the name, quantity, and date of the same hazard in the two materials, mark missing items as required, and trigger follow-up questions |
| Emergency incident report | Whether incident name, occurrence time, number of people involved, reporter, and receiving signature are complete | Check the reporting time and receiving signature; when the signature or receipt is missing, list it as a pending follow-up item in the intake record |
| `formInputResult` and `selectResult` | Form fields correspond one-to-one with material fields, and required items cannot be submitted when empty | Reference the `formInputResult` fields in subsequent nodes and run a trial, and use `userSelect` to select the knowledge base or handler |

## Three common errors

- Symptom: the name, quantity, and date of the same hazard do not match between the safety inspection checklist and the rectification ledger. Cause: the two materials are entered separately, without cross-comparison and version synchronization.
- Symptom: the emergency incident report lacks a receiving signature or receipt, but the intake record still continues to flow. Cause: the required markers do not cover the signature and receipt fields, and submission is not blocked beforehand.
- Symptom: after submission, subsequent nodes cannot retrieve the field values, and the conversation remains in the interaction state. Cause: field names are inconsistent with the references in subsequent nodes, or required items can still be submitted when empty.

## How to verify the setup

Acceptance of this feature: fill in the form once and submit it, check the field values retrieved by subsequent nodes, and confirm that the `formInputResult` fields correspond one-to-one with the material fields and that required items cannot be submitted when empty.

Business test: submit a question that lacks key information and see whether it asks follow-up questions before answering; the follow-up items should cover the missing items in the safety inspection checklist, rectification ledger, and emergency incident report.

- Check the field names and required markers one by one in the node configuration, and ensure that the key fields of the safety inspection checklist, hazard rectification ledger, and emergency incident report are marked as required.
- Reference the `formInputResult` fields in subsequent nodes and run a trial, use `userSelect` to select the knowledge base or handler, and confirm that the field values can be passed after submission.
