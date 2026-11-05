---
title: Knowledge Base Retrieval for Vocational Training Subsidy Applications: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c037-f015
page_type: 行业问题页
application_area: education
meta_title: Training Subsidies | Retrieval | Handover
meta_description: Training Subsidies: review retrieval for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Vocational Training Subsidy Applications: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

The category materials for vocational training subsidy applications are structured around three core types: class opening filings, attendance records, and completion assessment forms, supplemented by subsidy application forms, personnel rosters, bank account information, and handover receipts. Class opening filings contain fields such as training type, class hours, venue, and instructors; attendance records form daily sequences of names and dates; completion assessment forms record scores, assessor signatures, and assessment dates. The material sources are training institutions, corporate human resources departments, and assessment agencies. The update rhythm advances with class openings, daily attendance, completion assessments, and batch applications. Dates and signatures are the positions most prone to version divergence among field characteristics. When materials enter the knowledge base retrieval service, each participates in recall as an independent fragment: filing forms assume the role of qualification and course verification, attendance records assume the role of attendance and class hour verification, completion assessment forms assume the role of result and signature verification, and handover records assume the role of version and responsible person marking.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The material drafts and handover records that can be issued are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Class opening filing form | Whether training type, class hours, venue, instructors, class opening date, and institution signature are complete, and whether they correspond to the first day of attendance records | In the search test, search using training type and batch as the query, switch `searchMode` to compare candidates, and check whether date and signature fields fall in the same fragment |
| Attendance records | Whether name, date, cumulative class hours, and attendance status are verifiable day by day, and whether the number of personnel matches the completion assessment form | Search using date plus name combinations, view the number of candidates and `similarity` scores, and compare whether the personnel counts and dates of the two materials align |
| Completion assessment form | Whether scores, assessor signature, assessment date, and filed course name are consistent, and whether the receipt is attached to the handover record | Search by assessment batch, turn `usingReRank` on and off to compare the ranking of the top few items, and check whether signature and receipt fields are recalled |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match between the filing form and attendance records. Cause: The two materials were drafted separately without cross-checking using the same batch field.
- Phenomenon: The completion assessment form has been updated, but the handover record still points to the old version. Cause: The version was not synchronized, and the responsible person did not mark the change date and receipt status during handover.
- Phenomenon: Materials lack signatures or receipts, and the next step cannot sign off. Cause: During drafting, the signature column and receipt were not set as required fields, and retrieval candidates did not cover these fields.

## How to verify the setup

Acceptance of this feature: Test once each with synonym-rewritten questions, compare candidates and scores, then toggle rerank to observe the ranking of the top few items; record the number of candidates and `similarity`, switch `searchMode` and adjust `limit` to observe trimming, and record quoted text tokens and array counts separately.

Business test: Draft one according to the template and complete one handover to see whether missing items are blocked.

- In the search test, fix the same question, search using semantic, full-text, and hybrid modes respectively, record the number of candidates and scores, and check whether date and signature fields appear simultaneously.
- Compare the class opening filing, attendance records, and completion assessment form, verify name, quantity, date, and signature item by item, and confirm that the version number and responsible person in the handover record are consistent.
