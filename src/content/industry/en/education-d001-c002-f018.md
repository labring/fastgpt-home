---
title: Reranking and Hybrid Retrieval for Kindergarten Play Activity Organization: Find Supporting Evidence
slug: /en/industry/education-d001-c002-f018
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Play | Reranking | Evidence
meta_description: Kindergarten Play: review reranking for evidence lookup. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Reranking and Hybrid Retrieval for Kindergarten Play Activity Organization: Find Supporting Evidence

## What this category's data looks like

In the kindergarten game activity organization scenario, business basis query materials include observation records, area activity plans, material placement lists, and activity objectives and reflections transferred to next week's plan. Observation records are updated per session, area plans are adjusted weekly, material lists change with placement, and objectives and reflections are supplemented after activities. When these materials enter hybrid retrieval, the vector and full-text paths each recall separately, observation records and plan entries simultaneously become candidates, material lists are used to verify placement quantities, and objectives and reflections are used to judge achievement and plan continuity. The rerank model in the retrieval service only outputs sorted candidates and rerank scores; basis entries that can be traced back to the original text must be handled next by citation trimming and answer generation. Candidates must be traceable back to the specific original material text, the version must be current, and entries must correspond to the original text, for replying to parents or writing into proposals.

## Configuration and implementation checks

The rerank model in the retrieval service only outputs sorted candidates and rerank scores; basis entries that can be traced back to the original text must be handled next by citation trimming and answer generation. Hybrid retrieval simultaneously uses the vector and full-text paths and merges the results; after merging, the scope is large and similarity filtering cannot be applied directly, so a rerank model is usually then used to sort and filter by rerank score.

| Object | Check | Verification action |
| --- | --- | --- |
| Observation records and area plans | Whether the observed behavior corresponds to the objectives and materials in the area plan | In the search parameters, check the two-path switches of `searchMode`, confirm that candidates come from both observation records and area plans, then compare the order and scores of the top three before and after reranking |
| Material placement quantities | Whether the placement quantities in the material list match activity needs and observation records | Check the number of candidate entries and rerank scores, and confirm that when materials are insufficient, basis entries can still be traced back to the original material list text |
| Activity objectives and reflections transferred to next week's plan | Whether objective achievement is consistent with reflections transferred to next week's plan, and whether the plan is updated | Compare the order and scores before and after reranking, and check whether, when objectives do not match observations or the plan is not updated, basis entries are traced back to the current version |
| Citation trimming and answer generation | Whether basis entries can be traced back to the original text and the version is current | Check the tokens and array entry count of the citation text, confirm that `usingReRank` is already used for sorting and filtering, and that `similarity` and `limit` control the candidate scope |

## Three common errors

- Phenomenon: there are many candidates but the top few are irrelevant. Cause: after hybrid retrieval merging, the scope is large, and the rerank model was not used to sort and filter by rerank score.
- Phenomenon: basis entries are still provided even when materials are insufficient. Cause: material placement quantities were not matched with observation records and area plans, and entries were not traced back to the original list text.
- Phenomenon: objectives do not match observations and the plan is not updated. Cause: activity objectives and reflections transferred to next week's plan were not synchronized, and the current version and old version are mixed among the candidates.

## How to verify the setup

Acceptance for this feature: compare the order and rerank scores of the top three before and after enabling reranking, check changes in the number of candidate entries and scores, and confirm that `usingReRank` is already used for sorting and filtering.

Business test: ask a basis question across materials, see whether the answer provides traceable sources, and check the tokens and array entry count of the citation text.

- In the search parameters, check the two-path switches of `searchMode`, confirm that both vector and full-text are enabled, and then see whether candidates come from both paths simultaneously.
- Compare the order and scores before and after reranking, check `similarity` and `limit`, and confirm that the tokens and array entry count of the citation text are recorded separately.
