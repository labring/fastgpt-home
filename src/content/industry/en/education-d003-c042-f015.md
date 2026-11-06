---
title: Knowledge Base Retrieval for Corporate Sales and Product Training: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c042-f015
page_type: 行业问题页
application_area: education
meta_title: Sales Training | Retrieval | Intake
meta_description: Sales Training: review retrieval for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Corporate Sales and Product Training: Handle Questions and Collect Missing Information

## What this category's data looks like

The category materials for enterprise sales product training mainly come from three types: product manuals, sales sales language, and channel training schedules. Product manuals are updated by product line by version, with fields including product name, model, quantity, effective date, and preparer signature; sales sales language is revised quarterly by sales operations, with fields including sales language topic, applicable scenario, version number, and review receipt; channel training schedules are scheduled by training management by class session, with fields including course name, instructor, start date, and confirmation signature. When the three types of materials enter question acceptance and missing-item follow-up, product manuals serve as the basis for parameters and specifications, sales sales language serves as the basis for response wording, and channel training schedules serve as the basis for scheduling and trainee targets. When material update rhythms are not synchronized, the same record may show inconsistencies in name, quantity, and date between the manual and the sales language, and missing signatures or receipts in the schedule can also prevent acceptance records from being directly transferred to the handler.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after pattern, merge, rerank, filter, and upper-limit trimming). Acceptance records and completed follow-up questions are then handled by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Product manual | Whether fields, dates, and signatures align with sales sales language; whether the name, quantity, and date of the same record are consistent | In the knowledge base search test, switch `searchMode`, compare candidate chunks and `similarity` scores, and check the corresponding fields of the manual and sales language |
| Sales sales language | Whether the version is synchronized; whether the sales language topic and applicable scenario match the channel training schedule | Compare the ranking of the top few candidates before and after enabling `usingReRank`, and check whether the version number and review receipt are complete |
| Channel training schedule | Whether the start date, instructor signature, and trainee receipt are complete; whether the course name is consistent with the sales language topic | Search by course name, record the number of candidates and scores, and check whether the schedule date and signature receipt are missing |
| Acceptance records and completed follow-up questions | Whether missing items are identified and followed up; whether answers have material basis | Test once each with synonym-rewritten questions, compare candidates and scores, and confirm that a grounded answer is given only after follow-up |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match between the product manual and sales sales language. Cause: The two materials have different update rhythms, versions are not synchronized, and field consistency is not checked after retrieval hits.
- Phenomenon: The channel training schedule lacks signatures or receipts, and acceptance records cannot be directly transferred to the handler. Cause: The scheduling material has not completed the confirmation process, and missing items are not identified and followed up.
- Phenomenon: Answers lack key paragraphs, and although there are many candidates, the top-ranked ones are irrelevant. Cause: The retrieval mode does not match the material form, rerank is not enabled, or key chunks are trimmed after similarity filtering and upper-limit trimming.

## How to verify the setup

Acceptance for this feature: Test once each with synonym-rewritten questions, compare candidates and `similarity` scores, then toggle `usingReRank` to see the ranking of the top few; record the number of candidates and scores, record the number of citations separately by array length, and when an upper limit on citations is involved, check the tokens of the cited text.

Business test: Ask a question missing key information and see whether it follows up before answering; confirm that only after the follow-up is completed does it give a grounded answer and transfer to the handler.

- In the knowledge base search test, switch `searchMode`, record candidate chunks and `similarity` scores for the same question, and check whether the fields, dates, and signatures of the product manual, sales sales language, and channel training schedule are consistent.
- Compare the ranking of the top few candidates before and after enabling `usingReRank`, check whether the original key chunks are still retained after similarity filtering and upper-limit trimming, and confirm that missing items are followed up before answering.
