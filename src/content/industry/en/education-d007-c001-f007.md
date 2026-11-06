---
title: Conversation Records and Traceability for Daily Kindergarten Care Management: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c001-f007
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Care | Chat Records | Review
meta_description: Kindergarten Care: review chat records for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Daily Kindergarten Care Management: Trace Exceptions and Review Results

## What this category's data looks like

This category's data covers three types of materials: daily life schedules, morning and afternoon check records, and child health observation records. Daily life schedules organize activity periods, segment names, and responsible persons by date and class; morning and afternoon check records register body temperature, oral cavity, skin, and mental state item by item per child, with the inspector and date attached; child health observation records log drinking, eating, toileting, napping, and emotions by event, and require the signature of the childcare worker and the reviewer. The update cadence for the three types of materials is once per day, the date fields must be consistent, and signatures and receipts must not be missing. When the materials enter the conversation logs and auditing feature, the daily life schedule provides the timeline reference, the morning and afternoon check records and child health observation records provide exception clues, and the conversation record interface pulls session messages by application and session dimension as the raw records supporting exception tracing, without replacing the business ledgers.

## Configuration and implementation checks

This step is performed by the conversation record interface (by application and session dimension), which outputs the session message list and the total record count, including role and reference information. The exception list and review conclusions are then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Daily life schedule | The date, class, segment name, and responsible person fields are complete, and the date is consistent with the morning and afternoon check records | Take the daily life schedule and morning and afternoon check records for the same date, compare the date, segment name, and responsible person item by item, and check the signature field |
| Morning and afternoon check records | The child name, check items, inspector, and date fields are complete, and the count matches the health observation records | Extract the morning and afternoon check records and health observation records by child name and date, compare the number of check items and the date, and check the inspector's signature |
| Child health observation records | The event time, observation items, and signatures of the childcare worker and reviewer are complete, and the version and receipt are in sync | Retrieve the same child's observation records for the day, check the event time and observation items, and check the signatures of the childcare worker and reviewer as well as the receipt version |
| Conversation record interface (by application and session dimension) | The total record count total and response `code` of 200 can be verified, and the role and reference information are complete | Page through by `chatId` to retrieve all records, check `dataId` and `value`, and compare the total record count total with response `code` of 200 |

## Three common errors

- Symptom: the same child's name is written differently in the two materials. Cause: naming rules were not unified at registration, making association impossible during tracing.
- Symptom: the count of the same check item does not match between the two materials. Cause: one side missed or duplicated a registration, and no count verification was performed.
- Symptom: the observation record lacks the reviewer's signature or receipt. Cause: the version was not synced, and the record was archived before the signature process was completed.

## How to verify the setup

Feature acceptance: page through by the total record count total to retrieve all records, sample one record to check the role, reference information, and time, confirm response `code` of 200, and record the number of references separately by array length.

Business test: create one exception record, see whether the source material can be traced, and check the dates and signatures of the daily life schedule, morning and afternoon check records, and child health observation records.

- Pull two consecutive pages by `chatId`, check the total record count and advance the offset by the number of records retrieved, and confirm response `code` of 200.
- Open one record to check `dataId` and `value`, and confirm that the reference and elapsed-time fields exist.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
