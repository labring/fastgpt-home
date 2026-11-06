---
title: HTTP Integrations for School Mental Health Screening and Referrals: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c015-f001
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | HTTP | Versions
meta_description: Student Mental Health: review HTTP for version tracking. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# HTTP Integrations for School Mental Health Screening and Referrals: Maintain Document Versions and Changes

## What this category's data looks like

In the primary and secondary school mental health screening and referral scenario, three types of materials are commonly kept on hand: the psychological screening plan, interview records, and referral forms. The plan contains screening dimensions, scoring criteria, and assignment of responsibilities; interview records contain the interview date, subject, key points, and the interviewer's signature; referral forms contain the reason for referral, the receiving party, the receipt, and signatures from both parties. The materials come from in-school psychology teachers, homeroom teachers, and external institutions, and the update cadence changes with semesters, retests, and individual cases. When entering this feature, the plan and records serve as sources of request body fields, and the referral form serves as the basis for comparison against fields returned by the external system; together, the three support the version ledger and change records.

## Configuration and implementation checks

This step is executed by the HTTP node in the workflow, which outputs the response body, status code, and returned fields. The "version ledger and change records" are completed by subsequent nodes parsing the response, or by the external system handling it as agreed. The request URL, path parameters, request headers, and request body can all reference global variables, system variables, or outputs from preceding nodes via `variables`.

| Object | Check | Verification action |
| --- | --- | --- |
| Psychological screening plan | The plan version number and effective date must be unique and traceable | Compare the plan name, version number, and date in the request body, and check the `variables` source |
| Interview records | The interview date, subject, and signature must be consistent with the plan's criteria | Use one sample request to compare the returned fields, and check whether the signature and receipt are complete |
| Referral form | The referral reason, receiving party, and receipt must be synchronized with the ledger | Check the request header `Authorization` and the returned fields, and confirm that the references are synchronized |
| HTTP request | Path parameters, request body, and request header placeholders can be resolved into actual values | View the fully rendered URL and `responseData` fields in the request preview |

## Three common errors

- Symptom: The dates for the same interview record do not match between the plan and the referral form. Cause: The request body fields are taken from outputs of different nodes and are not unified to the same version number.
- Symptom: An old version of the plan is still being referenced, and the new version has not been synchronized. Cause: After the change, the knowledge base or external documents were not updated, and the references were not refreshed with the version number.
- Symptom: The referral form is missing a signature or receipt. Cause: When the external system handled it as agreed, it did not return the signature field, and subsequent nodes did not validate the returned fields.

## How to verify the setup

Acceptance for this feature: preview the rendered request, check the status code and returned fields, then compare the result against one sample.

Business test: change one piece of content and see whether the version number and references are updated in sync.

- In the variables panel, check the source of each placeholder and confirm that `variables` can be traced to a global variable, system variable, or output from a preceding node.
- Check the request header names and value sources, confirm that `Authorization` is passed in as required by the external system, and check the `responseData` fields.
