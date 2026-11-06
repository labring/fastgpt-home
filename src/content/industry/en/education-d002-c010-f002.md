---
title: Context and Token Budgets for School Timetables and After-School Scheduling: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c010-f002
page_type: 行业问题页
application_area: education
meta_title: School Timetables | Context & Tokens | Checks
meta_description: School Timetables: review context & tokens for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Context and Token Budgets for School Timetables and After-School Scheduling: Compare Documents and Locate Differences

## What this category's data looks like

This page addresses primary and secondary school timetable and after-school service scheduling scenarios. The materials come from the academic affairs office's master timetable, teacher assignment table, after-school service project table, and signed receipts. The master timetable is published at the start of the semester and fine-tuned mid-term, with fields including class, day of week, period, course name, assigned teacher, and venue; the teacher assignment table is updated weekly, with fields including teacher, class, subject, and weekly class hours; the after-school service project table is adjusted monthly, with fields including project name, date, number of participants, responsible teacher, and signature or receipt. When entering this function, the master timetable serves as the baseline material, the teacher assignment table and after-school service project table serve as comparison materials, and receipts and signed documents serve as supporting materials; the three materials each play different roles and jointly support the determination goal that the same object's name, quantity, and date are consistent across the two materials, and output a discrepancy list for the reviewer to confirm and write back.

## Configuration and implementation checks

This part is executed by application settings (response limit, etc.), outputting the single-response length and the context range that can be accommodated. The "discrepancy list" is then completed by the model, and entry and authorization are handled by the publishing service and file permissions.

| Object | Check | Verification action |
| --- | --- | --- |
| Response limit | Matches the response length required by the page | Check the switch and slider position in application settings, and confirm that the single-response length is commensurate with the required discrepancy list length |
| Truncation behavior | Longer responses end completely | Ask a question that requires a long response and look at the ending, observing whether the discrepancy list breaks off mid-sentence |
| Master timetable and teacher assignment table | The same record's name, quantity, and date are consistent across the two materials | Compare class, course name, assigned teacher, and weekly class hours item by item, and mark fields whose names or quantities do not match |
| After-school service project table and receipts | The same record's name, quantity, and date are consistent across the two materials | Check project name, date, number of participants, and signature or receipt, and record entries missing a signature or receipt |

## Three common errors

- Symptom: The same record's name, quantity, and date do not match across the two materials. Cause: The master timetable and teacher assignment table are maintained separately, without field-by-field comparison.
- Symptom: Versions are not synchronized, and an old version of the after-school service project table is still referenced. Cause: Update rhythms differ, and mid-term fine-tuning was not written back to the comparison materials.
- Symptom: Signatures or receipts are missing, and the discrepancy list cannot be closed. Cause: Supporting materials were not archived together with the project table, leaving the reviewer unable to confirm.

## How to verify the setup

This function's acceptance: ask a question that requires a long response, check whether the ending is complete, and verify the single-response length and the context range that can be accommodated; when citations are involved, check the tokens of the quoted text, record the array item count separately, and do not compare `quoteMaxToken` with the item count for equality; `maxContext`, `maxResponse`, and `quoteMaxToken` respectively correspond to the context range, single-response length, and quoted content budget.

Business test: use a real record to find fields inconsistent with the ledger, for example a class's course name or weekly class hours differing across the two materials.

- Check the response limit switch and slider position in application settings, and confirm they match the response length required by the page.
- Ask a question that requires a long response and look at the ending, confirm that longer responses end completely, and compare usage across two runs.
