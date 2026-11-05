---
title: Knowledge Base Retrieval for Enrollment Changes and Graduation Eligibility: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c021-f015
page_type: 行业问题页
application_area: education
meta_title: Graduation Eligibility | Retrieval | Multilingual
meta_description: Graduation Eligibility: review retrieval for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Enrollment Changes and Graduation Eligibility: Handle Multilingual Materials and Terminology

## What this category's data looks like

This page focuses on multilingual materials and terminology handling for student status changes and graduation eligibility review. The materials come from three types of forms—leave-of-absence/return-to-study applications, major transfer applications, and graduation review checklists—along with their supporting receipts. Leave-of-absence/return-to-study applications provide fields for the reason for the status change, start and end dates, and approval signature; major transfer applications provide fields for the names of the transferring-in and transferring-out majors, course mapping, and effective semester; graduation review checklists provide fields for credits, required components, and graduation conclusion. The three types of materials are updated by semester batch, and signatures and receipts are completed after the process ends. When the materials enter knowledge base retrieval, each serves as a source of candidate chunks for subsequent nodes or manual comparison of terminology wording and field values, forming a unified terminology table and comparison draft.

## Configuration and implementation checks

This step is performed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The unified terminology table and comparison draft are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Leave-of-absence/return-to-study application | The reason, start and end dates, and approval signature are written consistently across the three types of materials | Search this material with synonymous questions, and check whether the date and signature fields in the candidate chunks match the corresponding records in the major transfer application and graduation review checklist |
| Major transfer application | The names of the transferring-in and transferring-out majors and the effective semester can be traced back to the original text | Switch `searchMode` to semantic, full-text, or hybrid, and compare the correspondence between the major translated names in the candidate chunks and the original names |
| Graduation review checklist | The terminology for credits, required components, and graduation conclusion is consistent throughout | Turn `usingReRank` on and off, compare the order of the top few candidates, and record the number of candidates and the `similarity` score |
| Unified terminology table and comparison draft | The same term is consistent throughout and the translated name can be traced back to the original text | Adjust `limit` and the citation limit, record the citation text tokens and the number of array entries separately, and sample three terms to check their wording throughout |

## Three common errors

- Symptom: The dates for the same record do not match between the leave-of-absence/return-to-study application and the graduation review checklist. Cause: The two materials are updated on different schedules, and the versions are not synchronized.
- Symptom: The major name in the major transfer application is written inconsistently in the two materials. Cause: The terminology table is not unified, and the translated name is not traced back to the original text.
- Symptom: The graduation review checklist lacks a signature or receipt. Cause: It was not completed after the process ended, and fields are missing when the material enters retrieval.

## How to verify the setup

Acceptance for this feature: test once each with synonymously rewritten questions, compare candidates and scores, then turn reranking on and off to observe the order of the top few; record the number of candidates and `similarity`, switch `searchMode` and `usingReRank`, and adjust `limit` to observe changes in candidates.

Business test: sample three terms to check whether their wording is consistent throughout, verify whether the translated names can be traced back to the original text, and confirm that the date, quantity, and signature fields correspond across the three types of materials.

- In the knowledge base search test, switch `searchMode` and compare the candidate chunks and scores of the semantic, full-text, and hybrid modes.
- Turn `usingReRank` on and off, compare the order of the top few candidates, and check the citation text tokens after similarity filtering and citation limit trimming.
