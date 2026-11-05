---
title: Conversation Records and Traceability for School Exam Question Setting and Grading: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c011-f007
page_type: 行业问题页
application_area: education
meta_title: School Exams | Chat Records | Operations
meta_description: School Exams: review chat records for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for School Exam Question Setting and Grading: Coordinate Operations and Application Handover

## What this category's data looks like

This page addresses the scenario of exam question setting and marking in primary and secondary schools. Materials include the question-setting two-way specification table, exam papers, and marking rubrics; the sources are subject question-setting teams and school handover shifts, and the update cadence follows exam batches and version adjustments. When these materials enter the conversation logs and auditing feature, they each take on different roles: the two-way specification table provides the mapping between assessment points and question types, exam papers carry the question text and score values, and marking rubrics record scoring points and deduction bases. The fields of all three involve names, quantities, dates, and signatures, and must correspond item by item with the deployment status and operation records. Conversation logs retain session messages by application and session dimension, for manual or external systems to register, export, and review, and do not replace the version ledger of business materials.

## Configuration and implementation checks

This step is performed by the conversation record interface (by application and session dimension), which outputs a session message list and the total record count, including role and reference information. The handover-ready deployment status and operation records are then completed by manual or external systems. The number of messages and the number of sessions are not the same quantity; the total record count is the number of message records.

| Object | Check | Verification action |
| --- | --- | --- |
| Question-setting two-way specification table | Assessment point names, question counts, dates, and signatures must be consistent with the exam papers and marking rubrics | Check the assessment point names, question counts, and dates of the specification table against the exam papers, and confirm that signatures and receipts are complete; use `chatId` to locate the session and page through to retrieve all records |
| Exam papers | Question names, score values, dates, and signatures must be consistent with the specification table and marking rubrics | Compare the question numbers, score values, and dates of the exam papers against the specification table, and check the signature fields; use `dataId` to pull one record and verify the role and reference |
| Marking rubrics | Scoring point names, deduction quantities, dates, and signatures must be consistent with the exam papers and specification table | Check the scoring point names, deduction quantities, and dates of the marking rubrics against the exam papers, and confirm signatures; use `value` to open a single record and view the reference and elapsed time |
| Deployment status and operation records | Version, connection, and task records must be consistent across all three, and the total record count and response `code` of 200 can be verified | Check the version number, connection status, and task records item by item against the handover sheet, and confirm that the pagination parameters and the total record count match up |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the specification table and the exam papers. Cause: The two materials were registered by different shifts and were not reviewed item by item against the handover sheet.
- Symptom: The versions of the marking rubrics and exam papers are not synchronized, and signatures or receipts are missing. Cause: After a version update, it was not distributed in sync, and the signature fields were not checked during handover.
- Symptom: The interface returns empty but sessions exist in the UI, or only the first page is retrieved. Cause: The pagination parameters were not pulled across two pages for comparison, and the exported records lack references.

## How to verify the setup

Feature acceptance: Page through by the total record count to retrieve all records, pull one record to verify the role, reference information, and time, and confirm that response `code` of 200 and the total record count total match up.

Business testing: Check once item by item against the handover sheet, see which record is missing, and confirm that version, connection, and task records are consistent across all three.

- Use `chatId` and `dataId` to locate the session and a single record, and pull two consecutive pages to compare the total record count and offset.
- Use `value` to open one record, verify the role field, reference information, and elapsed time, and confirm that message roles correspond to the original conversation.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
