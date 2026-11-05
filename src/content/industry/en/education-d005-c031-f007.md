---
title: Conversation Records and Traceability for Modern Apprenticeships and Employer-Sponsored Classes: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c031-f007
page_type: 行业问题页
application_area: education
meta_title: Apprenticeships | Chat Records | Versions
meta_description: Apprenticeships: review chat records for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Modern Apprenticeships and Employer-Sponsored Classes: Maintain Document Versions and Changes

## What this category's data looks like

This category's data looks like this: Modern apprenticeship and order class management involves three types of materials: school-enterprise cooperation agreements, order class training plans, and master-apprentice mentoring records. Cooperation agreements contain the cooperation period, positions, number of people, signatures, seals, and dates; training plans contain course modules, rotation arrangements, assessment methods, and version numbers; mentoring records contain the names of the master and apprentice, mentoring dates, process names, quantities, and signed receipts from both parties. The three types of materials come from different sources and have different update rhythms: agreements change by academic year or cooperation cycle, plans change with course and position adjustments, and mentoring records are reported weekly or monthly. When the materials enter the conversation logs and auditing function, each plays a different role: agreements and plans serve as cited sources, while mentoring records serve as process evidence, and all must correspond to the citation information in the conversation records so that a version ledger and change records can be registered manually or by an external system.

## Configuration and implementation checks

Configuration and implementation checks: This step is executed by the conversation record interface (by application and session dimension), which outputs the session message list and total record count, including roles and citation information. The "version ledger and change records" are then completed manually or by an external system. The interface only retrieves session evidence and does not write business ledgers.

| Object | Check | Verification action |
| --- | --- | --- |
| School-enterprise cooperation agreement | The cooperation period, positions, number of people, signatures, seals, and dates are consistent between the agreement and the training plan | Pull session records by `chatId`, and check whether the number of agreement citations and the signature dates correspond to the current version |
| Order class training plan | The course modules, rotation arrangements, assessment methods, and version number are consistent between the plan and the mentoring records | Page through to retrieve all records, check the tokens and array count of the cited text, and confirm that the plan version number is synchronized with the citations |
| Master-apprentice mentoring record | The names of the master and apprentice, mentoring dates, process names, quantities, and signed receipts from both parties are complete | Open a single record to check `dataId` and `value`, and confirm that the mentoring dates and quantities are consistent across the two materials |
| Conversation record interface | The total record count corresponds to response `code` of 200, and the roles and citation information are complete | Pull two pages in succession to compare total and offset, and sample one record to check the role, citations, and duration fields |

## Three common errors

- Symptom: The position names, number of people, and dates for the same record do not match between the agreement and the training plan. Cause: The two materials were revised separately, and cross-checking was not performed against the current version.
- Symptom: The training plan has been updated, but the mentoring records still cite the old course modules. Cause: The version was not synchronized, and the citation information was not updated when the plan changed.
- Symptom: Mentoring records lack the master's signature or the apprentice's receipt, and the agreement lacks a seal date. Cause: The filing step did not collect all signatures and receipts according to the field requirements, and this was only discovered during review.

## How to verify the setup

How to verify the setup: Acceptance for this feature: page through by the total record count to retrieve all records, sample one record to check the role, citation information, and time, and confirm the status code is 200.

Business test: change one piece of content and see whether the version number and citations are updated in sync.

- Pull records by application and session identifier, pull two pages in succession to compare total and offset, and confirm that the record counts are consistent.
- Open a single record to check `dataId`, `value`, and the cited text tokens, register the version ledger, and review the signed receipts.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
