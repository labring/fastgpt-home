---
title: Conversation Records and Traceability for Graduate Admissions Interviews and Selection: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c024-f007
page_type: 行业问题页
application_area: education
meta_title: Graduate Admissions | Chat Records | Review
meta_description: Graduate Admissions: review chat records for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Graduate Admissions Interviews and Selection: Trace Exceptions and Review Results

## What this category's data looks like

This page addresses the graduate admissions re-examination and admission category. The materials include three types: re-examination plans, candidate score sheets, and transfer lists. Re-examination plans are published by the admitting unit and contain procedures, weights, time nodes, and signature fields; candidate score sheets come from the summary of preliminary and re-examination scoring and contain candidate numbers, subjects, scores, and dates; transfer lists are exported from the transfer system and contain candidate numbers, transfer directions, confirmation status, and receipts. The update rhythm of the three types of materials is batch release and batch revision. The field characteristic is that the same candidate number appears repeatedly across multiple materials, and names, quantities, dates, and signatures need to be aligned item by item. When entering the conversation logs and auditing function, the re-examination plan serves as the rule basis, the candidate score sheet serves as score evidence, and the transfer list serves as circulation evidence. Each assumes a different role and together they support abnormal traceability and manual review.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), outputting a session message list and total record count, including role and citation information. The "exception list and review conclusions" are then completed manually or by an external system. The message list is not a version ledger of business materials; it only takes conversation evidence and does not write to a business ledger.

| Object | Check | Verification action |
| --- | --- | --- |
| Re-examination plan | The procedures, weights, time nodes, and signature fields in the plan must be aligned item by item with the dates and signatures in the candidate score sheet and transfer list | Check the plan version number and release date, inspect whether the signature fields are complete, and compare whether the same time node is consistent across the three materials |
| Candidate score sheet | Candidate numbers, subjects, scores, and dates must match the names, quantities, and dates in the re-examination plan and transfer list | Compare the three materials item by item by candidate number, check whether scores and dates are consistent, and confirm there are no missing signatures or receipts |
| Transfer list | Transfer directions, confirmation status, and receipts must be consistent with the records in the re-examination plan and candidate score sheet; when versions are not synchronized, the latest signed version prevails | Check the confirmation status and receipts of the transfer list, compare the names and quantities for the same candidate number in the two materials, and mark version differences |
| Conversation record interface | Paginate and pull by application and session dimension, returning a session message list and total record count, including role and citation information | Check that `chatId` matches the actual session, after paging through all records sample one to check the role, citation information, and time, and confirm that the total record count total matches response `code` of 200 |

## Three common errors

- Phenomenon: The names, quantities, and dates for the same candidate number do not match between the re-examination plan and the transfer list. Cause: The two materials are registered in different stages, and no cross-comparison was performed.
- Phenomenon: The re-examination plan has been revised, but the candidate score sheet is still the old version, and the versions are not synchronized. Cause: After revision, updates to related materials and receipt confirmation were not triggered.
- Phenomenon: The transfer list lacks signatures or receipts, and abnormal records cannot be traced back to the source materials. Cause: The registration stage did not enforce retention of signature and receipt fields.

## How to verify the setup

Acceptance of this function: paginate through all records according to the total record count, sample one to check the role, citation information, and time, confirm that `_id`, `dataId` and `value` are queryable, and that response `code` of 200 matches the total record count total.

Business test: create an abnormal record, see whether it can be traced to the source materials, and check the fields, dates, and signatures of the re-examination plan, candidate score sheet, and transfer list.

- Compare the names, quantities, dates, and signatures of the re-examination plan, candidate score sheet, and transfer list item by item by candidate number, mark inconsistencies, and register them in the exception list.
- Paginate through all conversation records, check the total record count total and response `code` of 200, sample one to inspect the role, citation information, and time, and submit the review conclusions to the responsible person for handling.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
