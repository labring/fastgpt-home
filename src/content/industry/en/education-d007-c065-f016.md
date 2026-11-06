---
title: Forms and User Interaction for Laboratory Hazardous Chemical Purchasing and Records: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c065-f016
page_type: 行业问题页
application_area: education
meta_title: Lab Chemicals | Forms | Review
meta_description: Lab Chemicals: review forms for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Laboratory Hazardous Chemical Purchasing and Records: Trace Exceptions and Review Results

## What this category's data looks like

The data for this category looks like this: Laboratory hazardous chemical procurement and ledger involve three types of materials: hazardous chemical procurement applications, requisition registrations, and inventory ledgers. Procurement applications are submitted by users, with fields including product name, specification, quantity, purpose, application date, and approval signature; requisition registrations come from custodians, with fields including requisitioner, product name, quantity, requisition date, and signatures of both parties; inventory ledgers come from warehouse keepers, with fields including balance quantity, inbound and outbound dates, and review signature. The three types of materials are updated by batch. Procurement applications flow with approval, requisition registrations are recorded in real time with each requisition, and inventory ledgers are balanced daily or by batch. In terms of field characteristics, product name, quantity, and date appear repeatedly across the three materials, and signatures and receipts are the points of responsibility. When entering the form input node, procurement application fields are used to initiate traceability, requisition registration fields are used to locate consumption, and inventory ledger fields are used to check balances. Together, the three support the original record comparison for the exception list.

## Configuration and implementation checks

Configuration and implementation checks: This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The "exception list and review conclusion" is completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Hazardous chemical procurement application | Product name, quantity, application date, and approval signature must be aligned item by item with the requisition registration and inventory ledger | Check the field names one by one in the node configuration, confirm that the product name, quantity, date, and signature fields are consistent with the application materials, and check the `formInputResult` field names |
| Requisition registration | Requisitioner, product name, quantity, requisition date, and signatures of both parties must be cross-consistent with the procurement application and inventory ledger | Check the required settings one by one, confirm that requisitioner, quantity, date, and signature are required, and check the `userSelect` option values |
| Inventory ledger | Balance quantity, inbound and outbound dates, and review signature must match the procurement application and requisition registration | Reference this field in subsequent nodes and run a test to confirm that the balance quantity and date can be retrieved, and record the status value as indexed |
| formInput | The field transfer after submission must cover the above material fields, and subsequent nodes must be able to retrieve the corresponding field values | Reference the `formInputResult` field in subsequent nodes and run a test to check the retrieved field values |

## Three common errors

- Symptom: The name and quantity of the same record do not match between the procurement application and the requisition registration. Cause: The two materials are entered separately and are not cross-checked against the same product name and quantity fields.
- Symptom: The inventory ledger version is not synchronized, and the balance quantity is inconsistent with the requisition registration date. Cause: The ledger is updated daily while requisition registrations are recorded in real time, so the update rhythms are not synchronized.
- Symptom: The requisition registration lacks a signature or receipt, and the review conclusion has no signature support. Cause: Key material fields are not marked as required, and empty values are not blocked on submission.

## How to verify the setup

Acceptance for this feature: Fill out the form once and submit it, check the field values retrieved by subsequent nodes, and confirm that both the `formInputResult` fields and `userSelect` option values are passed correctly, with the status value recorded as indexed.

Business test: Create an exception record and see whether the source material can be traced.

- Check the field names one by one, confirm that the product name, quantity, date, and signature fields of the procurement application, requisition registration, and inventory ledger correspond one to one, and check the `formInputResult` field names
- Check the required settings one by one, confirm that key material fields are marked as required, and that subsequent nodes can retrieve the corresponding field values after submission, and check the `userSelect` option values
