---
title: HTTP Integrations for School Mental Health Screening and Referrals: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c015-f001
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | HTTP | Review
meta_description: Student Mental Health: review HTTP for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# HTTP Integrations for School Mental Health Screening and Referrals: Trace Exceptions and Review Results

## What this category's data looks like

This page addresses exception tracing and manual review in the scenario of mental health screening and referral in primary and secondary schools. The materials include three types: psychological screening plans, interview records, and referral forms. The screening plan provides the scales, batch, screening date, and responsible school doctor fields, and serves as the baseline for determining exceptions; the interview records carry the student's chief complaint, teacher observations, and interview date, and are used to explain the source of exceptions; the referral form records the referral destination, receiving party, receipt, and signature, and is the closed-loop evidence. Materials enter by semester screening batch, the exception list is generated with the screening results, and the review conclusion is updated with the interview and referral receipt. Field characteristics center on name, student ID, class, date, quantity, and signature fields, and the same record must be aligned item by item across the three materials. When materials enter this function, the screening plan and interview records serve as the source materials for exception tracing, and the referral form serves as the disposition evidence for the review conclusion; together the three support the generation of the exception list and review conclusion.

## Configuration and implementation checks

This step is executed by the HTTP node in the workflow, which outputs the response body, status code, and returned fields. The exception list and review conclusion are parsed from the response by subsequent nodes, or handled by an external system according to the agreement to complete the rest. The HTTP module sends a request to the target address; path parameters, request body, and request headers can all use variable placeholders, and the variables come from global variables, system variables, or the output of preceding nodes.

| Object | Check | Verification action |
| --- | --- | --- |
| Psychological screening plan | The screening date, scale name, and batch in the plan must be aligned item by item with the interview records and referral form, and the signature field must be signed by the responsible school doctor | Check the plan fields against the names, quantities, and dates in the other two materials, and inspect the signature and version number |
| Interview records | The interview date, student's chief complaint, and teacher observations must be traceable to the exception entries in the screening plan, and no sourceless records may appear | Check the source of each placeholder in the variable panel, and compare the name, student ID, and date in the interview records and screening plan |
| Referral form | The referral destination, receiving party, receipt, and signature must be complete, and the receipt date must not be earlier than the interview date | Check the referral form receipt and signature, and inspect consistency of dates and names with the interview records and screening plan |
| Exception list and review conclusion | Each exception must be supported by an original record, the review conclusion must be signed by the reviewer, and no receipt may be missing | Use one sample request to compare the response, and check the exception entries in `responseData` against the source materials |

## Three common errors

- Symptom: The name or student ID of the same student does not match between the screening plan and the interview records, and exception tracing is interrupted. Cause: The two materials were not entered with a unified identifier, and cross-checking was missing.
- Symptom: The referral form receipt is missing or the signature field is blank, and the review conclusion cannot be closed. Cause: The receipt was not returned after referral, and manual review did not check the signature.
- Symptom: After the screening plan version is updated, the interview records and referral form still reference the old scale name and date. Cause: The version was not synchronized, and the variable placeholders still take the old values.

## How to verify the setup

This function's acceptance: preview the rendered request, check the status code and returned fields, then compare the result against one sample to confirm that `variables` and `Authorization` are parsed correctly.

Business test: create one exception record, see whether it can be traced to the source materials, and check that the exception entries in `responseData` align item by item with the screening plan, interview records, and referral form.

- In the request preview, view the full rendered address and check whether the placeholders in the path parameters, request headers, and request body are resolved into actual values.
- In the variable panel, check the source of each placeholder and confirm that the value origins of `variables`, `Authorization`, and `responseData` are traceable.
