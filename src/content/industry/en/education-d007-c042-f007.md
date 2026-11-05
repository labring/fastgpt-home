---
title: Conversation Records and Traceability for Corporate Sales and Product Training: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c042-f007
page_type: 行业问题页
application_area: education
meta_title: Sales Training | Chat Records | Review
meta_description: Sales Training: review chat records for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Corporate Sales and Product Training: Trace Exceptions and Review Results

## What this category's data looks like

This page focuses on the enterprise sales product training category. The core materials are product manuals, sales terminology, and channel training schedules. Product manuals provide fields for product name, version number, effective date, and responsible person's signature; sales terminology provides the sales terminology number, corresponding product, applicable channel, and approval signature; channel training schedules provide the course name, training date, participating channels, and receipt signature. The three types of materials are updated weekly or monthly. When versions iterate, the old versions must be replaced in sync and signature receipts retained. When the materials enter the conversation logs and audit feature, product manuals serve as the comparison baseline for product name and version, sales terminology serves as the basis for checking sales terminology references and record names, and channel training schedules serve as the traceability evidence for dates and signatures. Together, the three support exception tracing and manual review, ensuring that exception records can be traced back to the source materials.

## Configuration and implementation checks

This step is performed by the conversation record interface (by application and session dimension), which outputs the session message list and total record count, including role and reference information. The "exception list and review conclusion" is then completed by a human or an external system. The exception list must be supported by original records, and after the reviewer signs, it is handed to the responsible person for handling.

| Object | Check | Verification action |
| --- | --- | --- |
| Conversation record interface | Paginate by application and session dimension, returning the total record count and message list | Check the source of the application and session identifiers in the request parameters, pull two pages consecutively and compare the total record count and offset, and confirm response `code` of 200 |
| Product manual | Product name, version number, effective date, and signature are consistent between the manual and the training records | Open an exception record, check whether the product name, version number, effective date, and signature are consistent with the manual, and inspect the `value` field |
| Sales terminology | Sales terminology number, corresponding product, and approval signature are consistent between the sales terminology and the records | Check the sales terminology number, corresponding product, and approval signature in the exception record, and check whether `dataId` can locate the specific message |
| Channel training schedule | Course name, training date, and receipt signature are consistent between the schedule and the records | Check the course name, training date, and receipt signature in the exception record, and confirm that the session record corresponding to `chatId` is complete |

## Three common errors

- Symptom: The product name, quantity, or date for the same record does not match between the product manual and the sales terminology. Cause: The two materials were not updated in sync under the same version, resulting in inconsistent fields.
- Symptom: The exception record lacks a signature or receipt, making it impossible to confirm the reviewer. Cause: Signatures were not collected according to the process when the materials were circulated, or the receipt was not archived.
- Symptom: The interface returns empty but there are sessions in the UI, or only the first page is retrieved. Cause: The application and session identifiers do not match, or the pagination parameters did not page correctly.

## How to verify the setup

This feature's acceptance: page through all records according to the total record count, sample one record to check the role, reference information, and time, confirm that the message identifiers and content fields `_id`, `dataId` and `value` can locate it, and that the total record count total and response `code` of 200 are normal.

Business test: create an exception record, see whether it can be traced back to the source materials, and check the fields, dates, and signatures of the product manual, sales terminology, and channel training schedule.

- Pull two pages of conversation records consecutively, compare the total record count and offset, and confirm that the message list is complete and that each message has an identified role.
- Open an exception record, check the reference and duration fields, and compare them against the fields, dates, and signatures of the product manual, sales terminology, and channel training schedule.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
