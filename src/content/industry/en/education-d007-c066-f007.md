---
title: Conversation Records and Traceability for Initial Review of Academic Journal Submissions: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c066-f007
page_type: 行业问题页
application_area: education
meta_title: Journal Submissions | Chat Records | Review
meta_description: Journal Submissions: review chat records for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Initial Review of Academic Journal Submissions: Trace Exceptions and Review Results

## What this category's data looks like

This page addresses the preliminary screening of academic journal submissions. The materials include three types: submitted manuscripts, author information forms, and plagiarism check reports. Manuscripts are submitted by authors and contain title, author attribution, affiliation, date, and receipt; author information forms are registered by the editorial office and contain name, order, affiliation, contact information, and signature field; plagiarism check reports are exported by the detection system and contain check number, duplication rate range, check date, and checker. When these three types of materials enter the conversation logs and audit function, their roles differ: the manuscript is the original record source, the author information form is the registration voucher, and the plagiarism check report is the external receipt. In terms of update cadence, manuscripts are replaced with revised versions, author information forms are countersigned along with the acceptance process, and plagiarism check reports are reissued by check batch. Field characteristics are concentrated in four places: name, quantity, date, and signature. If any field does not match between two materials, exception tracing and manual review are triggered.

## Configuration and implementation checks

This step is performed by the conversation record interface (by application and session dimension), which outputs a session message list and total record count, including role and citation information. The "exception list and review conclusion" is then completed manually or by an external system. The interface paginates by application and session dimension, and the returned results distinguish two role types, question and answer, and include citation and elapsed-time fields.

| Object | Check | Verification action |
| --- | --- | --- |
| Submitted manuscript | Title, author attribution, affiliation, date, and receipt are consistent item by item between the manuscript and the author information form; if the name, quantity, or date of the same record does not match, it is treated as an exception | Open a session record, verify `chatId` and `dataId`, and compare the manuscript's first page with the first row of the author information form; after paging through to retrieve all, confirm total and response `code` of 200 |
| Author information form | Name order, affiliation, contact information, and signature field are complete; if the signature or receipt is missing, it is treated as an exception | Page through to retrieve all by total record count, sample one record to verify role, citation information, and time; use `value` to view the content of a single message and compare the signature field and receipt field |
| Plagiarism check report | Check number, duplication rate range, check date, and checker are traceable; if the version is not synchronized or the date does not match, it is treated as an exception | Pull two pages in succession and compare total and offset to confirm the number of records matches the total; verify the tokens and array count of the cited text, and record the two separately |
| Conversation record interface output | The session message list and total record count are complete, message roles correspond to the original conversation, and a single record carries citation and elapsed time | Verify the two identifier sources, application and session, in the request parameters; open one record and verify the citation and elapsed-time fields |

## Three common errors

- Symptom: the author count for the same manuscript does not match between the manuscript and the author information form. Cause: the author information form is countersigned along with the acceptance process, and the manuscript is not updated in sync after revision, so the quantity and date of the two materials diverge.
- Symptom: the check date of the plagiarism check report is inconsistent with the manuscript receipt date. Cause: after the check batch is reissued, it is not backfilled, the version is not synchronized, and the old report is still attached to the original record, pointing to expired material during tracing.
- Symptom: the author information form lacks a signature or receipt, and the review conclusion cannot be written. Cause: the registration step only records fields without going through signature, the exception list lacks support from the original record, and the person responsible cannot handle it.

## How to verify the setup

This function's acceptance: page through to retrieve all by total record count, sample one record to verify role, citation information, and time; confirm total and response `code` of 200, and verify the message identifiers and content fields `_id`, `dataId` and `value`.

Business test: create an exception record and see whether the source material can be traced; compare the name, quantity, date, and signature of the submitted manuscript, author information form, and plagiarism check report to confirm the exception is supported by the original record.

- Paginate by application and session dimension, pull two pages in succession and compare total and offset, confirm the number of records matches the total, and retain citation and elapsed-time fields when exporting.
- Open a single record to verify role order and citation information, register the exception list with the source material number attached, and after the reviewer signs, send it to the person responsible for handling.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
