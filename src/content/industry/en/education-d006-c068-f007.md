---
title: Conversation Records and Traceability for Journal Review, Proofreading and Editorial Quality: Track Progress and Check Statistics
slug: /en/industry/education-d006-c068-f007
page_type: 行业问题页
application_area: education
meta_title: Journal Editing | Chat Records | Progress
meta_description: Journal Editing: review chat records for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Journal Review, Proofreading and Editorial Quality: Track Progress and Check Statistics

## What this category's data looks like

This page addresses the journal three-review three-proof and editorial quality scenario. The source materials are three types of editorial process documents: three-review forms, proofs, and proofreading records. They are updated weekly, and their field characteristics include record name, quantity, date, and signature column. Three-review forms carry initial review, re-review, and final review opinions and signatures; proofs carry layout and textual correction traces; proofreading records carry the date and receipt of each proofreading round. When these three types of materials enter the conversation record interface, each is registered as conversation evidence, used as the original voucher for progress records and statistical verification, and does not directly generate a business ledger.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), outputting a session message list and total record count, including role and citation information. The "progress table and statistical scope description" is then completed manually or by an external system. The conversation record interface only retrieves conversation evidence and does not write to a business ledger.

| Object | Check | Verification action |
| --- | --- | --- |
| Three-review form | Fields, dates, and signatures must correspond item by item with the proofs and proofreading records | Paginate by application and session dimension to retrieve all records, verify the records pointed to by `chatId` and `dataId`, and confirm that the initial review, re-review, and final review signature columns and dates have no missing items |
| Proof | The name, quantity, and date of the same record in the three-review form and proofreading record must be consistent | Open a single record to verify the citation and elapsed time fields in `value`, and compare whether the proof version number is synchronized with the version registered in the three-review form |
| Proofreading record | The date and receipt of each proofreading round must be clearly written, and exceptional circumstances must be noted in the header scope | Pull two consecutive pages to compare the total record count total and offset, confirm response `code` of 200, then export the records and check whether the receipt column is complete |
| Progress table and statistical scope description | The record count and statistical count must match, and the scope must be written in the header | Use one week of records to verify the total, compare the total record count total item by item with the statistical scope, and mark exceptions and missing signature items |

## Three common errors

- Symptom: The name and quantity of the same record do not match between the three-review form and the proof. Cause: The two materials are registered separately and are not merged and verified under the same session identifier.
- Symptom: The proof version is not synchronized, and the proofreading record still references the old version. Cause: After the version update, the progress table was not written back, causing a mismatch between date and version.
- Symptom: Records lack signatures or receipts, and the statistical total does not match the record count. Cause: The signature column was not checked item by item during registration, and exceptions were not noted in the header scope.

## How to verify the setup

This feature acceptance: Paginate by total record count total to retrieve all records, sample one record to verify role, citation information, and time, confirm response `code` of 200 and that the number of citation items equals the array length, and record citation text tokens separately.

Business test: Use one week of records to verify the total, check whether the scope and exceptions are clearly written, and confirm that the record count and statistical count match.

- Paginate by application and session dimension, pull two consecutive pages to compare the total record count total and offset, and confirm response `code` of 200.
- Open a single record to verify `_id`, `dataId` and `value`, check the role, citation, and elapsed time fields, and compare the dates and signatures of the three-review form, proof, and proofreading record.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
