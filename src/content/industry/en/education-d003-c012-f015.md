---
title: Knowledge Base Retrieval for District Teaching Research and Classroom Reviews: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c012-f015
page_type: 行业问题页
application_area: education
meta_title: Teaching Reviews | Retrieval | Intake
meta_description: Teaching Reviews: review retrieval for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for District Teaching Research and Classroom Reviews: Handle Questions and Collect Missing Information

## What this category's data looks like

District and county teaching research activities and lesson observation and evaluation involve three types of materials: teaching research activity notices, lesson observation records, and lesson evaluation minutes. A notice contains the activity name, date, subject, host school, agenda, and reply slip; a lesson observation record contains the instructor, class, lesson topic, time, observation points, and signature; lesson evaluation minutes contain evaluation points, conclusions, participants, and signatures. Materials are updated by activity cycle: first the notice, then the record, then the minutes. It is common for the name, quantity, and date of the same record to fail to match across two materials, for versions to be out of sync, and for signatures or reply slips to be missing. When entering this feature, the notice is used to confirm the activity scope and participants, the lesson observation record is used to locate classroom facts, and the lesson evaluation minutes are used to support evaluation conclusions. Together, the three constitute the retrieval source for Q&A intake and missing-item follow-up. When key information is missing, ask a follow-up question first before answering.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), which outputs candidate chunks and similarity scores (after pattern, merge, rerank, filter, and upper-limit trimming). "Intake records and items to be completed" are then handled by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Teaching research activity notice | Fields include activity name, date, subject, host school, agenda, and reply slip; the name, quantity, and date must be consistent with the lesson observation record and lesson evaluation minutes | In the knowledge base search test, switch `searchMode`, compare whether the date, subject, and host school in the notice and the record match, and check the number of candidates and the scores |
| Lesson observation record | Fields include instructor, class, lesson topic, time, observation points, and signature; it must be consistent with the date and subject of the notice and have complete signatures | Test once each with synonymous rephrased questions, compare the candidates and `similarity` scores, then toggle `usingReRank` on and off to see the ranking of the top few results |
| Lesson evaluation minutes | Fields include evaluation points, conclusions, participants, and signature; it must be consistent with the lesson topic and date of the lesson observation record and have a complete reply slip | Check whether the lesson topic and date of the minutes are consistent with the lesson observation record, check the number of returned citation chunks and content completeness, and record the number of candidates after `limit` trimming |

## Three common errors

- Symptom: the name, quantity, and date of the same activity fail to match across two materials. Cause: the notice, lesson observation record, and lesson evaluation minutes are each entered without cross-checking, and versions are out of sync.
- Symptom: the lesson evaluation minutes lack a signature or reply slip, and the evaluation conclusion cannot be confirmed at intake. Cause: the material archiving step does not validate the signature and reply slip fields, and missing items are not identified.
- Symptom: the same question cannot be recalled when rephrased, and although there are many candidates, none of the top-ranked ones are relevant. Cause: the retrieval mode does not match the material form, rerank is not enabled, or similarity filtering is too loose.

## How to verify the setup

This feature's acceptance: test once each with synonymous rephrased questions, compare candidates and scores, then toggle rerank on and off to see the ranking of the top few results; check the actual effects of `searchMode`, `similarity`, `usingReRank`, and `limit`.

Business test: ask a question that lacks key information and see whether a follow-up question is asked before answering.

- In the knowledge base search test, switch `searchMode`, compare the number of candidates and scores of the semantic, full-text, and hybrid modes, and confirm that it matches the material form.
- Toggle `usingReRank` on and off to compare the ranking of the top few results, and check whether the key original text chunks are still retained after similarity filtering and citation upper-limit trimming.
