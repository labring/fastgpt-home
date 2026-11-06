---
title: Knowledge Base Retrieval for Training Provider Scheduling and Lesson Records: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c044-f015
page_type: 行业问题页
application_area: education
meta_title: Training Schedules | Retrieval | Multilingual
meta_description: Training Schedules: review retrieval for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Training Provider Scheduling and Lesson Records: Handle Multilingual Materials and Terminology

## What this category's data looks like

In the course scheduling and course consumption scenario for training institutions, materials come from three types of ledgers: class schedules, course consumption records, and schedule change requests, updated weekly and archived by semester. The class schedule carries the course name, class, classroom, time slot, and instructor, and is the baseline for scheduling and schedule changes; the course consumption record carries the student, number of class hours, consumption date, and signed receipt, and is the basis for class hour settlement; the schedule change request carries the original time slot, new time slot, approval signature, and receipt, and is the evidence for class schedule changes. When the three types of materials enter knowledge base retrieval, their roles differ: the class schedule and schedule change request are used to confirm whether the same course, class, and time slot are written consistently across locations, while the course consumption record is used to verify whether the quantity and date for the same student and same course can be traced back to the original text. Multilingual materials and terminology processing require unified translated names and consistent terminology throughout, and the retrieval step needs to select the recall method according to the material form so that candidate snippets cover the three types of information: fields, dates, and signatures.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after pattern, merge, rerank, filter, and upper-limit trimming). The unified terminology glossary and comparison draft are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Class schedule | Whether the course name, class, classroom, time slot, and instructor correspond field by field with the schedule change request and course consumption record, and whether dates and signatures are complete | In the knowledge base search test, switch `searchMode`, search once each with the same course name and class name, check whether the candidate snippets simultaneously provide the corresponding fields from the class schedule and schedule change request, and record the number of candidates and scores |
| Course consumption record | Whether the number of class hours and consumption date for the same student and same course are written consistently in the two materials, and whether signatures or receipts are missing | Search using a combination of student name and course name, verify whether the quantity and date in the candidate snippets can be traced back to the original text, separately record the number of items in the returned array, and check whether the tokens of the cited text fall within `limit` and the citation budget |
| Schedule change request | Whether the original time slot, new time slot, approval signature, and receipt are synchronized with the class schedule version, and whether the name and date of the same record match | For the same schedule change reason, search once each with synonymous expressions, compare the order of the top few candidates before and after enabling `usingReRank`, and confirm that after reranking the key signature and date snippets are still ranked at the front |
| Terminology glossary and comparison draft | Whether the same term is written consistently throughout, whether the translated name can be traced back to the original text, and whether fields and dates are synchronized with the version | Extract three terms, search for their occurrence locations in the class schedule, course consumption record, and schedule change request respectively, check whether the writing in the candidate snippets is consistent, and record the number of candidates and `similarity` scores for each search |

## Three common errors

- Phenomenon: The name, quantity, or date of the same course does not match in the two materials. Cause: The versions are not synchronized, and the old class schedule and new class schedule both enter the candidates; hits and associations must be checked first before judging.
- Phenomenon: The schedule change request lacks a signature or receipt, and the course consumption record lacks confirmation. Cause: The materials were not collected completely at archiving time, and retrieval can only return existing snippets and cannot supply missing signatures.
- Phenomenon: The same question cannot be recalled when rephrased, or there are many candidates but the ones ranked at the front are all irrelevant. Cause: The retrieval mode does not match the material form, reranking is not enabled, or similarity filtering is too strict.

## How to verify the setup

Acceptance of this function: test once each with synonymously rewritten questions, compare candidates and scores, then toggle reranking on and off to observe the ranking of the top few; at the same time check whether the values of `searchMode`, `similarity`, `usingReRank`, and `limit` match the material form.

Business test: select three terms and check whether their writing is consistent throughout, whether the translated names can be traced back to the original text, and whether the names, quantities, dates, and signatures in the class schedule, course consumption record, and schedule change request correspond field by field.

- In the knowledge base search test, run retrieval once each for the class schedule, course consumption record, and schedule change request, record the number of candidates and scores, and check whether the returned snippets cover the three types of information: fields, dates, and signatures.
- For the same schedule change reason, search again with synonymous expressions, compare the order of the top few before and after enabling reranking, confirm that key snippets have not been trimmed by similarity filtering, and separately record the number of items in the citation array and the tokens of the cited text.
