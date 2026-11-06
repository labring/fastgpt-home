---
title: Conversation Records and Traceability for Corporate Sales and Product Training: Track Progress and Check Statistics
slug: /en/industry/education-d006-c042-f007
page_type: 行业问题页
application_area: education
meta_title: Sales Training | Chat Records | Progress
meta_description: Sales Training: review chat records for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Corporate Sales and Product Training: Track Progress and Check Statistics

## What this category's data looks like

This page addresses the enterprise sales product training scenario, and the materials include three types: product manuals, script item tables, and channel training schedules. Product manuals provide product fields and version dates, script item tables provide item names and usage dates, and channel training schedules provide session numbers, participants, and signed receipts. The three types of materials are updated weekly or monthly, and their field characteristics center on names, quantities, dates, and signature columns. When entering the conversation logs and auditing feature, product manuals serve as the reference baseline for the product dimension, script item tables serve as the reference baseline for the item dimension, and channel training schedules serve as the reference baseline for the session and personnel dimensions; in progress records and statistical verification, the three respectively handle field comparison, date comparison, and signed receipt comparison.

## Configuration and implementation checks

The conversation record interface (by application and session dimension) outputs only the session message list and the total record count, including role and reference information. The progress table and statistical scope description must be handled next by humans or an external system, for registration, export, and review.

| Object | Check | Verification action |
| --- | --- | --- |
| Product manuals | Whether names, quantities, dates, and signature columns are consistent with the weekly records | Extract manual entries weekly, check names, quantities, dates, and signature columns, and record discrepancies |
| Script item tables | Whether item names, usage dates, and receipts are consistent with the weekly records | Extract items weekly, check names, usage dates, and receipts, and record discrepancies |
| Channel training schedules | Whether session numbers, participants, and signed receipts are consistent with the weekly records | Extract schedule sessions weekly, check participants and signed receipts, and record discrepancies |
| Conversation record interface | Whether the total record count matches the number of paginated entries | Page through by `chatId` to retrieve all records, check that the total record count total and response `code` of 200 are correct, and sample one record to inspect `value` and `dataId` |

## Three common errors

- Symptom: The names, quantities, and dates of the same record do not match between the product manual and the script item table. Cause: The two materials are updated separately and are not registered under the same scope.
- Symptom: The version of the channel training schedule is not synchronized, and old sessions are still in use. Cause: After the schedule is updated, it is not written back to the progress table, and the material versions are not aligned.
- Symptom: Signatures or receipts are missing, making it impossible to confirm participation during statistics. Cause: Receipts are not collected along with the sessions, and the progress table has no signature column for verification.

## How to verify the setup

Feature acceptance: Page through to retrieve all records by the total record count, sample one record to check the role, reference information, and time, confirm that `_id`, `dataId` and `value` are queryable, and that the total record count total and response `code` of 200 are normal.

Business testing: Use one week of records to verify the totals, check whether the scope and exceptions are clearly stated, and confirm that the names, quantities, dates, and signature column totals of the product manuals, script item tables, and channel training schedules are consistent.

- Export conversation records weekly, check the total record count and the number of paginated entries, register them in the progress table, and mark exceptions.
- Compare the names, quantities, dates, and signature columns of the product manuals, script item tables, and channel training schedules weekly, and write discrepancies into the weekly or monthly report.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
