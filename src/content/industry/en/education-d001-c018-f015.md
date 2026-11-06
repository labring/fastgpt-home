---
title: Knowledge Base Retrieval for Undergraduate Curriculum Planning: Find Supporting Evidence
slug: /en/industry/education-d001-c018-f015
page_type: 行业问题页
application_area: education
meta_title: Program Revision | Retrieval | Evidence
meta_description: Program Revision: review retrieval for evidence lookup. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Undergraduate Curriculum Planning: Find Supporting Evidence

## What this category's data looks like

During undergraduate program revision, business basis queries involve three types of materials: program plans, course syllabi, and credit structure tables. The program plan provides the total credits and course modules; the course syllabus records course names, credits, class hours, and signatures; the credit structure table lists the credits and proportions of each module. Materials are updated by academic year, and versions run in parallel during the revision cycle; fields include dates, signatures, and receipts. When entering knowledge base retrieval and recall, the program plan serves as the primary basis providing the framework, while course syllabi and credit structure tables serve as supporting evidence providing field-level details; together, the three support the back-reference of basis entries.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after pattern, merge, rerank, filter, and limit trimming). "Basis entries that can back-reference the original text" are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Program plan | Fields, dates, and signatures are complete, and the version is current | In the search test, check whether candidate chunks back-reference the original program plan text, and record the number of candidates and scores |
| Course syllabus | Course name, credits, class hours, and signature match the program plan | Switch `searchMode` to hybrid, compare semantic and full-text candidates, and see whether syllabus fields are consistent with the plan |
| Credit structure table | Module credits, proportions, and dates match the program plan | Compare the ranking of the top few results before and after enabling `usingReRank`, and check whether structure table fields are consistent with the plan |
| Retrieval node | Candidate chunks and similarity scores can be checked, and cited content retains key original text chunks | Record the number of candidates and `similarity`, and check the tokens of the cited text after `limit` trimming |

## Three common errors

- Symptom: The name and credits of the same course do not match across two materials. Cause: Versions are not synchronized, and the old syllabus was not updated along with the program plan.
- Symptom: The date on the credit structure table is inconsistent with the signing date of the program plan. Cause: Materials are updated at different paces, and receipt confirmation is missing.
- Symptom: There are many candidates, but the ones ranked at the top are all irrelevant. Cause: The retrieval mode does not match the material form, and reranking is not enabled.

## How to verify the setup

Acceptance for this feature: Test once each with synonym-rewritten questions, compare candidates and scores, then toggle reranking on and off to see the ranking of the top few results.

Business test: Ask a basis question that spans materials, and see whether the answer provides a back-referenceable source.

- In the search test, switch `searchMode` and compare the number of candidates and scores across semantic, full-text, and hybrid modes.
- Compare the ranking of the top few results before and after enabling `usingReRank`, and check `similarity` and the tokens of the cited text after `limit` trimming.
