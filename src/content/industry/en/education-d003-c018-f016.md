---
title: Forms and User Interaction for Undergraduate Curriculum Planning: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c018-f016
page_type: 行业问题页
application_area: education
meta_title: Program Revision | Forms | Intake
meta_description: Program Revision: review forms for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Undergraduate Curriculum Planning: Handle Questions and Collect Missing Information

## What this category's data looks like

Common materials for Q&A intake on undergraduate program revision include three types: program plans, course syllabi, and credit structure tables. The program plan provides the program direction and the total credit framework; the course syllabus carries the course name, class hours, and assessment method; the credit structure table summarizes the credits and proportions of each module. The materials mostly come from academic affairs system exports, department submissions, and meeting minutes attachments, and are updated by semester or revision batch, with fields including course name, credits, class hours, date, signature, and receipt. When entering Q&A intake, the three types of materials each play a different role: the program plan is used to check the program scope and total credits, the course syllabus is used to check course fields and signatures, and the credit structure table is used to check the number of modules and dates. Missing-item follow-up questions revolve around these fields, and the intake record and the completed question items are finished by subsequent nodes or manually.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, and outputs the field values filled in by the user (passed to subsequent nodes after submission). The "intake record and completed question items" are finished by subsequent nodes or manually. After the form input node is triggered, the conversation enters the interaction state and records the workflow state; after the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Program plan | Check the program scope and total credit fields, and determine whether the name, quantity, and date are consistent with the credit structure table | Check the field names one by one in the node configuration, use `formInput` to collect the field values after submission, and reference them in subsequent nodes for a trial run |
| Course syllabus | Check the course name, class hours, signature, and receipt fields, and determine whether the name, quantity, and date of the same record do not match across the two materials | Check the required settings one by one, use `userSelect` to select the course category, and after submission confirm that subsequent nodes can retrieve the corresponding field values |
| Credit structure table | Check the module credits, proportions, and date fields, and determine whether the version is synchronized and whether signatures or receipts are missing | Reference this field in subsequent nodes and run a trial, and check common errors such as subsequent nodes being unable to retrieve values after submission, being able to submit even when required items are empty, and the conversation stopping in the interaction state |
| Form input node | Check that the fields correspond one-to-one with the material fields to be collected, and determine whether the required markers cover the key material fields | Check the field names and required settings one by one, and after submitting with `formInputResult` and `selectResult`, confirm that the field values are passed to subsequent nodes |

## Three common errors

- Symptom: the name and credits of the same course do not match between the program plan and the course syllabus. Cause: the two materials are maintained by different people, the field definitions are not unified, and no cross-check is done before submission.
- Symptom: the version of the credit structure table is not synchronized, and the date and receipt are missing. Cause: after the revision batch is updated, the old attachment is still referenced, and the signature and receipt steps are not set as required in the form.
- Symptom: after submission, subsequent nodes cannot retrieve values, and the conversation stops in the interaction state. Cause: the field names are inconsistent with the references in subsequent nodes, or submission is allowed even when required items are empty, resulting in an incomplete state record.

## How to verify the setup

Feature acceptance: fill it out once and submit, check the field values retrieved by subsequent nodes, and confirm that the field values are fully passed after submission via `formInputResult` and `selectResult`.

Business test: submit a question that lacks key information, see whether it asks a follow-up question before answering, and then check whether the intake record and the completed question items are finished by subsequent nodes or manually.

- Check the field names and required settings one by one in the node configuration, and confirm that they correspond one-to-one with the material fields of the program plan, course syllabus, and credit structure table.
- Reference this field in subsequent nodes and run a trial, and check whether the field values are retrievable after submission, whether submission is possible when required items are empty, and whether the conversation stops in the interaction state.
