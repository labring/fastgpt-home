---
title: Knowledge Base Retrieval for Vocational Training Subsidy Applications: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c037-f015
page_type: 行业问题页
application_area: education
meta_title: Training Subsidies | Retrieval | Intake
meta_description: Training Subsidies: review retrieval for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Vocational Training Subsidy Applications: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses Q&A intake and missing-item follow-up for vocational training subsidy applications. Materials come from three sources: training class filing records, attendance records, and completion assessment forms, updated on a rolling basis by batch and class cycle. Class filing records provide institution, course, number of participants, start and end dates, and filing number; attendance records provide daily attendance, sign-in time, and trainee signature; completion assessment forms provide assessment subjects, scores, completion conclusion, and assessor signature. After the three types of materials enter the retrieval node, each plays a different role: filing records are used to determine the applying entity and class boundaries, attendance records are used to verify attendance and personnel consistency, and assessment forms are used to confirm completion eligibility and assessment results. Field characteristics center on names, quantities, dates, signatures, and receipts. It is common for the same record to have mismatched names, participant counts, and dates across different materials, unsynchronized versions, or missing signatures and receipts. Before retrieval, question optimization is performed first, then a recall method is selected according to the material form, and finally candidate snippets and similarity scores are provided for subsequent nodes or manual generation of intake records and follow-up items to be completed.

## Configuration and implementation checks

This step is performed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after pattern, merge, rerank, filter, and limit trimming). "Intake records and follow-up items to be completed" are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Training class filing records | Fields include institution name, course name, class size, start and end dates, filing number, and handler signature; the name, quantity, and dates of the same class in two materials must be consistent | In the search test, switch `searchMode`, search once each by filing number and course name, check whether the institution, participant count, dates, and signature in the candidate snippets are complete, and record the number of candidates and scores |
| Attendance records | Fields include trainee name, sign-in date, sign-in time, and personal signature; compare person by person with the filing roster, and separately mark entries missing signatures or receipts | Search by a combination of trainee name and class, compare the top few rankings before and after enabling `usingReRank`, check whether the sign-in date and the filing start and end dates fall within the same interval, and record the number of candidates and scores |
| Completion assessment forms | Fields include assessment subjects, scores, completion conclusion, assessor signature, and receipt; the name, quantity, and dates of the same record in two materials must match | Search by course name and assessment subject, adjust `limit` to observe changes in the number of candidates, check whether scores and completion conclusions correspond to the filed class, and check whether signatures and receipts are complete |
| Intake records and follow-up items to be completed | Missing items are identified and followed up on, and answers have material support; before completion, the case does not enter the handling stage | For a question missing key information, first see whether it is followed up on, then see whether the follow-up items point to specific fields in the filing, attendance, or assessment forms, and check the tokens of the cited text and the number of candidates |

## Three common errors

- Phenomenon: the name and participant count of the same class do not match between the filing and attendance records. Cause: the two materials are maintained separately and are not cross-checked by filing number.
- Phenomenon: the assessment form date and completion conclusion are inconsistent with the filing start and end dates. Cause: versions are not synchronized, and the old completion form remains in the knowledge base.
- Phenomenon: attendance records lack a personal signature or receipt, and cannot be completed even after follow-up. Cause: signature and receipt fields were not validated when the materials were archived.

## How to verify the setup

Acceptance of this feature: test once each with synonym-rewritten questions, compare candidates and scores, then toggle rerank on and off to inspect the top few rankings; switch `searchMode` to compare candidate differences among semantic, full-text, and hybrid, adjust `limit` and `usingReRank` to observe changes in the number of candidates and scores, and record the tokens of the cited text separately, without comparing them for equality with the array length.

Business test: ask a question missing key information and see whether it follows up before answering; the follow-up should point to the specific missing fields in the filing, attendance, or assessment forms, and the answer must have material support.

- For the same class, search separately by filing number, trainee name, and course name, check whether the names, quantities, dates, and signatures in the candidate snippets are consistent, and record the number of candidates and scores.
- Inspect the top few rankings once before and once after enabling rerank, check whether key original snippets are still retained after similarity filtering and citation limit trimming, and record the tokens of the cited text separately.
