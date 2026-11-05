---
title: Conversation Records and Traceability for Vocational Training Subsidy Applications: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c037-f007
page_type: 行业问题页
application_area: education
meta_title: Training Subsidies | Chat Records | Operations
meta_description: Training Subsidies: review chat records for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Vocational Training Subsidy Applications: Coordinate Operations and Application Handover

## What this category's data looks like

The materials for vocational training subsidy claims include training class filing records, attendance records, and completion assessment forms; the three must interlock in fields, dates, and signatures. The class filing record carries the institution, occupation, class session, and start/end dates; attendance records leave a trace per person per day, including name, ID number, and check-in time; the completion assessment form records assessment results, assessor signatures, and the institution's receipt. The materials are submitted by the training institution in stages before the class starts, during training, and after completion, and enter the system with the claim batch, with an update cadence synchronized with class session progress. Attendance records and assessment forms often show the same trainee name, headcount, and date not matching across the two materials; version desynchronization, missing signatures, or missing receipts also occur. After entering this feature, the three types of materials respectively serve as the filing basis, process evidence, and result evidence; conversation logs and auditing only take session-side evidence and do not act as a business ledger for the materials.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), outputting the session message list and total record count, including role and citation information. "Handover-ready deployment status and operation records" are then completed by a human or an external system. During deployment, operations, and application handover, paginate by application and session dimension, and use the message list and total record count as verifiable session evidence.

| Object | Check | Verification action |
| --- | --- | --- |
| Application and session identifiers | Consistent with the actual application and actual session, and able to match the class session name and date in the training class filing record | Check the source of the two identifiers in the request parameters, confirm that `chatId` is taken from the actual session; open a record and check the `dataId` and `value` fields |
| Pagination parameters | The number of records matches the total record count, and the headcount in the attendance records matches the headcount in the assessment form | Pull two consecutive pages and check the total record count and advance the offset by the number of records retrieved, confirm response `code` of 200; align the names, quantities, and dates in the attendance records and completion assessment form item by item |
| Role field | message roles correspond to the original conversation, corresponding to the signature column positions in the attendance records and assessment form | Look at the order of the two role types in the returned list, sample one record and check the role and citation information; check whether the assessor signature and the institution's receipt in the assessment form are complete |
| Citation and duration fields | A single record shows citations and duration; the number of citations and the citation text tokens are recorded separately | Open a record and check the citation and duration fields; the number of citations is recorded by array length, citation text tokens are recorded separately, and no equality comparison is made with the citation content budget |

## Three common errors

- Symptom: the same trainee name, headcount, and date do not match between the attendance records and the completion assessment form. Cause: the two materials are filled in separately, without item-by-item verification against the class session and dates in the class filing record.
- Symptom: the class filing record has already updated the class session, but the attendance records and assessment form still use the old version. Cause: versions are not synchronized, and the materials are not aligned with the filing record's start/end dates when they enter the system.
- Symptom: the completion assessment form lacks the assessor signature or the institution's receipt. Cause: the materials were not checked item by item by field at submission time, and the handover form lacks signature and receipt records.

## How to verify the setup

This feature's acceptance: paginate through all records by total record count, sample one record and check the role, citation information, and time; the number of citations is recorded by array length, citation text tokens are recorded separately, and no equality comparison is made with the citation content budget; confirm response `code` of 200 is consistent with the total record count total.

Business test: check item by item once against the handover form, see which record is missing, and align the fields, dates, and signatures of the class filing record, attendance records, and completion assessment form item by item.

- Paginate by application and session dimension, pull two consecutive pages and compare the total record count with the offset, confirm response `code` of 200, sample one record and check `_id`, `dataId` and `value`, and the citation and duration fields.
- Align the names, headcounts, and dates in the attendance records and completion assessment form item by item, check whether the assessor signature and the institution's receipt are complete, and after registering missing items, hand them over to operations or the next shift.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
