---
title: Conversation Records and Traceability for District Teaching Research and Classroom Reviews: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c012-f007
page_type: 行业问题页
application_area: education
meta_title: Teaching Reviews | Chat Records | Versions
meta_description: Teaching Reviews: review chat records for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for District Teaching Research and Classroom Reviews: Maintain Document Versions and Changes

## What this category's data looks like

District and county teaching research activity and classroom observation/evaluation materials include teaching research activity notices, classroom observation records, and classroom evaluation minutes. Fields include activity name, teaching teacher, observation time, evaluation comments, signature and receipt; dates and signatures are common verification points. The material sources are paper or electronic documents submitted by each school, and the update cadence advances with activity batches. The same record may appear in three materials—the notice, the record, and the minutes—each playing the role of initiation, process trace, and conclusion archiving. After entering the conversation logs and audit feature, these three types of materials are retrieved and exported as conversation evidence, used to verify whether versions and citations are synchronized.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), outputting the session message list and the total record count, including role and citation information. The "version ledger and change records" are then completed manually or by an external system. The message list itself is not the version ledger of business materials; it serves only as conversation evidence for registration and review.

| Object | Check | Verification action |
| --- | --- | --- |
| Teaching research activity notice | The activity name, date, and signature receipt are consistent between the notice and the record | Pull records by application and session dimension, and check whether `chatId` corresponds to the activity identifier in the notice |
| Classroom observation record | The teaching teacher, observation time, and evaluation comment fields are consistent with the minutes | Page through to retrieve all records, open a single record to check the role, citation information, and elapsed time fields |
| Classroom evaluation minutes | The conclusion items, count, and signature receipt match across the two materials | Compare the total record count total with the offset, confirm there are no missing pages, then register the change |
| Conversation record interface | The total record count corresponds to response `code` of 200, and the pagination parameters are reproducible | Pull two pages consecutively and compare total, use `dataId` to locate a single record |

## Three common errors

- Symptom: The dates of the same classroom observation record do not match between the notice and the minutes. Cause: The two materials were revised separately, changes were not registered under a unified version number, and the old version is still being cited.
- Symptom: The classroom evaluation minutes lack a signature or receipt. Cause: No receipt confirmation was set up in the material circulation step, and only the main text was collected during archiving without collecting the receipt.
- Symptom: The interface returns empty but there are sessions in the UI. Cause: The sources of the application and session identifiers are inconsistent, or the pagination offset does not cover all records.

## How to verify the setup

Feature acceptance: page through by total record count to retrieve all records, sample one record to check the role, citation information, and time, and confirm that response `code` of 200 is consistent with total.

Business test: change one piece of content and see whether the version number and citations are updated synchronously.

- Use `chatId` and the application identifier to pull records, register the version ledger, and mark the change date and signature status.
- When exporting records, retain the citation fields, and use `value` to check the number of citations and citation text tokens for a single record.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
