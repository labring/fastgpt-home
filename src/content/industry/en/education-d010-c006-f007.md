---
title: Conversation Records and Traceability for Kindergarten Operations and Quality Self-Assessment: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c006-f007
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Quality | Chat Records | Operations
meta_description: Kindergarten Quality: review chat records for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Kindergarten Operations and Quality Self-Assessment: Coordinate Operations and Application Handover

## What this category's data looks like

This page addresses kindergarten operation behavior and quality self-assessment materials, including three categories: self-assessment reports, issue lists, and rectification plans. Self-assessment report fields include operating conditions, safety and hygiene, care and education, faculty and staff, and internal management, with a date and the principal's signature attached; issue list fields include issue description, responsible department, and rectification deadline, with a date and the responsible person's signature attached; rectification plan fields include measures, completion time, and acceptance inspector, with a date and signature attached. The material sources are kindergarten self-entry, submission by responsible departments, and external review receipts, and the update cadence is self-assessment at the start of the semester, rectification during the semester, and review at the end of the semester. When the materials enter the conversation logs and auditing feature, the self-assessment report is cited as conversation evidence, the issue list is used to check the number of records, and the rectification plan is used to compare dates and signatures; the three have different roles.

## Configuration and implementation checks

This step is performed by the conversation record interface (by application and session dimension), which outputs the session message list and the total record count, including role and citation information. "Handover-ready deployment status and operation records" are then completed by a human or an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Self-assessment report | The issue names, quantities, and dates in the report correspond one by one with the issue list, and signatures and receipts are complete | Pull records by application and session identifier, and check whether the number of report citations matches the number of issue list entries |
| Issue list | The rectification deadlines and responsible departments in the list correspond item by item with the rectification plan, and dates do not conflict | Pull two pages in succession to compare the total record count and offset, and check whether the list citations are complete |
| Rectification plan | The measures, completion times, and acceptance inspectors in the plan are consistent with the review receipts, and versions are synchronized | Open a single record to check the role, citation, and elapsed-time fields, and confirm signatures and receipts |
| Conversation record interface | The returned total record count is consistent with response `code` of 200, and each message has an identified role | Check the source of `chatId` in the request parameters, and use `dataId` to locate a single record |

## Three common errors

- Symptom: The names, quantities, and dates of the same record do not match between the self-assessment report and the issue list. Cause: The two materials are registered separately and are not checked uniformly against the total record count.
- Symptom: The rectification plan version is not synchronized, and the review receipt lacks a signature. Cause: The deployment status and operation records are not updated with the version, and the handover form is not checked item by item.
- Symptom: The interface returns empty but sessions exist in the interface, and exported records lack citations. Cause: Only the first page was retrieved, and pagination was not used to retrieve everything according to the total record count.

## How to verify the setup

Feature acceptance: paginate to retrieve everything according to the total record count, and sample one record to check the role, citation information, and time; use `_id`, `dataId` and `value` to locate records, and confirm that response `code` of 200 is consistent with the total record count total.

Business testing: check once item by item according to the handover form to see which record is missing; compare the fields, dates, and signatures of the self-assessment report, issue list, and rectification plan item by item.

- Check the source of the application and session identifiers in the request parameters, and pull two pages in succession to compare the total record count and offset.
- Open a single record to check the role, citation, and elapsed-time fields, confirm that the number of citations is the array length, and record the citation text tokens separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
