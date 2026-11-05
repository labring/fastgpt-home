---
title: Conversation Records and Traceability for University Laboratory Safety Classification: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c064-f007
page_type: 行业问题页
application_area: education
meta_title: Lab Safety Categories | Chat Records | Versions
meta_description: Lab Safety Categories: review chat records for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for University Laboratory Safety Classification: Maintain Document Versions and Changes

## What this category's data looks like

This category involves three core types of materials: the laboratory grading and classification table, the hazard source list, and the safety responsibility statement. The grading and classification table fields include laboratory name, room number, hazard level, grading basis, and effective date; the hazard source list fields include hazard source name, category, quantity, storage location, and responsible person; the safety responsibility statement fields include responsible entity, signature field, signing date, and receipt number. The three types of materials update at different cadences: the grading and classification table changes with laboratory renovations or policy adjustments, the hazard source list changes with reagent and consumable inbound/outbound movements, and the safety responsibility statement is re-signed by academic year or personnel changes. When the materials enter the conversation logs and auditing feature, each plays a different role: the grading and classification table provides the citation basis for grading conclusions, the hazard source list provides the verification source for hazard source entries, and the safety responsibility statement provides the traceable evidence for signatures and receipts. Together they support the registration, export, and review of the version ledger and change records.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), outputting the session message list and total record count, including role and citation information. The "version ledger and change records" are then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Conversation record interface | Paginate by application and session dimension; the record count matches the total | Use `chatId` to match the actual session, pull two consecutive pages and check the total record count and advance the offset by the number of records retrieved, and retrieve all when the status code is 200 |
| Laboratory grading and classification table | Name, room number, hazard level, effective date, and signature field match between the grading and classification table and the responsibility statement | Open one record to check the role, citation information, and time, and sample grading entries to compare the names and dates in the two materials |
| Hazard source list | Hazard source name, category, quantity, storage location, and responsible person match between the list and the grading and classification table | Check the tokens of the citation text, record the array item count separately, and compare item by item whether the quantity and date are consistent |
| Safety responsibility statement | Responsible entity, signature field, signing date, and receipt number are complete and synchronized with the grading and classification table | Check the record corresponding to `dataId` and `value`, and check whether the signature and receipt are missing |

## Three common errors

- Symptom: the name, quantity, and date of the same hazard source do not match between the list and the grading and classification table. Cause: the two materials are maintained separately and are not updated synchronously from the same record source.
- Symptom: the grading and classification table has been updated, but the responsibility statement still cites the old version's level and date. Cause: the version was not synchronized; the old version is traceable but the citation was not updated with the version number.
- Symptom: the responsibility statement lacks a signature or receipt number, making it impossible to trace during auditing. Cause: the signing step was not closed-loop, and the receipt was not registered in the version ledger.

## How to verify the setup

Feature acceptance: paginate through all records by the total record count total, sample one record to check the role, citation information, and time, and when the status code is 200 confirm that the list contains both question and answer roles.

Business test: change one piece of content and see whether the version number and citation are updated synchronously.

- Use `chatId` to verify the source against the actual session, pull two consecutive pages and check the total record count and advance the offset by the number of records retrieved, and confirm that only the first page was not retrieved.
- Open one record to check the citation and elapsed time fields, check the tokens of the citation text, record the array item count separately, and check whether the exported records are missing citations.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
