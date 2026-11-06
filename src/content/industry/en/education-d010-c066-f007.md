---
title: Conversation Records and Traceability for Initial Review of Academic Journal Submissions: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c066-f007
page_type: 行业问题页
application_area: education
meta_title: Journal Submissions | Chat Records | Operations
meta_description: Journal Submissions: review chat records for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Initial Review of Academic Journal Submissions: Coordinate Operations and Application Handover

## What this category's data looks like

This category covers three types of materials: submitted manuscripts, author information tables, and plagiarism check reports. Fields include manuscript number, title, author name, affiliation, submission date, plagiarism check conclusion, and signature field. The materials are exported from the editorial system or manually compiled and then entered into the conversation logs and auditing function. Manuscripts and plagiarism check reports are used to verify record content, while author information tables are used to verify authorship and contact details. All three are grouped by the same manuscript number. The update cadence advances with initial review batches; each submission registration, plagiarism check receipt, and initial review opinion forms a timeline. The field characteristic is that the same record appears repeatedly across the manuscript, author table, and plagiarism check report. Names, quantities, and dates must be compared item by item, and versions and signature receipts determine whether the process can move to the next stage.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), which outputs a session message list and total record count, including role and citation information. The handover-ready deployment status and operation records are completed manually or by an external system. The interface only retrieves conversation evidence and does not write to business ledgers.

| Object | Check | Verification action |
| --- | --- | --- |
| Conversation record interface output | The total record count matches the pagination offset, and the role field matches the original conversation between question and answer | Use `chatId` to pull pages by application and session dimension, pull two consecutive pages and compare total with the offset, open one record and check the role, citation, and duration fields |
| Submitted manuscript | The manuscript number, title, submission date are consistent with the author information table and plagiarism check report | Check the names, quantities, and dates of the three materials item by item by manuscript number, and check whether the signature field is complete |
| Author information table | Author names, affiliations, and authorship order are consistent with the manuscript and plagiarism check report | Compare against the author fields on the manuscript first page and the plagiarism check report, and check whether names, affiliations, and dates match |
| Plagiarism check report | The plagiarism check conclusion and receipt date are synchronized with the manuscript version | Check the report version number against the manuscript version number, and check whether the receipt signature and plagiarism check date are missing |

## Three common errors

- Symptom: The number of authors for the same manuscript does not match between the manuscript and the author information table. Cause: The two materials are registered separately, and authorship order and author count were not reviewed against the same manuscript number.
- Symptom: The plagiarism check report date and the manuscript submission date cross versions. Cause: The plagiarism check report was not updated in sync after the manuscript was revised, and the versions were not synchronized, causing the dates to mismatch.
- Symptom: The handover form is missing a signature or receipt. Cause: The initial review opinion and plagiarism check conclusion do not include a signature field, so the responsible person and time cannot be confirmed at handover.

## How to verify the setup

Feature acceptance: page through to retrieve all records by total record count, sample one record to check the role, citation information, and time, and confirm that the message identifiers and content fields `_id`, `dataId` and `value` are consistent with response `code` of 200 and the total record count total.

Business test: check once item by item against the handover form, see which record item is missing, and verify the fields, dates, and signatures of the manuscript, author information table, and plagiarism check report.

- Pull conversation records by application and session dimension with pagination, pull two consecutive pages and compare the total record count with the offset, and confirm that the returned list distinguishes question and answer roles.
- Open a single record to check the citation and duration fields, and compare the names, quantities, dates, and signatures of the submitted manuscript, author information table, and plagiarism check report by manuscript number.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
