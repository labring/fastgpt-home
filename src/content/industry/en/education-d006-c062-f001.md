---
title: HTTP Integrations for Research Ethics Review: Track Progress and Check Statistics
slug: /en/industry/education-d006-c062-f001
page_type: 行业问题页
application_area: education
meta_title: Research Ethics | HTTP | Progress
meta_description: Research Ethics: review HTTP for progress tracking. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# HTTP Integrations for Research Ethics Review: Track Progress and Check Statistics

## What this category's data looks like

This category's data covers progress records and statistical verification for research ethics review, involving three types of materials: ethics review applications, informed consent form templates, and risk assessment forms. The ethics review application records the acceptance number, review method, submission date, and the signature of the lead reviewer; the informed consent form template records the version number, revision date, and researcher signature; the risk assessment form records the risk level, assessment date, and review signature. The three types of materials come from different sources: applications are submitted by researchers, templates are maintained by the ethics office, and assessment forms are filled out by committee members. The update cadence advances with review batches, and version numbers and dates must stay in sync. When the materials enter the HTTP interface, the application serves as the main record, while the template and assessment form are passed as attachment fields along with the request body into the external system, for progress table aggregation and statistical scope verification.

## Configuration and implementation checks

This step is executed by the HTTP node in the workflow, which outputs the response body, status code, and returned fields. The "Progress Table and Statistical Scope Description" is parsed from the response by subsequent nodes, or handled accordingly by the external system to complete the rest.

| Object | Check | Verification action |
| --- | --- | --- |
| Ethics review application | Whether the acceptance number, review method, submission date, and lead reviewer signature are complete | Verify the acceptance number and submission date fields in the request body, and use `responseData` to compare the returned application status |
| Informed consent form template | Whether the version number, revision date, and researcher signature are consistent with the application record | Verify the request header `Authorization` and the template version field, and check whether the name and date on the same record match |
| Risk assessment form | Whether the risk level, assessment date, and review signature are consistent with the application record | Trace the placeholder sources of the risk level and assessment date in the `variables` panel, and compare the quantities and dates of the two materials |
| Request URL and path parameters | Whether the placeholder variables can be resolved into actual values | View the fully rendered URL in the request preview, and confirm that the path parameters match the application number |

## Three common errors

- Symptom: The name and date of the same record do not match between the application and the assessment form. Cause: The two fields come from different sources and were not uniformly backfilled by acceptance number.
- Symptom: The template version is not synchronized, and the old version is still sent with the request body. Cause: The version number was not updated with the revision date, and the variable placeholder points to the old value.
- Symptom: A 401 is returned or the external system receives empty fields. Cause: Authentication information was not passed in as required by the external system, or the variable source is missing.

## How to verify the setup

This feature's acceptance: preview the rendered request, check the status code and returned fields, then compare the results against a sample to confirm that the `responseData` fields match the agreement.

Business testing: use one week of records to verify the totals, check whether the scope and exceptions are clearly stated, and verify whether the record count and statistical count match.

- In the variables panel, verify the source of each placeholder and confirm that `variables` can be traced to global variables, system variables, or outputs from preceding nodes.
- Verify the request header names and value sources, confirm that `Authorization` is passed in as required by the external system, and compare the returned fields of a sample request.
