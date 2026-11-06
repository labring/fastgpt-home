---
title: Knowledge Base Retrieval for Course Selection, Timetables and Classroom Allocation: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c019-f015
page_type: 行业问题页
application_area: education
meta_title: Course Scheduling | Retrieval | Handover
meta_description: Course Scheduling: review retrieval for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Course Selection, Timetables and Classroom Allocation: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page addresses the course selection, scheduling, and classroom resource scheduling scenario. Materials include course offering plans, class schedules, course selection rules, and signable material drafts and handover records. These materials are usually updated by semester or round, and fields cover course name, course code, class size, classroom number, capacity, week number, period, instructor, effective date, and signature field. When entering the knowledge base retrieval service, course offering plans and class schedules serve as candidate fragment sources, course selection rules serve as constraint basis, and handover records serve as responsibility evidence. Materials must remain consistent with each other in name, quantity, date, version, and signature. The retrieval node is responsible for recalling relevant fragments and giving similarity scores, for subsequent nodes or humans to draft and sign off accordingly.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after mode, merge, rerank, filter, and limit trimming). Signable material drafts and handover records are completed subsequently by later nodes or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| Course offering plan | Fields are complete, including course name, course code, class size, effective date, and signature; dates and versions are consistent | In the search test, switch `searchMode` to semantic, full-text, or hybrid, and check whether candidate fragments cover the course offering plan fields; check the `similarity` score and the number of candidates |
| Class schedule | Fields are complete, including classroom number, capacity, week number, period, instructor, and signature; the name, quantity, and date of the same record match across the two materials | Compare the order of the top few candidates before and after enabling `usingReRank`, and confirm that key fragments of the class schedule are not trimmed; record the number of cited items and the cited text tokens |
| Course selection rules | Fields are complete, including course selection conditions, capacity limit, effective date, and signature; release is not allowed when the version is not synchronized or the receipt is missing | Test once each with synonym-rewritten questions, and compare candidates and scores; check whether the key paragraphs of the original rule text are still retained after `limit` trimming |
| Handover record | The responsible person is clear, the version and date are consistent, and the signature or receipt is complete | Draft one according to the template and complete one handover, and see whether missing items are blocked; check whether the candidate fragments and cited content correspond to the handover record fields |

## Three common errors

- Symptom: The name, headcount, or date of the same course do not match between the course offering plan and the class schedule. Cause: Candidate fragments come from different versions of materials and were not checked against the effective date and version number.
- Symptom: The course selection rule version is not synchronized, and the old rule is still recalled. Cause: Multiple versions of the same rule exist in the knowledge base, and retrieval did not filter by the latest effective date.
- Symptom: The handover record lacks a signature or receipt, but the draft is still issued. Cause: Retrieval only returns candidate fragments and similarity scores, and does not validate the signature field and receipt field.

## How to verify the setup

Acceptance of this feature: test once each with synonym-rewritten questions, compare candidates and scores, then toggle rerank on and off to observe the ordering of the top few; switch `searchMode` to observe candidate changes, record the `similarity` score and the number of candidates, and check and separately record the cited text tokens and array item count after `limit` trimming.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- In the knowledge base search test, switch `searchMode` to semantic, full-text, or hybrid, compare candidate fragments and `similarity` scores, and confirm that the material form matches the retrieval mode.
- Enable and disable `usingReRank`, compare the order of the top few candidates; check the cited text tokens after `limit` trimming, and separately record the number of items in the citation array.
