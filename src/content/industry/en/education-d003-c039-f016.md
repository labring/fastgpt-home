---
title: Forms and User Interaction for Exam Organization and Misconduct Handling: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c039-f016
page_type: 行业问题页
application_area: education
meta_title: Exam Administration | Forms | Intake
meta_description: Exam Administration: review forms for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Exam Organization and Misconduct Handling: Handle Questions and Collect Missing Information

## What this category's data looks like

Materials in the exam organization and violation handling category are mainly exam administration manuals, examination room record sheets, and violation fact records. Exam administration manuals come from the exam administration department and are updated by exam season or year; their fields include exam name, session, time, test site, invigilation arrangements, violation handling clauses, and signature fields; examination room record sheets are filled in on the spot by invigilators, and their fields include examination room number, expected and actual number of candidates, absent candidate list, description of abnormal situations, and invigilator signature; violation fact records are filled in by invigilators or roving inspectors, and their fields include candidate information, violation behavior, evidence list, date, and signature of the party involved. When these three types of materials enter the form input node, their roles differ: the exam administration manual provides field definitions and the basis for required fields, the examination room record sheet provides on-site data, and the violation fact record provides the facts and signature chain. In terms of update cadence, the manual is synchronized with institutional versions, while record sheets and fact records are produced one by one per session and need to be aligned item by item by date and signature.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The "intake record and items to be completed" is then handled by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and records the workflow state; after the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Exam administration manual | Field definitions and basis for required fields: check whether the exam name, session, date, test site, and violation handling clauses are consistent with the manual version, and whether the signature fields are complete | Check the field names one by one in the node configuration, confirm that the manual fields correspond one-to-one with the form fields, and check the required settings |
| Examination room record sheet | On-site data consistency: check whether the expected and actual number of candidates, absent candidate list, and description of abnormal situations match the manual definitions, and whether the date and invigilator signature are missing | Check the field names and required markers in the node configuration, and after a trial submission check whether subsequent nodes can retrieve the corresponding field values |
| Violation fact record | Facts and signature chain: check whether the candidate information, violation behavior, evidence list, date, and signature of the party involved are consistent with the examination room record sheet, and whether the receipt is complete | Reference this field in a subsequent node and run a trial to confirm that the field value can be retrieved; missing items are completed by subsequent nodes or manual follow-up |

## Three common errors

- Symptom: the name, quantity, and date of the same record do not match between the examination room record sheet and the violation fact record. Cause: the two materials are filled in separately, lacking cross-material field comparison and receipt verification.
- Symptom: the exam administration manual version is not synchronized, and the form still collects fields according to the old definitions. Cause: after the manual is updated, the node field names and required settings are not synchronized, and version verification is missing.
- Symptom: the violation fact record lacks a signature or receipt, yet it still enters subsequent processing after submission. Cause: the required markers do not cover the signature and receipt fields, and field transfer is not validated after submission.

## How to verify the setup

Acceptance for this feature: fill out the form once and submit it, then check whether the field values retrieved by subsequent nodes are consistent with what was filled in, focusing on whether the `formInputResult` and `selectResult` fields can be referenced by subsequent nodes.

Business test: submit a question that lacks key information and see whether it asks follow-up questions before answering; only after the missing items are identified and followed up on is it transferred to the handler.

- Check the field names one by one in the node configuration, confirm that they correspond one-to-one with the fields of the exam administration manual, examination room record sheet, and violation fact record, and check the required settings.
- Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a trial to confirm that the field values can be retrieved after submission; missing items are completed by subsequent nodes or manual follow-up.
