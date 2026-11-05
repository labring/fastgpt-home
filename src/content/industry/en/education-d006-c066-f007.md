---
title: Conversation Records and Traceability for Initial Review of Academic Journal Submissions: Track Progress and Check Statistics
slug: /en/industry/education-d006-c066-f007
page_type: 行业问题页
application_area: education
meta_title: Journal Submissions | Chat Records | Progress
meta_description: Journal Submissions: review chat records for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Initial Review of Academic Journal Submissions: Track Progress and Check Statistics

## What this category's data looks like

The progress records and statistical reconciliation for initial review of academic journal submissions draw on three types of materials: submitted manuscripts, author information forms, and plagiarism check reports. The manuscript carries the title, author affiliation, and receipt date; the author information form carries the order of authorship, contact details, and signature field; the plagiarism check report carries the check number, duplication rate conclusion, and receipt. When the three enter the conversation log feature, each is pulled page by page as conversation evidence and does not take on ledger duties. The update cadence rolls weekly: once a week there is a fixed submission registration, checking item by item whether material names, quantities, and dates are consistent, then merging into the monthly report. Field characteristics center on five points: manuscript number, author name, receipt date, plagiarism check number, and signature or receipt status. If any field fails to match between two materials, a review is triggered.

## Configuration and implementation checks

This step is executed by the conversation log interface (by application and session dimension), outputting a list of session messages and the total record count, including role and citation information. The progress table and statistical scope description are then completed manually or by an external system, on that basis registering, exporting, and reviewing.

| Object | Check | Verification action |
| --- | --- | --- |
| Submitted manuscript | Manuscript number, receipt date, and author order are consistent between the manuscript and the author information form, and the signature or receipt is not missing | Pull page by page by application and session dimension, check that `chatId` matches the actual session, and sample one record to compare role and citation information |
| Author information form | Author name, affiliation, and contact details align item by item with the manuscript authorship, and the version is synchronized with the receipt date | Pull two consecutive pages to compare the total record count and offset, confirm that `dataId` corresponds to a single record, and check whether the date field is consistent with the manuscript |
| Plagiarism check report | The check number, conclusion date, and receipt status match between the report and the progress table, and the citation count is recorded separately | Open one record to check the citation and elapsed-time fields, register the tokens of the citation text and the array count separately, and do not compare the two for equality |
| Progress table and statistical scope description | The total record count matches the statistical count, the scope is written in the header, and exceptional cases are written out item by item | Use one week of records to check the total, register response `code` of 200 and the total record count total at the same time, and page continuously by offset to retrieve all |

## Three common errors

- Symptom: the name, quantity, and date of the same manuscript do not match between the progress table and the author information form. Cause: the two materials are registered separately, no backfill check by manuscript number is performed, and the scope is not written in the header.
- Symptom: the plagiarism check report version is not synchronized, and a missing receipt is still counted as initially reviewed. Cause: records are not re-pulled after the report is updated, and the signature or receipt status is not marked in the progress table.
- Symptom: the interface returns empty but there are sessions in the UI, or only the first page is retrieved. Cause: pagination parameters and offset are not paged continuously, and the total record count is not reconciled with the statistical count.

## How to verify the setup

Feature acceptance: page through by total record count to retrieve all, sample one record to check role, citation information, and time, confirm that the message identifiers and content fields `_id`, `dataId` and `value` are consistent with the record, and register response `code` of 200 and the total record count total at the same time.

Business testing: use one week of records to check the total, see whether the scope and exceptions are clearly written, whether the record count matches the statistical count, and whether the scope is written in the header.

- Page continuously by application and session dimension, compare the total record count and offset of two pages, and confirm that the number of records matches the total.
- Sample one record, open the citation and elapsed-time fields, register the citation count and the tokens of the citation text, and record them separately without comparing for equality.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
