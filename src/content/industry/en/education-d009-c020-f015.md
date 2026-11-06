---
title: Knowledge Base Retrieval for Grade Entry and Credit Recognition: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c020-f015
page_type: 行业问题页
application_area: education
meta_title: Grades and Credits | Retrieval | Multilingual
meta_description: Grades and Credits: review retrieval for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Grade Entry and Credit Recognition: Handle Multilingual Materials and Terminology

## What this category's data looks like

This page addresses grade entry and credit recognition scenarios, involving three types of materials: transcripts, deferred examination applications, and make-up examination arrangements. Transcripts carry course name, credits, grade, and GPA fields; deferred examination applications record the reason for deferral, the original examination date, and signatures; make-up examination arrangements provide the make-up examination time, location, and receipt. When multilingual materials enter the knowledge base retrieval and recall stage, transcripts serve as terminology anchors providing course name and translated name correspondences, while deferred examination applications and make-up examination arrangements serve as materials to be verified, providing clues on dates, quantities, and signatures. Materials are updated by semester batch, and versions are synchronized with academic affairs notices. Field characteristics are mixed multilingual text, the same record recurring across materials, and inconsistent terminology translations.

## Configuration and implementation checks

This stage is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The unified terminology glossary and comparison draft are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Transcript | Course name, credits, grade, and GPA fields are complete; date and signature are verifiable | In the search test, switch `searchMode` to semantic, full-text, or hybrid, and check whether candidate snippets cover course names and translated names |
| Deferred examination application | The reason for deferral, original examination date, and signature are consistent across the three types of materials | Use `similarity` to filter low-scoring candidates, and see whether the name and date of the same record are hit at the same time |
| Make-up examination arrangement | The make-up examination time, location, quantity, and receipt match across the two materials | Compare the ranking of the top few results before and after enabling `usingReRank`, and confirm that date and quantity candidates are not misaligned |
| Terminology comparison draft | The same term is consistent throughout, and the translated name can refer back to the original text | Record the number of candidate entries and scores, and check whether the quoted text after `limit` trimming retains key snippets of the original text |

## Three common errors

- Phenomenon: The same course name is written differently in the transcript and the deferred examination application. Cause: Multilingual materials have not unified terminology, and versions are not synchronized.
- Phenomenon: The date and receipt quantity of the make-up examination arrangement do not match across the two materials. Cause: Candidate recall does not cover all channels, and signatures or receipts are missing.
- Phenomenon: In the terminology comparison draft, the translated name cannot refer back to the original text. Cause: After similarity filtering and quoted text limit trimming, key snippets are truncated.

## How to verify the setup

Acceptance of this feature: Test once each with synonym-rewritten questions, compare candidates and scores, then toggle rerank on and off to observe the ranking of the top few results.

Business test: Sample three terms and check whether their usage is consistent throughout.

- In the knowledge base search test, switch `searchMode` and compare the number of candidates and scores across semantic, full-text, and hybrid modes.
- Compare the ranking of the top few results before and after enabling `usingReRank`, and use `similarity` and `limit` to check the tokens and array length of the quoted text.
