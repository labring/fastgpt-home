---
title: Knowledge Base Retrieval for Foreign Teacher Recruitment and Course Scheduling: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c050-f015
page_type: 行业问题页
application_area: education
meta_title: Foreign Teachers | Retrieval | Handover
meta_description: Foreign Teachers: review retrieval for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Foreign Teacher Recruitment and Course Scheduling: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page focuses on material drafting and responsibility handover in the scenario of foreign teacher appointment and course scheduling, involving three types of materials: appointment contracts, work permit materials, and course schedules. An appointment contract includes the names of both hiring parties, the position, the start and end of the appointment period, compensation, and a signature field; work permit materials include the applicant's name, ID number, proposed employing unit, position, and validity period; a course schedule includes the course name, teaching teacher, week numbers, number of class hours, and academic affairs signature. The three types of materials come from different stages: human resources, foreign affairs, and academic affairs, and their update rhythm rolls forward with appointment batches and semester scheduling. Their field characteristics are that the same teacher name, ID number, course quantity, and dates repeatedly appear across multiple materials. When entering the knowledge base retrieval function, appointment contracts and work permit materials participate in recall as basis-type fragments, while course schedules participate in recall as execution-type fragments, each playing the role of providing candidate reference content for comparison during subsequent node or manual drafting and handover.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after mode, merge, rerank, filter, and limit trimming). The signable material drafts and handover records are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Appointment contract | Fields complete, responsible person clear, version and date consistent; check the names of both hiring parties, position, start and end of the appointment period, compensation, and signature field, and align them item by item with the name, ID number, and proposed position in the work permit materials | In the knowledge base search test, search with question sentences based on contract fields, switch `searchMode` to semantic, full-text, and hybrid once each, record the number of candidates and scores, and check whether the returned fragments cover the signature field and dates |
| Work permit materials | Fields complete, responsible person clear, version and date consistent; check the applicant's name, ID number, proposed employing unit, position, and validity period, and align them with the same record's name and dates in the appointment contract | Search with question sentences based on ID number and validity period, compare the top few rankings before and after enabling `usingReRank`, check whether the candidates include original text fragments from the permit materials, and separately record the array count |
| Course schedule | Fields complete, responsible person clear, version and date consistent; check the course name, teaching teacher, week numbers, number of class hours, and academic affairs signature, and align them with the teacher name and appointment period in the appointment contract | Search with question sentences combining course and teacher, adjust `similarity` to observe candidate changes, check whether the returned fragments retain the week numbers and number of class hours, verify only the reference text tokens for the reference limit, and record the array count separately |
| Handover record | Responsible person clear, version and date consistent; check the signatures of both handover parties, handover date, and receipt, and align them with the version numbers in the three materials | Search with question sentences based on handover date and responsible person, switch `searchMode` to compare candidates, check whether the returned fragments contain the signature and receipt fields, and record the number of candidates and scores |

## Three common errors

- Phenomenon: the same teacher name is written differently in the appointment contract and the work permit materials. Cause: the name format was not unified at entry, the retrieved hit fragments are independent of each other, and no cross-material alignment was performed.
- Phenomenon: the number of class hours in the course schedule does not match the workload in the appointment contract. Cause: after scheduling adjustments, only one material was updated, the other material's version was not synchronized, and the retrieval returned old-version fragments.
- Phenomenon: the handover record lacks the signature or receipt field. Cause: the handover step was not completed according to the template, the field is missing from the retrieval candidate fragments, and subsequent nodes did not intercept it.

## How to verify the setup

This function's acceptance: test once each with synonym-rewritten question sentences, compare candidates and scores, then toggle rerank on and off to observe the top few rankings; check the changes in candidate count and scores after the three settings `searchMode`, `similarity`, and `usingReRank`.

Business test: draft one according to the template and complete one handover, and see whether missing items are intercepted.

- In the knowledge base search test, search separately with question sentences for the three types of fields: appointment contract, work permit materials, and course schedule, record the number of candidates and scores, and check whether the returned fragments cover the signature, date, and version fields.
- Switch `searchMode` and `usingReRank`, compare candidate rankings and reference text tokens, record the array count separately, and check whether the same record's name, quantity, and dates are consistent across multiple materials.
