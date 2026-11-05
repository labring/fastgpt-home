---
title: Forms and User Interaction for Research Project Task Agreement Signing: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c058-f016
page_type: 行业问题页
application_area: education
meta_title: Research Agreements | Forms | Access
meta_description: Research Agreements: review forms for authorized access. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Research Project Task Agreement Signing: Manage Authorized Access and External Services

## What this category's data looks like

This category's data covers three types of materials involved in signing research project task books: the project task book, the subject task breakdown table, and the budget book. The project task book is initiated by the lead organization and contains the project name, undertaking organization, start and end dates, and signature fields; the subject task breakdown table is filled in by the subject leader and contains the subject name, leader, division of labor, and milestone dates; the budget book is provided by finance or the budget preparer and contains budget categories, amounts, sources, and calculation basis. The material sources are the research management system, offline signed documents, and financial templates, and the update cadence advances with the signing milestones: draft, internal review, signature receipt. Field characteristics are concentrated in four categories: name, quantity, date, and signature, and the three materials need to be aligned item by item. When entering the form input node, the project task book plays the role of the main record, the subject task breakdown table plays the role of subtask decomposition, and the budget book plays the role of funding caliber; the field values of the three are collected in a unified way and then passed to subsequent nodes.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The externally available entry point and authorization scope are then completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and records the workflow state; after the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Project task book | The name, date, and signature fields are aligned item by item with the subject task breakdown table and the budget book; missing signatures or receipts are regarded as inconsistent | Check the field names one by one in the form input node configuration, and confirm they correspond one-to-one with the project task book fields |
| Subject task breakdown table | If the subject name, leader, and milestone dates do not match the same record in the project task book and budget book, it is returned | Check the required markers; key material fields have been marked as required, to avoid submission with required items empty |
| Budget book | The categories, amounts, and sources are synchronized with the versions of the project task book and subject task breakdown table; if the versions are not synchronized, it is returned | Reference the fields in subsequent nodes and run a trial to confirm that the field values passed after submission can retrieve the corresponding field values |
| Form fields and authorization scope | The visitor identity matches the visible scope; unauthorized content is not visible, and restricted identities only see fields within the authorized scope | Use `formInputResult` and `selectResult` to fill in once each, and check the field values retrieved by subsequent nodes |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the project task book and the subject task breakdown table. Cause: The two materials are filled in separately, without field-level alignment and receipt verification.
- Symptom: The budget book version is not synchronized, and the old amount is still submitted with the form. Cause: After the version update, the interactive state was not retriggered, and subsequent nodes retrieved the old field values.
- Symptom: Missing signature fields or receipts still proceed to the next stage. Cause: The required markers do not cover the signature fields, so submission is possible even with required items empty.

## How to verify the setup

Acceptance for this feature: fill in once and submit, check the field values retrieved by subsequent nodes, and confirm that the `formInputResult` and `selectResult` outputs match what was filled in.

Business test: access once with a restricted identity, see whether the visible scope matches the setting, and confirm that unauthorized fields are not visible.

- Check the field names one by one in the node configuration, and confirm they correspond one-to-one with the fields of the project task book, subject task breakdown table, and budget book.
- Check the required settings one by one, and reference the field in subsequent nodes and run a trial to confirm that field passing after submission works properly.
