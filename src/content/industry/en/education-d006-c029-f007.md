---
title: Conversation Records and Traceability for Vocational College Curriculum Planning: Track Progress and Check Statistics
slug: /en/industry/education-d006-c029-f007
page_type: 行业问题页
application_area: education
meta_title: Vocational Curricula | Chat Records | Progress
meta_description: Vocational Curricula: review chat records for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Vocational College Curriculum Planning: Track Progress and Check Statistics

## What this category's data looks like

This category's data involves three types of materials: talent cultivation programs, course standards, and job competency analysis tables. Fields include program name, course name, job name, class hours and credits, dates, and signature fields. The materials come from academic affairs offices, secondary colleges, and professional teaching and research offices, with an update rhythm of formulation at the beginning of the semester, revision during the semester, and archiving at the end of the semester. When entering the conversation logs and auditing function, the talent cultivation program serves as the main record, while course standards and job competency analysis tables serve as supporting records, each carrying names, quantities, dates, and signature status. The names, quantities, and dates of the same record across the three materials must be aligned item by item. When versions are not synchronized or signature receipts are missing, the progress table and statistical scope explanation will leave exception notes.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), outputting a session message list and total record count, including role and reference information. The "progress table and statistical scope explanation" is then completed manually or by an external system for registration, export, and review. The message list is not a version ledger of business materials; the total record count is the number of message records, which is not the same quantity as the number of sessions.

| Object | Check | Verification action |
| --- | --- | --- |
| Talent cultivation program | Program name, course name, class hours and credits, dates, and signature fields are aligned item by item across the three materials | Pull session records by `chatId`, verify the reference information in `dataId` and `value`, and compare the fields of the program and course standards |
| Course standards | Course name, quantity, dates, and signature receipts are consistent with the talent cultivation program | Page through to retrieve all records, use the total record count total and response `code` of 200 to verify the sum, and sample one record to check role and reference |
| Job competency analysis table | Job name, competency items, dates, and signatures correspond to the course standards | Verify the names, quantities, and dates of the same record across the two materials, and mark unsynchronized versions and missing signature receipts |
| Conversation record interface output | The total record count total matches the number of paginated entries, and each message has an identified role | Pull two pages consecutively to compare offset and total, and open one record to verify reference and elapsed-time fields |

## Three common errors

- Symptom: The names, quantities, and dates of the same record do not match between the talent cultivation program and the course standards. Cause: The two materials are registered separately and are not verified item by item under a unified scope.
- Symptom: The course standard version is not synchronized, and the old version's signature receipt is still attached to the progress table. Cause: Supporting materials were not updated after revision, and version comparison was not performed during archiving.
- Symptom: The interface returns empty but there are sessions on the interface, or only the first page is retrieved. Cause: The sources of the application and session identifiers are inconsistent, and the pagination offset and total record count are not verified.

## How to verify the setup

This function's acceptance: page through by the total record count total to retrieve all records, sample one record to verify role, reference information, and time, and confirm that response `code` of 200 matches the number of list entries.

Business test: use one week of records to verify the sum, check whether the scope and exceptions are clearly written, confirm that the record count matches the statistical count, and ensure the scope is written in the header.

- In the request parameters, verify the sources of the application and session identifiers, and pull two pages consecutively to compare offset and total record count total.
- Open one record to verify the reference and elapsed-time fields in `dataId` and `value`, and confirm that each message has an identified role.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
