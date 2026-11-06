---
title: Conversation Records and Traceability for Graduate Admissions Interviews and Selection: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c024-f007
page_type: 行业问题页
application_area: education
meta_title: Graduate Admissions | Chat Records | Operations
meta_description: Graduate Admissions: review chat records for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Graduate Admissions Interviews and Selection: Coordinate Operations and Application Handover

## What this category's data looks like

In the graduate admissions re-examination and admission scenario, the materials that enter the conversation logs and auditing stage include three categories: the re-examination plan, the candidate score table, and the transfer list. The re-examination plan contains the major direction, re-examination subjects, weights, and date signature; the candidate score table contains the candidate number, preliminary and re-examination scores, total score, and ranking; the transfer list contains the candidate number, original applied major, proposed transfer major, and confirmation receipt. The three categories of materials come from different offices; the re-examination plan is updated by batch, the score table is updated by session, and the transfer list is updated by round. When entering the conversation record interface, the re-examination plan corresponds to the application dimension, while the score table and transfer list correspond to the session dimension; each retains questions and answers in the form of message records for manual or external system registration, export, and review.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), which outputs the session message list and the total record count, including role and citation information. "Handover-ready deployment status and operation records" are then completed manually or by an external system. The message list is not a version ledger of business materials; it serves only as session evidence.

| Object | Check | Verification action |
| --- | --- | --- |
| Re-examination plan | The major direction, re-examination subjects, weights, and date signature are consistent across all copies of the material | Pull session records by application dimension, check the plan fields and signature column, confirm version synchronization, and check the `chatId` source |
| Candidate score table | The candidate number, preliminary and re-examination scores, total score, and ranking match across the two copies of the material | Pull records by session dimension, check the score fields and dates, confirm there are no missing items, and check `dataId` |
| Transfer list | The candidate number, original applied major, proposed transfer major, and confirmation receipt are complete | Pull records by session dimension, check the list count and receipts, confirm signatures are complete, and check the `value` field |
| Conversation record interface output | The total record count matches the pagination parameters, and role and citation information is visible | Pull two pages consecutively and compare the total record count; sample one record to check the role, citation information, and time; confirm that response `code` of 200 matches the total record count total |

## Three common errors

- Symptom: The same candidate number has mismatched names or counts in the score table and transfer list. Cause: The two materials are registered separately and are not merged and checked by session dimension.
- Symptom: The re-examination plan version is not synchronized, and old weights are still in use. Cause: Application-dimension records are not re-pulled after the plan is updated.
- Symptom: The transfer list lacks a confirmation receipt or signature. Cause: Session records retain only messages; receipts are supplemented by an external system, and items are missed during handover.

## How to verify the setup

This feature acceptance: page through by total record count to retrieve all records, sample one record to check the role, citation information, and time, confirm that response `code` of 200 matches the total record count total, and check the message identifiers and content fields `_id`, `dataId` and `value`.

Business test: check item by item once according to the handover form, and see which record item is missing.

- Check the source of the application and session identifiers in the request parameters, and confirm they are consistent with the actual application and actual session.
- Pull two pages consecutively and compare the total record count and offset, and confirm the pagination parameters match.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
