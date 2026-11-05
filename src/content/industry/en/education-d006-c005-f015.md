---
title: Knowledge Base Retrieval for Kindergarten Safety and Emergency Drills: Track Progress and Check Statistics
slug: /en/industry/education-d006-c005-f015
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Safety | Retrieval | Progress
meta_description: Kindergarten Safety: review retrieval for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Kindergarten Safety and Emergency Drills: Track Progress and Check Statistics

## What this category's data looks like

The materials on this page come from the daily ledgers of kindergarten safety protection and emergency drills, including hazard inspection records, rectification notices and receipts, drill plans and sign-in sheets, access control and school bus checklists, and responsible person signature pages. These materials are updated weekly or monthly, and the fields mainly consist of hazard items, rectification deadlines, drill participant counts, sign-ins, check items, and responsible person signatures. When entering the knowledge base retrieval service, hazard items and rectification deadlines, drill participant counts and sign-ins, access control and school bus check items, and responsible person signatures are recalled as independent segments, to be used by subsequent nodes or manual verification of the progress table and statistical scope description. The materials themselves are not statistical tables; retrieval only returns candidate segments and similarity scores for the business side to verify the record counts against the statistical counts.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate segments and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The progress table and statistical scope description are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Hazard inspection records | Whether hazard items correspond to rectification deadlines, and whether rectification is closed-loop | Retrieve once each with synonymous questions, look at the candidate count and scores, check whether hazard items and rectification deadlines appear in pairs, and confirm whether unclosed items are recalled |
| Drill plans and sign-in sheets | Whether drill participant counts match sign-ins, and whether records match the plan | Switch `searchMode` to semantic, full-text, or hybrid, compare candidates; check the drill participant count and sign-in fields, and see whether records match the plan |
| Access control and school bus checklists | Whether check items are missing, and whether responsible person signatures are complete | Turn `usingReRank` on or off, and observe changes in the ranking of the top few results; check the check item and responsible person signature fields, and confirm whether missing items are recalled |
| Progress table and statistical scope description | Whether record counts match statistical counts, and whether the scope is written in the header | Use one week of records to verify the totals, and see whether the scope and exceptions are clearly stated; record the candidate count and scores, record the citation count separately by array length, and verify the tokens of the cited text |

## Three common errors

- Phenomenon: In hazard inspection records, hazard items appear but rectification deadlines are missing, so they are omitted from statistics. Cause: the recalled segment only covers the hazard description and does not bring out the deadline field, so hits and associations need to be verified.
- Phenomenon: The number of drill sign-ins does not match the planned number in the plan, causing deviations in the weekly report totals. Cause: the drill plan and sign-in sheet belong to different segments, and they were not verified under the same scope when merging statistics.
- Phenomenon: In access control and school bus checklists, check items are missing and the responsible person signature column is blank. Cause: segment recall is incomplete, and key check items did not enter the candidates after similarity filtering, so the recall results need to be reviewed.

## How to verify the setup

Acceptance of this feature: test once each with synonymously rewritten questions, compare the candidate count and scores, then turn rerank on and off to observe the ranking of the top few results; switch `searchMode` and adjust `limit` to observe candidate changes.

Business test: use one week of records to verify the totals, and see whether the scope and exceptions are clearly stated; record the candidate count and scores, record the citation count separately by array length, and verify the tokens of the cited text against the citation limit.

- In the knowledge base search test, switch `searchMode`, compare the candidate counts and scores returned by the semantic, full-text, and hybrid modes, and confirm that the material form matches the mode.
- Turn `usingReRank` on or off, and compare the ranking of the top few results; after adjusting `limit`, record the candidate count, and separately record the citation array length and the tokens of the cited text.
