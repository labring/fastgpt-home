---
title: Knowledge Base Retrieval for Academic Misconduct Reports and Investigations: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c063-f015
page_type: 行业问题页
application_area: education
meta_title: Research Misconduct | Retrieval | Multilingual
meta_description: Research Misconduct: review retrieval for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Academic Misconduct Reports and Investigations: Handle Multilingual Materials and Terminology

## What this category's data looks like

Academic misconduct report investigation and processing materials include three types: report materials, investigation reports, and expert appraisal opinions. The sources are the acceptance registration, investigation and evidence collection, and expert review stages, and the update cadence is synchronized with case progress and review checkpoints. Report materials focus on original statements and evidence lists, investigation reports focus on factual findings and handling recommendations, and expert appraisal opinions focus on professional judgments and their basis. When the three types of materials enter the knowledge base retrieval and recall function, each participates as an independent document collection in candidate recall: report materials provide original factual fragments, investigation reports provide procedural conclusion fragments, and expert appraisal opinions provide terminology and judgment basis fragments. Field characteristics are concentrated in record names, quantities, dates, and signature fields. The same record may appear with inconsistent names, quantities, or dates across different materials, with versions not synchronized or missing signatures and receipts.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after pattern, merge, rerank, filter, and upper-limit trimming). The "unified terminology table and comparison draft" is completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Report materials | Whether the record name, quantity, date, and signature field are consistent with the investigation report | In the search test, switch `searchMode`, check the name, quantity, date, and signature field of the same record in the candidate fragments, and record the number of candidates and scores |
| Investigation reports | Whether the version is synchronized and whether signatures and receipts are complete | Turn `usingReRank` on and off to compare the ranking of the top few results, and check whether the report version number, signature field, and receipt field correspond to the report materials |
| Expert appraisal opinions | Whether the terminology translation can refer back to the original text and whether the wording is consistent throughout | Test once each with synonymous rewritten questions, record the `similarity` score and number of candidates, and check the referential relationship between the terminology translation and the original text in the appraisal opinions |
| Unified terminology table and comparison draft | Whether the same term is consistent throughout and whether the translation can refer back to the original text | Sample three terms to check whether the wording is consistent throughout, check the tokens and array length of the quoted text, and note that `limit` only affects the number of candidates |

## Three common errors
- Symptom: The name, quantity, and date of the same record do not match between the report materials and the investigation report. Cause: The two materials are entered separately and no field-level alignment is performed, so the retrieval candidates do not cover the points of difference.
- Symptom: The investigation report version is not synchronized, and the expert appraisal opinion cites conclusions from an old version. Cause: The update cadence is disconnected from the review checkpoints, and retrieval hits old-version fragments without version filtering.
- Symptom: The report materials lack signatures or receipts, and the signature field in the investigation report is blank. Cause: The acceptance and circulation stages do not backfill the signature and receipt fields, and retrieval candidates return only body-text fragments.

## How to verify the setup

Acceptance for this function: test once each with synonymous rewritten questions, compare candidates and scores, then turn rerank on and off to inspect the ranking of the top few results.

Business test: sample three terms to check whether the wording is consistent throughout.

- In the knowledge base search test, switch `searchMode` and compare the number of candidates and scores returned by the semantic, full-text, and hybrid modes.
- Turn `usingReRank` on and off to compare the ranking of the top few results, record the `similarity` score and number of candidates, and check the tokens and array length of the quoted text.
