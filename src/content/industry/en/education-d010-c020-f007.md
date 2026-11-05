---
title: Conversation Records and Traceability for Grade Entry and Credit Recognition: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c020-f007
page_type: 行业问题页
application_area: education
meta_title: Grades and Credits | Chat Records | Operations
meta_description: Grades and Credits: review chat records for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Grade Entry and Credit Recognition: Coordinate Operations and Application Handover

## What this category's data looks like

This page handles deployment, operations, and application handover materials for grade entry and credit recognition scenarios. The category materials include transcripts, deferred examination applications, and makeup examination arrangements. The transcript is the primary record, with fields including course name, credits, grade, entry date, and signature; deferred examination applications and makeup examination arrangements are supporting materials, with fields including application date, approval comments, and receipt. The material sources are academic affairs system exports and manual submissions, with an update cadence that rolls by semester or examination cycle. When entering this feature, the transcript serves as the primary record, while deferred examination applications and makeup examination arrangements serve as associated records, each taking on different roles: the transcript is used to verify credit recognition, deferred examination applications are used to verify deferred examination eligibility, and makeup examination arrangements are used to verify makeup examination time and location. In terms of field characteristics, the name, quantity, and date of the same record across different materials must remain consistent, versions must be synchronized, and signatures or receipts must not be missing.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), outputting a session message list and total record count, including role and reference information. "Handover-ready deployment status and operation records" are then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Transcript | Course name, credits, grade, entry date, and signature are consistent across the transcript, deferred examination application, and makeup examination arrangement | Check the name, quantity, and date of the same record in the two materials; check signatures and receipts; confirm version synchronization |
| Deferred examination application | Application date, approval comments, and receipt correspond between the deferred examination application and the transcript | Compare the application date with the transcript entry date; check approval comments and receipt signature; confirm version consistency |
| Makeup examination arrangement | Makeup examination time, location, and course information match those in the transcript and deferred examination application | Check the course name and quantity in the makeup examination arrangement and transcript; check dates and signatures; confirm version synchronization |
| Conversation record interface | Paginate and pull by application and session dimension, returning a session message list and total record count | Check that `chatId` matches the actual session; check pagination parameters and total; open a record to check role, reference, and elapsed time fields |

## Three common errors

- Symptom: The course name, quantity, and date of the same record do not match between the transcript and the deferred examination application. Cause: The two materials were entered separately, no cross-check was performed, and versions were not synchronized.
- Symptom: The makeup examination arrangement lacks a signature or receipt, making it impossible to check the handover form item by item. Cause: The approval process was not closed-loop, and the materials were not returned.
- Symptom: The interface returns empty but sessions exist in the UI, or only the first page is retrieved. Cause: The application and session identifiers do not match, or the pagination parameters were not set correctly.

## How to verify the setup

This feature's acceptance: paginate through all records by total count, sample one record to check role, reference information, and time; check whether `_id`, `dataId` and `value` are queryable; confirm response `code` of 200 is consistent with total.

Business test: check once item by item against the handover form to see which record is missing.

- Check the application and session identifiers: inspect the source of `chatId` in the request parameters to ensure it matches the actual application and actual session.
- Pull two pages in a row and compare the total and offset: confirm the record count matches total, to avoid retrieving only the first page.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
