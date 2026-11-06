---
title: Conversation Records and Traceability for Peer Review Organization: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c067-f007
page_type: 行业问题页
application_area: education
meta_title: Peer Review | Chat Records | Operations
meta_description: Peer Review: review chat records for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Peer Review Organization: Coordinate Operations and Application Handover

## What this category's data looks like

Peer review organizations' materials fall into three categories: review invitations, expert review comments, and author revision notes. A review invitation contains the manuscript number, invitation date, expert confirmation status, and receipt signature; expert review comments contain the comment body, review date, expert signature, and version number; author revision notes contain point-by-point responses, revision date, author signature, and submission version. When these three categories of materials enter the conversation logs and auditing feature, each plays a different role: review invitations and expert comments serve as the question and answer records in the conversation, while author revision notes serve as subsequent supplementary records. The material source is the session message list exported by the system, and the update cadence is appended round by round according to review rounds and revision batches. Field characteristics center on four items: name, quantity, date, and signature. The same record often shows mismatched name, quantity, and date across two materials, versions not synchronized, and missing signatures or receipts.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), which outputs the session message list and the total record count, including role and reference information. The handover-ready deployment status and operation records must be continued by a human or an external system. The interface only retrieves conversation evidence and does not write to business ledgers.

| Object | Check | Verification action |
| --- | --- | --- |
| Review invitation | The invitation date and expert confirmation status are consistent between the invitation record and the review comments, and the signature or receipt is not missing | Pull records by application and session dimension, check the invitation date and expert confirmation status, page through to retrieve all records, then compare against the total record count total |
| Expert review comments | The comment body, review date, expert signature, and version number match between the comment record and the revision notes | Open a single record to check the role, reference information, and elapsed-time fields; the reference count is recorded separately as the array length |
| Author revision notes | The point-by-point responses, revision date, author signature, and submission version are consistent between the revision notes and the review comments | Check the name, quantity, and date of the revision notes and review comments, and check whether the version number is synchronized |
| Session message list | message roles correspond to the original conversation, the reference and elapsed-time fields are visible, and the total record count matches pagination | Pull two pages in a row to compare the offset and the total record count, and sample one record to check `_id`, `dataId` and `value` |

## Three common errors

- Symptom: The same record shows mismatched name, quantity, and date between the invitation record and the review comments. Cause: The two materials are registered separately and are not merged and checked under the same session identifier.
- Symptom: The version of the author revision notes and the expert review comments is not synchronized, and the revision date and review date are misaligned. Cause: The version number is not updated with the round, and items are not compared one by one at handover.
- Symptom: The review invitation lacks the expert signature or receipt, and the revision notes lack the author signature. Cause: The signature step is not included as a check item in the handover form, and when the total record count does not match, no item-by-item investigation is performed.

## How to verify the setup

Feature acceptance: page through to retrieve all records by the total record count, sample one record to check the role, reference information, and time, confirm the status code is 200, and confirm the total record count total matches pagination.

Business testing: check once item by item according to the handover form to see which record is missing, focusing on the name, quantity, date, and signature of review invitations, expert review comments, and author revision notes.

- Pull records by application and session dimension, pull two pages in a row to compare the offset and the total record count total, confirm the status code is 200, and check that `chatId` is consistent with the actual session.
- Open a single record to check the role, reference information, and elapsed-time fields; the reference count is recorded separately as the array length, and when the reference upper limit is involved, check the tokens of the reference text.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
