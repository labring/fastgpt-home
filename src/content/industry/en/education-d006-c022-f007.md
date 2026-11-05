---
title: Conversation Records and Traceability for Student Awards, Financial Aid and Hardship Assessment: Track Progress and Check Statistics
slug: /en/industry/education-d006-c022-f007
page_type: 行业问题页
application_area: education
meta_title: Student Financial Aid | Chat Records | Progress
meta_description: Student Financial Aid: review chat records for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Student Awards, Financial Aid and Hardship Assessment: Track Progress and Check Statistics

## What this category's data looks like

This page deals with student awards, grants, loans, and hardship determination materials: family financial hardship determination forms, scholarship and grant application forms, and loan receipts. The sources are paper or electronic documents submitted by counselors and departments, updated centrally on a weekly basis, with fields including name, student ID, hardship level, requested amount, receipt number, and signature date. The three types of materials play different roles when they enter the conversation record feature: the determination form provides hardship status and determination year, the application form provides the award and amount basis, and the loan receipt provides proof of disbursement and signature. Materials must be aligned item by item by the name, quantity, and date of the same record; after a version change, old documents become void, and records missing a signature or receipt do not enter the statistics.

## Configuration and implementation checks

This step is performed by the conversation record interface (by application and session dimension), which outputs the session message list and the total record count, including role and reference information. The "progress table and statistical basis description" is then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Family financial hardship determination form | Fields, date, and signature are complete; hardship level and determination year are consistent | Check name, student ID, level, and signature date, and compare with the application form |
| Scholarship and grant application form | Award name, amount, and date match the determination form | Compare name and quantity by the same record, and check whether versions are synchronized |
| Loan receipt | Receipt number, disbursement date, and signature are not missing | Open one record to check the receipt number and signature, and list missing documents separately |
| Conversation record interface | Total record count matches the number of paginated entries; role and reference fields are visible | Use `chatId` to page through and retrieve all records, and sample one to inspect `dataId` and `value` |

## Three common errors

- Symptom: the name, amount, and date of the same record do not match between the determination form and the application form. Cause: the two materials are registered separately, and fields are not aligned by the same record.
- Symptom: an old version of the determination form and a new application form circulate at the same time. Cause: versions are not synchronized, and void documents are not marked with their replacement relationship.
- Symptom: a loan receipt is missing a number or signature. Cause: the receipt is registered before being collected, and the signature field is left blank when entering the statistics.

## How to verify the setup

Feature acceptance: page through and retrieve all records by the total record count total, sample one to check the role, reference information, and time, and compare the number of paginated entries under response `code` of 200.

Business test: use one week of records to check the totals, and see whether the basis and exceptions are clearly stated.

- Pull records by application and session identifier, pull two consecutive pages and compare the total count and offset, and confirm that the number of records is consistent
- Open a single record to check the role field, references, and elapsed-time field, and confirm that the number of references and text tokens are recorded separately

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
