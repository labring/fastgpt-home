---
title: Forms and User Interaction for Off-Campus Training Registration and Compliance: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c045-f016
page_type: 行业问题页
application_area: education
meta_title: Training Compliance | Forms | Intake
meta_description: Training Compliance: review forms for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Off-Campus Training Registration and Compliance: Handle Questions and Collect Missing Information

## What this category's data looks like

This page focuses on the material flow in the intake and follow-up questioning stage of off-campus training compliance filing and penalty response. The materials come from three categories: school operation license, course filing materials, and fee disclosure. The update rhythm is triggered by nodes such as filing changes, annual inspections, and penalty rectification. The school operation license carries the institution name, address, validity period, and signature and seal; the course filing materials carry the course name, number of class hours, filing date, and handler signature; the fee disclosure carries fee items, amounts, disclosure date, and receipt. When the three types of materials enter the form input node, each is collected as a set of fields: license fields are used to verify the subject identity, course filing fields are used to verify the course and number of class hours, and fee disclosure fields are used to verify fee items and disclosure date. The field characteristics are the coexistence of four types of elements: dates, names, quantities, and signatures. The name, quantity, and date of the same record in different materials must remain consistent, and versions and receipts must be synchronized.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The "intake record and items to be completed" are then completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters the interaction state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| School operation license | Whether the institution name, address, validity period, and signature and seal are consistent with the course filing materials | Check the field names one by one in the node configuration, confirm that the license fields correspond one-to-one with the course filing fields, and check the date and signature columns |
| Course filing materials | Whether the course name, number of class hours, filing date, and handler signature are consistent with the fee disclosure | Check the required settings one by one, confirm that the course name and number of class hours are marked as required, and check the filing date and signature receipt |
| Fee disclosure | Whether the fee items, amounts, disclosure date, and receipt are consistent with the school operation license and course filing materials | Reference this field in subsequent nodes and run a test to confirm that the fee items and disclosure date can retrieve the corresponding field values |
| Form input node | Field names correspond one-to-one with material fields, required markings, and field passing after submission | Check the field names one by one in the node configuration, check the required settings one by one, and reference this field in subsequent nodes and run a test |

## Three common errors

- Phenomenon: The same institution name is written differently in the school operation license and the course filing materials. Cause: The two materials are filled in separately, without field-level comparison and version synchronization.
- Phenomenon: The number of class hours does not match between the course filing materials and the fee disclosure. Cause: After the filing change, the fee disclosure was not updated synchronously, and the versions were not synchronized.
- Phenomenon: The fee disclosure lacks a handler signature or receipt. Cause: At submission, the signature and receipt were not marked as required, and the missing item was not identified and followed up.

## How to verify the setup

Acceptance of this feature: fill it out once and submit, and check the field values retrieved by subsequent nodes; check the field names one by one in the node configuration, check the required settings one by one, and reference this field in subsequent nodes and run a test to confirm that `formInputResult` and `selectResult` are passed correctly.

Business test: submit a question that lacks key information and see whether it first asks a follow-up question before answering; if the school operation license validity period or course filing signature is missing, it should first ask follow-up questions to complete it before transferring to the handler.

- Check the field names one by one in the node configuration, confirm that the fields of the school operation license, course filing materials, and fee disclosure correspond one-to-one with the materials, and check the date and signature columns.
- Check the required settings one by one, confirm that the key material fields are marked as required; reference this field in subsequent nodes and run a test to confirm that the fields are passed normally after submission.
