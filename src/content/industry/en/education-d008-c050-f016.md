---
title: Forms and User Interaction for Foreign Teacher Recruitment and Course Scheduling: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c050-f016
page_type: 行业问题页
application_area: education
meta_title: Foreign Teachers | Forms | Access
meta_description: Foreign Teachers: review forms for authorized access. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Foreign Teacher Recruitment and Course Scheduling: Manage Authorized Access and External Services

## What this category's data looks like

Materials for foreign teacher appointment and course scheduling mainly come from three types: appointment contracts, work permit materials, and course schedules. Appointment contracts include the employment term, job responsibilities, compensation terms, and signature pages of both parties; work permit materials include the permit category, validity period, issuance date, unit name, and receipt; course schedules include the course name, instructor, week number, number of class hours, classroom, and signature or confirmation column. Materials are updated on a rolling basis by semester or appointment term; contracts and permits are often renewed annually, while course schedules are adjusted weekly or monthly. Field characteristics are concentrated in four categories: name, quantity, date, and signature, and the same record must remain consistent across the three materials. When entering the form input node, the three types of materials each play a different role: the contract and permit provide the basis for identity and authorization scope, the course schedule provides course and scheduling information, and the node only collects the entered field values, based on which subsequent nodes or manual work complete the external entry point and authorization scope.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, and outputs the field values entered by the user (passed to subsequent nodes after submission). The "external entry point and authorization scope" is then completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Appointment contract | The four categories of fields—name, quantity, date, and signature—must be aligned item by item with the work permit materials and course schedule, and the employment term start and end dates and signature pages must not be missing | Check the field names one by one in the node configuration, check the required settings, and reference the field in a subsequent node for a trial run |
| Work permit materials | The permit category, validity period, issuance date, unit name, and receipt must be consistent with the contract and course schedule, and the version must be the currently valid version | Check the field names and required markers one by one, submit with `formInput`, and then check the values retrieved by subsequent nodes |
| Course schedule | The course name, instructor, week number, number of class hours, classroom, and signature or confirmation column must be consistent with the corresponding records in the contract and permit materials | Check the field names in the node configuration, and after submission reference the field values with `userSelect` for a trial run |
| External entry point and authorization scope | The visitor identity matches the visible scope, unauthorized access is not visible, and restricted identities can only see the corresponding material fields | Access once with a restricted identity and check whether the visible scope matches the settings |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the contract and the permit materials. Cause: The two materials are entered separately, versions are not synchronized, and there is no unified check.
- Symptom: The week number and number of class hours in the course schedule are inconsistent with those in the contract. Cause: After the course schedule is adjusted weekly, it is not written back to the contract or the version is not synchronized.
- Symptom: After submission, subsequent nodes cannot retrieve the values, or submission is possible even when required items are empty. Cause: Field names are not aligned or required markers are not set, and the conversation remains in the interactive state.

## How to verify the setup

Acceptance of this feature: fill it out once and submit, check the field values retrieved by subsequent nodes, and confirm that the field values referenced by `formInputResult` and `selectResult` are consistent with the entered content.

Business test: access once with a restricted identity and see whether the visible scope matches the settings.

- Check the field names and required markers one by one in the node configuration to ensure they correspond one-to-one with the fields of the appointment contract, work permit materials, and course schedule.
- After submission, reference the corresponding fields in subsequent nodes and run a trial to confirm that the field values can be retrieved, then open the external entry point and authorization scope.
