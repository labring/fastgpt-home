---
title: Forms and User Interaction for Laboratory Hazardous Chemical Purchasing and Records: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c065-f016
page_type: 行业问题页
application_area: education
meta_title: Lab Chemicals | Forms | Intake
meta_description: Lab Chemicals: review forms for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Laboratory Hazardous Chemical Purchasing and Records: Handle Questions and Collect Missing Information

## What this category's data looks like

For this category, materials come from three types: procurement application forms, usage registration forms, and inventory ledgers. The procurement application form records product name, specification, quantity, purpose, application date, and approval signature; the usage registration form records the user, usage date, quantity, remaining amount, and custodian signature; the inventory ledger records inbound date, outbound date, balance quantity, and inventory check signature. The three types of materials update at different rhythms: procurement applications are submitted as needs arise, usage registrations are recorded per instance, and inventory ledgers are summarized weekly or monthly. When the materials enter the form input node, their respective roles are: the procurement application form provides application fields, the usage registration provides usage fields, and the inventory ledger provides balance fields. Field characteristics are four types: name, quantity, date, and signature, which need to be aligned item by item to avoid the same record's name, quantity, and date not matching across two materials, or versions not being synchronized, or missing signatures and receipts.

## Configuration and implementation checks

| Object | Check | Verification action |
| --- | --- | --- |
| Item | Judgment | Verification Action |
| Purchase Requisition Form | Whether the product name, specifications, quantity, application date, and approval signature correspond consistently with the Requisition Registration Form and Inventory Ledger | Check the field names one by one in the node configuration, confirm that the fields of the Purchase Requisition Form correspond one-to-one with the material fields, and verify the required-field settings |
| Requisition Registration Form | Whether the requisitioner, requisition date, quantity, remaining quantity, and custodian signature match the dates and balances in the Inventory Ledger | Reference this field in subsequent nodes and run a test to confirm that subsequent nodes can retrieve the corresponding field values |
| Inventory Ledger | Whether the inbound date, outbound date, balance quantity, and inventory count signature are synchronized with the versions of the Purchase Requisition Form and Requisition Registration Form | Check the required-field settings one by one, confirm that key material fields are marked as required, and verify that the field names correspond to the material fields |

## Three common errors

- Symptom: The name and quantity of the same record do not match between the procurement application form and the inventory ledger. Cause: The two materials are filled in separately and not aligned item by item by field name, resulting in inconsistent values retrieved by subsequent nodes.
- Symptom: The dates and balance quantities do not match between the usage registration form and the inventory ledger. Cause: Versions are not synchronized; usage registrations are updated per instance while the inventory ledger is summarized weekly, causing discrepancies in the intervening period.
- Symptom: The procurement application form lacks an approval signature, and the usage registration form lacks a custodian signature or receipt. Cause: The required settings do not cover signature fields, so submission still proceeds to subsequent nodes, and the intake record is incomplete.

## How to verify the setup

Acceptance for this feature: fill in and submit once, check the field values retrieved by subsequent nodes, and confirm that both the `formInputResult` fields and `userSelect` selections are passed correctly.

Business test: submit a question missing key information, see whether it first asks a follow-up before answering, then check whether the intake record and the items to be completed are handled by subsequent nodes or manually.

- Check field names one by one in the node configuration, confirm that the fields of the procurement application form, usage registration form, and inventory ledger correspond one-to-one with the material fields, and check the required settings one by one.
- Reference `formInputResult` and `selectResult` in subsequent nodes and run a test to confirm that after submission subsequent nodes can retrieve the corresponding field values and that the conversation does not remain in the interactive state.
