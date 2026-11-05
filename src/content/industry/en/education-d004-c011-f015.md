---
title: Knowledge Base Retrieval for School Exam Question Setting and Grading: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c011-f015
page_type: 行业问题页
application_area: education
meta_title: School Exams | Retrieval | Handover
meta_description: School Exams: review retrieval for material handover. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for School Exam Question Setting and Grading: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

In the scenario of exam question setting and marking in primary and secondary schools, the materials that enter the knowledge base retrieval step mainly include the question-setting two-way specification table, the exam paper, and the marking rubric. The question-setting two-way specification table carries the assessed content, question types, score values, difficulty, and corresponding question numbers, and is the basis for question setting; the exam paper carries the question text, score annotations, and paper structure; the marking rubric carries scoring points, marking standards, and marking instructions. All three types of materials contain version numbers, compilation dates, responsible person signatures, and handover receipt fields. Their update rhythm advances with exam batches and review rounds, and it is common for the same record to have inconsistent question numbers, score values, or dates between the specification table and the exam paper, or for the marking rubric version to be out of sync, missing signatures, or missing receipts. When the materials enter the retrieval function, each serves as a source of candidate snippets for subsequent nodes or manual drafting of signable material drafts and handover records to compare and cite.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The signable material drafts and handover records are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Question-setting two-way specification table | Fields are complete, the responsible person is clear, and the version and date are consistent; the question numbers, score values, and dates match those in the exam paper | In the search test, switch `searchMode` and check whether the candidate snippets cover the specification table's assessed content, score values, question numbers, and signature column; record the number of candidates and the `similarity` score |
| Exam paper | Fields are complete, the responsible person is clear, and the version and date are consistent; the question numbers, score values, and scoring points match those in the marking rubric | Test once each with synonym-rewritten questions and compare candidates and scores; after enabling `usingReRank`, see whether the top few rankings are closer to the exam paper's structural fields |
| Marking rubric | Fields are complete, the responsible person is clear, and the version and date are consistent; the question numbers, score values, and scoring points match those in the exam paper | Check whether the returned citations retain the key original snippets of scoring points, scoring explanations, and signature receipts; after adjusting `limit`, check the tokens of the cited text, and record the number of array items separately |

## Three common errors

- Phenomenon: the name, quantity, or date of the same question number does not match between the specification table and the exam paper. Cause: when drafting materials, fields were not filled back according to a unified field template; retrieval candidates serve only as snippet references and require manual checking of hits and associations.
- Phenomenon: the marking rubric version is out of sync, and the handover record still cites the old version's scoring points. Cause: the version number and date fields were not updated with the review rounds, and the candidate snippets returned by retrieval do not cover the latest version.
- Phenomenon: the handover record lacks a signature or receipt, and the next step cannot sign for acceptance. Cause: the material drafting and responsibility handover fields are incomplete; the retrieval service only outputs candidates and scores and does not generate authorization results.

## How to verify the setup

Feature acceptance: test once each with synonym-rewritten questions, compare candidates and `similarity` scores, then toggle `usingReRank` on and off to see the top few rankings; switch `searchMode` and adjust `limit`, record the number of candidates and scores, check the tokens of the cited text, and record the number of array items separately.

Business test: draft one copy according to the template and complete one handover, and see whether missing items are blocked.

- In the knowledge base search test, switch `searchMode`, compare candidate results, check the number of candidates and the `similarity` score, and confirm that the returned candidates include both semantic and full-text results.
- Compare the order of the top few items before and after enabling `usingReRank`, check the tokens of the cited text after similarity filtering and citation limit trimming, record the number of array items separately, and confirm that the key original snippets are retained.
