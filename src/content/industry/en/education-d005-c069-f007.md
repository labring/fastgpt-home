---
title: Conversation Records and Traceability for Journal Publication Licensing and Annual Verification: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c069-f007
page_type: 行业问题页
application_area: education
meta_title: Journal Licensing | Chat Records | Versions
meta_description: Journal Licensing: review chat records for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Journal Publication Licensing and Annual Verification: Maintain Document Versions and Changes

## What this category's data looks like

This page deals with materials for journal publication licenses and annual verification. The materials include journal publication licenses, annual verification forms, and rectification reports, sourced from license decisions, verification receipts, and rectification submissions. The update cadence is concentrated changes after annual verification, and the field characteristics include license number, journal name, sponsoring organization, verification year, signatures, and receipt dates. When the materials enter this feature, the license provides the entity and scope of permission, the annual verification form provides annual data and signatures, and the rectification report provides rectification items and receipts; together, the three support the version ledger and change records.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), outputting a session message list and total record count, including role and citation information. The "version ledger and change records" are then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Journal publication license | License number, journal name, sponsoring organization, signatures, and dates are consistent between the license and the annual verification form | Compare the license and the annual verification form for license number, journal name, sponsoring organization, and signature dates; if inconsistent, record the discrepancy |
| Annual verification form | Verification year, journal name, quantity, dates, and signatures are consistent between the annual verification form and the rectification report | Compare the annual verification form and the rectification report for verification year, journal name, quantity, dates, and signatures; if signatures or receipts are missing, flag them |
| Rectification report | Rectification items, receipt dates, and signatures are consistent between the rectification report and the annual verification form | Compare the rectification report and the annual verification form for rectification items, receipt dates, and signatures, and check whether receipts are complete |
| Conversation records | Paginated retrieval by application and session dimension; total record count, roles, and citation information are verifiable | Use `chatId` and `dataId` to locate records, retrieve all pages, and verify roles, citation information, and timestamps; response `code` of 200 should match the total record count total |

## Three common errors

- Symptom: The journal name, quantity, or date for the same record does not match between the license and the annual verification form. Cause: The two materials are registered separately, and cross-checking against the current version was not performed.
- Symptom: Old-version materials are still referenced, and the version number and references are not updated in sync. Cause: After changing one piece of content, the version ledger was not written back, and references still point to the old version.
- Symptom: The annual verification form or rectification report lacks signatures or receipts. Cause: The submission and receipt steps were not closed-loop, and signature and receipt fields were not checked during registration.

## How to verify the setup

Feature acceptance: Retrieve all pages by total record count, and sample one record to verify roles, citation information, and timestamps; use `_id`, `dataId` and `value` to locate it, and confirm that response `code` of 200 matches the total record count total.

Business test: Change one piece of content and see whether the version number and references are updated in sync.

- Paginate by application and session dimension, retrieve two consecutive pages, and compare the total record count and offset to confirm that only the first page was not retrieved.
- Sample one record to verify the role field, citations, and elapsed-time field, and confirm that message roles correspond to the original conversation and citation information is complete.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
