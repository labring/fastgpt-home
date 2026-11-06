---
title: Conversation Records and Traceability for Research Project Annual Progress and Acceptance: Track Progress and Check Statistics
slug: /en/industry/education-d006-c060-f007
page_type: 行业问题页
application_area: education
meta_title: Research Progress | Chat Records | Progress
meta_description: Research Progress: review chat records for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Research Project Annual Progress and Acceptance: Track Progress and Check Statistics

## What this category's data looks like

This page addresses the scenario of annual progress and acceptance of research projects; the materials come from three categories: annual progress reports, mid-term review materials, and acceptance reports. Annual progress reports are updated monthly or quarterly, with fields including task name, planned progress, completed quantity, responsible person, and date; mid-term review materials are consolidated before the milestone, with fields including stage objectives, indicator completion values, supporting evidence list, and signature block; acceptance reports are finalized before project closure, with fields including achievement name, quantity, date, acceptance opinion, and signature receipt. When the three categories of materials enter the conversation record interface, each plays a different role: progress reports provide process records, mid-term materials provide the basis for milestone verification, and acceptance reports provide the final conclusion. The conversation record interface pulls by application and session dimensions, returning a session message list and the total record count, including role and citation information, for manual or external system registration, export, and review, forming a progress table and a statistical scope statement.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimensions), outputting a session message list and the total record count, including role and citation information. The progress table and statistical scope statement are then completed by manual or external systems. The total record count is the number of message records, which is not the same quantity as the number of sessions.

| Object | Check | Verification action |
| --- | --- | --- |
| Annual progress report | Fields, dates, and signatures must be aligned item by item with the mid-term review materials and acceptance report; names, quantities, and dates must not have two versions | Pull records by application and session dimensions, check `chatId` and `dataId`, retrieve all pages, then compare total with response `code` of 200 |
| Mid-term review materials | Stage objectives and indicator completion values must be consistent with the progress report's scope; the supporting evidence list and signature block must not have missing items | Open a single record to check the role field, citation, and duration fields, and confirm that message roles correspond to the original conversation |
| Acceptance report | Achievement names, quantities, dates, and signature receipts must be synchronized with the earlier material versions; no unsynchronized versions may appear | Use `value` to view the details of a single record, check the citation text and time item by item, and register the number of items in the record array separately |
| Conversation record interface output | The message list is not a version ledger of business materials; it serves only as session evidence | Pull two consecutive pages and compare the total and offset, confirm that the number of records matches the total, and that the status code is 200 |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the annual progress report and the acceptance report. Cause: The two were registered separately and were not backfilled and checked against the same scope.
- Symptom: The mid-term review materials and acceptance report versions are not synchronized, and signatures or receipts are missing. Cause: The signature page was not returned after finalization, and the version was not locked.
- Symptom: The interface returns empty but there are sessions in the UI, or only the first page is retrieved. Cause: The sources of the application and session identifiers are inconsistent, and the pagination offset was not continued.

## How to verify the setup

This feature's acceptance: retrieve all pages by the total record count, sample one record to check the role, citation information, and time, confirm that total matches response `code` of 200, and check the message identifiers and content fields `_id`, `dataId` and `value`.

Business test: use one week of records to check the totals, see whether the scope and exceptions are clearly stated, and confirm that the record count matches the statistical count and that the scope is written in the header.

- Pull conversation records by application and session dimensions in pages, pull two consecutive pages and compare the total and offset, and confirm that the number of records matches the total.
- Open a single record to check the role field, citation, and duration fields, and register the number of items in the record array and the citation text tokens separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
