---
title: Conversation Records and Traceability for Kindergarten Play Activity Organization: Track Progress and Check Statistics
slug: /en/industry/education-d006-c002-f007
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Play | Chat Records | Progress
meta_description: Kindergarten Play: review chat records for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Kindergarten Play Activity Organization: Track Progress and Check Statistics

## What this category's data looks like

This page addresses the progress recording and statistical verification step in kindergarten play activity organization. The materials come from observation records, area plans, material placement lists, activity objectives, and reflections converted into next week's plans. These materials are updated weekly. After entering the dialogue record interface, each plays a different role: the correspondence between observation records and area plans forms the main body of the progress table; the quantity of materials placed and the achievement of activity objectives serve as verification items for the statistical scope; and reflections converted into next week's plans serve as supplementary evidence for exception explanations. In terms of field characteristics, each record distinguishes between two types of roles, question and answer, and carries citation and duration fields. The total number of records reflects the number of message records, not the number of sessions. Common inconsistencies include insufficient materials, objectives not matching observations, and plans not updated, all of which need to be marked item by item in the scope explanation.

## Configuration and implementation checks

This step is executed by the dialogue record interface (by application and session dimension), outputting a session message list and the total number of records, including role and citation information. The progress table and statistical scope explanation are then completed manually or by an external system. The interface only retrieves session evidence and does not write business ledgers.

| Object | Check | Verification action |
| --- | --- | --- |
| Correspondence between observation records and area plans | The record count matches the statistical count, and the scope is written in the header | Pull by application and session identifier, verify that `chatId` is consistent with the actual session, and check the total record count total and response `code` of 200 |
| Quantity of materials placed | When materials are insufficient, list them as exceptions in the scope explanation | Pull two pages consecutively and compare the offset and total to confirm that no record count is missing, and that the material quantity corresponds item by item with the observation records |
| Achievement of activity objectives | When objectives do not match observations, mark the reason for the discrepancy | Open a single record to verify the role field and citation information, and use `dataId` to locate the specific message |
| Reflections converted into next week's plans | When plans are not updated, explain in the remarks column of the progress table | View the cited text by `value`, record the number of citations as the array length, and for the citation limit only check the text tokens |

## Three common errors

- Phenomenon: Insufficient materials cause the progress table record count and statistical count to mismatch. Cause: The material placement list was not updated in sync with the observation records, and the scope did not state the exception in the header.
- Phenomenon: Activity objectives do not match observation records, causing deviations in the statistical scope. Cause: Objective achievement was not verified weekly, and reflections converted into next week's plans were not updated in time.
- Phenomenon: Plans are not updated, and the correspondence between the progress table and area plans breaks down. Cause: The dialogue record interface only retrieves session evidence, and the business ledger was not subsequently registered manually or by an external system.

## How to verify the setup

This feature's acceptance: Page through by the total record count total to retrieve all records, sample one record to verify the role, citation information, and time, confirm that the message identifiers and content fields `_id`, `dataId` and `value` are consistent with the actual session, and that the status code is 200.

Business test: Use one week of records to verify the totals, check whether the scope and exceptions are clearly written, and whether the quantity of materials placed and the achievement of activity objectives correspond item by item.

- Pull two pages consecutively by application and session identifier, compare the offset and total record count, and confirm that the record count matches the total.
- Open a single record to verify the role field and citation duration field, record the number of citations separately as the array length, and for the citation limit only check the text tokens.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
