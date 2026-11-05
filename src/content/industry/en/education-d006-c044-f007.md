---
title: Conversation Records and Traceability for Training Provider Scheduling and Lesson Records: Track Progress and Check Statistics
slug: /en/industry/education-d006-c044-f007
page_type: 行业问题页
application_area: education
meta_title: Training Schedules | Chat Records | Progress
meta_description: Training Schedules: review chat records for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Training Provider Scheduling and Lesson Records: Track Progress and Check Statistics

## What this category's data looks like

Materials in the scheduling and class-hour deduction category for training institutions come from class schedules, class-hour deduction records, and schedule change requests, with an update cadence of weekly or monthly aggregation. Class schedules provide fields such as course, class, teacher, time slot, and classroom; class-hour deduction records provide actual attendance, deducted class hours, and signatures; schedule change requests provide the original time slot, new time slot, reason, and approval. When these three types of materials enter the conversation log and auditing feature, they play different roles: class schedules and class-hour deduction records serve as the business source documents for progress records and statistical reconciliation, while schedule change requests serve as the source of exception explanations. The conversation log interface pulls by application and session dimensions, returning a session message list and the total record count, with fields including role, reference information, and elapsed time, used to cross-check business communication traces against academic affairs materials.

## Configuration and implementation checks

This step is executed by the conversation log interface (by application and session dimensions), outputting a session message list and the total record count, including role and reference information. The progress table and statistical scope description are then completed manually or by an external system, and registration, export, and review are carried out accordingly.

| Object | Check | Verification action |
| --- | --- | --- |
| Class schedule | Fields include course, class, teacher, time slot, and classroom; dates and signatures are complete | Export the class schedule weekly, check course and time slot item by item, and inspect the signature column |
| Class-hour deduction records | The record count matches the statistical count, and the scope is written in the header | Use one week of records to check the totals, and compare the names, quantities, and dates between the class schedule and the class-hour deduction records |
| Schedule change requests | The original time slot, new time slot, reason, and approval signature are consistent | Compare schedule change requests item by item against the class schedule and class-hour deduction records, and flag any missing signature or receipt |
| Conversation log interface | The total record count matches the number of paginated entries, and role and reference information are complete | Page through by `chatId` to retrieve all records, sample one record to check `dataId` and `value`, and confirm response `code` of 200 is consistent with total |

## Three common errors

- Symptom: the names, quantities, and dates of the same record do not match between the class schedule and the class-hour deduction records. Cause: the two materials are registered by different personnel, without item-by-item comparison and unified scope.
- Symptom: a schedule change request has been approved but the class schedule has not been synchronized, and the versions are out of sync. Cause: schedule change requests and class schedule updates have different cadences, lacking a synchronization check step.
- Symptom: class-hour deduction records lack signatures or receipts, making them unconfirmable during statistics. Cause: signatures were not added promptly after registration, and signatures were not listed as a mandatory check item during review.

## How to verify the setup

Feature acceptance: page through by total record count to retrieve all records, sample one record to check role, reference information, and time, confirm response `code` of 200 is consistent with total, and check the message identifiers and content fields `_id`, `dataId` and `value`.

Business test: use one week of records to check the totals, see whether the scope and exceptions are clearly written, and compare the fields, dates, and signatures of the class schedule, class-hour deduction records, and schedule change requests item by item.

- Export the class schedule and class-hour deduction records weekly, check names, quantities, and dates item by item, and record discrepancies in the header of the scope description.
- Compare schedule change requests item by item against the class schedule and class-hour deduction records, list entries missing signatures or receipts separately, and add the missing signatures.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
