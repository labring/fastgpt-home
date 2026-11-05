---
title: HTTP Integrations for School Mental Health Screening and Referrals: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c015-f001
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | HTTP | Intake
meta_description: Student Mental Health: review HTTP for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# HTTP Integrations for School Mental Health Screening and Referrals: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses primary and secondary school mental health screening and referral scenarios. The materials include three types: psychological screening plans, interview records, and referral forms. The sources are the school psychological center and homeroom teachers' daily reporting, and the update cadence advances by screening batch and individual referral milestones. The screening plan contains screening dimensions, administration date, and the responsible person's signature; the interview record contains interview time, question items and answers, and missing-item annotations; the referral form contains the referral reason, handler, receipt, and signature. When the materials enter the Q&A intake and missing-item follow-up function, the screening plan serves as the source of question items, the interview record serves as the basis for what has been answered, and the referral form serves as the destination evidence; the fields, dates, and signatures of the three must be aligned item by item.

## Configuration and implementation checks

This step is executed by the HTTP node in the workflow, which outputs the response body, status code, and returned fields. The "intake record and completed question items" are parsed from the response by subsequent nodes, or handled by an external system according to the agreement to complete the process.

| Object | Check | Verification action |
| --- | --- | --- |
| Psychological screening plan | Screening dimensions, administration date, and responsible person's signature must be aligned item by item with the interview record and referral form | Check whether the question item fields in the plan correspond one-to-one with the answer items in the interview record, and whether the date and signature are complete |
| Interview record | Interview time, question items and answers, and missing-item annotations must be consistent with the screening plan and referral form | Compare whether the name, quantity, and date of the same record in the interview record and referral form are consistent, and whether missing items are annotated |
| Referral form | Referral reason, handler, receipt, and signature must correspond with the screening plan and interview record | Check whether the referral form's receipt and signature are complete, and whether the handler corresponds with the recorder in the interview record |
| Request body | Fields are consistent with the external interface agreement | Use a sample request to compare the return, and check whether the returned fields in `responseData` match the agreed fields |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the interview record and the referral form. Cause: The two were filled in at different times, and no field-level alignment check was performed.
- Symptom: The screening plan version was not synchronized, so the question items do not match the answer items in the interview record. Cause: After the plan was updated, it was not synchronized to the interview record and referral form.
- Symptom: The referral form lacks a signature or receipt, so the intake record cannot confirm the destination. Cause: The referral step did not return the signature and receipt as agreed.

## How to verify the setup

This function's acceptance: preview the rendered request, check the status code and returned fields, then compare the result against a sample; in the variables panel, check the sources of `Authorization`, `variables`, and `responseData`.

Business test: submit a question missing key information and see whether it asks a follow-up question before answering.

- In the request preview, view the complete rendered address and check whether the path parameter placeholder variables can be resolved into actual values.
- Check the request header names and value sources, and confirm that the authentication information is passed in according to the external system's requirements.
