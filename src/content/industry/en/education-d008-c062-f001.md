---
title: HTTP Integrations for Research Ethics Review: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c062-f001
page_type: 行业问题页
application_area: education
meta_title: Research Ethics | HTTP | Access
meta_description: Research Ethics: review HTTP for authorized access. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# HTTP Integrations for Research Ethics Review: Manage Authorized Access and External Services

## What this category's data looks like

This page addresses the research ethics review category, covering three types of materials: ethics review applications, informed consent form templates, and risk assessment forms. Materials are submitted in batches by institutional ethics committees, project teams, and administrative departments, with update cadence varying according to application cycles and version revisions. Field characteristics center on project name, number of subjects, review date, and signature and receipt status. The three types of materials play different roles when entering the authorized access and external services feature: the ethics review application serves as the primary record, determining the authorization scope and visibility level of the access entry point; the informed consent form template serves as attachment material, synchronized externally along with the primary record; the risk assessment form serves as independent material, authorized separately by project dimension. When materials enter the HTTP interface and external systems, the external entry point and authorization scope must first be clarified, then the visible scope matched according to visitor identity.

## Configuration and implementation checks

This step is executed by the HTTP node in the workflow, outputting the response body, status code, and returned fields. The externally available entry point and authorization scope are completed by subsequent nodes parsing the response, or by the external system processing according to the agreement. The HTTP node does not replace the external system in writing to the database or approving; it is only responsible for sending requests according to the agreement and returning results.

| Object | Check | Verification action |
| --- | --- | --- |
| Ethics review application | Fields, dates, and signatures are consistent between the application and the receipt | Check the application number, review date, and signature field, and confirm they correspond to the receipt |
| Informed consent form template | Name, quantity, and date match the primary record | Compare the template version number, number of subjects, and signing date, and check for missing signatures or receipts |
| Risk assessment form | Fields and dates are inconsistent when the version is not synchronized | Check the risk level, assessment date, and signature, and confirm consistency with the current version |
| Request address and path parameters | Placeholder variables can be resolved into actual values | View the rendered full address in the request preview, and check the source of `variables` |

## Three common errors

- Symptom: The name and date of the same record do not match between the application and the receipt. Cause: The two materials were entered separately, and fields were not synchronized according to the same primary record.
- Symptom: The informed consent form template version is not synchronized, and the old version is still externally visible. Cause: After the version update, reauthorization was not performed, and the access scope still points to the old version.
- Symptom: The risk assessment form lacks a signature or receipt but still appears at the external entry point. Cause: The authorization scope does not verify signature and receipt status, and only releases by project dimension.

## How to verify the setup

Acceptance for this feature: preview the rendered request, check the status code and returned fields, then compare the results against one sample; check the `Authorization` request header and the `responseData` returned fields.

Business test: access once with a restricted identity, and see whether the visible scope matches the setting

- In the variables panel, check the source of each placeholder, and confirm whether it comes from global variables, system variables, or the output of preceding nodes
- Use one sample request to compare the returned fields with the external interface agreement, and check the request header names and value sources
