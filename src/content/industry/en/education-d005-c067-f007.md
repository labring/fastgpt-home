---
title: Conversation Records and Traceability for Peer Review Organization: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c067-f007
page_type: 行业问题页
application_area: education
meta_title: Peer Review | Chat Records | Versions
meta_description: Peer Review: review chat records for version tracking. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Peer Review Organization: Maintain Document Versions and Changes

## What this category's data looks like

This category's data looks like this: Material versioning and change maintenance for peer review organizations revolves around three types of materials: review invitations, expert review comments, and author revision notes. A review invitation contains the manuscript number, the date sent for review, the expert's name, and the invitation receipt; expert review comments contain the review dimensions, conclusion, signature, and submission date; author revision notes contain point-by-point responses, revision locations, and the finalization date. In the conversation record interface, the three types of materials each correspond to different sessions; the questioner and the responder carry the author's notes and the expert's comments respectively, and the citation information points to the manuscript paragraph or the basis for revision. The update cadence advances by review round, with each round forming a version ledger; old versions retain a traceability path, and the current version is unique. Regarding field characteristics, dates, quantities, and signatures are the three places most prone to divergence; when the name, quantity, or date of the same record does not match across two materials, the ledger becomes invalid.

## Configuration and implementation checks

Configuration and implementation checks: This step is performed by the conversation record interface (by application and session dimension), which outputs the session message list and the total record count, including roles and citation information. The "version ledger and change records" are then completed manually or by an external system. The message list is not the version ledger of business materials; it serves only as session evidence for registration, export, and review.

| Object | Check | Verification action |
| --- | --- | --- |
| Review invitation | The manuscript number, date sent for review, expert name, and invitation receipt are consistent across the invitation letter and the receipt | Paginate and pull by application and session dimension, verify that `chatId` matches the actual session, and that the total record count total matches response `code` of 200 |
| Expert review comments | The review conclusion, signature, and submission date are consistent across the comment form and the summary table, and the cited paragraphs can be traced back | After paging through to retrieve everything, sample one record, verify the role field, citation information, and elapsed time, and record `dataId` to facilitate looking up a single record later |
| Author revision notes | The point-by-point responses, revision locations, finalization date, and revised manuscript version number are synchronized, and the old version is traceable | After changing one piece of content, pull again and see whether the version number and citations are updated in sync; record the number of citations separately by array length |
| Version ledger | The current version is unique, old versions retain a traceability path, and citations point to the current version | Verify the version and citation direction in the `value` field, and confirm that the ledger has no divergence from the materials in the three places: dates, quantities, and signatures |

## Three common errors

- Symptom: The expert name and date sent for review for the same record do not match between the invitation letter and the receipt. Cause: The two materials are registered separately, and the current version is not used as the sole source.
- Symptom: The revision notes have been updated, but the review comments still point to paragraphs in the old version. Cause: The versions were not synchronized, and citations were not re-pulled when the content changed.
- Symptom: The comment form lacks a signature or the receipt is missing, yet the ledger still records it as completed. Cause: Signatures and receipts were not included in the version determination, and it was inferred solely from the number of messages.

## How to verify the setup

Acceptance of this feature: Page through to retrieve everything by total record count, sample one record to verify the role, citation information, and time, and confirm that response `code` of 200 is returned and that total matches the offset.

Business test: Change one piece of content, see whether the version number and citations are updated in sync, and whether the old version is still traceable.

- Pull two pages in a row and compare total with the offset to confirm that the number of records matches the total, avoiding retrieving only the first page.
- Open a single record and verify the citation and elapsed time fields to confirm that the exported record is not missing citations.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
