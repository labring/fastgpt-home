---
title: Context and Token Budgets for Vocational Training Subsidy Applications: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c037-f002
page_type: 行业问题页
application_area: education
meta_title: Training Subsidies | Context & Tokens | Checks
meta_description: Training Subsidies: review context & tokens for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Context and Token Budgets for Vocational Training Subsidy Applications: Compare Documents and Locate Differences

## What this category's data looks like

This page focuses on three types of materials in vocational training subsidy applications: training class opening records, attendance records, and completion assessment forms. Opening records are submitted by the training institution before the class starts, containing the course name, student roster, class hours, and the signature of the person in charge; the update cadence is one filing before the class starts, with supplementary submission upon changes. Attendance records are generated daily, containing student names, dates, attendance status, and confirmation by the class supervisor, summarized daily or per session. Completion assessment forms are formed after the assessment, containing student names, assessment subjects, scores, dates, and the signature of the assessor. When the three types of materials enter this feature, the opening records serve as the baseline source, and the attendance records and assessment forms serve as comparison sources; field by field, it verifies whether the name, quantity, date, and signature of the same student are consistent, and after locating discrepancies generates a discrepancy list, which is handed to the reviewer for confirmation and written back to the ledger.

## Configuration and implementation checks

This part is executed by application settings (response limit, etc.), which output the length of a single answer and the range of context that can be accommodated. The discrepancy list is then completed by the model. The response limit is controlled by a slider for the length of a single answer; if set too low, the answer will be truncated, and if set too high, consumption will increase.

| Object | Check | Verification action |
| --- | --- | --- |
| Training class opening records | Compare with attendance records and completion assessment forms whether student names, course names, dates, and the signature of the person in charge are consistent | In application settings, check the response limit switch and slider position, and confirm the values of `maxResponse` and `maxContext`; then compare field by field the names, quantities, and dates of the opening records with the attendance records and assessment forms |
| Attendance records | Compare with the class opening records and completion assessment forms whether the attendance dates, quantities, and confirmation signature of the class supervisor for the same student are consistent | Ask a question that requires a long answer and see whether the ending is complete, confirming the answer was not truncated; then check whether the attendance dates and the course dates in the opening records fall within the same interval |
| Completion assessment forms | Compare with the class opening records and attendance records whether student names, assessment subjects, scores, dates, and the signature of the assessor are consistent | Compare the usage of two runs and observe the change in single-run usage after adjusting the response limit; then check whether the assessment form signatures and receipts are complete |
| Discrepancy list | The name, quantity, and date of the same object in the two materials are consistent, and the signatures and receipts are complete | Record the tokens of the quoted text and the number of array entries, and check `quoteMaxToken` separately; hand the discrepancy fields to the reviewer for confirmation and write back |

## Three common errors

- Symptom: The name or date of the same student does not match between the attendance records and the completion assessment form. Cause: The two materials were entered separately, and field-by-field verification was not performed using the class opening records as the baseline.
- Symptom: The class opening records have been updated, but the attendance records still use the old student roster. Cause: The versions were not synchronized, and names and quantities were not re-compared after the change.
- Symptom: The completion assessment form lacks the assessor's signature or receipt. Cause: Signatures and receipts were not included in the verification items, and only scores and dates were checked.

## How to verify the setup

Feature acceptance: Ask a question that requires a long answer, see whether the ending is complete, and confirm that the response limit did not cause the answer to break off mid-sentence.

Business test: Use a real record to find a field inconsistent with the ledger, and verify the name, quantity, date, and signature of that student in the class opening records, attendance records, and completion assessment form.

- In application settings, check the response limit switch and slider position, and confirm that the values of `maxResponse` and `maxContext` match the answer length required by the page.
- Record the tokens of the quoted text and the number of array entries, check `quoteMaxToken` separately, and do not compare the number of array entries as equal to the quote budget.
