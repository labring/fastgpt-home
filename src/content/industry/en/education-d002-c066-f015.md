---
title: Knowledge Base Retrieval for Initial Review of Academic Journal Submissions: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c066-f015
page_type: 行业问题页
application_area: education
meta_title: Journal Submissions | Retrieval | Checks
meta_description: Journal Submissions: review retrieval for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Initial Review of Academic Journal Submissions: Compare Documents and Locate Differences

## What this category's data looks like

This page addresses the preliminary review stage of academic journal submissions. The materials include three types: submitted manuscripts, author information forms, and plagiarism check reports. Manuscripts carry the main text and references, author information forms carry names, affiliations, authorship order, and contact information, and plagiarism check reports carry detection time, similarity rate range, and the testing agency's receipt. The three types of materials usually enter synchronously by submission batch, revised manuscripts and original manuscripts coexist, versions change frequently, and signature and receipt fields are prone to being missing. After entering the knowledge base retrieval service, the three types of materials are each split and indexed as independent documents. Manuscript fragments serve as the main body of semantic recall, while author information form and plagiarism check report fragments supplement structured field clues for subsequent comparison and discrepancy localization.

## Configuration and implementation checks

This step is performed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after mode, merge, rerank, filter, and limit trimming). The discrepancy list is completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Submitted manuscript | The manuscript name, manuscript number, receipt date, and authorship order are consistent in both materials, and the signature field and receipt are complete | In the search test, switch `searchMode` to semantic, full-text, or hybrid, recall manuscript fragments separately, and verify the name, count, and date fields |
| Author information form | Author names, affiliations, authorship order, and contact information are consistent with the manuscript main text, and the version number is synchronized | Test once each with synonymous questions for the same record, compare the number of candidates and scores, and check whether author information form fragments are hit |
| Plagiarism check report | The detection date, similarity rate range, and testing agency receipt correspond to the manuscript version, with no missing signature or receipt | Enable and disable rerank, compare the order of the top few candidates, and verify the `similarity` score and number of candidates |
| Knowledge base retrieval service | Candidate fragments and similarity scores are returned after mode, merge, rerank, filter, and limit trimming | In the search test, adjust `limit` and `usingReRank`, and record the tokens and array length of the cited text |

## Three common errors

- Symptom: The name, count, or date of the same record does not match between the manuscript and the author information form. Cause: The fields in the two places were not updated synchronously, or the revised manuscript did not overwrite the original manuscript.
- Symptom: The detection date of the plagiarism check report is not synchronized with the manuscript version. Cause: The report receipt is missing or the version number was not written back, causing the comparison baseline to be misaligned.
- Symptom: The author information form lacks a signature or receipt. Cause: The material circulation step was not completed, and although retrieval candidates are hit, the fields are incomplete.

## How to verify the setup

This feature acceptance: test once each with synonymously rewritten questions, compare candidates and scores, then toggle rerank on and off to observe the ordering of the top few; record the actual values of `searchMode`, `similarity`, `usingReRank`, and `limit`.

Business test: use one real record to find fields inconsistent with the ledger, submit the discrepancy list to the reviewer for confirmation, and write it back.

- In the search test, switch `searchMode` and compare the differences in the number of candidates and scores returned by the semantic, full-text, and hybrid modes.
- Enable and disable rerank, observe changes in the order of the top few candidates, and record the tokens and array length of the cited text.
