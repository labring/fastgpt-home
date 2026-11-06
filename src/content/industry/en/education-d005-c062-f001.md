---
title: HTTP Integrations for Research Ethics Review: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c062-f001
page_type: 行业问题页
application_area: education
meta_title: Research Ethics | HTTP | Versions
meta_description: Research Ethics: review HTTP for version tracking. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# HTTP Integrations for Research Ethics Review: Maintain Document Versions and Changes

## What this category's data looks like

In research ethics review scenarios, three types of materials—ethics review applications, informed consent form templates, and risk assessment forms—enter the same data versioning and change maintenance process. The ethics review application carries the study name, protocol version, submission date, and researcher signature; the informed consent form template carries the participant notification items, signature block, and version date; the risk assessment form carries the risk level, handling measures, assessment date, and review signature. The fields of the three types of materials cross-reference one another, and the name, quantity, and date of the same record must be consistent. The data follows an update cadence in which the current version is unique and old versions are traceable; each content change triggers an increment of the version number, and applications and documents that reference the material are updated in sync. When the material enters this function, the HTTP node is responsible for passing the requests required for the version ledger and change records to the external system, and does not handle database writes or approvals.

## Configuration and implementation checks

This step is executed by the HTTP node in the workflow, which outputs the response body, status code, and returned fields. The "version ledger and change records" are parsed from the response by subsequent nodes, or handled by the external system according to the agreement to complete the rest. The request URL, path parameters, request headers, and request body can all reference global variables, system variables, or upstream node outputs via `variables`, and authentication information is placed in `Authorization` according to the external system's requirements.

| Object | Check | Verification action |
| --- | --- | --- |
| Ethics review application | The study name, protocol version, submission date, and researcher signature must be consistent with the informed consent form template | In the request preview, check the rendered complete URL and request body fields, and compare the name, version, and date returned in `responseData` |
| Informed consent form template | The participant notification items, signature block, and version date must be consistent with the references in the risk assessment form | Check the request header names and the source of their values, and use a sample request to compare the version number and signature receipt in the returned fields |
| Risk assessment form | The risk level, handling measures, assessment date, and review signature must correspond to the application record | In the variables panel, check the source of each placeholder, and confirm that `variables` and `Authorization` resolve to actual values |
| Version ledger | The current version is unique, old versions are traceable, and references are in sync | After changing one piece of content, check whether the version number and references are updated in sync, and record the version identifier in the returned fields |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the application and the informed consent form template. Cause: The two materials are maintained separately, and changes are not synced to the referencing party.
- Symptom: The version is not synced, and the old version is still referenced. Cause: The version number is not incremented with content changes, and the reference relationships are not refreshed with the ledger.
- Symptom: Signatures or receipts are missing, and the external system receives empty fields. Cause: The request body fields are inconsistent with the external interface agreement, or the placeholder variables are not resolved.

## How to verify the setup

Function acceptance: preview the rendered request, check the status code and returned fields, then compare the result against a sample to confirm that `responseData`, `variables`, and `Authorization` are all resolved as expected.

Business test: change one piece of content and see whether the version number and references are updated in sync.

- In the request preview, check the rendered complete URL, request header names, and request body fields, and confirm that the placeholder variables can resolve to actual values.
- Use a sample request to compare the returned fields, and confirm that the version number and reference relationships in the version ledger and change records are updated in sync.
