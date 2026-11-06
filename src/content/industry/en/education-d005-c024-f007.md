---
title: Conversation Records and Traceability for Graduate Admissions Interviews and Selection: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c024-f007
page_type: 行业问题页
application_area: education
meta_title: Graduate Admissions | Chat Records | Versions
meta_description: Graduate Admissions: review chat records for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Graduate Admissions Interviews and Selection: Maintain Document Versions and Changes

## What this category's data looks like

In the graduate admissions re-examination and admission scenario, three types of materials—re-examination plans, candidate score tables, and adjustment name lists—each play a different role when they enter the conversation record interface: the re-examination plan serves as the rule basis, the score table provides quantitative data, and the adjustment name list locks down the personnel scope. Material sources are usually finalized documents submitted by departments and system-exported tables, and the update rhythm is concentrated at three nodes: before the re-examination, after the re-examination, and before the proposed admission public announcement. Field characteristics include candidate name, candidate number, preliminary exam total score, re-examination score, total score, ranking, study mode, signature field, and receipt date. The name, quantity, and date of the same record in two materials may be inconsistent; when versions are not synchronized, the old version is still referenced, and a missing signature or receipt makes the material incomplete. In the conversation log and auditing step, records need to be pulled by pagination along the application and session dimensions, distinguishing question and answer roles, and retaining citation and elapsed-time fields, so as to provide session evidence for the version ledger and change records.

## Configuration and implementation checks

This step is executed by the conversation record interface (along the application and session dimensions), outputting a session message list and the total number of records, including role and citation information. The version ledger and change records are then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Re-examination plan | Whether the fields, dates, and signatures are consistent with the current version | Check the plan name, re-examination date, signature field, and receipt date; page through to retrieve all records, and confirm the total record count total and response `code` of 200 |
| Candidate score table | Whether the name, quantity, and date of the same candidate match across the two materials | Compare the candidate number and name, and check whether the preliminary exam total score, re-examination score, total score, and ranking are consistent; open a single record to check the role, citation information, and `dataId` |
| Adjustment name list | Whether the list quantity and date are synchronized with the score table and plan | Check the number of adjustment candidates, adjustment date, and signature receipt; locate records by `chatId` and session identifier, and confirm that the cited text tokens and array item count in `value` are recorded separately |
| Version ledger and change records | The current version is unique, old versions are traceable, and citations are synchronized | After changing one piece of content, check whether the version number and citations are updated synchronously; page through to retrieve all records by total record count, and sample one record to check the role, citation information, and time |

## Three common errors

- Symptom: The name or quantity of the same candidate does not match between the score table and the adjustment name list. Cause: The two materials are maintained separately, and cross-checking by candidate number was not performed.
- Symptom: The re-examination plan has been updated, but the score table still references the old version's date and signature field. Cause: The versions are not synchronized, and the old version record has not been marked invalid.
- Symptom: The adjustment name list lacks a signature or receipt date. Cause: The material circulation step has not completed receipt; although the total record count and response `code` of 200 are normal, business fields are missing.

## How to verify the setup

This feature's acceptance: page through to retrieve all records by total record count, and sample one record to check the role, citation information, and time; confirm the total record count total and response `code` of 200, and check the message identifiers and content fields `_id`, `dataId` and `value`.

Business test: change one piece of content and see whether the version number and citations are updated synchronously.

- Pull records by pagination along the application and session dimensions, pull two consecutive pages and compare the total and offset, and confirm that the number of records matches the total record count.
- Open a single record to check the role field, citation, and elapsed-time fields, confirm that message roles correspond to the original conversation, and that the cited text tokens and array item count are recorded separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
