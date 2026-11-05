---
title: Knowledge Base Retrieval for School Exam Question Setting and Grading: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c011-f015
page_type: 行业问题页
application_area: education
meta_title: School Exams | Retrieval | Multilingual
meta_description: School Exams: review retrieval for multilingual work. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for School Exam Question Setting and Grading: Handle Multilingual Materials and Terminology

## What this category's data looks like

This page addresses the scenario of exam question setting and marking in primary and secondary schools. The materials include question-setting two-way specification tables, exam papers, scoring rubrics, as well as multilingual materials and terminology comparison drafts. When these materials enter the knowledge base retrieval and recall function, each plays a different role: the specification table provides exam points and question type structure, the exam paper provides the original text of question stems and options, the scoring rubric provides scoring points and wording, and the multilingual materials and terminology comparison drafts provide translated names and terminology wording. The material source is the finalized drafts submitted by the teaching and research group and the question-setting group. The update rhythm follows exam batches and version revisions. Field characteristics are concentrated in subject, grade, question type, score, date, signature, and receipt. The retrieval function is only responsible for recalling candidate fragments and similarity scores from these materials, and does not directly produce a unified terminology table and comparison draft.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after mode, merge, rerank, filter, and upper limit trimming). The unified terminology table and comparison draft are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Question-setting two-way specification table | Subject, grade, question type, score, date, and signature are complete, and correspond to the exam paper | In the search test, test once each with synonymous questions, and check whether the candidate fragments cover the specification table fields; switch `searchMode` to compare the number of candidate items and scores for semantic, full-text, and hybrid |
| Exam paper | The name, quantity, and date of the same record are consistent in the specification table and the exam paper | Search separately using the original terminology and the translated name, and check whether the returned candidates include both semantic and full-text results; enable `usingReRank` to compare the ranking of the top few items |
| Scoring rubric | The wording of scoring points is consistent with the exam paper question stems and specification table exam points, and the version is synchronized | Check the number and content completeness of returned citations, and record the number of candidate items and scores; check the tokens of the cited text, and record the number of array items separately |
| Multilingual materials and terminology comparison drafts | The same terminology is written consistently throughout, the translated name can refer back to the original text, and items lacking a signature or receipt do not enter the finalized draft | Search for terminology using synonymously rewritten questions, and check whether the candidate fragments retain key fragments of the original text; adjust `similarity` and `limit` to observe candidates after filtering and trimming |

## Three common errors

- Phenomenon: The translated name of the same terminology is written inconsistently in the specification table and the exam paper. Cause: The versions of the two materials are not synchronized, and the terminology comparison draft was not updated with the exam paper.
- Phenomenon: The quantity and date of the same record do not match between the scoring rubric and the exam paper. Cause: After finalization, one side was modified without writing back to the other material.
- Phenomenon: Materials still enter retrieval despite lacking a signature or receipt. Cause: The submission step did not verify the signature and receipt, and the version status was not marked.

## How to verify the setup

This function acceptance: test once each with synonymously rewritten questions, compare candidates and scores, then toggle rerank to see the ranking of the top few items; switch `searchMode`, adjust `similarity` and `limit`, and record the number of candidate items and scores.

Business test: sample three terminologies to check whether their writing is consistent throughout, check whether the translated names can refer back to the original text, and check whether the dates and signatures of the specification table, exam paper, and scoring rubric are complete.

- In the knowledge base search test, switch retrieval modes, compare the number of candidate items and scores, and confirm that both semantic and full-text results have been merged.
- Check the number and content completeness of returned citations, record the tokens of the cited text, and record the number of array items separately.
