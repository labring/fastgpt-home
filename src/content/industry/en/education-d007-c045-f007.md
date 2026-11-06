---
title: Conversation Records and Traceability for Off-Campus Training Registration and Compliance: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c045-f007
page_type: 行业问题页
application_area: education
meta_title: Training Compliance | Chat Records | Review
meta_description: Training Compliance: review chat records for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Off-Campus Training Registration and Compliance: Trace Exceptions and Review Results

## What this category's data looks like

Off-campus training compliance filing and penalty response involves three types of materials: school operating licenses, course filing materials, and fee disclosure. A school operating license contains the institution name, address, validity period, issuance date, and seal; course filing materials contain the course name, number of class hours, target students, filing date, and handler signature; fee disclosure contains fee items, amounts, refund rules, disclosure date, and receipt. The three types of materials are updated by semester or change milestone, and their fields are characterized by names, quantities, dates, and signatures. When they enter the conversation logs and audit function, each material serves as an original record to be traced: the license is used to verify the institution entity, course filing is used to verify courses and class hours, and fee disclosure is used to verify amounts and refund standards. During exception tracing, the corresponding question and answer are found from the session records, and then the fields are compared against the three types of materials to form an exception list and review conclusion.

## Configuration and implementation checks

This step is performed by the conversation record interface (by application and session dimension), outputting a session message list and total record count, including role and reference information. The "exception list and review conclusion" is then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| School operating license | The institution name, address, validity period, and issuance date are consistent between the license and the course filing materials, and the seal is complete | In the request parameters, verify the application and session identifiers, page through all records by the total record count total, open one record to verify the role and reference information, and use `chatId` to locate the session |
| Course filing materials | The course name, number of class hours, target students, and filing date are consistent between the filing materials and the fee disclosure, and the handler signature and receipt are complete | Pull two consecutive pages and compare the total count and offset to confirm that the number of records matches the total, then verify whether the course name and number of class hours are consistent with the license, and use `dataId` to locate a single record |
| Fee disclosure | The fee items, amounts, refund rules, and disclosure date are consistent between the fee disclosure and the course filing materials, and the receipt is retained | Open a single record to verify the reference and latency fields, compare whether the fee amount and refund rules are consistent with the filing materials, and use `value` to view the reference and latency |
| Conversation logs and audit | The session message list distinguishes the two role types of question and answer, the reference and latency fields are visible, and response `code` of 200 can be checked | Page through by application and session dimension, use `chatId` and `dataId` to locate a single record, and use `value` to view the reference and latency |

## Three common errors

- Symptom: The name and number of class hours for the same course do not match between the filing materials and the fee disclosure. Cause: The two materials are registered separately, no cross-check is performed, and versions are not synchronized.
- Symptom: The address on the school operating license is inconsistent with the address in the course filing materials, and the dates are also misaligned. Cause: After a change, only one material is updated while the other still uses the old version, and signature confirmation is missing.
- Symptom: The fee disclosure lacks a receipt or signature, and the exception list cannot be tied back to the original record. Cause: No receipt is retained during the disclosure step, so during review only the session records can be seen and the source materials cannot be traced.

## How to verify the setup

Acceptance of this function: page through all records by the total record count total, open one record to verify the role, reference information, and time, confirm response `code` of 200, and use `_id`, `dataId` and `value` to locate a single record.

Business test: create an exception record and see whether the source materials can be traced, comparing the fields, dates, and signatures of the school operating license, course filing materials, and fee disclosure.

- Page through the session message list by application and session dimension, pull two consecutive pages and compare the total count and offset, and confirm that the number of records matches the total.
- Open a single record to verify the role, reference, and latency fields, then return to the school operating license, course filing materials, and fee disclosure to compare names, quantities, dates, and signatures item by item.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
