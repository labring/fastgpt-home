---
title: HTTP Integrations for Graduate Admissions Interviews and Selection: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c024-f001
page_type: 行业问题页
application_area: education
meta_title: Graduate Admissions | HTTP | Intake
meta_description: Graduate Admissions: review HTTP for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# HTTP Integrations for Graduate Admissions Interviews and Selection: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the graduate admissions re-examination and enrollment category, aggregating three types of materials: re-examination plans, candidate score sheets, and transfer lists. Re-examination plans are published by admissions units and updated as batches change, with fields including specialty direction, re-examination ratio, time and location, and signature block; candidate score sheets are compiled from preliminary and re-examination scores, with fields including candidate number, subject scores, total score, ranking, date, and review signature; transfer lists are exported from the transfer system, with fields including transfer preference, preliminary exam score, proposed admission status, and receipt. When these three types of materials enter the Q&A intake and missing-item follow-up function, the re-examination plan serves as the rule basis, while the candidate score sheet and transfer list serve as the source of case facts; intake records and completed follow-up items are handled by subsequent nodes parsing the response or by an external system according to the agreement. Materials commonly have mismatched names, quantities, and dates, unsynchronized versions, and missing signatures or receipts, so missing items must first be identified during intake before follow-up questions are asked.

## Configuration and implementation checks

This step is executed by the HTTP node in the workflow, outputting the response body, status code, and returned fields. Intake records and completed follow-up items are handled by subsequent nodes parsing the response, or by an external system according to the agreement. The HTTP node does not replace the external system in writing to the database or approving.

| Object | Check | Verification action |
| --- | --- | --- |
| Re-examination plan | Whether the specialty direction, re-examination ratio, time and location, and signature block in the plan correspond to the intake question items | Verify the plan version date and signature block, map the plan fields to the question item list, and check whether names and quantities are consistent with the score sheet |
| Candidate score sheet | Whether candidate number, subject scores, total score, ranking, date, and review signature are complete | Compare the same-named candidate in the score sheet and transfer list one by one, verify the date and signature, and write missing items into the pending follow-up items |
| Transfer list | Whether transfer preference, preliminary exam score, proposed admission status, and receipt match the score sheet | Verify the list version and receipt, and check whether the names, quantities, and dates of the same record in the two materials are consistent |
| HTTP node request | Whether the request URL and path parameters, request headers, and placeholder variables in the request body can be resolved into actual values | View the fully rendered URL in the request preview, verify the `Authorization` request header and the source of `variables`, and use a sample request to compare the `responseData` returned fields |

## Three common errors

- Symptom: The name, quantity, and date of the same candidate in the score sheet and transfer list do not match. Cause: The two materials are entered separately without cross-checking, and one side's data is directly referenced during intake.
- Symptom: The re-examination plan version is not synchronized, and question items are based on the old version's ratio and time. Cause: The plan was not re-imported after updating, and intake records still reference the old version's fields.
- Symptom: The score sheet or transfer list lacks a signature or receipt, and after intake it cannot be transferred to the handler. Cause: Signatures were not fully collected during material circulation, and missing items were not identified and followed up on.

## How to verify the setup

This function's acceptance: preview the rendered request, verify the status code and returned fields, then compare the result against one sample; confirm that the values of `Authorization`, `variables`, and `responseData` are consistent with the external interface agreement.

Business test: submit a question missing key information and see whether it asks a follow-up question first before answering.

- In the request preview, verify the fully rendered URL, request header names, and value sources, and confirm that every placeholder variable can be traced to a global variable, system variable, or upstream node output.
- Use one sample request to compare the return, check that the request body fields are consistent with the external interface agreement, and confirm that missing items are identified and followed up on before being transferred to the handler.
