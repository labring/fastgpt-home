---
title: Conversation Records and Traceability for Grade Entry and Credit Recognition: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c020-f007
page_type: 行业问题页
application_area: education
meta_title: Grades and Credits | Chat Records | Versions
meta_description: Grades and Credits: review chat records for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Grade Entry and Credit Recognition: Maintain Document Versions and Changes

## What this category's data looks like

This page addresses grade entry and credit recognition scenarios, involving three types of materials: transcripts, deferred examination applications, and make-up examination arrangements. A transcript carries the course name, credits, grade, and signature; a deferred examination application records the course, reason, date, and approval signature; a make-up examination arrangement lists the course, time, location, and receipt. The materials come from academic affairs system exports and manual entry, and the update cadence changes with semester milestones and approval workflows. When the materials enter the conversation records interface, each is retained in paginated form as the question and answer content in a session, the role field distinguishes questions from answers, and the citation and elapsed-time fields are returned with each individual record, providing conversational evidence for the subsequent version ledger and change records.

## Configuration and implementation checks

This step is performed by the conversation records interface (by application and session dimension), which outputs the session message list and the total record count, including role and citation information. The "version ledger and change records" are then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Transcript | The course name, credits, grade, and signature are consistent across the three types of materials, and the current version is unique | Page through by application and session dimension to retrieve everything, check `chatId` and `dataId`, and compare the name and quantity of the same course in the two materials |
| Deferred examination application | The course, reason, date, and approval signature are complete, and the old version is traceable | Open a single record to check the role, citation information, and elapsed time, confirm that the date and signature have no omissions, and that citations are updated in sync |
| Make-up examination arrangement | The course, time, location, and receipt match, and citations are in sync | Pull two pages in succession to compare the total record count total and the offset, and check whether the receipt and signature are updated with the version |
| Conversation records interface | the total record count matches the accumulated pagination rows; check the response code separately, and each message has an identified role | Check the `value` field and the number of citations, record the array length separately, and do not compare the citation text tokens for equality with the count |

## Three common errors

- Symptom: the name and quantity of the same course do not match between the transcript and the make-up examination arrangement. Cause: the two materials are maintained separately, versions are not synchronized, and citations are not updated with the content.
- Symptom: the deferred examination application lacks a signature or receipt, and the approval chain is incomplete. Cause: the signature field was not filled in when the material was routed, and the old version was not archived, making it untraceable.
- Symptom: the interface returns empty but there are sessions in the UI, or only the first page is retrieved. Cause: the sources of the application and session identifiers are inconsistent, and the pagination parameters do not page through to retrieve everything according to the total record count.

## How to verify the setup

This feature's acceptance: page through according to the total record count total to retrieve everything, sample one record to check the role, citation information, and time, and confirm response `code` of 200 and that `_id`, `dataId` and `value` are queryable.

Business test: change one piece of content and see whether the version number and citations are updated in sync.

- Pull two pages in succession to compare the total record count total and the offset, and confirm that the pagination parameters match the number of records.
- Open one record to check the citation and elapsed-time fields, check that the number of citations is the array length, and record the citation text tokens separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
