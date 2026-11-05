---
title: Forms and User Interaction for Foreign Teacher Recruitment and Course Scheduling: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c050-f016
page_type: 行业问题页
application_area: education
meta_title: Foreign Teachers | Forms | Intake
meta_description: Foreign Teachers: review forms for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Foreign Teacher Recruitment and Course Scheduling: Handle Questions and Collect Missing Information

## What this category's data looks like

The materials for the foreign teacher appointment and course scheduling category include three types: appointment contracts, work permit materials, and course schedules. Appointment contracts contain the position title, contract start and end dates, and signature page; work permit materials contain the permit number, validity period, unit name, and receipt; course schedules contain the course name, week number, instructor, classroom, and signature column. The sources of the materials are the two appointing parties, the permit issuing party, and the academic scheduling party, and the update rhythm is submission one by one and revision one by one. When the three types of materials enter the form input node, each plays a different role: the appointment contract provides appointment relationship fields, the work permit materials provide compliance permit fields, and the course schedule provides teaching arrangement fields. The field characteristics are many dates, many names, and many quantities. The names, quantities, and dates of the same record in the three materials need to be aligned item by item, and the version number and signature receipt need to be checked page by page.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, and outputs the field values filled in by the user (passed to subsequent nodes after submission). "Intake records and supplementary questions" are completed by subsequent nodes or manually. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use, and the conversation continues downward from the interaction state.

| Object | Check | Verification action |
| --- | --- | --- |
| Appointment contract | Whether the contract start and end dates, position title, and signature page are complete, and whether the name and dates of the same record are consistent with the work permit materials and course schedule | Check the field names one by one in the node configuration, confirm that the contract dates, position title, and signature page fields correspond one-to-one with the materials, and compare the names, quantities, and dates in the three materials |
| Work permit materials | Whether the permit number, validity period, unit name, and receipt are complete, and whether the version number is synchronized with the appointment contract | Check the field names one by one in the node configuration, confirm that the permit number, validity period, and receipt fields are marked as required, and check the version number and signature receipt |
| Course schedule | Whether the course name, week number, instructor, classroom, and signature column are complete, and whether the name and quantity of the same course match in the two materials | Check the field names one by one in the node configuration, confirm that the course name, week number, and instructor fields correspond one-to-one with the materials, and check the signature column |
| Form input node | Whether the required markers cover the key material fields, and whether the field values can be referenced by subsequent nodes after submission | Check the required settings one by one in the node configuration, reference the `formInputResult` field in subsequent nodes and run a trial, and confirm that the `userSelect` options correspond to the material fields |

## Three common errors

- Phenomenon: The name, quantity, and dates of the same record in the appointment contract and work permit materials do not match. Cause: The two materials were submitted separately, and the field values were not compared item by item.
- Phenomenon: The version of the course schedule is not synchronized, and the old week number coexists with the new dates in the appointment contract. Cause: After revision, the form was not resubmitted, and the field values are still the old version.
- Phenomenon: The appointment contract is missing the signature page or the work permit materials are missing the receipt, yet it still enters subsequent processing. Cause: The required markers do not cover the signature and receipt fields, and submission was not blocked.

## How to verify the setup

Acceptance of this feature: Fill it out once and submit, check whether the field values obtained by subsequent nodes are consistent with the form entries, and confirm that the `formInputResult` field can be referenced and that the `userSelect` options can obtain the corresponding values.

Business test: Submit a question that lacks key information and see whether it first asks a follow-up question before answering.

- Check the field names and required settings one by one in the node configuration, and confirm that the appointment contract, work permit materials, and course schedule fields correspond one-to-one.
- Reference the `formInputResult` field in subsequent nodes and run a trial, confirm that the field values can be passed after submission, and that the conversation does not stop at the interaction state.
