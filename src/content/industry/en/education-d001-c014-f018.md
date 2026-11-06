---
title: Reranking and Hybrid Retrieval for School Moral Education and Class Teacher Work: Find Supporting Evidence
slug: /en/industry/education-d001-c014-f018
page_type: 行业问题页
application_area: education
meta_title: Pastoral Education | Reranking | Evidence
meta_description: Pastoral Education: review reranking for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Reranking and Hybrid Retrieval for School Moral Education and Class Teacher Work: Find Supporting Evidence

## What this category's data looks like

This page focuses on school moral education and homeroom teacher work. Materials cover themed class meeting plans, student comprehensive quality records, and home visit records, sourced from kindergarten archives and daily class reporting. In terms of update cadence, themed class meeting plans are archived by week or theme batch, comprehensive quality records are summarized by semester stage, and home visit records are supplemented entry by entry. Field characteristics include record name, quantity, date, signature, and receipt; across materials, the same record name, quantity, and date often fail to match, versions are not synchronized, and signatures or receipts are missing. When materials enter retrieval, themed class meeting plans, comprehensive quality records, and home visit records each serve as independent candidate sources; hybrid retrieval simultaneously runs the vector and full-text paths and merges the results; the rerank model uniformly ranks the merged candidates; and citation trimming and answer generation then produce, based on this, basis entries that can be traced back to the original text.

## Configuration and implementation checks

This step is executed by the rerank model in the retrieval service, which outputs the ranked candidates and rerank scores. The "basis entries that can be traced back to the original text" are then completed by citation trimming and answer generation. Hybrid retrieval simultaneously runs the vector and full-text paths and merges the results; after merging, the scope is large and similarity filtering cannot be applied directly, so the rerank model is usually then used to rank and filter by rerank score.

| Object | Check | Verification action |
| --- | --- | --- |
| Themed class meeting plan | Name, quantity, date, and signature match the original text, and the version is current | Open the original plan, check the record name, quantity, date, and signature field, and confirm consistency with the candidate source |
| Student comprehensive quality record | The name, quantity, and date of the same record are consistent across the two materials, and the version is synchronized | Compare the comprehensive quality record with the themed class meeting plan, check the name, quantity, and date item by item, and check whether the version is synchronized |
| Home visit record | Signature or receipt is complete, and the date is consistent with the home visit facts | View the signature and receipt fields of the home visit record, check the date against the corresponding material, and confirm there are no missing items |
| Rerank model | It is bound and used for ranking and filtering, and the number of candidates and scores can be compared | In the search parameters, check `searchMode`, `usingReRank`, `similarity`, and `limit`, and compare the number of candidates and scores before and after reranking |

## Three common errors

- Phenomenon: there are many candidates but the top few are irrelevant. Cause: after merging, the scope is large, filtering is not performed by rerank score, and similarity filtering appears to be ineffective.
- Phenomenon: the name, quantity, and date of the same record fail to match across the two materials. Cause: the themed class meeting plan and the comprehensive quality record are archived separately, and versions are not synchronized.
- Phenomenon: the home visit record lacks a signature or receipt. Cause: when supplementing entry by entry, the signature field was not backfilled, and the candidate source cannot be traced back to the complete original text.

## How to verify the setup

This feature's acceptance: compare the order and scores of the top three before and after enabling reranking, check the number of candidates and rerank scores, and confirm the status of `usingReRank`, `similarity`, `limit`, and `searchMode`.

Business test: ask a basis question that spans materials and see whether the answer provides a traceable source.

- In the search parameters, check the two-path switches of `searchMode`, the binding status of `usingReRank`, and the values of `similarity` and `limit`, and record the number of candidates and scores before and after reranking.
- Open the original themed class meeting plan, student comprehensive quality record, and home visit record, check the name, quantity, date, signature, and receipt item by item, and confirm that the entries can be traced back to the original text and that the version is current.
