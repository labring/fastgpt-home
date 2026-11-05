---
title: Conversation Records and Traceability for Graduate Admissions Interviews and Selection: Track Progress and Check Statistics
slug: /en/industry/education-d006-c024-f007
page_type: 行业问题页
application_area: education
meta_title: Graduate Admissions | Chat Records | Progress
meta_description: Graduate Admissions: review chat records for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Graduate Admissions Interviews and Selection: Track Progress and Check Statistics

## What this category's data looks like

This page addresses progress records and statistical verification for graduate admissions re-examination and admission. The materials come from three categories: re-examination plans, candidate score sheets, and adjustment lists. The re-examination plan provides process nodes and date basis; the candidate score sheet provides score fields and sorting criteria; the adjustment list provides supplementary records and signed receipts. The three categories of materials enter in batches according to the admissions cycle: the plan is updated before the re-examination, scores are summarized after the re-examination, and the list is supplemented during the adjustment stage. Field characteristics include candidate name, candidate number, major, date, score, signature column, and version number. When the materials enter the conversation logs and auditing function, the re-examination plan serves as the source of criteria, the candidate score sheet serves as the main record body, and the adjustment list serves as exceptions and supplements. The three must be aligned item by item in the progress table and the statistical criteria description.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), outputting a session message list and total record count, including role and reference information. The "progress table and statistical criteria description" is then completed manually or by an external system. The interface only retrieves session evidence and does not write to business ledgers.

| Object | Check | Verification action |
| --- | --- | --- |
| Re-examination plan | The process nodes, dates, and signature columns in the plan must be aligned item by item with the score sheet and adjustment list; the version number and effective date must not be missing | Pull records by application and session dimension, verify that `chatId` matches the actual session, and check whether the plan dates and signature columns are written into the progress table header |
| Candidate score sheet | The names, quantities, and dates of score fields, candidate numbers, and dates in the score sheet and adjustment list must be consistent; missing signatures or receipts must be marked as exceptions | Page through to retrieve all records, use the total record count total and response `code` of 200 to verify the number of entries, and sample one entry to verify the role field and reference information |
| Adjustment list | The supplementary records in the adjustment list must be synchronized with the score sheet and plan version; the name and quantity of the same record must not mismatch | Verify the `dataId` and `value` fields, confirm that reference and elapsed time information is complete, and write exception items into the statistical criteria description |

## Three common errors

- Symptom: The name, quantity, or date of the same candidate in the score sheet and adjustment list do not match. Cause: The two materials are registered separately and are not verified against the same criteria.
- Symptom: The re-examination plan version is not synchronized, and the progress table continues to use old dates. Cause: After the plan is updated, it is not written back to the table header, and the version number is missing.
- Symptom: The adjustment list lacks signatures or receipts, but the statistical count is still included in the total. Cause: Exception items are not separately marked in the criteria description.

## How to verify the setup

This function's acceptance: page through to retrieve all records by total record count total, sample one entry to verify role, reference information, and time, and confirm that response `code` of 200 and the `_id`, `dataId` and `value` fields are queryable.

Business test: use one week of records to verify the total, and check whether the criteria and exceptions are clearly written.

- Pull two consecutive pages and compare the total and offset to confirm that the number of records matches the total; exported records retain reference and elapsed time fields.
- Submit the progress table and statistical criteria description in the weekly or monthly report, marking exception items and missing signatures or receipts.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
