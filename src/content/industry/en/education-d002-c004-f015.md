---
title: Knowledge Base Retrieval for Kindergarten and Family Communication: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c004-f015
page_type: 行业问题页
application_area: education
meta_title: Family Communication | Retrieval | Checks
meta_description: Family Communication: review retrieval for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Kindergarten and Family Communication: Compare Documents and Locate Differences

## What this category's data looks like

This page focuses on kindergarten home-school co-education communication materials, with sources including class notices, teacher observation records, parent feedback ledgers, and commitment response records. The update cadence is daily pickup/drop-off periods and weekly summaries. Field characteristics include child name, activity date, commitment item, response time, parent request category, and notice delivery status. When materials enter the knowledge base retrieval and recall function, notices and observation records serve as the original text to be verified, the ledger serves as the comparison baseline, and the retrieval service is responsible for pulling candidate snippets and similarity scores from multiple materials, for subsequent nodes or manual localization of fields with inconsistent names, quantities, or dates.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The discrepancy list is then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Class notice | Whether the commitment item and response time are consistent | In the search test, use synonymous questions to retrieve notices and the ledger, switch `searchMode` to compare candidates, and record fields where commitments have not been responded to |
| Teacher observation record | Whether the description of the child's performance matches the observation record | Test once each with synonymous rewritten questions, compare the top few rankings before and after enabling `usingReRank`, and locate snippets with inconsistent wording |
| Parent feedback ledger | Whether the parent request category matches the feedback content | Check the number of candidate entries and the `similarity` score, verify feedback entries that have not been categorized, and record the array length |
| Notice delivery record | Whether the notice delivery status corresponds to the date | Adjust `limit` to observe changes in the number of referenced entries, verify the referenced text tokens, and record the array length separately |

## Three common errors

- Phenomenon: A commitment item appears in the notice but there is no response record in the ledger. Cause: The retrieval candidates do not cover the response time field, so a synonymous question must be used to re-query.
- Phenomenon: The description of the child's performance is inconsistent with the wording in the observation record. Cause: The recalled snippets come from different materials and no rerank secondary sorting was performed.
- Phenomenon: The parent request category does not match the feedback content. Cause: There are many candidate entries but the ones ranked at the top are irrelevant, so the similarity filter needs to be checked.

## How to verify the setup

Acceptance for this feature: test once each with synonymous rewritten questions, compare candidates and `similarity` scores, then toggle rerank to inspect the top few rankings, and confirm the impact of `usingReRank` and `searchMode`.

Business test: use one real record to find fields inconsistent with the ledger, record name, quantity, or date discrepancies, submit to the reviewer for confirmation, and write back.

- In the knowledge base search test, switch `searchMode` to compare whether semantic and full-text candidates appear simultaneously, and record the number of candidate entries and scores.
- Adjust `limit` and enable `usingReRank`, verify the referenced text tokens, record the array length separately, and after locating the discrepancy fields, submit to the reviewer.
