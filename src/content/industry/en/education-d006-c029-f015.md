---
title: Knowledge Base Retrieval for Vocational College Curriculum Planning: Track Progress and Check Statistics
slug: /en/industry/education-d006-c029-f015
page_type: 行业问题页
application_area: education
meta_title: Vocational Curricula | Retrieval | Progress
meta_description: Vocational Curricula: review retrieval for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Vocational College Curriculum Planning: Track Progress and Check Statistics

## What this category's data looks like

This page focuses on progress records and statistical verification in the formulation of talent cultivation plans at vocational colleges. The materials include talent cultivation plans, curriculum standards, job competency analysis tables, as well as weekly records, monthly records, and receipts. The talent cultivation plans provide the overall progress and milestones; the curriculum standards and job competency analysis tables provide the field, date, and signature conventions; the weekly records and monthly records handle item-by-item registration; and the receipts are used to confirm delivery. The materials are updated weekly and summarized monthly, and versions are synchronized with revisions. When entering the knowledge base retrieval and recall function, the talent cultivation plans and curriculum standards serve as the primary basis for semantic recall, the job competency analysis tables and receipts serve as the basis for field verification and exception explanations, and the weekly records and monthly records serve as the raw entries for statistical totals.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The progress table and statistical convention explanation are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Talent cultivation plan | Check whether the plan name, milestone dates, and signatures are consistent with the same milestone in the curriculum standards | Search for plan milestones in the search test, record the number of candidates and scores, and verify dates and signatures |
| Curriculum standard | Check whether the course names, quantities, and version dates match the job competency analysis table | Switch `searchMode` to semantic, full-text, or hybrid, and compare whether the candidates contain both types of results at the same time |
| Job competency analysis table | Check whether the competency item names, quantities, and receipts are consistent with the weekly records | Test once each with synonymous questions, and see whether the similarity and number of candidates are stable |
| Weekly records and monthly records | Check the item-by-item record count and statistical totals, and whether the conventions and exceptions are written in the header | Record the reference array length and reference text tokens, and do not compare the two for equality |

## Three common errors

- Symptom: The name, quantity, or date of the same record does not match between the plan and the curriculum standard. Cause: The field conventions are not unified, or the versions are not synchronized, and the old draft and the new draft both enter the candidates.
- Symptom: The weekly record totals do not match the monthly record statistics. Cause: Exceptions are not written in the header, or missing receipts cause entries to be counted repeatedly.
- Symptom: There are many candidates, but the ones ranked at the front are all irrelevant. Cause: The retrieval mode does not match the material form, or rerank is not enabled, and the order is not adjusted before similarity filtering and limit trimming.

## How to verify the setup

This function's acceptance: test once each with synonymously rewritten questions, compare the candidates and similarity scores, then turn rerank on and off to observe the ordering of the top few; at the same time, switch `searchMode` and record the number of candidates and scores.

Business test: use one week's records to verify the totals, and see whether the conventions and exceptions are clearly written; verify the reference text tokens and the values of `limit` and `similarity`, record the array count separately, and do not compare `quoteMaxToken`.

- In the knowledge base search test, switch `searchMode`, compare the number of candidates and scores across the semantic, full-text, and hybrid modes, and confirm that the material form matches.
- Test once each with rerank enabled and disabled, and record the changes in the order of the top few; verify the values of `similarity` and `limit`, and record the reference array length separately.
