---
title: Conversation Records and Traceability for Professional Qualification Exam Applications: Track Progress and Check Statistics
slug: /en/industry/education-d006-c036-f007
page_type: 行业问题页
application_area: education
meta_title: Professional Exams | Chat Records | Progress
meta_description: Professional Exams: review chat records for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Professional Qualification Exam Applications: Track Progress and Check Statistics

## What this category's data looks like

This page focuses on the scenario of registration review for professional and technical personnel qualification examinations. The materials are three types: registration form, academic qualification certificate, and work experience certificate. The registration form carries the applicant's basic information and examination subjects; the academic qualification certificate carries the graduating institution, major, and date of award; the work experience certificate carries the start and end of employment and the employer's signature and seal. The materials are submitted by the applicant, issued by the employer, and received by the review side, and are updated in batches or on a weekly summary basis. Field characteristics include name, ID number, education level, major name, graduation date, employment start and end, position name, signature, and receipt. When the three types of materials enter the conversation logs and audit function, each is registered as an independent evidence source: the registration form corresponds to the applicant entity, the academic qualification certificate corresponds to the qualification threshold, and the work experience certificate corresponds to employment history. The three must be aligned by the same record key in the progress table and the statistical scope description, with the scope written into the table header.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), outputting the session message list and the total record count, including role and reference information. The "progress table and statistical scope description" is then completed manually or by an external system. The total record count is the number of message records, which is not the same quantity as the number of sessions.

| Object | Check | Verification action |
| --- | --- | --- |
| Registration form | Name, quantity, date, and signature must be aligned item by item with the academic qualification certificate and work experience certificate | Retrieve the registration form and the other two materials by record key, and check whether name, ID number, examination subjects, signature, and receipt are consistent |
| Academic qualification certificate | Graduating institution, major, education level, and date of award must be consistent with the scope of the registration form | Check whether the major name and graduation date are in the same scope as the registration form, and separately flag those missing a signature or receipt |
| Work experience certificate | Employment start and end, position name, and employer signature and seal must connect with the timeline of the registration form and academic qualification certificate | Check whether the start and end dates cover the examination registration requirements, and check whether the employer name is written the same way as in the registration form |
| Conversation records | Paginate and retrieve by application and session dimension, and the number of records must match the total count | Use `chatId` to locate the session, retrieve all pages, then check `dataId` and `value`, and sample one to inspect role and reference information |

## Three common errors

- Symptom: The employer name and date for the same record do not match between the registration form and the work experience certificate. Cause: The two materials were filled in separately, and field-level verification was not performed by the same record key.
- Symptom: The version of the academic qualification certificate was not synchronized, and the old major name remains in the progress table. Cause: After the material was updated, the statistical scope description was not written back, so the table header scope and the material version are disconnected.
- Symptom: The work experience certificate is missing a signature or receipt, but the statistical total still includes it. Cause: Exceptions were not listed separately in the scope description, so the record count and the statistical count do not match.

## How to verify the setup

This feature's acceptance: paginate and retrieve all records by total record count total; when the status code is 200, sample one to check role, reference information, and time; the number of references is recorded separately by array length, and the reference limit only checks the tokens of the reference text.

Business test: use one week of records to check the total, and see whether the scope and exceptions are clearly written.

- Pull two consecutive pages and compare the total count and offset to confirm that the number of records matches the total count, then export the registration.
- Extract one each of the registration form, academic qualification certificate, and work experience certificate by record key, and check name, quantity, date, signature, and receipt.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
