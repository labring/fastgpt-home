---
title: Conversation Records and Traceability for Grade Entry and Credit Recognition: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c020-f007
page_type: 行业问题页
application_area: education
meta_title: Grades and Credits | Chat Records | Review
meta_description: Grades and Credits: review chat records for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Grade Entry and Credit Recognition: Trace Exceptions and Review Results

## What this category's data looks like

Grade entry and credit recognition involve three types of materials: transcripts, deferred examination applications, and make-up examination arrangements. Transcripts carry the course name, credits, grade, and instructor's signature, and serve as the basis for credit recognition; deferred examination applications record the application date, reason, and approval signature, determining whether the student enters the make-up examination process; make-up examination arrangements state the make-up examination time, location, and invigilator's signature, and are the prerequisite evidence for grade updates. The three types of materials enter the system in semester batches: transcripts are entered centrally at the end of the term, while deferred examination and make-up examination materials are added in batches along with process nodes. Field characteristics are concentrated in four places: name, quantity, date, and signature. If the name, quantity, or date of the same record does not match across two materials, the version is not synchronized, or a signature or receipt is missing, an abnormality requiring traceability will be formed. When materials enter this function, the transcript serves as the main record, the deferred examination application and make-up examination arrangement serve as associated evidence, and the conversation record retains the conversational evidence from the processing procedure.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), outputting a session message list and the total number of records, including role and reference information. The "abnormality list and review conclusions" are then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Transcript | Course name, credits, grade, and instructor's signature are complete, and the date is consistent with the semester batch | Take one grade record, check the name, quantity, date, and signature, and trace back the reference information of that record in the corresponding session |
| Deferred examination application | Application date, reason, and approval signature are complete, and match the course name and quantity in the transcript | Pull two pages of conversation records consecutively to compare the total and offset, use `chatId` to locate the session, and check the field consistency between the application and the transcript |
| Make-up examination arrangement | Make-up examination time, location, and invigilator's signature are complete, and the version is synchronized with the latest transcript | Open a single record to check the role and elapsed time, use `dataId` to locate the specific message, and check whether the make-up examination arrangement is missing a signature or receipt |
| Session message list | message roles correspond to the original conversation, and the reference and elapsed time fields are readable | View a single record by `value`, confirm that the number of references is the array length, and record the tokens of the reference text separately |

## Three common errors

- Phenomenon: The name and quantity of the same course do not match between the transcript and the make-up examination arrangement. Cause: The two materials were entered at different stages, and no field-level comparison was performed.
- Phenomenon: The deferred examination application has been approved, but the transcript still shows the original grade. Cause: The version was not synchronized, and the old transcript was not withdrawn or marked.
- Phenomenon: The make-up examination arrangement is missing the invigilator's signature or receipt. Cause: The signature step was skipped during material circulation, and the receipt was not archived.

## How to verify the setup

This function's acceptance: page through to retrieve all records by total count, sample one record to check the role, reference information, and time, confirm that response `code` of 200 matches the total record count total, and use `_id`, `dataId` and `value` to check the session identifier and single record.

Business test: create an abnormal record and see whether the source material can be traced.

- Pull two pages of conversation records consecutively, compare the total and offset, and confirm that the number of records matches the total.
- Open a record, check the reference and elapsed time fields, confirm that the number of references is the array length, and record the tokens of the reference text separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
