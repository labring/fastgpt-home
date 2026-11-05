---
title: Conversation Records and Traceability for Research Project Annual Progress and Acceptance: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c060-f007
page_type: 行业问题页
application_area: education
meta_title: Research Progress | Chat Records | Review
meta_description: Research Progress: review chat records for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Research Project Annual Progress and Acceptance: Trace Exceptions and Review Results

## What this category's data looks like

In the scenario of annual progress and acceptance of research projects, annual progress reports, mid-term review materials, and acceptance reports form the core material family. Annual progress reports are updated quarterly or semi-annually, with fields including project name, principal investigator, indicator completion values, funding expenditure, and signature fields; mid-term review materials are submitted in the middle stage of project execution, with fields including stage objectives, milestone dates, and expert opinions; acceptance reports are formed at project completion, with fields including final indicators, results list, dates, and multi-party signatures. When these three types of materials enter the conversation logs and audit function, each plays a different role: annual progress reports serve as the process record source, mid-term review materials serve as the node verification source, and acceptance reports serve as the conclusion basis source. The conversation record interface retains questions and answers by application and session dimension, providing original session evidence for exception tracing, but the field consistency of the materials themselves still requires manual comparison.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), outputting a session message list and total record count, including role and reference information. The "exception list and review conclusions" are then completed manually or by an external system. The list returned by the interface distinguishes two role types, questions and answers, and carries reference and elapsed time fields for subsequent registration and review.

| Object | Check | Verification action |
| --- | --- | --- |
| Annual progress report | The project name, indicator completion values, funding expenditure, dates, and signature fields should be consistent in the mid-term review materials and acceptance report | Take the same project's name, quantities, and dates in the annual progress report and acceptance report and compare them field by field, and check whether signatures and receipts are complete |
| Mid-term review materials | Stage objectives, milestone dates, and expert opinions should be synchronized with the annual progress report version | Check whether the version number of the mid-term review materials is the same version as the annual progress report, and check for missing signatures or receipts |
| Acceptance report | Final indicators, results list, dates, and multi-party signatures should be traceable to the original session records | Pull the session message list by `chatId`, use `dataId` to locate a single record, view the references and elapsed time in `value`, and fill in the exception list |
| Conversation record interface output | The total record count total matches response `code` of 200, and each message has an identified role | Page through to retrieve all records by total record count, pull two consecutive pages to compare offset and total, and confirm the order of question and answer roles |

## Three common errors

- Symptom: The name, quantities, and dates of the same record do not match between the annual progress report and the acceptance report. Cause: The two materials were filled in by different personnel at different times, without field-level cross-checking.
- Symptom: The version of the mid-term review materials is not synchronized; the annual progress report has been updated while the mid-term materials are still the old version. Cause: Version management relies on manual handover and lacks a unified version identifier and synchronization node.
- Symptom: The acceptance report lacks signatures or receipts, and the exception list cannot be closed. Cause: The signature process is not bound to material archiving, and receipts are not retained together with the materials.

## How to verify the setup

Acceptance of this function: Page through to retrieve all records by total record count total, sample one record to check the role, reference information, and time, and confirm that response `code` of 200 is consistent with the list length.

Business test: Create an exception record and see whether it can be traced back to the source material

- Pull paginated records by application and session identifier, pull two consecutive pages to compare total and offset, and confirm there are no omissions.
- Open a single record, check the reference and elapsed time fields in `value`, register the exception entry in the exception list, and hand it over to the responsible person for handling.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
