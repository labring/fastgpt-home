---
title: Knowledge Base Retrieval for Academic Misconduct Reports and Investigations: Track Progress and Check Statistics
slug: /en/industry/education-d006-c063-f015
page_type: 行业问题页
application_area: education
meta_title: Research Misconduct | Retrieval | Progress
meta_description: Research Misconduct: review retrieval for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Academic Misconduct Reports and Investigations: Track Progress and Check Statistics

## What this category's data looks like

In the academic misconduct report investigation and handling category, materials come from report materials, investigation reports, and expert appraisal opinions, updated weekly or monthly, with fields including name, quantity, date, signature, and receipt. Report materials enter retrieval as clue fragments, used to recall the reported facts and time points; investigation reports serve as process records, used to verify investigation nodes and conclusion fields; expert appraisal opinions serve as professional judgment fragments, used to compare appraisal conclusions and signature status. The three types of materials often show inconsistencies in name, quantity, and date on the same record, with versions not synchronized or missing signature receipts. The retrieval service only returns candidate fragments and similarity scores, for subsequent nodes or manual compilation of progress tables and statistical scope explanations.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after mode, merge, rerank, filter, and limit trimming). The "progress table and statistical scope explanation" is completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Report materials | Whether name, quantity, date, and signature receipt are consistent with the investigation report | In the search test, switch `searchMode`, and verify the name, quantity, date, and signature fields in the candidate fragments |
| Investigation report | Whether the version is synchronized, and whether the date and signature align with the expert appraisal opinions | Test once each with synonymous questions, record the number of candidates and scores, and verify the difference before and after `similarity` filtering |
| Expert appraisal opinions | Whether the appraisal conclusion, signature, and receipt are consistent with the investigation report version | Enable and disable rerank, compare the order of the top few items, and record the `usingReRank` status and changes in candidate scores |
| Statistical scope explanation | Whether the record count matches the statistical count, and whether the scope is written in the header | Record the total weekly, and verify the tokens and array item count of the quoted text after `limit` trimming, recording them separately |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match between the report materials and the investigation report. Cause: The versions of the two materials are not synchronized, and the retrieval candidates are not aligned by the same fields.
- Phenomenon: The signature or receipt is missing between the investigation report and the expert appraisal opinions. Cause: The material circulation step was not backfilled, and retrieval only returns candidate fragments without judging authorization results.
- Phenomenon: There are many candidates but the top-ranked ones are irrelevant. Cause: The retrieval mode does not match the material form, rerank is not enabled, or similarity filtering is too loose.

## How to verify the setup

Acceptance for this feature: Test once each with synonymously rewritten questions, compare candidates and scores, then toggle rerank to check the ranking of the top few items.

Business test: Use one week of records to verify the total, and check whether the scope and exceptions are clearly written.

- In the search test, switch `searchMode`, and compare the number of candidates and scores across semantic, full-text, and hybrid modes.
- Record the number of candidates after `similarity` filtering, and separately record the tokens of the quoted text after `limit` trimming.
