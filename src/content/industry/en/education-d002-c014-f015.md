---
title: Knowledge Base Retrieval for School Moral Education and Class Teacher Work: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c014-f015
page_type: 行业问题页
application_area: education
meta_title: Pastoral Education | Retrieval | Checks
meta_description: Pastoral Education: review retrieval for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for School Moral Education and Class Teacher Work: Compare Documents and Locate Differences

## What this category's data looks like

School moral education and homeroom teacher work involves three types of materials: themed class meeting plans, student comprehensive quality records, and home visit records. Themed class meeting plans come from grade groups and homeroom teachers, are updated by semester and activity node, and contain activity theme, time, location, host, and signature field; student comprehensive quality records come from homeroom teachers and subject teachers, are updated monthly or by semester, and contain entries such as ideological and moral character, academic level, physical and mental health, artistic literacy, and social practice, along with dates and confirmation signatures; home visit records come from homeroom teachers, are updated by home visit sequence, and contain student name, home visit date, participants, and receipt. When the three types of materials enter the knowledge base retrieval and recall function, they respectively serve as candidate fragment sources, used to compare whether the name, quantity, and date of the same object are consistent across two materials, and to locate discrepancies such as missing signatures or receipts and unsynchronized versions, providing candidates and similarity scores for the discrepancy list.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after mode, merge, re-rank, filter, and upper-limit trimming). The "discrepancy list" is completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Themed class meeting plan | Whether the name, date, and signature of the same activity are consistent across the two materials | In the search test, switch `searchMode` to semantic, full-text, and hybrid and run each once, record the number of candidates and scores, and check the plan name, date, and signature field |
| Student comprehensive quality record | Whether the entry names, quantity, and dates of the same student record match across the two materials | Compare the order of the top few candidates after enabling and disabling `usingReRank`, and check the entry names, quantity, dates, and confirmation signature |
| Home visit record | Whether the date, participants, and receipt of the same home visit are consistent across the two materials | Use `similarity` to filter low-scoring candidates, and check whether the home visit date, participants, receipt, and version are synchronized |
| Discrepancy list | Whether the candidate fragments and similarity scores cover the fields to be verified | Record the number of cited items by `limit`, separately check the cited text tokens, and do not compare the number of items with the budget as equal |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match across the two materials. Cause: The two materials are entered separately and no field-level comparison is performed; although recall candidates are hit, they are not checked field by field.
- Symptom: Unsynchronized versions cause old-version plans or old-version records to be recalled. Cause: Multiple versions of fragments exist in the knowledge base, retrieval is not filtered by version, and candidates are returned mixed.
- Symptom: Class meeting plans and home visit records missing signatures or receipts are treated as complete materials. Cause: The signature field and receipt field are not included in the verification dimensions, and candidate fragments do not cover that field.

## How to verify the setup

This function's acceptance: test once each with synonym-rewritten questions, compare candidates and scores, then toggle re-rank to see the ordering of the top few; switch `searchMode` and `usingReRank`, record the number of candidates and scores, and check the cited text tokens under `similarity` and `limit`.

Business test: use one real record to find fields inconsistent with the ledger, compare candidate fragments with the ledger field by field, mark discrepancies in name, quantity, date, signature, or receipt, and hand them to the reviewer for confirmation and write-back.

- In the knowledge base search test, retrieve once each for the same record using synonym questions, record the number of candidates and scores, and switch `searchMode` and `usingReRank` to compare the ordering of the top few.
- Filter low-scoring candidates by `similarity`, record the number of cited items by `limit`, separately check the cited text tokens, compare candidate fragments with the ledger field by field, and hand them to the reviewer for confirmation and write-back.
