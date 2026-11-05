---
title: Knowledge Base Retrieval for Kindergarten Safety and Emergency Drills: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c005-f015
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Safety | Retrieval | Checks
meta_description: Kindergarten Safety: review retrieval for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Kindergarten Safety and Emergency Drills: Compare Documents and Locate Differences

## What this category's data looks like

The materials involved in kindergarten safety protection and emergency drills include hazard ledgers, rectification notices, drill plans, sign-in sheets, access control and school bus inspection records, and responsible person signature pages. These materials come from daily campus inspections, drill organization, and logistics security, and are updated weekly or per occurrence. Fields include hazard items, rectification deadlines, number of drill participants, sign-ins, inspection items, and responsible person signatures. When entering the knowledge base retrieval service, hazard ledgers and rectification notices serve as reference materials, drill plans and sign-in sheets serve as process materials, and access control and school bus inspection records serve as special materials. Each participates in recall in fragment form, for subsequent nodes or manual comparison of whether names, quantities, and dates are consistent.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The "discrepancy list" is completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Hazard ledger and rectification notice | Whether hazard items and rectification deadlines are consistent, and whether hazards are closed-loop | In the search test, switch `searchMode` to hybrid, see whether candidates include both semantic and full-text results, and record the number of candidates and scores |
| Drill plan and sign-in sheet | Whether the number of drill participants and sign-ins are consistent, and whether drill records match the plan | Retrieve once each with synonymous questions, compare candidates and scores, and observe changes in the order of the top few results before and after enabling `usingReRank` |
| Access control and school bus inspection records | Whether inspection items are missing and whether responsible person signatures are complete | Check whether returned candidates cover inspection items and signature pages, and verify the key original text fragments retained after `similarity` filtering |
| Responsible person signature page | Whether signatures match the corresponding hazard or drill records | Retrieve by combining object name and date, record the number of candidates and scores, and confirm that signature fragments and record fragments are hit at the same time |

## Three common errors

- Phenomenon: The hazard ledger shows rectification completed, but the rectification notice has no closed-loop record. Cause: The two materials were ingested separately, and recall hit only one of them, without cross-material comparison for the same object.
- Phenomenon: The number of drill sign-ins does not match the planned number in the plan. Cause: The similarity between the plan and sign-in sheet fragments was close, and after reranking the order of the top few results changed, and manual review did not check them one by one.
- Phenomenon: Access control and school bus inspection records have missing inspection items. Cause: Inspection table fragments were trimmed by the reference limit, key inspection items did not enter the candidates, and it is necessary to verify the tokens of the referenced text and separately record the number of array items.

## How to verify the setup

Acceptance of this feature: test once each with synonymously rewritten questions, compare candidates and scores, then toggle reranking on and off to observe the ordering of the top few results; at the same time switch `searchMode`, record the number of candidates and scores, and observe the impact of `limit` and `similarity` on the returned results.

Business test: use one real record to find fields inconsistent with the ledger, hand it to the reviewer for confirmation, and write it back.

- In the knowledge base search test, retrieve the same object separately in semantic, full-text, and hybrid modes, record the number of candidates and scores, and compare the ordering of the top few results.
- Retrieve once each with reranking enabled and disabled, verify whether candidates include both semantic and full-text results, and confirm that the tokens of the referenced text and the number of array items are recorded separately.
