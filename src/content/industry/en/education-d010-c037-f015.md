---
title: Knowledge Base Retrieval for Vocational Training Subsidy Applications: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c037-f015
page_type: 行业问题页
application_area: education
meta_title: Training Subsidies | Retrieval | Operations
meta_description: Training Subsidies: review retrieval for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Vocational Training Subsidy Applications: Coordinate Operations and Application Handover

## What this category's data looks like

This page addresses vocational training subsidy claim materials: training class filing records, attendance records, and completion assessment forms. These materials enter the knowledge base as attachments and forms, respectively serving the roles of class opening basis, attendance proof, and assessment conclusion. The class filing record contains the institution name, training occupation, class opening date, student roster, and approval signature; the attendance record lists student names, sign-in times, and personal signatures by day; the completion assessment form contains assessment subjects, scores, assessor signatures, and institution seal. Materials are updated by class session; the same class session appears in the filing, attendance, and assessment locations, and fields and dates must be aligned item by item. When entering knowledge base retrieval and recall, the three materials serve as candidate chunk sources for subsequent nodes or manual generation of handover-ready deployment status and operation records.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after mode, merge, re-rank, filter, and limit trimming). Handover-ready deployment status and operation records are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Training class filing record | Institution name, training occupation, class opening date, student roster, and approval signature must be complete, and aligned item by item with the attendance and assessment materials | Retrieve the class filing record in the search test, verify the name, count, date, and signature; switch `searchMode` to compare candidates |
| Attendance record | Daily student names, sign-in times, and personal signatures must match the filing roster; missing signatures or receipts are considered incomplete records | Retrieve the attendance record, verify dates and signatures; record the candidate count and scores, and check retention after `similarity` filtering |
| Completion assessment form | Assessment subjects, scores, assessor signatures, and institution seal must correspond to the filing and attendance; when versions are not synchronized, the latest signed version prevails | Retrieve the completion assessment form, verify subjects and scores; enable `usingReRank` to compare the ordering of the top few results |
| Knowledge base retrieval service | Candidate chunks and similarity scores are output after mode, merge, re-rank, filter, and limit trimming; the citation count is the array length | View the candidate count and scores in the search test, record the tokens of the cited text separately, and do not compare the count and the budget for equality |

## Three common errors

- Symptom: The same student's name, count, or date does not match between the filing roster and the attendance record. Cause: The two materials are entered separately and not verified item by item by class session, resulting in misaligned fields and dates.
- Symptom: The completion assessment form has been updated, but the filing is still the old version, and the candidates returned by retrieval are inconsistent with the current signed version. Cause: Versions are not synchronized, and the update cadence is not aligned by class session.
- Symptom: The attendance record lacks a personal signature or receipt, and the assessment form lacks an assessor signature. Cause: Material collection is incomplete, and missing items are only discovered during item-by-item verification against the handover checklist.

## How to verify the setup

This feature's acceptance: test once each with synonym-rewritten questions, compare candidates and scores, then toggle re-ranking on and off to inspect the ordering of the top few results; at the same time, verify the values of `searchMode`, `similarity`, `usingReRank`, and `limit`.

Business test: verify once item by item against the handover checklist to see which record is missing; after confirming that versions, connections, and task records are consistent, hand over to operations or the next shift.

- In the knowledge base search test, switch retrieval modes, compare candidate chunks and similarity scores, and record the candidate count.
- Before and after enabling re-ranking, inspect the ordering of the top few results once each, and record the tokens of the cited text and the array count separately.
