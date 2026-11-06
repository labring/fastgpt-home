---
title: Conversation Records and Traceability for School Exam Question Setting and Grading: Track Progress and Check Statistics
slug: /en/industry/education-d006-c011-f007
page_type: 行业问题页
application_area: education
meta_title: School Exams | Chat Records | Progress
meta_description: School Exams: review chat records for progress tracking. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for School Exam Question Setting and Grading: Track Progress and Check Statistics

## What this category's data looks like

This page focuses on progress records and statistical verification in the scenario of exam question setting and grading in primary and secondary schools. The source materials are three types of paper or electronic documents: the two-way specification table for question setting, the exam paper, and the grading rubric, summarized weekly or monthly. The two-way specification table carries the distribution of knowledge points and question types, the exam paper carries the questions and scores, and the grading rubric carries the scoring points and deduction basis. When these three types of materials enter the conversation log and auditing function, each has a different role: the two-way specification table provides the basis for question setting and structural fields, the exam paper provides question numbers, scores, dates, and signature fields, and the grading rubric provides scoring points and receipt information. Field characteristics include material name, quantity, date, signature or receipt, and must be checked item by item against the session message list returned by the conversation record interface to ensure the total number of records matches the statistical count.

## Configuration and implementation checks

This step is performed by the conversation record interface (by application and session dimension), which outputs the session message list and the total number of records, including role and reference information. The "progress table and statistical scope description" is then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Two-way specification table for question setting | Fields match the question numbers and scores on the exam paper, and dates and signatures are complete | Use `chatId` to pull the session message list, check whether the question numbers in the specification table match those on the exam paper, and check the signature fields and dates |
| Exam paper | The name, quantity, and date of the same record are consistent between the exam paper and the grading rubric | Use `dataId` to locate a single record, compare the question numbers, scores, and dates between the exam paper and the grading rubric, and confirm version synchronization |
| Grading rubric | Scoring points and receipt information are complete, with no missing signatures or receipts | Page through to retrieve all records, check the reference information in `value` against the grading rubric receipt, and confirm that the total number of records total matches the statistical count |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the two-way specification table and the exam paper. Cause: The two materials are registered separately, not checked against the same session identifier, and versions are not synchronized.
- Symptom: The grading rubric lacks signatures or receipts, and the statistical count cannot be aligned with the total number of records. Cause: The receipt step is not included in the progress table, and exception handling is not specified in the table header.
- Symptom: The interface returns empty but there are sessions in the interface, or only the first page is retrieved. Cause: The pagination parameter offset is not pulled continuously, and the total number of records is confused with the number of messages.

## How to verify the setup

Acceptance of this function: Page through to retrieve all records according to the total number of records, and sample one record to check the role, reference information, and time; use the message identifiers and content fields `_id`, `dataId` and `value` to locate records, and confirm that response `code` of 200 is consistent with the total number of records total.

Business test: Use one week of records to verify the totals, and see whether the scope and exceptions are clearly stated; record the number of references separately by array length, verify the tokens of the reference text separately, and do not compare them for equality with the reference content budget.

- Pull conversation records by application and session dimension in pages, pull two consecutive pages to compare the total number of records and the offset, and confirm that the role field appears alternately.
- Open a single record to check the reference and duration fields, compare the total number of records with the statistical count in the progress table item by item, and write the scope and exceptions into the table header.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
