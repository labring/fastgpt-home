---
title: Knowledge Base Retrieval for Undergraduate Program Establishment and Adjustment: Find Supporting Evidence
slug: /en/industry/education-d001-c017-f015
page_type: 行业问题页
application_area: education
meta_title: Undergraduate Programs | Retrieval | Evidence
meta_description: Undergraduate Programs: review retrieval for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Undergraduate Program Establishment and Adjustment: Find Supporting Evidence

## What this category's data looks like

This category's data covers queries on the business basis for undergraduate program setup and dynamic adjustment, involving three types of materials: program setup application forms, talent cultivation plans, and expert review opinions. The program setup application form records the program name, code, length of study, degree-granting category, and application date, with the responsible person's signature and the college's seal attached; the talent cultivation plan records the cultivation objectives, curriculum system, credits and class hours, and revision date, with signatures from both the teaching and research section and the college; the expert review opinions record the review conclusion, list of experts, their titles and affiliations, and the date of signing, with the experts' own signatures attached. The three types of materials are updated by academic year or revision batch, and fields contain synonymous expressions, such as the same program having inconsistent simplified and traditional names across different materials, the total credits not matching the sum of course sub-items, and the review date being later than the plan's signing date. When the materials enter knowledge base retrieval and recall, the application form and the plan serve as the baseline for field comparison, while the expert review opinions serve to verify conclusions and signature receipts, each participating in recall and reranking as a source of candidate chunks.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after pattern, merge, rerank, filter, and upper-limit trimming). The basis items that can be traced back to the original text are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Program setup application form | Fields must correspond item by item with the talent cultivation plan and expert review opinions, including program name, code, length of study, degree category, date, and signature | In the search test, search separately by program name and code, check the field values, dates, and signature fields in the candidate chunks, record the number of candidates and scores, and switch `searchMode` to compare recall differences |
| Talent cultivation plan | Cultivation objectives, curriculum system, credits and class hours must be consistent with the application form, the revision date must not be earlier than the review date, and signatures must be complete | Search by course name and credit combination, check the total and sub-item credits, revision date, and signatures in the candidate chunks, and enable `usingReRank` to compare the ranking of the top few results |
| Expert review opinions | The review conclusion, expert list, titles and affiliations, and signing date must correspond with the application form and plan, and signatures and receipts must not be missing | Search by expert name and review conclusion, check the list, dates, and signatures in the candidate chunks, use `similarity` to observe whether low-scoring chunks are filtered out, and separately record the number of items in the citation array |

## Three common errors

- Symptom: The same program has inconsistent names or codes in the application form and the talent cultivation plan. Cause: The two materials are maintained separately, without field alignment and version synchronization, so each hits different chunks during recall.
- Symptom: The total credits do not match the sum of course sub-items, or the review date is later than the plan's signing date. Cause: After revision, only one material was updated, and dates and quantities were not written back, so versions were not synchronized.
- Symptom: Candidate chunks lack signature fields or receipt pages, and the cited content is incomplete. Cause: Scanned copies have missing pages or were truncated during cropping, and incomplete chunks are still retained after similarity filtering.

## How to verify the setup

This feature's acceptance: test once each with synonym-rewritten questions, compare the number of candidates and scores, then toggle reranking to see the ranking of the top few results; switch `searchMode` to observe differences between semantic and full-text candidates, adjust `similarity` to see the filtering boundary, and enable `usingReRank` to compare the secondary ranking effect.

Business test: ask a cross-material basis question and see whether the answer provides traceable sources.

- In the search test, construct questions using program name, code, course name, and expert name respectively, record the number of candidates and scores, and check whether the candidate chunks can be traced back to specific materials and fields.
- Compare the fields, dates, and signatures of the application form, talent cultivation plan, and expert review opinions, mark inconsistencies in names, quantities, and dates, and confirm whether versions and signature receipts are complete.
