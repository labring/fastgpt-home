---
title: Conversation Records and Traceability for Self-Study Exam Records and Graduation Review: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c054-f007
page_type: 行业问题页
application_area: education
meta_title: Self-Study Exams | Chat Records | Operations
meta_description: Self-Study Exams: review chat records for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Self-Study Exam Records and Graduation Review: Coordinate Operations and Application Handover

## What this category's data looks like

The materials for self-taught examination registration records and graduation review include registration record files, course qualification certificates, and graduation application forms. Their sources are provincial examination offices and main examining institutions, and their update cadence changes with examination periods and graduation application batches. Registration record files record the candidate's identity and each prior examination registration, course qualification certificates reflect individual subject scores and dates, and graduation application forms carry the completion status of the professional plan and signed receipts. When these materials enter the conversation logs and auditing function, registration record files serve as the identity and historical basis, course qualification certificates serve as course-dimension evidence, and graduation application forms serve as the application and approval vehicle for the graduation conclusion. Field characteristics are concentrated in four categories: name, quantity, date, and signature. The same record often shows mismatches in name, quantity, and date across two materials, versions not synchronized, and missing signatures or receipts. During auditing, use the session message list and total record count returned by the API as clues, compare them item by item with the above materials, and after confirming that version, connection, and task records are consistent, hand over to operations or the next shift.

## Configuration and implementation checks

This part is executed by the conversation record API (by application and session dimension), which outputs the session message list and total record count, including role and reference information. "Handover-ready deployment status and operation records" are then completed by humans or external systems. The API only retrieves conversation evidence and does not write business ledgers.

| Object | Check | Verification action |
| --- | --- | --- |
| Registration record file | Name, quantity, date, and signature must be aligned item by item with the course qualification certificate and graduation application form | Use `chatId` to locate the session, page through to retrieve all records, verify `dataId` and the role field, and compare the name and number of examination registrations in the registration record file |
| Course qualification certificate | Course name, number of passes, and issuance date are consistent across the two materials | Page through by the total record count total to retrieve all records, open `value` for one sampled record, verify the reference information and duration field, and then compare with the certificate date |
| Graduation application form | Completion status of the professional plan, signature, and receipt are complete, and the version is synchronized with the registration record file | Verify response `code` of 200 and the total record count, check the signature field and receipt on the application form, and if the version is not synchronized, complete it first before handover |
| Deployment status and operation records | Version, connection, and task records are consistent | Check item by item once according to the handover sheet, see which record is missing, and focus on checking cases where the API returns empty but sessions exist in the interface, only the first page is retrieved, and exported records lack references |

## Three common errors

- Symptom: the same candidate's name is written differently in the registration record file and the graduation application form. Cause: the name field was not unified during data entry, and the name comparison between the two materials was not performed before handover.
- Symptom: the number of course qualification certificates does not match the number of passed courses listed in the graduation application form. Cause: versions are not synchronized, the application form was not refreshed after the qualification certificate was updated, and only a single material was checked during auditing.
- Symptom: the graduation application form lacks a signature or receipt, but auditing still shows the records as complete. Cause: the API only returns the session message list and total record count; signatures and receipts are business materials and must be checked separately by humans.

## How to verify the setup

Acceptance of this function: page through by the total record count total to retrieve all records, sample one record to verify the role, reference information, and time, confirm response `code` of 200, record the number of references separately by array length, and verify the tokens of the reference text separately, without comparing them for equality with `quoteMaxToken`.

Business testing: check item by item once according to the handover sheet, see which record is missing, and focus on verifying the name, quantity, date, and signature of the registration record file, course qualification certificate, and graduation application form.

- Use `chatId` to pull the session message list in pages, pull two consecutive pages and compare the total and offset, and confirm that the total record count matches the number of messages.
- Open a single record to verify the role, reference information, and duration field, and then compare item by item with the registration record file, course qualification certificate, and graduation application form for name, quantity, date, and signature.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
