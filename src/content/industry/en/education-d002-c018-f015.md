---
title: Knowledge Base Retrieval for Undergraduate Curriculum Planning: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c018-f015
page_type: 行业问题页
application_area: education
meta_title: Program Revision | Retrieval | Checks
meta_description: Program Revision: review retrieval for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Undergraduate Curriculum Planning: Compare Documents and Locate Differences

## What this category's data looks like

This page addresses material verification and discrepancy localization in undergraduate program revision. The materials come from three types of formal texts: program plans, course syllabi, and credit structure tables. The update cadence follows program revision batches and course adjustment notices, and the field characteristics center on course names, credit amounts, course start dates, and signature receipts. Program plans provide the course system and total credit framework, course syllabi provide the objectives, content, and assessment methods of each course, and credit structure tables provide credit distribution and statistical criteria. When these three types of materials enter the knowledge base retrieval service, each is split and indexed as an independent document. During retrieval, candidate fragments and similarity scores are recalled according to the input question, for subsequent nodes or manual comparison of whether the name, quantity, and date of the same object are consistent across two materials, and to locate fields with unsynchronized versions, missing signatures, or missing receipts.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after pattern, merge, rerank, filter, and upper-limit trimming). The discrepancy list is then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Program plan | Whether the course name, credit amount, course start date, and signature receipt are consistent with the course syllabus and credit structure table | In the search test, construct questions by course name and date, switch `searchMode` to compare candidate fragments and scores, and record the field values of the same course in the three types of materials |
| Course syllabus | Whether the course name, credit amount, course start date, and signature receipt are consistent with the program plan and credit structure table | Retrieve once each with synonymous questions, check whether the candidates cover the objectives, content, and assessment fields in the syllabus, and verify the names and quantities of the corresponding entries in the program plan |
| Credit structure table | Whether the credit amount, statistical criteria, and date are consistent with the program plan and course syllabus | Retrieve fragments related to credit distribution, observe the number and scores of candidates retained after `similarity` filtering, separately record the reference array length, and then check whether the tokens of the reference text cover the key numbers |
| Retrieval parameter combination | Whether candidate fragments and similarity scores change reasonably with `searchMode`, `usingReRank`, and `limit` | Retrieve once each with rerank enabled and disabled, compare the order of the first few candidates; adjust `limit` to see the number of returned references and content completeness, and do not compare the number of items as equal to the reference budget |

## Three common errors

- Symptom: The name or credit amount of the same course does not match between the program plan and the course syllabus. Cause: The two materials are from different revision batches, the corresponding fragments were not recalled at the same time during retrieval, and the discrepancy was not exposed at the candidate layer.
- Symptom: The date in the course syllabus is inconsistent with the date in the credit structure table. Cause: The versions are not synchronized, the old document is still participating in recall in the knowledge base, and the candidate scores are close, leading to manual mis-selection.
- Symptom: The program plan entry lacks signature or receipt fields. Cause: The scanned copy or data entry is incomplete, retrieval returns only the body fragment, and the signature and receipt information is not recalled.

## How to verify the setup

Feature acceptance: test once each with synonymously rewritten questions, compare candidate fragments and similarity scores, then toggle rerank on and off to see the ordering of the first few items; at the same time record the reference array length and reference text tokens, and check the impact of `similarity`, `limit`, `searchMode`, and `usingReRank` on the number of candidates and scores.

Business test: use one real record to find fields inconsistent with the ledger, compare item by item the name, quantity, and date of the same course in the three materials—program plan, course syllabus, and credit structure table—mark the discrepancies, and hand them to the reviewer for confirmation and write-back.

- In the knowledge base search test, switch `searchMode` to semantic, full-text, and hybrid, record the number of candidates and scores respectively, and confirm the recall coverage of the same course in the three types of materials.
- Retrieve once each with `usingReRank` enabled and disabled, compare the order of the first few candidates; adjust `limit` to observe the reference array length, and separately check whether the reference text tokens retain the key numbers.
