---
title: Knowledge Base Retrieval for Kindergarten Play Activity Organization: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c002-f015
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Play | Retrieval | Versions
meta_description: Kindergarten Play: review retrieval for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Kindergarten Play Activity Organization: Maintain Document Versions and Changes

## What this category's data looks like

This category's data covers observation records, area plans, material placement lists, activity objectives, and reflection-to-next-week plans. These materials come from class teachers' daily records and teaching-research group summaries, with an update cadence that advances by week and by theme; fields include activity name, observation points, material quantity, objective-achievement description, and citation source. When they enter the knowledge base retrieval and recall function, observation records and area plans serve as the primary semantic recall materials, the material placement quantity table and objective descriptions serve as full-text recall supplements, and reflection-to-next-week plans serve as linked citation snippets. Each material corresponds to a unique current version in the version ledger, old versions retain traceable identifiers, and citations are updated in sync.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after pattern, merge, rerank, filter, and upper-limit trimming). The version ledger and change records are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Observation records and area plans | Whether the correspondence between the two is consistent, and whether objectives and observations match | In the search test, run one retrieval each with different phrasings of the same question, compare the number of candidates and the scores, and check whether the old version is still recalled when the plan has not been updated |
| Material placement quantity | Whether materials are still cited as the current version when they are insufficient | Switch `searchMode` to semantic, full-text, or hybrid, see whether candidates include both semantic and full-text results, and check the material quantity field against the tokens of the cited text |
| Activity objectives and reflection-to-next-week plans | Whether the objective-achievement description is consistent with the observation records, and whether the reflection has been transferred into the next week's plan | Compare the top few rankings before and after enabling `usingReRank`, use `similarity` filtering to see whether the number of citations equals the array length, and use `limit` to control the candidate upper limit |
| Version ledger and change records | The current version is unique, old versions are traceable, and citations are in sync | After changing one piece of content, retrieve again to see whether the version number and citations are updated in sync, and whether the old version is still traceable |

## Three common errors

- Symptom: the same question cannot be recalled when rephrased. Cause: question optimization does not cover referent resolution, the semantic and full-text recall channels are not merged, and candidates do not enter reranking.
- Symptom: materials are insufficient but the plan has not been updated. Cause: the material placement quantity table was not changed in sync with the area plan, and the old version is still recalled as the current version.
- Symptom: objectives do not match observations. Cause: observation records and activity objectives belong to different versions, citation sync was not triggered, and the reflection-to-next-week plan was not updated.

## How to verify the setup

This function's acceptance: test once each with synonym-rewritten question sentences, compare candidates and scores, then toggle reranking on and off to inspect the top few rankings; check the impact of `searchMode`, `similarity`, `usingReRank`, and `limit` on the number of candidates and scores.

Business test: change one piece of content and see whether the version number and citations are updated in sync.

- In the knowledge base search test, switch retrieval modes, compare the number of candidates and scores, and confirm that candidates come from different recall channels and have been merged.
- After changing one piece of material content, retrieve again and verify that in the version ledger the current version is unique, old versions are traceable, and citations are updated in sync.
