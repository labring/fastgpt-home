---
title: Knowledge Base Retrieval for Vocational Training Subsidy Applications: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c037-f015
page_type: 行业问题页
application_area: education
meta_title: Training Subsidies | Retrieval | Review
meta_description: Training Subsidies: review retrieval for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Vocational Training Subsidy Applications: Trace Exceptions and Review Results

## What this category's data looks like

This page focuses on exception tracing and manual review for vocational training subsidy claims, with materials drawn from three types: training class filing records, attendance records, and completion assessment forms. Class filing records include institution name, class number, start and end dates, training program, number of participants, and signature of the person in charge; attendance records include trainee name, ID number, attendance date, and personal signature; completion assessment forms include assessment subjects, scores, assessment date, assessor signature, and institution seal. Materials are updated by class batch, synchronized once before each claim or review, with common fields including name, quantity, date, signature, and version number. When entering knowledge base retrieval and recall, class filing records serve as the class master file providing baseline fields, attendance records serve as process evidence providing attendance facts, and completion assessment forms serve as result evidence providing assessment conclusions; the three reference one another to trace the source of exceptions.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after pattern, merge, re-rank, filter, and limit trimming). The "exception list and review conclusions" are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Training class filing records | Whether institution name, class number, start and end dates, number of participants, and signature of the person in charge are complete and consistent with the claim | Search by class number in the search test, verify the name, quantity, date, and signature fields in the candidate chunks, and record the number of candidates and scores |
| Attendance records | Whether trainee name, ID number, attendance date, and personal signature can correspond one by one with the class filing records | Retrieve once each with synonymous questions, compare candidates and scores, and check whether the name, quantity, and date of the same record match across the two materials |
| Completion assessment forms | Whether assessment subjects, scores, assessment date, assessor signature, and institution seal are complete and version-synchronized | Switch `searchMode` to hybrid, enable `usingReRank` to compare the ranking of the top few results, and adjust `similarity` to observe the original text chunks retained after filtering |
| Exception list and review conclusions | Whether exceptions are supported by original records, signed by the reviewer, and traceable to the source materials | Create an exception record, reverse-search candidate chunks by source material fields, and confirm that the cited text can locate the specific class and evidence |

## Three common errors

- Symptom: the same trainee name is written differently in the attendance records and the completion assessment form. Cause: the two materials were entered without unifying names according to the class filing records, and versions were not synchronized.
- Symptom: the number of participants in the class filing records does not match the actual attendance count in the attendance records. Cause: after supplementary entry or withdrawal, the filing records were not written back, and the date and quantity fields were not synchronized.
- Symptom: the completion assessment form lacks the assessor signature or institution seal. Cause: signatures were missed during material circulation or receipts were not archived, making responsibility unverifiable during review.

## How to verify the setup

Feature acceptance: test once each with synonymously rewritten questions, compare candidates and scores, then toggle re-ranking on and off to observe the ranking of the top few results; switch `searchMode` and `usingReRank`, adjust `similarity` and `limit`, and record the number of candidates and scores.

Business test: create an exception record, see whether it can be traced to the source materials, confirm that the exception is supported by original records and signed by the reviewer, then hand it to the person in charge for handling.

- In the knowledge base search test, switch `searchMode`, compare the candidate chunks and scores of the semantic, full-text, and hybrid modes, and check whether results from different recall channels are included at the same time.
- Enable and disable `usingReRank`, compare the order of the top few candidates; adjust `similarity` and `limit`, check the tokens of the cited text, and record the array length separately.
