---
title: Knowledge Base Retrieval for Training Provider Admissions and Inquiry Follow-Up: Find Supporting Evidence
slug: /en/industry/education-d001-c043-f015
page_type: 行业问题页
application_area: education
meta_title: Training Admissions | Retrieval | Evidence
meta_description: Training Admissions: review retrieval for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Training Provider Admissions and Inquiry Follow-Up: Find Supporting Evidence

## What this category's data looks like

In the enrollment consultation conversion scenario at training institutions, materials mainly come from three categories: enrollment brochures, consultation records, and trial class schedules. Enrollment brochures include course name, class type, class hours, target students, registration deadline, and seal; consultation records include parent name, intended course, communication date, consultation conclusion, and consultant signature; trial class schedules include trial class time, classroom, instructor, sign-in, and receipt. The three material categories update at different rhythms: brochures update by batch, consultation records are added one by one as communication occurs, and trial class schedules are adjusted weekly. When entering the knowledge base retrieval and recall function, brochures play the role of course and rule evidence, consultation records play the role of communication fact evidence, and trial class schedules play the role of scheduling and attendance evidence. The same record may have mismatched names, quantities, or dates across two materials, versions may not be synchronized, and signatures or receipts may be missing. Materials must be aligned and version-labeled before retrieval so that retrieval results can serve as evidence entries that can be traced back to the original text.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after mode, merge, rerank, filter, and upper-limit trimming). Evidence entries that can be traced back to the original text are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Enrollment brochure | Whether fields, dates, and signatures are complete, and whether the version is current | In the search test, search by course name and batch, check whether candidate snippets trace back to the course, date, and seal location in the original brochure text, record the number of candidates and scores, and switch `searchMode` to compare the results of the three options: semantic, full-text, and hybrid |
| Consultation record | Whether the names, quantities, and dates of the same record match between the brochure and the consultation record | Test once each with synonym-rewritten questions, check whether candidates include both brochure and consultation record snippets, check whether dates and quantities are consistent, record the number of candidates and scores, and enable `usingReRank` to compare the ranking of the top few results |
| Trial class schedule | Whether the trial class time, classroom, instructor, and sign-in receipt match | Retrieve trial class schedule snippets, check whether candidates trace back to the time, classroom, and instructor fields in the original text, check whether sign-in and receipt are missing, record the number of candidates and scores, and adjust `similarity` to observe the key snippets retained after filtering |

## Three common errors

- Symptom: The names, quantities, and dates of the same record do not match between the brochure and the consultation record. Cause: The two materials are maintained separately, without field alignment and version labeling, so after a retrieval hit, it cannot be traced back to the same original text.
- Symptom: The trial class schedule has been adjusted, but retrieval still returns snippets from the old version. Cause: The version is not synchronized, the knowledge base is not updated by batch, and candidate snippets are inconsistent with the current materials.
- Symptom: The consultation record lacks a signature or receipt, and the evidence entry cannot be closed. Cause: Material archiving is incomplete, retrieval only returns candidates and scores, and signature and receipt status must be checked manually.

## How to verify the setup

Acceptance of this feature: Test once each with synonym-rewritten questions, compare candidates and scores, then toggle rerank on and off to inspect the ranking of the top few results.

Business test: Ask a cross-material evidence question and see whether the answer provides a traceable source.

- In the search test, switch `searchMode` to compare the number of candidates and scores for the three options: semantic, full-text, and hybrid, and confirm that candidates come from different recall channels and have been merged.
- Enable `usingReRank` to compare the ranking of the top few results, adjust `similarity` to observe the key original-text snippets retained after filtering, and separately record the number of entries in the citation array and the tokens of the citation text.
