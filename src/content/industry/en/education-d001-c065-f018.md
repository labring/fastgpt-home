---
title: Reranking and Hybrid Retrieval for Laboratory Hazardous Chemical Purchasing and Records: Find Supporting Evidence
slug: /en/industry/education-d001-c065-f018
page_type: 行业问题页
application_area: education
meta_title: Lab Chemicals | Reranking | Evidence
meta_description: Lab Chemicals: review reranking for evidence lookup. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Reranking and Hybrid Retrieval for Laboratory Hazardous Chemical Purchasing and Records: Find Supporting Evidence

## What this category's data looks like

Materials for this category of laboratory hazardous chemical procurement and ledgers typically include three types: procurement application forms, requisition registration forms, and inventory ledgers. The sources are the park laboratory management department and copies retained by each laboratory, and the update cadence follows each procurement, requisition, and inventory count. Procurement application forms record the item name, specification, quantity, application date, and approval signature; requisition registration forms record the requisitioner, requisitioned quantity, requisition date, and issuance signature; inventory ledgers record the balance quantity, inbound date, inventory count date, and custodian signature. When these three types of materials enter this feature, procurement application forms and requisition registration forms are retrieved as basis sources, inventory ledgers participate in candidate ranking as a comparison baseline, and hybrid retrieval is responsible for recalling field clues scattered across different materials together, providing citable original text fragments for subsequent quote trimming.

## Configuration and implementation checks

This step is executed by the rerank model in the retrieval service, which outputs ranked candidates and rerank scores. "Basis entries with citable original text" are then completed by quote trimming and answer generation. Hybrid retrieval runs both the vector and full-text paths and merges the results; after merging, the scope is large and similarity filtering cannot be applied directly, so a rerank model is usually used again to rank and filter by rerank score.

| Object | Check | Verification action |
| --- | --- | --- |
| Procurement application form | The name, quantity, application date, and approval signature match the original text, and it is the current version | Check the two-path switches for `searchMode` in the search parameters; compare the number of candidates and scores before and after reranking, and confirm that `usingReRank` is already used for ranking and filtering |
| Requisition registration form | The requisitioner, requisitioned quantity, requisition date, and issuance signature match the original text, and it is the current version | See whether candidates come from both paths at the same time; check the number of candidates under `similarity` and `limit`, and check whether rerank scores filter out irrelevant entries |
| Inventory ledger | The balance quantity, inbound date, inventory count date, and custodian signature match the original text, and it is the current version | Compare the ranking and scores before and after reranking; check whether the tokens of the quoted text exceed `quoteMaxToken`, and record the number of array entries separately |

## Three common errors

- Symptom: the name or quantity of the same record does not match between the procurement application form and the inventory ledger. Cause: the two materials are maintained separately, no field-level comparison is performed, and after retrieval recall the original text is not checked by citation.
- Symptom: the dates in the requisition registration form and the inventory ledger are inconsistent, and the versions are not synchronized. Cause: after the inventory count only one place is updated, while the other remains the old version, and rerank scores cannot identify version differences.
- Symptom: the procurement application form lacks an approval signature or the requisition registration form lacks an issuance receipt. Cause: material archiving is incomplete, retrieval can still recall entries, but the basis entries cannot satisfy the signature verification requirement.

## How to verify the setup

Feature acceptance: turn reranking on and off to compare the order and scores of the first three items, confirm changes in the number of candidates and rerank scores, and check that `usingReRank` is already used for ranking and filtering.

Business test: ask a cross-material basis question and see whether the answer provides a citable source.

- Check the two-path switches for `searchMode` in the search parameters, and confirm that both the vector and full-text paths are enabled.
- Compare the ranking and scores before and after reranking, check the number of candidates under `similarity` and `limit`, and check whether the tokens of the quoted text exceed `quoteMaxToken`.
