---
title: Knowledge Base Retrieval for Continuing Education Training Hour Recognition: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c038-f015
page_type: 行业问题页
application_area: education
meta_title: Continuing Education | Retrieval | Intake
meta_description: Continuing Education: review retrieval for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Continuing Education Training Hour Recognition: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the continuing education hour recognition scenario, and the materials include course filing forms, study certificates, and hour recognition forms. The course filing form states the course name, number of hours, and filing date; the study certificate records the learner's identity, study period, and signature/seal; the hour recognition form summarizes the recognition conclusion, signature, and receipt. The update rhythm advances by batch and supplementary documents, and the field characteristics are concentrated in four categories: name, quantity, date, and signature. When the materials enter the knowledge base retrieval service, each serves as a source of candidate snippets: the filing form fields are used to check the course scope, the study certificate is used to check the study facts, and the recognition form is used to check the conclusion and signature receipt. Together, the three support the intake record and the items to be completed, but retrieval only provides candidate snippets and similarity scores, and does not directly generate statistical tables or business documents.

## Configuration and implementation checks

The knowledge base retrieval service (retrieval node and search test) only outputs candidate snippets and similarity scores (after pattern, merge, rerank, filter, and upper-limit trimming), and the intake record and the items to be completed must be handled by subsequent nodes or manually. One retrieval consists of question optimization, semantic/full-text/hybrid recall, multi-route merging, rerank secondary sorting, similarity filtering, and citation upper-limit trimming, and only then is the citation content handed to the model obtained.

| Object | Check | Verification action |
| --- | --- | --- |
| Course filing form | Check the course name, number of hours, and filing date, and determine whether they are consistent with the study certificate | In the search test, switch `searchMode`, test once each with synonymous questions, and record the number of candidate items and scores |
| Study certificate | Check the learner name, study period, quantity, and signature/seal, and determine whether they correspond to the filing form | Compare the order of the top few items before and after enabling rerank, and confirm the effect of `usingReRank` on sorting |
| Hour recognition form | Check the recognition conclusion, signature, and receipt, and determine whether missing items are identified and followed up | Use `similarity` to observe candidate scores, check the tokens of the citation text, and record the number of array items separately |
| Intake record | Check whether the missing-item questions list the materials and fields to be supplemented | Check whether the returned candidates include both semantic and full-text results, and confirm that multi-route merging takes effect |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match between the filing form and the study certificate. Cause: The versions of the two materials are not synchronized, the field scope is inconsistent, and retrieval candidates are mixed.
- Phenomenon: The recognition form is missing a signature or receipt but is still treated as complete material. Cause: The missing item is not identified and followed up, and the intake record does not list the fields to be supplemented.
- Phenomenon: There are many candidates, but the ones ranked first are all irrelevant, and the answer lacks key passages. Cause: The retrieval mode does not match the material form, rerank is not enabled, or similarity filtering is too broad.

## How to verify the setup

Acceptance for this feature: test once each with synonymously rewritten questions, compare candidates and scores, then toggle rerank on and off to see the order of the top few items.

Business test: ask a question that lacks key information, and see whether it first follows up before answering.

- In the search test, use `searchMode` to switch among semantic, full-text, and hybrid, compare the number of candidate items and scores, and record the array length.
- Enable `usingReRank` to compare the order of the top few items, use `similarity` to observe the filtering effect, and check the tokens of the citation text.
