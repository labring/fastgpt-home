---
title: Forms and User Interaction for Compulsory Education Dropout Prevention: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c009-f016
page_type: 行业问题页
application_area: education
meta_title: Dropout Prevention | Forms | Intake
meta_description: Dropout Prevention: review forms for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Compulsory Education Dropout Prevention: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the compulsory education dropout prevention and school retention scenario, with materials drawn from three types: dropout risk ledgers, persuasion-and-return records, and home visit records. The ledger is updated weekly and records student name, class, risk level, guardian, and contact information; persuasion-and-return records are updated per instance and include persuasion time, participants, result, and signature; home visit records are updated per instance and include home visit date, teacher, parent signature, and receipt. When these three types of materials enter the form input node, each plays a different role: the ledger provides basic student information and risk identification, persuasion-and-return records provide the persuasion process and results, and home visit records provide evidence of home-school communication. Field characteristics fall into four categories: name, date, quantity, and signature; dates and signatures are the focus of subsequent verification. During flow, it is common for the same record to have mismatched names, quantities, or dates across two materials, versions not synchronized, and missing signatures or receipts.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). "Acceptance records and supplementary questions" are completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and the workflow state is recorded; after the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Dropout risk ledger | Fields include student name, class, risk level, guardian, and contact information; dates and signatures need to be checked item by item | Check field names one by one in the node configuration, confirming they correspond one-to-one with the ledger fields |
| Persuasion-and-return record | Fields include persuasion time, participants, result, and signature; names and quantities need to be consistent across the two materials | Check the required settings one by one, confirming that persuasion time and signature are marked as required |
| Home visit record | Fields include home visit date, teacher, parent signature, and receipt; versions need to be synchronized and the receipt must not be missing | Reference this field in a subsequent node and run a test, confirming the corresponding field value can be retrieved |
| Form input node | After triggering, it enters an interactive state and records the workflow state; after submission, field values are passed to subsequent nodes | Fill it out once and submit, check the field values retrieved by subsequent nodes, and inspect the `formInputResult` and `selectResult` references |

## Three common errors

- Symptom: The same record has mismatched names, quantities, or dates across two materials. Cause: The ledger and persuasion-and-return records are maintained separately, without cross-checking.
- Symptom: Versions are not synchronized, and old persuasion-and-return records coexist with new home visit records. Cause: Different update rhythms and lack of a unified version identifier.
- Symptom: Missing signatures or receipts, making home visit records and persuasion-and-return records incomplete. Cause: Required markers do not cover signature and receipt fields.

## How to verify the setup

Acceptance for this feature: Fill it out once and submit, check the field values retrieved by subsequent nodes, and confirm that `formInputResult` and `selectResult` can be referenced correctly.

Business test: Submit a question missing key information and see whether it asks follow-up questions before answering.

- Check field names one by one in the node configuration, confirming they correspond one-to-one with the fields of the dropout risk ledger, persuasion-and-return records, and home visit records.
- Check the required settings one by one, confirming that key material fields are marked as required, and reference the field in a subsequent node and run a test.
