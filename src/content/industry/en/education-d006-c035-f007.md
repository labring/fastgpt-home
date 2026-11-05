---
title: Conversation Records and Traceability for Enterprise Employee Skills Assessment: Track Progress and Check Statistics
slug: /en/industry/education-d006-c035-f007
page_type: 行业问题页
application_area: education
meta_title: Employee Skills | Chat Records | Progress
meta_description: Employee Skills: review chat records for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Enterprise Employee Skills Assessment: Track Progress and Check Statistics

## What this category's data looks like

Enterprise independent skilled talent evaluation filing and implementation materials include three types: enterprise evaluation filing forms, evaluation specifications, and candidate rosters. The filing form records the evaluation entity, occupational direction, and batch; the evaluation specification records the assessment method, scoring criteria, and passing line; the roster records candidate identity, declared level, and contact information. The materials come from enterprise applications and internal approvals, are updated by batch, and often undergo version adjustments across months. When the three types of materials enter the progress records and statistical verification function, their roles differ: the filing form and evaluation specification are used to confirm the evaluation scope and statistical criteria, while the roster is used to confirm the number of candidates and the personnel list. The fields, dates, and signatures of the three must mutually corroborate with the conversation records.

## Configuration and implementation checks

This step is executed by the conversation records interface (by application and session dimension), outputting a session message list and total record count, including role and reference information. The "progress table and statistical criteria description" is then completed manually or by an external system. The interface only retrieves conversation evidence and does not write to business ledgers; the number of messages and the number of sessions are not the same quantity.

| Object | Check | Verification action |
| --- | --- | --- |
| Enterprise evaluation filing form | The evaluation batch and occupational direction in the filing form must be consistent with the assessment method, date, and signature in the evaluation specification; if names and quantities do not match, it is inconsistent | Check the batch number, occupational name, date, and signature fields of the filing form and evaluation specification, and use `chatId` to locate the corresponding conversation record |
| Evaluation specification | The statistical criteria in the specification must be consistent with the header criteria of the progress table; the passing line and scoring method should be written into the header description | Open a record to check the reference information and time, use `value` to view the content of a single record, and confirm that the criteria and exceptions are clearly stated |
| Candidate roster | The number of people in the roster must match the statistical total; the name, level, and date of the same candidate in the two materials must be consistent | Pull two pages consecutively to compare the total record count total and the offset, use `dataId` to locate a single message, and check role alternation and reference information |
| Conversation records interface | The total record count is the number of message records, not the number of sessions; the returned list distinguishes two role types: question and answer | Page through to retrieve all records according to the total record count, sample one record to check role, reference information, and time, and when the status code is 200 confirm that the list and total count are consistent |

## Three common errors

- Symptom: The name, level, or date of the same candidate does not match between the roster and the evaluation specification. Cause: The two materials are maintained separately, versions are not synchronized, and there is no unified verification step.
- Symptom: The statistical total does not match the total record count. Cause: Only the first page was retrieved, the offset and pagination parameters were not compared continuously, and the total record count was mistakenly treated as the number of sessions.
- Symptom: The filing form or evaluation specification lacks a signature or receipt. Cause: The materials were not signed back after circulation, and old signatures were not synchronized after version updates, making it impossible for records and materials to mutually verify each other.

## How to verify the setup

This function's acceptance: page through to retrieve all records according to the total record count total, sample one record to check role, reference information, and time, and confirm that the response `code` of 200 is consistent with the list.

Business test: use one week of records to check the total, see whether the criteria and exceptions are clearly stated, and check whether the record count and statistical count match.

- Use `chatId` and `dataId` to locate a single record, and check the role, reference information, and elapsed time fields.
- Pull two pages consecutively to compare total and offset, confirm that the number of records matches the total count, and then register the progress table and statistical criteria description.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
