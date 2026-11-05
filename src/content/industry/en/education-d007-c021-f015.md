---
title: Knowledge Base Retrieval for Enrollment Changes and Graduation Eligibility: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c021-f015
page_type: 行业问题页
application_area: education
meta_title: Graduation Eligibility | Retrieval | Review
meta_description: Graduation Eligibility: review retrieval for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Enrollment Changes and Graduation Eligibility: Trace Exceptions and Review Results

## What this category's data looks like

This page focuses on the student status changes and graduation eligibility audit category. The materials include three types: leave-of-absence and return-to-study applications, major transfer applications, and graduation audit checklists. Leave-of-absence and return-to-study applications record the start and end dates of the student status change and the approval signature; major transfer applications carry the names of the major before and after the adjustment, the course and credit correspondence; graduation audit checklists summarize grades, credits, and graduation conclusions for each semester. The materials come from academic affairs system exports and department submissions, updated by semester or batch, with fields including name, student ID, major name, change type, effective date, approver signature, and receipt number. When entering the knowledge base retrieval function, the three types of materials each serve as candidate fragment sources for comparison in the exception tracing and manual review steps to check whether names, quantities, dates, and signatures are consistent.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after mode, merge, rerank, filter, and limit truncation). The exception list and review conclusions are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Leave-of-absence and return-to-study application | For the same student ID, the change type, effective date, and approval signature in the leave-of-absence and return-to-study application and the graduation audit checklist must correspond item by item | In the search test, switch `searchMode` to semantic, full-text, or hybrid, search by student ID plus change type, check the candidate fragments and `similarity` score, and check whether the signature and receipt number appear |
| Major transfer application | The major name, course count, and credits before and after the major transfer must be consistent between the application and the checklist, and the versions must be synchronized | Compare the order of the first few candidates before and after enabling `usingReRank`, confirm that the major name and date fields come from the same version, and check fragments missing signatures or receipts |
| Graduation audit checklist | The credit total and graduation conclusion in the graduation audit checklist must match the change records, and names and dates must not be misaligned | Search once each with synonym-rewritten questions, record the number of candidates and `similarity`, and check whether the cited text tokens and the fragments after `limit` truncation retain the key fields |
| Knowledge base retrieval service | Candidate fragments and similarity scores are output after mode, merge, rerank, filter, and limit truncation, and no statistical tables or authorization results are produced | Check whether the returned candidates contain both semantic and full-text results, confirm that `limit` only truncates the number of citations, and that key fragments of the original text are still retained after `similarity` filtering |

## Three common errors

- Symptom: The effective dates for the same student ID do not match between the leave-of-absence and return-to-study application and the graduation audit checklist. Cause: The two materials were updated in different batches, the versions were not synchronized, and retrieval only recalled one of them.
- Symptom: The major name and course count in the major transfer application and the graduation audit checklist are inconsistent. Cause: The name fields are written differently, and the candidate fragments were not merged into the same cited content.
- Symptom: The review conclusion lacks the approver signature or receipt number. Cause: The original material lacks the signature or receipt, the retrieval candidates did not cover the corresponding fragments, and no manual traceback to the source was performed.

## How to verify the setup

Feature acceptance: Test once each with synonym-rewritten questions, compare the candidate fragments and `similarity` scores, then toggle `usingReRank` on and off to observe changes in the ranking of the first few results, and check the number of candidates and scores under `searchMode` and `limit`.

Business test: Create an exception record, see whether the source material can be traced, confirm that the exception is supported by the original record and the reviewer's signature, and then hand it to the person in charge for handling.

- In the knowledge base search test, search the leave-of-absence and return-to-study application, major transfer application, and graduation audit checklist separately, record the number of candidates and `similarity`, and check names, quantities, dates, and signatures.
- For the same exception record, search once each using the three `searchMode` options semantic, full-text, and hybrid, enable `usingReRank` to compare the ranking, and confirm that the cited text tokens and key fragments remain complete after `limit` truncation.
