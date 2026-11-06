---
title: Knowledge Base Retrieval for School Mental Health Screening and Referrals: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c015-f015
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | Retrieval | Intake
meta_description: Student Mental Health: review retrieval for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for School Mental Health Screening and Referrals: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the scenario of mental health screening and referral in primary and secondary schools. The materials include three types: psychological screening plans, interview records, and referral forms. Screening plans provide the scale name, screening date, class, and grade fields; interview records carry the interview time, interviewer signature, and student status description; referral forms record the referral destination, handler, receipt signature, and date. When the three types of materials enter the knowledge base retrieval and recall function, screening plans and interview records serve as candidate chunk sources, and referral forms serve as the basis materials for verifying fields and signature receipts. The update cadence advances according to semester screening batches and individual case referral progress. The name, quantity, and date of the same student in different materials must remain consistent. Field characteristics are concentrated in name, student ID, scale name, screening date, interview date, referral date, signature, and receipt status. During retrieval, semantic, full-text, or hybrid recall is selected according to the material form.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after mode, merge, rerank, filter, and limit trimming). The intake record and the completed follow-up questions are then handled by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Psychological screening plan | Category verification dimensions: whether the scale name, screening date, class, and grade fields are consistent with the interview records | In the search test, switch `searchMode`, verify the scale name and date in the candidate chunks, and record the number of candidates and scores |
| Interview record | Category verification dimensions: whether the interview time, interviewer signature, and student status description correspond to the referral form | Test once each with synonymous rewritten questions, compare candidates and scores, and enable `usingReRank` to observe changes in the ranking of the top few results |
| Referral form | Category verification dimensions: whether the referral destination, handler, receipt signature, and date are complete | Verify the tokens and array length of the returned reference text, and separately record the number of candidates after reference limit trimming |
| Knowledge base retrieval service | Outputs candidate chunks and similarity scores, after mode, merge, rerank, filter, and limit trimming | Adjust `similarity` and `limit`, observe changes in the number of candidates and scores, and confirm that key chunks have not been trimmed |

## Three common errors

- Symptom: The name and date of the same student do not match between the screening plan and the interview record. Cause: The two materials were entered at different times, and field verification was not performed by student ID and screening batch.
- Symptom: The referral form lacks the handler's signature or receipt, while the interview record has already been circulated. Cause: The referral process did not synchronize the receipt status, and versions were not synchronized, resulting in a blank signature field.
- Symptom: There are many candidates, but the ones ranked at the front are all irrelevant, and the answer lacks key paragraphs. Cause: The retrieval mode does not match the material form, and rerank and similarity filtering were not adjusted according to the material.

## How to verify the setup

Acceptance of this function: Test once each with synonymous rewritten questions, compare candidates and scores, then toggle rerank on and off to observe the ranking of the top few results; record the number of candidates and scores, and verify `similarity`, `limit`, `usingReRank`, and `searchMode`.

Business test: Ask a question that lacks key information, see whether it first asks follow-up questions before answering, and confirm that missing items are identified and followed up on, and that the answer has material evidence.

- In the knowledge base search test, switch retrieval modes and compare candidate chunks and scores under semantic, full-text, and hybrid recall.
- Verify the tokens and array length of the returned reference text, and confirm that key original text chunks are still retained after similarity filtering and reference limit trimming.
