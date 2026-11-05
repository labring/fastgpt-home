---
title: Knowledge Base Retrieval for College Admissions and Application Placement: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c052-f015
page_type: 行业问题页
application_area: education
meta_title: College Admissions | Retrieval | Intake
meta_description: College Admissions: review retrieval for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for College Admissions and Application Placement: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the scenario of regular higher education institution admissions enrollment filing. Materials come from three categories: enrollment plans, filing rules, and admission rosters. Enrollment plans include institution-major groups, planned numbers, batches, and dates; filing rules include filing ratios, preference order, and signature fields; admission rosters include candidate names, scores, admitted majors, and receipts. The three categories of materials are updated on a batch cycle, and field names, quantities, and dates need to be aligned item by item across different materials. After entering this function, enrollment plans and filing rules are recalled as rule bases, and admission rosters are recalled as record bases, each providing candidate snippets for subsequent nodes or manual generation of acceptance records and supplementary question items.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after pattern, merge, rerank, filter, and limit truncation). "Acceptance records and supplementary question items" are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Enrollment plans | Whether fields, dates, and signatures are consistent with filing rules | Switch `searchMode` in the search test, and verify the planned numbers and dates in the candidate snippets |
| Filing rules | Whether the filing ratio, preference order, and signature fields are complete | Compare the top few rankings before and after enabling `usingReRank`, and verify whether the rule snippets are ranked near the top |
| Admission rosters | Whether candidate names, scores, admitted majors, and receipts match | Record the number of candidate items and the `similarity` score, and verify whether the roster snippets have the same names and numbers as the plans |
| Acceptance records and supplementary question items | Whether missing items are identified and followed up on, and whether answers are based on materials | Test with a question that lacks key information to see whether it first asks a follow-up question before answering |

## Three common errors

- Phenomenon: The same candidate's name, quantity, or date does not match across two materials. Cause: The versions of the enrollment plan and admission roster are not synchronized, and the field definitions differ.
- Phenomenon: The filing rules lack signatures or receipts, and the acceptance record cannot confirm the basis. Cause: The signature page was not returned during the material circulation process, and the versions are not synchronized.
- Phenomenon: There are many candidates, but the ones ranked at the top are all irrelevant, and the answer lacks key paragraphs. Cause: The retrieval mode does not match the material form, and reranking and filtering were not performed.

## How to verify the setup

This function's acceptance: test once each with synonym-rewritten questions, compare candidates and `similarity` scores, then toggle reranking on and off to observe the top few rankings; record the number of candidate items and scores. `limit` only checks the tokens of the referenced text; the number of array items is recorded separately.

Business test: ask a question that lacks key information to see whether it first asks a follow-up question before answering, and verify whether the answer is based on materials.

- In the knowledge base search test, switch `searchMode` to compare the candidate results of the semantic, full-text, and hybrid modes.
- Enable and disable `usingReRank`, compare the top few rankings, and record the `similarity` scores and the number of candidate items.
