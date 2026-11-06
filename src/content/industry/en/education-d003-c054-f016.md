---
title: Forms and User Interaction for Self-Study Exam Records and Graduation Review: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c054-f016
page_type: 行业问题页
application_area: education
meta_title: Self-Study Exams | Forms | Intake
meta_description: Self-Study Exams: review forms for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Self-Study Exam Records and Graduation Review: Handle Questions and Collect Missing Information

## What this category's data looks like

This category involves three types of materials: registration records, course pass certificates, and graduation application forms. Registration records are updated by the provincial examination office after each registration and contain name, ID number, exam registration number, major name, course scores, and dates; course pass certificates are issued by the main examining institution per exam session and contain course code, course name, score, pass date, and seal; graduation application forms are filled out by candidates during the application period and contain major, number of courses, practical components, signature, and receipt. When these three types of materials enter the form input node, registration records are used to verify identity and major, course pass certificates are used to verify course names, quantities, and dates, and graduation application forms are used to verify signature and receipt. Because the materials come from different sources and update at different paces, the same record often shows inconsistencies in names, quantities, and dates; when versions are not synchronized or signatures/receipts are missing, follow-up questions must be asked first before transferring to the handling staff.

## Configuration and implementation checks

This step is performed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The "intake record and items to be completed" are handled by subsequent nodes or manually. The form does not automatically recognize material content, nor does it judge whether materials are authentic.

| Object | Check | Verification action |
| --- | --- | --- |
| Registration records | Whether name, ID number, exam registration number, major name, and course score dates match the course pass certificates item by item | Check the field names one by one in the node configuration, and confirm they correspond one-to-one with the registration record fields |
| Course pass certificates | Whether course names, quantities, pass dates, and seals are consistent with those listed in the graduation application form, and whether versions are synchronized | Check the required settings one by one, and confirm that the course name, quantity, and date fields are marked as required |
| Graduation application forms | Whether major, number of courses, signature, and receipt are complete, and whether the date is within the application period | Reference the `formInputResult` fields in subsequent nodes and run a test to confirm the corresponding field values can be retrieved |
| Intake records | Whether missing items are identified and followed up on, and whether answers are based on materials | Use `userSelect` to select follow-up items, and check whether the follow-up items correspond to the missing items |

## Three common errors

- Symptom: The name, quantity, and date of the same course do not match between the registration record and the course pass certificate. Cause: The versions of the two materials are not synchronized, and no item-by-item comparison was made during entry.
- Symptom: A graduation application form missing a signature or receipt is still submitted as complete material. Cause: The required markers do not cover the signature and receipt fields, and submission is not blocked.
- Symptom: The conversation stops in the interaction state, and subsequent nodes cannot retrieve field values. Cause: Required items can be submitted even when empty, or field names are inconsistent with subsequent references.

## How to verify the setup

Acceptance for this feature: fill out and submit once, check the field values retrieved by subsequent nodes, and confirm that `formInput` is passed correctly.

Business test: submit a question missing key information and see whether it asks follow-up questions before answering; use `userSelect` to select follow-up items and check whether the follow-up items correspond to the missing items.

- Check the field names one by one in the node configuration, and confirm they correspond one-to-one with the fields of registration records, course pass certificates, and graduation application forms.
- Check the required settings one by one, confirm that key material fields are marked as required, and reference those fields in subsequent nodes for a test run.
