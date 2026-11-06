---
title: Forms and User Interaction for International Student Admissions and Enrollment Records: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c049-f016
page_type: 行业问题页
application_area: education
meta_title: International Students | Forms | Intake
meta_description: International Students: review forms for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for International Student Admissions and Enrollment Records: Handle Questions and Collect Missing Information

## What this category's data looks like

International student admissions and enrollment management involves three types of materials: admission brochures, admission letters, and visa application forms. Admission brochures are published by the admissions department per academic year, and include majors, quotas, application start and end dates, and a signature field; admission letters are issued by the school, and include name, student ID, major, registration date, and a stamp; visa application forms are filled out and signed by the student, and include passport number, entry date, and a receipt. When the three types of materials enter the Q&A intake and missing-item follow-up function, admission brochures are used to verify application eligibility and the time window, admission letters are used to verify admission results and registration information, and visa application forms are used to verify visa progress and signature receipts. The material update cadence is a parallel academic-year system and batch system. The field characteristics are four types of error-prone points: names, quantities, dates, and signatures. The name, quantity, and date of the same record in two materials are easily mismatched. Version desynchronization and missing signatures or receipts are also common.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, and outputs the field values filled in by the user (passed to subsequent nodes after submission). The intake record and the follow-up questions for completion are then handled by subsequent nodes or manually. After the form input node is triggered, the conversation enters the interaction state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Admission brochure | Whether the fields, dates, and signature are consistent with the admission letter, and whether the application start and end dates fall within the academic year window | Check the field names one by one in the node configuration, mark the key material fields as required, and after a trial run confirm that subsequent nodes can retrieve the corresponding field values |
| Admission letter | Whether the name, student ID, major, and registration date match the admission brochure and visa application form, and whether the signature and stamp are complete | Check the required settings one by one, reference the `formInputResult` field in subsequent nodes and run a trial, and check whether the name, quantity, and date of the same record in the two materials are mismatched |
| Visa application form | Whether the passport number, entry date, and receipt are consistent with the admission letter, and whether the signature is missing | Reference the `selectResult` output in subsequent nodes and run a trial, check the receipt and signature fields, and confirm that missing items are identified and followed up |
| Intake record and follow-up questions for completion | Whether missing items are identified and followed up, and whether answers are based on materials | Ask a question missing key information, see whether it first follows up before answering, and then transfer it to the handler |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record in the admission brochure and admission letter are mismatched. Cause: The two materials are filled in by different stages, the field definitions are not aligned, and versions are not synchronized.
- Phenomenon: The visa application form is missing a signature or receipt but is still submitted as complete material. Cause: The required markers do not cover the signature and receipt fields, and after submission subsequent nodes cannot retrieve the values.
- Phenomenon: The conversation stays in the interaction state, and the user cannot continue even after filling in the required items. Cause: It can be submitted even when required items are empty, or after submission the fields are not passed to subsequent nodes.

## How to verify the setup

Acceptance for this feature: fill out the form once and submit it, check the field values retrieved by subsequent nodes, confirm that the `formInputResult` and `selectResult` fields can be passed correctly, and that submission is not allowed when required items are empty.

Business test: ask a question missing key information, see whether it first follows up before answering, and then transfer it to the handler.

- Check the field names one by one in the node configuration, and mark the name, quantity, date, and signature fields of the admission brochure, admission letter, and visa application form as required.
- Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a trial, and check whether the name, quantity, and date of the same record in the two materials match.
