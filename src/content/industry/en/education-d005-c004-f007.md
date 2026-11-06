---
title: Conversation Records and Traceability for Kindergarten and Family Communication: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c004-f007
page_type: 行业问题页
application_area: education
meta_title: Family Communication | Chat Records | Versions
meta_description: Family Communication: review chat records for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Kindergarten and Family Communication: Maintain Document Versions and Changes

## What this category's data looks like

The data versions and change maintenance for kindergarten home-school co-education communication revolve around four types of materials: commitments and response times, descriptions of children's performance, classification of parents' requests, and notification delivery. Sources include teacher observation records, parent conversations, notification receipts, and class announcements. The update cadence is daily registration and weekly review, with immediate traceability when commitments change. When materials enter the conversation logs and auditing function, the two roles of question and answer respectively carry parents' requests and teachers' responses; citation information points to the observation record or notification original text on which it is based; and the duration field reflects response timeliness. The version ledger and change records need to be registered, exported, and reviewed accordingly by manual or external systems, ensuring that the current version is unique, old versions are traceable, and citations are synchronized.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), outputting the session message list and total record count, including role and citation information. The version ledger and change records are then completed by manual or external systems.

| Object | Check | Verification action |
| --- | --- | --- |
| Commitments and response times | Commitment content and response times can be matched item by item in the session records, and unresponded items can be located to a specific session | Paginate by application and session identifier, check the alternating order of question and answer in the role field, and compare the commitment text with the response time |
| Descriptions of children's performance | The description is consistent with the observation record, and no statement contradicts the original observation | Open a single record to check the citation and duration fields, use `value` to view the original cited text, and compare sentence by sentence with the observation record |
| Classification of parents' requests | Requests have been classified and the classification result matches the request text; unclassified items can be identified | Page through by total record count to retrieve all, use `chatId` and `dataId` to locate a single request, and check the classification label |
| Notification delivery | Notification delivery status is consistent with the receipt record, and undelivered items have clear records | Check the citation information of notification-type messages in the session message list, and compare the receipt time with the delivery status |

## Three common errors

- Phenomenon: A commitment has been raised in the session but there is no subsequent response record. Cause: The response did not fall into the same session, or the records were not fully retrieved by role field.
- Phenomenon: Descriptions of children's performance do not match the observation record. Cause: The citation information was not synchronized and updated, and the old version of the statement is still being cited.
- Phenomenon: Parents' requests are not classified, and subsequent statistics are omitted. Cause: The classification action was not completed during the registration step, and the total record count does not match the classification count.

## How to verify the setup

Acceptance of this function: Page through by total record count to retrieve all, sample one record to check role, citation information, and time; confirm that response `code` of 200 is consistent with the total record count total, and use `_id`, `dataId` and `value` to locate a single record.

Business test: Change one piece of content and see whether the version number and citation are synchronized and updated.

- Paginate by application and session identifier, pull two consecutive pages and compare the offset and total record count to confirm there are no omissions.
- Open a single record to check the role field, citation information, and duration; confirm that the number of citations is the array length, and that the citation text tokens are recorded separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
