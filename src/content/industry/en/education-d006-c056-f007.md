---
title: Conversation Records and Traceability for Teacher Qualification Exams and Certification: Track Progress and Check Statistics
slug: /en/industry/education-d006-c056-f007
page_type: 行业问题页
application_area: education
meta_title: Teacher Qualifications | Chat Records | Progress
meta_description: Teacher Qualifications: review chat records for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Teacher Qualification Exams and Certification: Track Progress and Check Statistics

## What this category's data looks like

Teacher qualification exams and certification involve three types of materials: written and interview registration forms, Mandarin proficiency certificates, and medical examination forms. The registration form contains name, ID number, exam subjects, exam district, date, and signature; the Mandarin proficiency certificate contains certificate number, grade, and issue date; the medical examination form contains the medical examination conclusion, hospital seal, and date. Materials enter progress records and statistical verification by batch. The registration form is used to register exam progress and the number of subjects, the Mandarin proficiency certificate is used to verify qualification conditions and issue date, and the medical examination form is used to verify validity period and signed receipt. The update rhythm is once each in the three stages of registration, review, and certification. The field characteristic is that the same record's name, quantity, and date must be consistent across multiple materials; missing signature or receipt is regarded as incomplete.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), outputting a session message list and total record count, including role and reference information. The progress table and statistical scope description are then completed manually or by an external system. The interface only retrieves conversation evidence and does not write to the business ledger.

| Object | Check | Verification action |
| --- | --- | --- |
| Written and interview registration form | Fields, date, and signature are complete, and the same record's name and quantity are consistent | In the session message list, verify the name, quantity, and date registered on the registration form, and check whether the signature and receipt are complete |
| Mandarin proficiency certificate | Certificate number, grade, and issue date are consistent in the progress table and statistical scope description | Open a record to verify the role field and reference information, and compare whether the certificate number and issue date match the statistical total |
| Medical examination form | Medical examination conclusion, hospital seal, and date are consistent in the progress table and statistical scope description | Pull two pages in succession to compare the total record count and offset, and verify whether the medical examination form date and signed receipt are clearly written |
| Session message list and total record count | The number of records matches the total, and role and reference information are visible | Use `chatId` and `dataId` to locate the session and a single record, and view the reference and elapsed time fields in `value` |

## Three common errors

- Symptom: The same record's name, quantity, and date do not match between the registration form and the Mandarin proficiency certificate. Cause: The two materials are registered separately and not verified against the same standard.
- Symptom: The medical examination form version is not synchronized, and the old conclusion coexists with the new seal date. Cause: After the material was updated, it was not written back to the progress table, and the statistical scope description did not indicate the version.
- Symptom: The registration form lacks a signature or receipt, but the progress table still records it as complete. Cause: At registration time, only the quantity was checked and not the signature, and exceptions were not clearly stated in the header.

## How to verify the setup

Acceptance for this feature: page through using the total record count total to retrieve all records, sample one record to verify the role, reference information, and time, and confirm that response `code` of 200 matches the number of records.

Business test: use one week of records to verify the total, and check whether the scope and exceptions are clearly stated.

- Pull two pages in succession to compare the total record count and offset, and confirm that the number of records matches the total.
- Open a record to verify the role field and reference information, and check whether the signature and receipt are complete.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
