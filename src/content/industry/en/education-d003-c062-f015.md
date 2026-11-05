---
title: Knowledge Base Retrieval for Research Ethics Review: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c062-f015
page_type: 行业问题页
application_area: education
meta_title: Research Ethics | Retrieval | Intake
meta_description: Research Ethics: review retrieval for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Research Ethics Review: Handle Questions and Collect Missing Information

## What this category's data looks like

In the research ethics review scenario, materials usually include ethics review applications, informed consent form templates, and risk assessment forms. Sources are mostly institutional internal template libraries and historical intake records, and the update cadence advances by batch or version number. Field characteristics center on name, quantity, date, and signature, and receipt location. The same record often has mismatched name, quantity, or date across two materials, unsynchronized versions, or missing signatures or receipts. When materials enter knowledge base retrieval, the ethics review application plays the role of the main record, the informed consent form template plays the role of version and signature verification, and the risk assessment form plays the role of risk item and date verification. Together, the three form the candidate sources for Q&A intake and missing-item follow-up.

## Configuration and implementation checks

The knowledge base retrieval service (retrieval node and search test) only outputs candidate snippets and similarity scores (after pattern, merge, rerank, filter, and limit trimming). Intake records and the completed follow-up questions must be handled by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Ethics review application | Fields include name, quantity, date, and signature, and must be aligned item by item with the informed consent form template | In the search test, switch `searchMode`, compare semantic, full-text, and hybrid candidates, and record the number of candidates and scores |
| Informed consent form template | The version number and signature and receipt location must be consistent with the ethics review application | Test once each with synonymous questions, check whether the returned candidates contain the version and signature paragraphs, and record the number of candidates and scores |
| Risk assessment form | Risk items, quantity, and date must match the ethics review application | Turn `usingReRank` on and off, compare the ranking of the top few results, and record the number of candidates and scores |
| Retrieval output | Candidates and cited content are filtered by `similarity` and trimmed by `limit` | Check the tokens of the cited text, record the number of items in the citation array separately, and do not compare the two for equality |

## Three common errors

- Symptom: the name, quantity, and date of the same record do not match across two materials. Cause: during intake, fields were not aligned item by item, and retrieval candidates are mixed with snippets from different versions.
- Symptom: the informed consent form template version is not synchronized, and the signature or receipt is missing. Cause: the material update cadence is inconsistent with the knowledge base import batch, and the old version is still recalled.
- Symptom: the answer lacks key paragraphs, and although there are many candidates, the ones ranked first are all irrelevant. Cause: the retrieval mode does not match the material form, rerank is not enabled, or the similarity filter is too broad.

## How to verify the setup

Acceptance for this feature: test once each with synonymously rewritten questions, compare candidates and scores, then turn rerank on and off to inspect the ranking of the top few results.

Business test: ask a question that lacks key information and see whether it first asks a follow-up question before answering.

- In the search test, switch `searchMode`, and separately record the number of candidates and scores for semantic, full-text, and hybrid.
- Turn `usingReRank` on and off, compare the ranking of the top few results, and check the cited content according to `similarity` and `limit`.
