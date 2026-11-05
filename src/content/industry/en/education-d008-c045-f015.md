---
title: Knowledge Base Retrieval for Off-Campus Training Registration and Compliance: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c045-f015
page_type: 行业问题页
application_area: education
meta_title: Training Compliance | Retrieval | Access
meta_description: Training Compliance: review retrieval for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Off-Campus Training Registration and Compliance: Manage Authorized Access and External Services

## What this category's data looks like

This page addresses off-campus training compliance filing and penalty response scenarios. The materials include three categories: school operation licenses, course filing materials, and fee disclosure. School operation license records the institution name, address, validity period, and issuance date; course filing materials list the course name, number of class hours, instructors, and filing date; fee disclosure contains fee items, standards, refund rules, and disclosure date. All three categories of materials are provided by the institution or the competent authority and are updated by semester or inspection milestone. When the materials enter the knowledge base retrieval and recall function, the license serves as the source of the institution's subject identity, the course filing materials serve as the basis for course scope and authorization, and the fee disclosure serves as the source of the external service wording; each forms retrievable segments for subsequent nodes or humans to generate the external entry points and authorization scope accordingly.

## Configuration and implementation checks

The knowledge base retrieval service (retrieval node and search test) only outputs candidate segments and similarity scores (after mode, merge, rerank, filter, and upper-limit trimming); the external entry points and authorization scope must be handled by subsequent nodes or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| School operation license | The institution name, address, validity period, and issuance date must match the course filing materials and fee disclosure item by item; signatures and issuance date must not be missing | In the search test, search separately using the license name and its abbreviation, compare the number of candidates and scores, and check whether semantic and full-text results under `searchMode` are hit at the same time |
| Course filing materials | The course name, number of class hours, instructors, and filing date must correspond to the license subject and the fee disclosure wording, and versions must be synchronized | Search once each using different phrasings of the same course and see whether the candidates are stable; compare the order of the top few items before and after enabling rerank, and record changes in the `similarity` score |
| Fee disclosure | The fee items, standards, refund rules, and disclosure date must be consistent with the course filing materials; missing signatures or receipts are deemed unusable | Access once with a restricted identity and see whether the visible scope matches the setting; adjust `limit` and `usingReRank`, record the number of candidates and scores, and do not verify that the number of cited items equals the budget |

## Three common errors

- Symptom: The name or date of the same institution does not match across two materials. Cause: The license and course filing materials were entered separately, without field-level comparison and version synchronization.
- Symptom: The course filing materials lack signatures or receipts, while the fee disclosure has already been made external. Cause: Receipts were not fully collected during the material circulation stage, and the version entered retrieval before being synchronized.
- Symptom: The same question cannot be recalled when rephrased. Cause: The retrieval mode does not match the material form, and candidates were not reranked or filtered by similarity.

## How to verify the setup

This feature acceptance: test once each with synonym-rewritten questions, compare candidates and scores, then toggle rerank on and off to inspect the ordering of the top few items; in the search test, switch `searchMode`, record the number of candidates and the `similarity` score, and adjust `limit` and `usingReRank` to observe the tokens and array length of the cited text after trimming.

Business test: access once with a restricted identity and see whether the visible scope matches the setting.

- In the knowledge base search test, switch retrieval modes, compare the number of candidates and scores for semantic, full-text, and hybrid, and confirm they match the material form.
- Compare the order of the top few items before and after enabling rerank, and verify that key original text segments are still retained after similarity filtering and citation upper-limit trimming.
