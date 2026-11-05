---
title: Conversation Records and Traceability for Exam Organization and Misconduct Handling: Track Progress and Check Statistics
slug: /en/industry/education-d006-c039-f007
page_type: 行业问题页
application_area: education
meta_title: Exam Administration | Chat Records | Progress
meta_description: Exam Administration: review chat records for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Exam Organization and Misconduct Handling: Track Progress and Check Statistics

## What this category's data looks like

The materials for the exam organization and violation handling category fall into three types: exam administration manuals, examination room record sheets, and violation fact records. Exam administration manuals come from the exam administration department, are updated by exam season, and their fields include exam name, date, examination room number, and invigilator signature; examination room record sheets come from invigilators, are filled out by session, and their fields include expected and actual attendance numbers, absent candidate list, description of abnormal situations, and invigilator signature; violation fact records come from patrol inspectors or invigilators, are registered by incident, and their fields include candidate number, violation behavior, evidence number, party signature, and receipt. When the materials enter the conversation logs and audit function, the exam administration manuals serve as the basis for definitions, while the examination room record sheets and violation fact records serve as item-by-item evidence sources; the three are aggregated by application and session dimensions for progress records and statistical verification.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimensions), which outputs the session message list and total record count, including role and citation information. The "progress table and statistical definition description" is then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Exam administration manual | Fields include exam name, date, examination room number, and invigilator signature, and match the corresponding fields of the examination room record sheet item by item | Check the source of the application and session identifiers in the request parameters, use `chatId` to locate the session, retrieve all pages, and compare the total record count |
| Examination room record sheet | Expected and actual attendance numbers, absent candidate list, description of abnormal situations, and invigilator signature are complete, and the date matches the exam administration manual | Pull two consecutive pages and compare the total count and offset, open one record to check the role, citation, and elapsed time fields, and record the citation count separately by array length |
| Violation fact record | Candidate number, violation behavior, evidence number, party signature, and receipt are complete, and the quantity and date match the examination room record sheet | Use `dataId` to locate a single record, check the tokens of the cited text and the citation count, and check whether the `value` field contains signature and receipt information |

## Three common errors

- Symptom: The name, quantity, or date of the same violation record does not match between the examination room record sheet and the violation fact record. Cause: The two materials are registered separately, and fields and dates are not checked against the same definition.
- Symptom: The exam administration manual has been updated to a new version, but the examination room record sheet still uses the old fields. Cause: The version was not synchronized, and the version source was not marked when the materials entered the conversation logs.
- Symptom: The violation fact record lacks the party signature or receipt. Cause: The registration step did not complete the collection of signatures and receipts, so it cannot be confirmed when the materials enter statistical verification.

## How to verify the setup

Acceptance of this function: retrieve all pages by total record count, and sample one record to check the role, citation information, and time; check that response `code` of 200 is consistent with the total record count total, record the citation count separately by array length, and do not compare cited content budgets for equality.

Business test: use one week of records to check the totals, and see whether the definitions and exceptions are clearly written; the headers of the progress table and statistical definition description must state the correspondence between the record count and the statistical count.

- Pull conversation records by application and session dimensions in pages, pull two consecutive pages to compare the offset and total record count, and confirm that the number of records matches the total count.
- Open a single record to check the role field, citation field, and elapsed time field, and check whether `dataId` and `value` contain signature and receipt information.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
