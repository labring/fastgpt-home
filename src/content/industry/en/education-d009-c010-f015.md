---
title: Knowledge Base Retrieval for School Timetables and After-School Scheduling: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c010-f015
page_type: 行业问题页
application_area: education
meta_title: School Timetables | Retrieval | Multilingual
meta_description: School Timetables: review retrieval for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for School Timetables and After-School Scheduling: Handle Multilingual Materials and Terminology

## What this category's data looks like

This page focuses on multilingual materials and terminology handling in the context of primary and secondary school timetables and after-school service scheduling. Material sources include the master timetable, teacher assignment tables, after-school service program tables, as well as bilingual notices, foreign-language textbook catalogs, and receipt forms. The update rhythm advances through three types: beginning of semester, monthly adjustments, and temporary schedule changes. Field characteristics center on course names, teacher names, class numbers, after-school service programs, dates, and signature fields. When entering the knowledge base retrieval and recall function, the master timetable serves as the baseline reference for courses and classes, the teacher assignment table serves for personnel and teaching hour attribution, the after-school service program table serves for program names and time slots, and bilingual materials serve for translated names and source-text back-references.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The unified terminology table and comparison draft are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Master timetable | Course names, class numbers, dates, and signature fields must be aligned item by item with the teacher assignment table | In the search test, query once each with the same course name and a synonymous rewrite, record the number of candidates and scores, and check whether semantic and full-text candidates both appear under `searchMode` |
| Teacher assignment table | Teacher names, number of teaching hours, and assigned classes must be consistent with the master timetable; missing signatures or receipts must be separately marked | Compare the order of the first few items before and after enabling rerank, check whether relevant snippets move forward after the `usingReRank` change, and record the number of candidates |
| After-school service program table | Program names, time slots, and class counts must be consistent with the master timetable and bilingual notices | Adjust `similarity` to observe the number of candidates after filtering, and check the tokens and array count of the cited text after `limit` trimming, recording them separately |
| Bilingual notices and receipt forms | The translated name of the same term must be able to back-reference the source text, and version numbers and receipt signatures must be synchronized | Sample three terms and check their usage throughout the document, verify whether candidate snippets cover both the source text and the translated name, and record the score range |

## Three common errors

- Phenomenon: The name or quantity of the same course does not match across two materials. Cause: The terminology table is not unified, retrieval candidates hit only one side of the materials, and cross-material alignment has not been done.
- Phenomenon: The dates in the after-school service program table and the master timetable are inconsistent. Cause: Versions are not synchronized, old materials still participate in recall in the knowledge base, and expired snippets are mixed into candidates.
- Phenomenon: The teacher assignment table lacks signatures or receipts. Cause: The material circulation process is not closed-loop; retrieval can only return candidate snippets and cannot replace signature confirmation.

## How to verify the setup

Acceptance of this function: Test once each with synonymous rewritten questions, compare candidates and scores, then toggle rerank on and off to observe the ordering of the first few items; record the number of candidates and scores, and check the effects of `similarity`, `limit`, `searchMode`, and `usingReRank`.

Business testing: Sample three terms and check whether their usage throughout the document is consistent, confirm that translated names can back-reference the source text, and check the names, quantities, dates, and signatures in the master timetable, teacher assignment table, and after-school service program table.

- In the knowledge base search test, switch `searchMode` and record the number of candidates and scores under semantic, full-text, and hybrid modes respectively.
- Enable and disable rerank, compare the order of the first few items, and check the impact of `usingReRank` on the position of relevant snippets.
