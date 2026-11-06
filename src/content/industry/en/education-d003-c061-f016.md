---
title: Forms and User Interaction for Research Outcome Registration and Intellectual Property: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c061-f016
page_type: 行业问题页
application_area: education
meta_title: Research IP | Forms | Intake
meta_description: Research IP: review forms for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Research Outcome Registration and Intellectual Property: Handle Questions and Collect Missing Information

## What this category's data looks like

The data in this category looks like this: Research achievement registration and intellectual property management involves three types of materials: achievement registration forms, patent disclosure documents, and software copyright materials. Achievement registration forms come from research groups or research management departments and are updated with achievement output and acceptance milestones; their fields include achievement name, completers, date, and signature. Patent disclosure documents come from inventors and are iterated with the application process; their fields include technical solution, inventor, filing date, and receipt. Software copyright materials come from the development team and are synchronized with version releases; their fields include software name, version number, copyright owner, and signature. When these three types of materials enter the Q&A intake and missing-item follow-up function, they respectively take on the role of structured collection of registration information, patent information, and copyright information. Field names, dates, and signatures must correspond item by item, and versions and receipts must be synchronized.

## Configuration and implementation checks

Configuration and implementation checks: This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The "intake record and items to be completed" are then handled by subsequent nodes or manually. The form does not automatically recognize material content, nor does it determine whether materials are authentic.

| Object | Check | Verification action |
| --- | --- | --- |
| Achievement registration form | The name, completers, date, and signature fields must be consistent with the corresponding records in the patent disclosure document; if the signature or receipt is missing, it is regarded as a missing item | Check the field names and required markers one by one in the node configuration, and after a trial run confirm that subsequent nodes can retrieve the corresponding field values |
| Patent disclosure document | The technical solution, inventor, filing date, and receipt fields must be synchronized with the version of the software copyright materials; if the dates and quantities do not match, follow up with a question | Check the required settings, reference the `formInputResult` and `selectResult` fields in subsequent nodes, and run a trial |
| Software copyright materials | The software name, version number, copyright owner, and signature fields must be consistent with the name in the achievement registration form; if the version is not synchronized, first follow up with a question before answering | Check the field names and required settings one by one, and after submission check the field values retrieved by subsequent nodes |
| Form input node | After being triggered, the conversation enters the interaction state and records the workflow state; after the user fills in the required items and submits, the form information is passed to subsequent nodes for use | Check the field names and required markers one by one in the node configuration, reference the fields in subsequent nodes, and run a trial |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the achievement registration form and the patent disclosure document. Cause: Field names were not corresponded item by item, and the consistency of the two materials was not checked after submission.
- Symptom: The version of the software copyright materials is not synchronized, and the patent disclosure document still references the old version. Cause: The version field was not marked as required, and the update cadence was not aligned.
- Symptom: The achievement registration form lacks a signature or receipt, and the patent disclosure document lacks a receipt. Cause: Key material fields were not marked as required, and after submission subsequent nodes cannot retrieve the corresponding field values.

## How to verify the setup

Acceptance of this function: fill it out once and submit, check the field values retrieved by subsequent nodes, confirm that the `formInputResult` and `selectResult` fields are passed correctly, and that submission is not possible when required items are empty.

Business test: submit a question missing key information, see whether it first follows up with a question before answering, and confirm that missing items are identified and followed up on and that the answer is based on materials.

- Check the field names and required markers one by one in the node configuration, and after a trial run confirm that subsequent nodes can retrieve the corresponding field values.
- Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a trial, checking field passing after submission and exit from the interaction state.
