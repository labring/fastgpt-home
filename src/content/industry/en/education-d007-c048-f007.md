---
title: Conversation Records and Traceability for Sino-Foreign Education Establishment and Annual Reports: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c048-f007
page_type: 行业问题页
application_area: education
meta_title: Joint Education | Chat Records | Review
meta_description: Joint Education: review chat records for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Sino-Foreign Education Establishment and Annual Reports: Trace Exceptions and Review Results

## What this category's data looks like

This page addresses the establishment and annual report materials of Sino-foreign cooperative education institutions. The sources are the establishment application, cooperation agreement, articles of association, and their receipts. The update cadence is centralized submission during the establishment phase and rolling updates by academic year during the annual report phase. Field characteristics include institution name, cooperation partner, education level, enrollment number, signing date, signature page, and version number. When materials enter the conversation log and audit function, the establishment application and cooperation agreement assume the role of basis, the articles of association assume the governance role, and the receipt assumes the delivery role. The three types of materials cross-reference each other on name, quantity, date, signature, and version; any inconsistency in any one of these forms an anomaly clue to be traced. The conversation record interface pulls by application and session dimensions, using the session message list and total record count as the evidence entry point, on which the business side registers the anomaly list and performs manual review.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimensions), outputting the session message list and total record count, including role and reference information. The "anomaly list and review conclusions" are then completed by humans or an external system. The interface only retrieves conversation evidence and does not write to business ledgers; the number of messages and the number of sessions are not the same quantity, and the total record count is the number of message records.

| Object | Check | Verification action |
| --- | --- | --- |
| Establishment application | Institution name, cooperation partner, enrollment number, and signing date must match the cooperation agreement item by item | Page through by total record count to retrieve all, sample one record to check role, reference information, and time, use `chatId` to locate the session, and check the message corresponding to `dataId` |
| Cooperation agreement | The name, quantity, and date of the same record must not mismatch between the two materials, and the signature page and receipt must not be missing | Pull two pages consecutively to compare the total count and offset, open a single record to check the reference and elapsed-time fields, and record the reference count separately by array length |
| Articles of association | The version number and signing date must be synchronized; missing signature or receipt is regarded as an anomaly | Open a record by `value` to check the reference text and elapsed time, and register an anomaly list entry when confirming the version is not synchronized |
| Conversation record interface | Returns the total record count and response `code` of 200, with questions and answers appearing alternately | Check the source of the application and session identifiers in the request parameters, and when confirming the interface returns empty but sessions exist in the interface, trace the session identifier |

## Three common errors

- Symptom: The same institution name mismatches between the establishment application and the cooperation agreement. Cause: The two materials are maintained separately, the name and quantity fields are not cross-compared, and the anomaly list lacks support from the original records.
- Symptom: The articles of association version is not synchronized, and the signing date is earlier than the cooperation agreement. Cause: The version number is not updated with revisions, and the reviewer has not signed off on the anomaly list.
- Symptom: The cooperation agreement is missing the signature page or receipt. Cause: The material circulation step does not retain delivery proof, and the review conclusion cannot be traced back to the source material.

## How to verify the setup

This feature's acceptance: page through by total record count to retrieve all, sample one record to check role, reference information, and time, confirm response `code` of 200, use `chatId` and `dataId` to locate the message, and record the reference count by array length.

Business test: create an anomaly record and see whether it can be traced to the source material.

- Pull records by application and session dimensions, pull two pages consecutively to compare the total count and offset, and adjust the pagination parameters when confirming only the first page was retrieved.
- Open a single record to check the reference and elapsed-time fields, and when confirming the exported record lacks references, re-pull and register an anomaly list entry.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
