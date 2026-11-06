---
title: Knowledge Base Retrieval for Foreign Teacher Recruitment and Course Scheduling: Track Progress and Check Statistics
slug: /en/industry/education-d006-c050-f015
page_type: 行业问题页
application_area: education
meta_title: Foreign Teachers | Retrieval | Progress
meta_description: Foreign Teachers: review retrieval for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Foreign Teacher Recruitment and Course Scheduling: Track Progress and Check Statistics

## What this category's data looks like

This page focuses on foreign teacher appointment and course scheduling, organizing three types of materials: appointment contracts, work permit materials, and course scheduling tables. Appointment contracts include position title, contract start and end dates, and signature page; work permit materials include permit number, material checklist, receipt, and date; course scheduling tables include course name, class, week number, number of class hours, and instructor. The materials come from three lines—personnel, foreign affairs, and academic affairs—and are updated weekly and summarized monthly. In the fields, name spellings, quantity calibers, and date formats often change with versions. When entering knowledge base retrieval and recall, contracts and permit materials serve as the basis for identity and qualifications, while course scheduling tables serve as the basis for scheduling and class hours; together, the three support progress records and statistical verification.

## Configuration and implementation checks

The knowledge base retrieval service (retrieval node and search test) only outputs candidate snippets and similarity scores (after pattern, merge, rerank, filter, and upper-limit trimming). Progress tables and statistical caliber descriptions must be handled by subsequent nodes or manually. A single retrieval consists of question optimization, semantic/full-text/hybrid recall, multi-route merging, rerank secondary sorting, similarity filtering, and citation upper-limit trimming, and only then is the cited content handed to the model.

| Object | Check | Verification action |
| --- | --- | --- |
| Appointment contract | Whether the contract start and end dates, position title, and signature page correspond to the work permit materials | Switch `searchMode` to retrieve contract snippets, verify dates and signatures, and record the number of candidates and scores |
| Work permit materials | Whether the permit number, material checklist, and receipt date are consistent with the contract | Test once each with synonymous questions to see whether the candidates include the checklist and receipt; if necessary, enable `usingReRank` to compare sorting |
| Course scheduling table | Whether the course name, class, week number, and number of class hours are consistent with the contract position caliber | Retrieve scheduling table snippets by week, verify the total class hours and exception notes, and record `similarity` and the number of candidates |
| Progress table and statistical caliber description | Whether the recorded count and statistical count match, and whether the caliber is written in the header | Use one week's records to verify the total, check whether the caliber and exceptions are clearly stated, and record the number of citations separately by array length |

## Three common errors

- Symptom: The same teacher's name is written differently in the contract and permit materials, and is treated as two records during statistics. Cause: The two materials are maintained separately, without name normalization and version synchronization.
- Symptom: The number of class hours in the course scheduling table does not match the class hours agreed in the contract, resulting in a discrepancy in the total. Cause: The course table is updated weekly, while the contract uses a semester caliber, and the quantity caliber is not stated in the header.
- Symptom: Permit materials lack a receipt or signature page, but the progress table still records them as completed. Cause: The receipt was entered into the table before being collected, and the missing signature status was not intercepted during verification.

## How to verify the setup

This feature's acceptance: test once each with synonymously rewritten questions, compare candidates and scores, then turn rerank on and off to observe the ordering of the top few results; switch `searchMode` to see candidate sources, and verify `similarity` and the number of candidates.

Business test: use one week's records to verify the total, and check whether the caliber and exceptions are clearly stated; record the number of citations separately by array length, verify the tokens of the cited text separately, and do not compare them as equal to the count.

- In the knowledge base search test, switch among the three modes—semantic, full-text, and hybrid—compare the number of candidates and scores for the same question, and confirm that the merged results contain both types of recall.
- Run once with rerank enabled and once disabled, record changes in the order of the top few results; verify that key snippets of the original text are still retained after similarity filtering and citation upper-limit trimming.
