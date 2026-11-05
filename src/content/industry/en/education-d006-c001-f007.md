---
title: Conversation Records and Traceability for Daily Kindergarten Care Management: Track Progress and Check Statistics
slug: /en/industry/education-d006-c001-f007
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Care | Chat Records | Progress
meta_description: Kindergarten Care: review chat records for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Daily Kindergarten Care Management: Track Progress and Check Statistics

## What this category's data looks like

This category's data covers three types of materials: daily life schedules, morning and afternoon health checks, and child health observation records. The daily life schedule arranges activities, water breaks, toilet times, naps, and other periods by date and segment, with fields including segment name, start and end times, and responsible person's signature; morning and afternoon health checks register each child's temperature, mouth, skin, and mental state one by one, including date, examiner, and parent receipt; child health observation records supplement observation points, handling methods, and follow-up results for abnormal events. The three types of materials update at different rhythms: the schedule is arranged weekly, morning and afternoon checks are filled in daily, and observation records are triggered by events. When the materials enter the conversation logs and auditing function, each plays a different role: the schedule provides segment names and time definitions, morning and afternoon check records provide daily headcounts and signature evidence, and observation records provide exception explanations and follow-up traces. Progress records and statistical verification need to align the names, quantities, and dates of these three types of materials to form a progress table and statistical definition notes, which then go into weekly or monthly reports.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), outputting a session message list and total record count, including role and citation information. The progress table and statistical definition notes are then completed manually or by an external system. The message list is not a version ledger of business materials; the total record count is the number of message records, which is not the same quantity as the number of sessions.

| Object | Check | Verification action |
| --- | --- | --- |
| Daily life schedule | Segment names, start and end times, and responsible person's signature must match the names and dates in the morning and afternoon check records and child health observation records | Extract one row of the schedule by date, verify whether the name and date of the same segment are consistent across the three materials, and mark missing signatures |
| Morning and afternoon check records | Daily headcounts, examiner signatures, and parent receipts must be complete, and the statistical definition must be written in the header | Use one week of morning and afternoon check records to accumulate daily, verify whether the total equals the record count in the progress table, and explain exception days separately |
| Child health observation records | Observation points, handling methods, and follow-up results must correspond to abnormal items in morning and afternoon checks, with no missing dates or signatures | Open one abnormal record, verify whether it is consistent with the same day and same person in the morning and afternoon checks, and check the receipt and signature fields |
| Conversation record interface output | The total record count total and response `code` of 200 can be verified, and role and citation information can be sampled and checked | Page through to retrieve all records by total record count, sample one record to check role, citation information, and time, and verify the message identifiers and content fields `_id`, `dataId` and `value` |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the daily life schedule and the morning and afternoon check records. Cause: The two materials are registered separately, without aligning definitions by the same date and segment.
- Symptom: The version of the child health observation record is not synchronized, and the old version is still in circulation. Cause: After modification, signatures and receipts were not written back, and the progress table references old-version data.
- Symptom: Morning and afternoon check records lack signatures or receipts, and the statistical total does not equal the record count in the progress table. Cause: When accumulating daily, exception days were not listed separately, and the definition was not written in the header.

## How to verify the setup

This function's acceptance: page through to retrieve all records by total record count total, sample one record to check role, citation information, and time, and confirm the status code is 200; verify the message identifiers and content fields `_id`, `dataId` and `value`; the citation count is the array length, and `quoteMaxToken` is the citation content budget, and the two are not compared for equality.

Business test: use one week of records to verify the total, and check whether the definition and exceptions are clearly written.

- Extract one row each from the daily life schedule, morning and afternoon check records, and child health observation records by date, and verify whether names, quantities, dates, and signatures are consistent.
- Page through to retrieve all records by total record count, sample one record to check role, citation information, and time, and verify the message identifiers and content fields `_id`, `dataId` and `value`.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
