---
title: Knowledge Base Retrieval for Enrollment Changes and Graduation Eligibility: Track Progress and Check Statistics
slug: /en/industry/education-d006-c021-f015
page_type: 行业问题页
application_area: education
meta_title: Graduation Eligibility | Retrieval | Progress
meta_description: Graduation Eligibility: review retrieval for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Enrollment Changes and Graduation Eligibility: Track Progress and Check Statistics

## What this category's data looks like

This page addresses the scenario of student status changes and graduation eligibility review. The materials come from three types of forms—leave-of-absence and return-to-study applications, major transfer applications, and graduation review checklists—along with their corresponding signature pages and receipts. The update cadence is aggregated weekly or monthly, and the fields include student ID, name, change type, effective date, approval signature, and receipt number. Leave-of-absence and return-to-study applications record the time points of a student's leave and return to study; major transfer applications record the transferring-in and transferring-out majors and the effective semester; graduation review checklists record credit completion and eligibility conclusions. After these three types of materials enter the knowledge base retrieval service, each serves as a source of candidate fragments for subsequent nodes or manual extraction of fields and alignment of records, forming a progress table and a statement of statistical criteria.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after pattern, merge, re-rank, filter, and upper-limit trimming). The progress table and statement of statistical criteria are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Leave-of-absence and return-to-study application | Check whether student ID, change type, effective date, and approval signature are complete; the name, quantity, and date of the same record in the application form and the receipt must be consistent | In the search test, switch `searchMode`, test once each with synonymous questions, record the number of candidates and scores, and check whether the returned fragments cover the signature and date fields |
| Major transfer application | Check the transferring-in and transferring-out majors, effective semester, and signature; the names and dates in the two materials must be aligned, and when versions are not synchronized, the latest signed document prevails | Turn `usingReRank` on and off to compare the ordering of the top few results, confirm whether fragments with key fields are stably ranked first, and record the distribution of `similarity` scores |
| Graduation review checklist | Check the credit completion items, eligibility conclusion, and receipt number; the quantities and dates of the checklist and the change records must match, and missing signatures or receipts are marked separately | View the number and content completeness of returned citations; when the citation upper limit is involved, check the tokens of the cited text, record the number of array items separately, and do not compare `limit` with the budget |

## Three common errors

- Symptom: the effective date for the same student in the leave-of-absence and return-to-study application and the receipt does not match. Cause: the two material versions are not synchronized, and the old-version fragment was recalled without being checked against the signed document.
- Symptom: the major names and quantities in the major transfer application and the graduation review checklist are inconsistent. Cause: the naming criteria were not written into the header, and retrieval candidates were mixed with fragments from different versions.
- Symptom: the graduation review checklist lacks a signature or receipt, and the statistical total does not match the number of records. Cause: exceptions were not marked separately, candidate fragments did not cover the signature page, and items were missed during checking.

## How to verify the setup

Feature acceptance: test once each with synonymously rewritten questions, compare candidates and scores, then turn re-ranking on and off to observe the ordering of the top few results; switch `searchMode` to observe candidate sources, record `similarity` and the number of array items, and when the citation upper limit is involved, check the tokens of the cited text and do not compare `limit` with the budget.

Business test: reconcile the totals using one week of records, check whether the criteria and exceptions are clearly stated, and confirm that the number of records matches the statistical count and that the criteria are written into the header.

- In the search test, switch `searchMode`, test once each with synonymous questions, record the number of candidates and scores, and check whether the signature and date fields are covered.
- Turn `usingReRank` on and off to compare the ordering of the top few results, confirm that key fragments are stably ranked first, and write the criteria and exceptions into the header.
