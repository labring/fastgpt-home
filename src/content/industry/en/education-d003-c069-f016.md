---
title: Forms and User Interaction for Journal Publication Licensing and Annual Verification: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c069-f016
page_type: 行业问题页
application_area: education
meta_title: Journal Licensing | Forms | Intake
meta_description: Journal Licensing: review forms for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Journal Publication Licensing and Annual Verification: Handle Questions and Collect Missing Information

## What this category's data looks like

Journal publication licenses and annual verification are routine matters in journal publication management. Materials usually include three types: journal publication license, annual verification form, and rectification report. Sources are submissions from publishing units and records kept by the competent authority, and the update cadence advances annually or by rectification cycle. The license states the name, publication number, sponsoring unit, and validity period; the verification form states annual publication data, personnel, and asset information; the rectification report states the problem, measures, and completion date. When the three types of materials enter this feature, their roles differ: the license and verification form provide base fields and date signatures, while the rectification report supplements problem and receipt information. Fields must be compared item by item for name, quantity, and date.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The intake record and the questions to be completed are then handled by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Journal publication license | Whether the name, publication number, sponsoring unit, validity period, and signature are consistent with the verification form | Check the field names one by one in the node configuration, and confirm that the license fields correspond one-to-one with the verification form fields |
| Annual verification form | Whether the annual data, date, signature, and receipt match the license and rectification report | Check the required settings one by one, and confirm that the key fields of the verification form are marked as required |
| Rectification report | Whether the problem, measures, completion date, and signature are consistent with the verification form records | Reference this field in subsequent nodes and run a test to confirm that the rectification report field values can be retrieved |
| formInput | Whether the field names correspond one-to-one with the material fields, and whether they can be passed after submission | Check the correspondence between the `formInputResult` field names and the material fields, and run a test submission |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the license and the verification form. Cause: The two materials are filled in separately, without field-level comparison and receipt checking.
- Symptom: The rectification report version is not synchronized, and old-version problems are mixed with new-version measures. Cause: After the version update, the old file was not replaced, and the field values still take content from the old version.
- Symptom: The verification form lacks a signature or receipt, but it still enters subsequent nodes after submission. Cause: The required markers do not cover the signature and receipt fields, and missing items are not followed up.

## How to verify the setup

This feature's acceptance: fill it out once and submit, then check the field values retrieved by subsequent nodes, and confirm that the `formInputResult` and `selectResult` field values can be passed correctly.

Business test: submit a question that lacks key information, see whether it first follows up before answering, and confirm that the missing item is identified and followed up, and that the answer has a material basis.

- Check the field names one by one in the node configuration, and confirm that they correspond one-to-one with the fields of the journal publication license, annual verification form, and rectification report.
- Check the required settings one by one, confirm that the key material fields are marked as required, and run a test submission to confirm that subsequent nodes can retrieve the corresponding field values.
