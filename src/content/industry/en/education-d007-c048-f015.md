---
title: Knowledge Base Retrieval for Sino-Foreign Education Establishment and Annual Reports: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c048-f015
page_type: 行业问题页
application_area: education
meta_title: Joint Education | Retrieval | Review
meta_description: Joint Education: review retrieval for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Sino-Foreign Education Establishment and Annual Reports: Trace Exceptions and Review Results

## What this category's data looks like

The establishment and annual report materials of Chinese-foreign cooperative education institutions include establishment applications, cooperation agreements, articles of association, and annual reports. They come from the filing system and offline archives, and are updated by filing batch and year. The establishment application states the institution name, education level, enrollment scale, and signatures and seals; the cooperation agreement stipulates each party's capital contribution, name, quantity, and date; the articles of association specify the governance structure and signature receipts; the annual report reflects operational data and changes. When the materials enter the knowledge base retrieval service, the establishment application and cooperation agreement serve as the main fragments for semantic and full-text recall, while the articles of association and annual report supplement governance and operational fields. The retrieval node and search test are responsible for recalling candidate fragments and similarity scores, and the mode, merge, rerank, filter, and limit trimming jointly determine the returned content. During exception tracing, the name, quantity, and date of the same record must be aligned between the two materials, and only when version synchronization and signature receipts are complete can it enter manual review.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after mode, merge, rerank, filter, and limit trimming). The exception list and review conclusions are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Establishment application | The name, quantity, date, and signatures and seals must be aligned item by item with the cooperation agreement and articles of association | In the search test, use synonymous questions to retrieve the institution name and enrollment scale, record the number of candidates and scores, and check whether the original fragment contains the signature page |
| Cooperation agreement | The contributor names, contribution amounts, and dates must be consistent with the articles of association and annual report, and the version number must be synchronized | Switch `searchMode` to semantic, full-text, or hybrid, compare whether the candidates contain both semantic and full-text results, and check the agreement version and receipt |
| Articles of association | The governance structure, signatories, and receipt date must be consistent with the establishment application; missing signatures are an exception | Compare the ranking of the top few items before and after enabling `usingReRank`, and inspect the tokens and array length of the cited text after `similarity` filtering |
| Annual report | The operational data and change records must match the dates and quantities in the cooperation agreement and articles of association | Use annual report fields to retrieve change records, check the number of cited items and the completeness of the original text after `limit` trimming, and mark fields that do not match |

## Three common errors

- Phenomenon: The same institution name is written differently in the establishment application and the cooperation agreement, so the hit fragments do not match during tracing. Cause: The two materials were entered separately without name normalization, and no cross-check was performed after retrieval recall.
- Phenomenon: The contribution amount or enrollment quantity is inconsistent between the articles of association and the annual report, making the review conclusion difficult to sign. Cause: The versions were not synchronized, the old articles of association remained in the knowledge base, and old fragments were mixed in during retrieval.
- Phenomenon: The cooperation agreement lacks signatures or receipts, and the exception list cannot confirm the responsible party. Cause: The scanned copy does not include the signature page, the candidate fragments returned by retrieval lack key paragraphs, and manual review has no original record support.

## How to verify the setup

This function acceptance: test once each with synonym-rewritten questions, compare candidates and scores, then toggle rerank on and off to see the ranking of the top few items; at the same time switch `searchMode` and adjust `similarity`, record the number of candidates and scores, record the array length separately after `limit` trimming, and check the tokens of the cited text separately.

Business test: create an exception record, see whether the source material can be traced, and confirm that the exception is supported by original records and signed off by the reviewer.

- In the knowledge base search test, switch `searchMode` to semantic, full-text, or hybrid, compare candidate fragments and similarity scores, and check whether both semantic and full-text results are included.
- Compare the ranking of the top few items before and after enabling `usingReRank`, adjust `similarity` and `limit`, record the number of cited items and the tokens of the cited text, and check whether key fragments of the original text are retained.
