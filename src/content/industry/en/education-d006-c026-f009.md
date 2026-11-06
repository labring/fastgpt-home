---
title: Tool Calls and Plugins for Degree Awards and Certificate Information Reporting: Track Progress and Check Statistics
slug: /en/industry/education-d006-c026-f009
page_type: 行业问题页
application_area: education
meta_title: Degree Certificates | Tool Calls | Progress
meta_description: Degree Certificates: review tool calls for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Degree Awards and Certificate Information Reporting: Track Progress and Check Statistics

## What this category's data looks like

This page focuses on progress records and statistical verification for degree conferral and certificate information reporting, involving three types of materials: degree application forms, thesis review forms, and defense resolutions. The degree application form carries the applicant's basic information and degree category, the thesis review form carries the review conclusion and review date, and the defense resolution carries the defense conclusion, voting result, and signature. The materials are aggregated by department in batches and then enter the workflow, updated on a rolling basis during the week and centrally verified at the end of the month. The field characteristics center on name, student ID, major, date, signature status, and quantity totals. When entering this function, the degree application form serves as the primary record source, while the thesis review form and defense resolution serve as the basis for cross-verification; the fields of the three must be aligned in the progress table and the statistical criteria description.

## Configuration and implementation checks

This step is executed by the tool call node in the workflow (the model decides whether to call it, and the node executes it), outputting the tool call result (the inputs and returns in the call record). The "progress table and statistical criteria description" is then completed by a subsequent AI node or manual verification.

| Object | Check | Verification action |
| --- | --- | --- |
| Degree application form | Whether name, student ID, major, degree category, application date, and signature field are complete, and whether the name, quantity, and date are consistent with those in the thesis review form and defense resolution | Open the application form fields one by one and compare them side by side with the review form and resolution; mark dates and signature fields separately, and record missing items in the exception list |
| Thesis review form | Whether the review conclusion, review date, reviewer signature, and receipt are complete, and whether the name and date of the same record match those in the application form and resolution | Index the three materials by student ID and verify the review conclusion and date; when the signature or receipt is missing, mark the version as not synchronized |
| Defense resolution | Whether the defense conclusion, voting result, defense date, and chair signature are consistent with the quantity totals and dates in the application form and review form | Use one week of records to verify the totals, check item by item for quantity and date discrepancies between the resolution and the application form and review form, and write the discrepancies into the criteria description |
| Tool call node | The model determines whether to call the tool this time based on the tool introduction, parameter introduction, and whether the parameters are required; when there are no required parameters, the model may fabricate parameter values on its own, and when there are required parameters but no suitable value in the context, it may not call | Check the diamond connectors and node status on the canvas, inspect the inputs and returns of `toolChoice` and `functionCall` in the call record, and confirm whether it asks a follow-up question or calls according to the introduction |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the degree application form and the defense resolution. Cause: The two materials are entered separately, cross-verification by student ID is not performed, and the versions are not synchronized.
- Symptom: The thesis review form lacks a signature or receipt, but the progress table still records it as completed. Cause: The signature field and receipt are not included in the verification fields, and the statistical criteria do not specify how exceptions are handled.
- Symptom: Values that do not exist in the business materials appear in the returned results. Cause: When there are no required parameters, the model fabricates parameter values on its own, and the tool introduction does not clearly state when to use it and what result it returns.

## How to verify the setup

Acceptance of this function: run a test with a question that lacks a required parameter, check the inputs and returns in the call record, and confirm whether it asks a follow-up question or calls according to the introduction; also check the call records of `toolChoice` and `functionCall`.

Business test: use one week of records to verify the totals and see whether the criteria and exceptions are clearly stated; compare the name, quantity, and date of the degree application form, thesis review form, and defense resolution item by item.

- Open the introduction field in the tool node and check whether this description can be understood when taken out on its own; open the parameter configuration one by one and verify the introduction and whether it is required.
- Check the diamond connectors and node status on the canvas, and run a test with a question that lacks that field to see whether it asks a follow-up question first instead of directly fabricating.
