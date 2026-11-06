---
title: Conversation Records and Traceability for Grade Entry and Credit Recognition: Track Progress and Check Statistics
slug: /en/industry/education-d006-c020-f007
page_type: 行业问题页
application_area: education
meta_title: Grades and Credits | Chat Records | Progress
meta_description: Grades and Credits: review chat records for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Grade Entry and Credit Recognition: Track Progress and Check Statistics

## What this category's data looks like

Grade entry and credit recognition involves three types of materials: transcripts, deferred examination applications, and make-up examination arrangements. Transcripts are submitted by the course instructor, and their fields include course name, credits, grade, entry date, and signature; deferred examination applications are submitted by students, and their fields include course, reason for deferral, application date, and approval signature; make-up examination arrangements are compiled by academic affairs, and their fields include course, make-up examination time, location, and receipt. The three types of materials are updated by semester, with a weekly rhythm of entry, verification, and archiving. When the materials enter the conversation logs and audit feature, each assumes an evidentiary role: transcripts are used to verify the number of records and the statistical totals, deferred examination applications are used to verify dates and signatures, and make-up examination arrangements are used to verify consistency of names and quantities.

## Configuration and implementation checks

This step is performed by the conversation record interface (by application and session dimension), which outputs the session message list and the total number of records, including role and reference information. The progress table and the explanation of statistical criteria are then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Transcript | Fields, dates, and signatures are complete, and the number of records is consistent with the statistical totals | Pull pages by application and session identifier, verify `chatId` and the total number of records, and sample one record to inspect role and reference |
| Deferred examination application | The application date and approval signature match across the two materials, the transcript and the deferred examination application | Compare the course name, date, and signature in the two materials; if a signature or receipt is missing, mark it as an exception |
| Make-up examination arrangement | The make-up examination time, location, and receipt are consistent in quantity between the make-up examination arrangement and the transcript | Verify the number of courses in the make-up examination arrangement against the number of transcript records, and check whether the versions are synchronized |
| Conversation record interface | The total number of records matches the pagination parameters, and each message has an identified role | Pull two pages consecutively and compare the offset and total, and open one record to verify `dataId` and the elapsed-time field |

## Three common errors

- Symptom: The same course has mismatched names and quantities in the transcript and the make-up examination arrangement. Cause: The two materials are registered separately, and the totals were not verified under the same statistical criteria.
- Symptom: The deferred examination application is missing a signature or receipt, while the transcript has already been entered. Cause: The approval process was not completed, and the material version was not synchronized to the latest.
- Symptom: The interface returns empty but there are sessions on the interface. Cause: The sources of the application and session identifiers are inconsistent, or only the first page was retrieved without paging through to retrieve all.

## How to verify the setup

Feature acceptance: page through to retrieve all records by the total number of records, sample one record to verify role, reference information, and time, confirm that `value` matches the total, and that the status code is 200.

Business test: use one week of records to verify the totals, check whether the criteria and exceptions are clearly stated, and record the number of references separately by array length.

- Verify the sources of the application and session identifiers, confirm that they are consistent with the actual application and actual session, and then pull pages.
- Use one week of records to verify the totals, check that the criteria are written into the table header, and list exceptions separately with the signature and receipt status noted.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
