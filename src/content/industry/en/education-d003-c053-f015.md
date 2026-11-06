---
title: Knowledge Base Retrieval for College Admissions Health Examination Organization: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c053-f015
page_type: 行业问题页
application_area: education
meta_title: Admissions Health Exams | Retrieval | Intake
meta_description: Admissions Health Exams: review retrieval for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for College Admissions Health Examination Organization: Handle Questions and Collect Missing Information

## What this category's data looks like

When a college admissions physical examination organization handles inquiries, common materials include the physical examination form, re-examination application, restricted-major notification, and receipt. Sources are mostly the school hospital examination point, departmental admissions office, and candidate submissions, with an update rhythm of centralized intake by batch and rolling supplementary documents during the re-examination stage. Field characteristics center on name, candidate number, examination items, restricted conclusion, application date, and signature field. When entering the knowledge base retrieval and recall function, the physical examination form serves as the verification basis for the examination conclusion and item fields, the re-examination application serves as the traceability basis for the re-examination reason and date fields, the restricted-major notification serves as the confirmation basis for the notification conclusion and receipt signature, and the receipt serves as the proof of delivery and acknowledgment. Together the three support missing-item identification and follow-up questions, and the retrieval results serve only as candidate snippets and similarity scores for subsequent nodes or humans to generate intake records and the questions to be completed.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after mode, merge, rerank, filter, and limit trimming). Intake records and the questions to be completed are then handled by subsequent nodes or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| Physical examination form | Whether name, candidate number, examination items, restricted conclusion, date, and signature field are complete, and whether they are consistent with the name, quantity, and date in the re-examination application record | In the search test, test once each with synonymous questions, record the number of candidates and scores, and check whether the returned snippets cover the examination items and signature field; switch `searchMode` to compare the differences among semantic, full-text, and hybrid recall |
| Re-examination application | Whether the re-examination reason, application date, original examination conclusion, and the date and name in the restricted-major notification match, and whether there is any version not synchronized | Compare the top few rankings before and after enabling `usingReRank`, and check whether the re-examination reason and date fields fall within the candidate snippets; use `similarity` to observe whether low-scoring candidates are filtered out |
| Restricted-major notification | Whether the notification conclusion, restricted major name, receipt signature, and date are consistent with the physical examination form and re-examination application, and whether the signature or receipt is missing | Check whether the candidate snippets include the notification conclusion and receipt signature field; adjust `limit` to observe changes in the number of cited items, and confirm that key passages are not trimmed away |
| Receipt | Whether the receipt signature, acknowledgment date, and delivery record are consistent with the name and quantity in the notification, physical examination form, and re-examination application | In the search test, check whether receipt-related candidates are hit together with the notification record, record the number of candidates and scores, and confirm whether missing items are identified and trigger follow-up questions |

## Three common errors

- Symptom: the restricted major name, item quantity, or date for the same candidate do not match between the physical examination form and the re-examination application. Cause: the two materials are entered at different stages, and no field-level consistency check was performed.
- Symptom: the restricted-major notification has been updated, but the re-examination application still references the old version conclusion. Cause: versions are not synchronized, and retrieval candidates recall both old and new snippets without filtering by date.
- Symptom: the receipt lacks a signature or the notification lacks a receipt, yet the intake record still shows it as completed. Cause: missing-item identification does not cover the signature field and receipt fields, and follow-up questions are not triggered.

## How to verify the setup

Acceptance for this function: test once each with synonymously rewritten questions, compare candidate snippets and similarity scores, then toggle rerank on and off to see the top few rankings; check the impact of `searchMode`, `usingReRank`, `similarity`, and `limit` on the number of candidates, scores, and cited text tokens, and record the array count separately.

Business test: ask a question that lacks key information and see whether it asks a follow-up question before answering.

- In the knowledge base search test, retrieve the physical examination form, re-examination application, and restricted-major notification separately with synonymous questions, record the number of candidates and scores, and check whether the name, quantity, date, and signature fields fall within the candidate snippets.
- Compare the top few rankings before and after enabling rerank, check whether key passages are retained after similarity filtering and citation limit trimming, and confirm that missing items are identified and followed up before being forwarded to the handler.
