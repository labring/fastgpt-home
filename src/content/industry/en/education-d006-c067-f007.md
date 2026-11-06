---
title: Conversation Records and Traceability for Peer Review Organization: Track Progress and Check Statistics
slug: /en/industry/education-d006-c067-f007
page_type: 行业问题页
application_area: education
meta_title: Peer Review | Chat Records | Progress
meta_description: Peer Review: review chat records for progress tracking. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Peer Review Organization: Track Progress and Check Statistics

## What this category's data looks like

The progress records and statistical reconciliation for peer review organizations draw on three types of materials: review invitations, expert review comments, and author revision notes. A review invitation contains the manuscript number, invitation date, expert name, and receipt signature; expert review comments contain the comment body, submission date, and expert signature; author revision notes contain the revision items, note date, and author signature. The three types of materials enter the progress table and the statistical scope description on a weekly update cadence. The review invitation serves as the starting point of progress, expert review comments serve as the mid-term node, and author revision notes serve as the closing node; each occupies one row in the statistical scope, and the header states the record count, statistical count, and exception items.

## Configuration and implementation checks

This step is performed by the conversation record interface (by application and session dimension), which outputs the session message list and the total record count, including role and citation information. The "progress table and statistical scope description" is then completed by a human or an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Review invitation | The invitation date and receipt signature are registered item by item in the progress table, and the record count matches the statistical count | Page through and retrieve all records by application and session dimension, and check whether the invitation date and receipt signature are complete |
| Expert review comments | The comment body, submission date, and expert signature are consistent in the statistical scope | Open a single record and check the role, citation information, and submission date |
| Author revision notes | The revision items, note date, and author signature correspond item by item with the progress table | Check the number of revision items against the statistical total, and confirm that exception items are written in the header |
| Conversation record interface | the total record count matches the accumulated pagination rows; check the response code separately, and the pagination offsets are continuous | Use the message identifiers and content fields `_id`, `dataId` and `value` to verify record attribution |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the review invitation and the expert review comments. Cause: The two materials are registered separately and are not aligned by the same number.
- Symptom: The version of the author revision notes is not synchronized, and the progress table still points to the old items. Cause: After the revision notes are updated, they are not written back to the statistical scope.
- Symptom: The review invitation lacks a receipt or the expert comments lack a signature, yet the statistical total still includes them. Cause: Exception items are not written in the header.

## How to verify the setup

This feature's acceptance: page through and retrieve all records by the total record count, sample one record to check the role, citation information, and time, and confirm that response `code` of 200 matches the total record count.

Business test: use one week of records to check the total, and see whether the scope and exceptions are clearly stated.

- Page through and retrieve all records by application and session dimension, compare the offsets of two pages with the total record count, and confirm that nothing is missing.
- Open a single record, check the role, citation information, and time, and confirm that the number of citations and the citation text tokens are recorded separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
