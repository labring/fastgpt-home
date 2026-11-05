---
title: Knowledge Base Retrieval for Sino-Foreign Education Establishment and Annual Reports: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c048-f015
page_type: 行业问题页
application_area: education
meta_title: Joint Education | Retrieval | Intake
meta_description: Joint Education: review retrieval for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Sino-Foreign Education Establishment and Annual Reports: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the scenario of the establishment and annual reports of Chinese-Foreign cooperative education institutions. The materials include three categories: the establishment application, the cooperation agreement, and the articles of association. The establishment application focuses on the institution name, education level, enrollment scale, and signatures and seals; the cooperation agreement focuses on the names of the Chinese and foreign parties, the amount of capital contribution, the signing date, and the receipt; the articles of association focus on the governance structure, rules of procedure, and effective date. When the three categories of materials enter the knowledge base retrieval function, each participates in recall as an independent fragment source: establishment application fragments are used to verify the declared fields, cooperation agreement fragments are used to verify the agreements between both parties and the signing information, and articles of association fragments are used to verify the internal governance provisions. The materials are updated according to the annual declaration and annual report cycle, and versions iterate frequently. The same record may appear in multiple materials with inconsistent names, amounts, or dates, or versions may not be synchronized, or signatures and receipts may be missing. Therefore, retrieval must retain key fragments of the original text for item-by-item comparison.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), which outputs candidate fragments and similarity scores (after pattern, merge, rerank, filter, and upper-limit trimming). "Acceptance records and follow-up questions for completion" are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Establishment application | Check whether the institution name, education level, enrollment quantity, signing date, and signatures and seals are consistent with the cooperation agreement and articles of association | In the knowledge base search test, switch `searchMode`, retrieve once each with synonymous questions, record the number of candidates and the `similarity` score, and check whether the returned fragments contain the name, quantity, date, and signature fields |
| Cooperation agreement | Check whether the names of the Chinese and foreign parties, the amount of capital contribution, the signing date, and the receipt correspond to the establishment application and articles of association | Compare the order of the top few candidates before and after enabling `usingReRank`, check whether the returned fragments contain both semantic and full-text recall results, and confirm that the signing date and receipt fields are retained |
| Articles of association | Check whether the governance structure, rules of procedure, effective date, and signature page are synchronized with the establishment application and cooperation agreement | Adjust `limit` to observe changes in the number of candidates, record the array length separately, and check whether the tokens of the cited text retain the effective date and key fragments of the signature page |
| Acceptance records and follow-up questions for completion | Determine whether missing items are identified and followed up on, and whether answers are based on materials | Ask a question that lacks key information, see whether it follows up before answering, and check the candidate fragments and scores on which the follow-up is based |

## Three common errors

- Phenomenon: The same institution name is written inconsistently in the establishment application and the cooperation agreement. Cause: The two materials were drafted separately, without field-level alignment and version synchronization.
- Phenomenon: The signing date of the cooperation agreement does not match the effective date of the articles of association, and the receipt is missing. Cause: The materials are updated at different paces, the old version was not replaced, and the signature page was not returned.
- Phenomenon: There are many candidates, but the ones ranked at the front are all irrelevant, and the answer lacks key paragraphs. Cause: The retrieval mode does not match the material form, rerank is not enabled, or the similarity filter is too broad.

## How to verify the setup

This function's acceptance: test once each with synonymously rewritten questions, compare candidates and `similarity` scores, then toggle `usingReRank` on and off to see the ranking of the top few; record the number of candidates, the array length, and the tokens of the cited text, and do not compare the number of cited items with the citation budget as equal.

Business test: ask a question that lacks key information, and see whether it follows up before answering.

- In the knowledge base search test, switch `searchMode`, retrieve the same question using semantic, full-text, and hybrid modes respectively, and record the differences in the number of candidates and scores.
- Retrieve once each with `usingReRank` enabled and disabled, compare the order of the top few candidates, and check whether the cited text retains the name, quantity, date, and signature fields.
