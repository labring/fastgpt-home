---
title: Reranking and Hybrid Retrieval for Kindergarten and Family Communication: Find Supporting Evidence
slug: /en/industry/education-d001-c004-f018
page_type: 行业问题页
application_area: education
meta_title: Family Communication | Reranking | Evidence
meta_description: Family Communication: review reranking for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Reranking and Hybrid Retrieval for Kindergarten and Family Communication: Find Supporting Evidence

## What this category's data looks like

Kindergarten home-school co-education communication materials include four categories: commitment items and response times, descriptions of children's performance, classification of parents' demands, and notification delivery records. They mostly come from daily entries by class teachers, kindergarten notices, and archived parent feedback, updated weekly or by event, with fields including date, class, item type, and original text paragraph. When these materials enter the hybrid retrieval function, the vector path handles semantically similar parents' demands, and the full-text path handles keyword hits in commitment clauses and notification originals. After the two paths are merged, the reranking model sorts them by score for subsequent citation trimming and answer generation.

## Configuration and implementation checks

The reranking model in the retrieval service only outputs the sorted candidates and reranking scores; the basis items that can be traced back to the original text must be handled next by citation trimming and answer generation. Hybrid retrieval simultaneously runs the vector and full-text paths and merges the results. After merging, the scope is large and similarity filtering cannot be directly applied, so the reranking model is usually used again to sort and filter by reranking score.

| Object | Check | Verification action |
| --- | --- | --- |
| Commitment items and response times | Whether the commitment has been responded to, and whether the response time falls within the original commitment range | Use `searchMode` to confirm that both paths are enabled, observe whether candidates come from both commitment clauses and response records, and then compare the order and scores of the top three before and after reranking |
| Descriptions of children's performance | Whether the description is consistent with the observation records | Retrieve the original observation records and check whether the description paragraphs with higher reranking scores can be traced back to the same date and the same child entry |
| Classification of parents' demands | Whether the feedback has been classified, and whether the classification corresponds to the original demand text | Use `usingReRank` to confirm that reranking has been used for sorting and filtering, and check whether the classification labels still match the original text after the number of candidates changes |
| Notification delivery records | Whether the notification has been delivered, and whether the delivery time can be checked | Use `limit` to restrict the number of candidates, record the array length and reranking scores, and check whether the original delivery records can be retrieved by citation trimming |

## Three common errors

- Phenomenon: Commitment items are listed but no response records are seen. Cause: The response records were not merged with the commitment items into the same candidate, and only the commitment originals rank high in reranking scores.
- Phenomenon: Descriptions of children's performance do not match the observation records. Cause: The description paragraphs come from another version of the materials, and reranking sorts by semantic similarity without checking the date and class.
- Phenomenon: Parents' demands appear repeatedly but are not classified. Cause: The original feedback is scattered across different notification materials, the number of candidates after merging is large, and the reranking scores do not rank the classification items first.

## How to verify the setup

Acceptance of this function: compare the order and scores of the top three before and after enabling reranking, record changes in the number of candidates and reranking scores, and confirm that `usingReRank` has been used for sorting and filtering.

Business test: ask a basis question that spans materials and see whether the answer provides traceable sources.

- In the search parameters, check the two path switches of `searchMode`, confirm that both vector and full-text are enabled, and check whether candidates come from both paths.
- Compare the sorting and scores before and after reranking, use `limit` to restrict the number of candidates, record the array length separately, and when citation limits are involved, check the tokens of the cited text.
