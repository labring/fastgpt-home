---
title: Knowledge Base Retrieval for Course Selection, Timetables and Classroom Allocation: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c019-f015
page_type: 行业问题页
application_area: education
meta_title: Course Scheduling | Retrieval | Multilingual
meta_description: Course Scheduling: review retrieval for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Course Selection, Timetables and Classroom Allocation: Handle Multilingual Materials and Terminology

## What this category's data looks like

In the course selection, scheduling, and classroom resource allocation category, materials come from three types of files: course offering plans, scheduling tables, and course selection rules, including multilingual versions and terminology comparison drafts. Course offering plans provide course and class fields; scheduling tables carry time, classroom, and instructor information; course selection rules explain priority and capacity. The update rhythm advances with semester batches, and the same record flows between drafts, revisions, and published versions. When materials enter the knowledge base retrieval and recall function, course offering plans and course selection rules serve as the main sources for semantic and full-text recall; scheduling tables, because they contain dates and classroom numbers, are often hit by full-text search; multilingual terminology comparison drafts are used in the question optimization and reranking stages, assisting with coreference resolution and cross-language matching, so that candidate chunks can refer back to the original text.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The unified terminology table and comparison drafts are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Course offering plan | Fields include course name, class, date, and signature column; the name, quantity, and date of the same record do not match between the two materials | Switch `searchMode` in the knowledge base search test, compare semantic and full-text candidates, and check whether candidate chunks contain course name and date fields |
| Scheduling table | Fields include time, classroom, instructor, and receipt column; versions are not synchronized or signatures are missing | Test once each with synonymous questions, see whether candidates include both semantic and full-text results, and record the number of candidates and scores |
| Course selection rules | Fields include priority, capacity, and effective date; the quantity of the same record does not match between the two materials | Turn `usingReRank` on and off to compare the ranking of the top few results, and check the impact of `similarity` and `limit` on the candidate range |
| Unified terminology table and comparison drafts | The same term is consistent throughout the text, and the translated name can refer back to the original text | Sample three terms to check whether their written forms are consistent throughout the text, and verify the tokens and array counts of the quoted text and record them separately |

## Three common errors

- Symptom: The name and quantity of the same course do not match between the course offering plan and the scheduling table. Cause: The two materials' versions are not synchronized, and terminology normalization was not performed before retrieval.
- Symptom: The scheduling table date conflicts with the effective date of the course selection rules. Cause: The revision was not written back to the published version, and signature or receipt confirmation is missing.
- Symptom: There are many candidates, but the top-ranked ones are all irrelevant. Cause: Reranking or similarity filtering was not enabled, and the citation limit trimming parameters do not match the material form.

## How to verify the setup

Acceptance for this function: test once each with synonym-rewritten questions, compare candidates and scores, then toggle reranking on and off to inspect the ranking of the top few results.

Business test: sample three terms to check whether their written forms are consistent throughout the text.

- In the knowledge base search test, switch the retrieval mode, compare candidate results, and record the number of candidates and scores.
- Check whether the returned candidates include both semantic and full-text results, and verify the tokens and array counts of the quoted text.
