---
title: Forms and User Interaction for Graduate Admissions Interviews and Selection: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c024-f016
page_type: 行业问题页
application_area: education
meta_title: Graduate Admissions | Forms | Access
meta_description: Graduate Admissions: review forms for authorized access. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Graduate Admissions Interviews and Selection: Manage Authorized Access and External Services

## What this category's data looks like

In the graduate admissions re-examination and admission scenario, the external entry points and authorization scope involve three types of materials: the re-examination plan, the candidate score sheet, and the adjustment list. The re-examination plan is published by the admissions unit by annual batch, and contains time nodes and signature fields; the candidate score sheet comes from the preliminary and re-examination scoring records, with fields including candidate number, subject, score, and date; the adjustment list is dynamically updated by adjustment batch, with fields including name, original application unit, proposed admission major, and receipt status. When the materials enter the form input node, each plays a different role: the re-examination plan serves as the basis for the authorization scope, the candidate score sheet serves as the verification source for matching identity and visible scope, and the adjustment list serves as the object of restricted display in external services. In terms of update rhythm, the plan is by batch, the score sheet is by session, and the list is by adjustment round, with field characteristics mainly consisting of candidate number, date, signature, and receipt.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The external entry points and authorization scope are then completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters the interaction state and records the workflow state; after the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Re-examination plan | Whether the fields, dates, and signatures are consistent with the batch | Check the field names one by one in the node configuration, confirm that the dates and signature fields in the plan correspond; reference the fields with `formInputResult` and run a test |
| Candidate score sheet | Whether the name, quantity, and date of the same candidate match between the score sheet and the list | Check the required settings one by one, confirm that the candidate number and score fields are marked as required; use `userSelect` to select a restricted identity and run a test |
| Adjustment list | Whether the version is synchronized and the receipts are complete | Reference this field in subsequent nodes and run a test, check the list version and receipt status; use `formInput` to retrieve the field value and verify the transfer |
| External entry points and authorization scope | Whether the visitor identity matches the visible scope, and whether unauthorized access is invisible | Access once with a restricted identity and see whether the visible scope matches the settings; check whether submission is possible when required items are empty |

## Three common errors

- Symptom: The name, quantity, and date of the same candidate do not match between the score sheet and the adjustment list. Cause: The two materials are maintained separately, versions are not synchronized, and field definitions are inconsistent.
- Symptom: The re-examination plan lacks a signature or receipt, yet the external entry point is still accessible. Cause: The required markers do not cover the signature and receipt fields, and no validation is performed after submission.
- Symptom: After submission, subsequent nodes cannot retrieve the values, and the conversation stays in the interaction state. Cause: The field names are inconsistent with subsequent references, or submission is possible even when required items are empty.

## How to verify the setup

Acceptance of this feature: fill in once and submit, check the field values retrieved by subsequent nodes, and confirm that the field values corresponding to `formInputResult` and `selectResult` are passed correctly.

Business test: access once with a restricted identity, see whether the visible scope matches the settings, and confirm that unauthorized access is invisible.

- Check the field names and required settings one by one in the node configuration, ensuring they correspond one-to-one with the fields of the re-examination plan, candidate score sheet, and adjustment list.
- Reference this field in subsequent nodes and run a test, confirm that the field transfer after submission is normal, and that the conversation is not interrupted by the interaction state.
