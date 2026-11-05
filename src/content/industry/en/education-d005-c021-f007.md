---
title: Conversation Records and Traceability for Enrollment Changes and Graduation Eligibility: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c021-f007
page_type: 行业问题页
application_area: education
meta_title: Graduation Eligibility | Chat Records | Versions
meta_description: Graduation Eligibility: review chat records for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Enrollment Changes and Graduation Eligibility: Maintain Document Versions and Changes

## What this category's data looks like

This page focuses on the student status changes and graduation qualification review category. The material sources are three types of forms and their attachments: leave-of-absence/resumption-of-study applications, major transfer applications, and graduation review checklists. The update cadence advances with the semester change window and graduation review batches, and old versions of materials may still be referenced after process nodes. Field characteristics center on name, student ID, change type, effective date, signature, and receipt. The three types of materials play different roles when entering the conversation record feature: leave-of-absence/resumption-of-study applications and major transfer applications serve as the basis for the change, while the graduation review checklist serves as the draft basis for the qualification conclusion; all must be aligned with the current version in the knowledge base or external documents. Within the feature, the materials only form a conversation evidence chain; the version ledger and change records are registered separately by humans or an external system.

## Configuration and implementation checks

| Object | Check | Verification action |
| --- | --- | --- |
| Resumption of schooling application | Whether the fields, dates, and signatures are consistent with the current version | Pull records by application and session identifiers, and verify the roles and reference information of the messages corresponding to `chatId` and `dataId` |
| Major transfer application | Whether the names, quantities, and dates of the same record match across the two documents | After paging through to retrieve all, compare the number of references and reference text in `value`, and confirm that signatures and receipts are not missing |
| Graduation review checklist | Whether the version number and references are updated synchronously | After changing one piece of content, pull again, verify the total number of records total and response `code` of 200, and confirm that the old version is traceable and references are synchronized |
| Session message records | Whether the total number of records and the pagination offset match | Pull two pages consecutively, compare the total number of records and the offset, and confirm that message roles correspond to the original conversation |

## Three common errors

- Symptom: The name or date of the same student does not match between the leave-of-absence/resumption-of-study application and the graduation review checklist. Cause: The two materials are maintained separately and are not uniformly registered and reviewed against the current version.
- Symptom: The major transfer application has been updated, but the knowledge base or external documents still reference the old version. Cause: The version was not synchronized, and the reference relationship was not re-pulled and verified when the content changed.
- Symptom: The graduation review checklist lacks a signature or receipt, but the record is still treated as valid basis. Cause: When the material enters the feature, only conversation evidence is retained, and the approval signature is not completed by humans or an external system.

## How to verify the setup

Feature acceptance: page through to retrieve all records by total record count, sample one record to verify the role, reference information, and time, and confirm that `_id`, `dataId` and `value`, response `code` of 200, and total record count total match.

Business test: change one piece of content and see whether the version number and references are updated in sync.

- Pull by application and session identifier with pagination, pull two pages consecutively, compare the total record count and offset, and confirm that message roles correspond to the original conversation.
- Open a single record to verify the reference and elapsed-time fields, record the number of references and the reference text tokens, and confirm that the old version is traceable and references are in sync.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
