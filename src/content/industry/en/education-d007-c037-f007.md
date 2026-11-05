---
title: Conversation Records and Traceability for Vocational Training Subsidy Applications: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c037-f007
page_type: 行业问题页
application_area: education
meta_title: Training Subsidies | Chat Records | Review
meta_description: Training Subsidies: review chat records for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Vocational Training Subsidy Applications: Trace Exceptions and Review Results

## What this category's data looks like

This category's materials for vocational training subsidy claims consist mainly of training class opening filings, attendance records, and completion assessment forms. The sources are electronic files and scanned copies submitted by training institutions in batches before and after class opening, and the update cadence follows class declaration and completion milestones, typically one file per class, archived by batch. The class opening filing carries the course name, start and end dates, student roster, and institutional seal; attendance records form daily attendance details, including student name, date, and check-in status; completion assessment forms record assessment subjects, scores, and assessor signatures. When these three types of materials enter the conversation log and audit feature, each plays a different role: the filing is used to verify the class and personnel scope, attendance is used to verify attendance dates and personnel consistency, and the completion assessment form is used to verify scores and the signature closure loop. Names, quantities, dates, and signatures across materials need cross-comparison; missing signatures or receipts, or versions not synchronized, will create exception clues, and original records must be retained for traceability.

## Configuration and implementation checks

This step is performed by the conversation record interface (by application and session dimension), which outputs the session message list and total record count, including role and citation information. The "exception list and review conclusions" are then completed manually or by an external system. The interface only retrieves conversation evidence and does not write to business ledgers.

| Object | Check | Verification action |
| --- | --- | --- |
| Conversation record interface | Paginate by application and session dimension; record count matches the total | Initiate a paginated request using the application and session identifiers, pull two consecutive pages and compare the total record count and offset, and sample one record to verify role, citation information, and latency fields |
| Training class opening filing | Course name, start and end dates, student roster, and institutional seal are complete and match the attendance records and completion assessment form | Verify item by item the class name, dates, and headcount in the filing against the attendance records and completion assessment form, and check whether seals and receipts are missing |
| Attendance records | Student name, check-in date, and check-in status correspond day by day and match the filing roster | Verify the names and statuses in the attendance details by date against the class opening filing roster, and confirm the dates are continuous with no missing check-ins |
| Completion assessment form | Assessment subjects, scores, and assessor signatures are complete and correspond to the filing and attendance records | Verify the assessment form subjects and scores, check the assessor signature, compare against the filing class and attendance, and confirm versions are synchronized |

## Three common errors

- Symptom: the same student's name is written inconsistently in the class opening filing and the attendance records. Cause: the format was not unified at entry, the two materials were maintained separately, and no cross-check was performed.
- Symptom: the completion assessment form is missing the assessor signature or receipt. Cause: signed documents were not fully collected during material circulation, and signature completeness was not checked at archiving.
- Symptom: after the filing version was updated, the attendance records remained on the old version. Cause: versions were not synchronized and the revised document did not replace the original file, causing dates and headcount to mismatch.

## How to verify the setup

Feature acceptance: page through by total record count to retrieve all records, sample one record to verify role, citation information, and time; check the message identifiers and content fields `_id`, `dataId` and `value`, and confirm the total record count total matches response `code` of 200.

Business test: create an exception record and see whether it can be traced back to the source materials, verifying the names, quantities, dates, and signatures of the class opening filing, attendance records, and completion assessment form.

- Paginate by application and session identifiers, pull two consecutive pages and compare the total record count and offset, and confirm the record count is complete.
- Open a single record to verify role, citation information, and latency fields, then export it and compare item by item against the class opening filing, attendance records, and completion assessment form.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
