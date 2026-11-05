---
title: Conversation Records and Traceability for Degree Awards and Certificate Information Reporting: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c026-f007
page_type: 行业问题页
application_area: education
meta_title: Degree Certificates | Chat Records | Versions
meta_description: Degree Certificates: review chat records for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Degree Awards and Certificate Information Reporting: Maintain Document Versions and Changes

## What this category's data looks like

This page centers on three types of materials in degree conferral and certificate information reporting: degree application forms, thesis review forms, and defense resolutions. These materials come from training units and the defense process, enter the system in centralized batches, and their update cadence is synchronized with the degree conferral cycle. Field characteristics center on name, student ID, discipline, date, signature, and receipt. The degree application form carries personal and course information, the thesis review form carries review opinions and conclusions, and the defense resolution carries voting results and committee signatures. When the three types of materials enter the conversation record interface, each is retained as question or answer content in a session for subsequent comparison and tracing. The name, quantity, and date of the same record must remain consistent across materials; after any material changes, the other materials and knowledge base references must be updated in sync.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), outputting a session message list and total record count, including role and reference information. The "version ledger and change records" are then completed manually or by an external system. The interface only retrieves session evidence and does not write business ledgers; the message list is not the version ledger of business materials.

| Object | Check | Verification action |
| --- | --- | --- |
| Degree application form | Fields, dates, and signatures must be consistent with the thesis review form and defense resolution | Pull the session message list by `chatId`, verify the total record count total and response `code` of 200, and sample one entry to inspect role and reference information |
| Thesis review form | Review opinions, conclusions, and dates must correspond to the defense resolution | Verify the `dataId` and reference information of a single record, and compare whether the review conclusion and the resolution conclusion are consistent |
| Defense resolution | Voting results, committee signatures, and receipts must be complete | Page through to retrieve all records, verify the reference and elapsed-time fields in `value`, and check whether signatures and receipts are missing |
| Version ledger and change records | The current version is unique, old versions are traceable, and references are synchronized | After changing one piece of content, pull again to see whether the version number and references are updated in sync and whether the total record count changes |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the degree application form and the defense resolution. Cause: The materials enter the system separately, and field comparison and synchronization are not performed for the same record.
- Symptom: The thesis review form has been updated, but the knowledge base or external documents still reference the old version. Cause: The version was not synchronized, the old version was not marked invalid, and references were not updated with the change.
- Symptom: The defense resolution lacks committee signatures or receipts. Cause: Signature and receipt fields were not verified during material circulation, and completeness review was not performed at registration.

## How to verify the setup

This feature's acceptance: page through by total record count total to retrieve all records, sample one entry to verify role, reference information, and time, and confirm that response `code` of 200 matches the total record count.

Business test: change one piece of content and see whether the version number and references are updated in sync.

- Pull the session message list by `chatId` and `dataId`, and pull two consecutive pages to compare the total record count and offset.
- Open one record to verify the reference and elapsed-time fields in `value`, confirm that the number of references equals the array length, and that reference text tokens are recorded separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
