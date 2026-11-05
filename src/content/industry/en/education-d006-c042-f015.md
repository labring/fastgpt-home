---
title: Knowledge Base Retrieval for Corporate Sales and Product Training: Track Progress and Check Statistics
slug: /en/industry/education-d006-c042-f015
page_type: 行业问题页
application_area: education
meta_title: Sales Training | Retrieval | Progress
meta_description: Sales Training: review retrieval for progress tracking. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Corporate Sales and Product Training: Track Progress and Check Statistics

## What this category's data looks like

Enterprise sales product training materials usually include product manuals, sales talking points, and channel training schedules. Product manuals are updated by version, with fields including product name, model, feature points, and release date; sales talking points are iterated by scenario, with fields including talking point number, applicable product, objection handling, and effective date; channel training schedules are arranged weekly, with fields including course name, instructor, participating channels, class hours, and signature column. The three types of materials play different roles when entering knowledge base retrieval and recall: product manuals provide product facts and parameters, sales talking points provide expression and responses, and channel training schedules provide scheduling and sign-in evidence. In terms of update rhythm, manuals follow version releases, talking points follow sales reviews, and schedules are adjusted weekly. In terms of field characteristics, names, quantities, dates, and signatures are the key points for verification; the same record may be written differently across the three materials, and the header definitions must be used to unify them.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The progress table and statistical definition notes are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Product manual | Fields, dates, and signatures: whether product name, model, feature points, and release date are consistent with the sales talking points and schedule, and whether the version number is synchronized | In the search test, use synonymous questions to retrieve the product name and model, record the number of candidates and scores, and check whether the names, dates, and versions in the returned chunks match the manual header |
| Sales talking points | Fields, dates, and signatures: whether the talking point number, applicable product, objection handling, and effective date match the manual and schedule, and whether there is a receipt or signature | Switch `searchMode` to semantic, full-text, and hybrid and retrieve once each, compare the talking point number and effective date in the candidate chunks, and check whether they correspond to the signature column in the schedule |
| Channel training schedule | Fields, dates, and signatures: whether the course name, instructor, participating channels, class hours, and signature column are consistent with the manual and sales talking points; missing signatures or receipts must be marked | Turn `usingReRank` on and off and inspect the top few rankings each time, record the number of candidates and scores, check the schedule dates and signature column, and record the number of items in the citation array separately |
| Statistical definition notes | Record counts and statistical counts match, and definitions are written in the header: whether the total row and exception items are clearly stated | Use one week of records to verify the total, compare item by item according to the header definitions, and when citation limits are involved, check the tokens of the cited text; record the number of array items separately, and do not compare `limit` with the number of items |

## Three common errors

- Phenomenon: the name, quantity, and date of the same record do not match between the product manual and the sales talking points. Cause: the two materials are updated separately and are not checked against a unified header definition.
- Phenomenon: the channel training schedule and the product manual version are not synchronized, and the old schedule is still recalled. Cause: after the version update, it was not replaced in sync, and retrieval still hits the old chunks.
- Phenomenon: the signature column or receipt in the schedule is missing, but it is still counted in the total during statistics. Cause: sign-in and receipts were not archived, and the definition did not list exception items separately.

## How to verify the setup

This feature acceptance: test once each with synonym-rewritten questions, compare candidates and scores, then turn rerank on and off to inspect the top few rankings; switch `searchMode` and `usingReRank`, record the number of candidates and scores, and when limits are involved, check the tokens of the cited text; record the number of array items separately, and do not compare `limit` with the number of items.

Business test: use one week of records to verify the total, and see whether the definitions and exceptions are clearly stated; compare the names, quantities, dates, and signatures of the product manual, sales talking points, and channel training schedule item by item, and list exception items with missing signatures or receipts separately.

- In the knowledge base search test, use synonymous questions to retrieve the product name and sales talking point number, record the number of candidates and scores, and check the dates and signature column in the returned chunks.
- Turn `usingReRank` on and off to compare the top few rankings, switch `searchMode` to compare candidate sources, and check the tokens of the cited text and the number of array items.
