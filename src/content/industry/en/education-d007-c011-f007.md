---
title: Conversation Records and Traceability for School Exam Question Setting and Grading: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c011-f007
page_type: 行业问题页
application_area: education
meta_title: School Exams | Chat Records | Review
meta_description: School Exams: review chat records for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for School Exam Question Setting and Grading: Trace Exceptions and Review Results

## What this category's data looks like

This page addresses the scenario of exam question setting and grading in primary and secondary schools. The materials include three types: the question-setting two-way specification table, the exam paper, and the grading rubric. The specification table records assessment points, question types, and score distribution; the exam paper carries question stems and answer areas; the grading rubric provides step-by-step scoring and deduction criteria. The three types of materials usually enter in batches by exam session, with fields including name, quantity, date, version number, and signature field, and dates are marked separately at the three nodes of question setting, paper review, and grading. When entering the conversation logs and auditing function, the specification table and grading rubric serve as the verification baseline, and the exam paper serves as the object being verified. Together, the three support the tracing chain of anomaly records from question setting to grading, and are manually registered as an anomaly list and review conclusions.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), outputting the session message list and total record count, including role and citation information. The anomaly list and review conclusions are then completed manually or by an external system. The interface itself does not write business ledgers; it only provides session evidence for registration and review.

| Object | Check | Verification action |
| --- | --- | --- |
| Question-setting two-way specification table | Assessment point names, quantities, dates, and signature fields must be consistent with the exam paper | Pull session messages by `chatId`, and check whether the specification table version number and signature date fall within the same exam session |
| Exam paper | Question stem quantities and score distribution correspond item by item with the grading rubric | Page through by total record count total to retrieve all, and sample one record to check the citation information and time corresponding to `dataId` |
| Grading rubric | Scoring point names, quantities, dates, and receipts are complete | Check whether the rubric version and exam paper version are synchronized; if signatures or receipts are missing, mark as pending review |
| Conversation record interface output | Session message list and total record count are traceable | Check whether response `code` of 200 and total are consistent with the cumulative number of paged records, and use `value` to view the role and elapsed time of a single record |

## Three common errors

- Phenomenon: The name and quantity of the same anomaly record do not match between the specification table and the exam paper. Cause: The two materials were registered separately, and fields and dates were not aligned by the same exam session.
- Phenomenon: The grading rubric version was not synchronized, and the review conclusion cited scoring points from an old version. Cause: The rubric was not receipted after updating, and the version numbers of the exam paper and rubric are inconsistent.
- Phenomenon: The anomaly list lacks a signature or receipt and cannot be handed to the responsible person for handling. Cause: The reviewer did not sign in the conclusion column, and the registration step did not verify the signature field.

## How to verify the setup

This function's acceptance: Page through by total record count total to retrieve all, sample one record to check the role, citation information, and time, and confirm response `code` of 200 and that message count and session count are recorded separately.

Business test: Create an anomaly record, see whether it can be traced back to the source material, and check the names, quantities, dates, and signatures of the specification table, exam paper, and grading rubric.

- Pull conversation records by application and session identifier, pull two pages consecutively and compare total and offset, and confirm that the record count matches.
- Open a single record to check the role field, citation, and elapsed time fields, and check that the citation count and citation text tokens are recorded separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
