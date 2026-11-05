---
title: Knowledge Base Retrieval for Vocational Training Subsidy Applications: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c037-f015
page_type: 行业问题页
application_area: education
meta_title: Training Subsidies | Retrieval | Versions
meta_description: Training Subsidies: review retrieval for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Vocational Training Subsidy Applications: Maintain Document Versions and Changes

## What this category's data looks like

Vocational training subsidy application materials center on training class filing records, sign-in records, and completion assessment forms, supplemented by receipts and signature pages. Class filing records contain institution name, occupational trade, class start date, and number of trainees; sign-in records list name, date, and signature by day; completion assessment forms contain assessment subjects, scores, and assessor signatures. The same record often has mismatched names, quantities, or dates across two materials, versions are not synchronized, and signatures or receipts are missing. When materials enter knowledge base retrieval, class filing records and completion assessment forms handle field verification and date/signature tracing, sign-in records handle attendance and personnel consistency comparison, and receipts and signature pages provide the basis for supplementing missing items. The update rhythm is triggered by filing changes, assessment supplementary entries, and receipt supplementary signatures, and old versions are retained for traceability.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after pattern, merge, re-rank, filter, and limit trimming). The version ledger and change records are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Training class filing record | Institution name, occupational trade, class start date, and number of trainees match the first-day roster in the sign-in records | In search test, test once each with synonymous questions, record the number of candidates and scores, and verify the filing fields against the first-day roster in the sign-in records |
| Sign-in record | Name, date, and signature are traceable day by day; missing signatures or receipts need supplementation | Switch `searchMode` to semantic, full-text, or hybrid, compare whether candidates contain both semantic and full-text results, and mark dates with missing signatures |
| Completion assessment form | Assessment subjects, scores, and assessor signatures match the filed trade, and the date is not earlier than the class start date | Compare the ranking of the top few results before and after enabling `usingReRank`, and verify the trade, date, and signature of the assessment form against the filing |
| Version ledger and change records | The current version is unique, old versions are traceable, and references are synchronized | After changing one piece of content, check whether the version number and references are updated synchronously, and record candidate changes under `similarity` and `limit` |

## Three common errors

- Symptom: the same trainee name is written differently in the sign-in record and the completion assessment form. Cause: entry was not unified according to the filing fields, and versions were not synchronized.
- Symptom: the class start date and assessment date do not match across the two materials. Cause: after a change, the old version was not replaced, and references still point to the old chunk.
- Symptom: the sign-in record lacks a signature or the receipt is missing. Cause: supplementary signatures were not returned, and retrieval candidates did not cover the correction page.

## How to verify the setup

This feature's acceptance: test once each with synonymously rewritten questions, compare candidates and scores, then toggle re-ranking to inspect the ranking of the top few results; record the number of candidates and scores, record referenced text tokens separately, and count array entries by length.

Business test: change one piece of content and check whether the version number and references are updated synchronously.

- In the knowledge base search test, switch `searchMode` and compare the number of candidates and scores among semantic, full-text, and hybrid, marking candidates that contain both semantic and full-text results.
- Compare the order of the top few results before and after enabling `usingReRank`, verify whether the referenced text under `similarity` and `limit` retains key chunks, and record the number of references separately.
