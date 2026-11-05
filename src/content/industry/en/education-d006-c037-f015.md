---
title: Knowledge Base Retrieval for Vocational Training Subsidy Applications: Track Progress and Check Statistics
slug: /en/industry/education-d006-c037-f015
page_type: 行业问题页
application_area: education
meta_title: Training Subsidies | Retrieval | Progress
meta_description: Training Subsidies: review retrieval for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Vocational Training Subsidy Applications: Track Progress and Check Statistics

## What this category's data looks like

This page's material comes from the vocational training subsidy application scenario and includes three types: training class opening filings, attendance records, and completion assessment forms. Opening filings provide the class name, training start and end dates, student roster, and filing receipt; attendance records provide the attendance date, student name, and sign-in signature by day; completion assessment forms provide the assessment date, score, and assessment signature. The three types of material play different roles when entering knowledge base retrieval: opening filings are used to locate the batch and personnel scope, attendance records are used to verify attendance dates and signatures, and completion assessment forms are used to verify assessment results and signatures. The material update cadence is synchronized with the application batch, summarized weekly or monthly. Field characteristics are concentrated in four categories: name, quantity, date, and signature. The same record may show inconsistencies in name spelling, number of people, dates, or missing signatures across different materials, and these must be marked item by item in the progress table and statistical scope description.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after mode, merge, re-rank, filter, and limit trimming). The progress table and statistical scope description are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Training class opening filing | Whether the class name, training start and end dates, student roster, and filing receipt align item by item with the attendance records and completion assessment forms | In the search test, switch `searchMode`, test once each with synonymous questions, record the number of candidates and scores, then verify the names, number of people, and dates across the filing, attendance records, and assessment forms |
| Attendance records | Whether the attendance date, student name, and sign-in signature are consistent with the opening filing roster and the completion assessment form's assessment date | Compare the top few rankings before and after enabling `usingReRank`, check whether the attendance record candidates include both semantic and full-text results, then verify the signatures and receipt |
| Completion assessment form | Whether the assessment date, score, and assessment signature are consistent with the attendance record attendance dates and the opening filing's completion conditions | Adjust `similarity` to observe changes in the number of candidates and scores, record the tokens and array count of the cited text, then verify the dates and signatures across the assessment form, attendance records, and filing |
| Statistical scope description | Whether the record count and statistical count match, whether the scope is written in the header, and whether exceptions are clearly stated | Use one week of records to verify the total, check the header scope and exception notes, then verify whether the tokens of the cited text after limit trimming retain the key chunks |

## Three common errors

- Symptom: the same student's name is written differently in the opening filing and attendance records, and the totals do not match. Cause: the name field was not unified when the two materials were entered, and the versions were not synchronized.
- Symptom: the number of people in the attendance records is inconsistent with the number of people in the completion assessment form, and a difference appears in the statistical count. Cause: missing signatures or receipts, and some records were not included in the summary.
- Symptom: the training start and end dates do not match between the filing and the assessment form, and the progress table dates are misaligned. Cause: the materials have different update cadences, and the old version was not replaced.

## How to verify the setup

This feature's acceptance: test once each with synonymously rewritten questions, compare candidates and scores, then toggle re-ranking to inspect the top few rankings; check the impact of `searchMode`, `usingReRank`, `similarity`, and `limit` on the number of candidates and scores.

Business test: use one week of records to verify the total, and check whether the scope and exceptions are clearly stated; verify whether the names, quantities, dates, and signatures in the opening filing, attendance records, and completion assessment form are consistent.

- In the knowledge base search test, switch `searchMode`, retrieve the same question using semantic, full-text, and hybrid modes respectively, record the number of candidates and scores, then enable `usingReRank` to compare the top few rankings.
- Adjust `similarity` and `limit`, observe changes in the tokens and array count of the cited text, then verify whether the names, quantities, dates, and signatures in the opening filing, attendance records, and completion assessment form align item by item.
