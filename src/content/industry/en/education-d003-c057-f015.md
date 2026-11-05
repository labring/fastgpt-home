---
title: Knowledge Base Retrieval for National Key Research and Development Applications: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c057-f015
page_type: 行业问题页
application_area: education
meta_title: National R&D Grants | Retrieval | Intake
meta_description: National R&D Grants: review retrieval for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for National Key Research and Development Applications: Handle Questions and Collect Missing Information

## What this category's data looks like

In the National Key R&D Program project application scenario, the materials are mainly the project application form, the budget application form, and the cooperation agreement, plus signature pages, receipts, and version records. The sources are submissions through the application system and offline stamped documents; the update cadence advances with corrections, budget adjustments, and consortium negotiations, and multiple versions often coexist on the same day. Field characteristics center on five categories: name, quantity, date, signature, and receipt. When entering this feature, the project application form plays the role of research objectives, task decomposition, and assessment indicators; the budget application form plays the role of funding categories, calculation basis, and amounts; and the cooperation agreement plays the role of consortium division of labor, matching commitments, and signatures/seals. Together, the three form the reconciliation working papers for acceptance records and follow-up questions, and both missing-item identification and follow-up questioning use the fields of these materials as anchors.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after pattern, merge, rerank, filter, and upper-limit trimming). "Acceptance records and follow-up questions" are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Project application form | Whether the name, date, and signature fields are consistent between the two materials | In the search test, switch `searchMode`, compare the number of candidates and scores for semantic, full-text, and hybrid, then check the signature page and receipt |
| Budget application form | Whether the quantity, amount categories, and date match the project application form | Test once each with synonym-rewritten questions, see whether the candidates cover the budget categories and calculation basis, and record the `similarity` score |
| Cooperation agreement | Whether the consortium name, number of division-of-labor items, signing date, and seal are complete | See whether the returned candidates contain both semantic and full-text results, and check whether the agreement version and receipt are in sync |
| Acceptance records and questions | Whether missing items are identified and followed up on, and whether answers are grounded in the materials | Turn rerank on and off, compare the order of the top few results, and use `limit` to observe changes in the number of cited items |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the project application form and the budget application form. Cause: The two materials are filled in separately, without cross-checking and version synchronization.
- Symptom: The cooperation agreement lacks a signature or receipt, yet the candidates still provide seemingly complete passages. Cause: Retrieval only returns candidates and cited content; it does not judge signature/seal status or version validity.
- Symptom: A different wording fails to retrieve, and although there are many candidates, the ones ranked at the top are all irrelevant. Cause: The retrieval mode does not match the material form, rerank is not enabled, or the similarity filter is too broad.

## How to verify the setup

Feature acceptance: Test once each with synonym-rewritten questions, compare the number of candidates and the `similarity` score, then turn rerank on and off to see the ordering of the top few results, and record the return differences under `searchMode` and `limit`.

Business test: Ask a question that lacks key information, see whether it first asks a follow-up question before answering, and check whether the answer brings out original passages from the project application form, budget application form, or cooperation agreement.

- In the search test, switch `searchMode`, compare the number of candidates and scores for the three modes semantic, full-text, and hybrid, and confirm that they match the material form.
- Turn rerank on and off, compare the order of the top few results; then adjust `limit` and the cited content budget, and record the number of array items and the tokens of the cited text respectively.
