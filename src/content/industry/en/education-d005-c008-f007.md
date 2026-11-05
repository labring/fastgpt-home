---
title: Conversation Records and Traceability for School Admissions and Enrollment Organization: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c008-f007
page_type: 行业问题页
application_area: education
meta_title: School Admissions | Chat Records | Versions
meta_description: School Admissions: review chat records for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for School Admissions and Enrollment Organization: Maintain Document Versions and Changes

## What this category's data looks like

This category's data falls into three types: admission plans, application material checklists, and admission lists. Admission plans come from approvals by the education authority and are updated by academic year; their fields include plan name, publication date, and signature and seal. Application material checklists are compiled by the admissions working group and adjusted by batch; their fields include material name, quantity, submission date, and receipt signature. Admission lists are consolidated by the review group and publicly announced by batch; their fields include student name, admission date, and signature. When these three types of materials enter the conversation record function, each plays a different role: the admission plan is cited as the policy basis, the application material checklist is invoked as the operational basis, and the admission list is checked as the result evidence. In terms of update cadence, the plan changes once per academic year, the checklist changes once per batch, and the list is publicly announced once per batch. In terms of field characteristics, dates and signatures are common checkpoints, while names and quantities are common points of inconsistency.

## Configuration and implementation checks

This step is performed by the conversation record interface (by application and session dimension), which outputs the session message list and the total record count, including role and citation information. The "version ledger and change records" are then completed manually or by an external system. The total returned by the interface is the number of message records, not the number of sessions; response `code` of 200 indicates that this paginated request succeeded.

| Object | Check | Verification action |
| --- | --- | --- |
| Admission plan | Plan name, publication date, and signature and seal are consistent across the three materials | Pull the session records by `chatId`, and verify the name and date fields of the plan citation entries |
| Application material checklist | Material name, quantity, submission date, and receipt signature match across the two checklists | Page through to retrieve all records, and compare the name and quantity of the same material in the two checklists |
| Admission list | Student name, admission date, and signature are consistent across the three lists | Open a single record, and verify the citation information in `dataId` and `value` |
| Conversation records | The total record count matches the paginated item count, and each message has an identified role | Pull two consecutive pages and compare total with the offset, confirming the order of the two role types: question and answer |

## Three common errors

- Symptom: The same student's name and date do not match between the application material checklist and the admission list. Cause: The two materials are maintained separately, with no cross-checking.
- Symptom: The admission plan has been updated, but the application material checklist still cites the old version. Cause: The version was not synchronized, and the citation was not updated when the plan changed.
- Symptom: The admission list is missing a signature or receipt. Cause: Signatures were not added promptly after the public announcement, and receipts were not archived.

## How to verify the setup

This feature's acceptance: page through to retrieve all records by the total record count total, sample one record to verify the role, citation information, and time, and confirm response `code` of 200.

Business test: change one piece of content, and see whether the version number and citation are updated in sync.

- Verify the source of the application and session identifiers, and confirm they match the actual application and actual session
- Pull two consecutive pages and compare the total record count with the offset, confirming the pagination parameters match

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
