---
title: Conversation Records and Traceability for District Teaching Research and Classroom Reviews: Track Progress and Check Statistics
slug: /en/industry/education-d006-c012-f007
page_type: 行业问题页
application_area: education
meta_title: Teaching Reviews | Chat Records | Progress
meta_description: Teaching Reviews: review chat records for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for District Teaching Research and Classroom Reviews: Track Progress and Check Statistics

## What this category's data looks like

The materials for district and county teaching research activities and lesson observation and evaluation mainly come from teaching research activity notices, lesson observation records, and lesson evaluation minutes, which are summarized and updated weekly or monthly. The notice provides the activity name, date, participation scope, and receipt requirements; the lesson observation records register the instructor, topic, class, time, and signature by period; the lesson evaluation minutes register the key points of the review, speakers, and signatures. When these three types of materials enter the conversation record interface, each plays a different role: the notice is used to verify the activity name and date, the lesson observation records are used to verify the periods and quantities, and the lesson evaluation minutes are used to verify the speakers, conclusions, and signatures. The field characteristics are concentrated in names, quantities, dates, signatures, and receipts. It often occurs that the same record has mismatched names, quantities, and dates across two materials, versions are not synchronized, or signatures or receipts are missing. The progress table and statistical scope description are registered, exported, and reviewed accordingly by manual staff or external systems.

## Configuration and implementation checks

This part is executed by the conversation record interface (by application and session dimension), outputting the session message list and the total number of records, including role and citation information. The progress table and statistical scope description are then completed by manual staff or external systems; the interface does not write business ledgers.

| Object | Check | Verification action |
| --- | --- | --- |
| Conversation record interface | The total number of records matches the number of paginated entries | Page through and retrieve all records according to the total number of records total, verify response `code` of 200, and pull two consecutive pages to compare the offset and total |
| Teaching research activity notice | The activity name, date, and receipt fields are complete | Verify the activity name and date in the notice, and compare them item by item with the lesson observation records and lesson evaluation minutes |
| Lesson observation records | The periods, instructors, and signatures are complete | Verify the lesson observation periods and number of people weekly, and check whether signatures and receipts are missing |
| Lesson evaluation minutes | The speakers, conclusions, and signatures are complete | Verify the review conclusions and speakers, and check whether the versions are synchronized and the signatures are complete |

## Three common errors

- Phenomenon: The names, quantities, and dates of the same record do not match across two materials. Cause: The notice, lesson observation records, and lesson evaluation minutes are each registered separately and are not verified according to the same scope.
- Phenomenon: The versions are not synchronized, and old materials are still referenced. Cause: After updating, they were not replaced or the version was not marked, and the old version was used during verification.
- Phenomenon: Signatures or receipts are missing, and the record cannot be confirmed. Cause: Signatures were omitted during registration or receipts were not collected, and no item-by-item check was performed during summarization.

## How to verify the setup

This function acceptance: Page through and retrieve all records according to the total number of records total, verify response `code` of 200, sample one record to verify the role, citation information, and time, and confirm that the `_id`, `dataId` and `value` fields are readable.

Business test: Use one week of records to verify the totals, and see whether the scope and exceptions are clearly stated.

- Pull records by application and session identifier, verify that `chatId` is consistent with the actual session, and check whether the pagination parameters match the total number of records total.
- Spot-check one record, verify the role field, number of citations, and citation text tokens; the number of citations is recorded separately by array length and is not compared for equality with `quoteMaxToken`.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
