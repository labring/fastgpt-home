---
title: Knowledge Base Retrieval for Undergraduate Curriculum Planning: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c018-f015
page_type: 行业问题页
application_area: education
meta_title: Program Revision | Retrieval | Intake
meta_description: Program Revision: review retrieval for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Undergraduate Curriculum Planning: Handle Questions and Collect Missing Information

## What this category's data looks like

Revision materials for undergraduate programs include three categories: program plans, course syllabi, and credit structure tables. They come from academic affairs system exports and departmental submissions, and are updated with each revision batch. The three categories play different roles when entering knowledge base retrieval: program plans provide the program direction and overall credit framework, course syllabi provide course names, class hours, and assessment methods, and credit structure tables provide the credit amounts and proportions of each module. Field characteristics are concentrated in course names, credit amounts, course start dates, and signature receipts. The same record may show mismatched names, amounts, or dates across two materials, versions may be out of sync, or signatures and receipts may be missing. The retrieval service splits these materials into candidate chunks for subsequent nodes or humans to use in generating acceptance records and follow-up questions to be completed.

## Configuration and implementation checks

This step is performed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after pattern, merge, re-rank, filter, and limit trimming). Acceptance records and follow-up questions to be completed are then handled by subsequent nodes or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| Program plan | Whether course names, credit amounts, course start dates, and signature receipts are consistent with the course syllabi | In the knowledge base search test, switch `searchMode` to semantic, full-text, or hybrid, and compare the number of candidates and scores |
| Course syllabus | Whether the names, class hours, and assessment methods of the same course match across the two materials | Compare the order of the top few results before and after enabling `usingReRank`, and check changes in the `similarity` score |
| Credit structure table | Whether the credit amounts and proportions of each module are consistent with the program plan, and whether versions are in sync | Check whether candidate chunks contain both semantic and full-text results, and record the number of array entries |
| Acceptance records and follow-up questions to be completed | Whether missing items are identified and followed up on, and whether answers are grounded in the materials | Use `limit` to observe the tokens of the quoted text after limit trimming, and record the number of array entries separately |

## Three common errors

- Symptom: The same course has mismatched names and credit amounts in the program plan and the course syllabus. Cause: The two materials' versions are out of sync, or the field definitions differ at data entry.
- Symptom: The credit structure table lacks a signature or receipt, so the revision batch cannot be confirmed. Cause: The submission step did not complete the signature page, and the receipt was not archived with the materials.
- Symptom: There are many candidates, but the ones ranked at the top are all irrelevant, and the answer lacks key paragraphs. Cause: The retrieval mode does not match the material form, or the similarity filter and limit trimming are too tight.

## How to verify the setup

Feature acceptance: test once each with synonym-rewritten questions, compare candidates and `similarity` scores, then toggle `usingReRank` on and off to see the ranking of the top few results.

Business test: ask a question that lacks key information, and see whether it follows up before answering.

- In the knowledge base search test, switch `searchMode` and confirm that candidates contain both semantic and full-text results, and record the number of array entries.
- Check the tokens of the quoted text and the number of array entries, and confirm that key original passages are still retained after the similarity filter and limit trimming.
