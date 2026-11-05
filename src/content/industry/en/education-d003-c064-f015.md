---
title: Knowledge Base Retrieval for University Laboratory Safety Classification: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c064-f015
page_type: 行业问题页
application_area: education
meta_title: Lab Safety Categories | Retrieval | Intake
meta_description: Lab Safety Categories: review retrieval for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for University Laboratory Safety Classification: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the university laboratory safety grading and classification scenario; the materials include the laboratory grading and classification table, the hazard source list, and the safety responsibility statement. The grading and classification table records the laboratory name, category, level, hazard sources, and date; the hazard source list records the hazard source name, quantity, storage location, and responsible person; the safety responsibility statement records the responsibility level, signature, and receipt. When the three types of materials enter the knowledge base retrieval and recall function, their roles differ: the grading and classification table serves as the primary retrieval object, the hazard source list serves as supplementary evidence, and the safety responsibility statement serves as the basis for responsibility and signature verification. In terms of update cadence, the grading and classification table is updated as laboratories are adjusted, the hazard source list is updated as hazardous chemicals and equipment change, and the safety responsibility statement is updated per academic year or when the responsible person changes. In terms of field characteristics, name, quantity, date, and signature are the key fields for cross-material comparison; the same record should remain consistent across different materials, versions should be synchronized, and signatures and receipts should be complete.

## Configuration and implementation checks

This step is performed by the knowledge base retrieval service (retrieval node and search test), which outputs candidate snippets and similarity scores (after pattern, merge, rerank, filter, and upper-limit trimming). The "acceptance records and completed question items" are handled by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Laboratory grading and classification table | Whether the name, category, level, hazard sources, and date fields are complete and consistent with the hazard source list | In the knowledge base search test, use `searchMode` to switch between semantic, full-text, or hybrid, check the candidate snippets and scores, then enable `usingReRank` to compare the ranking of the top few results |
| Hazard source list | Whether the hazard source name, quantity, storage location, and responsible person match the grading and classification table | Use synonymous rewrites of the same question to retrieve once each, record the number of candidates and scores, and check whether the returned citations cover the quantity and location fields |
| Safety responsibility statement | Whether the responsibility level, signature, and receipt are complete, and whether the version is synchronized with the current academic year | Retrieve snippets of the responsibility statement, check whether the signature and receipt fields appear in the cited text, and record the number of entries in the citation array |
| Acceptance records and completed question items | Whether missing items are identified and followed up on, and whether answers are grounded in the materials | Test with a question that lacks key information to see whether it asks a follow-up before answering, and check whether the candidate snippets can support the follow-up content |

## Three common errors

- Symptom: The name, quantity, or date of the same laboratory does not match between the grading and classification table and the hazard source list. Cause: The two materials are not updated in sync, and no cross-material comparison was performed at data entry.
- Symptom: The safety responsibility statement lacks a signature or receipt, yet retrieval still returns responsibility snippets. Cause: The material version is not synchronized, and the signature and receipt fields were not included in verification.
- Symptom: The same question cannot be recalled when rephrased, and the top few candidates are irrelevant. Cause: The retrieval mode does not match the material form, rerank is not enabled, or the similarity filter is too broad.

## How to verify the setup

This feature's acceptance: test once each with synonymous rewritten questions, compare candidate snippets and similarity scores, then toggle rerank on and off to inspect the ranking of the top few results, and use `similarity` and `limit` to check filtering and trimming.

Business test: ask a question that lacks key information to see whether it asks a follow-up before answering, and check whether the candidate snippets can support the answer; record the citation count separately by array length, and verify the citation text tokens separately.

- In the knowledge base search test, switch `searchMode`, retrieve once each for synonymous rewrites of the same question, record the number of candidates and scores, then enable `usingReRank` to compare the ranking of the top few results.
- Check the name, quantity, date, signature, and receipt fields of the grading and classification table, the hazard source list, and the safety responsibility statement, check whether versions are synchronized, record the citation count by array length, and verify the citation text tokens separately.
