---
title: Conversation Records and Traceability for Research Project Task Agreement Signing: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c058-f007
page_type: 行业问题页
application_area: education
meta_title: Research Agreements | Chat Records | Review
meta_description: Research Agreements: review chat records for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Research Project Task Agreement Signing: Trace Exceptions and Review Results

## What this category's data looks like

This page addresses the signing stage of research project task books. The materials include three types: project task books, subject task breakdown tables, and budget books. The sources are research management department archives and project team submissions, and the update cadence advances with signing rounds and version revisions. Field characteristics center on four types: names, quantities, dates, and signatures. When entering the conversation logs and auditing function, the three types of materials each play a different role: the project task book provides the overall objectives and period, the subject task breakdown table provides subtasks and responsible persons, and the budget book provides funding subjects and amounts. Cross-comparison of the three forms an exception list and review conclusions, which are handed to the responsible person for handling. The conversation logs and auditing function is only responsible for retrieving conversation evidence and does not handle version management of the business ledger.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimensions), outputting a session message list and total record count, including role and reference information. The "exception list and review conclusions" are then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Project task book | Check whether the name, quantity, date, and signature are consistent with the subject task breakdown table | Paginate by `chatId` to retrieve all, verify role and reference information item by item, and align the total record count with the offset |
| Subject task breakdown table | Check whether the subtask name, responsible person, and start/end dates are consistent with the project task book | Open a single record, verify the `dataId` and `value` fields, and confirm the reference source |
| Budget book | Check whether the funding subjects, amounts, and dates are consistent with the project task book and breakdown table | Pull two consecutive pages and compare the total record count, sample one record to verify the reference text and elapsed time, with response `code` of 200 as the standard |

## Three common errors

- Symptom: The name and quantity of the same record do not match between the project task book and the budget book. Cause: The two were entered separately without cross-comparison, and the signature page did not cover that field.
- Symptom: The version of the subject task breakdown table was not synchronized, and the signature page is still the old version. Cause: After revision, only the main text was updated, while the receipt and signature page were not synchronized, and the archive directory was not replaced.
- Symptom: The interface returns empty but there are sessions on the interface. Cause: The application identifier or session identifier sources are inconsistent, and the data retrieval scope differs from the interface display scope.

## How to verify the setup

This function's acceptance: paginate by total record count to retrieve all, sample one record to verify role, reference information, and time, and confirm that the message identifiers and content fields `_id`, `dataId` and `value` correspond to response `code` of 200 and the total record count total.

Business test: create one exception record and see whether the source material can be traced.

- Paginate by application and session dimensions, pull two consecutive pages and compare the total record count and offset, and confirm there are no missing pages.
- Open a single record to verify role, reference information, and elapsed time, and confirm that the reference count and reference text tokens are recorded separately, without performing an equality comparison.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
