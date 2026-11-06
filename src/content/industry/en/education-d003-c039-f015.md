---
title: Knowledge Base Retrieval for Exam Organization and Misconduct Handling: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c039-f015
page_type: 行业问题页
application_area: education
meta_title: Exam Administration | Retrieval | Intake
meta_description: Exam Administration: review retrieval for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Exam Organization and Misconduct Handling: Handle Questions and Collect Missing Information

## What this category's data looks like

This page focuses on the exam administration and violation handling category; the materials include exam administration manuals, examination room record sheets, and violation fact records. The exam administration manual specifies the exam schedule, examination room arrangement, invigilation duties, and the criteria for determining violations, and is the baseline source for organizational processes and judgment standards; the examination room record sheet registers item by item per session the number of candidates expected, the number actually present, the number absent, abnormal situations, and the invigilator's signature, and is the original evidence of on-site facts; the violation fact record records item by item the time, place, description of behavior, evidence list, and signatures of the parties concerned and the invigilator of the suspected violation, and is the basis for subsequent handling. The three types of materials have different update rhythms: the exam administration manual is released in editions as the system is revised, the examination room record sheet is filled in on the spot and collected for each session, and the violation fact record is supplemented in batches as individual cases progress. Field characteristics are concentrated in four categories: names, quantities, dates, and signatures; information for the same session appears repeatedly across the three materials, and when entering retrieval they respectively assume the roles of criteria, facts, and evidence.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after pattern, merge, rerank, filter, and upper-limit trimming). "Intake records and the questions to be completed" are then handled by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Exam administration manual | Names, dates, and signature criteria must be aligned item by item with the examination room record sheet and the violation fact record; when versions are not synchronized, the current version prevails | In the search test, use the same question to switch `searchMode` and take candidates separately, and check whether the session names, dates, and duty statements in the hit chunks are consistent |
| Examination room record sheet | The numbers expected, actually present, and absent, and the description of abnormal situations, must correspond item by item with the exam administration manual schedule and the violation fact record; a missing invigilator signature or receipt means it is a pending item | Check whether the candidate chunks cover both the quantity fields and the signature column, compare whether the chunks ranked higher by `similarity` fall in the corresponding session, and record the number of candidates and the scores |
| Violation fact record | The behavior description, evidence list, time and place, and the signature of the party concerned must be consistent with the same-session record in the examination room record sheet; if names or quantities do not match, first check the hits and associations | Turn `usingReRank` on and off and take candidates once each, compare whether the top few rankings move same-session evidence chunks earlier, and check the tokens and array length of the cited text and record them separately |

## Three common errors

- Phenomenon: the name, quantity, or date of the same session does not match between two materials. Cause: each was filled in independently at entry time, without backfilling and checking against the exam administration manual criteria.
- Phenomenon: the exam administration manual clauses cited by the violation fact record are inconsistent with the current version. Cause: after the manual was updated in editions, old records were not synchronized, and retrieval still recalls old chunks.
- Phenomenon: the examination room record sheet lacks the invigilator's signature or receipt, and the violation fact record lacks the signature of the party concerned. Cause: signing was not completed on the spot, and missing items were not checked back when supplementing the record afterward.

## How to verify the setup

This feature's acceptance: test once each with synonym-rewritten questions, compare candidates and scores, then turn rerank on and off to see the ranking of the top few; at the same time check the differences in the number of candidates and scores across the three items `searchMode`, `similarity`, and `usingReRank`.

Business test: ask a question that lacks key information and see whether it first asks a follow-up before answering

- In the search test, for the same question, switch retrieval modes and turn rerank on and off, record the number of candidates and the scores, and check whether the returned chunks retain the key passages of the original text
- For questions missing the session, date, or signature, trigger a follow-up first, retrieve again after completion, and check the tokens and array length of the cited text and record them separately
