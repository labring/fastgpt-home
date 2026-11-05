---
title: Knowledge Base Retrieval for Off-Campus Training Registration and Compliance: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c045-f015
page_type: 行业问题页
application_area: education
meta_title: Training Compliance | Retrieval | Review
meta_description: Training Compliance: review retrieval for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Off-Campus Training Registration and Compliance: Trace Exceptions and Review Results

## What this category's data looks like

This category's data looks like this: Off-campus training compliance filing and penalty response materials fall into three types: school operating licenses, course filing materials, and fee disclosure. A school operating license contains the institution name, address, validity period, issuance date, and official seal and signature; course filing materials contain the course name, number of class hours, textbook version, filing date, and handler signature; fee disclosure contains fee items, amount unit, disclosure date, and receipt. The three types of materials each enter the knowledge base retrieval service as the original source of candidate chunks, for subsequent nodes and manual comparison. In terms of update cadence, license renewal, course adjustments, and fee disclosure changes all form new versions; if old versions are not synchronized into the retrieval scope, the name, quantity, and date of the same record in two materials may fail to match. In terms of field characteristics, name, quantity, date, signature, and receipt are the key anchors for exception tracing; the candidate chunks and similarity scores returned by retrieval are the starting point for manual review and responsible-person handling.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The "exception list and review conclusion" is completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| School operating license | Whether the institution name, address, validity period, issuance date, and signature are consistent with the course filing materials and fee disclosure | In the search test, test once each with synonymous questions, switch `searchMode` to compare the number of candidates and scores, and check whether the name and date fields match |
| Course filing materials | Whether the course name, number of class hours, textbook version, filing date, and handler signature are consistent with the license and fee disclosure | Turn `usingReRank` on and off to compare the ranking of the top few items, and check whether the number of class hours and filing date are consistent across materials |
| Fee disclosure | Whether the fee items, amount unit, disclosure date, and receipt are consistent with the license and course filing materials | Adjust `similarity` to observe the candidate filtering effect, separately record the number of cited items and cited text tokens, and check whether the receipt and signature are missing |
| Exception record | Whether the exception is supported by original records and whether the reviewer has signed | Trace from the candidate chunks back to the source materials, confirm that the name, quantity, date, and signature receipt can correspond, then hand it over to the responsible person for handling |

## Three common errors

- Symptom: The name, number of class hours, or filing date of the same course fails to match between two materials. Cause: The old version was not synchronized into the retrieval scope, and the candidate chunks come from materials of different versions.
- Symptom: The fee disclosure is missing a receipt or handler signature. Cause: The disclosure materials were uploaded incompletely, and signature and receipt chunks cannot be found among the retrieval candidates.
- Symptom: There are many candidates, but the ones ranked at the front are all irrelevant, and the answer lacks key paragraphs. Cause: The retrieval mode does not match the material form, rerank is not enabled, or similarity filtering is too broad.

## How to verify the setup

This feature's acceptance: test once each with synonymously rewritten questions, compare the number of candidates and scores, then turn rerank on and off to observe the ranking of the top few items; switch `searchMode`, adjust `similarity`, turn `usingReRank` on and off, and separately record the number of cited items and cited text tokens.

Business test: create an exception record, see whether it can be traced back to the source materials, and confirm that the name, quantity, date, and signature receipt can correspond.

- In the search test, switch `searchMode` to compare the number of candidates and scores returned by the semantic, full-text, and hybrid modes, and confirm that it matches the material form.
- Turn `usingReRank` on and off to compare the order of the top few candidates; adjust `similarity` to observe the filtering effect, and separately record the number of cited items and cited text tokens.
