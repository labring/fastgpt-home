---
title: Knowledge Base Retrieval for Vocational School Student Internships: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c030-f015
page_type: 行业问题页
application_area: education
meta_title: Student Internships | Retrieval | Intake
meta_description: Student Internships: review retrieval for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Vocational School Student Internships: Handle Questions and Collect Missing Information

## What this category's data looks like

This page focuses on vocational school student internship management materials, sourced from school academic affairs and internship management archives: internship agreements, internship plans, and internship logs. Agreements record the enterprise, position, term, and signatures; plans record the batch, week number, supervising instructor, and dates; logs record the daily position, tasks, duration, and signature receipt. The three types of materials are updated by batch, and version numbers and receipt statuses change with supplementary signing, position changes, and extensions. When the materials enter the knowledge base retrieval service, agreements and plans serve as the field baseline and date baseline, while logs serve as the process record and signature receipt check; the names, quantities, and dates of the same record in the two materials must align, and when versions are not synchronized or signatures are missing, missing items must first be identified before follow-up questions are asked.

## Configuration and implementation checks

This step is performed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after pattern, merge, rerank, filter, and limit trimming). Intake records and follow-up questions for completion are then handled by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Internship agreement | Fields include enterprise, position, term, signature, and receipt; dates align with the plan batch | In the search test, check whether the enterprise, position, and start/end dates in the agreement chunk and the plan chunk are consistent; when signatures or receipts are missing, list them as missing items and ask follow-up questions |
| Internship plan | Fields include batch, week number, supervising instructor, and dates; week numbers and dates align with the logs | Switch `searchMode` to compare semantic, full-text, and hybrid candidates; check whether the week numbers, dates, and quantities in the plan and logs match |
| Internship log | Fields include daily position, tasks, duration, and signature; aligns with the agreement position name | Check whether the log chunk and the agreement position name and duration are consistent; when versions are not synchronized or dates do not match, list them as missing items and ask follow-up questions |
| Retrieval output | Candidate chunks and `similarity` scores undergo merge, rerank, filter, and limit trimming | Test once each with synonym-rewritten questions, and record the number of candidates and scores; toggle `usingReRank` to compare the ranking of the top few, and separately record the number of items in the citation array |

## Three common errors

- Phenomenon: The position name and quantity of the same internship record do not match between the agreement and the plan. Cause: The two materials are updated separately and are not aligned by the same batch field.
- Phenomenon: Log dates are misaligned with plan week numbers, and signatures or receipts are missing. Cause: Versions are not synchronized, supplementary signing is not written back, and retrieval still recalls old chunks.
- Phenomenon: The result contains many candidates, with irrelevant items near the top and key paragraphs missing from the answer. Cause: The retrieval mode does not match the material form, and rerank and similarity filtering are not calibrated.

## How to verify the setup

Acceptance for this feature: test once each with synonym-rewritten questions, compare candidates and `similarity` scores, then toggle `usingReRank` to see the ranking of the top few; record the number of candidates, the number of items in the citation array, and the tokens of cited text, and switch `limit` and `searchMode` according to the material form.

Business test: ask a question that lacks key information and see whether it asks follow-up questions before answering; after missing items are identified and follow-up questions are asked, the answer must have material evidence, and then be transferred to the handler.

- In the knowledge base search test, switch `searchMode` to compare semantic, full-text, and hybrid candidates, and check the number of candidates and scores.
- Toggle `usingReRank` to compare the ranking of the top few, and check the number of items in the citation array and the tokens of cited text.
