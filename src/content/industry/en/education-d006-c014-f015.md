---
title: Knowledge Base Retrieval for School Moral Education and Class Teacher Work: Track Progress and Check Statistics
slug: /en/industry/education-d006-c014-f015
page_type: 行业问题页
application_area: education
meta_title: Pastoral Education | Retrieval | Progress
meta_description: Pastoral Education: review retrieval for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for School Moral Education and Class Teacher Work: Track Progress and Check Statistics

## What this category's data looks like

This page addresses school moral education and homeroom teacher work scenarios. The materials come from three types of daily ledgers: themed class meeting plans, student comprehensive quality records, and home visit records, updated on a weekly or monthly rolling basis. Themed class meeting plans contain activity objectives, process, and reflection fields; student comprehensive quality records contain dimensions such as ideological and moral character, academic level, and physical and mental health, along with grades; home visit records contain visit time, subject, content, and parent receipt signature. When these materials enter the knowledge base retrieval and recall function, each plays a different role: themed class meeting plans provide activity name and date clues, student comprehensive quality records provide student names and evaluation entries, and home visit records provide visit counts and signature status. Together, the three constitute the source of candidate snippets that can be retrieved during progress recording and statistical verification, facilitating subsequent aggregation by class, time, or student dimension.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after mode, merge, re-rank, filter, and upper-limit trimming). The progress table and statistical scope description are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Themed class meeting plan | Check whether the activity name, conduct date, and homeroom teacher signature are consistent with the weekly record | In the search test, retrieve by class and week number, record the number of candidates and scores, and verify the plan name and date |
| Student comprehensive quality record | Check whether the student name, evaluation dimension, and grade correspond one by one with the summary table | Switch `searchMode` to semantic, full-text, or hybrid, and compare whether the candidates cover the same student entries |
| Home visit record | Check whether the visit date, subject, and parent receipt signature are complete and version-synchronized | Compare the order of the first few items before and after enabling `usingReRank`, and confirm that the home visit record ranking is stable |
| Retrieval returned references | Check whether the candidate snippets and similarity scores meet the `similarity` threshold and do not exceed `limit` | Record the number of items in the returned array, and separately check whether the reference text tokens are within budget |

## Three common errors

- Symptom: The same class meeting is written with a topic name in one material and an activity number in another, and the dates do not match. Cause: The two materials were entered separately and were not aligned to the same field definition.
- Symptom: A home visit record has a signature in the class ledger but is missing the receipt in the summary table. Cause: The versions were not synchronized, and the receipt was not written back to the summary table after supplementary entry.
- Symptom: There are many retrieval candidates, but the ones ranked first are all irrelevant, and the answer lacks key passages. Cause: The retrieval mode does not match the material form, re-rank is not enabled, or the similarity filter is too loose.

## How to verify the setup

This function's acceptance: test once each with synonym-rewritten questions, compare candidates and similarity scores, then toggle re-rank on and off to observe the ranking of the first few items; at the same time, switch `searchMode` to observe the differences between semantic and full-text candidates.

Business test: use one week's records to verify the totals, check whether the scope and exceptions are clearly stated, confirm that the record count and statistical count match, and write the scope into the table header.

- In the knowledge base search test, retrieve the same question once with each of two phrasings, record the number of candidates and scores, and check whether both can recall the key snippets.
- When verifying the reference upper limit, separately record the number of items in the returned array, and separately check whether the reference text tokens are within budget; do not compare the two as equal.
