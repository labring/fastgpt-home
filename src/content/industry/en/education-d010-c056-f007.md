---
title: Conversation Records and Traceability for Teacher Qualification Exams and Certification: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c056-f007
page_type: 行业问题页
application_area: education
meta_title: Teacher Qualifications | Chat Records | Operations
meta_description: Teacher Qualifications: review chat records for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Teacher Qualification Exams and Certification: Coordinate Operations and Application Handover

## What this category's data looks like

This category covers three types of materials: written and interview registration forms, Putonghua certificates, and medical examination forms. Registration forms contain name, ID number, exam subjects, test area, date, and signature; Putonghua certificates contain grade, certificate number, and issue date; medical examination forms contain examination conclusion, hospital seal, and date. Materials come from candidate submissions and certification authority archiving, with updates advancing by batch: registration, review, certification, and issuance. When entering the conversation logs and auditing feature, registration forms are used to verify candidate identity and registration information, Putonghua certificates are used to verify grade and number, and medical examination forms are used to verify conclusion and validity period. During handover, each of the three types of materials corresponds to its own record entry, and fields, dates, and signatures must be compared item by item.

## Configuration and implementation checks

This step is performed by the conversation record interface (by application and session dimension), outputting a session message list and total record count, including role and reference information. "Handover-ready deployment status and operation records" are then completed manually or by an external system. The total record count is the number of message records, not the number of sessions.

| Object | Check | Verification action |
| --- | --- | --- |
| Written and interview registration form | Name, ID number, exam subjects, test area, date, and signature are consistent across both materials | Pull session records by `chatId`, and verify the registration form fields and signature receipt |
| Putonghua certificate | Grade, certificate number, and issue date match the registration form records | Open a single record to verify reference information and time, and compare the certificate number and date |
| Medical examination form | Examination conclusion, hospital seal, and date are consistent with the certification records | Locate the record by `dataId`, and verify the seal and date fields |
| Deployment status and operation records | Version, connection, and task records are all consistent | View a single record by `value`, and verify role, reference, and elapsed time |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the registration form and the Putonghua certificate. Cause: The two materials are registered separately and are not verified against the same record number.
- Symptom: The deployment version is not synchronized, and the operation records are inconsistent with the current version. Cause: The version number and task records were not verified during handover.
- Symptom: The medical examination form lacks a signature or receipt, and the handover form is missing items. Cause: The material circulation step did not include item-by-item receipt signing, and the records were not closed-loop.

## How to verify the setup

Feature acceptance: Page through by the total record count total to retrieve all records, sample one record to verify role, reference information, and time, and confirm response `code` of 200.

Business test: Verify once item by item according to the handover form, and see which record item is missing.

- Paginate by `chatId` and session identifier, pull two consecutive pages and compare total and offset, and confirm the record count matches.
- Open a single record to verify `dataId` and `value`, and check whether the role field and reference information are complete.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
