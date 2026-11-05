---
title: Conversation Records and Traceability for Laboratory Hazardous Chemical Purchasing and Records: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c065-f007
page_type: 行业问题页
application_area: education
meta_title: Lab Chemicals | Chat Records | Versions
meta_description: Lab Chemicals: review chat records for version tracking. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Laboratory Hazardous Chemical Purchasing and Records: Maintain Document Versions and Changes

## What this category's data looks like

Laboratory hazardous chemical procurement and ledgers involve three types of materials: procurement applications, issuance registrations, and inventory ledgers. Fields include product name, specification, quantity, date, handler, approver, signature, and receipt. Procurement applications are initiated by the user, issuance registrations are filled in by the custodian, and inventory ledgers are summarized by the administrator. The three must remain consistent in name, quantity, and date. Materials are updated by batch: after procurement arrives, the ledger is supplemented; issuance is registered on the same day; and reconciliation is performed at month-end. When entering this feature, procurement applications and issuance registrations are pulled as conversation evidence, while inventory ledgers are compared manually as external records. Conversation records do not directly generate ledgers.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), outputting a session message list and total record count, including role and citation information. The "version ledger and change records" are then completed manually or by an external system. The total record count total is the number of message records, and is compared with the accumulated pagination rows to determine whether all records have been read; the response code is checked separately.

| Object | Check | Verification action |
| --- | --- | --- |
| Conversation record interface | Paginated pull by application and session dimension; total record count total matches response `code` of 200 | Use `chatId` to pull two consecutive pages, compare offset and total, and sample one record to check role and citation |
| Procurement application materials | Hazardous chemical name, quantity, date, signature, and receipt are complete | Check whether the name, quantity, and date on the application form and arrival record are consistent, and inspect signature and receipt |
| Issuance registration materials | Issuance date, quantity, handler, and custodian signature are traceable | Compare the date and quantity in the issuance registration and inventory ledger, and check for missing signatures or receipts |
| Inventory ledger materials | The current version is unique, old versions are traceable, and citations are synchronized | After changing one quantity, check whether the version number and citations are synchronized, and verify `dataId` and `value` |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the procurement application and the inventory ledger. Cause: The two materials are filled in by different people and were not checked against the same batch.
- Symptom: The issuance registration has been updated, but the inventory ledger still shows the old version. Cause: The version was not synchronized, the old version was not marked as void, and citations still point to the old content.
- Symptom: The procurement application lacks approval signature, and the issuance registration lacks a receipt. Cause: The registration step did not enforce collecting signatures and receipts, and they were not supplemented afterward.

## How to verify the setup

Feature acceptance: page through using the total record count total to retrieve all records, sample one record to check role, citation information, and time, and confirm response `code` of 200 and that the list contains `_id`, `dataId` and `value`.

Business test: change one piece of content and see whether the version number and citations are updated synchronously.

- Pull two consecutive pages and compare offset and total to confirm that the number of records matches the total count.
- Open one record and check role, citation, and elapsed-time fields to confirm that message roles correspond to the original conversation.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
