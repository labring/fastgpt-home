---
title: Knowledge Base Retrieval for Sino-Foreign Education Establishment and Annual Reports: Find Supporting Evidence
slug: /en/industry/education-d001-c048-f015
page_type: 行业问题页
application_area: education
meta_title: Joint Education | Retrieval | Evidence
meta_description: Joint Education: review retrieval for evidence lookup. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Sino-Foreign Education Establishment and Annual Reports: Find Supporting Evidence

## What this category's data looks like

The materials for the establishment and annual reports of Chinese-Foreign cooperative education institutions include three types: the establishment application, the cooperation agreement, and the articles of association. The establishment application contains the institution name, education level, enrollment scale, signature, and date; the cooperation agreement contains the names of the Chinese and foreign parties, the amount of capital contribution, the validity period, and seals; the articles of association contain the governance structure, financial system, and receipt. The materials are subject to the current version, and the update cadence is synchronized with the approval and annual report cycles. When entering knowledge base retrieval and recall, the three types of materials serve as candidate fragment sources respectively. The retrieval node recalls by semantic, full-text, or hybrid mode, merges multiple result paths and then reranks them, and after similarity filtering and citation limit trimming, outputs traceable original-text basis entries for replying to parents or writing into proposals.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after mode, merging, reranking, filtering, and limit trimming). The "traceable original-text basis entries" are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Establishment application | Fields, dates, and signatures are complete, and the name, quantity, and date for the same record are consistent with the cooperation agreement and articles of association | In the search test, switch `searchMode` to semantic, full-text, or hybrid, view the number of candidate entries and scores, and check whether the hit fragments trace back to the signature and date in the original establishment application text |
| Cooperation agreement | The names of the Chinese and foreign parties, the amount of capital contribution, the validity period, and seals are consistent in the current version, with no unsynchronized versions or missing signatures | Search once each with synonymous questions and compare candidates and scores; before and after enabling `usingReRank`, look at the ranking of the top few entries to confirm that agreement fragments are correctly recalled |
| Articles of association | The governance structure, financial system, and receipt fields are complete, and for the same record there are no mismatches in name, quantity, or date with the application and agreement | Adjust `similarity` and `limit`, observe changes in the number of candidate entries and scores, and check whether the cited text after trimming retains the key paragraphs of the articles of association |

## Three common errors

- Phenomenon: The same institution name is written differently in the application and the agreement, so retrieval traceability does not match. Cause: The two materials were not entered under a unified standard, and after candidate hits, the original-text association was not checked.
- Phenomenon: The quantity in the cooperation agreement is inconsistent with the record in the articles of association, and the cited fragments each say different things. Cause: The versions were not synchronized, and the old version still remains in the knowledge base and participates in recall.
- Phenomenon: The establishment application lacks a signature or receipt, yet candidate fragments are still recalled. Cause: Material completeness was not verified before ingestion, and retrieval returns results only by similarity.

## How to verify the setup

Acceptance of this feature: test once each with synonymously rewritten questions, compare the number of candidate entries and scores, then toggle reranking on and off to look at the ranking of the top few entries, and record the return differences under `similarity`, `limit`, `searchMode`, and `usingReRank`.

Business test: ask a cross-material basis question, see whether the answer gives a traceable source, and verify the tokens of the cited text and the number of array entries and record them separately.

- In the knowledge base search test, for the same question, search once each with the three `searchMode` options semantic, full-text, and hybrid, and record the number of candidate entries and scores.
- Enable and disable `usingReRank` and compare the ranking of the top few entries; adjust `similarity` and `limit` and check whether the cited text retains the key original-text fragments.
