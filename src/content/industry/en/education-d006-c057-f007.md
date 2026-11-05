---
title: Conversation Records and Traceability for National Key Research and Development Applications: Track Progress and Check Statistics
slug: /en/industry/education-d006-c057-f007
page_type: 行业问题页
application_area: education
meta_title: National R&D Grants | Chat Records | Progress
meta_description: National R&D Grants: review chat records for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for National Key Research and Development Applications: Track Progress and Check Statistics

## What this category's data looks like

National Key R&D Program project applications involve three types of materials: the project application, the budget application, and the cooperation agreement. The project application contains the research content, assessment indicators, participating units, and signature page; the budget application contains subject amounts, sources, and calculation bases; the cooperation agreement contains partner names, task division, funding allocation, and signing date. The three types of materials undergo multiple rounds of iteration during the application period, with frequent version updates and varying fields and signature statuses. When the materials enter the conversation log feature, the project application and budget application serve as the basis for progress records and statistical verification, while the cooperation agreement serves as the basis for verifying participants and dates. The update cadence is aggregated weekly or monthly to verify whether the record count and statistical count are consistent.

## Configuration and implementation checks

This step is performed by the conversation log interface (by application and session dimension), outputting a session message list and total record count, including role and reference information. The progress table and statistical scope description are then completed manually or by an external system, for inclusion in weekly or monthly reports.

| Object | Check | Verification action |
| --- | --- | --- |
| Project application | Name, quantity, date, and signature page must be consistent with the budget application and cooperation agreement | Verify the name, quantity, and date of the same record across the three materials; check whether the signature page and receipt are complete and whether versions are synchronized |
| Budget application | Subject amounts, sources, and calculation bases must correspond to the project application and cooperation agreement | Compare subject amounts and task division item by item; verify signing dates and version numbers, and confirm there are no missing signatures or receipts |
| Cooperation agreement | Partner names, task division, funding allocation, and signing date must be consistent with the application materials | Verify partner names and task division; check funding allocation and dates; confirm signatures and receipts are complete |
| Conversation log interface | The total record count must match the number of items retrieved after pagination, and role and reference information must be verifiable | Paginate by `chatId`, compare total with offset; sample one record to verify role, reference, and duration; `dataId` and `value` are used to locate a single record |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the project application and the budget application. Cause: The two materials were modified separately and submitted without cross-verification.
- Symptom: The cooperation agreement version is not synchronized, and the signature page is still the old version. Cause: After the version update, the signature page was not replaced, and the receipt was not collected.
- Symptom: The interface returns empty but there are sessions in the UI. Cause: The application and session identifiers come from inconsistent sources, or pagination only retrieved the first page.

## How to verify the setup

Feature acceptance: Paginate through all records by total, sample one record to verify role, reference information, and time; confirm response `code` of 200, and that `_id`, `dataId` and `value` can locate a single record.

Business test: Use one week of records to verify the totals, and check whether the scope and exceptions are clearly stated; record the reference count by array length, verify reference text tokens separately, and do not compare them for equality with `quoteMaxToken`.

- Paginate by application and session identifiers, pull two consecutive pages and compare total with offset, and confirm the record count matches the total.
- Open one record to verify the role field, reference, and duration fields, and confirm that message roles correspond to the original conversation.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
