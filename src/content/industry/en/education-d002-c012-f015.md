---
title: Knowledge Base Retrieval for District Teaching Research and Classroom Reviews: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c012-f015
page_type: 行业问题页
application_area: education
meta_title: Teaching Reviews | Retrieval | Checks
meta_description: Teaching Reviews: review retrieval for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for District Teaching Research and Classroom Reviews: Compare Documents and Locate Differences

## What this category's data looks like

District and county teaching research activity and classroom observation/evaluation materials come from three types: teaching research activity notices, classroom observation records, and lesson evaluation minutes. They are updated by activity batch, and their fields include activity name, subject, class, instructor, observer, date, signature, and receipt. Teaching research activity notices provide the activity theme, time, location, and participation scope; classroom observation records provide classroom observations, observers, period numbers, and signatures; lesson evaluation minutes provide evaluation points, conclusions, and signatures. After these three types of materials enter the knowledge base retrieval service, each serves as a source of candidate snippets, used to verify whether the name, quantity, date, and signature of the same record are consistent.

## Configuration and implementation checks

This step is performed by the knowledge base retrieval service (retrieval node and search test), which outputs candidate snippets and similarity scores (after pattern, merge, rerank, filter, and upper-limit trimming). The "discrepancy list" is completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Teaching research activity notice | The activity name, date, number of participants, signature, and receipt in the notice must be consistent with the corresponding fields in the classroom observation records and lesson evaluation minutes | In the search test, switch `searchMode` to semantic, full-text, or hybrid, check the candidate snippets and scores, and record the field values on the notice side |
| Classroom observation record | The activity name, date, period number, number of observers, and signature in the classroom observation record must be consistent with the corresponding fields in the notice and lesson evaluation minutes | Retrieve once each with synonymous questions, compare the number of candidates and scores, and check the field values on the classroom observation record side |
| Lesson evaluation minutes | The activity name, date, number of evaluators, and signature in the lesson evaluation minutes must be consistent with the corresponding fields in the notice and classroom observation records | Enable and disable rerank, compare the order of the top few candidates, and check the field values on the lesson evaluation minutes side |
| Retrieval output | Candidate snippets and similarity scores are returned after pattern, merge, rerank, filter, and `limit` trimming | Record the number of candidates and scores, separately check the tokens of the cited text, and confirm the ranking changes before and after the `usingReRank` switch |

## Three common errors

- Symptom: the date or number of participants for the same activity does not match between the notice and the classroom observation record. Cause: the two material versions are not synchronized, and the retrieval candidates each match snippets from different versions.
- Symptom: the lesson evaluation minutes lack a signature or receipt, making it impossible to confirm during verification. Cause: the signature field was not completed when the materials were archived, and this field is empty in the candidate snippets.
- Symptom: there are many candidates, but the ones ranked at the front are all irrelevant. Cause: the retrieval mode does not match the material form, or rerank is not enabled, and the similarity scores do not effectively distinguish them.

## How to verify the setup

Feature acceptance: test once each with synonymously rewritten questions, compare the number of candidates and similarity scores, then enable and disable rerank to observe the ranking of the top few; switch `searchMode` to observe candidate changes, and confirm that `limit` and `usingReRank` take effect.

Business test: use one real record to find fields inconsistent with the ledger, focusing on verifying the name, quantity, date, and signature.

- In the knowledge base search test, retrieve the same activity using the three `searchMode` options semantic, full-text, and hybrid, record the number of candidates and scores, and compare the field values of the notice, classroom observation record, and lesson evaluation minutes.
- Enable and disable rerank, compare the order of the top few candidates; check the tokens of the cited text and the number of candidates, record them separately, and do not compare the two as equal.
