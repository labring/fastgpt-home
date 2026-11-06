---
title: Conversation Records and Traceability for Initial Review of Academic Journal Submissions: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c066-f007
page_type: 行业问题页
application_area: education
meta_title: Journal Submissions | Chat Records | Versions
meta_description: Journal Submissions: review chat records for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Initial Review of Academic Journal Submissions: Maintain Document Versions and Changes

## What this category's data looks like

The initial review of academic journal submissions involves three types of materials: submitted manuscripts, author information forms, and plagiarism check reports. Submitted manuscripts come from the original files submitted by authors, including title, authors, affiliations, main text, and references; author information forms come from the submission system or email receipts, including names, order, affiliations, contribution statements, and signatures; plagiarism check reports come from plagiarism checking services, including detection date, duplication rate range, and comparison sources. When these three types of materials enter the conversation logs and auditing function, they serve respectively as question attachments in the session, answer citations, and the basis for manual review, and their fields, dates, and signatures need to be aligned item by item in the version ledger. The update cadence advances according to submission batches and initial review rounds, with each round generating a new version number and change record.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), outputting the session message list and total record count, including role and citation information. The "version ledger and change records" are then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Submitted manuscript | Title, authors, affiliations, date, and signature are consistent between the manuscript and the information form | Check the manuscript title against the title in the author information form, and compare the submission date with the receipt signature |
| Author information form | Names, order, affiliations, contribution statements, and signatures are complete and consistent with the manuscript | Compare names, order, and affiliations item by item, and check whether signatures or receipts are missing |
| Plagiarism check report | Detection date, duplication rate range, and comparison sources are traceable and correspond to the manuscript version | Check the report date against the manuscript version number, and confirm that the cited sources are synchronized with the current version |
| Conversation records | The total record count matches pagination, and role and citation information can be verified | Page through by `chatId` to retrieve all records, sample one record to check role, citation, and time, and confirm that response `code` of 200 matches the total record count total |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match between the manuscript and the author information form. Cause: The two materials are registered separately without cross-checking, and the versions are not synchronized.
- Phenomenon: The plagiarism check report cites an old version of the manuscript, breaking the uniqueness of the current version. Cause: After changing one piece of content, the version number and citation are not updated synchronously, and the old version is still cited.
- Phenomenon: The author information form lacks a signature or receipt, making the initial review conclusion untraceable. Cause: The registration step does not validate the signature field, and the receipt is not archived.

## How to verify the setup

Acceptance for this function: page through to retrieve all records by total record count, sample one record to check role, citation information, and time, confirm that response `code` of 200 matches the total record count total, and check the `dataId` and `value` fields.

Business test: change one piece of content and see whether the version number and citation are updated synchronously.

- Page through and pull by application and session identifier, pull two consecutive pages and compare the total and offset, and confirm that the number of records matches the total.
- Open one record to check role, citation, and duration fields, and confirm that message roles correspond to the original conversation and that the number of citations is recorded separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
