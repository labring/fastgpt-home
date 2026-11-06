---
title: Conversation Records and Traceability for College Admissions and Application Placement: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c052-f007
page_type: 行业问题页
application_area: education
meta_title: College Admissions | Chat Records | Versions
meta_description: College Admissions: review chat records for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for College Admissions and Application Placement: Maintain Document Versions and Changes

## What this category's data looks like

In the regular higher education institution admissions filing scenario, the materials entering the knowledge base and external documents are mainly of three types: admissions plans, filing rules, and admission rosters. Admissions plans contain institution codes, major groups, planned numbers, batches, and dates; filing rules contain filing ratios, tie-breaking sorting, adjustment scope, and effective dates; admission rosters contain candidate numbers, names, admitted majors, signatures, and receipts. The three types of materials have different sources and different update rhythms: plans are adjusted by batch, rules are published annually, and rosters are archived by round. When materials enter the conversation record function, their respective roles are evidence sources: admissions plans are used to verify quantities and dates, filing rules are used to verify clauses and effective times, and admission rosters are used to verify lists and signed receipts. Version ledgers and change records are registered, exported, and reviewed accordingly by humans or external systems; the conversation record interface only provides a session message list and total record count, including role and citation information, and does not undertake ledger registration.

## Configuration and implementation checks

This step is performed by the conversation record interface (by application and session dimension), which outputs a session message list and total record count, including role and citation information. Version ledgers and change records are then completed by humans or external systems. The interface pulls pages by application and session identifier, and the returned results distinguish between two role types, question and answer, and carry citation and elapsed-time fields.

| Object | Check | Verification action |
| --- | --- | --- |
| Admissions plan | Planned numbers, major groups, batches, and dates are consistent across the three materials | Pull records by application and session identifier, check `chatId` and `value`, and compare planned numbers and dates |
| Filing rules | Filing ratios, tie-breaking sorting, and effective dates are traceable | Page through to retrieve all records, check role order and citation information, and compare rule clauses and effective dates |
| Admission roster | Candidate numbers, names, admitted majors, and signed receipts are complete | Sample one record to check `dataId` and citation fields, and compare roster signatures and receipts |
| Version ledger | The current version is unique, old versions are traceable, and citations are synchronized | After changing one piece of content, pull again and see whether the total record count total and citations are updated synchronously |

## Three common errors

- Symptom: the same candidate's name or major does not match between two rosters. Cause: versions are not synchronized, old materials are still cited, and cleanup was not performed according to the principle that the current version is unique.
- Symptom: the number of admissions plans is inconsistent with the number of filing results. Cause: after plan adjustments, the knowledge base was not updated, citations still point to the old version, and change records and receipts are missing.
- Symptom: the admission roster lacks signatures or receipts and cannot be traced. Cause: the archiving step was not registered, and the version ledger did not record the change time and responsible person.

## How to verify the setup

Acceptance of this function: page through by total record count to retrieve all records, sample one record to check role, citation information, and time, confirm response `code` of 200 is consistent with total, and check the message identifiers and content fields `_id`, `dataId` and `value`.

Business test: change one piece of content and see whether the version number and citations are updated synchronously

- Pull two pages in succession and compare the total and offset to confirm that the number of records matches the total, avoiding retrieving only the first page
- Open one record to check citation and elapsed-time fields, and retain citation information when exporting, avoiding exported records that lack citations

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
