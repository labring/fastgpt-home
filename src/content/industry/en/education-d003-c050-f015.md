---
title: Knowledge Base Retrieval for Foreign Teacher Recruitment and Course Scheduling: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c050-f015
page_type: 行业问题页
application_area: education
meta_title: Foreign Teachers | Retrieval | Intake
meta_description: Foreign Teachers: review retrieval for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Foreign Teacher Recruitment and Course Scheduling: Handle Questions and Collect Missing Information

## What this category's data looks like

Materials in the foreign teacher appointment and course scheduling category consist mainly of appointment contracts, work permit materials, and course schedules, plus signature pages and receipts. Contracts and permit materials mostly come from overseas or the competent authority, and are updated as approval milestones progress; course schedules are maintained on a rolling per-semester basis by the teaching department. Field characteristics center on name, passport number, position, class hours, start and end dates, issue date, and signature fields. The same record often has mismatched names, quantities, and dates across two materials, versions are not synchronized, and signatures or receipts are missing. When materials enter this feature, contracts and permit materials serve as the basis for appointment compliance, course schedules serve as the basis for scheduling and performance, and receipts and signature pages are used to confirm delivery and confirmation, jointly supporting Q&A intake and missing-item follow-up.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after pattern, merge, re-rank, filter, and upper-limit trimming). Intake records and the completed follow-up questions are then handled by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Appointment contract | Whether the name, position, start and end dates, and signature field are consistent with the work permit materials | Compare the name and dates of the same record in the two materials, and check whether signatures and receipts are complete; in the search test, switch `searchMode` to observe candidates |
| Work permit materials | Whether the issue date, permit period, and passport number match the contract | Check whether the permit period and the contract start and end dates connect, record the number of candidate chunks and scores, and confirm that key chunks are still retained after `similarity` filtering |
| Course schedule | Whether the class hour quantity, teaching dates, and teacher name are consistent with the contract | Compare the class hours and dates of the same teacher in the schedule and the contract, and check whether versions are synchronized; use the `usingReRank` switch to compare the ordering of the top few results |
| Intake records and completed follow-up questions | Whether missing items are identified and followed up on, and whether answers are grounded in materials | Ask a question that lacks key information and see whether it follows up before answering; record the number of candidate chunks and scores, and observe the number of cited chunks according to `limit` |

## Three common errors

- Symptom: the name or dates of the same teacher do not match between the contract and the permit materials. Cause: the two materials were entered separately, no cross-check was performed, and versions are not synchronized.
- Symptom: the class hour quantity in the course schedule is inconsistent with the contract agreement. Cause: the schedule is updated on a rolling per-semester basis, the contract was not revised in sync, and signatures or receipts are missing.
- Symptom: the answer lacks key passages, and although there are many candidates, the ones ranked at the front are irrelevant. Cause: the retrieval mode does not match the material form, re-rank is not enabled, or similarity filtering is too loose.

## How to verify the setup

Feature acceptance: test once each with synonym-rewritten questions, compare candidates and scores, then toggle re-rank to see the ordering of the top few results; switch `searchMode` and `usingReRank`, record the number of candidate chunks and scores, and observe the tokens of the cited text after `similarity` filtering and `limit` trimming, recording the array count separately.

Business test: ask a question that lacks key information and see whether it follows up before answering.

- In the knowledge base search test, switch the retrieval mode, compare whether candidates include both semantic and full-text results, and record the number of candidate chunks and scores.
- Check the names, quantities, dates, and signatures of the appointment contract, work permit materials, and course schedule, and confirm that missing items are followed up on and that answers are grounded in materials.
