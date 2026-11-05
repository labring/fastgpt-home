---
title: Forms and User Interaction for School Admissions and Enrollment Organization: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c008-f016
page_type: 行业问题页
application_area: education
meta_title: School Admissions | Forms | Review
meta_description: School Admissions: review forms for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for School Admissions and Enrollment Organization: Trace Exceptions and Review Results

## What this category's data looks like

This page is intended for primary and secondary school enrollment organizations. The materials come from three categories: enrollment plans, application material checklists, and admission lists. They are updated centrally during the enrollment season and synchronized as batches progress. The enrollment plan provides application conditions, time nodes, and admission rules; the application material checklist lists fields and copy counts such as household registration, property, and student status; the admission list records student names, admission batches, dates, and signature columns. When the three types of materials enter the form input function, each plays a different role: plan fields are used to set the baseline for exception determination, checklist fields are used to compare original records, and list fields are used to verify results and signed receipts. Exception tracing and manual review require that every exception can be traced back to the source material, and that fields, dates, and signatures are checked for consistency.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, and outputs the field values filled in by the user (passed to subsequent nodes after submission). The exception list and review conclusions are completed by subsequent nodes or manually. After the node is triggered, the conversation enters the interaction state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Enrollment plan | The application conditions, time nodes, and admission rule fields in the plan are compared item by item with the checklist and list, and the date and signature columns must be consistent | Check the field names one by one in the node configuration, confirm that the plan fields correspond one-to-one with the checklist fields, and after submitting with `formInput`, check the values retrieved by subsequent nodes |
| Application material checklist | If the household registration, property, and student status fields in the checklist do not match the plan name, quantity, or date, it is an exception; missing signatures or receipts are also recorded as exceptions | Check the required settings one by one, perform cross-comparison of names, quantities, and dates, and exception records must be traceable to the original checklist page |
| Admission list | If the student name, admission batch, or date in the list is inconsistent with the plan or checklist, it is an exception; missing signatures or receipts are also recorded | Check the correspondence between the list fields and the plan and checklist, confirm that the `userSelect` options cover the batches, and after submission check field passing |
| Form fields and required markers | Key material fields are marked as required, and field names correspond one-to-one with the material fields to be collected | Check the field names and required settings one by one in the node configuration, and confirm that empty values cannot be submitted |

## Three common errors

- Symptom: The name or date of the same student does not match between the admission list and the application material checklist. Cause: The two materials were entered separately without cross-comparison, and the exception record lacks support from the source material.
- Symptom: After the enrollment plan is updated, the application material checklist is still checked against the old version. Cause: The version was not synchronized, the form fields were not adjusted with the plan, and the review conclusion does not match the current plan.
- Symptom: The review conclusion column lacks a signature or receipt. Cause: The reviewer did not sign item by item, the exception list cannot be handed to the person in charge for handling, and the traceability chain breaks at the signature step.

## How to verify the setup

Acceptance of this function: fill out the form once and submit it, check whether the field values retrieved by subsequent nodes are consistent with the filled-in content, and confirm that `formInputResult` field passing works normally and that `userSelect` options can be referenced.

Business test: create an exception record, see whether it can be traced back to the source material, and check whether the name, quantity, date, and signature of that record are consistent across the plan, checklist, and list.

- Check the field names and required markers one by one in the node configuration, confirm that key material fields are marked as required, and that empty values cannot be submitted.
- Reference the form fields in subsequent nodes and run a test to confirm that the corresponding field values can be retrieved after submission and that the conversation does not remain in the interaction state.
