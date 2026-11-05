---
title: Forms and User Interaction for School Mental Health Screening and Referrals: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c015-f016
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | Forms | Review
meta_description: Student Mental Health: review forms for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for School Mental Health Screening and Referrals: Trace Exceptions and Review Results

## What this category's data looks like

This page focuses on exception tracing and manual review for mental health screening and referral in primary and secondary schools. The materials come from three types: screening plans, interview records, and referral forms. Screening plans are updated by semester and contain the scale name, screening date, and homeroom teacher signature; interview records are added within one week after screening and contain the student name, interview time, and interviewer signature; referral forms are issued after review and contain the referral target, referral reason, and recipient receipt. When the three types of materials enter the form input node, each plays its own role as a field source: the screening plan provides the basis for initial exception screening and the date, the interview record provides the exception description and signature, and the referral form provides the exception destination and receipt. The field characteristics are four types: name, date, signature, and quantity. It is common for the same record to have inconsistent names, quantities, or dates across two materials, for versions not to be synchronized, and for signatures or receipts to be missing.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The "exception list and review conclusion" is completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters the interaction state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Psychological screening plan | The scale name, screening date, and homeroom teacher signature are consistent item by item with the interview record and referral form | Check the field names one by one in the node configuration, and compare whether the names, dates, and signatures in the three materials match |
| Interview record | The student name, interview time, and interviewer signature are consistent item by item with the screening plan and referral form | Check the required settings one by one, confirm that name, date, and signature are marked as required, and that submission is not possible when items are missing |
| Referral form | The referral target, referral reason, and recipient receipt are consistent item by item with the screening plan and interview record | Reference this field in subsequent nodes and run a test, using `formInputResult` and `selectResult` to retrieve the corresponding field values |
| Exception list and review conclusion | The exception is supported by original records, the reviewer has signed, and it can be traced back to the source materials | Reference the fields in subsequent nodes and run a test to confirm that the list can point back to the screening plan, interview record, and referral form |

## Three common errors

- Symptom: The same student's name and date do not match between the screening plan and the interview record. Cause: The two materials were filled in by different people, and no cross-check was performed.
- Symptom: The referral form version is not synchronized, and the recipient receipt is missing. Cause: The referral form was not returned after updating, and the reviewer did not check the signature and receipt.
- Symptom: After submission, subsequent nodes cannot retrieve the values, and the conversation stays in the interaction state. Cause: Required items can be submitted even when empty, and the field names are inconsistent with subsequent references.

## How to verify the setup

Feature acceptance: fill in the form once and submit it, check the field values retrieved by subsequent nodes, and confirm that `formInputResult` and `selectResult` can reference the corresponding fields.

Business test: create an exception record, see whether it can be traced back to the source materials, and check whether the fields, dates, and signatures of the screening plan, interview record, and referral form are consistent.

- Check the form field names one by one against the fields of the screening plan, interview record, and referral form to ensure one-to-one correspondence, and mark key fields as required.
- Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a test to confirm that values can be retrieved after submission and that the exception list can point back to the source materials.
