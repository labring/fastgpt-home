---
title: Knowledge Base Retrieval for Undergraduate Curriculum Planning: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c018-f015
page_type: 行业问题页
application_area: education
meta_title: Program Revision | Retrieval | Review
meta_description: Program Revision: review retrieval for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Undergraduate Curriculum Planning: Trace Exceptions and Review Results

## What this category's data looks like

Undergraduate program revision involves three types of materials: program plans, course syllabi, and credit structure tables. Sources are academic affairs system exports and departmental submissions, with an update cadence by semester or revision round. The three types of materials must corroborate each other in fields, dates, and signatures: program plans contain course names, credits, and offering semesters; course syllabi contain course objectives, content, and assessment methods; credit structure tables contain the credit amounts and proportions of each module. When materials enter the knowledge base retrieval and recall function, each is split and indexed as an independent document. Program plans and syllabi are used to verify course names and credits, credit structure tables are used to verify amounts and dates, and signature and receipt pages are used to determine whether versions are synchronized.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after pattern, merge, re-rank, filter, and upper-limit trimming). The exception list and review conclusions are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Program plan | Course names, credits, offering semesters, and signature fields must be consistent with the course syllabus | In the retrieval node, use `searchMode` to switch between semantic, full-text, or hybrid, and check whether candidate chunks cover the course name and credit fields |
| Course syllabus | Course objectives, content, and assessment methods must match the corresponding course in the program plan | Enable `usingReRank` to compare the ordering of the top few results, and confirm that syllabus chunks correspond to program plan course records |
| Credit structure table | The credit amounts, dates, and signature receipts of each module must be consistent with the program plan summary | Check the number of candidate results and the `similarity` score, and verify whether the amount and date fields match |
| Exception record | The exception is supported by original records, and after the reviewer signs, it is handed to the person in charge for handling | Create an exception record, search with synonymous questions, and see whether the source material chunks can be traced |

## Three common errors

- Symptom: The name or credit amount of the same course does not match between the program plan and the course syllabus. Cause: The two material versions are not synchronized, or fields were not aligned during entry.
- Symptom: The date of the credit structure table is inconsistent with the revision date of the program plan. Cause: The materials have different update cadences, the old version was not replaced, and retrieval still recalls old chunks.
- Symptom: The review conclusion lacks a signature or receipt. Cause: The exception record is not linked to the original materials, and the manual review step leaves no trace.

## How to verify the setup

This function's acceptance: test once each with synonymously rewritten questions, compare the number of candidate results and the `similarity` score, then toggle `usingReRank` on and off to observe changes in the ordering of the top few results, and use `searchMode` to switch modes and check candidate coverage.

Business test: create an exception record, see whether the source material can be traced, and confirm that the exception is supported by original records and signed by the reviewer.

- In the knowledge base search test, switch `searchMode` and compare the candidate chunks and scores returned by the semantic, full-text, and hybrid modes.
- Enable and disable `usingReRank`, observe changes in the order of the top few candidates, and separately record the number of items in the citation array and the citation text tokens.
