---
title: Conversation Records and Traceability for Vocational School Student Internships: Track Progress and Check Statistics
slug: /en/industry/education-d006-c030-f007
page_type: 行业问题页
application_area: education
meta_title: Student Internships | Chat Records | Progress
meta_description: Student Internships: review chat records for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Vocational School Student Internships: Track Progress and Check Statistics

## What this category's data looks like

Internship management for vocational school students involves three types of materials: internship agreements, internship plans, and internship logs. Sources are school academic affairs, internship units, and supervising teachers, with updates collected weekly or monthly. Internship agreements record the unit, position, term, and signature; internship plans record batches, rotations, and dates; internship logs record daily tasks, duration, and receipts. When the materials enter the conversation logs and auditing feature, each is carried as sessions and messages: agreements and plans serve as background references, while logs serve as item-by-item records, pulled in pages by the conversation records interface along the application and session dimensions, outputting a session message list and total record count, including role and reference information. Field characteristics center on dates, names, quantities, signatures, and receipts, and the statistical criteria must be written into the table header.

## Configuration and implementation checks

This part is executed by the conversation records interface (along the application and session dimensions), outputting a session message list and total record count, including role and reference information. The progress table and statistical criteria description are then completed manually or by an external system; the interface itself does not write business ledgers.

| Object | Check | Verification action |
| --- | --- | --- |
| Internship agreement | Unit name, position, term, and signature are consistent between the agreement and the log | Pull item by item by session, check the agreement fields against the log references, and verify whether signatures and receipts are complete |
| Internship plan | Batch, rotation, and date can be matched between the two materials | Use `chatId` to locate the session, extract a single item by `dataId`, and check dates and quantities |
| Internship log | Daily tasks, duration, and receipts are consistent with the statistical criteria table header | Page through to retrieve all records, check role alternation and reference information, and use `value` to view a single item's details |
| Conversation records interface | The total record count matches the number of paged items, and the status code is 200 | Pull two pages consecutively and compare total with the offset, confirming the criteria for total record count and message count |

## Three common errors

- Symptom: the name, quantity, and date of the same record do not match between the agreement and the log. Cause: the two materials are registered separately and not checked against the same criteria.
- Symptom: the plan version is not synchronized, and the old rotation dates remain in the log. Cause: the materials were not written back after updating, and the version identifier is missing.
- Symptom: the log lacks a signature or receipt, but the statistics still include it in the total. Cause: exceptions are not stated in the table header and are not listed separately during verification.

## How to verify the setup

Acceptance of this feature: page through to retrieve all records by total record count, extract one item to check the role, reference information, and time, and confirm that response `code` of 200 is consistent with total.

Business test: use one week of records to check the total, and see whether the criteria and exceptions are clearly stated.

- Pull page by page by application and session identifier, compare total with the number of items already retrieved, and confirm there are no missing pages.
- Extract a single record to check the role, reference, and elapsed-time fields, and register the number of reference items and the reference text tokens separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
