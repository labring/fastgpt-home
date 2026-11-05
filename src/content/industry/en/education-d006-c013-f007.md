---
title: Conversation Records and Traceability for School Teacher Training Credits: Track Progress and Check Statistics
slug: /en/industry/education-d006-c013-f007
page_type: 行业问题页
application_area: education
meta_title: Teacher Credits | Chat Records | Progress
meta_description: Teacher Credits: review chat records for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for School Teacher Training Credits: Track Progress and Check Statistics

## What this category's data looks like

This page addresses progress records and statistical reconciliation in credit management for primary and secondary school teacher training. The materials come from three types: training notices, credit recognition forms, and attendance rosters. Training notices provide the course name, start date, and required class hours, and are the starting point of the progress table; credit recognition forms carry the teacher's name, credit amount, recognition date, and signature, and are the core basis for the statistical criteria; attendance rosters list the actual participants and sign-in receipts, and are used to check whether records are complete. The three types of materials are updated weekly or monthly, and their field characteristics include name, course name, date, quantity, signature, and receipt status. When the materials enter the conversation record interface, each plays a different role: notices are used to establish the course and time baseline, recognition forms are used to register credits and statistics, and rosters are used to verify participation and receipts. The criteria description is written in the table header, and exceptions are explained in the remarks, ensuring that the number of records and the statistical count match up.

## Configuration and implementation checks

This step is performed by the conversation record interface (by application and session dimension), which outputs the session message list and the total number of records, including role and reference information. The "progress table and statistical criteria description" is then completed manually or by an external system. The message list is not a version ledger of business materials; it serves only as conversation evidence for registration and review.

| Object | Check | Verification action |
| --- | --- | --- |
| Training notice | Whether the course name, start date, and required class hours are consistent with the credit recognition form | Check the course name and date in the notice, and compare them with the criteria in the header of the recognition form |
| Credit recognition form | Whether the teacher's name, credit amount, recognition date, and signature are complete | Check signatures and receipts one by one, and confirm that the number of records and the statistical count match up |
| Attendance roster | Whether the participants and sign-in receipts are consistent with the roster in the recognition form | Compare the roster count and dates, and mark exceptions with missing signatures or receipts |
| Conversation record interface | Paginate by application and session dimension, and the total number of records matches the status code | Use `chatId` to locate the session, retrieve all pages, and then check `dataId` and `value` |

## Three common errors

- Phenomenon: The course name, quantity, or date of the same record does not match between the training notice and the credit recognition form. Cause: The two materials are registered separately and are not checked against a unified criterion, resulting in deviations in the statistical count.
- Phenomenon: The attendance roster has been updated, but the credit recognition form still uses the old version, so the number of records and the statistical count are inconsistent. Cause: Versions are not synchronized, the update rhythms differ, and there is no unified checkpoint.
- Phenomenon: The credit recognition form lacks a signature or receipt, and there are people on the roster but no confirmation record. Cause: Signatures were not fully collected during registration, receipts were not archived, and exceptions were not clearly written.

## How to verify the setup

Acceptance of this feature: paginate through all records by the total number of records total, sample one record to check the role, reference information, and time, and confirm response `code` of 200 and the list order.

Business test: use one week of records to check the totals, see whether the criteria and exceptions are clearly written, and whether the number of records and the statistical count match up.

- Use `chatId` to locate the session, pull two consecutive pages by offset, and compare the total number of records with the number of list entries.
- Open one record, check `dataId` and `value`, and confirm that the role, reference, and elapsed-time fields are complete.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
