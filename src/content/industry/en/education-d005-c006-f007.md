---
title: Conversation Records and Traceability for Kindergarten Operations and Quality Self-Assessment: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c006-f007
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Quality | Chat Records | Versions
meta_description: Kindergarten Quality: review chat records for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Kindergarten Operations and Quality Self-Assessment: Maintain Document Versions and Changes

## What this category's data looks like

This page addresses the scenario of kindergarten operation behavior and quality self-assessment. Materials include three categories: self-assessment reports, issue lists, and rectification plans. Self-assessment reports are produced by semester or academic year, with fields including indicator name, self-assessment conclusion, date, and signature; issue lists record issue descriptions, responsible persons, and rectification deadlines item by item; rectification plans correspond to measures, completion dates, and receipts. The three types of materials often cross-reference the same record, and names, quantities, and dates must be consistent. When materials enter the conversation record function, self-assessment reports and issue lists serve as question-side inputs, while rectification plans and review opinions serve as answer-side outputs, each retaining role and reference information for subsequent version ledger registration.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), outputting a session message list and total record count, including role and reference information. The "version ledger and change records" are then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Self-assessment report | The indicator name, self-assessment conclusion, date, and signature are consistent throughout the report, and when referencing the same record as the issue list, the name, quantity, and date match | Pull records by application and session identifier, verify the question-side content in the role field against the report fields; compare the name, quantity, and date of the same record in the report and the list |
| Issue list | The issue description, responsible person, and rectification deadline are consistent with the corresponding entry names, quantities, and dates in the rectification plan, with no missing signature or receipt | Page through to retrieve all records, compare the number of entries using the total record count and offset; open a single entry to verify reference information and time-consuming fields, confirming that list entries correspond to plan entries |
| Rectification plan | Measures, completion dates, and receipts are complete, the current version is unique, old versions are traceable, and references are updated synchronously | After changing one piece of content, re-pull and verify whether the version number and references are synchronized; check that old version records can still be traced to the corresponding session and message |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the self-assessment report and the issue list. Cause: The two materials are registered separately and are not verified against the same session record as the baseline.
- Symptom: The rectification plan has been updated, but the self-assessment report still references the old version. Cause: The version was not synchronized; the old version is traceable but the current version was not marked.
- Symptom: The issue list lacks a signature or receipt, and the rectification plan cannot be closed. Cause: During registration, signatures and receipts were not reviewed as required fields.

## How to verify the setup

Acceptance of this function: page through by total record count to retrieve all records, sample one record to verify role, reference information, and time; verify request parameters for application and session identifiers, return response `code` of 200, the total record count total matches the number of list entries, and a single record contains `_id`, `dataId` and `value`.

Business test: change one piece of content and see whether the version number and references are updated synchronously.

- Page through by application and session identifier, pull two consecutive pages and compare the total record count and offset, confirming that only the first page was not retrieved.
- Open a single record to verify the role field and reference information, confirming that message roles correspond to the original conversation, and that the number of references is recorded separately by array length.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
