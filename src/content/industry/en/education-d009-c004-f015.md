---
title: Knowledge Base Retrieval for Kindergarten and Family Communication: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c004-f015
page_type: 行业问题页
application_area: education
meta_title: Family Communication | Retrieval | Multilingual
meta_description: Family Communication: review retrieval for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Kindergarten and Family Communication: Handle Multilingual Materials and Terminology

## What this category's data looks like

Kindergarten home-school co-education communication materials come from sources including kindergarten notices, class observation records, parent request registrations, and multilingual parallel texts, with an update cadence that rolls forward with semester activities and daily feedback. When materials enter the knowledge base retrieval and recall function, their roles differ: notices are used to confirm committed items and response times; observation records are used to verify descriptions of children's performance; request registrations are used to classify parent requests; multilingual parallel texts are used for terminology unification and translation-name back-reference. Field characteristics include class, date, item type, response status, terminology entries, and language identifiers. The same term must be written consistently throughout the entire text, and the translated name must be able to refer back to the original text, making it convenient to check whether the writing of three sampled terms is consistent throughout the entire text before external release.

## Configuration and implementation checks

This stage is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after pattern, merge, rerank, filter, and upper-limit trimming). The unified terminology glossary and parallel texts are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Multilingual parallel texts | The same term is written consistently throughout the entire text, the translated name can refer back to the original text, and it covers the terminology for parent request classification | In the search test, test once each with synonymous rewritten questions, compare the number of candidate entries and scores, and check whether the terminology writing is unified |
| Class observation records | Descriptions of children's performance are consistent with the records, and committed items and response times can be recalled | Switch `searchMode` to semantic, full-text, or hybrid, and see whether candidates include both semantic and full-text results |
| Parent request registrations | Parent request classification is clear, and feedback that has not been categorized can be identified | Compare the ranking of the top few entries before and after enabling `usingReRank`, and confirm whether relevant snippets are ranked first |
| Notice delivery materials | Committed items and response times retain the key original sentences in candidate snippets | Check the number of candidate entries and scores after `similarity` filtering, and separately record the length of the citation array |

## Three common errors

- Phenomenon: The notice states a response time for a committed item, but retrieval candidates return only the activity introduction. Cause: The candidate snippets do not cover the committed item and response time fields, so hits and associations need to be checked.
- Phenomenon: Descriptions of children's performance do not match the observation records, causing questions from parents after they see them. Cause: Recalled snippets come from materials of different dates and are not aligned by class and date.
- Phenomenon: Parent request classification is chaotic, and uncategorized feedback enters the external release draft. Cause: The request registration fields lack classification identifiers, and retrieval is not filtered by classification.

## How to verify the setup

Acceptance for this function: test once each with synonymous rewritten questions, compare candidates and scores, then toggle rerank on and off to see the ranking of the top few entries.

Business test: sample three terms and check whether their writing is consistent throughout the entire text.

- In the search test, switch `searchMode`, record the number of candidate entries and scores respectively, and check whether multi-path merging includes both semantic and full-text results.
- Compare the order of the top few entries before and after enabling `usingReRank`, check the tokens and array length of the cited text after `similarity` filtering, and do not compare `quoteMaxToken`.
