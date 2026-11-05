---
title: Knowledge Base Retrieval for Public Vocational Skills Level Assessment: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c034-f015
page_type: 行业问题页
application_area: education
meta_title: Skills Certification | Retrieval | Review
meta_description: Skills Certification: review retrieval for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Public Vocational Skills Level Assessment: Trace Exceptions and Review Results

## What this category's data looks like

During operation, social evaluation for vocational skill level certification accumulates multiple types of materials: evaluation implementation plans, candidate registration forms, assessor dispatch forms, and accompanying signed receipts and version records. These materials play different roles when entering the knowledge base retrieval function—the evaluation implementation plan provides certification procedures and basis clauses, the candidate registration form carries personnel identity and application information, and the assessor dispatch form records assessment task assignments and attendance. The material update rhythm follows batch rolling; the same batch may have multiple versions such as plan revisions, registration information corrections, and dispatch adjustments. Field characteristics are concentrated in name, quantity, date, and signature fields: the name must be consistent with identity information, the quantity must match the number of rows in the roster, the date must fall within the batch validity period, and the signature must be complete and legible. Anomaly tracing and manual review are carried out around these fields: first, retrieval recalls the original fragments, which are then handed over for manual comparison and handling.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after mode, merge, rerank, filter, and upper-limit trimming). The "anomaly list and review conclusions" are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Evaluation implementation plan | The name, date, and signature fields must be consistent with the batch records, and the version number must be traceable | In the search test, switch `searchMode` to semantic, full-text, and hybrid, and separately verify whether the plan clause candidates cover the revised version; check whether the signature and receipt are complete |
| Candidate registration form | The name, declared level, and date correspond item by item with the roster in the plan attachment | Retrieve the same candidate with synonymous questions, and record the number of candidate items and scores; compare the ranking of the top few items before and after enabling `usingReRank`, and verify whether the name and date match |
| Assessor dispatch form | The assessor name and task date are consistent with the session arrangements in the implementation plan | Retrieve cross-fragments of the dispatch form and the plan, and verify the quantity and date; observe whether the key original fragments retained after `similarity` filtering contain the signature field |
| Knowledge base retrieval service | Candidate fragments and similarity scores are output after mode, merge, rerank, filter, and upper-limit trimming | In the search test, view the number of candidate items and scores; when citation limits are involved, verify the tokens of the cited text, record the number of array items separately, and do not compare `limit` with the citation budget |

## Three common errors

- Symptom: The name or date of the same candidate does not match between the registration form and the dispatch form. Cause: The two materials are entered in different steps, no field-level comparison is performed, and retrieval recall goes directly into review.
- Symptom: The plan has been revised, but retrieval still recalls clauses from the old version. Cause: The version is not synchronized, candidate fragments from the old and new versions are hit at the same time, and after reranking the old version ranks first.
- Symptom: The review conclusion lacks a signature or receipt. Cause: After the anomaly list is generated, the original materials are not backfilled, the signature field is empty, and the responsible person for handling cannot be traced.

## How to verify the setup

This function's acceptance: test once each with synonymously rewritten questions, compare candidates and scores, then toggle reranking on and off to inspect the ranking of the top few items.

Business test: create one anomaly record and see whether the source material can be traced.

- In the search test, fix the same question, switch `searchMode` and `usingReRank` respectively, and record changes in the number of candidate items and scores.
- For each anomaly record, recheck the name, quantity, date, and signature fields of the evaluation implementation plan, candidate registration form, and assessor dispatch form.
