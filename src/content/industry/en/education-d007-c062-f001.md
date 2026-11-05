---
title: HTTP Integrations for Research Ethics Review: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c062-f001
page_type: 行业问题页
application_area: education
meta_title: Research Ethics | HTTP | Review
meta_description: Research Ethics: review HTTP for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# HTTP Integrations for Research Ethics Review: Trace Exceptions and Review Results

## What this category's data looks like

Research ethics review materials include ethics review applications, informed consent form templates, and risk assessment forms. Applications are submitted by researchers, templates are provided by the institution, and assessment forms are filled out by reviewers. Fields cover project name, number of subjects, review date, signatures, and receipts. The update cadence changes with protocol amendments, annual re-reviews, and adverse event reports. When materials enter the exception tracing and manual review feature, applications are used to locate the original submission, templates are used to compare versions and fields, and assessment forms are used to check risk levels and signatures. For the same record, the name, quantity, and date in the application and the assessment form must be consistent, versions must be synchronized, and signatures and receipts must be complete.

## Configuration and implementation checks

This step is executed by the HTTP node in the workflow, which outputs the response body, status code, and returned fields. The exception list and review conclusions are parsed from the response by subsequent nodes, or handled by an external system according to the agreement to complete the rest. The request URL, path parameters, request headers, and request body can all reference global variables, system variables, or outputs from preceding nodes via `variables`.

| Object | Check | Verification action |
| --- | --- | --- |
| Ethics review application | The project name, number of subjects, review date, and signature must be consistent with the assessment form | Compare the name, quantity, and date item by item in the application and the assessment form, and check whether the signature and receipt are complete |
| Informed consent form template | The version number is synchronized with the ethics review application version, and the fields and signature section are complete | Check whether the template version is synchronized with the application version, and verify the signature section and receipt fields |
| Risk assessment form | The risk level, assessment date, and signature must be supported by the original record | Trace the original record of the assessment form, check the risk level and signature, and compare the quantity in the application |
| HTTP node | The placeholder variables in the request URL, path parameters, request headers, and request body can be resolved into actual values | View the fully rendered URL in the request preview, and check the sources of the `Authorization` and `responseData` fields |

## Three common errors

- Symptom: The number of subjects for the same record does not match between the application and the assessment form. Cause: The two materials were entered separately, without cross-comparison and version synchronization.
- Symptom: The informed consent form template version is inconsistent with the ethics review application version. Cause: After the template was updated, it was not synchronized to the application record, and the old version was referenced during tracing.
- Symptom: The risk assessment form is missing a signature or receipt. Cause: The review process was archived before it was completed, so the signer cannot be traced during manual review.

## How to verify the setup

Feature acceptance: preview the rendered request, check the status code and returned fields, then compare the results against one sample; check the `variables` sources and the `responseData` fields.

Business test: create an exception record and see whether the source material can be traced.

- In the variables panel, check the source of each placeholder and confirm that `variables` can trace back to global variables, system variables, or outputs from preceding nodes.
- Use one sample request to compare the response, and check whether the request header `Authorization` and the returned field `responseData` conform to the external interface agreement.
