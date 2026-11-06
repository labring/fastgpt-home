---
title: Conversation Records and Traceability for School Moral Education and Class Teacher Work: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c014-f007
page_type: 行业问题页
application_area: education
meta_title: Pastoral Education | Chat Records | Versions
meta_description: Pastoral Education: review chat records for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for School Moral Education and Class Teacher Work: Maintain Document Versions and Changes

## What this category's data looks like

This page addresses school moral education and homeroom teacher work scenarios, covering three types of materials: themed class meeting plans, student comprehensive quality records, and home visit records. These materials are usually drafted by the homeroom teacher or the moral education office, reviewed at two levels by the grade group and the moral education office, and then archived. The update cadence is per semester, and temporary revisions are required at nodes such as awards, inspections, or student transfers. Field characteristics center on three types: dates, quantities, and signatures. Class meeting plans include the meeting date, number of activity items, and homeroom teacher signature; comprehensive quality records include the evaluation date, number of awards or activities, and student and parent signatures; home visit records include the home visit date, number of visits received, and teacher and parent signatures. When the materials enter the conversation log and auditing feature, each has a different role: class meeting plans serve as a reference source generated or revised in the conversation, comprehensive quality records serve as evidence materials that need to be compared with the conversation content, and home visit records serve as original vouchers with signed receipts. The conversation record interface is only responsible for pulling messages by application and session dimension; it does not handle the registration and version determination of business ledgers.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), which outputs a session message list and the total record count, including role and reference information. The "version ledger and change records" are then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Themed class meeting plan | The name, number of items, and meeting date of the same plan do not match across two materials; the current version is unique and the old version is traceable | Pull session messages by `chatId` and check whether the plan name and date fields match the ledger; after paging through all records, compare the total record count total with response `code` of 200 |
| Student comprehensive quality record | The number of awards or activities and the evaluation date of the same record do not match across two materials; the student or parent signature is missing | Sample one record and check the role, reference information, and time; use `dataId` to locate a single message and check the number of reference items and the reference text tokens separately |
| Home visit record | The number of visits received and the home visit date of the same home visit do not match across two materials; the teacher or parent signature and receipt are missing | View the details of a single record by `value` and check the home visit date and number of visits; pull two pages in a row and compare the offset with the total record count total |
| Session message list | The two role types, question and answer, appear alternately, and a single record carries reference and elapsed time | Open one record and check the reference and elapsed time fields; confirm that the number of messages and the total record count total are not the same quantity |

## Three common errors

- Symptom: The name, number of items, and meeting date of the same themed class meeting plan do not match across two materials. Cause: The version was not synchronized, the old version is still being referenced, and change records were not made according to the requirement that the current version be unique and the old version traceable.
- Symptom: Student comprehensive quality records lack a student or parent signature, and home visit records lack a teacher signature and receipt. Cause: Signatures and receipts were not included in the material archiving fields, and the review step only looked at content, not the signature column.
- Symptom: The interface returns empty but there are sessions in the UI, or only the first page is retrieved, and the exported records lack references. Cause: The sources of the application and session identifiers are inconsistent, and the pagination parameters were not used to pull two pages in a row and check the total record count and advance the offset by the number of records retrieved.

## How to verify the setup

Acceptance of this feature: page through all records by the total record count total, sample one record and check the role, reference information, and time; confirm response `code` of 200, and use `_id`, `dataId` and `value` to locate the session, single message, and details.

Business test: change one piece of content and see whether the version number and reference are updated synchronously; confirm that the current version is unique, the old version is traceable, and references are synchronized.

- Pull pages by application and session dimension, pull two pages in a row and compare the offset with the total record count total, and confirm that the number of records matches the total.
- Open one record and check the role, reference, and elapsed time fields, and use `dataId` and `value` to locate a single message and details.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
