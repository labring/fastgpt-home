---
title: Conversation Records and Traceability for Modern Apprenticeships and Employer-Sponsored Classes: Track Progress and Check Statistics
slug: /en/industry/education-d006-c031-f007
page_type: 行业问题页
application_area: education
meta_title: Apprenticeships | Chat Records | Progress
meta_description: Apprenticeships: review chat records for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Modern Apprenticeships and Employer-Sponsored Classes: Track Progress and Check Statistics

## What this category's data looks like

This page focuses on progress records and statistical verification in modern apprenticeship and order class management. The source materials include three types: school-enterprise cooperation agreements, order class training plans, and master-apprentice records. School-enterprise cooperation agreements provide the cooperation period, position, and headcount agreements; order class training plans provide course modules, rotation arrangements, and assessment milestones; master-apprentice records provide apprenticeship dates, master signatures, and apprentice receipts. The three types of materials are updated weekly or monthly, and their field characteristics are concentrated in four categories: name, quantity, date, and signature. When entering the conversation logs and auditing function, the school-enterprise cooperation agreement and the order class training plan serve as the source of definitions, and the master-apprentice records serve as item-by-item progress evidence. Together, the three support the registration and review of the progress table and the statistical definition statement.

## Configuration and implementation checks

This step is performed by the conversation record interface (by application and session dimension), which outputs the session message list and the total number of records, including role and reference information. The "progress table and statistical definition statement" is then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| School-enterprise cooperation agreement | Whether the name, quantity, date, and signature are consistent with the order class training plan | Check the position names, headcounts, and start/end dates in the agreement, verify that the signature fields and receipts are complete, and then compare item by item with the training plan |
| Order class training plan | Whether the course modules, rotation milestones, and assessment dates align with the master-apprentice records | Extract milestones from the training plan weekly or monthly, compare them item by item with the dates and quantities in the master-apprentice records, and mark items missing signatures |
| Master-apprentice record | Whether the master signature, apprentice receipt, and date in a single record are complete | Open one record to check the signature and receipt fields, confirm that the date is consistent with the training plan milestone, and register missing items separately |
| Conversation record interface | Whether the total number of records is consistent with the number of records after paging through all of them | Page through by `chatId`, check `dataId` and `value`, and confirm that role alternation and reference information are complete |

## Three common errors

- Phenomenon: The name and quantity in the same master-apprentice record do not match between the training plan and the agreement. Cause: The two materials are updated on different schedules, and versions were not synchronized.
- Phenomenon: The milestone dates in the order class training plan are inconsistent with the dates in the master-apprentice records. Cause: After a rotation adjustment, only one side was changed, and receipt confirmation is missing.
- Phenomenon: The total number of records does not match the number of records after paging through all of them. Cause: Only the first page was retrieved, and the offset and total number of records were not checked.

## How to verify the setup

Acceptance for this function: page through all records according to the total number of records, sample one record to check the role, reference information, and time, and confirm `_id`, `dataId` and `value`, and response `code` of 200.

Business test: use one week of records to verify the totals, and see whether the definitions and exceptions are clearly stated.

- Page through the session message list by `chatId`, check the total number of records and the offset, and confirm that each message has an identified role.
- Open a single record to check the reference and duration fields, and verify whether `dataId` and `value` are complete.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
