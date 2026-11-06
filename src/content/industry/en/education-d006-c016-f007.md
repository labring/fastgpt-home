---
title: Conversation Records and Traceability for School Safety Inspections and Incident Reporting: Track Progress and Check Statistics
slug: /en/industry/education-d006-c016-f007
page_type: 行业问题页
application_area: education
meta_title: Campus Safety | Chat Records | Progress
meta_description: Campus Safety: review chat records for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for School Safety Inspections and Incident Reporting: Track Progress and Check Statistics

## What this category's data looks like

This page addresses the school safety hazard inspection and campus incident reporting scenario. The materials include three categories: safety inspection checklists, hazard rectification ledgers, and emergency incident reports. Safety inspection checklists are recorded item by item by area and item, with inspection dates and inspector signatures; hazard rectification ledgers are registered by hazard entry, including discovery date, rectification deadline, responsible person, and review signature; emergency incident reports are filed separately by incident, including occurrence time, personnel involved, handling process, and reporting receipt. The three material categories update at different cadences: safety inspection checklists are weekly or per inspection, rectification ledgers roll forward with rectification progress, and incident reports are filed immediately after an incident occurs. When the materials enter the conversation logs and audit feature, each plays a different role: safety inspection checklists provide periodic inspection records, rectification ledgers provide process evidence for closed-loop tracking, and incident reports provide a complete narrative of a single emergency. Conversation records are pulled in pages by application and session dimension, providing session evidence for subsequent registration and review.

## Configuration and implementation checks

This step is performed by the conversation records interface (by application and session dimension), which outputs a session message list and the total record count, including role and reference information. The "progress table and statistical scope description" is then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Safety inspection checklist | Fields, dates, and signatures must match the rectification ledger and incident reports; the name and quantity of the same inspection item must be consistent across the two materials | Pull in pages by application and session dimension, verify that `chatId` matches the actual session, and sample one record to check role and reference information |
| Hazard rectification ledger | The discovery date, rectification deadline, and signature receipt of rectification entries must be consistent between the ledger and the safety inspection checklist, with versions in sync | Verify the order of the two role types, question and answer, in the returned list, and confirm that `dataId` corresponds to a single record |
| Emergency incident report | The incident name, number of people involved, and occurrence date must match across the three materials, and the reporting receipt and signatures must be complete | Open one record to verify the reference and elapsed-time fields, and use `value` to view the details of a single record |
| Session message list and total record count | The number of records must match the total, and response `code` of 200 must be consistent with the total record count total | Pull two consecutive pages and compare the total and offset, and confirm that the total record count is the number of message records and is not conflated with the number of sessions |

## Three common errors

- Symptom: the name, quantity, and date of the same hazard do not match between the safety inspection checklist and the rectification ledger. Cause: the two materials are registered separately, without verifying fields and dates against a unified scope.
- Symptom: the rectification ledger version is not in sync, and review signatures and receipts are missing. Cause: the materials update at different cadences, and manual registration and external system exports are not aligned.
- Symptom: the interface returns empty but sessions exist in the UI, or only the first page is retrieved. Cause: pagination parameters and offsets are not pulled continuously, and the total record count is not distinguished from the number of messages.

## How to verify the setup

Feature acceptance: page through by total record count to retrieve everything, sample one record to verify role, reference information, and time, confirm that response `code` of 200 is consistent with the total record count total, and verify the message identifiers and content fields `_id`, `dataId` and `value`.

Business test: use one week of records to verify the totals, check whether the scope and exceptions are clearly stated, and confirm that the record count matches the statistical count and that the scope is written in the header.

- In the request parameters, verify the source of the application and session identifiers, and confirm that they match the actual application and actual session.
- Pull two consecutive pages and compare the total and offset, confirm that the number of records matches the total, and that the total record count is the number of message records.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
