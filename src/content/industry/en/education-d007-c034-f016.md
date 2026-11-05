---
title: Forms and User Interaction for Public Vocational Skills Level Assessment: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c034-f016
page_type: 行业问题页
application_area: education
meta_title: Skills Certification | Forms | Review
meta_description: Skills Certification: review forms for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Public Vocational Skills Level Assessment: Trace Exceptions and Review Results

## What this category's data looks like

The category materials for social evaluation of vocational skill level certification mainly consist of the evaluation implementation plan, candidate registration form, and assessor dispatch form. The evaluation implementation plan comes from the evaluation institution, is updated with each batch, and includes the occupation direction, level, assessment modules, and date arrangements; the candidate registration form is filled out by candidates and consolidated by the institution, and includes name, ID number, declared level, and years of work experience; the assessor dispatch form is generated after the institution schedules the assessment, and includes assessor name, certificate number, dispatch date, and signature field. When these three types of materials enter anomaly tracing and manual review, each plays a different role: the implementation plan provides the basis for judgment and the version baseline, the registration form provides the candidate's original records, and the dispatch form provides the assessment process and signed receipt. Field characteristics are concentrated in four categories: name, quantity, date, and signature. When versions are not synchronized or signed receipts are missing, the same record is likely to fail to match across the two materials, so it must be archived by batch and checked item by item.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, and outputs the field values filled in by the user (passed to subsequent nodes after submission). The "anomaly list and review conclusion" is completed by subsequent nodes or manually. After the form is triggered, the conversation enters the interaction state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Evaluation implementation plan | The name, date, and signature field must correspond item by item with the registration form and dispatch form, and the version number must be consistent | Check the field names one by one in the node configuration, and confirm that the implementation plan fields correspond one-to-one with the material fields to be collected |
| Candidate registration form | The candidate name, declared level, and years of work experience must match the level and date in the implementation plan; missing signatures or receipts must be marked | Check the required settings one by one, mark key material fields as required, and use `formInput` to reference the fields in a trial run |
| Assessor dispatch form | The assessor name, certificate number, and dispatch date must be consistent with the implementation plan batch, and receipts must be complete | Reference this field in subsequent nodes and run a trial to confirm that `userSelect` retrieves the corresponding field value |
| Anomaly list and review conclusion | Each anomaly must be supported by original records, and after the reviewer signs, it is handed to the responsible person for handling | Reference the field in subsequent nodes and run a trial to confirm that the field value can be passed to subsequent nodes after submission |

## Three common errors

- Phenomenon: The same candidate name is written differently in the registration form and dispatch form, and the quantity and date also fail to match. Cause: The two materials are entered separately and are not checked uniformly against the implementation plan version.
- Phenomenon: After the implementation plan is revised, the registration form is still filled in according to the old version's level and date. Cause: The version is not synchronized, and batch archiving is not updated with the plan.
- Phenomenon: The dispatch form lacks the assessor's signature or receipt, and the anomaly record cannot be traced back to the source material. Cause: Key material fields are not marked as required, and after submission subsequent nodes cannot retrieve the values.

## How to verify the setup

Acceptance of this function: fill it out once and submit, check the field values retrieved by subsequent nodes, and confirm that `formInputResult` and `selectResult` can reference the corresponding field values.

Business test: create an anomaly record and see whether it can be traced back to the source material.

- Check the field names one by one in the node configuration, and confirm that the form fields correspond one-to-one with the fields of the evaluation implementation plan, candidate registration form, and assessor dispatch form.
- Check the required settings one by one, confirm that key material fields are marked as required, and reference the field in subsequent nodes for a trial run to confirm that the field value can be passed after submission.
