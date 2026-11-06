---
title: HTTP Integrations for Research Ethics Review: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c062-f001
page_type: 行业问题页
application_area: education
meta_title: Research Ethics | HTTP | Intake
meta_description: Research Ethics: review HTTP for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# HTTP Integrations for Research Ethics Review: Handle Questions and Collect Missing Information

## What this category's data looks like

Research ethics review materials typically include ethics review applications, informed consent form templates, and risk assessment forms, coming from institutional ethics committee intake windows, research team submissions, and system integrations. When materials enter the Q&A intake stage, each plays a different role: the application carries basic research information and review category, the informed consent form template carries the elements of subject notification, and the risk assessment form carries the risk level and handling measures. The update cadence changes with version revisions, signature corrections, and receipt archiving. Field characteristics are concentrated in four categories: name, quantity, date, and signature; the same record must remain consistent across different materials.

## Configuration and implementation checks

This step is executed by the HTTP node in the workflow, outputting the response body, status code, and returned fields. The "intake record and items to be completed" are parsed from the response by subsequent nodes, or handled and completed by an external system according to the agreement.

| Object | Check | Verification action |
| --- | --- | --- |
| Ethics review application | Whether the application fields, date, and signature are complete, and whether the name is consistent with the informed consent form template and risk assessment form | View the fully rendered address in the request preview, and verify the `Authorization` request header and request body fields |
| Informed consent form template | Whether the template version, signature, and receipt are synchronized, and whether the quantity and date match the application and risk assessment form | Compare the response with a sample request, and check the consistency between the `responseData` returned fields and the material fields |
| Risk assessment form | Whether the risk level, handling measures, date, and signature are complete, and whether missing items are identified and followed up on | Verify the source of each placeholder in the variables panel, and confirm that the `variables` values can be traced back to specific materials |
| External system interface | Whether the request body fields are consistent with the external interface agreement, and whether the authentication information is passed in according to the external system's requirements | Verify the request header names and value sources, and compare the returned status code and returned fields |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the application and the informed consent form template. Cause: The two materials are filled in separately without cross-checking.
- Symptom: The version is not synchronized, and an old template is still referenced. Cause: After the materials are updated, resubmission and receipt archiving are not triggered.
- Symptom: A signature or receipt is missing, and the intake record is incomplete. Cause: The signing step is disconnected from system entry and is not completed in the follow-up questions.

## How to verify the setup

Acceptance of this feature: preview the rendered request, verify the status code and returned fields, then compare the result against a sample to confirm that `Authorization`, `variables`, and `responseData` are traceable.

Business test: submit a question that lacks key information and see whether it asks follow-up questions before answering.

- Verify that the request address and path parameter placeholder variables can be resolved into actual values, and view the fully rendered address in the request preview.
- Verify the request header names and value sources, compare the response with a sample request, and confirm that the fields are consistent with the external interface agreement.
