---
title: Knowledge Base Retrieval for Training Provider Admissions and Inquiry Follow-Up: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c043-f015
page_type: 行业问题页
application_area: education
meta_title: Training Admissions | Retrieval | Handover
meta_description: Training Admissions: review retrieval for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Training Provider Admissions and Inquiry Follow-Up: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This category's data looks like
Enrollment consultation conversion for training institutions involves three types of materials: enrollment brochures, consultation records, and trial class schedules. Enrollment brochures contain the course name, number of class hours, start date, refund terms, and issuer signature; consultation records contain the student name, consultation date, intended course, and follow-up responsible person's signature; trial class schedules contain the trial time, instructor, classroom number, and receipt signature. The three types of materials are updated frequently during enrollment season, and versions are distinguished by date and issuer. When entering knowledge base retrieval, enrollment brochures and trial class schedules serve as sources of recallable segments, while consultation records serve as the field comparison draft. The retrieval service first recalls candidate segments and similarity scores, then hands them to subsequent nodes or humans to draft signable material drafts and handover records accordingly, and checks item by item whether fields, dates, and signatures are consistent.

## Configuration and implementation checks

This step is performed by the knowledge base retrieval service (retrieval node and search test), outputting candidate segments and similarity scores (after pattern, merge, rerank, filter, and limit trimming). Signable material drafts and handover records are completed by subsequent nodes or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| Enrollment brochure | Fields include course name, number of class hours, start date, refund terms, and issuer signature; date and signature must be complete | In the search test, check once each with synonymous questions, verify the number of returned candidates and scores, and confirm that `searchMode` matches the material form |
| Consultation record | Fields include student name, consultation date, intended course, and follow-up responsible person's signature; the same record's name and date must be consistent with the brochure | Switch the `similarity` threshold to compare candidates, confirm that key field segments are not filtered out, and record the number of candidates |
| Trial class schedule | Fields include trial time, instructor, classroom number, and receipt signature; the version date must be synchronized with the enrollment brochure | Compare the ranking of the first few items before and after enabling `usingReRank`, and confirm that the time and instructor fields are ranked first |
| Handover record | Fields include both parties in the handover, handover date, material version number, and receipt acknowledgment; missing items must be blocked | Draft one according to the template and complete one handover, verify the tokens of the quoted text after `limit` trimming and record the array count separately |

## Three common errors

- Symptom: The intended course name for the same student does not match between the consultation record and the enrollment brochure. Cause: The two materials were drafted separately, not compared against the same field draft, and the retrieval candidates did not cover the key passages.
- Symptom: The version date of the trial class schedule is inconsistent with the enrollment brochure, and this was not discovered during handover. Cause: The versions were not synchronized, the retrieval candidates returned were not sorted by date, and no manual item-by-item check was performed.
- Symptom: The handover record lacks a receipt acknowledgment, and the next step directly signs off. Cause: Missing items in the template were not blocked, and the retrieval candidates did not recall the segment containing the signature field.

## How to verify the setup

Acceptance for this feature: test once each with synonymously rewritten questions, compare candidates and scores, then toggle rerank on and off to observe the ranking of the first few items; verify the return differences of `searchMode`, `similarity`, `usingReRank`, and `limit`.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- In the search test, check the same question once each with synonymous questions, record the number of candidates and scores, and confirm that key field segments are not filtered out.
- Draft one enrollment brochure and one handover record according to the template, check item by item the names, quantities, dates, and signatures, and complete one handover sign-off.
