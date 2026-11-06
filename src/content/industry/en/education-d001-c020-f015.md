---
title: Knowledge Base Retrieval for Grade Entry and Credit Recognition: Find Supporting Evidence
slug: /en/industry/education-d001-c020-f015
page_type: 行业问题页
application_area: education
meta_title: Grades and Credits | Retrieval | Evidence
meta_description: Grades and Credits: review retrieval for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Grade Entry and Credit Recognition: Find Supporting Evidence

## What this category's data looks like

This page addresses business basis query for grade entry and credit recognition, involving three types of materials: transcripts, deferred examination applications, and make-up examination arrangements. A transcript records the course name, grade, credits, entry date, and signature; a deferred examination application records the course, reason for deferral, application date, and approval signature; a make-up examination arrangement records the make-up examination course, time, location, and receipt. All three types of materials come from this institution's academic affairs and departmental archives, are updated by semester, and the version is subject to the current signature and seal. When the materials enter the knowledge base retrieval and recall function, they serve respectively as candidate chunk sources: the transcript provides grade and credit recognition fields, the deferred examination application provides the basis for deferral and the approval chain, and the make-up examination arrangement provides the make-up examination time and receipt status. The name, quantity, and date of the same record in two materials may not match; when versions are not synchronized or signatures or receipts are missing, it is necessary to refer back to the original text in the retrieval results for verification.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after mode, merge, rerank, filter, and limit trimming). The basis entries that can refer back to the original text are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Transcript | Fields include course name, grade, credits, entry date, and signature; the name, quantity, and date of the same record in two materials need to match | In the search test, check whether the candidate chunks cover the grade and credit fields, record the number of candidate entries and the score, and check `searchMode` and `similarity` |
| Deferred examination application | Fields include course, reason for deferral, application date, and approval signature; the version must be current and the signature complete | Compare whether the course name and date in the deferred examination application and the transcript are consistent, and observe changes in the ranking of the top few entries before and after enabling `usingReRank` |
| Make-up examination arrangement | Fields include make-up examination course, time, location, and receipt; when the signature or receipt is missing, the basis is incomplete | Check whether the course and date in the make-up examination arrangement match those in the transcript and deferred examination application, record the number of candidate entries and the score, and check whether the quoted text after `limit` trimming retains the key chunks |

## Three common errors

- Phenomenon: The name and date of the same course in the transcript and deferred examination application do not match. Cause: Field alignment was not performed when the two materials were entered, and after a retrieval hit, no reference back to the original text was made for verification.
- Phenomenon: The version of the make-up examination arrangement is not synchronized, and the current signature and seal coexist with the old version. Cause: The update cadence is not unified, historical versions are mixed into retrieval candidates, and filtering by the current signature and seal is required.
- Phenomenon: The deferred examination application lacks a signature or the make-up examination arrangement lacks a receipt, and the basis entries cannot be referred back to. Cause: Material archiving is incomplete, retrieval returns only candidate chunks, and signatures and receipts need manual supplementary verification.

## How to verify the setup

This function's acceptance: test once each with synonym-rewritten questions, compare the number of candidate entries and scores, then toggle rerank on and off to observe the ranking of the top few entries; check the impact of `searchMode`, `similarity`, `usingReRank`, and `limit` on candidates, record the number of quoted entries by array length, and look at quoted text tokens separately.

Business test: ask a cross-material basis question, see whether the answer gives a referable source, and verify whether the source comes from this institution's materials, whether the version is current, and whether the entries match the original text.

- In the knowledge base search test, switch retrieval modes, compare candidate chunks and similarity scores, and confirm that candidates come from different recall channels and have been merged.
- Compare the order of the top few entries before and after enabling rerank, check whether the quoted text after similarity filtering and quoted limit trimming retains the key chunks of the original text, and record the number of candidate entries.
