---
title: Model Integration and Configuration for Kindergarten Healthcare and Meal Management: Find Supporting Evidence
slug: /en/industry/education-d001-c003-f014
page_type: 行业问题页
application_area: education
meta_title: Child Health and Meals | Model Setup | Evidence
meta_description: Child Health and Meals: review model setup for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Model Integration and Configuration for Kindergarten Healthcare and Meal Management: Find Supporting Evidence

## What this category's data looks like

Kindergarten health care and meal management materials come from three parties in the kindergarten: the health room, the canteen, and the classes. Food procurement orders contain names and specifications, retention samples records contain time and batch, disinfection records contain time period and responsible person, absence registration contains cause classification, and menus contain meal times and categories. Materials are updated daily; procurement and retention samples follow meal times; disinfection records are filled in for three time periods: morning, afternoon, and before departure; absence registration is summarized twice, based on morning checks and full-day observation. When entering the model integration and configuration function, the language model handles conversational replies, the indexing model handles cross-material retrieval, the reranking model adjusts the order of basis entries, and speech synthesis and speech recognition serve only as auxiliary channels. Each material acts as an independent text chunk in retrieval, and field characteristics determine whether citations can point back to the original text.

## Configuration and implementation checks

This part is executed by the server-side model channel configuration, outputting model binding relationships and channel responses. "Basis entries that can point back to the original text" are then completed by dialogue and retrieval using that model. The model type must correspond to the stage in which it is used, and the channel and key must be consistent with the connected service.

| Object | Check | Verification action |
| --- | --- | --- |
| Food procurement orders and retention samples records | Whether food names and specifications, and retention sample time and batch, can be matched | In the model configuration, check the indexing model type label, run a retrieval to see whether the returned entries contain procurement order specifications and retention sample batches, and check the citation text tokens corresponding to `quoteMaxToken` |
| Menus and procurement categories | Whether the meal-time categories in the menu are consistent with the procurement categories | In the dialogue, ask for the procurement basis of the ingredients used in a certain day's menu, check whether the returned entries can separately point back to the menu and the procurement order, record the number of array items separately, and do not compare it for equality with that budget |
| Disinfection records | Whether the disinfection time periods are missing morning, afternoon, or before departure | In retrieval, check the disinfection time periods for a certain day, verify whether the returned entries cover all three time periods and point back to the original text, and also check the response range corresponding to `maxContext` and `maxTokens` |
| Absence registration | Whether the absence cause classification is consistent with morning checks and full-day observation | In the dialogue, ask for the basis for the absence cause classification of a certain class, check whether the returned entries can point back to the original absence registration text, and check whether the invocation method corresponding to `toolChoice` takes effect as configured |

## Three common errors

- Phenomenon: documents and retention sample batches do not match. Cause: procurement orders are summarized daily, retention sample records are batched by meal time, and retrieval does not align by batch, so citation entries point back to only one side.
- Phenomenon: menus and procurement categories are inconsistent. Cause: menus are arranged weekly, procurement proceeds daily, and after the indexing model splits text chunks, category names and specifications do not fall within the same entry.
- Phenomenon: disinfection records are missing time periods. Cause: the three time periods of morning, afternoon, and before departure are filled in separate tables, and after retrieval hits some time periods, it does not indicate that the remaining time periods are missing, so citation entries do not cover them completely.

## How to verify the setup

Acceptance for this function: run one dialogue and one retrieval, check that the model identifier in the response is consistent with the model name returned by the channel, and check that the configuration items corresponding to `maxContext`, `maxTokens`, and `quoteMaxToken` have been bound by stage.

Business test: ask a cross-material basis question, see whether the answer gives a citation that can point back, and check that the number of citations is recorded by array length and that citation text tokens are checked separately.

- In the model configuration, check the type labels of the five types of models: language, indexing, reranking, speech synthesis, and speech recognition, and confirm that each is bound to the corresponding stage.
- Check the channel configuration and key source, confirm that the model identifier is consistent with the name listed in the documentation, and compare it with the model name returned by the channel.
