---
title: Knowledge Base Retrieval for Academic Misconduct Reports and Investigations: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c063-f015
page_type: 行业问题页
application_area: education
meta_title: Research Misconduct | Retrieval | Review
meta_description: Research Misconduct: review retrieval for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Academic Misconduct Reports and Investigations: Trace Exceptions and Review Results

## What this category's data looks like

This page addresses the scenario of investigating and handling academic misconduct reports. The core materials are of three types: report materials, investigation reports, and expert appraisal opinions. Report materials are usually submitted by the reporter and include the name of the reported person, the title of the paper involved, the grounds for the report, and the submission date; investigation reports are issued by the investigation team and include the investigation process, established facts, handling recommendations, and the signatures of the investigation team members; expert appraisal opinions are issued by invited experts and include the appraisal matters, analysis opinions, appraisal conclusions, and the expert's signature and date. The three types of materials are updated in batches during circulation, and their field characteristics are concentrated in four categories: name, quantity, date, and signature. After entering the knowledge base retrieval and recall function, report materials provide original clue fragments, investigation reports provide process and conclusion fragments, and expert appraisal opinions provide professional judgment fragments. Together, the three constitute the source pool of candidate fragments for subsequent nodes or manual traceability and review.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), which outputs candidate fragments and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The "exception list and review conclusions" are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Report materials | Whether the name, quantity, date, and signature correspond item by item with the investigation report and expert appraisal opinion | In the search test, use the title of the reported paper and the grounds for the report as input, switch `searchMode` to semantic, full-text, or hybrid, record the candidate fragments and `similarity` scores, and check whether the name, quantity, and date in the hit fragments are consistent with the investigation report |
| Investigation report | Whether the version is synchronized and whether the signature and receipt are complete | Search using the investigation team name and investigation conclusion as input, turn `usingReRank` on and off to compare the ranking of the first few items, and check whether the report version number, date, and signatures of the investigation team members are complete |
| Expert appraisal opinion | Whether the appraisal conclusion is consistent with the facts established in the investigation report, and whether the expert signature and date are complete | Search using the appraisal matters and appraisal conclusion as input, record the number of candidates and scores, and check whether the expert signature, date, and wording of the appraisal conclusion correspond to the investigation report |
| Retrieval results | Whether the candidate fragments and similarity scores can be traced back to the original materials | In the search test, record the number of candidates and `similarity` scores, adjust `limit` to observe changes in the number of candidates, and confirm that each candidate can be traced back to the original fragment in the report materials, investigation report, or expert appraisal opinion |

## Three common errors

- Phenomenon: The name or quantity of the same reported paper does not match between two materials. Cause: The material versions are not synchronized, old-version fragments remain in the knowledge base, and they are recalled at the same time during retrieval.
- Phenomenon: The investigation report lacks the signatures of the investigation team members or the receipt. Cause: The circulation step was not completed, the candidate fragments only hit the main text, and the signature page was not covered by retrieval.
- Phenomenon: The date of the expert appraisal opinion contradicts the date of the investigation report. Cause: The two materials were stored separately and no date field alignment was performed, so the candidate fragments were returned independently.

## How to verify the setup

Acceptance of this function: test once each with synonym-rewritten questions, compare candidates and scores, then turn rerank on and off to inspect the ranking of the first few items.

Business test: create one abnormal record and see whether it can be traced back to the source material.

- In the search test, switch `searchMode` and retrieve the same grounds for the report in semantic, full-text, and hybrid modes respectively, record the number of candidates and `similarity` scores, and check whether the hit fragments cover the report materials, investigation report, and expert appraisal opinion.
- Turn `usingReRank` on and off to compare the ranking of the first few items, adjust `limit` to observe changes in the number of candidates, and confirm that the tokens of the quoted text and the number of array items are recorded separately, without comparing the two as equal.
