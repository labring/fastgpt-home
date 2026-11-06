---
title: Reranking and Hybrid Retrieval for Kindergarten Safety and Emergency Drills: Find Supporting Evidence
slug: /en/industry/education-d001-c005-f018
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Safety | Reranking | Evidence
meta_description: Kindergarten Safety: review reranking for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Reranking and Hybrid Retrieval for Kindergarten Safety and Emergency Drills: Find Supporting Evidence

## What this category's data looks like

This page addresses kindergarten safety protection and emergency drill scenarios. The materials come from the kindergarten's safety management system, hazard inspection ledgers, emergency drill plans and sign-in records, access control and school bus checklists, and rectification notices with responsible person signature pages. The update cadence follows the semester and drill cycle; hazard rectification is closed-loop according to deadlines, and drill records are archived by session. When materials enter hybrid retrieval, the vector path handles semantically similar hazard descriptions and rectification requirements, while the full-text path handles exact hits on fields such as access control check items, drill headcount, sign-in, and responsible person signatures. After the results from the two paths are merged, the candidate range is large, so a reranking model must sort by rerank score and filter, then hand off to citation trimming and answer generation to produce evidence entries that can be traced back to the original text.

## Configuration and implementation checks

This step is executed by the reranking model in the retrieval service, which outputs the sorted candidates and rerank scores. "Evidence entries that can be traced back to the original text" are then completed by citation trimming and answer generation. Hybrid retrieval simultaneously runs the vector and full-text paths and merges the results. After merging, the range is large and similarity filtering cannot be applied directly; typically the reranking model is then used to sort and filter by rerank score.

| Object | Check | Verification action |
| --- | --- | --- |
| Hybrid retrieval | Both the vector and full-text paths are enabled, and hazard description and check item fields can be recalled simultaneously | Check the switches for both paths in the search parameters, confirm that the `searchMode` value covers both paths, and record the number of candidates and scores |
| Multi-path merge | The results from the two paths have been merged, and candidates come from both semantically similar hazard entries and exactly matched drill headcount and sign-in fields | Check whether candidates come from both paths simultaneously, and compare the number of candidates and score changes before and after merging |
| Reranking model | It is bound and used for sorting and filtering, and entries such as hazard items, rectification deadlines, and responsible person signatures can be ranked in the top few | Compare the ranking and scores before and after reranking, check the `usingReRank` status, and use `similarity` and `limit` to observe the filtering effect |
| Hazard inspection ledger and drill records | Hazard items and rectification deadlines can be matched to the original text, drill headcount is consistent with sign-in and responsible person signatures, and check items have no omissions | Trace each item back to the original text one by one, check whether hazards are closed-loop and whether drill records match the plan, and record the tokens and array length of the cited text |

## Three common errors

- Symptom: there are many candidates but the top few are irrelevant. Cause: after hybrid retrieval the range is large, rerank score filtering was not used, and hazard descriptions are mixed with check items.
- Symptom: hazards are not closed-loop. Cause: the ledger only records discovered items, and rectification deadlines and responsible person signatures are not traced back to the original text, so entries do not match.
- Symptom: drill records do not match the plan, and check items are omitted. Cause: drill headcount and sign-in fields were not exactly matched, and access control and school bus check items were led astray by semantic recall.

## How to verify the setup

Feature acceptance: compare the order and scores of the top three before and after enabling reranking, confirm that entries such as hazard items and rectification deadlines, drill headcount and sign-in, and responsible person signatures are ranked at the front, and record the number of candidates and scores.

Business test: ask a cross-material evidence question and see whether the answer provides traceable sources.

- Check the two-path switches of `searchMode` and the binding status of `usingReRank`, record the number of candidates and scores, then compare the order of the top three before and after reranking.
- Trace each item back to the original text one by one, check hazard items and rectification deadlines, drill headcount and sign-in, access control and school bus check items, and responsible person signatures, and record the tokens and array length of the cited text separately.
