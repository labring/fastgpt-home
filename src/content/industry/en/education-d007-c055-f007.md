---
title: Conversation Records and Traceability for Adult College Entrance Applications and Admissions: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c055-f007
page_type: 行业问题页
application_area: education
meta_title: Adult Admissions | Chat Records | Review
meta_description: Adult Admissions: review chat records for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Adult College Entrance Applications and Admissions: Trace Exceptions and Review Results

## What this category's data looks like

This category's data falls into three types: registration forms, care bonus-point materials, and admission rosters. Registration forms contain the candidate's name, ID number, application level, and signature; care bonus-point materials contain the bonus item, certificate number, review date, and seal; admission rosters contain the admitting institution, major, admission date, and responsible person's signature. The three types of materials are generated in batches at the three nodes of registration, review, and admission, and their update cadence is synchronized with the batches. When entering the conversation logs and auditing feature, registration forms and bonus-point materials serve as the working papers for exception comparison, and admission rosters serve as the basis for result verification; conversation records only provide session evidence and do not replace the business ledger role of any of the three types of materials.

## Configuration and implementation checks

This step is executed by the conversation records interface (by application and session dimension), outputting a session message list and a total record count, including role and reference information. The exception list and review conclusions are then completed manually or by an external system. The total record count is the number of message records, not the number of sessions.

| Object | Check | Verification action |
| --- | --- | --- |
| Registration form | Name, date, and signature are consistent across the three types of materials | Extract the registration form by candidate name and ID number, check the application level and signature, then compare field by field with the bonus-point materials and admission roster |
| Care bonus-point materials | Bonus item, certificate number, and review date are traceable | Open the original bonus-point materials, check the certificate number and seal, and verify whether the review date is earlier than the admission date |
| Admission roster | Admitting institution, major, and date match the registration form | Take one record from the admission roster, trace back to the registration form and bonus-point materials, and confirm there are no conflicts in name, quantity, or date |
| Conversation records | the total record count matches the accumulated pagination rows; check the response code separately | Page through by `chatId` to retrieve all records, open a single record to check the role, reference information, and time, and record the `dataId` and `value` fields |

## Three common errors

- Symptom: the same candidate's name is written differently in the registration form and the admission roster. Cause: entries were not unified by ID number, and the two materials were registered independently.
- Symptom: care bonus-point materials lack a review signature or receipt. Cause: the review step did not synchronize the return, and the version was not synchronized with the registration form.
- Symptom: the bonus-point certificate number cannot be found in the roster. Cause: material versions were not synchronized, and the old certificate was not updated with the batch.

## How to verify the setup

Feature acceptance: page through by total record count to retrieve all records, and sample one record to check the role, reference information, and time; only look at response `code` of 200, and compare the total record count and offset page by page.

Business test: create one exception record and see whether it can be traced back to the source material.

- Pull two consecutive pages by `chatId`, compare the total record count and offset, and confirm there are no omissions or duplicates.
- Open a single record, check the `dataId` and `value` fields, and confirm the reference information and elapsed-time fields are readable.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
