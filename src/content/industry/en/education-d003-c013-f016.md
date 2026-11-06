---
title: Forms and User Interaction for School Teacher Training Credits: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c013-f016
page_type: 行业问题页
application_area: education
meta_title: Teacher Credits | Forms | Intake
meta_description: Teacher Credits: review forms for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for School Teacher Training Credits: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the primary and secondary school teacher training credit management scenario. Material sources include three categories: training notices, credit recognition forms, and attendance rosters, usually updated by the teacher development center or school administrators by training batch and semester node. Training notices state the project name, start and end dates, credit hours, and signature/seal requirements; credit recognition forms record teacher name, ID number, training project, recognized credits, and review signature; attendance rosters list participants, units, attendance, and receipt status. When these three types of materials enter the form input node, each plays a different role: the notice provides the project and time baseline, the recognition form provides the credit values and signature basis, and the roster provides the personnel scope and attendance evidence. Field characteristics center on name, project name, date, credit hours, credits, signature, and receipt. The same record often shows inconsistent names, quantities, and dates across different materials, with versions not synchronized or missing signatures/receipts, requiring item-by-item comparison during the intake stage.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The intake record and the questions for completing missing items are handled by subsequent nodes or manually. After the form input node is triggered, the conversation enters the interaction state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Training notice | Whether the project name, start and end dates, credit hours, and signature/seal requirements are consistent with the credit recognition form | Check the field names one by one in the node configuration, confirm that the notice fields correspond one-to-one with the recognition form fields, and check the required markers |
| Credit recognition form | Whether the teacher name, ID number, recognized credits, and review signature match the attendance roster | Reference the `formInputResult` field in subsequent nodes and run a test, checking whether the field values passed after submission retrieve the corresponding values |
| Attendance roster | Whether the participants, units, attendance, and receipts are synchronized with the versions of the notice and recognition form | Use `userSelect` to select the material version, and check item by item the names, quantities, and dates of the roster against the notice and recognition form |
| Form input node | Whether the required markers cover the key material fields, and whether subsequent nodes can retrieve the values after submission | Check the required settings one by one, reference `formInputResult` and `selectResult` in subsequent nodes and run a test, confirming that the field values can be passed |

## Three common errors

- Symptom: The name or project name of the same teacher does not match between the notice and the recognition form. Cause: The two materials were entered at different times, versions are not synchronized, and there is no unified comparison field.
- Symptom: The credit hours in the recognition form are inconsistent with the attendance count in the attendance roster. Cause: The roster was updated without writing back to the recognition form, and the quantity criteria were not checked under a unified standard.
- Symptom: The recognition form lacks a review signature or the attendance roster lacks a receipt. Cause: Signatures and receipts were not fully collected during the material circulation stage, and they were not marked as required items at submission.

## How to verify the setup

Acceptance of this feature: Fill out the form once and submit it, then check whether the field values retrieved by subsequent nodes are consistent with the filled-in content, focusing on the results passed by `formInputResult` and `selectResult`.

Business test: Submit a question missing key information and see whether it asks a follow-up question before answering.

- Check one by one whether the form field names correspond one-to-one with the fields of the training notice, credit recognition form, and attendance roster, and confirm that the key material fields are marked as required.
- Reference the `formInputResult` field in subsequent nodes and run a test to confirm that the corresponding field values can be retrieved after submission, and that the conversation no longer remains in the interaction state.
