---
title: Forms and User Interaction for Student Discipline and Appeals: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c023-f016
page_type: 行业问题页
application_area: education
meta_title: Student Appeals | Forms | Intake
meta_description: Student Appeals: review forms for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Student Discipline and Appeals: Handle Questions and Collect Missing Information

## What this category's data looks like

Materials in the student disciplinary action and appeal handling scenario typically include the violation facts materials, the disciplinary decision document, the appeal statement, and the accompanying delivery receipts and signature pages. The violation facts materials are compiled by the case handler, recording the time, place, description of conduct, and evidence list; the disciplinary decision document is issued by the department that made the decision, stating the basis clauses, type of disciplinary action, effective date, and seal; the appeal statement is submitted by the student, stating the appeal request, reasons, and date. When these three types of materials enter the Q&A intake and missing-item follow-up stage, each plays a different role: the violation facts materials are used to verify the conduct and evidence, the disciplinary decision document is used to verify the decision content and effective information, and the appeal statement is used to verify the scope of the request and the submission time. The pace of material updates depends on the progress of the disciplinary process; new versions may be produced at each stage of correction, delivery, and appeal, and the field characteristics are concentrated in names, quantities, dates, and signatures.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The "intake record and items to be completed" is then completed by subsequent nodes or manually. The form does not automatically recognize material content, nor does it judge the authenticity of materials.

| Object | Check | Verification action |
| --- | --- | --- |
| Violation facts materials | Whether they are consistent with the disciplinary decision document in the name of the conduct, the quantity involved, and the date of occurrence, and whether signatures are complete | Compare the name, quantity, and date fields in the two materials item by item, and check whether signatures and receipts are missing |
| Disciplinary decision document | Whether it corresponds to the appeal statement in the type of disciplinary action, effective date, and delivery receipt | Check the clauses of the decision document, the effective date, and the request date in the appeal statement, and check whether the seal and receipt are synchronized |
| Appeal statement | Whether the appeal request, reasons, and date are complete, and whether the corresponding decision document number is attached | Check whether the appeal statement fields are missing, and verify whether the cited decision document number and date are consistent |
| Form input node | Whether the field names correspond one-to-one with the material fields, and whether the required markers cover the key material fields | Check the field names and required settings one by one in the node configuration, and after submission check whether subsequent nodes can retrieve the corresponding field values |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the violation facts materials and the disciplinary decision document. Cause: The two materials are filled in separately, without cross-checking and field alignment.
- Symptom: The version of the disciplinary decision document is not synchronized, and the number or date cited in the appeal statement is inconsistent with the latest decision document. Cause: After correction or delivery, the form field values were not updated, and the old version is still in circulation.
- Symptom: The materials are missing signatures or receipts, but the intake record still shows that everything has been collected. Cause: The form did not set signatures and receipts as required, and after submission subsequent nodes cannot retrieve the corresponding field values.

## How to verify the setup

Acceptance of this feature: fill out the form once and submit it, then check whether the field values retrieved by subsequent nodes are consistent with what was filled in, focusing on the `formInput` output and the `userSelect` option values.

Business test: submit a question that is missing key information, and see whether it asks a follow-up question before answering, and whether the follow-up items correspond to the material fields.

- Check the field names and required markers one by one in the node configuration, and confirm that the key material fields are marked as required.
- Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a trial, and confirm that the corresponding field values can be retrieved after submission.
