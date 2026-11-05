---
title: Conversation Records and Traceability for Kindergarten Operations and Quality Self-Assessment: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c006-f007
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Quality | Chat Records | Review
meta_description: Kindergarten Quality: review chat records for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Kindergarten Operations and Quality Self-Assessment: Trace Exceptions and Review Results

## What this category's data looks like

Kindergarten operation behavior and quality self-assessment materials include three types: self-assessment reports, issue lists, and rectification plans. Sources are kindergarten self-assessment, responsible inspector feedback, and daily inspection records. The update rhythm is self-assessment at the beginning of the semester, rectification during the semester, and review at the end of the semester. Field characteristics include record name, quantity, date, and signature column. When entering the conversation logs and audit function, the three types of materials each assume different roles: the self-assessment report provides overall conclusions and basis, the issue list lists abnormal matters item by item, and the rectification plan corresponds to responsible persons and deadlines. The three must mutually corroborate in name, quantity, and date, and signatures and receipts serve as conditions for the review to take effect. The conversation record interface pulls paginated data by application and session dimensions, returns a session message list and total record count, includes role and citation information, and provides original conversation evidence for anomaly tracing, but does not replace business ledgers.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimensions), outputting a session message list and total record count, including role and citation information. The "anomaly list and review conclusion" is then completed manually or by an external system. The interface only retrieves conversation evidence and does not write to business ledgers.

| Object | Check | Verification action |
| --- | --- | --- |
| Self-assessment report | The name, quantity, date, and signature column are consistent within the report, and match the corresponding entries in the issue list | Open the report and check the fields and signature, and compare name, quantity, and date item by item with the issue list |
| Issue list | Each anomaly is supported by original records, and name, quantity, and date do not conflict with the self-assessment report or rectification plan | Extract one anomaly, locate the session by `chatId`, locate the single message by `dataId`, and check the citation and elapsed time in `value` |
| Rectification plan | Responsible person, deadline, and receipt correspond one-to-one with issue list entries, and the version is the latest | Check the plan version number and signature receipt, and confirm consistency with the issue list entry name, quantity, and date |
| Conversation record interface output | The total record count matches the pagination parameters, each message has an identified role, and citation and elapsed time fields are visible | Pull two consecutive pages and compare total with offset, extract one item to check role, citation information, and time, and the status code is 200 |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match between the self-assessment report and the issue list. Cause: The two are registered separately and do not use the original conversation records as a common source.
- Phenomenon: The rectification plan has been updated, but the self-assessment report still cites the old version. Cause: The version was not synchronized, and there is a lack of a unified version identifier and update receipt.
- Phenomenon: The issue list lacks a signature or receipt, so the review conclusion cannot take effect. Cause: The signature column was not included in the workflow, and the manual review step lacks a trace.

## How to verify the setup

This function acceptance: page through all records by total record count, extract one item to check role, citation information, and time, confirm that `_id`, `dataId` and `value` can be located, and the status code is 200.

Business test: create one anomaly record and see whether the source material can be traced.

- Pull two consecutive pages and compare total with offset, and confirm that the total record count is consistent with the pagination parameters.
- Extract one anomaly, locate the message by `chatId` and `dataId`, check the citation and elapsed time in `value`, and register the review conclusion and sign.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
