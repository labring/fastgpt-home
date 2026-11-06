---
title: Conversation Records and Traceability for Degree Awards and Certificate Information Reporting: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c026-f007
page_type: 行业问题页
application_area: education
meta_title: Degree Certificates | Chat Records | Operations
meta_description: Degree Certificates: review chat records for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Degree Awards and Certificate Information Reporting: Coordinate Operations and Application Handover

## What this category's data looks like

Deployment, operations, and application handover for degree conferral and certificate information reporting involve three types of materials: degree application forms, thesis review forms, and defense resolutions. The degree application form records the applicant's basic information and course credits, the thesis review form carries review comments and conclusions, and the defense resolution solidifies the voting results and signatures. The three types of materials play different roles when entering the conversation logs and auditing function: the degree application form serves as the identity and qualification source document, the thesis review form serves as the basis for process evaluation, and the defense resolution serves as the final conclusion evidence. The material sources are business system exports and manual supplementary entry, the update rhythm is batch reporting, and the field characteristics are concentrated in names, quantities, dates, and signatures. The names, quantities, and dates of the same record in the three materials must be aligned item by item, versions must be synchronized, and signatures and receipts must not be missing.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), outputting the session message list and the total number of records, including role and reference information. The handover-ready deployment status and operation records are then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Degree application form | The applicant and course credit fields must be consistent with the same record's name, quantity, and date in the thesis review form and defense resolution | Check the source of the application and session identifiers in the request parameters, retrieve all pages and compare against the total record count total and response `code` of 200, and sample one record to check the role and reference information |
| Thesis review form | The review conclusion and date must match the degree application form and defense resolution, and signatures and receipts must not be missing | Retrieve by `chatId` and session dimension, check that the two role types, question and answer, alternate, and open one record to view the reference and elapsed time fields |
| Defense resolution | The voting result and signature must be synchronized with the version of the degree application form and thesis review form, and the same record's date must not mismatch | Use `dataId` to locate a single record, check the tokens of the reference text in `value`, and record the array count separately |
| Deployment status and operation records | Version, connection, and task records are consistent, and each item in the handover form can be checked | Check each item in the handover form once, see which record is missing, and confirm that the offset advances with the retrieved records and covers the total |

## Three common errors

- Symptom: The name, quantity, and date of the same record in the degree application form and defense resolution do not match. Cause: The two places were entered separately and no cross-check was performed against the same record.
- Symptom: The version of the thesis review form is not synchronized, and the review conclusion and defense resolution reference an old version. Cause: After the materials were updated, the records were not re-retrieved by batch and the versions were not compared.
- Symptom: The defense resolution lacks a signature or receipt, and that item is empty on the handover form. Cause: The signature step was not written back, and whether the field was complete was not checked when exporting the records.

## How to verify the setup

Acceptance of this function: retrieve all pages by total record count, sample one record to check the role, reference information, and time, and confirm response `code` of 200 and that message roles correspond to the original conversation.

Business test: check each item in the handover form once, see which record is missing, and confirm that the names, quantities, and dates of the three materials—degree application form, thesis review form, and defense resolution—are consistent.

- Retrieve two pages in a row and compare the total record count and offset to confirm that the situation where only the first page is retrieved no longer occurs.
- Open one record to check the reference and elapsed time fields, and confirm that the exported record is not missing references.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
