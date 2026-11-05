---
title: Knowledge Base Retrieval for School Teacher Training Credits: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c013-f015
page_type: 行业问题页
application_area: education
meta_title: Teacher Credits | Retrieval | Versions
meta_description: Teacher Credits: review retrieval for version tracking. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for School Teacher Training Credits: Maintain Document Versions and Changes

## What this category's data looks like

This page addresses the scenario of credit management for primary and secondary school teacher training. The materials include three types: training notices, credit recognition forms, and attendance rosters. A training notice gives the training program name, start and end dates, and the conversion basis between class hours and credits, and is the source of version changes; a credit recognition form carries the teacher's name, ID number, training program, recognized credits, recognition date, and signature field, and is the basis for crediting credits; an attendance roster records participants, units, and sign-in and receipt status, and is used to verify the fact of attendance. The three types of materials are updated on a rolling basis by training batch, and it is common for the same training program to have inconsistent names, headcounts, and dates across the notice, recognition form, and roster, for old versions not to be marked as invalid, and for signatures or receipts to be missing. After the materials enter the knowledge base retrieval and recall function, each serves as a source of candidate snippets for subsequent nodes or manual comparison of fields, dates, and signatures, forming a version ledger and change records.

## Configuration and implementation checks

This step is performed by the knowledge base retrieval service (retrieval node and search test), which outputs candidate snippets and similarity scores (after pattern, merge, re-rank, filter, and upper-limit trimming). The version ledger and change records are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Training notice | Fields include the program name, start and end dates, and the conversion basis between class hours and credits; when the same program name and dates do not match across two notices, the current version must prevail | In the search test, use synonymous questions to retrieve the program name, compare the number of candidates and the scores, and record the dates and conversion basis in the returned snippets |
| Credit recognition form | Fields include the teacher's name, ID number, training program, recognized credits, recognition date, and signature field; a recognition form missing a signature or receipt cannot serve as the current basis | Switch `searchMode` to semantic, full-text, and hybrid and test once each, and check the name, credits, and signature status in the candidate snippets |
| Attendance roster | Fields include participants, units, and sign-in and receipt status; the headcount and dates for the same record in the roster and the recognition form must be consistent | Compare the ranking of the top few entries before and after enabling `usingReRank`, and check whether the roster snippet and the recognition form snippet point to the same batch |
| Version and citation | The current version is unique, old versions are traceable, and citations are synchronized; the number of citations is the array length, and the citation content budget is recorded separately by `limit` and `quoteMaxToken` | After changing one program date, retrieve again, observe whether the candidate snippets are updated synchronously, and record the number of candidates and the similarity scores |

## Three common errors

- Symptom: the name and dates of the same training program do not match between the notice and the recognition form. Cause: the old notice is not marked as invalid, retrieval recalls both old and new snippets at the same time, and filtering by version is not applied.
- Symptom: the headcount and sign-in dates are inconsistent between the attendance roster and the credit recognition form. Cause: after the roster is updated, the recognition form is not synchronized, the two materials each enter the knowledge base, and there is no version ledger for comparison.
- Symptom: a recognition form lacking a signature or receipt is still cited as the current basis. Cause: the candidate snippets do not carry the signature field, and similarity filtering sorts only by text relevance.

## How to verify the setup

Acceptance of this function: test once each with synonymously rewritten questions, compare the number of candidates and the similarity scores, then toggle re-ranking on and off to see the ranking of the top few entries; switch `searchMode` and `usingReRank`, and record the citation text tokens under `limit` and `quoteMaxToken`.

Business test: change one piece of content and see whether the version number and citations are updated synchronously; check that the current version is unique and old versions are traceable, and record the number of citations separately by array length.

- In the knowledge base search test, retrieve the training notice, credit recognition form, and attendance roster separately with synonymous questions, and record the number of candidates, the similarity scores, and the name, date, and signature fields in the returned snippets.
- After changing one program date or credit, retrieve again, check whether the version number and citations are updated synchronously, and check whether old-version snippets are still recalled.
