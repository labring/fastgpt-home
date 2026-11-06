---
title: Knowledge Base Retrieval for Enrollment Changes and Graduation Eligibility: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c021-f015
page_type: 行业问题页
application_area: education
meta_title: Graduation Eligibility | Retrieval | Handover
meta_description: Graduation Eligibility: review retrieval for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Enrollment Changes and Graduation Eligibility: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page focuses on material drafting and responsibility handover in student status changes and graduation qualification review, involving three types of materials: leave-of-absence/resumption-of-study applications, major transfer applications, and graduation review checklists. Leave-of-absence/resumption-of-study applications are submitted by students, preliminarily reviewed by the department, and rechecked by the student status department; major transfer applications are initiated by students, countersigned by the transferring-in and transferring-out departments, and given final approval by the academic affairs office; graduation review checklists are compiled by the department with grades and credits and verified by the academic affairs office for graduation qualification. Material sources include records exported from the student status system, scanned copies signed by the department, and review opinions from the academic affairs office. The update cadence changes with the semester status-change windows and graduation review cycles, and fields include name, student ID, status-change type, effective date, signature field, version number, and receipt status. When materials enter the knowledge base retrieval service, they serve as the source of candidate chunks and similarity scores for subsequent nodes or manual generation of signable material drafts and handover records.

## Configuration and implementation checks

This step is performed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after pattern, merge, rerank, filter, and limit trimming). "Signable material drafts and handover records" are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Leave-of-absence/resumption-of-study application | Fields complete, responsible person clear, version and date consistent | In the knowledge base search test, search with synonymous questions, switch `searchMode` to compare the three options of semantic, full-text, and hybrid, check the number of candidates and scores, and check whether the signature field and receipt status are complete |
| Major transfer application | The name, quantity, and date of the same record do not match across the two materials; the version is not synchronized; signature or receipt is missing | Retrieve the major transfer application and handover record, see whether the candidates include both semantic and full-text results, enable `usingReRank` to compare the ranking of the top few, and check whether the quoted text after `similarity` filtering retains key chunks |
| Graduation review checklist | Fields complete, responsible person clear, version and date consistent | Test once each with synonymous questions, record the number of candidates and scores, check the number and content completeness of quoted items after `limit` trimming, and confirm that the grades, credits, and graduation conclusion fields in the checklist are consistent with the student status records |
| Handover record | Responsible person clear, version and date consistent, signature or receipt missing | Retrieve the handover record template, check the fields for recipient, handover date, and receipt status, compare the candidate order before and after enabling rerank, and confirm that the signature field and version number in the quoted text have not been trimmed |

## Three common errors

- Symptom: The name or student ID of the same student does not match between the leave-of-absence/resumption-of-study application and the major transfer application. Cause: The two materials are recalled from different channels respectively, hits and associations are not checked, and the sources are not aligned.
- Symptom: The version of the graduation review checklist is not synchronized, and the old version's signature field still shows as signed. Cause: The candidate chunks returned by retrieval come from different versions and are not filtered by date and version number.
- Symptom: The handover record lacks a signature or receipt, and the next step cannot sign for it. Cause: After quote limit trimming, the key signature chunk is truncated, and the number of candidates and the tokens of the quoted text are not checked separately.

## How to verify the setup

This feature's acceptance: test once each with synonymously rewritten questions, compare the number of candidates and scores, then toggle rerank on and off to see the ranking of the top few.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- In the knowledge base search test, switch `searchMode` to semantic, full-text, or hybrid, compare the number of candidates and scores, record the tokens of the quoted text after `similarity` filtering, and record the array length separately.
- Enable `usingReRank` to compare the ranking of the top few, check the number and content completeness of quoted items after `limit` trimming, and confirm that the signature field, version number, and receipt status have not been truncated.
