---
title: Knowledge Base Retrieval for Academic Misconduct Reports and Investigations: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c063-f015
page_type: 行业问题页
application_area: education
meta_title: Research Misconduct | Retrieval | Versions
meta_description: Research Misconduct: review retrieval for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Academic Misconduct Reports and Investigations: Maintain Document Versions and Changes

## What this category's data looks like

This page addresses the scenario of investigating and handling academic misconduct reports. The materials include three categories: report materials, investigation reports, and expert appraisal opinions. Report materials enter as factual statements and evidence lists, investigation reports enter as investigation process and conclusions, and expert appraisal opinions enter as professional judgments and signature pages. The fields of the three material categories each have different emphases: report materials focus on the reported person, matter, time, and evidence number; investigation reports focus on the investigation team, conclusions, date, and signatures; expert appraisal opinions focus on the appraiser, opinion, signature, and receipt. The update cadence is driven by the progression of the investigation stages; new versions may be produced at each stage of acceptance, verification, appraisal, and conclusion. After the materials enter the knowledge base retrieval and recall function, each participates as an independent segment in the candidate set, to be used by subsequent nodes or manual work to generate the version ledger and change records.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate segments and similarity scores (after pattern, merge, rerank, filter, and upper-limit trimming). The version ledger and change records are then completed by subsequent nodes or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Report materials | Whether the reported person, matter, time, and evidence number are consistent between the report materials and the investigation report, and whether signatures and receipts are complete | In the knowledge base search test, test once each with synonymous questions, record the number of candidates and scores, and check whether the segments returned under `similarity` and `limit` contain the evidence number and date |
| Investigation report | Whether the investigation team, conclusions, date, and signatures are consistent between the investigation report and the expert appraisal opinions, and whether the version number is updated in sync | Switch `searchMode` to semantic, full-text, or hybrid, compare whether the candidates simultaneously contain investigation process and conclusion segments, and check and record the cited text tokens and array count separately |
| Expert appraisal opinions | Whether the appraiser, opinion, signature, and receipt are consistent between the expert appraisal opinions and the investigation report, and whether the old version is traceable | Compare the ranking of the top few items before and after enabling `usingReRank`, check whether the appraisal opinion segments retain the signature and receipt fields, and confirm that the current version is unique |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match between the report materials and the investigation report. Cause: The two materials are maintained separately, versions are not synchronized, and retrieval candidates do not hit both sources at the same time.
- Phenomenon: The investigation report has been updated, but the expert appraisal opinions still cite the old conclusion. Cause: The version ledger does not record changes, the old version is traceable but the current version is not marked, and citations are not synchronized.
- Phenomenon: The expert appraisal opinions lack a signature or receipt, and the report materials lack an acceptance receipt. Cause: Fields were not validated when the materials were archived, retrieval segments return only the body text, and the signature page does not enter the candidate set.

## How to verify the setup

This function's acceptance: test once each with synonymously rewritten questions, compare candidates and scores, then toggle rerank on and off to observe the ranking of the top few items; check the number of candidates, scores, and cited text tokens returned under `searchMode`, `similarity`, `limit`, and `usingReRank`.

Business test: change one piece of content and see whether the version number and citations are updated in sync; confirm that the current version is unique, the old version is traceable, and citations are synchronized, and record the citation count and cited text tokens separately.

- In the knowledge base search test, retrieve report materials, investigation reports, and expert appraisal opinions separately using synonymous questions, record the number of candidates and scores, and check whether the fields, dates, and signatures are complete.
- Compare the order of the top few items before and after enabling rerank, check the cited text tokens and array count after citation upper-limit trimming, and confirm that the old version is traceable and the current version is unique.
