---
title: Forms and User Interaction for Laboratory Hazardous Chemical Purchasing and Records: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c065-f016
page_type: 行业问题页
application_area: education
meta_title: Lab Chemicals | Forms | Handover
meta_description: Lab Chemicals: review forms for material handover. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Laboratory Hazardous Chemical Purchasing and Records: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

For this category, the data revolves around three types of materials: procurement applications, usage registrations, and inventory ledgers. Procurement applications arise from experimental needs and inventory gaps; usage registrations are generated immediately with each retrieval; inventory ledgers are summarized and updated by batch and cycle. Field characteristics center on name, quantity, date, responsible person, signature, and receipt, and the same record often needs to flow among applications, usage registrations, and ledgers. When materials enter the form input node, their roles differ: procurement applications serve as the basis for requirements and approval; usage registrations serve as the record of usage destination and remaining quantity changes; inventory ledgers serve as the balance and version baseline. Together, the three support the completeness of fields, clarity of responsible persons, and consistency of version and date for issuable material drafts and handover records.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). Issuable material drafts and handover records are completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Procurement application materials | Whether the fields, date, and signature of the hazardous chemical procurement application are complete, and whether the name, quantity can match the usage registration and inventory ledger | In the node configuration, check the field names and required markers one by one, submit and reference the field values in a trial run, and confirm that subsequent nodes can retrieve the corresponding field values |
| Usage registration materials | Whether the fields, date, and signature of the usage registration are complete, and whether the name, quantity, and date of the same record are consistent in the two materials | In the `formInput` configuration, check the field names and required settings, and after submission check whether subsequent node references retrieve the values |
| Inventory ledger materials | Whether the fields, date, and signature of the inventory ledger are complete, whether the version is synchronized, and whether signatures or receipts are missing | In the `userSelect` and `formInput` references, run a trial to confirm that field values are passed to subsequent nodes and that version and date are consistent |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match between the procurement application and the inventory ledger. Cause: Field names are not mapped one-to-one, and after submission subsequent nodes retrieve misaligned field values.
- Phenomenon: The version is not synchronized, and the material draft and handover record reference an old version of the ledger. Cause: After field values are submitted, they are not checked against version and date, and subsequent nodes still retrieve old values.
- Phenomenon: Signatures or receipts are missing, yet the material is still passed on. Cause: Key fields are not marked as required, so submission is possible even when required items are empty, and subsequent nodes cannot retrieve values.

## How to verify the setup

Acceptance for this feature: Fill out and submit once, check the field values retrieved by subsequent nodes, and confirm that `formInputResult` and `selectResult`, and required markers all take effect as configured.

Business test: Draft one according to the template and complete one handover, and see whether missing items are blocked.

- In the node configuration, check the field names and required markers one by one, submit and reference the field values in a trial run, and confirm that subsequent nodes can retrieve the corresponding field values.
- Draft one according to the template and complete one handover, and check whether the name, quantity, date, signature, and receipt are complete and whether missing items are blocked.
