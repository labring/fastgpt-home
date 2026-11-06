---
title: Knowledge Base Retrieval for Student Awards, Financial Aid and Hardship Assessment: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c022-f015
page_type: 行业问题页
application_area: education
meta_title: Student Financial Aid | Retrieval | Intake
meta_description: Student Financial Aid: review retrieval for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Student Awards, Financial Aid and Hardship Assessment: Handle Questions and Collect Missing Information

## What this category's data looks like

This page focuses on Q&A intake and missing-item follow-up in the scenario of student awards, grants, loans, and hardship determination. The materials include three types: family economic hardship determination forms, award and grant application forms, and loan receipts. The determination form records family population, income, and hardship level; the application form carries the award category, application reason, and signature field; the receipt reflects loan confirmation and disbursement information. The materials come from financial aid system exports, student submissions, and bank returns, and the update cadence changes with semester determination, review batches, and disbursement cycles. Field characteristics center on name, student ID, amount, date, and signature, and the same record must be aligned item by item across different materials. When the materials enter this function, the determination form and application form serve as candidate fragment sources for knowledge base retrieval, and the receipt serves as the verification basis for missing-item follow-up; together, the three support the generation of intake records and follow-up questions.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after mode, merge, rerank, filter, and limit trimming). The intake records and follow-up questions are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Family economic hardship determination form | Fields include family population, income, hardship level, date, and signature, and must align with the name, quantity, and date of the same record in the application form | In the knowledge base search test, switch `searchMode`, compare semantic and full-text candidates, and check whether the determination form fields are fully hit |
| Award and grant application form | Fields include award category, application reason, amount, and signature field, and must be consistent item by item with the same record in the determination form and receipt | Compare the order of the first few items before and after enabling rerank, check whether the application form candidates contain key passages, and record the number of candidates and scores |
| Loan receipt | Fields include loan amount, disbursement date, receipt number, and signature/seal, and must match the amount and date in the application form | Check whether the receipt candidates are recalled, and check whether missing signature or receipt items enter the follow-up question list |
| Retrieval node and search test | Candidates come from different recall channels and have been merged, are reordered after rerank, and are filtered by `similarity` and trimmed by `limit` | In the search test, adjust `usingReRank` and `limit`, observe changes in the number of candidates and scores, and check the tokens of the cited text |

## Three common errors

- Phenomenon: the name, amount, or date of the same student does not match between the determination form and the application form. Cause: the two material versions are not synchronized, and the retrieved hit fragments come from an old version.
- Phenomenon: the loan receipt is missing or the signature field is blank, but the answer directly gives a conclusion. Cause: the missing item is not identified as a follow-up question item, and the retrieval candidates are treated as complete evidence.
- Phenomenon: the answer lacks key passages, and although there are many candidates, the ones ranked first are all irrelevant. Cause: after similarity filtering and citation limit trimming, the key passages of the original text are not retained.

## How to verify the setup

This function's acceptance: test once each with synonym-rewritten questions, compare candidates and scores, then toggle rerank on and off to observe the order of the first few items, record the number of candidates and scores, and check the three identifiers `searchMode`, `similarity`, and `usingReRank`.

Business test: ask a question missing key information and see whether it asks a follow-up question before answering.

- In the knowledge base search test, switch `searchMode`, compare the number of candidates and scores for semantic, full-text, and hybrid modes, and confirm that the material form matches.
- Compare the order of the first few items before and after enabling rerank, check the tokens of the cited text after `similarity` filtering and `limit` trimming, and record the array length separately.
