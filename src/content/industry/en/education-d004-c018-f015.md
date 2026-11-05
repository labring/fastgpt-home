---
title: Knowledge Base Retrieval for Undergraduate Curriculum Planning: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c018-f015
page_type: 行业问题页
application_area: education
meta_title: Program Revision | Retrieval | Handover
meta_description: Program Revision: review retrieval for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Undergraduate Curriculum Planning: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

The drafting of materials and handover of responsibilities for undergraduate program revision involves three types of materials: program plans, course syllabi, and credit structure tables. The program plan defines total credits and course modules; the course syllabus specifies course objectives and assessments; the credit structure table lists credits and proportions for each module. Materials come from the academic affairs system and departmental submissions, with updates progressing according to revision batches. Fields include course name, credits, contact hours, semester offered, responsible person, signature date, and version number. When entering the knowledge base retrieval service, these three types of materials serve as candidate fragment sources, and retrieval results are used by subsequent nodes or manual drafting to produce signable material drafts and handover records. The name, quantity, and date of the same record in two materials must be aligned item by item, and versions and signature receipts must be synchronized.

## Configuration and implementation checks

The knowledge base retrieval service (retrieval node and search test) only outputs candidate fragments and similarity scores (after pattern, merge, rerank, filter, and limit trimming). Signable material drafts and handover records must be produced by subsequent nodes or manual work. A single retrieval consists of question optimization, semantic/full-text/hybrid recall, multi-path merging, rerank secondary sorting, similarity filtering, and reference limit trimming, finally yielding the reference content passed to the model.

| Object | Check | Verification action |
| --- | --- | --- |
| Program plan | Course name, credits, contact hours, semester offered, version number, and signature date are consistent between the program plan and course syllabus | Switch `searchMode` to semantic, full-text, and hybrid for one retrieval each, and check whether course name and credit fields in candidate fragments are aligned |
| Course syllabus | Course objectives, assessment methods, and corresponding credits are consistent in quantity and date between the course syllabus and credit structure table | Compare the order of the top few candidates before and after enabling `usingReRank`, and check whether syllabus fragments cover assessment and credit fields |
| Credit structure table | The total credits and proportions of each module are consistent with the total credits in the program plan, and signatures and receipts are complete | Check the number of candidates and `similarity` scores, and verify whether structure table fragments retain the original module names and proportions |
| Handover record | Responsible person, version number, signature date, and receipt are consistent between the draft and handover record | After filtering with `limit` and `similarity`, check whether handover record fragments contain responsible person and date fields |

## Three common errors

- Symptom: The name and credits of the same course do not match between two materials. Cause: Candidate fragments come from different versions, are not aligned by version number and date, and fields are not checked item by item after retrieval hits.
- Symptom: The number of modules in the course syllabus and credit structure table is inconsistent. Cause: Versions are not synchronized, the old structure table is still in the candidate pool, and date-based trimming is not applied after merging.
- Symptom: The handover record lacks a signature or receipt. Cause: The draft is circulated before all fields are filled, retrieval candidates do not cover the signature field, and subsequent nodes do not intercept missing items.

## How to verify the setup

Feature acceptance: Test once each with synonym-rewritten questions, compare candidates and scores, then toggle rerank to observe the order of the top few results; switch `searchMode` and record the number of candidates and `similarity`, and use `limit` and `usingReRank` to observe trimming and sorting changes.

Business test: Draft one according to the template and complete one handover to see whether missing items are intercepted.

- In the knowledge base search test, switch `searchMode` and compare candidate fragments and scores across semantic, full-text, and hybrid modes.
- Enable and disable `usingReRank`, compare the order of the top few candidates, and check whether key fields are still retained.
