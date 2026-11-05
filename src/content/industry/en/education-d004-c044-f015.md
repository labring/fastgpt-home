---
title: Knowledge Base Retrieval for Training Provider Scheduling and Lesson Records: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c044-f015
page_type: 行业问题页
application_area: education
meta_title: Training Schedules | Retrieval | Handover
meta_description: Training Schedules: review retrieval for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Training Provider Scheduling and Lesson Records: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

In the class scheduling and class hour deduction scenario of training institutions, the materials entering knowledge base retrieval mainly fall into three categories: class schedules, class hour deduction records, and class rescheduling applications. Class schedules carry class, course, teacher, classroom, time slot, and effective date; class hour deduction records carry student, number of class hours, deduction date, signature, and receipt; class rescheduling applications carry original time slot, target time slot, approver, and version number. When drafting issuable drafts and handover records, the three types of materials serve respectively as scheduling basis, deduction evidence, and change evidence; during retrieval, semantic, full-text, or hybrid modes are selected according to material form, so that both field fragments and approval passages can be recalled. The update rhythm follows the scheduling cycle, class hour deduction confirmation, and class rescheduling approval, and versions and dates must be synchronized.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after mode, merge, rerank, filter, and limit trimming). Issuable material drafts and handover records are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Class schedule | Whether the class schedule fields, dates, and signatures are consistent with the class hour deduction records | In the search test, switch `searchMode` and check whether the class, course, teacher, classroom, time slot, and effective date in the candidate fragments come from the same source |
| Class hour deduction record | Whether the deducted class hours, deduction date, signature, and receipt are complete | Compare the order of the first few items before and after enabling rerank, and see whether the candidates with higher `similarity` scores retain the class hour count and signature fragments |
| Class rescheduling application | Whether the original time slot, target time slot, approver, and version of the class rescheduling are synchronized | Test once each with synonym-rewritten questions, record the number of candidates and scores, and check the impact of the `usingReRank` switch on ranking |
| Handover record | Whether the responsible person, version, and date are traceable | After trimming by `limit`, check the tokens of the quoted text, record the array count separately, and confirm that the handover record fields have not been truncated |

## Three common errors

- Symptom: The class name and effective date of the same class schedule do not match in two materials. Cause: The candidate fragments come from different versions, and hits and associations were not verified; the retrieval node only outputs candidates and scores.
- Symptom: The class hour count and deduction date of the class hour deduction record are inconsistent between the draft and the handover record. Cause: The semantic and full-text recall results were not merged and checked, and field fragments were blocked by similarity filtering.
- Symptom: The class rescheduling application lacks the approver's signature or receipt, and the version is not synchronized. Cause: Retrieval only returns candidates and quoted content; signature and receipt fields need to be completed manually in subsequent nodes.

## How to verify the setup

Acceptance of this feature: test once each with synonym-rewritten questions, compare candidates and scores, then toggle rerank on and off to observe the ranking of the first few items; at the same time record the number of candidates and scores, and check the return differences corresponding to the three identifiers `similarity`, `searchMode`, and `usingReRank`.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- In the knowledge base search test, switch retrieval modes, compare whether the candidate fragments contain both semantic and full-text results, and record the number of candidates and scores.
- Compare the order of the first few items before and after enabling rerank, check the tokens of the quoted text and the array count, and confirm that key passages have not been truncated.
