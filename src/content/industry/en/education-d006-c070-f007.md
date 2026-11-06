---
title: Conversation Records and Traceability for Academic Journal Business Partnerships: Track Progress and Check Statistics
slug: /en/industry/education-d006-c070-f007
page_type: 行业问题页
application_area: education
meta_title: Journal Partnerships | Chat Records | Progress
meta_description: Journal Partnerships: review chat records for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Academic Journal Business Partnerships: Track Progress and Check Statistics

## What this category's data looks like

Academic journal business cooperation management involves three types of materials: business cooperation agreements, advertising review forms, and distribution cooperation materials. Business cooperation agreements contain the partner name, cooperation period, revenue-sharing ratio, signature, and date; advertising review forms contain the advertiser name, issue period, number of pages, reviewer signature, and date; distribution cooperation materials contain the distribution channel name, distribution quantity, start and end dates, and receipt signature. The three types of materials are updated weekly or monthly, and their field characteristics are the coexistence of four types of elements: name, quantity, date, and signature. When entering the conversation logs and auditing function, business cooperation agreements serve as the main basis for progress records, while advertising review forms and distribution cooperation materials serve as auxiliary sources for statistical verification, providing the record counts and caliber descriptions for advertising operations and distribution operations respectively. The names, quantities, and dates of the three types of materials must correspond item by item in the progress table and statistical caliber description, and signatures and receipts serve as the basis for judging record completeness.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), outputting a session message list and total record count, including role and citation information. The "progress table and statistical caliber description" is then completed manually or by an external system. The interface only retrieves conversation evidence and does not write business ledgers; the number of messages and the number of sessions are not the same quantity, and the total record count is the number of message records.

| Object | Check | Verification action |
| --- | --- | --- |
| Business cooperation agreement | Partner name, cooperation period, revenue-sharing ratio, signature, and date correspond item by item in the progress table and statistical caliber description | Pull by application and session dimension, verify the `chatId` source, and compare the agreement name, quantity, date, and signature |
| Advertising review form | Advertiser name, issue period, number of pages, reviewer signature, and date are consistent with the agreement records | Open a single record to verify the role, citation information, and time, and use `dataId` to locate the record |
| Distribution cooperation materials | Distribution channel name, distribution quantity, start and end dates, and receipt signature are consistent with the agreement records | Pull two consecutive pages and compare total with the offset to confirm that the record count matches the total |
| Conversation record interface | The total record count total corresponds to response `code` of 200, and the role field matches the original conversation between question and answer | Verify the citation and duration fields in `value` to confirm that citation information can be seen in a single record |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match between the business cooperation agreement and the advertising review form. Cause: The two materials are registered separately and are not matched item by item under the same caliber.
- Phenomenon: The version of the distribution cooperation materials is not synchronized, and the progress table still uses the old version. Cause: After the materials are updated, the records are not re-pulled for verification, and the statistical caliber is not adjusted with the version.
- Phenomenon: The advertising review form lacks a signature or receipt, but the total record count still includes it in the sum. Cause: Signatures and receipts are not separately verified as the basis for judging record completeness.

## How to verify the setup

Acceptance of this function: Page through and retrieve all records according to the total record count total, sample one record to verify the role, citation information, and time, and confirm that response `code` of 200 is consistent with the number of records.

Business test: Use one week of records to verify the total, check whether the caliber and exceptions are clearly stated, and confirm that the names, quantities, and dates of the business cooperation agreement, advertising review form, and distribution cooperation materials correspond item by item.

- Pull paginated records by application and session dimension, record `chatId` and `dataId`, and pull two consecutive pages to compare total with the offset.
- Open a single record to verify the citation and duration fields in `value`, match the record count with the statistical count item by item, and then register it in the progress table.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
