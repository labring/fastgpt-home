---
title: Knowledge Base Retrieval for Kindergarten Safety and Emergency Drills: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c005-f015
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Safety | Retrieval | Intake
meta_description: Kindergarten Safety: review retrieval for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Kindergarten Safety and Emergency Drills: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses kindergarten safety protection and emergency drill scenarios. The materials come from hazard inspection forms, rectification receipts, drill plans and sign-in records, access control and school bus checklists, responsible-person signature pages, and so on. These materials enter the knowledge base retrieval and recall function in the form of Q&A intake and missing-item follow-up: inspection forms and checklists serve as the field sources for hazard items and rectification deadlines, and for access control and school bus check items; drill plans and sign-in records serve as the field sources for drill headcount and sign-in; signature pages serve as the responsible-person confirmation field. Materials are refreshed in sync with each inspection, each drill, and each access control and school bus check, and the field characteristics are itemized, approval-signed, and deadline-based. The retrieval service selects semantic, full-text, or hybrid recall according to the material form, and hands candidate snippets and similarity scores to subsequent nodes or humans, to form intake records and items to be completed.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after mode, merge, rerank, filter, and upper-limit trimming). Intake records and items to be completed are then finished by subsequent nodes or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| Hazard inspection form | Whether hazard items and rectification deadlines correspond item by item, and whether unclosed items are marked | In the search test, retrieve once each with synonym-rewritten questions, record the number of candidates and scores, check whether the hazard item and rectification deadline fields are hit at the same time, and check whether unclosed items enter the candidates |
| Drill plan and sign-in records | Whether drill headcount and sign-in are consistent with the plan, and whether discrepancies between records and the plan are identified | Switch `searchMode` to semantic, full-text, and hybrid and retrieve once each, compare the number of candidates and scores, check the drill headcount and sign-in fields, and confirm whether discrepancies between records and the plan are followed up |
| Access control and school bus checklist | Whether access control and school bus check items are missing, and whether responsible-person signatures are complete | Turn `usingReRank` on and off and retrieve once each, compare the ranking of the top few results, check the access control and school bus check items and responsible-person signature fields, and confirm whether missing items trigger follow-up questions |
| Intake records and items to be completed | Whether missing items are identified and followed up, and whether answers have material basis | In the search test, test once each with synonym-rewritten questions, record the number of candidates and scores, and check whether the follow-up items fall on the hazard item, drill headcount, check item, and signature fields |

## Three common errors

- Symptom: the same question phrased differently fails to recall hazard items and rectification deadlines. Cause: the recall mode does not match the material form, and `searchMode` was not switched in the search test to compare candidates.
- Symptom: drill records are inconsistent with the plan but no follow-up is made. Cause: candidates do not cover the sign-in and headcount fields, and key snippets are trimmed after similarity filtering.
- Symptom: missing access control and school bus check items are still treated as complete intake. Cause: missing-item identification did not check the check items and responsible-person signature fields item by item.

## How to verify the setup

This feature's acceptance: test once each with synonym-rewritten questions, compare the number of candidates and scores, then toggle rerank to see the ranking of the top few results; at the same time, check the tokens and array count of the quoted text after `similarity` filtering, and record the array count separately, without comparing it for equality with `quoteMaxToken`.

Business test: ask a question missing key information, and see whether it first follows up before answering.

- In the knowledge base search test, retrieve once each for the same question with synonym-rewritten questions, record the number of candidates and scores, and check whether the four field categories are hit: hazard items and rectification deadlines, drill headcount and sign-in, access control and school bus check items, and responsible-person signatures.
- Switch `searchMode` and `usingReRank` and retrieve once each, compare the number of candidates and scores and the ranking of the top few results, confirm that missing items are identified and followed up, and after the answer has material basis, transfer it to the handler.
