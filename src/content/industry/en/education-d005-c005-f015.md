---
title: Knowledge Base Retrieval for Kindergarten Safety and Emergency Drills: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c005-f015
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Safety | Retrieval | Versions
meta_description: Kindergarten Safety: review retrieval for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Kindergarten Safety and Emergency Drills: Maintain Document Versions and Changes

## What this category's data looks like

This page addresses the category of kindergarten safety protection and emergency drills. Materials include hazard rectification ledgers, drill plans and sign-in records, access control and school bus inspection forms, and responsible person signature pages. Sources are daily campus inspections, drill execution, and access control and school bus inspections, with update cadence changing with each drill, hazard rectification, and inspection cycle. When materials enter knowledge base retrieval and recall, hazard items and rectification deadlines, drill headcount and sign-in, access control and school bus inspection items, and responsible person signatures each participate in recall as independent chunks, supporting the generation of version ledgers and change records.

## Configuration and implementation checks

This step is performed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after mode, merge, rerank, filter, and limit trimming). Version ledgers and change records are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Hazard rectification ledger | Whether hazard items and rectification deadlines are closed-loop, and whether responsible person signatures are complete | In the search test, switch `searchMode`, check whether candidate chunks simultaneously cover hazard items, rectification deadlines, and signature pages, and record the number of candidates and scores |
| Drill plans and sign-in records | Whether drill headcount and sign-in are consistent with the plan, and whether records are inconsistent with the plan | Compare the order of the top few candidates before and after enabling `usingReRank`, and check whether the sign-in headcount and plan description are hit in the same chunk |
| Access control and school bus inspection forms | Whether access control and school bus inspection items are missing, and whether responsible person signatures are complete | Adjust `similarity` and `limit`, check whether candidate chunks retain inspection items and key signature content, and separately record the number of entries in the reference array |
| External document reference blocks | Current version is unique, old versions are traceable, and references are synchronized | Change the text of one inspection item, re-retrieve, and check whether candidate scores and reference text are updated synchronously |

## Three common errors

- Symptom: In the hazard rectification ledger, hazards are not closed-loop, and the old version is still recalled. Cause: After changes, the knowledge base was not updated synchronously, and retrieval still hits old chunks.
- Symptom: Drill records are inconsistent with the plan, and sign-in headcount does not match. Cause: The plan and sign-in belong to different chunks, and after merge and rerank they are not associated with the same version.
- Symptom: Access control and school bus inspection items are missing, and signature pages are absent. Cause: Improper material splitting granularity, and similarity filtering and reference limit trimming remove key chunks.

## How to verify the setup

This feature acceptance: Test once each with synonym-rewritten questions, compare candidates and scores, then toggle rerank on and off to observe the ordering of the top few results.

Business test: Change one piece of content and see whether the version number and references are updated synchronously.

- In the knowledge base search test, switch `searchMode`, record the number of candidates and scores, and check whether hazard items and rectification deadlines are hit simultaneously.
- Compare the ordering of the top few results before and after enabling `usingReRank`, adjust `similarity` and `limit`, and check reference text tokens and the number of array entries, recording each separately.
