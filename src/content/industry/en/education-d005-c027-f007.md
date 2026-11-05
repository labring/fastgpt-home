---
title: Conversation Records and Traceability for Graduate Employment Contracts and Destination Statistics: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c027-f007
page_type: 行业问题页
application_area: education
meta_title: Graduate Destinations | Chat Records | Versions
meta_description: Graduate Destinations: review chat records for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Graduate Employment Contracts and Destination Statistics: Maintain Document Versions and Changes

## What this category's data looks like

The core materials for university employment signing and graduation destination statistics are employment agreements, graduation destination registration forms, and employer certificates. An employment agreement contains the employer name, unified social credit code, position, signing date, and signatures and seals of both parties; a graduation destination registration form contains the destination category, employer name, reporting date, and the individual's signature; an employer certificate contains the hired position, onboarding date, and the employer's receipt confirmation. These three types of materials are often stored as a mix of scanned copies, tables, and textual descriptions. When they enter the conversation record interface, the question side carries material excerpts and field inquiries, while the answer side carries field comparisons and cited sources, and the session identifier is used to group multiple verifications of the same material into one thread. The update cadence follows signing batches and destination registration milestones, and every supplementary entry or correction must retain traces of the old version. Field characteristics are concentrated in four comparable categories: names, quantities, dates, and signatures.

## Configuration and implementation checks

This part is executed by the conversation record interface (by application and session dimension), outputting a session message list and total record count, including role and citation information. The "version ledger and change records" are then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Employment agreement | The employer name, position, signing date, and signatures of both parties must be consistent with the registration form | Pull all records for that session by `chatId`, and verify whether the employer name excerpted on the question side and the cited source on the answer side point to the same employment agreement |
| Graduation destination registration form | The destination category, reporting date, and individual's signature must match the employment agreement | After paging through to retrieve all records, locate the corresponding answer by `dataId`, and compare whether the registration form date and the employment agreement signing date are the same day |
| Employer certificate | The hired position, onboarding date, and employer receipt confirmation must be consistent with the other two materials | Open a single record and check the citation and elapsed-time fields in `value` to confirm whether the certificate receipt is retained together with the message |
| Conversation record interface | The total record count and the number of items per page must match, and roles must alternate | Pull two consecutive pages and check the total record count and advance the offset by the number of records retrieved; when the status code is 200, confirm that the order of the two role types, question and answer, is normal |

## Three common errors

- Symptom: the same graduate's employer name is written differently in the employment agreement and the registration form. Cause: the two were entered separately, were not backfilled under a unified field name, and the versions were not synchronized.
- Symptom: the employment agreement signing date and the registration form reporting date differ by several days, and the quantities and dates do not match. Cause: only one material was changed during supplementary entry, and the old version was not marked as invalid.
- Symptom: the employer certificate lacks the employer receipt confirmation or the individual's signature. Cause: pages were missing when the scanned copy was uploaded, and only the question-side excerpt was checked during verification.

## How to verify the setup

This feature's acceptance: page through to retrieve all records by total record count, and sample one record to check the role, citation information, and time.

Business test: change one piece of content and see whether the version number and citation are updated synchronously.

- Pull records by application and session identifier, and confirm that the number of returned items matches the total record count and that the status code is 200.
- Sample one record to check the role field, citation count, and elapsed time; record the citation count separately according to the array length.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
