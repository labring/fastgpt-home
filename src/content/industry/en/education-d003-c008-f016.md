---
title: Forms and User Interaction for School Admissions and Enrollment Organization: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c008-f016
page_type: 行业问题页
application_area: education
meta_title: School Admissions | Forms | Intake
meta_description: School Admissions: review forms for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for School Admissions and Enrollment Organization: Handle Questions and Collect Missing Information

## What this category's data looks like

This category's data looks like
Primary and secondary school enrollment organizations involve three types of materials: enrollment plans, application material checklists, and admission lists. Enrollment plans come from education authorities and school enrollment leadership groups, updated by academic year or batch, with fields including enrollment plan, school district scope, time nodes, and approval signature. Application material checklists are compiled by the admissions office based on the plan, fine-tuned with each batch, with fields including school-age child information, household registration and residence proof, vaccination records, guardian contact information, and receipt signature. Admission lists are generated after review, with fields including student name, admission category, publicity date, and responsible person's signature. When these three types of materials enter the form input node, the plan and checklist are used to generate question items and identify missing items, and the list is used to verify whether the name, quantity, and date of the same record are consistent. Missing signatures or receipts trigger follow-up questions.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, outputting the field values filled in by the user (passed to subsequent nodes after submission). "Acceptance records and completed question items" are subsequently completed by subsequent nodes or manually. After the node is triggered, the conversation enters the interaction state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Enrollment plan | Fields include enrollment plan, school district scope, time nodes, and approval signature; the name, quantity, and date of the same record in the two materials must be consistent | Check field names one by one in the node configuration, and check the required settings |
| Application material checklist | Fields include school-age child information, household registration and residence proof, vaccination records, guardian contact information, and receipt signature; versions must be synchronized | Check field names and required markers one by one in the node configuration |
| Admission list | Fields include student name, admission category, publicity date, and responsible person's signature; missing signature or receipt triggers follow-up questions | Reference this field in subsequent nodes and run a test to check the retrieved field values |
| Form fields | One-to-one correspondence with the material fields to be collected; key material fields have been marked as required | Check field names and required settings one by one in the node configuration |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the plan and the checklist. Cause: The two materials are maintained separately, and field-level comparison is not performed before submission.
- Symptom: The checklist version is not synchronized, and old batch fields are still being collected. Cause: The update rhythm is out of sync with batch release, and the node configuration is not adjusted with the plan.
- Symptom: The admission list still enters the next stage when signatures or receipts are missing. Cause: Required markers do not cover signature fields, and no follow-up is made after submission.

## How to verify the setup

Acceptance for this feature: Fill out and submit once, check the field values retrieved by subsequent nodes, and confirm that the fields corresponding to `formInputResult` and `selectResult` are passed correctly.

Business test: Submit a question missing key information and see whether it asks follow-up questions before answering.

- Check field names and required markers one by one in the node configuration, and confirm that key material fields have been marked as required.
- Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a test to check the field values after submission.
