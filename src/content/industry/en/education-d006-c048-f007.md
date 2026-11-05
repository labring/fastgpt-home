---
title: Conversation Records and Traceability for Sino-Foreign Education Establishment and Annual Reports: Track Progress and Check Statistics
slug: /en/industry/education-d006-c048-f007
page_type: 行业问题页
application_area: education
meta_title: Joint Education | Chat Records | Progress
meta_description: Joint Education: review chat records for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Sino-Foreign Education Establishment and Annual Reports: Track Progress and Check Statistics

## What this category's data looks like

This page addresses the category of the establishment and annual reports of Chinese-foreign cooperatively-run schools. The materials come from three types of texts: establishment applications, cooperation agreements, and articles of association, as well as the progress records and statistical scope descriptions formed by subsequent annual report filing. The materials are updated on a weekly or monthly cadence, and the field characteristics center on institution name, number of majors, enrollment date, signature page, and receipt number. When entering this function, the establishment application and cooperation agreement are used to verify fields and date signatures, and the articles of association are used to verify whether the version is synchronized; conversation records only play the role of session evidence and do not replace the business ledger. Weekly or monthly reports need to reconcile the record count with the statistical count, write the scope into the header, and list exceptions separately.

## Configuration and implementation checks

This step is performed by the conversation record interface (by application and session dimension), which outputs the session message list and the total record count, including role and citation information. The "progress table and statistical scope description" is then completed manually or by an external system. The interface only retrieves session evidence and does not write to the business ledger.

| Object | Check | Verification action |
| --- | --- | --- |
| Establishment application | Institution name, number of majors, and signature date must be consistent with the cooperation agreement | Pull records by application and session dimension, verify the message matched by `chatId` and `dataId`, then check the signature page and receipt |
| Cooperation agreement | The name, quantity, and date of the same record match across the two materials | After paging through to retrieve all records, compare the total record count total with response `code` of 200, and sample one record to check role and citation information |
| Articles of association | The version number and effective date must be synchronized; missing signatures or receipts must be flagged | Open `value` to verify the citation and elapsed-time fields, and confirm which version of the articles of association the record corresponds to |
| Progress table and statistical scope description | The record count matches the statistical count, and the scope is written into the header | Use one week of records to verify the total, list exceptions and scope separately, and do not treat the number of messages as the number of sessions |

## Three common errors

- Symptom: The same institution has inconsistent name, quantity, and date in the application and the agreement. Cause: The two materials are registered separately and are not backfilled under the same record number.
- Symptom: The articles of association version is not synchronized, and the old signature page is still in circulation. Cause: The attachment was not replaced after the update, and the receipt was not recovered.
- Symptom: The interface returns empty but sessions exist in the UI, or only the first page is retrieved. Cause: The sources of the application and session identifiers are inconsistent, and the pagination offset is not pulled continuously.

## How to verify the setup

Acceptance for this function: page through to retrieve all records by total record count, sample one record to verify role, citation information, and time, and confirm that the message identifiers and content fields `_id`, `dataId` and `value` match the total record count total and response `code` of 200.

Business test: use one week of records to verify the total, check whether the scope and exceptions are clearly written, record the citation count separately by array length, and do not compare citation text tokens for equality with the count.

- Continuously pull two pages by application and session dimension, compare the offset and total, and confirm that the record count matches the statistical count
- Open one record to verify role, citation, and elapsed-time fields, and write exceptions and scope into the header of the weekly or monthly report

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
