---
title: Conversation Records and Traceability for School Exam Question Setting and Grading: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c011-f007
page_type: 行业问题页
application_area: education
meta_title: School Exams | Chat Records | Versions
meta_description: School Exams: review chat records for version tracking. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for School Exam Question Setting and Grading: Maintain Document Versions and Changes

## What this category's data looks like

In the scenario of exam question setting and grading in primary and secondary schools, materials fall into three categories: the question-setting two-way specification table, the exam paper, and the grading rubric. Their sources are the finalized versions from the teaching and research group and the school's approval documents, and their update cadence follows exam batches and revision notices. When these three categories of materials enter the conversation record and auditing function, each plays a different role: the two-way specification table provides the basis for knowledge point and question type distribution, the exam paper carries the question items and score structure, and the grading rubric specifies the scoring points and deduction criteria. Field characteristics center on names, quantities, dates, and signatures: the specification table contains knowledge point numbers and question type proportions, the exam paper contains question numbers and scores, and the grading rubric contains step scores and scoring basis. The version numbers, effective dates, and signature fields of the three categories of materials must correspond one by one in the ledger; any field change triggers a version update and a synchronization check of references.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), which outputs the session message list and the total record count, including role and reference information. The "version ledger and change records" are then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Conversation record interface | The total record count and status code can be verified, and the returned list distinguishes the two role types of question and answer | Pull pages by application and session identifier, verify the total record count total and response `code` of 200, confirm that `chatId` matches the actual session, and that each message has an identified role in the list |
| Question-setting two-way specification table | Knowledge point numbers, question type proportions, dates, and signatures are consistent between the specification table and the exam paper | Compare the knowledge point names, question type quantities, and effective dates between the specification table and the exam paper, check whether the signature fields and receipts are complete, and verify the reference entry corresponding to `dataId` |
| Exam paper | Question numbers, scores, dates, and signatures are consistent between the exam paper and the grading rubric | Verify question numbers and scores item by item, compare the dates and signatures between the exam paper and the grading rubric, inspect the reference and elapsed time fields of a single record, and confirm the reference information in `value` |
| Grading rubric | Scoring points, deduction criteria, version numbers, and signatures are consistent between the rubric and the ledger | Verify the scoring points and deduction criteria, check whether the rubric version number and effective date are synchronized, and confirm that the reference count and reference text tokens are recorded separately |

## Three common errors

- Symptom: For the same record, the knowledge point names, question type quantities, and dates do not match between the specification table and the exam paper. Cause: The two materials were revised separately and were not registered and reviewed under the same version number.
- Symptom: The grading rubric has been updated, but the exam paper and ledger remain on the old version. Cause: The version was not synchronized, the change record was not written back, and the reference entries were not updated with the version.
- Symptom: The exam paper and grading rubric lack signatures or receipts. Cause: The approval step left no trace, and the signature fields and receipt fields were not checked during registration.

## How to verify the setup

Acceptance of this function: page through using the total record count total to retrieve all records, verify response `code` of 200, sample one record to verify the role, reference information, and time, and confirm the fields corresponding to the message identifiers and content fields `_id`, `dataId` and `value`.

Business test: change one piece of content and see whether the version number and references are updated in sync.

- Pull two pages in succession and compare the total record count and offset to confirm that the number of records matches the total.
- Open one record and verify the reference and elapsed time fields to confirm that the reference count and reference text tokens are recorded separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
