---
title: Forms and User Interaction for Research Project Task Agreement Signing: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c058-f016
page_type: 行业问题页
application_area: education
meta_title: Research Agreements | Forms | Intake
meta_description: Research Agreements: review forms for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Research Project Task Agreement Signing: Handle Questions and Collect Missing Information

## What this category's data looks like

The category materials for the scientific research project task book signing stage include three types: the project task book, the topic task breakdown table, and the budget book. The sources are submission by the applying unit, submission by the topic undertaking party, and approval by the finance department. The update rhythm iterates round by round along with the signing process. The field characteristics are concentrated in project name, topic number, budget subject, start and end dates, signatures, and receipts. When the materials enter the forms and interaction function, the project task book plays the role of the main record, and its project name and total budget serve as the acceptance anchor; the topic task breakdown table plays the role of sub-item decomposition, and its topic name, responsible person, number of participants, and start and end dates are used for item-by-item comparison with the main record; the budget book plays the role of amount basis, and its subject amounts, totals, and dates are used to verify the budget column of the task book. The dates and signatures of the three must correspond to one another. If the name, quantity, or date of the same record does not match across two materials, or if versions are not synchronized, or signatures or receipts are missing, all of these will be exposed as missing items during the acceptance and follow-up questioning stage.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, outputting the field values filled in by the user (passed to subsequent nodes after submission). "Acceptance records and supplementary question items" are then completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters the interaction state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Project task book | Whether the project name, topic number, total budget, start and end dates, signatures, and receipts are consistent with the budget book and breakdown table | Check the field names and required settings one by one in the node configuration, and after submission reference the fields for a trial run |
| Topic task breakdown table | Whether the topic name, responsible person, number of participants, and dates match the main record of the task book, and whether the versions are synchronized | Compare the names, quantities, and dates of the two materials item by item, and check the signatures or receipts |
| Budget book | Whether the budget subjects, amount totals, and dates are consistent with the budget column of the task book, and whether the signatures are complete | Check the subjects and totals, inspect the dates and signatures, and confirm version synchronization |
| Form input node (interaction node) | Whether the required markers cover the key material fields, and whether subsequent nodes can obtain the field values after submission | Use `formInput` to reference the fields for a trial run, and if necessary use `userSelect` to select knowledge base variables |

## Three common errors

- Phenomenon: The topic name and number of participants in the task book and the breakdown table do not match. Cause: The two materials are filled in by different roles, versions are not synchronized, and item-by-item comparison is not performed during acceptance.
- Phenomenon: The amount total in the budget book is inconsistent with the date in the budget column of the task book. Cause: After the finance-approved draft is replaced, it is not written back to the main record, and missing signatures or receipts cause version misalignment.
- Phenomenon: After submission, subsequent nodes cannot obtain the values, and the conversation remains in the interaction state. Cause: Required items can be submitted even when empty, or the field names are inconsistent with subsequent references.

## How to verify the setup

Acceptance of this function: fill it out once and submit, check the field values obtained by subsequent nodes, and confirm that the `formInput` referenced fields have values and that submission is impossible when required items are empty.

Business test: submit a question missing key information and see whether it asks follow-up questions before answering.

- Check the field names and required settings one by one in the node configuration to ensure they correspond one-to-one with the fields of the project task book, topic task breakdown table, and budget book.
- After submission, reference the field in subsequent nodes and run a trial to confirm that the corresponding field value can be obtained, and check whether the conversation exits the interaction state normally.
