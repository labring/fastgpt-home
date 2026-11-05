---
title: Knowledge Base Retrieval for National Key Research and Development Applications: Track Progress and Check Statistics
slug: /en/industry/education-d006-c057-f015
page_type: 行业问题页
application_area: education
meta_title: National R&D Grants | Retrieval | Progress
meta_description: National R&D Grants: review retrieval for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for National Key Research and Development Applications: Track Progress and Check Statistics

## What this category's data looks like

National Key R&D Program project applications involve three types of materials: project application forms, budget application forms, and cooperation agreements. The sources are research management departments and project lead units, and the update cadence follows application milestones and quarterly statistics. Field characteristics center on project name, undertaking unit, task period, funding amount, participating personnel, and signature date. The three types of materials play different roles when entering the knowledge base retrieval: the project application form provides task and progress descriptions, the budget application form provides funding and budget category definitions, and the cooperation agreement provides the basis for division of labor and signatures/seals. The name, quantity, and date of the same record across the three materials must be aligned item by item; unsynchronized versions or missing signature receipts will directly cause statistical verification to fail. The progress table and statistical definition notes depend on these material fragments, but the retrieval step is only responsible for recalling candidates and cited content.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after pattern, merge, rerank, filter, and upper-limit trimming). The progress table and statistical definition notes are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Project application form | Project name, task period, participating personnel, and signature date must be aligned item by item with the budget application form and cooperation agreement | In the search test, test once each with synonymous questions, switch `searchMode` to compare the number of candidates and scores, and check whether the returned fragments cover the name, date, and signature fields |
| Budget application form | Funding amount, budget category definitions, quantity, and date must be consistent with the project application form and cooperation agreement | Use `similarity` to compare candidates before and after filtering, check whether budget categories and quantities appear simultaneously in semantic and full-text recall results, and record the array length |
| Cooperation agreement | Undertaking unit, division of labor, signatures/seals, and receipt date must be consistent with the project application form and budget application form | Enable `usingReRank` to compare the ordering of the top few results, check whether the signature/seal and receipt fields are fully preserved in the cited text, and separately record the number of citations |
| Progress records and statistical definition notes | The number of records matches the statistical count, the definitions are written in the table header, and exceptions are clearly stated | Use one week of records to verify the totals, check the table header definitions and exception notes, and confirm that the dates and quantities in the candidate fragments can be traced back to the three types of materials |

## Three common errors

- Symptom: The same project name is written differently in the project application form and the budget application form, so it does not match during statistics. Cause: Versions are not synchronized, and field alignment was not performed after the materials were updated separately.
- Symptom: The cooperation agreement lacks a signature or receipt date, so the progress table cannot confirm the task start point. Cause: The signature/seal process is not closed-loop, and the signature fields were not verified when the materials entered the knowledge base.
- Symptom: There are many candidates, but the ones ranked at the top are all irrelevant, and the answer lacks key paragraphs. Cause: The retrieval mode does not match the material form, and reranking and similarity filtering were not performed.

## How to verify the setup

Feature acceptance: test once each with synonymously rewritten questions, compare candidates and scores, then turn reranking on and off to observe the ordering of the top few results; at the same time, switch `searchMode`, observe changes in the number of candidates and scores before and after `similarity` filtering, and record the ordering differences before and after enabling `usingReRank`.

Business test: use one week of records to verify the totals, check whether the definitions and exceptions are clearly stated, and confirm that the number of records matches the statistical count and that the table header states the definitions.

- In the knowledge base search test, retrieve once each using different phrasings of the same question, record the number of candidates and scores, and check whether the key fields of all three types of materials can be recalled.
- Retrieve once each with reranking enabled and disabled, compare the ordering of the top few results, confirm that fields such as signatures, dates, and quantities are fully preserved in the cited text, and separately record the number of citations.
