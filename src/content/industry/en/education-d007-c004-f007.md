---
title: Conversation Records and Traceability for Kindergarten and Family Communication: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c004-f007
page_type: 行业问题页
application_area: education
meta_title: Family Communication | Chat Records | Review
meta_description: Family Communication: review chat records for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Kindergarten and Family Communication: Trace Exceptions and Review Results

## What this category's data looks like

This page focuses on the kindergarten home-kindergarten co-education communication scenario. The materials come from four types of records: commitments and response times in daily conversations, descriptions of children's performance, classification of parents' requests, and notification delivery. These materials are stored in the form of conversation messages. After entering the conversation record interface, they are pulled by pagination along two dimensions, application and session, returning two roles, question and answer, along with citation and elapsed-time fields. The update rhythm follows actual communication: each time a conversation generates a new message, a traceable record is formed. In terms of field characteristics, a single record contains role, text content, citation information, and runtime elapsed time. The total number of records reflects the number of messages, not the number of sessions. During exception tracing, inconsistencies such as commitments without responses, statements that do not match observation records, and feedback that has not been classified all need to be compared back against the original message list, and manual staff or external systems register the exception list and review conclusions accordingly.

## Configuration and implementation checks

The conversation record interface (by application and session dimensions) only outputs the session message list and the total number of records, including roles and citation information. The exception list and review conclusions must be handled afterward by manual staff or external systems. This step does not write business ledgers; it only provides conversation evidence.

| Object | Check | Verification action |
| --- | --- | --- |
| Commitments and response times | Whether the commitment received a response within the agreed time, and whether the response content is consistent with the original message | Pull records by application and session identifiers, compare the location where the commitment appears with subsequent responses one by one, and mark items without responses |
| Descriptions of children's performance | Whether the description matches the observation records, and whether there is a conflict between subjective statements and factual records | Extract a single record, open the citation field to verify the source material, and compare differences in wording |
| Classification of parents' requests | Whether the feedback has been classified, and whether the classification label matches the content of the request | Page through to retrieve the full total number of records, distinguish questions from answers by the role field, and check the classification attribution |
| Notification delivery | Whether the notification was delivered, and whether the delivery record corresponds to the message list | Check the total number of records against the pagination offset, and confirm the position and status of the notification message in the list |

## Three common errors

- Phenomenon: commitment without response. Cause: there is no corresponding answer after the commitment message in the conversation record, and manual review did not compare response times one by one, resulting in omissions.
- Phenomenon: statement does not match the observation record. Cause: the answer content differs from the original observation material, the citation field was not opened for verification, and judgment was made only based on the message text.
- Phenomenon: feedback not classified. Cause: parents' request messages are mixed in with ordinary conversations, were not organized by classification dimension, and the review conclusion lacks a basis for classification.

## How to verify the setup

This feature's acceptance: page through to retrieve all records by the total number of records, sample one record to verify the role, citation information, and time, confirm that response `code` of 200 is consistent with total, and check whether the `_id`, `dataId` and `value` fields are traceable.

Business test: create an exception record, see whether the source material can be traced, and confirm that the exception is supported by the original record and, after the reviewer signs, is handed to the responsible person for handling.

- Pull two pages consecutively and compare the total number of records with the offset to confirm that the pagination parameters match the total, avoiding retrieving only the first page.
- Open a single record to verify the citation and elapsed-time fields, confirm that the citation count is the array length, and that citation text tokens are recorded separately and not compared for equality.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
