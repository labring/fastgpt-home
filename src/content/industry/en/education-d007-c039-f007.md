---
title: Conversation Records and Traceability for Exam Organization and Misconduct Handling: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c039-f007
page_type: 行业问题页
application_area: education
meta_title: Exam Administration | Chat Records | Review
meta_description: Exam Administration: review chat records for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Exam Organization and Misconduct Handling: Trace Exceptions and Review Results

## What this category's data looks like

This page addresses the exam organization and violation handling category. The source materials are exam administration manuals, examination room record sheets, and violation fact records, updated in sync by session and batch. The exam administration manual defines the process and field specifications; the examination room record sheet registers on-site time, seat, and invigilator signature; the violation fact record carries the party's statement, evidence number, and review signature. When these three types of materials enter the conversation logs and auditing function, the exam administration manual serves as the field specification reference, while the examination room record sheet and violation fact record serve as the original record support for exception tracing. Field characteristics include candidate name, subject, date, quantity, signature, and receipt. The name, quantity, and date of the same record in the two materials must be aligned item by item; when versions are not synchronized or signatures are missing, manual review is required before handing over to the responsible person for disposition.

## Configuration and implementation checks

This step is performed by the conversation record interface (by application and session dimension), which outputs the session message list and total record count, including role and reference information. The "exception list and review conclusion" is then completed by a human or an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Exam administration manual | Field specifications and date/signature requirements must be consistent with the examination room record sheet and violation fact record; only after version synchronization can it serve as the basis for review | Verify item by item against the manual fields the name, subject, date, quantity, signature, and receipt in the examination room record sheet and violation fact record |
| Examination room record sheet | The name, quantity, and date of the same record must match the violation fact record; invigilator signature and receipt must be complete | Sample one exception record, use `chatId` to locate the session, and check `dataId` and `value` against the corresponding role, reference information, and time |
| Violation fact record | The party's statement, evidence number, and review signature must corroborate the examination room record sheet; a missing signature or receipt cannot be used as a conclusion | Page through by total record count total to retrieve all, compare the fields of the same record in the two materials, and record response `code` of 200 and the total count |
| Conversation record interface | Page-pull by application and session dimension, returning the two role types of question and answer plus reference and elapsed-time fields; the total record count is the number of message records | Pull two consecutive pages and compare the total count and offset, open one record and check the reference and elapsed-time fields, and record the reference count separately by array length |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the examination room record sheet and the violation fact record. Cause: The two materials are registered separately without field alignment, and no item-by-item comparison is done before review.
- Symptom: The exam administration manual version is not synchronized, and the old field specifications are still referenced. Cause: After the manual is updated, the registration and review steps are not notified, and the material versions are not synchronized with the batch.
- Symptom: The violation fact record is missing a signature or receipt, yet the exception list is still submitted. Cause: The reviewer did not check the signature and receipt fields, and the manual review conclusion lacks support from the original records.

## How to verify the setup

This function's acceptance: page through by total record count total to retrieve all, sample one record to check the role, reference information, and time, confirm response `code` of 200, and use `_id`, `dataId` and `value` to locate that record.

Business test: create one exception record, see whether the source material can be traced, and check whether the fields, date, and signature of the examination room record sheet and violation fact record are consistent.

- Page-pull by application and session dimension, pull two consecutive pages and compare the total record count and offset, and confirm whether the session still appears in the interface when only the first page is retrieved or an empty result is returned.
- Sample one exception record, check the order of the two role types of question and answer, the reference and elapsed-time fields, and check that the reference count is recorded separately by array length and is not compared for equality with the reference content budget.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
