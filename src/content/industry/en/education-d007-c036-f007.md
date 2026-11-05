---
title: Conversation Records and Traceability for Professional Qualification Exam Applications: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c036-f007
page_type: 行业问题页
application_area: education
meta_title: Professional Exams | Chat Records | Review
meta_description: Professional Exams: review chat records for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Professional Qualification Exam Applications: Trace Exceptions and Review Results

## What this category's data looks like

This category's data covers registration audit materials for professional and technical personnel qualification examinations, including three types: the registration form, the academic qualification certificate, and the work experience certificate. The registration form contains basic personal information, examination subjects, and the employer's opinion and signature; the academic qualification certificate contains the graduating institution, major, certificate number, and issue date; the work experience certificate contains start and end dates, position, and the employer's seal. The materials come from candidate submissions and employer issuances, and updates enter in centralized batches; the field characteristic is that name, date, and signature must be consistent across materials. When entering the conversation log and audit features, the three types of materials are cited as review evidence: the registration form is used to verify examination eligibility, the academic qualification certificate is used to verify major and graduation time, and the work experience certificate is used to verify length of employment, each carrying a different verification role.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), which outputs the session message list and the total record count, including role and citation information. The "exception list and review conclusion" is then completed by a human or an external system. The interface only retrieves session evidence and does not write to business ledgers.

| Object | Check | Verification action |
| --- | --- | --- |
| Registration form | Name, date, and signature are consistent with the academic qualification certificate and the work experience certificate | Check whether the name, date of birth, and examination subjects are consistent across the three materials, and check whether the signature and employer's opinion are complete |
| Academic qualification certificate | Graduating institution, major, and certificate number are consistent with what is filled in the registration form | Compare the certificate number with the academic qualification information filled in the registration form, and check whether the issue date matches the graduation time |
| Work experience certificate | Start and end dates and position are consistent with the work experience filled in the registration form | Check whether the start and end dates in the certificate match the work experience column in the registration form, and check the employer's seal and signature |
| Conversation record interface output | The total record count total and response `code` of 200 are retrievable, and role and citation information are complete | Paginate by `chatId`, check the `dataId` and `value` fields, and confirm the number of citations and the elapsed time |

## Three common errors

- Symptom: The name and date for the same record do not match between the registration form and the academic qualification certificate. Cause: The two materials were filled in at different stages, and no cross-check was performed.
- Symptom: The version of the work experience certificate was not synchronized, and the old version is still in use. Cause: The material was not replaced after being updated, and the version date was not checked during review.
- Symptom: The registration form lacks a signature or receipt, and exception tracing has no original record to support it. Cause: Signature completeness was not validated at the submission stage, and the reviewer did not confirm item by item.

## How to verify the setup

Feature acceptance: Page through using the total record count total to retrieve all records, sample one record to check the role, citation information, and time, and confirm response `code` of 200.

Business test: Create an exception record, see whether the source material can be traced, and check the fields and signatures of the registration form, academic qualification certificate, and work experience certificate.

- Paginate through conversation records by `chatId`, check the `dataId` and `value` fields, and confirm that the total record count is consistent with the offset.
- Export the exception list, compare the names, dates, and signatures of the registration form, academic qualification certificate, and work experience certificate one by one, and hand it to the person in charge for handling.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
