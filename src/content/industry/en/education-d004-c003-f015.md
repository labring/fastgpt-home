---
title: Knowledge Base Retrieval for Kindergarten Healthcare and Meal Management: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c003-f015
page_type: 行业问题页
application_area: education
meta_title: Child Health and Meals | Retrieval | Handover
meta_description: Child Health and Meals: review retrieval for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Kindergarten Healthcare and Meal Management: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page focuses on drafting materials and handover of responsibilities in kindergarten health care and meal management scenarios, covering categories of materials such as food procurement acceptance forms, sample retention records, disinfection time schedules, absence cause registration, and menu-to-procurement-category comparison tables. These materials come from daily records of the health room, cafeteria, and classes, updated daily or weekly, with field characteristics concentrated in food name and specification, sample retention time and batch, disinfection time period, and absence cause classification. When entering the knowledge base retrieval and recall function, food and specification are used to match menus and procurement categories, sample retention time and batch are used to check whether documents and retained samples are consistent, disinfection time period is used to check whether records are missing time periods, and absence cause classification is used to confirm whether the classification criteria are unified. In the retrieval step, materials serve as candidate fragment sources, and after recall and reranking they form cited content, for subsequent nodes or manual drafting of signable drafts and handover records.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after mode, merge, rerank, filter, and limit trimming). "Signable material drafts and handover records" are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Food name and specification | Whether the menu and procurement category are consistent | In the search test, switch `searchMode`, compare the candidates among semantic, full-text, and hybrid options, and check whether the food name and specification appear simultaneously in the candidates and cited content |
| Sample retention time and batch | Whether the document and retained sample batch match | Test once each with synonym-rewritten questions, check the number of candidates and scores, and confirm that the sample retention time and batch retain the original key fragments in the cited content |
| Disinfection time period | Whether the disinfection record is missing a time period | Turn `usingReRank` on and off, compare the top few rankings, and check whether the disinfection time period is completely retained in the candidates and cited content |
| Absence cause classification | Whether the classification criteria are unified | Adjust `similarity` and `limit`, observe changes in the number of candidates and scores, and check whether the absence cause classification is mistakenly deleted by similarity filtering and citation limit trimming |

## Three common errors

- Phenomenon: The document and retained sample batch do not match. Cause: The retrieved hit fragments do not cover the sample retention time and batch fields, the candidates and cited content lack the corresponding original text, and subsequent drafting cannot verify them.
- Phenomenon: The menu and procurement category are inconsistent. Cause: The semantic and full-text recall channels are not merged, the candidates come from only one path, and the food name and specification are missing from the cited content.
- Phenomenon: The disinfection record is missing a time period. Cause: After similarity filtering and citation limit trimming, the disinfection time period fragment is trimmed away, the cited content is incomplete, and the responsibility time period cannot be confirmed during handover.

## How to verify the setup

This feature acceptance: Test once each with synonym-rewritten questions, compare candidates and scores, then turn reranking on and off to see the top few rankings; record the number of candidates and scores, and check the scope of effect of `similarity`, `limit`, `usingReRank`, and `searchMode`.

Business test: Draft one copy according to the template and complete one handover, and see whether missing items are blocked.

- In the knowledge base search test, switch `searchMode`, compare the candidate results among semantic, full-text, and hybrid options, and confirm whether food name and specification, sample retention time and batch, disinfection time period, and absence cause classification appear in the cited content.
- Turn `usingReRank` on and off, compare the top few rankings, then adjust `similarity` and `limit`, record the number of candidates and scores, and check that the tokens and array count of the cited text are recorded separately.
