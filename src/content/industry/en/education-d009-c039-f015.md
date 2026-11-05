---
title: Knowledge Base Retrieval for Exam Organization and Misconduct Handling: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c039-f015
page_type: 行业问题页
application_area: education
meta_title: Exam Administration | Retrieval | Multilingual
meta_description: Exam Administration: review retrieval for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Exam Organization and Misconduct Handling: Handle Multilingual Materials and Terminology

## What this category's data looks like

Exam organization and violation handling involves three types of materials: exam administration manuals, examination room record sheets, and violation fact records. The exam administration manual specifies procedures and terminology, and is updated as regulations change; examination room record sheets are filled in per session and include time, number of people, and signatures; violation fact records are registered item by item and include date, quantity, and receipt. The fields of the three overlap, and the same record name, quantity, and date must be consistent. When multilingual materials enter retrieval, the manual serves as the terminology baseline, while record sheets and fact records serve as comparison sources; a unified terminology list and comparison draft are generated from these, and before external release it is necessary to check that the translated names can refer back to the original text.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The "unified terminology list and comparison draft" is completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Exam administration manual | Terminology definitions and process fields must be aligned item by item with record sheets and fact records | Switch `searchMode` in the search test and check whether candidates cover the manual's terminology entries |
| Examination room record sheet | Session date, number of people, and signature fields must be consistent with the manual's provisions and the fact records | Search with synonymous questions and compare the number of candidate entries and the `similarity` score |
| Violation fact record | Violation name, quantity, date, and receipt must correspond to the record sheet and manual | Compare the ranking of the top few entries before and after enabling `usingReRank`, and check whether key snippets are retained |
| Unified terminology list and comparison draft | The same term is written consistently throughout, and the translated name can refer back to the original text | Sample three terms and check their spelling throughout, and record the reference array length and the text tokens after `limit` trimming |

## Three common errors

- Symptom: The same violation record has mismatched name, quantity, and date in the examination room record sheet and the fact record. Cause: The two materials' versions are not synchronized, and the terminology list does not cover that entry.
- Symptom: The terminology in the exam administration manual is inconsistent with the wording in the record sheet, and the translated name in the comparison draft cannot refer back to the original text. Cause: Multilingual materials have not unified terminology, and retrieval candidates are mixed with old-version snippets.
- Symptom: The violation fact record lacks a signature or receipt, yet the external release draft is still adopted. Cause: The material status has not been checked; retrieval only returns candidate snippets and scores, and does not verify signature fields.

## How to verify the setup

Acceptance for this feature: test once each with synonymously rewritten questions, compare candidates and scores, then toggle rerank on and off to inspect the ranking of the top few entries.

Business test: sample three terms and check whether their spelling is consistent throughout.

- In the knowledge base search test, switch `searchMode`, test once each with synonymous questions, and record the number of candidate entries and the `similarity` score.
- Compare the ranking of the top few entries before and after enabling `usingReRank`, and check the reference array length and the text tokens after `limit` trimming.
