---
title: Knowledge Base Retrieval for Sino-Foreign Education Establishment and Annual Reports: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c048-f015
page_type: 行业问题页
application_area: education
meta_title: Joint Education | Retrieval | Operations
meta_description: Joint Education: review retrieval for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Sino-Foreign Education Establishment and Annual Reports: Coordinate Operations and Application Handover

## What this category's data looks like

This page addresses the establishment and annual report materials of Chinese-Foreign cooperative education institutions, with sources being the establishment application, cooperation agreement, articles of association, and their annual report attachments. The establishment application provides the institution name, education level, cooperating parties, and proposed majors; the cooperation agreement provides the cooperation term, funding method, rights and responsibilities of both parties, and signing date; the articles of association provide the governance structure, decision-making procedures, the method of selecting responsible persons, and the signature page. Annual report materials are updated annually, with fields including enrollment scale, faculty allocation, curriculum operation, financial income and expenditure, and school address. When the materials enter the knowledge base retrieval function, each plays a different role: the application and agreement serve as sources of facts, the articles of association serve as the governance basis, and the annual report serves as the annual operation record. The retrieval node splits the above materials into candidate chunks, and the search test is used to check whether the names, quantities, dates, and signature receipts of the same record are consistent across different materials, providing a basis for the handover of deployment status and operation records.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after pattern, merge, re-rank, filter, and upper-limit trimming). The handover-ready deployment status and operation records are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Establishment application | The institution name, cooperating parties, education level, proposed majors, and signing date must be aligned item by item with the cooperation agreement and articles of association | In the search test, retrieve once each using different expressions of the same record, check whether the names, quantities, and dates in the candidate chunks are consistent, and record the number of candidates and scores |
| Cooperation agreement | The cooperation term, funding method, rights and responsibilities of both parties, and signature page must be synchronized with the versions of the application and articles of association | Switch `searchMode` to semantic, full-text, or hybrid, compare whether the candidates include both semantic and full-text results, and check whether signatures and receipts are missing |
| Articles of association | The governance structure, decision-making procedures, method of selecting responsible persons, and signature page must be consistent with the agreement and annual report | Enable and disable `usingReRank` and retrieve once each, compare the order of the first few candidates, and check whether the dates of the articles of association clauses and the agreement clauses match |
| Annual report attachments | The enrollment scale, faculty allocation, curriculum operation, financial income and expenditure, and school address must be consistent with the articles of association and agreement | Check the candidate chunks item by item according to the handover list, record the number of candidates and scores corresponding to `similarity` and `limit`, and separately record the tokens of the cited text |

## Three common errors

- Symptom: The same institution name is written differently in the application and the agreement, and the dates do not match. Cause: The two materials were entered separately, without field-level comparison and version synchronization.
- Symptom: The signature page of the articles of association is missing or the receipt is not archived, making the version impossible to confirm at handover. Cause: The signing step and the archiving step are disconnected, and the handover list did not check signatures and receipts item by item.
- Symptom: There are many candidates but the ones ranked first are all irrelevant, and the answer lacks key paragraphs. Cause: The retrieval mode does not match the material form, re-ranking was not enabled, or similarity filtering and citation upper-limit trimming were not performed.

## How to verify the setup

Acceptance of this feature: test once each with synonym-rewritten questions, compare the candidate chunks and similarity scores, then toggle re-ranking to observe the order of the first few results, and check the number of candidates and scores for `searchMode`, `usingReRank`, `similarity`, and `limit`; record the tokens of the cited text separately.

Business test: check once item by item according to the handover list, see which record is missing, and confirm that the version, connection, and task record are consistent.

- In the knowledge base search test, switch `searchMode`, retrieve once each using different expressions of the same record, record the number of candidates and scores, and check whether the names, quantities, and dates are consistent.
- Enable and disable `usingReRank` and retrieve once each, compare the order of the first few candidates, check whether signatures and receipts are missing according to the handover list, and record the number of candidates for `similarity` and `limit`.
