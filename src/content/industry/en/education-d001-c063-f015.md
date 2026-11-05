---
title: Knowledge Base Retrieval for Academic Misconduct Reports and Investigations: Find Supporting Evidence
slug: /en/industry/education-d001-c063-f015
page_type: 行业问题页
application_area: education
meta_title: Research Misconduct | Retrieval | Evidence
meta_description: Research Misconduct: review retrieval for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Academic Misconduct Reports and Investigations: Find Supporting Evidence

## What this category's data looks like

This page addresses business basis queries in the scenario of investigating and handling academic misconduct reports. The materials come from this institution's academic integrity management materials and include three categories: report materials, investigation reports, and expert appraisal opinions. Report materials record the reporter, the reported person, the matter, the date, and the receipt; investigation reports record the investigation process, conclusions, signatures, and attachments; expert appraisal opinions record the appraisal matter, conclusions, expert signatures, and date. The three categories of materials are archived by batch, and versions are updated with review and supplementation. Field names, quantities, dates, signatures, and receipts must be checked item by item during cross-material comparison. When the materials enter the knowledge base retrieval and recall function, report materials, investigation reports, and expert appraisal opinions are each split into candidate chunks as independent documents for recall by retrieval nodes and search tests, and do not undertake the generation of statistical tables, business documents, or authorization results.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval nodes and search tests), which outputs candidate chunks and similarity scores (after mode, merging, reranking, filtering, and upper-limit trimming). Basis items that can be traced back to the original text are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Report materials | Fields, dates, and signatures must match investigation reports and expert appraisal opinions item by item; the name, quantity, and date of the same record must not be inconsistent across the two materials; receipts and signatures must be complete | In the knowledge base search test, switch `searchMode` to semantic, full-text, or hybrid, view the number of candidate items and scores, and check whether the hit chunks trace back to the original text of the report materials |
| Investigation reports | The investigation process, conclusions, signatures, and attachments must correspond to report materials and expert appraisal opinions; the version must be current; missing signatures or receipts must be marked | Compare the order of the top few candidates before and after enabling `usingReRank`, and check whether the investigation report chunks contain the conclusion and signature fields |
| Expert appraisal opinions | The appraisal matter, conclusions, expert signatures, and date must be consistent with investigation reports and report materials; the name, quantity, and date of the same record must not conflict across materials | Adjust the `similarity` threshold and `limit`, view changes in the number of candidate items and scores, and check whether the appraisal opinion chunks retain the key paragraphs of the original text |
| Knowledge base retrieval service (retrieval nodes and search tests) | The output is candidate chunks and similarity scores, after mode, merging, reranking, filtering, and upper-limit trimming; it is not a statistical table, business document, or authorization result | Test once each with synonym-rewritten questions, compare candidates and scores, then toggle reranking on and off to observe the ordering of the top few items |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the report materials and the investigation report. Cause: Cross-material comparison was not checked item by item, and after candidate chunks were hit, they were not traced back to the original text.
- Symptom: The version of the expert appraisal opinion was not synchronized, and the current conclusion and the old version conclusion are mixed in the candidates. Cause: After the materials were updated, they were not re-split and recalled, and the version identifier was not updated with the review.
- Symptom: The investigation report lacks signatures or receipts, but the candidate chunks are still treated as basis items. Cause: Retrieval only outputs candidates and scores; verification of signatures and receipts is completed by subsequent nodes or manually.

## How to verify the setup

This function's acceptance: test once each with synonym-rewritten questions, compare the number of candidate items and scores, then toggle reranking on and off to observe the ordering of the top few items; switch `searchMode` to observe candidate differences among semantic, full-text, and hybrid, and adjust `similarity` and `limit` to record the number of candidate items and the tokens of the cited text.

Business test: ask a cross-material basis question and see whether the answer provides a traceable source.

- In the knowledge base search test, switch `searchMode`, compare the number of candidate items and scores returned by the semantic, full-text, and hybrid modes, and check whether the candidates include both semantic and full-text results.
- Enable and disable `usingReRank`, compare the ordering of the top few candidates; adjust `similarity` and `limit`, record the number of candidate items and the tokens of the cited text, and check whether the citations retain the key chunks of the original text.
