---
title: Forms and User Interaction for Academic Journal Business Partnerships: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c070-f016
page_type: 行业问题页
application_area: education
meta_title: Journal Partnerships | Forms | Intake
meta_description: Journal Partnerships: review forms for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Academic Journal Business Partnerships: Handle Questions and Collect Missing Information

## What this category's data looks like

This category's data comes in three core types of materials: business cooperation agreements, advertising review forms, and distribution cooperation materials. Business cooperation agreements are usually signed by the journal's business department and the partner, and include the scope of cooperation, revenue-sharing ratio, settlement cycle, and signature and seal page, with an update cadence mainly based on the year or project cycle. Advertising review forms come from the advertising business process and record the advertiser name, advertising content category, review date, and reviewer signature, and are generated with each advertising order. Distribution cooperation materials come from distribution channels and record the channel name, distribution quantity, start and end dates, and receipt acknowledgment. When the three types of materials enter the forms and interaction feature, each plays a different role: business cooperation agreements provide the cooperation entity and term fields, advertising review forms provide the advertising content and review conclusion fields, and distribution cooperation materials provide the channel and quantity fields. In terms of field characteristics, names, quantities, dates, and signatures are the key items for cross-material verification, and it is common for the same record to have inconsistent name spellings across different materials, mismatched quantities or dates, unsynchronized versions, or missing signatures or receipts.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). Intake records and follow-up questions for completion are then handled by subsequent nodes or manually. After the form input node is triggered, the conversation enters the interaction state and the workflow state is recorded; after the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Form fields | Correspond one-to-one with the material fields to be collected, covering the name, quantity, date, and signature items of business cooperation agreements, advertising review forms, and distribution cooperation materials | Check the field names one by one in the node configuration, confirm that every material field has a corresponding input item, and use `formInput` to reference the field values in a test run |
| Required markers | Key material fields are marked as required, and submission is not allowed when signatures or receipts are missing or dates or quantities are empty | Check the required settings one by one, confirm that key fields are checked as required, and submit empty values to observe whether they are blocked |
| Field passing after submission | Subsequent nodes can retrieve the corresponding field values, and names, quantities, dates, and signature items can be referenced by subsequent nodes | Reference the field in a subsequent node and run a test, and use `userSelect` to check whether the selection item field values are passed through correctly |
| Material consistency | The name, quantity, and date of the same record match between the business cooperation agreement and the distribution cooperation material, versions are synchronized, and signatures or receipts are complete | Compare the two materials item by item for name, quantity, and date, and check whether the version number and signature or receipt are missing |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the business cooperation agreement and the distribution cooperation material. Cause: The two materials are entered separately, the fields are not cross-checked, and after submission they go directly to subsequent nodes.
- Symptom: The version of the advertising review form is not synchronized, and the old review conclusion is still referenced. Cause: The form fields do not record the version or date, and subsequent nodes retrieve expired field values.
- Symptom: The business cooperation agreement is missing a signature or the distribution cooperation material is missing a receipt, yet it can still be submitted into the handling step. Cause: Key material fields are not marked as required, and empty values are not blocked at submission.

## How to verify the setup

Acceptance of this feature: fill out the form once and submit it, check the field values retrieved by subsequent nodes, confirm that the field values referenced by `formInputResult` and `selectResult` are passed through completely, that submission is not allowed when required items are empty, and that the conversation does not get stuck in the interaction state.

Business test: submit a question that is missing key information, see whether it asks follow-up questions before answering, confirm that the missing items are identified and followed up on, and that the answer is transferred to the handler only after there is a material basis.

- Check the field names one by one in the form input node configuration, and confirm that they correspond one-to-one with the name, quantity, date, and signature items of business cooperation agreements, advertising review forms, and distribution cooperation materials
- Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a test, confirm that the field values can be retrieved after submission, and that submission is blocked when required items are empty
