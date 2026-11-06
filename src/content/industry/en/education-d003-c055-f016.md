---
title: Forms and User Interaction for Adult College Entrance Applications and Admissions: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c055-f016
page_type: 行业问题页
application_area: education
meta_title: Adult Admissions | Forms | Intake
meta_description: Adult Admissions: review forms for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Adult College Entrance Applications and Admissions: Handle Questions and Collect Missing Information

## What this category's data looks like

Adult college entrance exam registration and admission management involves three core types of materials: registration forms, care bonus-point materials, and admission rosters. The registration form is filled out by the candidate and contains fields such as name, ID number, application level, and preferences, and is updated with each registration batch; the care bonus-point materials are submitted by the candidate and contain the bonus item, certificate number, issue date, and signature and seal; the admission roster is compiled by the admissions department and contains the candidate number, admitted major, admission date, and signature of the person in charge. When these three types of materials enter the Q&A intake and missing-item follow-up function, the registration form fields are used to verify identity and application information, the bonus material fields are used to determine care eligibility and material completeness, and the admission roster fields are used to compare admission results and signed receipts. Inconsistencies in names, quantities, and dates are common across materials, versions are not synchronized, and signatures or receipts are missing, so missing items must be identified and followed up on for completion during the intake stage.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The "intake record and completion questions" are then completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters the interaction state and records the workflow state; after the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Registration form | Fields and dates must be consistent with the candidate's identity and application level, and signatures must be complete | Check field names one by one in the node configuration, mark required items, and after a trial run check whether subsequent nodes can retrieve the corresponding field values |
| Care bonus-point materials | The bonus item, certificate number, issue date, and signature and seal must correspond to the registration form | Check the mapping relationship between the material fields and the registration form fields, and verify field passing after submission with `formInput` |
| Admission roster | The candidate number, admitted major, admission date, and signature of the person in charge must be consistent with the registration form and bonus materials | Check the correspondence between the roster fields and the preceding material fields, and verify the values retrieved by subsequent nodes after selection with `userSelect` |
| Form input node | Required markers and field passing must be checked item by item in the configuration | Check the required settings one by one, reference the field in subsequent nodes and run a trial, and confirm that the value can be retrieved after submission |

## Three common errors

- Phenomenon: the same candidate's name is inconsistent between the registration form and the admission roster. Cause: the two forms are entered separately, and no field mapping check was performed, resulting in mismatched names.
- Phenomenon: the care bonus-point material version is not synchronized, and the old certificate number is still referenced. Cause: after the material was updated, it was not resubmitted, and the intake stage did not identify the version difference.
- Phenomenon: the admission roster lacks the signature of the person in charge or the receipt. Cause: after the roster was compiled, it did not go through the signature process, and the required form items did not cover the signature field.

## How to verify the setup

Acceptance of this function: fill it out once and submit, check the field values retrieved by subsequent nodes, confirm that `formInputResult` and `selectResult` pass normally, and that submission is not allowed when required items are empty.

Business test: submit a question that lacks key information and see whether it asks a follow-up question before answering.

- Check field names and required markers one by one in the node configuration to ensure that key material fields are marked as required.
- Reference the form fields in subsequent nodes and run a trial to confirm that the corresponding field values can be retrieved after submission.
