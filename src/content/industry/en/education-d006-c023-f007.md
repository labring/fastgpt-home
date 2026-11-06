---
title: Conversation Records and Traceability for Student Discipline and Appeals: Track Progress and Check Statistics
slug: /en/industry/education-d006-c023-f007
page_type: 行业问题页
application_area: education
meta_title: Student Appeals | Chat Records | Progress
meta_description: Student Appeals: review chat records for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Student Discipline and Appeals: Track Progress and Check Statistics

## What this category's data looks like

This page addresses student disciplinary and appeal handling scenarios; the core materials are disciplinary fact materials, disciplinary decision documents, and appeal statements. Disciplinary fact materials record the behavior description, date of occurrence, and handler signature; disciplinary decision documents state the type of disciplinary action, the basis clause, the effective date, and the delivery receipt; appeal statements contain the appeal request, reasons, submission date, and acceptance signature. The three types of materials play different roles in progress records and statistical reconciliation: fact materials provide the original record entries, decision documents provide the handling conclusion and effective status, and appeal statements provide follow-up relief and review clues. Materials are collected weekly or monthly, and the update cadence is synchronized with the disciplinary process nodes; field characteristics are concentrated in four categories: name, quantity, date, and signature. The same record may appear separately in the three materials, and field consistency must be compared item by item to ensure that the record count and the statistical count match and that the criteria are written into the header.

## Configuration and implementation checks

This step is performed by the conversation record interface (by application and session dimension), which outputs the session message list and the total record count, including role and reference information. The "progress table and statistical criteria description" is then completed manually or by an external system. The message list is not a version ledger of business materials; it serves only as a source of session evidence.

| Object | Check | Verification action |
| --- | --- | --- |
| Disciplinary fact materials | Whether the name, quantity, date, and signature are consistent with the disciplinary decision document | Take one fact material, compare it against the behavior description, date of occurrence, and handler signature in the decision document, and verify item by item; open a single record returned by the conversation record interface and verify `dataId` and the role field |
| Disciplinary decision documents | Whether the type of disciplinary action, basis clause, effective date, and delivery receipt are complete | Page through to retrieve all conversation records and verify the count against the total record count total; sample one record to verify the reference information and elapsed-time field, then compare it with the decision document fields |
| Appeal statements | Whether the appeal request, reasons, submission date, and acceptance signature are consistent with the progress table | Use `chatId` to locate the session and verify the name and date of the appeal record; check whether the receipt signature is missing and confirm version synchronization |
| Conversation record interface output | Whether the pagination parameters and the number of records match, and whether each message has an identified role | Pull two consecutive pages and compare the offset and total; inspect the order of the two role types, question and answer, in the list, and verify the reference and elapsed-time fields in `value` |

## Three common errors

- Symptom: the name, quantity, and date of the same record do not match between the fact material and the decision document. Cause: the two materials are registered separately, without field-level comparison and version synchronization.
- Symptom: the appeal statement lacks an acceptance signature or receipt, but the progress table still records it as accepted. Cause: signatures and receipts were not included in the verification checklist, and exceptions were not clearly written into the header.
- Symptom: the interface returns empty but there are sessions in the UI. Cause: only the first page was retrieved, or the pagination parameters and total were not aligned, and the exported records lack reference information.

## How to verify the setup

Acceptance of this feature: page through to retrieve all records according to the total record count, sample one record to verify the role, reference information, and time; confirm response `code` of 200, and verify the message identifiers and content fields `dataId`, `chatId`, and `value`.

Business test: use one week of records to verify the totals, and check whether the criteria and exceptions are clearly written; record the reference count separately according to array length, and verify the reference limit against the tokens of the reference text.

- Pull two consecutive pages and compare the offset and total record count to confirm that the pagination parameters and the number of records match and that each message has an identified role.
- Sample one record, open the reference and elapsed-time fields, and compare them against the name, quantity, date, and signature of the disciplinary fact material, disciplinary decision document, and appeal statement.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
