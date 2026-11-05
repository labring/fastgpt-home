---
title: Conversation Records and Traceability for Degree Awards and Certificate Information Reporting: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c026-f007
page_type: 行业问题页
application_area: education
meta_title: Degree Certificates | Chat Records | Review
meta_description: Degree Certificates: review chat records for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Degree Awards and Certificate Information Reporting: Trace Exceptions and Review Results

## What this category's data looks like

This page focuses on the degree conferral and certificate information reporting category, involving three types of materials: degree application forms, thesis review forms, and defense resolutions. The degree application form records the applicant's basic information and degree category; the thesis review form carries the review conclusion and the reviewer's signature; the defense resolution reflects the voting result and the signature of the defense committee. The materials originate from submissions by each training unit and aggregation by business systems, and the update cadence advances with degree conferral batches, usually with concentrated updates after the review and defense stages. Field characteristics center on name, student ID, thesis title, date, signature, and receipt status. When the materials enter the conversation logs and audit function, each assumes an evidentiary role: the degree application form provides the identity and category anchor, the thesis review form provides the review opinion and signature basis, and the defense resolution provides the voting result and committee signature evidence. During exception tracing, the three materials must be cross-compared under the same record to confirm whether the names, quantities, dates, and signatures are consistent.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), outputting the session message list and the total record count, including role and reference information. The "exception list and review conclusion" is then completed by a human or an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Degree application form | Check whether the name, student ID, degree category, and application date are consistent with the thesis review form and defense resolution, and whether the signature and receipt are missing | Pull the session records by `chatId`, compare the material fields and dates one by one, and record discrepancies |
| Thesis review form | Check whether the review conclusion, reviewer signature, and review date mutually corroborate with the defense resolution and degree application form, and whether the versions are synchronized | Locate a single record by `dataId`, check the reference information and duration field, and register inconsistencies |
| Defense resolution | Check whether the voting result, defense committee signature, and defense date match the thesis review form and degree application form, and whether the receipt is complete | Use `value` to view the details of a single record, confirm the role and reference information, and generate an exception list |
| Conversation record interface | Paginate through all records by the total record count total; response `code` of 200 indicates a successful request; the role field must alternate between question and answer | Pull two consecutive pages and compare the offset and total, and sample one record to check the role, reference information, and time |

## Three common errors

- Symptom: The name or date of the same record does not match between the degree application form and the thesis review form. Cause: The two materials are entered at different stages, no cross-validation was performed, and the versions are not synchronized.
- Symptom: The defense resolution lacks the defense committee signature or receipt. Cause: The signature step was omitted during material circulation, and the completeness of signatures and receipts was not checked item by item before submission.
- Symptom: The interface returns empty but there are sessions in the interface. Cause: The sources of the application and session identifiers are inconsistent, or the pagination parameter offset does not match the total record count, so only the first page is retrieved.

## How to verify the setup

This feature's acceptance: paginate through all records by the total record count total, sample one record to check the role, reference information, and time, and confirm that the status code is 200 and the role field matches the original conversation.

Business test: create an exception record, see whether the source material can be traced, and check the fields, dates, and signatures of the degree application form, thesis review form, and defense resolution.

- Paginate by application and session identifier, pull two consecutive pages and compare the offset and total record count, and confirm that the number of records matches the total.
- Open a single record to check the role, reference information, and duration field, register the number of references and the reference text tokens, and hand over exception items to the responsible person for handling.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
