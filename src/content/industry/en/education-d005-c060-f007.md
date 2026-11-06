---
title: Conversation Records and Traceability for Research Project Annual Progress and Acceptance: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c060-f007
page_type: 行业问题页
application_area: education
meta_title: Research Progress | Chat Records | Versions
meta_description: Research Progress: review chat records for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Research Project Annual Progress and Acceptance: Maintain Document Versions and Changes

## What this category's data looks like

This page is for the annual progress and acceptance scenarios of research projects, covering three types of materials: annual progress reports, mid-term review materials, and acceptance reports. Annual progress reports are submitted on an annual cycle, with fields including project name, responsible person, phase tasks, budget execution, and dates; mid-term review materials focus on indicator completion, milestones, and expert opinions; acceptance reports emphasize the list of deliverables, signatures, and receipts. When these three types of materials enter the conversation logs and auditing feature, each serves as an independent evidence source: annual progress reports are used to verify phase tasks and dates, mid-term review materials are used to verify indicators and quantities, and acceptance reports are used to verify signatures and receipts. The update rhythm advances with project milestones; each submission forms a new version, and old versions are retained and traceable. In terms of field characteristics, the four types of fields—names, quantities, dates, and signatures—are most prone to cross-material inconsistency and need to be compared item by item using conversation records.

## Configuration and implementation checks

This step is performed by the conversation record interface (by application and session dimension), outputting a list of session messages and the total number of records, including role and reference information. The "version ledger and change records" are then completed manually or by an external system; the interface itself does not write business ledgers.

| Object | Check | Verification action |
| --- | --- | --- |
| Annual progress report | Names, quantities, and dates align item by item with the mid-term review materials and acceptance report | Pull conversation records by application and session identifier, verify the correspondence between `chatId` and `dataId`, and confirm that the names and dates of the same record are consistent across the three materials |
| Mid-term review materials | Indicator completion and quantities do not conflict in the annual progress report and acceptance report | Paginate to retrieve all conversation records, check the total record count and advance the offset by the number of records retrieved, and sample one record to verify the role field and reference information |
| Acceptance report | Signatures and receipts are complete, the current version is unique, and old versions are traceable | Open a single record to verify the reference and elapsed-time fields in `value`, and confirm that the number of references and the tokens of the reference text are recorded separately |
| Conversation record interface | The total record count is the number of message records, not the same measure as the number of sessions | Pull two pages consecutively and compare total with the offset; when the status code is 200, confirm that roles in the list alternate |

## Three common errors

- Symptom: The names, quantities, and dates of the same record do not match between the annual progress report and the mid-term review materials. Cause: The two materials are maintained separately, and fields were not compared item by item according to conversation records.
- Symptom: The acceptance report has been updated, but the annual progress report still references the old version's content. Cause: Versions were not synchronized, the old version was not marked invalid, and reference relationships were not linked to the version number.
- Symptom: The acceptance report lacks signatures or receipts. Cause: The signature column and receipt records were not verified during material circulation, and no completeness check was performed before submission.

## How to verify the setup

Feature acceptance: paginate to retrieve all records according to the total record count, sample one record to verify the role, reference information, and time, and confirm that the status code is 200 and the list contains both question and answer roles.

Business test: change one piece of content, see whether the version number and references are updated synchronously, and verify the correspondence among the message identifiers and content fields `_id`, `dataId` and `value`.

- Paginate to pull conversation records by application and session identifier, pull two pages consecutively, check the total record count and advance the offset by the number of records retrieved, and confirm that the number of records matches.
- Open a single record to verify the role field, reference field, and elapsed-time field, confirm that the number of references is recorded separately according to array length, and verify the tokens of the reference text separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
