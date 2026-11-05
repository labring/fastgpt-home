---
title: Conversation Records and Traceability for Public Vocational Skills Level Assessment: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c034-f007
page_type: 行业问题页
application_area: education
meta_title: Skills Certification | Chat Records | Versions
meta_description: Skills Certification: review chat records for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Public Vocational Skills Level Assessment: Maintain Document Versions and Changes

## What this category's data looks like

This page addresses the category of social evaluation of vocational skill level certification, involving three types of materials: evaluation implementation plans, candidate registration forms, and assessor dispatch forms. The evaluation implementation plan is formulated by the evaluation institution, the candidate registration form is submitted by the candidate or registration point, and the assessor dispatch form is issued by the dispatching unit. After entering the conversation record interface, each assumes a different role: the implementation plan is cited as the evaluation basis, while the registration form and dispatch form are verified as process evidence. The update cadence of materials changes with batches and policy adjustments, and field characteristics center on name, ID number, vocational level, evaluation date, signature, and receipt. The name, quantity, and date of the same record often do not match across the two materials, and version desynchronization and missing signatures also occur from time to time.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), outputting a session message list and total record count, including role and citation information. The version ledger and change records are then completed manually or by an external system. The message list is not the version ledger of business materials; the total record count is the number of message records, which is not the same quantity as the number of sessions.

| Object | Check | Verification action |
| --- | --- | --- |
| Evaluation implementation plan | The current version is unique, old versions are traceable, and citations are synchronized | Check the plan number and version number, and compare whether the plan name and date cited in the registration form and dispatch form are consistent |
| Candidate registration form | Fields, dates, and signatures are complete and consistent with the plan | Check the name, ID number, vocational level, evaluation date, and signature receipt, and verify whether the quantity matches the dispatch form |
| Assessor dispatch form | Dispatch records correspond to the plan batch, and signatures are complete | Check the assessor name, dispatch date, and signature, and confirm that the name, quantity, and date of the same record match the registration form |
| Conversation record interface | The total record count total and response `code` of 200 can be verified | Page through by `chatId` to retrieve all records, sample one record to check the role, citation information, and time, and record the `dataId` and `value` fields |

## Three common errors

- Phenomenon: The name, quantity, and date of the same candidate do not match between the registration form and the dispatch form. Cause: The two materials are registered separately, and cross-checking against the same record was not performed.
- Phenomenon: The plan has been updated, but the registration form and dispatch form still cite the old version. Cause: The version was not synchronized, and citations were not updated with the version number.
- Phenomenon: The registration form or dispatch form lacks a signature or receipt. Cause: The signature field was not validated during submission, and the receipt was not archived.

## How to verify the setup

Acceptance of this feature: Page through by total record count total to retrieve all records, sample one record to check the role, citation information, and time, and confirm response `code` of 200.

Business test: Change one piece of content and see whether the version number and citations are updated synchronously.

- Page through by `chatId` and `dataId` to retrieve all records, and check the total record count and advance the offset by the number of records retrieved.
- Open one record to check the citations and elapsed time in the `value` field, confirm that the number of citations is the array length, and record the citation text tokens separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
