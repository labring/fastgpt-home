---
title: Forms and User Interaction for School Moral Education and Class Teacher Work: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c014-f016
page_type: 行业问题页
application_area: education
meta_title: Pastoral Education | Forms | Intake
meta_description: Pastoral Education: review forms for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for School Moral Education and Class Teacher Work: Handle Questions and Collect Missing Information

## What this category's data looks like

This page focuses on materials for school moral education and homeroom teacher work, including three categories: themed class meeting plans, student comprehensive quality records, and home visit records. Themed class meeting plans are usually submitted by the homeroom teacher weekly or at activity milestones, and include the class meeting theme, time, location, objectives, process, and signature; student comprehensive quality records are updated by semester or academic year, and include fields such as ideological and moral character, academic level, physical and mental health, artistic literacy, and social practice, as well as date and signature; home visit records are filled in per visit, and include the student's name, home visit time, home visit recipient, home visit content, parent signature, and receipt. When these three types of materials enter question acceptance, themed class meeting plans often serve as the basis for activities, student comprehensive quality records often serve as the basis for student performance, and home visit records often serve as the basis for home-school communication; the form input node is responsible for collecting these field values, and subsequent nodes or manual staff use them to form acceptance records and follow-up items to be completed.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The "acceptance records and follow-up items to be completed" are then completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Themed class meeting plan | Whether the fields include the class meeting theme, time, location, objectives, process, and signature; whether the date and signature can be verified | Check the field names one by one in the node configuration, and after a trial submission, have subsequent nodes reference the `formInputResult` field |
| Student comprehensive quality record | Whether the fields include ideological and moral character, academic level, physical and mental health, artistic literacy, and social practice; whether the date and signature are consistent | Check the required settings one by one, and reference the `selectResult` output in subsequent nodes for a trial run |
| Home visit record | Whether the fields include the student's name, home visit time, home visit recipient, home visit content, parent signature, and receipt; whether the quantity and date match | Reference the `formInputResult` field in subsequent nodes and run a trial, and check whether the value can be retrieved after submission |
| formInputResult and selectResult | Whether the required markers cover the key material fields; whether field passing is complete after submission | Check the required settings one by one, and reference the `formInputResult` and `selectResult` fields in subsequent nodes for a trial run |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match across two materials. Cause: The form fields and material fields are not mapped one-to-one, and after submission subsequent nodes retrieve misaligned values.
- Symptom: Versions are not synchronized, and old materials are still referenced. Cause: The form does not record the material version and date, and subsequent nodes cannot determine which one is the latest.
- Symptom: Materials missing a signature or receipt still enter acceptance. Cause: Key material fields are not marked as required, and submission is still possible when required items are empty.

## How to verify the setup

Acceptance for this feature: fill it out once and submit, then check the field values retrieved by subsequent nodes, focusing on whether the `formInputResult` and `selectResult` references retrieve the corresponding values.

Business test: submit a question missing key information and see whether it asks a follow-up question before answering.

- Check the field names one by one in the node configuration to ensure that the form fields correspond one-to-one with the fields for themed class meeting plans, student comprehensive quality records, and home visit records.
- Check the required settings one by one, and reference the `formInputResult` and `selectResult` fields in subsequent nodes for a trial run, confirming that values can be retrieved after submission.
