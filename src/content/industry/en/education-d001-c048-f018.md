---
title: Reranking and Hybrid Retrieval for Sino-Foreign Education Establishment and Annual Reports: Find Supporting Evidence
slug: /en/industry/education-d001-c048-f018
page_type: 行业问题页
application_area: education
meta_title: Joint Education | Reranking | Evidence
meta_description: Joint Education: review reranking for evidence lookup. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Reranking and Hybrid Retrieval for Sino-Foreign Education Establishment and Annual Reports: Find Supporting Evidence

## What this category's data looks like

This page addresses the establishment and annual reports of Chinese-foreign cooperatively-run educational institutions; the materials include establishment applications, cooperation agreements, articles of association, as well as annual report receipts and signature pages. The establishment application states the institution name, educational level, cooperating parties, and proposed majors; the cooperation agreement stipulates capital contribution, quantity, term, and signatures; the articles of association specify the governance structure and dates. The annual report receipt reflects the operation of the previous cycle and signature confirmation. Materials enter the retrieval service in batches according to the rhythm of establishment, change, and annual reports, serving as candidate basis entries. Hybrid retrieval simultaneously runs the vector and full-text paths and merges the results, making cross-material bases easier to recall; the reranking model sorts the merged candidates and gives scores, and citation trimming and answer generation then form basis entries that can be traced back to the original text, used to reply to parents or write into proposals.

## Configuration and implementation checks

This step is executed by the reranking model in the retrieval service, which outputs the sorted candidates and reranking scores. The basis entries that can be traced back to the original text are then completed by citation trimming and answer generation. After hybrid retrieval merges the two paths, the scope is large and similarity filtering cannot be done directly; usually the reranking model is then used to sort and filter by reranking score.

| Object | Check | Verification action |
| --- | --- | --- |
| Establishment application | The name, quantity, date, and signatures must be aligned item by item with the cooperation agreement and articles of association, and it must be the current version | In the search parameters, check whether `searchMode` enables both the vector and full-text paths at the same time, and compare the number of candidate entries and scores before and after reranking |
| Cooperation agreement | The capital contribution, quantity, term, signatures, and receipt must be consistent with the application and articles of association, and signatures must not be missing | Compare the ordering and scores before and after reranking, confirm whether the top few candidates come from both paths at the same time, and record the number of candidate entries |
| Articles of association | The governance structure, dates, and signatures must be aligned with the application and agreement, and the version must be synchronized | Use `usingReRank` to confirm that reranking is bound and used for sorting and filtering, and check the tokens and array length of the cited text |
| Annual report receipt | The receipt date, signatures, and previous-cycle records must match the articles of association and agreement | Use `similarity` and `limit` to check the number of candidate entries and scores, and confirm that the basis entries can be traced back to the original text |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match between the application and the agreement. Cause: The two materials are entered separately and no field-level alignment is done; reranking can only sort and cannot rewrite the original text.
- Phenomenon: The articles of association have been revised, but retrieval still returns old-version entries. Cause: The version is not synchronized; when reranking scores are similar, the old version may still rank at the top, and citation trimming does not distinguish versions.
- Phenomenon: The agreement lacks signatures or the receipt is missing, but the basis entries are still recalled. Cause: The material fields are incomplete; reranking sorts by semantic relevance and does not verify signature and receipt status.

## How to verify the setup

Acceptance of this feature: turn reranking on and off to compare the order and scores of the top three, check the number of candidate entries and changes in reranking scores, and confirm that `usingReRank` is bound and used for sorting and filtering.

Business test: ask a cross-material basis question, see whether the answer gives a traceable source, and check the tokens and array length of the cited text and record them separately.

- In the search parameters, check whether `searchMode` enables both the vector and full-text paths at the same time, and confirm that the merged candidates come from both paths at the same time.
- Compare the ordering and scores before and after reranking, use `similarity` and `limit` to check the number of candidate entries and scores, and confirm that the basis entries can be traced back to the original text.
