---
title: Knowledge Base Retrieval for Research Ethics Review: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c062-f015
page_type: 行业问题页
application_area: education
meta_title: Research Ethics | Retrieval | Multilingual
meta_description: Research Ethics: review retrieval for multilingual work. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Research Ethics Review: Handle Multilingual Materials and Terminology

## What this category's data looks like

Research ethics review materials include ethics review applications, informed consent form templates, and risk assessment forms, and often require multilingual versions and terminology alignment. Sources are researcher submissions, ethics committee archives, and translated drafts, with update cadence driven by version revisions and annual continuing review. Field characteristics center on subject names, sample quantities, dates, and signature receipts; the same record must keep names, quantities, and dates consistent across different materials. When materials enter knowledge base retrieval, applications and templates serve as candidate sources for semantic and full-text recall, terminology alignment drafts serve as the basis for cross-language alignment, and risk assessment forms are used to check field completeness. The retrieval service matches retrieval modes according to material form, splits multilingual materials into candidate chunks, and gives similarity scores, for subsequent nodes or humans to use in generating a unified terminology glossary and alignment draft.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after mode, merge, rerank, filter, and limit trimming). The unified terminology glossary and alignment draft are then completed by subsequent nodes or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| Ethics review application | Fields, dates, and signatures must be aligned item by item with the informed consent form template and risk assessment form | In the search test, search once each using different language phrasings of the same term, check the number of candidates and scores, and record `similarity` and `limit` |
| Informed consent form template | Subject names, sample quantities, and dates must not mismatch between the two materials | Switch `searchMode` among semantic, full-text, and hybrid, and compare whether candidates include both semantic and full-text results |
| Risk assessment form | The version must be synchronized with the application and template, and signatures or receipts must not be missing | Turn rerank on and off and look at the order of the top few items each time, confirming whether key chunks are retained before and after `usingReRank` |
| Terminology alignment draft | The same term must be written consistently throughout, and translated names must be traceable back to the source text | Sample three terms and check their writing throughout, verifying whether candidate chunks cover the writing in each language |

## Three common errors

- Phenomenon: the same subject name is written differently in the application and template. Cause: multilingual materials were not terminology-aligned, and recalled chunks each took a different version.
- Phenomenon: sample quantities or dates mismatch between the two materials. Cause: versions were not synchronized, and old drafts remain among knowledge base candidates.
- Phenomenon: the risk assessment form lacks signatures or receipts. Cause: material archiving is incomplete, and retrieval only returns existing chunks.

## How to verify the setup

Acceptance for this feature: test once each with synonym-rewritten questions, compare candidates and scores, then turn rerank on and off to inspect the ordering of the top few items.

Business test: sample three terms and check whether their writing is consistent throughout.

- In the knowledge base search test, search the same term using different language phrasings, record the number of candidates and scores, and do not compare citation counts and citation budgets.
- Check the tokens of the returned citation text and record the array length separately; if the sources do not match, first check hits and associations.
