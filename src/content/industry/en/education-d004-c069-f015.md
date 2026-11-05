---
title: Knowledge Base Retrieval for Journal Publication Licensing and Annual Verification: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c069-f015
page_type: 行业问题页
application_area: education
meta_title: Journal Licensing | Retrieval | Handover
meta_description: Journal Licensing: review retrieval for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Journal Publication Licensing and Annual Verification: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

Journal publication licenses and annual verification involve three types of materials: the journal publication license, the annual verification form, and the rectification report. The license states the name, publication number, sponsor, and validity period; the annual verification form is filed annually with publication data, personnel, and asset fields; the rectification report lists, for the issues found in verification, the items, measures, and completion dates. The sources of the materials are the documents issued by the licensing authority, the documents filed by the publishing unit, and the rectification receipts, and the update cadence is synchronized with the license cycle and verification year. When entering the knowledge base retrieval service, the three types of materials are each split and indexed as independent documents; the license and the verification form are used to compare the name, quantity, and dates of the same record, and the rectification report is used to check signatures and receipts. The retrieval outputs candidate chunks and similarity scores for subsequent drafting and handover.

## Configuration and implementation checks

This step is performed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after pattern, merge, rerank, filter, and limit truncation). The draftable materials and handover records are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Journal publication license | Fields complete, responsible person clear, version and dates consistent: name, publication number, sponsor, validity period, and issue date correspond item by item | In the search test, use the license fields as the query to retrieve, check whether the candidate chunks cover the name, publication number, and validity period, record the number of candidates and the scores, and switch `searchMode` to compare the recall differences among semantic, full-text, and hybrid modes |
| Annual verification form | The name, quantity, and dates of the same record do not match between the two materials: the name, publication number, and annual data of the verification form and the license must be consistent item by item | Use the annual data of the verification form as the query to retrieve, check whether the candidates hit both the license and the verification form, compare the name, quantity, and dates, and enable `usingReRank` to compare changes in the ranking of the top few results |
| Rectification report | Missing signature or receipt: the rectification items, measures, completion dates, signature, and receipt must be complete | Use the rectification items as the query to retrieve, check whether the candidate chunks contain the signature and receipt fields, adjust `similarity` to observe whether key passages are still retained after low-scoring candidates are filtered out, and record the number of citations separately |

## Three common errors

- Phenomenon: the name, quantity, and dates of the same record do not match between the license and the verification form. Cause: the two materials are indexed separately, and field comparison and associated checking are not performed for the same record.
- Phenomenon: versions are not synchronized, and an old verification form and a new license are recalled at the same time. Cause: after documents are updated, the index is not synchronized, and retrieval still returns historical version chunks.
- Phenomenon: the rectification report lacks a signature or receipt, but the draft is still advanced. Cause: the retrieval candidates do not cover the signature and receipt fields, and the handover step does not block missing items according to the template.

## How to verify the setup

Acceptance of this feature: test once each with synonym-rewritten queries, compare candidates and scores, then toggle rerank on and off to see the ranking of the top few results.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- In the search test, switch `searchMode` to compare the number of candidates and scores among semantic, full-text, and hybrid modes, and confirm that the material form matches the mode.
- Compare the order of the top few results before and after enabling `usingReRank`, adjust `similarity` and `limit` to observe the number of candidates after filtering and citation limit truncation, and check the tokens of the cited text separately.
