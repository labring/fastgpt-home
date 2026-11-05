---
title: Knowledge Base Retrieval for Vocational College Curriculum Planning: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c029-f015
page_type: 行业问题页
application_area: education
meta_title: Vocational Curricula | Retrieval | Checks
meta_description: Vocational Curricula: review retrieval for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Vocational College Curriculum Planning: Compare Documents and Locate Differences

## What this category's data looks like

The formulation of talent cultivation programs in vocational colleges involves three core types of materials: talent cultivation programs, curriculum standards, and job competency analysis tables. Talent cultivation programs are compiled under the leadership of the academic affairs department, curriculum standards are provided by the teaching and research offices of each major, and job competency analysis tables mostly come from enterprise research and professional construction committees. The three types of materials are updated by academic year or professional construction cycle, and multiple versions commonly run in parallel. Field characteristics focus on course names, credit hours and credit counts, course start dates, signatures, and receipts. When entering the knowledge base retrieval function, the talent cultivation program serves as the primary retrieval object, while curriculum standards and job competency analysis tables serve as comparison sources, each participating in recall as independent fragments for subsequent comparison of whether names, quantities, and dates are consistent.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after pattern, merge, rerank, filter, and upper limit trimming). The discrepancy list is completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Talent cultivation program | Whether course names, credit hours and credit counts, course start dates, signatures, and receipts are consistent with the ledger | Switch `searchMode` in the search test, compare candidate fragments and scores, and record name, quantity, and date fields |
| Curriculum standards | Whether the same course names, quantities, and dates match those in the talent cultivation program | Compare the top few rankings before and after enabling `usingReRank`, and check the `similarity` score and number of candidates |
| Job competency analysis table | Whether job names, number of competency items, research dates, signatures, or receipts are complete | Adjust the number of references by `limit`, record the array length separately, and check the tokens budget of the reference text |
| Knowledge base retrieval service | Whether candidate fragments and similarity scores cover the key fields of the three types of materials | Test once each with synonym-rewritten questions to see whether candidates simultaneously include semantic and full-text results |

## Three common errors

- Phenomenon: The name, quantity, or date of the same course does not match between two materials. Cause: Candidate fragments come from different versions and have not been compared item by item by field.
- Phenomenon: The curriculum standard has been revised, but the talent cultivation program still references the old version. Cause: Versions are not synchronized, and the retrieved recall is from old fragments.
- Phenomenon: The job competency analysis table lacks signatures or receipts. Cause: Scanned document fields are missing, and candidate fragments do not include the signature column content.

## How to verify the setup

Acceptance of this function: Test once each with synonym-rewritten questions, compare candidate fragments and `similarity` scores, then toggle `usingReRank` on and off to observe changes in the top few rankings.

Business test: Use one real record to find fields inconsistent with the ledger, check names, quantities, and dates, and record the number of candidates and scores.

- Switch `searchMode` in the search test, and compare candidates and scores across the three modes: semantic, full-text, and hybrid.
- Adjust the number of references by `limit`, record the array length separately, and check the tokens budget of the reference text.
