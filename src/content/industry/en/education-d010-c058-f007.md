---
title: Conversation Records and Traceability for Research Project Task Agreement Signing: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c058-f007
page_type: 行业问题页
application_area: education
meta_title: Research Agreements | Chat Records | Operations
meta_description: Research Agreements: review chat records for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Research Project Task Agreement Signing: Coordinate Operations and Application Handover

## What this category's data looks like

This category's data covers three types of materials involved in the signing of research project task books: the project task book, the subject task breakdown table, and the budget book. The project task book states the project name, undertaking unit, start and end dates, and signatures; the subject task breakdown table lists subject numbers, responsible persons, and task milestones; the budget book lists budget items, amounts, and preparation dates. The materials are provided separately by the research management department and the research group, updated at the signing milestone, and signatures and receipts are added as the process proceeds. When entering the conversation logs and auditing function, the project task book serves as the master record anchoring the project identifier, the subject task breakdown table provides the basis for task-level breakdown, and the budget book provides the resource scope. The fields, dates, and signatures of the three must correspond item by item on the handover form; if any material version is not synchronized, or names, quantities, or dates do not match, the handover-ready deployment status and operation records cannot be closed out.

## Configuration and implementation checks

This step is performed by the conversation record interface (by application and session dimension), which outputs the session message list and the total record count, including role and reference information. The handover-ready deployment status and operation records are then completed manually or by an external system. The interface only retrieves conversation evidence and does not write to business ledgers.

| Object | Check | Verification action |
| --- | --- | --- |
| Project task book | The project name, undertaking unit, start and end dates, and signatures must correspond to the subject task breakdown table and the budget book | Pull records by application and session identifier, verify the role order of the returned list and the total record count total, and check response `code` of 200 |
| Subject task breakdown table | The subject number, responsible person, and task milestones are consistent with the dates in the project task book, and signatures or receipts are not missing | Compare the offset and total across pages, open one record to verify the reference and elapsed-time fields, and confirm that `chatId` matches the actual session |
| Budget book | The budget items, amounts, and preparation dates match the project task book and the subject task breakdown table, and versions are synchronized | Verify item by item against the handover form, sample one record to inspect `dataId` and reference information, and record the number of array entries and the tokens of the reference text |
| Conversation record interface output | The session message list and total record count are handover-ready, and role and reference information are complete | Pull two pages consecutively and compare the total and offset, verify the `value` field, and confirm that the total record count is the number of message records |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the project task book and the subject task breakdown table. Cause: The two materials are maintained separately, and fields and dates were not checked uniformly at the signing milestone.
- Symptom: The budget book version is not synchronized, and the amounts and budget items on the handover form are inconsistent with the project task book. Cause: After budget adjustments, the task book was not written back, and the version was not synchronized into the handover process.
- Symptom: The interface returns empty but there are sessions in the interface, and the exported records lack references. Cause: Only the first page was retrieved, or paging was not performed fully by application and session dimension, and the reference fields were not exported with the records.

## How to verify the setup

This function's acceptance: page through to retrieve all records by total record count, sample one record to verify the role, reference information, and time, confirm response `code` of 200, and check the fields corresponding to the message identifiers and content fields `_id`, `dataId` and `value`.

Business test: check item by item against the handover form once, see which record is missing, and confirm that the version, connection, and task records are consistent.

- Pull two pages consecutively by application and session dimension, compare the offset and the total record count total, and confirm that the number of message records is fully retrieved.
- Open one record to verify the role, reference, and elapsed-time fields, record the number of entries in the reference array, and separately verify the tokens of the reference text.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
