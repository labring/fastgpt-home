---
title: Conversation Records and Traceability for Exam Organization and Misconduct Handling: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c039-f007
page_type: 行业问题页
application_area: education
meta_title: Exam Administration | Chat Records | Versions
meta_description: Exam Administration: review chat records for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Exam Organization and Misconduct Handling: Maintain Document Versions and Changes

## What this category's data looks like

This category contains three types of materials: exam administration manuals, examination room record sheets, and violation fact records. Exam administration manuals come from the academic affairs authority and are revised by semester or year; their fields include exam subjects, times, examination room arrangement rules, and the clauses serving as the basis for handling. Examination room record sheets come from each examination site and are filled in per session; their fields include examination room number, expected and actual number of candidates, absences and exceptional situations, and invigilator signature. Violation fact records come from invigilators or inspection personnel and are registered item by item per incident; their fields include candidate information, circumstances of the violation, evidence list, date, and signature of the person concerned. When these three types of materials enter the conversation logs and audit feature, the exam administration manual is cited as the basis for rules, while examination room record sheets and violation fact records are retrieved as process evidence; the names, quantities, and dates of the same record in the two materials must be aligned item by item, and after a version change the old version must still be traceable while citations are updated in sync.

## Configuration and implementation checks

This step is performed by the conversation record interface (by application and session dimension), which outputs the session message list and the total number of records, including role and citation information. The "version ledger and change records" is then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Exam administration manual | Version number and effective date are registered item by item, the current version is unique, and old versions are traceable; cited clauses are consistent with the body text | Pull records by application and session identifier, and check whether the cited text and the manual clauses are in sync |
| Examination room record sheet | Examination room number, expected and actual number of candidates, absences and exceptional situations, and invigilator signature are complete, and the date corresponds to the session | Page through to retrieve all records, sample one record to check the role field and citation information, and compare it against the record sheet fields |
| Violation fact record | Candidate information, circumstances of the violation, evidence list, date, and signature of the person concerned are complete, and the names, quantities, and dates match those in the examination room record sheet | Open a single record to check the citation and elapsed-time fields, and confirm that `dataId` and `value` can be located |
| Conversation record interface output | The total number of records total matches response `code` of 200, and the two role types, question and answer, appear alternately | Pull two consecutive pages and compare the offset and total, and confirm that the number of citations and the citation text tokens are recorded separately |

## Three common errors

- Symptom: the names, quantities, and dates of the same violation incident do not match between the examination room record sheet and the violation fact record. Cause: the two materials are registered separately, without field-level comparison and receipt confirmation.
- Symptom: after the exam administration manual is revised, the old version is still cited, and the current version is not unique. Cause: the version number and effective date are not updated in sync, and cited clauses do not switch with the version.
- Symptom: the examination room record sheet lacks an invigilator signature or the violation fact record lacks a receipt. Cause: the registration step does not validate the signature and receipt fields, and completeness is not rechecked at export time.

## How to verify the setup

Feature acceptance: page through by the total number of records total to retrieve all records, sample one record to check the role, citation information, and time, and confirm that response `code` of 200 and `chatId` and `value` can be located.

Business test: change one piece of content and see whether the version number and citations are updated in sync.

- Pull records by application and session identifier, pull two consecutive pages and compare the offset and total, and confirm that the total number of records is the number of message records.
- Sample one record to check the role field and citation field, and confirm that the number of citations is the array length and that the citation text tokens are recorded separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
