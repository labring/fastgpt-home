---
title: Conversation Records and Traceability for Peer Review Organization: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c067-f007
page_type: 行业问题页
application_area: education
meta_title: Peer Review | Chat Records | Review
meta_description: Peer Review: review chat records for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Peer Review Organization: Trace Exceptions and Review Results

## What this category's data looks like

This page addresses the exception tracing and manual review scenarios of peer review organizations, involving three types of materials: review invitations, expert review comments, and author revision notes. Review invitations record the invitation time, reviewer, manuscript number, and receipt status; expert review comments record the comment body, submission date, and signature; author revision notes record revision items, version number, and author signature. The material sources are review system exports and correspondence, and the update cadence advances with review rounds; the field characteristic is that names, quantities, and dates across multiple materials need cross-comparison. When entering the conversation logs and auditing feature, the three types of materials serve as citation sources for session evidence, used to locate the original source of anomalous records, and do not serve as a business ledger.

## Configuration and implementation checks

This step is performed by the conversation record interface (by application and session dimension), outputting the session message list and total record count, including role and citation information. The "exception list and review conclusions" are then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Review invitation | The invitation time, reviewer, manuscript number, and receipt status must be consistent with the corresponding fields in the expert review comments | Pull the session by `chatId`, and check whether the dates and names of the invitation record and the comment record align |
| Expert review comments | The comment body, submission date, and signature must correspond to the version number and revision items in the author revision notes | Open a single record to check `dataId` and the citation information, and confirm that the comment source is traceable |
| Author revision notes | The revision items, version number, and author signature must be consistent with the dates and quantities of the review comments | Pull two consecutive pages and check the total record count and advance the offset by the number of records retrieved, to confirm that the revision notes have no missing pages |
| Conversation record interface | Returns response `code` of 200 and the total record count total matches the list length | Use the `value` parameter to view the role, citation, and elapsed time fields of a single record |

## Three common errors

- Symptom: The name and date of the same manuscript do not match across two materials. Cause: The review invitation and the revision notes are registered separately, without cross-checking by manuscript number.
- Symptom: The expert review comment version is not synchronized, and the author revision notes cite an old version. Cause: The version number was not updated with the comments, and the latest record was not retrieved during export.
- Symptom: The review invitation lacks a receipt or the revision notes lack a signature. Cause: Manual registration omissions, and signatures and receipt fields were not checked item by item during review.

## How to verify the setup

Feature acceptance: Page through by the total record count total to retrieve all records, sample one record to check the role, citation information, and time, and confirm that the status code is 200 and the list length matches the total count.

Business test: Create an anomalous record, see whether the source material can be traced, and check the fields, dates, and signatures of the review invitation, expert review comments, and author revision notes.

- Page through and pull session records by `chatId`, check the total record count and advance the offset by the number of records retrieved, and confirm there are no missing pages.
- Open a single record to check `dataId` and the citation information, and check whether the role field and elapsed time field are complete.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
