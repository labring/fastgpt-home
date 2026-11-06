---
title: Knowledge Base Retrieval for Undergraduate Curriculum Planning: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c018-f015
page_type: 行业问题页
application_area: education
meta_title: Program Revision | Retrieval | Multilingual
meta_description: Program Revision: review retrieval for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Undergraduate Curriculum Planning: Handle Multilingual Materials and Terminology

## What this category's data looks like

Undergraduate program revision materials include program plans, course syllabi, and credit structure tables. The sources are revision drafts and comparison drafts submitted by each department, and the update cadence advances with revision batches. Fields include course name, credit count, semester offered, revision date, and signature field. After program plans enter the knowledge base, they serve as the main records; course syllabi provide course objectives and content support; credit structure tables handle quantity and structure verification. In the multilingual materials and terminology handling scenario, the same term must be consistent throughout and its translated name must be able to refer back to the original text. When materials enter the knowledge base retrieval service, each participates in recall in the form of fragments, for subsequent nodes or humans to generate a unified terminology table and comparison draft.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after mode, merge, rerank, filter, and limit trimming). The "unified terminology table and comparison draft" is then completed by subsequent nodes or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| Program plan | Course name, credit count, revision date, and signature field must correspond item by item with the course syllabi and credit structure table | In the knowledge base search test, switch `searchMode`, query once each using different written forms of the same term, and record the number of candidates and scores |
| Course syllabus | Term translations in course objectives and content statements must be able to refer back to the original text in the program plan | Compare the order of the top few results before and after enabling rerank, and check whether candidates include both semantic and full-text results |
| Credit structure table | Credit count, number of courses, and dates are consistent across the two materials, versions are synchronized, and no signature or receipt is missing | Adjust `similarity` and `limit`, observe the number of returned citation entries and content completeness, and separately record the array length |
| Terminology comparison draft | The same term is written consistently throughout, and the translated name can refer back to the original text | Sample three terms to check whether their written forms are consistent throughout, and check whether candidate fragments cover the key paragraphs |

## Three common errors

- Phenomenon: the same course name is written differently in the program plan and the course syllabus. Cause: terminology has not been unified, and multilingual materials and terminology handling were not aligned first.
- Phenomenon: the credit count does not match between the credit structure table and the program plan. Cause: versions are not synchronized, and fragments from the old draft are still being recalled.
- Phenomenon: the revision date or signature field is inconsistent across the two materials. Cause: signature or receipt is missing, and the materials enter retrieval before the loop is closed.

## How to verify the setup

Feature acceptance: test once each with synonym-rewritten questions, compare candidates and scores, then toggle rerank on and off to inspect the ordering of the top few results.

Business test: sample three terms to check whether their written forms are consistent throughout.

- In the knowledge base search test, switch `searchMode` and compare the number of candidates and scores across the three modes: semantic, full-text, and hybrid.
- Adjust `similarity` and `limit`, record the number of entries in the citation array, and separately check the ordering changes of the top few results before and after enabling `usingReRank`.
