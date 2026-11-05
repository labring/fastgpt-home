---
title: Conversation Records and Traceability for Journal Review, Proofreading and Editorial Quality: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c068-f007
page_type: 行业问题页
application_area: education
meta_title: Journal Editing | Chat Records | Operations
meta_description: Journal Editing: review chat records for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Journal Review, Proofreading and Editorial Quality: Coordinate Operations and Application Handover

## What this category's data looks like

This page's material comes from the three-review-three-proof and editorial quality process of journals; the category covers three types of editorial material: three-review forms, proofs, and proofreading records. Three-review forms record the fields, dates, and signatures of the initial review, re-review, and final review; proofs carry the typeset text and layout; proofreading records register errors and corrections round by round. The three types of material reference each other in terms of versions, and the same change often appears in both the proof and the proofreading record. The material is updated by round, each round produces new dates and signatures, and old rounds are retained as historical versions. Field characteristics center on names, quantities, dates, signatures, and receipts; if any one item does not match across two pieces of material, the editorial status of that round is deemed not handover-ready. When the material enters the conversation log and auditing function, the three-review form and the proofreading record serve as business material to be checked, and the proof serves as their counterpart, with each having a different role.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), which outputs the session message list and the total record count, including role and reference information. "Handover-ready deployment status and operation records" are then completed by a human or an external system. The interface only provides session evidence and does not assume the registration responsibility of a business ledger.

| Object | Check | Verification action |
| --- | --- | --- |
| Three-review form | The fields, dates, and signatures of the three-review form must correspond item by item with the proof and the proofreading record; the name, quantity, and date of the same change must be consistent across the three pieces of material | Retrieve all records by application and session dimension, check that `chatId` matches the actual session, page through and compare the total record count total with response `code` of 200, and sample one record to check the role, reference information, and time |
| Proof | The edition, date, and signature of the proof must align with the three-review form and the proofreading record; when the version is not synchronized, it must not enter the next round | Open one record and check the reference and elapsed-time fields, confirm that the proof round corresponds to the session item pointed to by `dataId`, and record the reference count separately by array length |
| Proofreading record | The error name, quantity, date, and correction signature of the proofreading record must be consistent with the proof and the three-review form; a missing signature or receipt is deemed incomplete | View the details of a single record by `value`, check that the two role types, question and answer, appear alternately, and confirm that the total record count is the number of message records, not the number of sessions |
| Session message list | The message list serves only as session evidence, not as the version ledger of business material | Pull two pages in succession and compare the offset and total, check that the tokens of the reference text and the array count are recorded separately, and do not compare the two for equality |

## Three common errors

- Symptom: the name, quantity, or date of the same change does not match between the three-review form and the proofreading record. Cause: the two pieces of material are registered separately, not synchronized by the same round, and the fields are not compared item by item at handover.
- Symptom: the proof has been updated to a new round, while the three-review form still remains at the old version. Cause: the versions are not synchronized, the old-round material is not marked as void, and the handover form does not register the version number and date.
- Symptom: the proofreading record lacks a signature or receipt, making it impossible to determine whether that round is complete. Cause: signatures and receipts are not archived together with the record, and at handover only the quantity is checked, not the signature item.

## How to verify the setup

This function's acceptance: page through by total record count to retrieve all, sample one record to check the role, reference information, and time, confirm that response `code` of 200 and total match, and check that the message identifiers and content fields `_id`, `dataId` and `value` are consistent with the actual session items.

Business test: check item by item once according to the handover form, see which record item is missing, and focus on checking whether the fields, dates, and signatures of the three-review form, proof, and proofreading record are complete.

- Pull two pages in succession by application and session dimension, compare the offset and total record count, and after confirming there are no omissions, export the session message list.
- Open one record, check the role, reference information, and elapsed-time fields, and register the reference count and the tokens of the reference text, recording them separately without comparing for equality.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
