---
title: Conversation Records and Traceability for Enrollment Changes and Graduation Eligibility: Track Progress and Check Statistics
slug: /en/industry/education-d006-c021-f007
page_type: 行业问题页
application_area: education
meta_title: Graduation Eligibility | Chat Records | Progress
meta_description: Graduation Eligibility: review chat records for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Enrollment Changes and Graduation Eligibility: Track Progress and Check Statistics

## What this category's data looks like

This page centers on student status changes and graduation eligibility review; the materials include leave-of-absence and return-to-study applications, major transfer applications, and graduation review checklists. Leave-of-absence and return-to-study applications record the student's leave and return dates, approval opinions, and signatures; major transfer applications record the original major, target major, assessment conclusion, and date; graduation review checklists record course credits, required components, and the graduation conclusion. When these materials enter the conversation record interface, each serves as question-and-answer evidence within a session, used to trace the registration and re-review process. The update cadence is weekly or monthly aggregation, and the field characteristics center on names, quantities, dates, and signature receipts. The materials do not directly generate ledgers within the feature; they only provide conversation evidence, on the basis of which manual staff or external systems register, export, and re-review.

## Configuration and implementation checks

This step is performed by the conversation record interface (by application and session dimension), which outputs the session message list and the total record count, including role and citation information. The "progress table and statistical scope description" is then completed by manual staff or an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Leave-of-absence and return-to-study application | The name, quantity, and date of the same record do not match across the two materials | Pull records by application and session identifier, check `chatId` and `dataId`, and compare the leave and return dates and signatures |
| Major transfer application | Versions are not synchronized, causing inconsistency between the original major and target major fields | Pull two consecutive pages and compare the total record count total and the offset, confirm response `code` of 200, and check the major transfer date and assessment conclusion |
| Graduation review checklist | Missing signature or receipt makes the graduation conclusion unconfirmable | Open one record and check the role, citation information, and elapsed time, and inspect whether the signature and receipt fields in the checklist are complete |
| Conversation record interface | The total record count is the number of message records, which is not the same quantity as the number of sessions | Page through by total record count to retrieve all records, sample one record to check the role, citation information, and time, and confirm that the `value` field is traceable |

## Three common errors

- Symptom: The name and date of the same leave-of-absence and return-to-study record do not match between the application and the checklist. Cause: The two materials are registered separately and are not checked against a unified scope.
- Symptom: The major transfer application version is not synchronized, and the original major and target major fields conflict. Cause: The materials were not synchronized to the conversation record after being updated.
- Symptom: The graduation review checklist is missing a signature or receipt. Cause: An omission in the registration step, and the exported record lacks citations.

## How to verify the setup

Feature acceptance: Page through by total record count to retrieve all records, sample one record to check the role, citation information, and time, confirm that response `code` of 200 is consistent with total, record the citation count by array length, and use `quoteMaxToken` only to check the tokens of the citation text.

Business test: Use one week of records to check the totals, see whether the scope and exceptions are clearly stated, and confirm that the names, quantities, dates, and signatures of the leave-of-absence and return-to-study applications, major transfer applications, and graduation review checklists are consistent.

- Pull pages by application and session dimension, pull two consecutive pages and compare total and the offset, and confirm that the number of records matches the total.
- Open a single record to check the role, citation information, and elapsed time, and inspect whether the `_id`, `dataId` and `value` fields are traceable.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
