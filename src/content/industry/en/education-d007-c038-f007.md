---
title: Conversation Records and Traceability for Continuing Education Training Hour Recognition: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c038-f007
page_type: 行业问题页
application_area: education
meta_title: Continuing Education | Chat Records | Review
meta_description: Continuing Education: review chat records for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Continuing Education Training Hour Recognition: Trace Exceptions and Review Results

## What this category's data looks like

This category's data involves three types of materials: course filing forms, study certificates, and credit hour recognition forms. The course filing form records the course name, filing number, course start date, and the filer's signature; the study certificate is issued by the teaching institution and contains the learner's name, course name, number of credit hours, completion date, and the institution's receipt; the credit hour recognition form summarizes the applicant, course name, recognized credit hours, recognition date, and the reviewer's signature. Materials are updated by batch or by year, and the fields are mainly names, quantities, dates, and signatures. When entering the conversation logs and auditing feature, each of the three types of materials is referenced as an original voucher: the course filing form is used to verify the course name and filing number, the study certificate is used to verify the number of credit hours and the completion date, and the credit hour recognition form is used to verify the recognition result and the signature chain. The name, quantity, and date of the same record across the three materials must be consistent, versions must be synchronized, and signatures and receipts must be complete.

## Configuration and implementation checks

This step is performed by the conversation record interface (by application and session dimension), which outputs the session message list and the total record count, including role and reference information. The "exception list and review conclusions" are then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Course filing form | Whether the course name, filing number, course start date, and filer's signature are consistent with the study certificate and the credit hour recognition form | Retrieve the course filing form, compare the course name, filing number, and course start date item by item, and verify the filer's signature and receipt |
| Study certificate | Whether the learner's name, course name, number of credit hours, completion date, and institution's receipt are consistent with the course filing form and the credit hour recognition form | Retrieve the study certificate, compare the learner's name, course name, number of credit hours, and completion date item by item, and verify the institution's receipt |
| Credit hour recognition form | Whether the applicant, course name, recognized credit hours, recognition date, and reviewer's signature are consistent with the course filing form and the study certificate | Retrieve the credit hour recognition form, compare the applicant, course name, recognized credit hours, and recognition date item by item, and verify the reviewer's signature |
| Conversation record interface | Paginate by application and session dimension, the total record count matches the offset, and roles distinguish questions from answers | Use `chatId` to locate the session, pull two consecutive pages to compare the total record count total and the offset, and sample one record to verify `dataId`, `value`, and reference information |

## Three common errors

- Symptom: The course name, number of credit hours, and completion date of the same record do not match between the course filing form and the study certificate. Cause: The two materials are registered separately without cross-checking.
- Symptom: The credit hour recognition form has been updated, but the course filing form is still the old version, and the versions are not synchronized. Cause: Material updates do not go through the same batch, and version markers are missing.
- Symptom: The study certificate lacks the institution's receipt, and the credit hour recognition form lacks the reviewer's signature. Cause: Signatures and receipts were not fully collected during the material circulation step.

## How to verify the setup

Feature acceptance: paginate through all records by the total record count total, sample one record to verify the role, reference information, and time, and the status code is 200.

Business test: create an exception record and see whether the source material can be traced.

- Pull the session message list by `chatId`, compare the total record count total and the offset, and confirm that no pages are missing.
- Open a single record, verify `dataId` and `value`, and confirm that the reference information and the elapsed time field are complete.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
