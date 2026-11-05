---
title: Knowledge Base Retrieval for School Teacher Training Credits: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c013-f015
page_type: 行业问题页
application_area: education
meta_title: Teacher Credits | Retrieval | Review
meta_description: Teacher Credits: review retrieval for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for School Teacher Training Credits: Trace Exceptions and Review Results

## What this category's data looks like

This page focuses on credit management for primary and secondary school teacher training. Source materials include training notices, credit recognition forms, and participant lists. The update cadence advances with training batches and recognition cycles, and the field characteristics center on teacher names, training program names, credit hour counts, recognition dates, signatures, and receipts. Training notices provide the program name, training time, and the scope of participants, and are the starting material for exception tracing; credit recognition forms carry the credit hour counts, recognition conclusions, and responsible person's signature, and are the direct basis for review conclusions; participant lists record the actual participants and sign-in information, and are used to check whether the names, quantities, and dates of the same record are consistent across different materials. When these three types of materials enter the knowledge base retrieval and recall function, each serves as a source of candidate chunks, archived by training batch and version, for subsequent nodes or manual review to trace back to the source materials and form an exception list and review conclusions.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after mode, merge, rerank, filter, and limit trimming). The "exception list and review conclusions" are then completed by subsequent nodes or manual review.

| Object | Check | Verification action |
| --- | --- | --- |
| Training notice | Check whether the program name, training time, scope of participants, and document issuance date are consistent with the recognition form | In the search test, switch `searchMode`, search with the training program name, view the candidate chunks and similarity scores, and confirm the name, date, and signature field in the notice |
| Credit recognition form | Check whether the credit hour counts, recognition conclusion, recognition date, and responsible person's signature are complete | Search with a combination of teacher name and program name, enable `usingReRank` to compare the ranking of the top few results, and check whether the credit hour counts and dates in the recognition form correspond to the participant list |
| Participant list | Check whether the actual participants, sign-in dates, and receipts match the notice and recognition form | Retrieve candidate chunks from the participant list, record the number of candidates and scores, and check whether the names, quantities, and dates of the same record fail to match across the two materials |
| Knowledge base retrieval service | Whether candidate chunks and similarity scores have undergone mode, merge, rerank, filter, and limit trimming | Adjust `similarity` and `limit`, observe changes in the number of candidates and scores, and confirm that the tokens of the cited text and the number of array entries are recorded separately |

## Three common errors

- Symptom: The same teacher's name or credit hour counts do not match between the training notice and the credit recognition form. Cause: The two materials were entered in different steps, no cross-check was performed, and versions were not synchronized.
- Symptom: The participant list lacks sign-in dates or receipt signatures. Cause: Signatures and receipts were not fully collected when the materials were archived, and subsequent retrieval cannot trace back to a complete source.
- Symptom: The same training program's name or recognition date is inconsistent across the two materials. Cause: After the training notice was updated, the recognition form was not synchronized, resulting in source mismatch during tracing.

## How to verify the setup

This feature's acceptance: test once each with synonym-rewritten questions, compare candidates and scores, then toggle `usingReRank` on and off to inspect the ranking of the top few results, and adjust `similarity` and `limit` to observe the number of candidates and scores.

Business test: create an exception record and see whether it can be traced back to the source material.

- In the knowledge base search test, switch `searchMode`, use semantic, full-text, and hybrid retrieval respectively for the same training program, and record the number of candidates and similarity scores.
- Compare the order of the top few candidates before and after enabling `usingReRank`, check the tokens of the cited text and the number of array entries, and confirm that key chunks have not been trimmed and lost.
