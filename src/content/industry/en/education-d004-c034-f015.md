---
title: Knowledge Base Retrieval for Public Vocational Skills Level Assessment: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c034-f015
page_type: 行业问题页
application_area: education
meta_title: Skills Certification | Retrieval | Handover
meta_description: Skills Certification: review retrieval for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Public Vocational Skills Level Assessment: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

The category materials for social evaluation of vocational skill level certification include evaluation implementation plans, candidate registration forms, and assessor dispatch forms. These materials come from the application and certification stages and are updated by batch. Their field characteristics are candidate name, occupation name, level, assessor name, date, and signature field. When the materials enter the knowledge base retrieval and recall function, the evaluation implementation plan serves as the rule basis, while the candidate registration forms and assessor dispatch forms serve as factual records. Together, the three constitute the source of candidate chunks for subsequent nodes or manual drafting of issuable material drafts and handover records.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after pattern, merge, re-rank, filter, and limit truncation). The issuable material drafts and handover records are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Evaluation implementation plan | Fields are complete, including occupation name, level, date, and signature field; version and date are consistent | In the knowledge base search test, switch `searchMode` to semantic, full-text, or hybrid, and compare candidate chunks and similarity scores |
| Candidate registration form | Candidate name, occupation name, level, date, and signature field are consistent across the two materials | Check the name, quantity, and date of the same record in the registration form and dispatch form to see whether missing items are blocked |
| Assessor dispatch form | Assessor name, date, signature or receipt are complete, and versions are synchronized | Compare the top few rankings before and after enabling `usingReRank` to see whether candidates include semantic and full-text results |
| Knowledge base retrieval service | Candidate chunks and similarity scores undergo merge, re-rank, filter, and limit truncation | Record the number of candidates and scores, record cited text tokens separately, and do not compare array length with citation budget |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record in the registration form and dispatch form do not match. Cause: The two materials were not synchronized to the same version, and retrieval candidates did not cover the differing fields.
- Phenomenon: Material versions are not synchronized, and the draft cites an old version of the evaluation implementation plan. Cause: The knowledge base was not updated in time, and retrieval recall still returns old chunks.
- Phenomenon: Signature or receipt is missing, and the handover record is incomplete. Cause: The signature field was not checked during drafting, and retrieval candidates did not include the receipt field.

## How to verify the setup

Acceptance for this function: Test once each with synonym-rewritten questions, compare the number of candidates and similarity scores, then toggle re-rank to see the top few rankings; switch `searchMode` and `usingReRank`, and record the number of candidates under `similarity` and `limit`.

Business test: Draft one according to the template and complete one handover to see whether missing items are blocked.

- In the knowledge base search test, switch `searchMode` and compare candidate chunks and scores across semantic, full-text, and hybrid modes.
- Compare the top few rankings before and after enabling `usingReRank`, record the number of candidates and cited text tokens, and do not compare array length with citation budget.
