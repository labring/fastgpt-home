---
title: Conversation Records and Traceability for Journal Review, Proofreading and Editorial Quality: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c068-f007
page_type: 行业问题页
application_area: education
meta_title: Journal Editing | Chat Records | Review
meta_description: Journal Editing: review chat records for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Journal Review, Proofreading and Editorial Quality: Trace Exceptions and Review Results

## What this category's data looks like

This page focuses on the three-review three-proof and editorial quality scenario for journals. The materials come from three types of editorial documents: three-review forms, proofs, and proofreading records. The update cadence advances round by round with manuscript circulation, and each round produces a version with dates and signatures. The three-review form records the fields, dates, and signatures of the initial review, re-review, and final review; the proof carries the content to be checked after typesetting and marks modification traces and receipts; the proofreading record registers proofreading opinions and handling results item by item. When these three types of materials enter the conversation logs and audit function, each has a different role: the three-review form serves as the process node evidence, the proof serves as the base text for content comparison, and the proofreading record serves as the basis for item-by-item checking. Field characteristics center on name, quantity, date, signature, and version number. The same record must keep name, quantity, and date consistent across different materials, with synchronized versions and complete signatures and receipts. Common inconsistencies include mismatches in the name, quantity, and date of the same record in two materials, unsynchronized versions, and missing signatures or receipts.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), which outputs the session message list and the total number of records, including role and reference information. The "anomaly list and review conclusion" is then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Three-review form | Fields, dates, and signatures must align item by item with the proof and proofreading record | Pull records by application and session dimension, check the session message list corresponding to `chatId` and the total record count total, and sample one item to compare the three-review form date and signature |
| Proof | The version number and modification traces must be synchronized with the proofreading record, and receipts must be complete | Pull two pages consecutively and compare the total and offset, open a single record to check the reference and elapsed-time fields, and confirm the correspondence between the proof version and `dataId` |
| Proofreading record | Name, quantity, and date must be consistent with the three-review form and proof, and signatures must not be missing | Open a single record by `value` to check the role, reference information, and time, and compare whether the number of proofreading records matches the quantity in the three-review form |
| Conversation record interface | Returns response `code` of 200 and the total record count total matches pagination | After paging through all records, sample one item to check the role, reference information, and time, and confirm that message roles correspond to the original conversation |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match between the three-review form and the proof. Cause: Field alignment was not done when registering in the two places, the version was not synchronized, and receipts are missing.
- Phenomenon: The proofreading record lacks a signature or receipt, and the anomaly cannot be traced back to the source material. Cause: Signature evidence was not retained during registration, and the reviewer did not sign for confirmation.
- Phenomenon: The interface returns empty but there are sessions in the UI, or only the first page is retrieved. Cause: Pagination parameters were not fully retrieved, and the sources of the application and session identifiers are inconsistent.

## How to verify the setup

Acceptance of this function: page through all records according to the total record count total, sample one item to check the role, reference information, and time, and confirm response `code` of 200 and the correspondence among `_id`, `dataId` and `value`.

Business test: create an anomaly record and see whether it can be traced to the source material.

- Pull two pages consecutively and compare the total record count and offset, confirm that the two role types, question and answer, alternate, and that the reference and elapsed-time fields can be opened for single-record checking.
- Check name, quantity, date, and signature item by item according to the three-review form, proof, and proofreading record, and confirm that versions are synchronized and receipts are complete.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
