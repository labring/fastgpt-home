---
title: Knowledge Base Retrieval for Kindergarten and Family Communication: Track Progress and Check Statistics
slug: /en/industry/education-d006-c004-f015
page_type: 行业问题页
application_area: education
meta_title: Family Communication | Retrieval | Progress
meta_description: Family Communication: review retrieval for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Kindergarten and Family Communication: Track Progress and Check Statistics

## What this category's data looks like

This page addresses the kindergarten home-school co-education communication scenario. Materials come from class weekly records, home-school contact books, notification receipts, and compiled parent feedback. The update cadence is daily recording, weekly aggregation, and monthly verification. The category focuses on four types of fields: committed items and response times, descriptions of children's performance, classification of parent requests, and notification delivery. When materials enter the knowledge base retrieval and recall function, each plays a different role: weekly records and contact books serve as candidate fragment sources, notification receipts are used to verify delivery status, and parent feedback is used for classification and statistical scope explanation. The retrieval service is only responsible for recalling candidate fragments from these materials and giving similarity scores; it does not directly generate progress tables or statistical results.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after mode, merge, rerank, filter, and limit trimming). The progress table and statistical scope explanation are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Committed items and response times | Whether the commitment received a response within the agreed time, and whether the response time falls within the recorded interval | In the search test, switch `searchMode` to hybrid retrieval, check whether commitments and response times appear in pairs in the candidate fragments, and record the number of candidates and scores |
| Descriptions of children's performance | Whether the description is consistent with the observation record, and whether unsourced generalized statements appear | Use synonymous questions to retrieve the same child's performance, compare candidate fragments and scores, and observe changes in the ranking of the top few items before and after enabling `usingReRank` |
| Classification of parent requests | Whether feedback has been assigned to a clear category, and whether uncategorized items are listed separately | Retrieve fragments related to parent requests, check whether the candidate content covers classification labels, record the number of candidates and scores, and do not treat candidate content as a statistical table |
| Notification delivery | Whether the notification is marked as delivered, and whether exceptions are stated for undelivered ones | Retrieve notification and receipt fragments, check whether candidates simultaneously contain the notification body and receipt record, and adjust `similarity` to observe changes in the number of candidates |

## Three common errors

- Phenomenon: A committed item cannot find a corresponding response in the records. Cause: Retrieval candidates only cover one side of the content and do not recall commitments and responses as pairs, leading to a misjudgment of no response during verification.
- Phenomenon: Descriptions of children's performance do not match the observation records. Cause: Candidate fragments come from generalized statements on different dates and were not checked sentence by sentence against the original observation records, and the statistical scope was not written in the table header.
- Phenomenon: Parent feedback is uncategorized but is included in the total. Cause: Retrieval returns candidate fragments and does not directly provide classification results; subsequent nodes did not re-aggregate by classification labels, causing inconsistency between the record count and the statistical count.

## How to verify the setup

This feature's acceptance: test once each with synonymously rewritten questions, compare candidates and scores, then toggle rerank on and off to observe the ranking of the top few items; switch `searchMode` and `similarity`, record the number of candidates and scores; `limit` only affects the upper limit on the number of cited items and does not change source matching.

Business test: use one week of records to verify the total, and check whether the scope and exceptions are clearly stated; verify the record count and statistical count separately for the four categories: committed items and response times, descriptions of children's performance, classification of parent requests, and notification delivery, and confirm that the scope is written in the table header.

- In the knowledge base search test, fix the same question and retrieve separately using semantic, full-text, and hybrid modes, record the number of candidates and scores, and compare whether the ranking of the top few items is stable.
- Verify one week of records item by item for committed items and response times, descriptions of children's performance, classification of parent requests, and notification delivery, list exception items separately, and then compare with the statistical total.
