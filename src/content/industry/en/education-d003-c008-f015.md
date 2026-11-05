---
title: Knowledge Base Retrieval for School Admissions and Enrollment Organization: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c008-f015
page_type: 行业问题页
application_area: education
meta_title: School Admissions | Retrieval | Intake
meta_description: School Admissions: review retrieval for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for School Admissions and Enrollment Organization: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the Q&A intake and missing-item follow-up scenarios for primary and secondary school admissions organizations. The materials come from three categories: admissions plans, application material checklists, and admission lists. Admissions plans contain enrollment conditions, time nodes, and process descriptions, and are updated in a concentrated release before each year's admissions season; application material checklists contain fields such as household registration, property, and student status, along with signature fields, and are adjusted as policies are fine-tuned; admission lists contain student names, numbers, admission batches, and dates, and are publicly announced in batches. The three material categories play different roles when entering knowledge base retrieval: admissions plans provide the basis for processes and conditions, application material checklists provide field and signature requirements, and admission lists provide the basis for comparing names and dates. The name, quantity, or date of the same record may not match across two materials. When versions are not synchronized or signature receipts are missing, retrieval candidates will bring out different fragments at the same time, and missing items must be marked in the intake record and followed up.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after pattern, merge, re-rank, filter, and upper-limit trimming). The intake record and the completed follow-up questions are handled by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Admissions plan | Check whether the enrollment conditions, time nodes, and process fields are consistent with the application material checklist, and whether dates and signature fields are complete | In the search test, test once each with synonymous questions, switch `searchMode` to compare the number of candidates and scores, and see whether the plan fragments cover the conditions and dates |
| Application material checklist | Check whether field names, quantities, and signature receipts such as household registration, property, and student status match the admission list | Turn re-ranking on and off, compare the order of the top few candidates; use the `usingReRank` switch to see relevance changes, and record the number of candidates and scores |
| Admission list | Check whether names, numbers, admission batches, and dates are consistent with the admissions plan and application material checklist | Adjust the `similarity` filter threshold and observe whether list fragments are trimmed; record the number of reference array items separately, and do not compare it for equality with that budget |
| Retrieval results | Whether the candidate fragments and similarity scores cover the fields and date basis required for missing-item follow-up | Use `limit` to control the reference upper limit, check the reference text tokens and the number of array items; see whether candidates contain both semantic and full-text results |

## Three common errors

- Symptom: the name or number of the same student does not match between the admissions plan and the admission list. Cause: the two material versions are not synchronized, and retrieval candidates bring out both old and new fragments at the same time; hits and associations must be checked first before follow-up.
- Symptom: the property or household registration quantity in the application material checklist is inconsistent with the admission list record. Cause: after the checklist was updated, it was not written back to the list, and the candidate fragments returned by retrieval contradict each other, so missing items are not identified.
- Symptom: the intake record lacks a signature or receipt, and after follow-up it still answers based on old fragments. Cause: after similarity filtering and reference upper-limit trimming, key passages are trimmed away, and the answer lacks material basis.

## How to verify the setup

Feature acceptance: test once each with synonymously rewritten questions, compare candidates and scores, then turn re-ranking on and off to see the order of the top few; switch `searchMode` and `usingReRank`, record the number of candidates and scores, and check the reference text tokens and number of array items after `similarity` filtering.

Business test: ask a question missing key information and see whether it follows up before answering; confirm that missing items are identified and followed up, that the answer has a material basis, and then transfer it to the handler.

- In the knowledge base search test, switch `searchMode` to semantic, full-text, or hybrid, compare the number of candidates and scores for the same question, and see whether candidates contain both semantic and full-text results.
- Turn re-ranking on and off, compare the order of the top few candidates; adjust `similarity` and `limit`, check the reference text tokens and number of array items, and confirm that key passages have not been trimmed away.
