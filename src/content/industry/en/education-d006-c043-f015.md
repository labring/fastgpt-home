---
title: Knowledge Base Retrieval for Training Provider Admissions and Inquiry Follow-Up: Track Progress and Check Statistics
slug: /en/industry/education-d006-c043-f015
page_type: 行业问题页
application_area: education
meta_title: Training Admissions | Retrieval | Progress
meta_description: Training Admissions: review retrieval for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Training Provider Admissions and Inquiry Follow-Up: Track Progress and Check Statistics

## What this category's data looks like

This page addresses the enrollment consultation conversion scenario at training institutions. The materials come from three categories: enrollment brochures, consultation records, and trial class schedules. Enrollment brochures provide course names, class types, class hours, and dates, and serve as the baseline source for consultation terminology; consultation records carry student names, intention levels, communication dates, and signatures, and serve as the original rows of the progress table; trial class schedules record trial times, instructors, and receipts, and serve as the exception source for statistical reconciliation. The three material categories are updated weekly, with a consolidated version at month-end. Field characteristics: the four field types—names, quantities, dates, and signatures—appear repeatedly across materials. Brochures and consultation records often show the same course name written differently, the same intention quantity registered differently, and the same date misaligned before and after; if trial class schedules are not synchronized to the latest version, the receipt and signature columns are prone to being blank. When materials enter knowledge base retrieval and recall, brochures serve as the terminology basis, consultation records serve as the source of progress rows, and trial class schedules serve as the source for exception and receipt reconciliation. Together, the three support the generation of the progress table and the statistical terminology explanation.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The "progress table and statistical terminology explanation" is completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Enrollment brochure | Whether course names, class types, class hours, and dates align item by item with consultation records, and whether the signature column has a receipt | In the search test, switch `searchMode` to semantic, full-text, and hybrid once each, and check whether the brochure fields and consultation record fields in the candidate chunks have the same names, quantities, and dates |
| Consultation record | Whether student names, intention levels, communication dates, and signatures are complete, and whether the names, quantities, and dates of the same record match across the two materials | Test once each with synonym-rewritten questions, observe the number of candidate items and scores, then toggle `usingReRank` on and off to compare the ranking of the top few items |
| Trial class schedule | Whether trial times, instructors, and receipts are synchronized with the brochure version, and whether missing signatures or receipts are marked | Adjust `similarity` to observe whether key chunks for trial times and receipts are still retained after candidate filtering, and record the number of candidate items separately |

## Three common errors

- Symptom: The names, quantities, and dates of the same student do not match across the two materials. Cause: Brochures and consultation records are updated separately, and cross-material field alignment has not been performed.
- Symptom: The trial class schedule version is not synchronized, and the receipt and signature columns are blank. Cause: After the brochure is revised, the trial class schedule is not written back, and missing signatures or receipts are not marked.
- Symptom: Changing the wording of a question causes key paragraphs to not be recalled. Cause: The recall channel does not match the material form, and key chunks are trimmed after similarity filtering.

## How to verify the setup

Feature acceptance: Test once each with synonym-rewritten questions, compare candidates and scores, then toggle rerank on and off to see the ranking of the top few items.

Business test: Use one week of records to reconcile totals, and check whether the terminology and exceptions are clearly written.

- In the knowledge base search test, switch retrieval modes, compare the number of candidate items and scores, and record the tokens and array length of the cited text.
- Check the names, quantities, dates, and signatures in the brochures, consultation records, and trial class schedules, and write exceptions into the header of the statistical terminology explanation table.
