---
title: Conversation Records and Traceability for School Teacher Training Credits: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c013-f007
page_type: 行业问题页
application_area: education
meta_title: Teacher Credits | Chat Records | Operations
meta_description: Teacher Credits: review chat records for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for School Teacher Training Credits: Coordinate Operations and Application Handover

## What this category's data looks like

This category's data involves three types of materials: training notices, credit recognition forms, and participant rosters. Training notices come from the education authority or the school's academic affairs office, and contain the training name, start and end dates, credit hours, and signatures/seals; credit recognition forms are compiled by the teacher development center, and contain teacher names, ID numbers, training programs, recognized credits, and review signatures; participant rosters are provided by the organizing institution, and contain participant names, units, sign-in dates, and receipts. The update cadence rolls forward by training batch, with centralized submission after each batch ends. When the materials enter the conversation logs and auditing feature, training notices are used to verify programs and dates, credit recognition forms are used to verify credit amounts and signatures, and participant rosters are used to verify personnel and receipts. The fields, dates, and signatures of the three must be consistent; common inconsistencies are when the name, quantity, or date of the same record does not match across two materials, versions are not synchronized, or signatures or receipts are missing.

## Configuration and implementation checks

This part is executed by the conversation record interface (by application and session dimension), which outputs the session message list and the total record count, including role and reference information. "Handover-ready deployment status and operation records" are then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Training notice | The training name, start and end dates, and credit hours in the notice must be consistent with the corresponding program in the credit recognition form | Verify the program name, dates, and credit hours in the notice and the recognition form; check whether signatures and receipts are complete |
| Credit recognition form | The number of recognized credits matches the number of people in the participant roster, and review signatures are not missing | Verify names, credits, and signatures person by person; compare the number of people in the roster with the number of records in the recognition form |
| Participant roster | The names, units, sign-in dates, and receipts in the roster must be consistent with the notice and the recognition form | Verify sign-in dates and receipts item by item against the roster; check whether the name, quantity, and date of the same record are consistent across the two materials |
| Conversation record interface | Paginate and pull by application and session dimension, returning the total record count and role and reference information | Use `chatId` and the session identifier to verify the source; page through and compare total with the offset; open a record to verify the role, reference, and duration fields |

## Three common errors

- Symptom: The name and credit hours of the same teacher do not match between the training notice and the credit recognition form. Cause: The two materials are entered separately, no cross-check is done, and versions are not synchronized.
- Symptom: The number of people in the participant roster is inconsistent with the number of records in the credit recognition form. Cause: The recognition form was not written back after the roster was updated, or sign-in dates and receipts are missing.
- Symptom: The interface returns empty but there are sessions in the UI, or only the first page is retrieved. Cause: The source of `chatId` and the session identifier are inconsistent, or the pagination parameters do not page through all records according to the total record count.

## How to verify the setup

Feature acceptance: page through all records according to the total record count, and sample one record to verify the role, reference information, and time; verify with `_id`, `dataId` and `value`; response `code` of 200 and the total record count total must be consistent.

Business test: verify item by item once according to the handover sheet, and see which record is missing.

- Use `chatId` and the actual session identifier to verify the source, page through two pages and compare the total record count with the offset, and confirm all records are retrieved.
- Open a record to verify the role, reference information, and duration fields; record the number of references separately by array length, and do not compare reference text tokens with `quoteMaxToken` for equality.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
