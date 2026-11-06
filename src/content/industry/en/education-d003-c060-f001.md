---
title: HTTP Integrations for Research Project Annual Progress and Acceptance: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c060-f001
page_type: 行业问题页
application_area: education
meta_title: Research Progress | HTTP | Intake
meta_description: Research Progress: review HTTP for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# HTTP Integrations for Research Project Annual Progress and Acceptance: Handle Questions and Collect Missing Information

## What this category's data looks like

Annual progress and acceptance of research projects involve three types of materials: annual progress reports, mid-term review materials, and acceptance reports. Annual progress reports are submitted at annual milestones, with fields including project name, number, principal investigator, annual objectives, completion status, funding usage, and signature; mid-term review materials are updated before the milestone, including stage results, indicator comparisons, and expert opinions; acceptance reports are formed at project completion, including final indicators, results list, date, and signed receipt. When the three types of materials enter Q&A intake and missing-item follow-up, the annual progress report is the primary record source, the mid-term review materials are used to compare stage data, and the acceptance report is used to verify the final conclusion. Materials are often submitted as scanned copies or structured forms, with an update cadence that rolls by milestone, and field names and date formats differ across materials.

## Configuration and implementation checks

This step is executed by the HTTP node in the workflow, outputting the response body, status code, and returned fields. The "intake record and items to be completed" are parsed from the response by subsequent nodes, or handled by an external system according to the agreement to complete the rest. The request URL, path parameters, request headers, and request body can all reference global variables, system variables, or outputs of preceding nodes via `variables`, and authentication information is placed in `Authorization` as required by the external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Annual progress report | Whether the project name, number, principal investigator, annual objectives, completion status, funding usage, and signature fields are complete, and whether the date and signature are consistent with the mid-term review materials | Pass the report fields in the request body via `variables`, and verify whether the returned fields echo the project number and annual milestone date |
| Mid-term review materials | Whether the stage results, indicator comparisons, expert opinions, and signed receipt have the same items, same quantities, and same dates as the annual progress report | Compare the name, quantity, and date of the same record in the two materials, and use a sample request to verify the comparison result fields in `responseData` |
| Acceptance report | Whether the final indicators, results list, project completion date, and signed receipt connect with the annual progress report and mid-term review materials | Pass `Authorization` in the request headers as required by the external system, and verify the returned status code and acceptance conclusion fields |
| Intake record and items to be completed | Whether missing items are identified and converted into follow-up questions, and whether the answers point to specific material sources | View the rendered complete URL in the request preview, and check the missing-item list and follow-up items in the returned fields |

## Three common errors

- Symptom: the name, quantity, and date of the same record do not match between the annual progress report and the mid-term review materials. Cause: the two materials are filled in separately, no same-item comparison is performed, and versions are not synchronized.
- Symptom: the acceptance report lacks a signature or receipt, yet the intake record still shows the materials are complete. Cause: the signature and receipt fields are not included in the missing-item determination, and follow-up questions are not triggered.
- Symptom: the request returns 401, or the external system receives empty fields or the request times out. Cause: the authentication information and variable sources are not checked, and the request body fields are inconsistent with the external interface agreement.

## How to verify the setup

Acceptance of this feature: view the rendered request in the request preview, check the status code and returned fields, then compare the `responseData` result against a sample request.

Business test: submit a question missing key information, see whether it asks a follow-up question before answering, and check whether the answer points to specific fields in the annual progress report, mid-term review materials, or acceptance report.

- Check the request header names and value sources, confirm that `Authorization` is passed as required by the external system, and confirm that every placeholder in the variables panel can be traced to a `variables` source.
- Use a sample request to compare the returned fields, confirm that the missing-item list and follow-up items are written into the intake record, and forward it to the handler.
