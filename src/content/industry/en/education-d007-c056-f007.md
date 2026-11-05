---
title: Conversation Records and Traceability for Teacher Qualification Exams and Certification: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c056-f007
page_type: 行业问题页
application_area: education
meta_title: Teacher Qualifications | Chat Records | Review
meta_description: Teacher Qualifications: review chat records for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Teacher Qualification Exams and Certification: Trace Exceptions and Review Results

## What this category's data looks like

This category's data involves three types of materials: written and interview registration forms, Mandarin proficiency certificates, and medical examination forms. The sources are the registration system, testing institutions, and medical examination hospitals. The update cadence rolls with batches, and the field characteristics are mainly names, ID numbers, dates, signatures, and receipts. When materials enter the conversation logs and auditing feature, the registration form serves as the baseline for identity and subjects, the Mandarin proficiency certificate serves as supporting evidence for language level, and the medical examination form serves as supporting evidence for the health conclusion. Each of the three is cited as independent evidence and does not substitute for the others. If the name, quantity, or date of the same record does not match across two materials, if versions are not synchronized, or if signatures or receipts are missing, all of these form abnormal clues to be traced.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), outputting a session message list and the total number of records, including role and citation information. The exception list and review conclusions are then completed manually or by an external system. The message list is not a version ledger of business materials.

| Object | Check | Verification action |
| --- | --- | --- |
| Written and interview registration form | Name, ID number, exam subjects, date, and signature are consistent within the form | Check the fields and signature column in the form, and compare the name and date of the same record in the Mandarin proficiency certificate and medical examination form |
| Mandarin proficiency certificate | Certificate number, level, test date, and receipt are complete | Check the certificate number and test date, and verify whether it can be linked to the registration form when signatures or receipts are missing |
| Medical examination form | Medical examination conclusion, date, and physician signature are verifiable | Check the medical examination date and conclusion, and compare whether the name and quantity of the same record match those in the registration form |
| Conversation record interface | Paginate by application and session dimension, and the total number of records and status code are verifiable | Use `chatId` to locate the session, retrieve all pages, then check `dataId` and `value` to confirm role and citation information |

## Three common errors

- Symptom: The name and date of the same record do not match between the registration form and the medical examination form. Cause: The two registration sources are different, and no field-level comparison was performed.
- Symptom: The version of the Mandarin proficiency certificate is not synchronized, and the old level is still cited. Cause: After the certificate was updated, it was not written back to the associated materials, so the version was not synchronized.
- Symptom: The medical examination form lacks a signature or receipt, and the exception cannot be closed. Cause: Signatures and receipts were not fully collected during the material circulation step.

## How to verify the setup

Feature acceptance: Paginate through all records by the total number of records total, and when the status code is 200, sample one record to check the role, citation information, and time, and use the message identifiers and content fields `_id`, `dataId` and `value` to locate the original record.

Business test: Create an abnormal record and see whether the source material can be traced.

- Paginate by application and session dimension, retrieve two consecutive pages and compare the total number of records and the offset, to confirm that only the first page was not retrieved.
- Open a single record to check the role, citation, and elapsed time fields, and inspect the case where the interface returns empty but a session exists in the interface.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
