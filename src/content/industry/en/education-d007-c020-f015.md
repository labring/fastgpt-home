---
title: Knowledge Base Retrieval for Grade Entry and Credit Recognition: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c020-f015
page_type: 行业问题页
application_area: education
meta_title: Grades and Credits | Retrieval | Review
meta_description: Grades and Credits: review retrieval for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Grade Entry and Credit Recognition: Trace Exceptions and Review Results

## What this category's data looks like

This page focuses on three types of materials in grade entry and credit recognition: transcripts, deferred examination applications, and make-up examination arrangements. Transcripts record course name, credits, grade, and signature; deferred examination applications record the reason for application, date, and approval signature; make-up examination arrangements record make-up examination time, location, receipt, and signature. Materials are archived by semester; after grade entry, they are updated synchronously with the deferred and make-up examination processes, and the version is based on the latest signed document. After materials enter the knowledge base retrieval service, each serves as a source of candidate snippets: transcripts are used to verify courses and credits, deferred examination applications are used to verify deferred examination records and approvals, and make-up examination arrangements are used to verify make-up examination time and receipts. The fields, dates, and signatures of the three types of materials must remain consistent. When the name, quantity, or date of the same record does not match across two materials, or when versions are not synchronized, or signatures or receipts are missing, an exception clue is formed, for subsequent nodes or manual review to trace back to the source materials and generate an exception list and review conclusion.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after mode, merge, rerank, filter, and limit trimming). The exception list and review conclusion are then completed by subsequent nodes or manual review.

| Object | Check | Verification action |
| --- | --- | --- |
| Transcript | Fields include course name, credits, grade, and signature; the date and signature must be consistent with the deferred examination application and make-up examination arrangement | In the knowledge base search test, switch `searchMode`, check the candidate snippets and `similarity` score, and confirm whether the course name, credits, grade, and signature match |
| Deferred examination application | Fields include reason for application, date, and approval signature; the name, quantity, and date of the same record in the transcript and make-up examination arrangement must be consistent | Enable `usingReRank` to compare the ranking of the top few results, check the deferred examination date and approval signature, and confirm that there is no unsynchronized version with the transcript and make-up examination arrangement |
| Make-up examination arrangement | Fields include make-up examination time, location, receipt, and signature; a missing signature or receipt is an exception | Adjust `limit` to observe the number of candidate items and scores, check the make-up examination time, location, and receipt, and confirm consistency with the transcript and deferred examination application |
| Exception list and review conclusion | Exceptions must be supported by original records; after the reviewer signs, it is handed to the person in charge for handling | Retrieve candidate snippets and similarity scores according to exception clues, trace each item back to the source material, and record the number of cited items and cited text tokens |

## Three common errors

- Phenomenon: The name and quantity of the same course do not match between the transcript and the make-up examination arrangement. Cause: The two materials were entered at different times, versions are not synchronized, and the retrieval candidates do not cover the latest signed document.
- Phenomenon: The deferred examination application lacks an approval signature or the make-up examination arrangement lacks a receipt. Cause: Material archiving is incomplete, the retrieved candidate snippets do not include the signature page, and it cannot be confirmed during review.
- Phenomenon: The date of the same record does not match between the transcript and the deferred examination application. Cause: The date field entry standards are inconsistent, the similarity of candidate snippets is close, and the ranking does not highlight the original record.

## How to verify the setup

Acceptance of this feature: test once each with synonym-rewritten questions, compare candidate snippets and `similarity` scores, then toggle `usingReRank` to see the ranking of the top few results, and check the number of candidate items under `searchMode` and `limit`.

Business test: create an exception record, see whether it can be traced back to the source material, check the fields, dates, and signatures of the transcript, deferred examination application, and make-up examination arrangement, and confirm that the exception is supported by original records.

- In the knowledge base search test, switch `searchMode` and compare the candidate snippets and similarity scores of the semantic, full-text, and hybrid modes.
- Compare the ranking of the top few results before and after enabling `usingReRank`, and adjust `limit` to record the number of candidate items and cited text tokens.
