---
title: Forms and User Interaction for Compulsory Education Dropout Prevention: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c009-f016
page_type: 行业问题页
application_area: education
meta_title: Dropout Prevention | Forms | Review
meta_description: Dropout Prevention: review forms for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Compulsory Education Dropout Prevention: Trace Exceptions and Review Results

## What this category's data looks like

This page focuses on exception tracing and manual review in compulsory education dropout prevention and control. The materials come from three types: dropout risk ledgers, persuasion-to-return records, and home visit records. The ledger is updated weekly and records students' basic information, risk level, and responsible person; persuasion-to-return records are generated with each persuasion-to-return action and include date, participants, result, and signature; home visit records are filled in per visit and include visit date, parent comments, and receipt. When the three types of materials enter the form input node, their roles differ: ledger fields serve as the comparison baseline for the exception list, while persuasion-to-return records and home visit records serve as original records to support tracing back to source materials. In terms of field characteristics, names, quantities, dates, and signatures are the key points for verification. The same record may not match across two materials. Unsynchronized versions or missing signatures or receipts will directly affect the review conclusion. The form input node does not automatically recognize material content, nor does it judge whether materials are authentic. It is only responsible for collecting the field values filled in by the user and passing them to subsequent nodes.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, outputting the field values filled in by the user (passed to subsequent nodes after submission). The "exception list and review conclusion" is completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Dropout risk ledger | Compare names, quantities, dates, and signatures item by item with persuasion-to-return records and home visit records to determine whether the exception is supported by original records | Check the field names one by one in the node configuration to ensure that ledger fields correspond one-to-one with material fields, and use `formInput` to reference field values in a trial run |
| Persuasion-to-return record | Check whether the persuasion-to-return date, participant signatures, and receipt are complete, and determine whether the names, quantities, and dates of the same record are consistent between the ledger and the persuasion-to-return record | Check the required settings one by one, mark key material fields as required, and after submission check whether subsequent nodes can obtain the corresponding field values |
| Home visit record | Check the home visit date, parent comments, and receipt signature, and determine whether versions are synchronized and whether missing signatures or receipts affect the review conclusion | Reference `formInputResult` and `selectResult` fields in subsequent nodes and run a trial to confirm that field transmission is correct |

## Three common errors

- Phenomenon: The name or quantity of the same student does not match between the ledger and the persuasion-to-return record. Cause: The two materials are entered separately, without field-level comparison and version synchronization.
- Phenomenon: The date in the home visit record is inconsistent with the date in the persuasion-to-return record, and the source material cannot be traced. Cause: The materials are updated at different paces, versions are not synchronized, and there is no unified timestamp.
- Phenomenon: The review conclusion already exists but the signature or receipt is missing. Cause: Required items were not marked as required, and after submission subsequent nodes cannot obtain the signature field value.

## How to verify the setup

Acceptance of this function: fill in once and submit, check the field values obtained by subsequent nodes, and confirm that the fields referenced by `formInputResult` and `selectResult` are consistent with the submitted values.

Business test: create an exception record, see whether the source material can be traced, and check the names, quantities, dates, and signatures of the ledger, persuasion-to-return record, and home visit record.

- Check the field names and required markers one by one in the node configuration to ensure that key material fields are marked as required.
- Reference `formInputResult` and `selectResult` fields in subsequent nodes and run a trial to confirm that the corresponding field values can be obtained after submission.
