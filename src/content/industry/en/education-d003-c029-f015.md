---
title: Knowledge Base Retrieval for Vocational College Curriculum Planning: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c029-f015
page_type: 行业问题页
application_area: education
meta_title: Vocational Curricula | Retrieval | Intake
meta_description: Vocational Curricula: review retrieval for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Vocational College Curriculum Planning: Handle Questions and Collect Missing Information

## What this category's data looks like

The data for this category looks like this: Vocational college talent training program formulation involves three core types of materials: talent training programs, course standards, and job competency analysis tables. A talent training program typically includes fields such as major name, training objectives, course settings, credit hours and credits, and graduation requirements; it is drafted under the leadership of the academic affairs office and revised on a rolling basis each academic year. Course standards correspond to specific courses and include course objectives, teaching content, assessment methods, and credit hour allocation; they are organized and written by secondary colleges. Job competency analysis tables come from enterprise research and record job names, competency requirements, and corresponding courses; they are reviewed by the professional construction committee. The three types of materials play different roles in the question answering acceptance and missing-item follow-up scenario: the talent training program is the main basis, course standards are detailed support, and the job competency analysis table is external corroboration. After materials enter the knowledge base retrieval service, they first undergo question optimization, semantic or full-text recall, multi-route merging, reranking, similarity filtering, and citation upper-limit trimming to obtain candidate chunks and similarity scores, which are used by subsequent nodes to determine missing items and generate follow-up questions.

## Configuration and implementation checks

How to configure it: This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after mode, merging, reranking, filtering, and upper-limit trimming). Acceptance records and completed question items are then handled by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Talent training program | Whether the fields include major name, training objectives, course settings, credit hours and credits, and graduation requirements; whether the date is the latest revised version; whether the signatures include the academic affairs office and the major head | In the retrieval node, enter the program name and major, and check whether the candidate chunks cover the above fields; use `searchMode` to switch between semantic and full-text, and compare the number of candidate items and scores |
| Course standard | Whether the fields include course objectives, teaching content, assessment methods, and credit hour allocation; whether the date is consistent with the revision cycle of the talent training program; whether the signature includes the head of the secondary college | Retrieve course standard keywords, and check whether the candidate chunks include assessment methods and credit hour allocation; enable `usingReRank` and compare the ranking of the first few items |
| Job competency analysis table | Whether the fields include job name, competency requirements, and corresponding courses; whether the date is within the validity period of the enterprise research; whether the signatures include enterprise experts and the professional construction committee | Retrieve the job name and competency requirements, and check whether the candidate chunks are consistent with the corresponding courses in the course standards; use `similarity` to filter low-scoring candidates, and record the number of array items |

## Three common errors

- Phenomenon: The same major name is written differently in the talent training program and the course standard. Cause: The two materials are maintained by different departments, and field alignment and version synchronization have not been done.
- Phenomenon: The research date of the job competency analysis table is earlier than the revision date of the course standard. Cause: The enterprise research cycle and the teaching revision cycle are not coordinated, and the versions are not synchronized.
- Phenomenon: The course standard lacks the signature or receipt of the head of the secondary college. Cause: The approval process was not completed before archiving, and signature completeness verification was not performed when the materials entered the knowledge base.

## How to verify the setup

Acceptance of this function: Test once each with synonymously rewritten questions, compare the number of candidate items and scores, then turn reranking on and off to observe the ranking of the first few items; check the candidate changes corresponding to the three identifiers `searchMode`, `usingReRank`, and `similarity`.

Business test: Ask a question that lacks key information, and see whether it first asks a follow-up question before answering.

- In the knowledge base search test, switch `searchMode`, compare the number of candidate items and scores for the three modes: semantic, full-text, and hybrid, and record the array length.
- Enable and disable `usingReRank`, compare changes in the ranking of the first few items; after filtering with `similarity`, check the cited text tokens, and record the number of array items separately.
