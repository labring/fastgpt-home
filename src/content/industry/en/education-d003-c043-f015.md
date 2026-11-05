---
title: Knowledge Base Retrieval for Training Provider Admissions and Inquiry Follow-Up: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c043-f015
page_type: 行业问题页
application_area: education
meta_title: Training Admissions | Retrieval | Intake
meta_description: Training Admissions: review retrieval for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Training Provider Admissions and Inquiry Follow-Up: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the training institution enrollment consultation conversion scenario, with materials drawn from three categories: enrollment brochures, consultation records, and trial class schedules. Enrollment brochures carry course names, class types, start dates, and fee definitions; consultation records carry the original question text, acceptance time, and the inquirer's points of concern; trial class schedules carry sessions, quotas, and sign-in receipts. The three material types play different roles when entering knowledge base retrieval and recall: enrollment brochures are the baseline source for course and date fields, consultation records are the trigger source for question text and missing-item identification, and trial class schedules are the verification source for session and receipt fields. In terms of update cadence, brochures are versioned by enrollment batch, consultation records are appended by acceptance period, and trial class schedules are updated on a rolling basis by session. Field characteristics center on names, quantities, dates, signatures, and receipts; the same record often shows mismatched names, quantities, and dates across two materials, unsynchronized versions, or missing signatures or receipts.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after pattern, merge, re-rank, filter, and limit trimming). Acceptance records and supplemented question items are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Enrollment brochure | Whether course names, class types, start dates, and fee definitions are consistent with consultation records, and whether names and dates for the same record match across the two materials | In the knowledge base search test, switch `searchMode` to semantic, full-text, or hybrid, and compare candidate snippets and similarity scores; check whether the brochure version is synchronized and whether signatures or receipts are complete |
| Consultation record | Whether the original question text, acceptance time, and points of concern are complete, and whether missing items are identified and followed up | Test once each with synonym-rewritten questions to see whether candidates include both semantic and full-text results; check whether key snippets of the original text are still retained after `similarity` filtering, and whether missing items are followed up before answering |
| Trial class schedule | Whether sessions, quotas, and sign-in receipts match the brochure and consultation records, and whether dates and quantities are consistent | Compare the order of the top few items before and after enabling re-rank, and check candidate ordering changes after `usingReRank` is enabled; check the number of cited items and content completeness after `limit` trimming, and whether signatures or receipts are missing |

## Three common errors

- Symptom: names, quantities, and dates for the same record do not match across two materials. Cause: after the brochure is versioned, consultation records and trial class schedules are not synchronized, and field definitions are inconsistent.
- Symptom: there are many candidates, but the ones ranked at the top are all irrelevant. Cause: the retrieval mode does not match the material form, multi-path merge is not followed by re-rank secondary sorting, and similarity filtering and citation limit trimming are not checked.
- Symptom: the answer lacks key paragraphs or the source does not match. Cause: versions are not synchronized, signatures or receipts are missing, and retrieval returns candidates and cited content; if the source does not match, first check hits and associations.

## How to verify the setup

Feature acceptance: test once each with synonym-rewritten questions, and compare candidate snippets and similarity scores; switch `searchMode` to semantic, full-text, or hybrid, and check the number of cited items and content completeness after `similarity` filtering and `limit` trimming; then toggle `usingReRank` to see changes in the ordering of the top few items.

Business test: ask a question missing key information to see whether it follows up before answering, and check whether acceptance records and supplemented question items are routed to the handler.

- In the knowledge base search test, switch `searchMode`, compare candidate snippets and similarity scores across semantic, full-text, and hybrid modes, and check whether candidates include both semantic and full-text results.
- Compare the order of the top few items before and after enabling re-rank, check the tokens of cited text after `usingReRank` and `similarity`, `limit` trimming, record the array item count separately, and check whether signatures or receipts are complete.
