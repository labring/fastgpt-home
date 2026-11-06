---
title: Knowledge Base Retrieval for Daily Kindergarten Care Management: Find Supporting Evidence
slug: /en/industry/education-d001-c001-f015
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Care | Retrieval | Evidence
meta_description: Kindergarten Care: review retrieval for evidence lookup. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Daily Kindergarten Care Management: Find Supporting Evidence

## What this category's data looks like

Kindergarten childcare daily life management involves three types of materials: daily life schedule, morning and afternoon check records, and child health observation records. The daily life schedule specifies routines and segment names; the morning and afternoon check records register body temperature, oral cavity, skin, and mental state on a daily basis; the health observation records track details such as water intake, meals, sleep, and bowel movements. All three types of materials have dates, fields, and signature columns; the morning and afternoon check records and health observation records also require receipts from parents or childcare workers. Materials are updated daily, summarized weekly, and archived monthly, and versions change as the kindergarten adjusts. When entering knowledge base retrieval, the daily life schedule provides segment names and time basis, the morning and afternoon check records provide the day's physical sign basis, and the health observation records provide continuous observation basis. The three mutually corroborate each other and are used to answer parents' inquiries or to write into childcare plans.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after mode, merge, rerank, filter, and upper limit trimming). The basis entries that can be traced back to the original text are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Daily life schedule | Fields include segment name, start and end time, responsible person's signature; the version must be the current one | Switch `searchMode` to retrieve once each with semantic, full-text, and hybrid modes, check whether the segment names and times in the candidate snippets match the current schedule, and record the number of candidates and scores |
| Morning and afternoon check records | Fields include date, body temperature, oral cavity, skin, mental state, signature; date and signature must be complete | Use synonymous questions to retrieve the same date, compare the date and signature columns in the candidate snippets, check whether the ranking of the top few is stable before and after enabling `usingReRank`, and record the number of candidates and scores |
| Child health observation records | Fields include water intake, meals, sleep, bowel movements, and observer's signature; the quantity and date must match | Adjust `similarity` and `limit` to observe candidate trimming, check whether the quantity and date in the candidate snippets match the morning and afternoon check records, and separately record the number of entries in the reference array |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match between the daily life schedule and the morning and afternoon check records. Cause: The versions of the two materials are not synchronized, and the old version of the schedule is still in the knowledge base participating in recall.
- Phenomenon: Candidate snippets lack signature or receipt columns, and the basis entries cannot be traced back to the original text. Cause: The signature area is missed during scanning crop or entry, and retrieval can only recall the body text snippets.
- Phenomenon: The same question cannot be recalled when phrased differently, or there are many candidates but the ones ranked first are all irrelevant. Cause: The retrieval mode does not match the material form, and rerank is not enabled for secondary sorting.

## How to verify the setup

Acceptance of this function: Test once each with synonymously rewritten questions, compare the number of candidates and scores, then toggle rerank to see the ranking of the top few; switch `searchMode` to observe the differences between semantic and full-text candidates, adjust `similarity` and `limit` to see the tokens of the reference text after trimming, and record the number of array entries separately.

Business test: Ask a cross-material basis question and see whether the answer gives a traceable source

- In the knowledge base search test, fix the question, use semantic, full-text, and hybrid retrieval respectively, record the number of candidates and scores, and check whether the candidate snippets can be traced back to the original text of the kindergarten's current materials.
- Compare the ranking of the top few before and after enabling rerank, adjust `similarity` and `limit`, check the tokens of the reference text and the number of array entries, and confirm that the signature, date, and quantity fields have not been trimmed off.
