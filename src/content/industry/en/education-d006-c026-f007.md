---
title: Conversation Records and Traceability for Degree Awards and Certificate Information Reporting: Track Progress and Check Statistics
slug: /en/industry/education-d006-c026-f007
page_type: 行业问题页
application_area: education
meta_title: Degree Certificates | Chat Records | Progress
meta_description: Degree Certificates: review chat records for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Degree Awards and Certificate Information Reporting: Track Progress and Check Statistics

## What this category's data looks like

This page addresses the scenario of degree conferral and certificate information reporting. The materials include three types: degree application forms, thesis review forms, and defense resolutions. The degree application form carries the applicant's basic information and degree category; the thesis review form carries the review conclusion and review date; the defense resolution carries the defense conclusion, voting result, and signature. Before reporting, the three types of materials need to be aggregated by batch, with an update cadence typically of weekly collection and monthly verification. Field characteristics are concentrated in four categories: name, quantity, date, and signature. For the same record, the name, quantity, and date in the two types of materials must be consistent, versions must be synchronized, and signatures and receipts must be complete. When the materials enter the conversation record interface, each is pulled in pages as session evidence for registration and review, and does not directly serve as a business ledger.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), outputting a session message list and total record count, including role and citation information. The "progress table and statistical scope description" is then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Degree application form | Name, quantity, date, and signature must be consistent with the thesis review form and defense resolution | Compare the name, quantity, and date of the three types of materials one by one by batch, and check whether the signature field and receipt are complete |
| Thesis review form | The review conclusion and review date must align with the conclusion and date in the defense resolution | Extract the same record, check the conclusion and date in the review form and defense resolution, and confirm version synchronization |
| Defense resolution | The voting result, defense date, and signature must be complete, and the receipt must not be missing | Check the resolution signature and receipt, and verify whether the name and quantity are consistent with the degree application form |
| Conversation record interface | The total record count total matches response `code` of 200, and pagination retrieves all records | Pull by application and session in pages, pull two consecutive pages to compare total and offset, and sample one record to check role, citation information, and time |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the degree application form and the defense resolution. Cause: The two materials were registered separately, without one-by-one comparison and version synchronization.
- Symptom: The conclusion and date in the thesis review form and defense resolution are inconsistent. Cause: Versions were not synchronized, and changes were not written back to the other material.
- Symptom: The defense resolution lacks a signature or receipt. Cause: The signature step was not closed-loop, the receipt was not archived, and it cannot be confirmed during verification.

## How to verify the setup

Acceptance of this feature: paginate through all records by total record count total; when response `code` of 200, sample one record to check role, citation information, and time; record the citation count separately by array length, verify the tokens of the citation text separately, and do not compare it for equality with the citation content budget.

Business test: use one week of records to verify the totals, and see whether the scope and exceptions are clearly stated.

- Pull by application and session in pages, pull two consecutive pages to compare total and offset, and confirm that the number of records matches the total.
- Extract one record, check the role field, citation information, and elapsed time, and check whether the message identifiers and content fields `_id`, `dataId` and `value` are traceable.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
