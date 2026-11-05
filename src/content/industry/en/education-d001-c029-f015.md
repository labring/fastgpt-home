---
title: Knowledge Base Retrieval for Vocational College Curriculum Planning: Find Supporting Evidence
slug: /en/industry/education-d001-c029-f015
page_type: 行业问题页
application_area: education
meta_title: Vocational Curricula | Retrieval | Evidence
meta_description: Vocational Curricula: review retrieval for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Vocational College Curriculum Planning: Find Supporting Evidence

## What this category's data looks like

When vocational colleges formulate talent cultivation programs, the business basis query involves three types of materials: talent cultivation programs, curriculum standards, and job competency analysis tables. The talent cultivation program contains the major name, cultivation objectives, curriculum setup, class hours and credits, approval signatures, and version date; the curriculum standard contains the course name, teaching objectives, teaching content, assessment methods, and signing date; the job competency analysis table contains the job name, competency items, corresponding courses, research date, and expert signature. The materials are updated according to the academic year or the major revision cycle, and old versions are retained for reference. When entering the knowledge base retrieval service, the three types of materials each serve as candidate fragment sources and are recalled by semantic, full-text, or hybrid mode; after merging, reranking, filtering, and upper-limit trimming, they serve as candidate basis items that can be traced back to the original text, for subsequent nodes or manual generation of finished answers to parents or written into the program.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after mode, merging, reranking, filtering, and upper-limit trimming). The basis items that can be traced back to the original text are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Talent cultivation program | Fields, dates, and signatures must be consistent with the current version; the major name, curriculum setup, class hours, and credits must match the original text | In the knowledge base search test, switch `searchMode` to semantic, full-text, or hybrid, check the number of candidate items and scores, and inspect the program's signing date and signature column |
| Curriculum standard | The course name, teaching objectives, assessment methods, and signing date must be consistent with the corresponding records in the talent cultivation program | Retrieve the curriculum standard with synonymous questions, compare candidates and scores, and check whether the course name and date match the program |
| Job competency analysis table | The job name, competency items, corresponding courses, research date, and expert signature must be traceable back to the original text | Compare the ranking of the top few items before and after enabling `usingReRank`, and check the correspondence between competency items and courses as well as the signature receipt |
| Knowledge base retrieval service | Candidate fragments and similarity scores are returned after merging, reranking, filtering, and upper-limit trimming; the number of cited items is the array length | Adjust `similarity` and `limit`, record the number of candidate items and scores, and separately check the tokens of the cited text; do not compare them for equality with the array length |

## Three common errors

- Symptom: The same major name is written differently in the program and the curriculum standard, and the dates do not match either. Cause: The two materials were revised separately, without version synchronization and field verification.
- Symptom: The job competency analysis table lacks an expert signature or receipt, yet its competency items have already been cited in the program. Cause: The material circulation step did not collect all signatures before it directly entered the knowledge base.
- Symptom: The class hours for the same course are inconsistent between the program and the curriculum standard. Cause: The old version of the curriculum standard was not updated along with the program, and both versions are hit at the same time during recall.

## How to verify the setup

Feature acceptance: test once each with synonymously rewritten questions, compare candidates and scores, then toggle reranking on and off to observe the ranking of the top few items.

Business test: ask a basis question that spans materials and see whether the answer provides traceable sources.

- In the knowledge base search test, switch `searchMode` and test once each with synonymous questions, recording the number of candidate items and scores.
- Compare the ranking of the top few items before and after enabling `usingReRank`, and adjust `similarity` and `limit` to observe the filtering and trimming effects.
