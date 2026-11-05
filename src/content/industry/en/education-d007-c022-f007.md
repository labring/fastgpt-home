---
title: Conversation Records and Traceability for Student Awards, Financial Aid and Hardship Assessment: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c022-f007
page_type: 行业问题页
application_area: education
meta_title: Student Financial Aid | Chat Records | Review
meta_description: Student Financial Aid: review chat records for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Student Awards, Financial Aid and Hardship Assessment: Trace Exceptions and Review Results

## What this category's data looks like

This page focuses on student awards, grants, loans, and financial hardship determination materials, covering three types: the family financial hardship determination form, the scholarship/grant application form, and the loan receipt. The determination form is filled out by the student, reviewed by the class, and signed and sealed level by level, and is updated by academic year; the application form is submitted with the batch of the award/grant project, and its fields include name, student ID, amount, and date; the loan receipt is issued by the handling bank, with a number and seal. When these three types of materials enter the conversation logs and auditing function, their roles differ: the determination form and the application form are cited as the basis for the application, while the receipt is verified as proof of funds received. Field characteristics center on name, student ID, amount, date, and signature fields; versions are distinguished by academic year or batch, and the update cadence is synchronized with the review cycle. Names, quantities, and dates across materials must be consistent, and signatures and receipts must not be missing; otherwise, exception tracing is triggered.

## Configuration and implementation checks

This step is performed by the conversation record interface (by application and session dimension), which outputs the session message list and the total record count, including role and citation information. The "exception list and review conclusions" are then completed by a human or an external system. The interface only retrieves conversation evidence and does not write to business ledgers.

| Object | Check | Verification action |
| --- | --- | --- |
| Family financial hardship determination form | Name, student ID, date, and signature field match the application form item by item, and the version is synchronized by academic year | Retrieve the determination form and the application form, compare name, student ID, date, and signature, and check the version academic year |
| Scholarship/grant application form | Amount, project name, and date correspond to the receipt, and signatures are complete | Retrieve the application form and the loan receipt, and compare amount, project name, date, and signature |
| Loan receipt | Receipt number, amount, and date match the application form, and seals are complete | Retrieve the receipt and the application form, and check number, amount, date, and seals |
| Conversation records | The total record count matches pagination, each message has an identified role, and citation and elapsed-time fields are visible | Page through by `chatId` to retrieve all records, check `dataId` and `value`, and record the total record count total and response `code` of 200 |

## Three common errors

- Symptom: the name and student ID of the same student do not match between the determination form and the application form. Cause: the two materials were filled out separately, no cross-check was performed, and the versions were not synchronized.
- Symptom: the application form amount is inconsistent with the loan receipt amount and date. Cause: after the receipt was issued, the application form was not updated, the versions were not synchronized, and the review signature is missing.
- Symptom: the determination form lacks a signature or the receipt is missing, yet it still proceeds to the next step. Cause: the material collection step did not verify signatures and receipts, and the exception was not intercepted.

## How to verify the setup

Feature acceptance: page through by the total record count to retrieve all records, sample one record to check the role, citation information, and time, check `_id`, `dataId` and `value`, and confirm the total record count total and response `code` of 200.

Business test: create an exception record, see whether it can be traced back to the source material, and confirm that the exception is supported by the original record and the reviewer's signature.

- Page through by application and session identifier, compare the total record count with the offset, and confirm that only the first page was not retrieved
- Open a single record to check the role, citation, and elapsed-time fields, confirm that the citation count is the array length, and that citation text tokens are recorded separately

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
