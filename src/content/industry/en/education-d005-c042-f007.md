---
title: Conversation Records and Traceability for Corporate Sales and Product Training: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c042-f007
page_type: 行业问题页
application_area: education
meta_title: Sales Training | Chat Records | Versions
meta_description: Sales Training: review chat records for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Corporate Sales and Product Training: Maintain Document Versions and Changes

## What this category's data looks like

This page is for the enterprise sales product training scenario, covering three types of materials: product manuals, sales sales language, and channel training schedules. Product manuals come from the product team and are updated according to the version release cadence; fields include manual name, chapter number, effective date, and signature field. Sales sales language comes from sales operations and is adjusted quarterly or by campaign; fields include sales language number, applicable product, revision date, and receipt field. Channel training schedules come from training management and are updated by channel batch; fields include course name, number of class hours, start date, and trainee signature. When the three types of materials enter the conversation record interface, their roles differ: product manuals and sales language serve as knowledge base citation sources, while schedules serve as the basis for training arrangements. After materials are updated, a version ledger and change records must be registered to ensure the current version is unique, old versions are traceable, and citations are synchronized.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), outputting a session message list and total record count, including role and citation information. The "version ledger and change records" are then completed manually or by an external system. The message list is not the version ledger of business materials; the total record count is the number of message records, which is not the same quantity as the number of sessions.

| Object | Check | Verification action |
| --- | --- | --- |
| Product manual | The manual name, chapter number, effective date, and signature field are consistent in the version ledger and citation source; the current version is unique and old versions are traceable | Use `chatId` to pull session records and check the manual name and effective date in the citation information; after paging through all records, compare total with response `code` of 200 |
| Sales sales language | The sales language number, applicable product, revision date, and receipt field are consistent in the sales language document and training records; when the version is not synchronized, citations still point to the old version | Pull pages by application and session dimension, check that message roles correspond to the original conversation in the role field; sample one record to check the citation information and latency field |
| Channel training schedule | The course name, number of class hours, start date, and trainee signature are consistent in the schedule and sign-in records; if the signature or receipt is missing, it is considered not closed-loop | Pull two consecutive pages and compare the offset and total record count; open one record to check the citation and latency, confirm the citation count is the array length, and that citation text tokens are recorded separately |
| Change record | When the name, quantity, or date of the same record does not match between the product manual and sales sales language, the current version ledger prevails and the discrepancy is marked | Use `dataId` to locate a single record and check the role and citation information; after changing one piece of content, observe whether the version number and citation are updated synchronously |

## Three common errors

- Symptom: The name, quantity, or date of the same record does not match between the product manual and sales sales language. Cause: The two materials are revised separately, the version ledger is not used as the sole baseline, and the citation source is not updated synchronously.
- Symptom: The version is not synchronized, and the old sales language is still cited. Cause: When updating the knowledge base or external documents, change records are not registered, the current version and old version coexist, and citations are not refreshed.
- Symptom: The channel training schedule lacks a signature or receipt. Cause: After training is completed, trainee signatures are not collected, the sign-in records and schedule are not closed-loop, and training execution cannot be proven during auditing.

## How to verify the setup

This feature's acceptance: page through all records by total record count, sample one record to check the role, citation information, and time; confirm response `code` of 200, total matches the number of list entries, the citation count is the array length, and citation text tokens are recorded separately.

Business test: change one piece of content and see whether the version number and citation are updated synchronously; if the citation still points to the old version, the version ledger and change records are not closed-loop.

- Use `chatId` to pull records by application and session dimension in pages, pull two consecutive pages and compare the offset and total record count, and confirm that the total record count is the number of message records.
- Open one record to check the role field, citation information, and latency field, use `dataId` to locate a single record, and check that the citation count and citation text tokens are recorded separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
