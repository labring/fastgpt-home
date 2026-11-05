---
title: Conversation Records and Traceability for Off-Campus Training Registration and Compliance: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c045-f007
page_type: 行业问题页
application_area: education
meta_title: Training Compliance | Chat Records | Versions
meta_description: Training Compliance: review chat records for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Off-Campus Training Registration and Compliance: Maintain Document Versions and Changes

## What this category's data looks like

The core materials for off-campus training compliance filing and penalty response are three types: the school operating license, course filing materials, and fee disclosure. The school operating license states the name, address, validity period, and issuance date; the course filing materials include the course name, class hours, textbook version, and filing date; the fee disclosure includes fee items, standards, refund rules, and disclosure date. The sources of the materials are receipts from the education administrative department, internal approval documents of the institution, and public disclosure pages. The update cadence falls into two types: immediate updates triggered by license expiration and renewal, course adjustments, and fee changes; and centralized review at the end of a quarter or semester. The field characteristics are concentrated in names, quantities, dates, signatures, and receipt numbers. When the three types of materials enter the conversation record function, each is pulled in pages as conversation evidence and does not directly generate a ledger.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), outputting a list of session messages and the total number of records, including role and reference information. The "version ledger and change records" are then completed manually or by an external system. The interface return results distinguish two types of roles, questions and answers, and carry reference and elapsed-time fields.

| Object | Check | Verification action |
| --- | --- | --- |
| Conversation record interface | Pulled in pages by application and session dimension, and the total number of records matches the number of messages | Check the source of the application and session identifiers in the request parameters, pull two consecutive pages and compare the total number of records with the offset, and check for response `code` of 200 |
| School operating license | The name, address, validity period, issuance date, and signature receipt are consistent between the ledger and the disclosure document | Compare field by field the original license, the ledger registration, and the public disclosure page, and check the signature and receipt number |
| Course filing materials | The course name, class hours, textbook version, and filing date are consistent between the two materials | Extract the same course record, compare the filing receipt with the ledger, and check whether the version number and reference are synchronized |
| Fee disclosure | The fee items, standards, refund rules, disclosure date, and signature are complete | Compare the fee disclosure page with the ledger, check the date, signature, and receipt, and confirm that the old version is traceable |

## Three common errors

- Symptom: The name, class hours, and filing date of the same course do not match between the two materials. Cause: The versions are not synchronized, the old version is not marked as invalid, and the reference still points to the old record.
- Symptom: After the school operating license is renewed, the ledger still shows the old validity period and old issuance date. Cause: The change record was not registered, the reference was not updated in sync, and the old version cannot be traced.
- Symptom: The fee disclosure lacks a signature or receipt number, and the refund rules are inconsistent with the ledger. Cause: The disclosure document was not returned, the registration step missed items, and the version number was not updated with the content.

## How to verify the setup

This function's acceptance: page through by the total number of records to retrieve all of them, and sample one record to check the role, reference information, and time; check the message identifiers and content fields `_id`, `dataId` and `value`, response `code` of 200, and that the total number of records total matches the number of messages.

Business test: change one piece of content and see whether the version number and reference are updated in sync; confirm that the current version is unique, the old version is traceable, and the reference is synchronized.

- Check the source of the application and session identifiers in the request parameters, pull two consecutive pages and compare the total number of records with the offset, and confirm response `code` of 200.
- Extract one record, check the role, reference information, and elapsed-time field, confirm that the number of references is the array length, and record the reference text tokens separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
