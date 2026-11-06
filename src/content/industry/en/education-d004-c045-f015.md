---
title: Knowledge Base Retrieval for Off-Campus Training Registration and Compliance: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c045-f015
page_type: 行业问题页
application_area: education
meta_title: Training Compliance | Retrieval | Handover
meta_description: Training Compliance: review retrieval for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Off-Campus Training Registration and Compliance: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

For off-campus training compliance filing and penalty response, the material sources are the school operating license, course filing materials, fee disclosure, rectification notices, and internal handover records. The update cadence rolls with filing changes, inspection feedback, and penalty decisions. When entering the knowledge base retrieval service, the school operating license provides the entity name, license number, validity period, and signature fields; the course filing materials provide the course name, class hours, textbook version, and filing date; the fee disclosure provides fee items, standards, refund rules, and disclosure date; the rectification notices and handover records provide the responsible person and receipt. Each material participates in recall in the form of candidate snippets, for subsequent nodes or manual generation of issuable material drafts and handover records. Field characteristics are concentrated in names, quantities, dates, versions, and signatures, and must be compared item by item in the retrieval results.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after mode, merge, rerank, filter, and limit trimming). The issuable material drafts and handover records are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| School operating license | The entity name, license number, validity period, and signature fields are complete and consistent with the course filing materials | In the search test, switch `searchMode`, check whether the names, dates, and signatures in the candidate snippets come from the same source; record the number of candidates and the score |
| Course filing materials | The course name, class hours, textbook version, and filing date are consistent in both materials, and the versions are synchronized | Compare the order of the top few results before and after enabling `usingReRank`, and check whether dates and versions are reranked to relevant positions; use `similarity` to observe candidate changes before and after filtering |
| Fee disclosure | The fee items, standards, refund rules, and disclosure date fields are complete, and missing items are blocked | Draft one according to the template and complete one handover, and see whether it is blocked when a signature or receipt is missing; record the `limit` of the quoted text and the number of array items |
| Handover record | The responsible person is clear, the version and date are consistent, and the receipt is traceable | Check whether the responsible person and date in the handover record correspond to the school operating license and course filing materials; if items are missing, require supplementary signatures |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match between the school operating license and the course filing materials. Cause: The candidate snippets come from different recall channels, and drafting begins without field-by-field comparison.
- Phenomenon: The versions of the fee disclosure and rectification notice are not synchronized, and the handover record still references the old version. Cause: The version and date were not checked during retrieval, and the old snippet still ranks at the front after reranking.
- Phenomenon: The material draft lacks a signature or receipt, and the handover cannot be signed for. Cause: The candidate snippets do not cover the signature field, and key paragraphs are trimmed after similarity filtering.

## How to verify the setup

Acceptance for this feature: test once each with synonym-rewritten questions, compare candidates and scores, then toggle reranking to see the order of the top few results; record the number of candidates and scores, and check the impact of `similarity`, `limit`, `searchMode`, and `usingReRank` on the results.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- In the knowledge base search test, switch `searchMode`, compare the candidate snippets and scores of the semantic, full-text, and hybrid modes, and record the number of candidates.
- Enable or disable `usingReRank`, compare the ranking changes of the top few results; use `similarity` to observe candidate changes before and after filtering, and separately record the `limit` of the quoted text and the number of array items.
