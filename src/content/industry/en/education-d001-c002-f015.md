---
title: Knowledge Base Retrieval for Kindergarten Play Activity Organization: Find Supporting Evidence
slug: /en/industry/education-d001-c002-f015
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Play | Retrieval | Evidence
meta_description: Kindergarten Play: review retrieval for evidence lookup. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Kindergarten Play Activity Organization: Find Supporting Evidence

## What this category's data looks like

This page addresses the kindergarten game activity organization scenario; the materials come from the kindergarten's observation records, area activity plans, material placement lists, activity objectives, and reflection records. Observation records are updated weekly, area plans are updated by theme cycle, material lists are adjusted as placements change, and reflection records are filled in immediately after activities. When these materials enter the knowledge base retrieval service, observation records and reflection records serve as the source-of-basis role, area plans and material lists serve as the cross-check role, and activity objectives serve as the judgment benchmark role. During retrieval, materials are recalled by semantic, full-text, or hybrid mode, and candidate snippets and similarity scores are merged, re-ranked, filtered, and truncated by limit before being returned, for subsequent nodes or manual generation of basis entries that can be traced back to the original text.

## Configuration and implementation checks

This step is performed by the knowledge base retrieval service (retrieval node and search test), which outputs candidate snippets and similarity scores (after mode, merging, re-ranking, filtering, and limit truncation). Basis entries that can be traced back to the original text are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Observation records and area plans | The behavior descriptions in the observation records and the activity arrangements in the area plans can be mapped to the same time period and the same area | Search the two materials separately using the same activity name, check whether the candidate snippets point to the same time period and area, and verify whether both semantic and full-text results appear under `searchMode` |
| Material placement list | The material quantities in the list match the material quantities listed in the activity plan | Search the material name, check whether the quantity descriptions in the candidate snippets match the original list text, record the number of candidates and the scores, and when the quote limit is involved, check the quoted text tokens |
| Activity objectives and reflection records | The objective achievement descriptions in the reflection records can be matched to the original activity objectives | Search using objective keywords, check whether the reflection snippets trace back to the original objective text, and compare the ranking of the top few results before and after enabling `usingReRank` |
| Area plans and next week's plan | When this week's plan is not updated, next week's plan still uses the old version | Search the plan version identifier, check whether the candidate snippets come from the current version, and after filtering low-scoring candidates with `similarity`, check the number of remaining items |

## Three common errors

- Symptom: insufficient materials lead to sparse retrieval candidates. Cause: observation records or material lists are not updated weekly, so the knowledge base lacks the corresponding snippets.
- Symptom: objectives do not match observations. Cause: the activity objectives have been adjusted, but the observation records still describe behavior according to the old objectives, so the recalled snippets cannot trace back to the current objectives.
- Symptom: the plan is not updated. Cause: the area plan version is not synchronized, and the candidate snippets returned by retrieval come from the old plan, which is inconsistent with the current arrangements.

## How to verify the setup

Acceptance of this feature: test once each with synonym-rewritten questions, compare the number of candidates and the scores, then toggle re-ranking on and off to see the ranking of the top few results, and confirm the impact of `usingReRank` and `similarity` on the results.

Business test: ask a cross-material basis question, see whether the answer gives traceable sources, and check `limit` and quoted text tokens and record them separately.

- In the knowledge base search test, switch `searchMode` and compare the candidate snippets and scores returned by the semantic, full-text, and hybrid modes.
- Check whether the candidate snippets contain both semantic and full-text results, confirm that multi-route merging has taken effect, then enable `usingReRank` and compare the ranking changes of the top few results.
