---
title: HTTP Integrations for School Mental Health Screening and Referrals: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c015-f001
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | HTTP | Access
meta_description: Student Mental Health: review HTTP for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# HTTP Integrations for School Mental Health Screening and Referrals: Manage Authorized Access and External Services

## What this category's data looks like

This page addresses the scenario of primary and secondary school mental health screening and referral, and the materials come from three types: psychological screening plans, interview records, and referral forms. The psychological screening plan provides the scale name, screening date, and class scope, and is the basis for the entry point and authorization scope; the interview record carries the student name, interview time, and psychological teacher signature, and is used to verify individual information; the referral form records the referral subject, referral date, receiving party, and receipt signature, and is the credential for external services. The three types of materials are updated by semester and referral batch, with fields centered on name, date, quantity, and signature. When the materials enter the HTTP interface, the screening plan determines the visible scope, and the interview records and referral forms serve as sources of request body fields for external systems to read according to the agreement.

## Configuration and implementation checks

The HTTP node in the workflow only outputs the response body, status code, and returned fields; the externally available entry point and authorization scope must be handled by subsequent nodes parsing the response, or by the external system according to the agreement. The HTTP module sends requests to the target address, and variables can be used as placeholders in all three places: path parameters, request body, and request headers. Variables come from global variables, system variables, or the output of preceding nodes.

| Object | Check | Verification action |
| --- | --- | --- |
| Psychological screening plan | The scale name, screening date, and class scope in the screening plan must be consistent with the externally visible scope | Check the request address and path parameters, view the fully rendered address in the request preview, and confirm that the placeholder variables can be resolved into actual values |
| Interview record | The student name, interview time, and psychological teacher signature in the interview record must match the name and date in the screening plan | Check the request header names and value sources, confirm that authentication information is passed in according to the external system's requirements, and verify the source of each placeholder in the variables panel |
| Referral form | The referral subject, referral date, receiving party, and receipt signature in the referral form must be consistent with the name, quantity, and date in the interview record | Use a sample request to compare the response, confirm that the request body fields are consistent with the external interface agreement, and check whether the returned fields contain `responseData` |
| Variable sources | Each placeholder can be traced to a specific origin, and authentication information and request body fields do not contain null values | Check the sources of `Authorization` and `variables` in the variables panel, and confirm that the request body fields are consistent with the external interface agreement |

## Three common errors

- Symptom: The name and date of the same student do not match between the interview record and the referral form. Cause: The two materials are entered separately, and the name and date were not uniformly checked against the screening plan.
- Symptom: The referral form lacks the receiving party's signature or receipt. Cause: After the external service is completed, the signature was not filled in, and the material version was not synchronized to the latest batch.
- Symptom: The request returns 401 or the external system receives empty fields. Cause: The request header authentication information and request body fields were not passed in according to the external interface agreement, and the placeholder variables were not resolved into actual values.

## How to verify the setup

This feature's acceptance: preview the rendered request, check the status code and returned fields, confirm that the sources of `responseData`, `Authorization`, and `variables` are traceable, and then compare the result against a sample.

Business test: access once with a restricted identity and see whether the visible scope matches the setting

- In the request preview, check the fully rendered address and path parameters, and confirm that the placeholder variables can be resolved into actual values
- In the variables panel, check the sources of `Authorization` and `variables`, and use a sample request to compare the returned fields
