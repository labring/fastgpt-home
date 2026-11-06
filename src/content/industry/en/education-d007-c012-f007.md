---
title: Conversation Records and Traceability for District Teaching Research and Classroom Reviews: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c012-f007
page_type: 行业问题页
application_area: education
meta_title: Teaching Reviews | Chat Records | Review
meta_description: Teaching Reviews: review chat records for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for District Teaching Research and Classroom Reviews: Trace Exceptions and Review Results

## What this category's data looks like

This page addresses district and county teaching research activities and lesson observation and evaluation scenarios. Materials include teaching research activity notices, lesson observation records, and lesson evaluation minutes. Sources are electronic documents submitted by schools and conversation records within the system, with updates organized by activity batch and semester. Field characteristics center on activity name, teaching teacher, class, date, number of lessons observed, lesson evaluation comments, signatures, and receipts. When entering the conversation logs and auditing function, the notice serves as activity background, lesson observation records provide classroom observation entries, and lesson evaluation minutes carry conclusions and signatures; together, the three form the original basis for anomaly tracing.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), outputting a session message list and total record count, including role and citation information. The anomaly list and review conclusions are then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Conversation record interface | Total record count matches the number of paginated entries | Paginate through all records by total count, verify `chatId` and offset, and confirm response `code` of 200 and total |
| Teaching research activity notice | Activity name, date, signature, and receipt are complete | Compare whether the activity name and date in the notice are consistent with the lesson observation records and lesson evaluation minutes |
| Lesson observation records | Number of lessons observed, class, and teaching teacher are consistent with the lesson evaluation minutes | Verify item by item the number of lessons observed and the quantity, date, and signature in the lesson evaluation minutes |
| Lesson evaluation minutes | Conclusions, signatures, and receipts are traceable | Open a single record to verify `dataId` and `value`, and check citation and duration fields |

## Three common errors

- Phenomenon: The name, quantity, and date of the same activity do not match across two materials. Cause: Field definitions were not unified at registration, and each school filled them in independently, causing discrepancies.
- Phenomenon: Lesson evaluation minutes lack signatures or receipts. Cause: The process was not closed-loop; the signature step was skipped or receipts were not collected.
- Phenomenon: Versions are not synchronized, and old notices are mixed with new lesson observation records. Cause: Materials were not replaced in the archive after updates, causing tracing to point to outdated content.

## How to verify the setup

Acceptance of this function: Paginate through all records by total count, sample one record to verify role, citation information, and time, confirm that `_id`, `dataId` and `value` are queryable, and that response `code` of 200 and total are consistent.

Business test: Create an anomaly record and see whether the source material can be traced.

- Pull records by application and session dimension, and verify whether the pagination parameters and total record count are consistent.
- Open a single record, verify the role field, citation information, and duration field, register the anomaly, and hand it to the responsible person for handling.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
