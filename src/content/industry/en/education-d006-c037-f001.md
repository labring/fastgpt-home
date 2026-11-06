---
title: HTTP Integrations for Vocational Training Subsidy Applications: Track Progress and Check Statistics
slug: /en/industry/education-d006-c037-f001
page_type: 行业问题页
application_area: education
meta_title: Training Subsidies | HTTP | Progress
meta_description: Training Subsidies: review HTTP for progress tracking. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# HTTP Integrations for Vocational Training Subsidy Applications: Track Progress and Check Statistics

## What this category's data looks like

Materials for progress records and statistical verification of vocational training subsidy applications come from three types: training class filing, attendance records, and completion assessment forms. Class filing includes institution name, class number, start and end dates, training occupation and level, student roster, and institution seal; attendance records list student names, sign-in times, absence annotations, and lead instructor signatures by day; completion assessment forms include assessment date, scores, assessor signatures, and institution receipt. Materials are archived by class; filing is updated before the class starts, attendance is updated daily during training, and assessment forms are updated within one week after completion. When entering this function, the filing serves as the class's basic information, attendance records serve as the progress flow, and completion assessment forms serve as the result evidence. The three are associated by the same class number and student identity, for subsequent nodes to parse the response or for external systems to process as agreed.

## Configuration and implementation checks

This step is executed by the HTTP node in the workflow, outputting the response body, status code, and returned fields. The progress table and statistical criteria description are parsed by subsequent nodes from the response, or completed by an external system processing as agreed. The HTTP node is only responsible for sending requests as agreed and bringing back results; it does not replace the external system in writing to the database or approving.

| Object | Check | Verification action |
| --- | --- | --- |
| Training class filing | Whether the institution name, class number, start and end dates, student roster, and seal are complete, and whether the class number and dates match those in the attendance records and completion assessment forms | In the request preview, view the complete rendered address, check the `Authorization` request header and request body fields, and compare the class number, dates, and signatures across the filing, attendance, and assessment materials |
| Attendance records | Whether the daily sign-in times, absence annotations, and lead instructor signatures are complete, and whether the same student names match the filing roster and assessment form | Check the request header names and value sources, compare the response using a sample request, and verify daily the names and counts of attendees against the filing roster and assessment form list |
| Completion assessment form | Whether the assessment date, scores, assessor signature, and institution receipt are complete, and whether they match the attendance days in the attendance records and the start and end dates in the filing | In the variables panel, check the source of each placeholder, confirm that the fields parsed from `variables` and `responseData` match the assessment form, and check whether the receipt is missing a signature |
| Statistical criteria description | Whether the record count and statistical count match, whether the criteria are written in the header, and whether exceptions are listed separately | Use one week of records to verify the totals, check the source of each placeholder in the variables panel, and confirm that the fields returned by `responseData` correspond item by item to the criteria header |

## Three common errors

- Symptom: The same student's name and attendance days do not match between the attendance records and the completion assessment form. Cause: The two materials are entered separately, without association verification by class number and student identity.
- Symptom: The start and end dates in the class filing are inconsistent with the dates in the attendance records and assessment form. Cause: The filing version was not synchronized, the associated materials were not written back after updating, and the date criteria each followed the old version.
- Symptom: The completion assessment form is missing the assessor signature or institution receipt. Cause: No signature and receipt check was set up in the material circulation step; only fields were checked at submission, not seals.

## How to verify the setup

This function's acceptance: preview the rendered request, check the status code and returned fields, then compare the result against a sample to confirm that the three references `Authorization`, `variables`, and `responseData` are consistent with the external interface agreement.

Business test: use one week of records to verify the totals, see whether the criteria and exceptions are clearly written, and confirm that the record count and statistical count match and the criteria are written in the header.

- In the request preview, view the complete rendered address, check the request header names and value sources, and confirm that placeholder variables can be parsed into actual values.
- In the variables panel, check the source of each placeholder, compare the response using a sample request, and confirm that the request body fields are consistent with the external interface agreement.
