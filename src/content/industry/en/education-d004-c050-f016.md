---
title: Forms and User Interaction for Foreign Teacher Recruitment and Course Scheduling: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c050-f016
page_type: 行业问题页
application_area: education
meta_title: Foreign Teachers | Forms | Handover
meta_description: Foreign Teachers: review forms for material handover. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Foreign Teacher Recruitment and Course Scheduling: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page focuses on the category of foreign teacher appointment and course scheduling. Materials include three types: appointment contracts, work permit materials, and course schedules. Appointment contract fields include name, passport number, position, appointment period, salary, and signature; work permit material fields include name, nationality, education, work experience, no criminal record, and date; course schedule fields include course name, class, week number, class hours, instructor, and signature. Materials are drafted in batches by HR and foreign affairs positions, and are updated according to the appointment period and semester rhythm. When entering the form input node, the three types of material fields each take on a collection role: contract fields correspond to the appointment period and signature, permit fields correspond to qualifications and dates, and course fields correspond to scheduling and class hours, for use by subsequent nodes.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The material drafts that can be issued and the handover records are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Appointment contract | Whether fields, dates, and signature are complete | Check the field names one by one in the node configuration, confirm that the appointment period, salary, and signature fields are marked as required, and after submission have subsequent nodes reference these fields and run a test |
| Work permit materials | Whether the name, date, and quantity in the same record are consistent with the contract | Check that the nationality, education, and no criminal record fields align item by item with the contract name and passport number, and compare whether the date fields are the same version |
| Course schedule | Whether the course name, class, week number, class hours, and instructor match | Check the course name and class quantity, confirm that the week number and class hours fields are marked as required, and after submission have subsequent nodes retrieve the corresponding field values |
| Handover record | Whether the responsible person is clear and the version and date are consistent | Check the handover parties' fields and the receipt field, confirm that the signature and date are complete, and when items are missing, block them with required markers |

## Three common errors

- Phenomenon: The same teacher's name is written differently in the contract and permit materials. Cause: The two materials were drafted separately and were not checked against the same field name.
- Phenomenon: The week number in the course schedule does not match the appointment period date in the contract. Cause: The version was not synchronized, and old field values were submitted.
- Phenomenon: The handover record is missing a signature or receipt. Cause: Key fields were not marked as required, and after submission subsequent nodes cannot retrieve the values.

## How to verify the setup

Check the field names and required markers one by one in the node configuration, and confirm that key material fields are marked as required.

Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a test to confirm that the corresponding field values can be retrieved after submission.

- This feature acceptance: fill it out once and submit, then check the field values retrieved by subsequent nodes. Use `formInput` to collect fields and `userSelect` to select courses, and confirm that the conversation continues after submission and the field values can be referenced.
- Business test: draft one copy according to the template and complete one handover, and see whether missing items are blocked.
