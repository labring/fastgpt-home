---
title: Reranking and Hybrid Retrieval for College Admissions Health Examination Organization: Find Supporting Evidence
slug: /en/industry/education-d001-c053-f018
page_type: 行业问题页
application_area: education
meta_title: Admissions Health Exams | Reranking | Evidence
meta_description: Admissions Health Exams: review reranking for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Reranking and Hybrid Retrieval for College Admissions Health Examination Organization: Find Supporting Evidence

## What this category's data looks like

This category's data covers three types of materials: medical examination forms, re-examination applications, and notifications of restricted majors. They are submitted in batches by the campus hospital, the admissions office, and secondary schools/departments during the medical examination season and before admission, with an update cadence that rolls forward according to batches and re-examination milestones. Medical examination forms contain height and weight, color vision, past medical history, physician signature, and date; re-examination applications contain the reason for application, the original conclusion, the re-examination items, and the receipt; notifications of restricted majors contain the major name, the restriction clause, the notification date, and the candidate's acknowledgment of receipt. After these three types of materials enter hybrid retrieval, each participates in recall as an independent candidate source. Medical examination forms and notifications are often hit simultaneously by the same question, while re-examination applications supplement the procedural basis. Field mismatches mostly occur in names, quantities, dates, and signature receipts, and it is necessary to refer back to the original text to determine whether the basis is currently valid.

## Configuration and implementation checks

| Object | Check | Verification action |
| --- | --- | --- |
| Hybrid retrieval | Both the vector and full-text paths are enabled, and candidates come from both paths at the same time | Check the switches for both paths in the search parameters, and see whether the candidate sources cover both paths |
| Multi-path merging | The results from both paths have been merged, and the number of candidates and their scores can be recorded one by one | Check whether the candidates come from both paths at the same time, and record the number of candidates and scores after merging |
| Reranking model | It has been bound and used for sorting and filtering, and the order and scores change before and after reranking | Compare the order and scores before and after reranking, and check the scores and order of the top three |
| Physical examination form and restricted-major notification | The name, quantity, date, and signed receipt on the same record match the original text | Refer back to the original text item by item, check the fields, dates, and signatures, and confirm that the version is the current one |

## Three common errors

- Symptom: The name, quantity, or date of the same record does not match between the medical examination form and the notification of restricted majors. Cause: The two recall paths bring back materials of different versions together, and filtering by reranking score was not applied.
- Symptom: A re-examination application lacks a signature or receipt but is still treated as a basis that can be traced back to the original text. Cause: The candidate ranks high, and citation trimming did not check the signature and receipt fields.
- Symptom: There are many candidates, but the top few are irrelevant, and the results are clearly biased toward keyword hits. Cause: After merging, the scope is large, reranking score filtering was not used, and similarity filtering appears to have failed.

## How to verify the setup

Acceptance for this feature: compare the order and scores of the top three before and after enabling reranking, record the number of candidates and scores, and check the changes in order and scores before and after reranking.

Business test: ask a basis question that spans materials, see whether the answer provides a traceable source, and check the number of citations and the tokens of the cited text and record them separately.

- In the search parameters, check `searchMode` and `usingReRank`, confirm that both path switches and reranking are enabled, and view the current values of `similarity` and `limit`.
- Refer back to the original text item by item, check the fields, dates, and signatures of the medical examination form, re-examination application, and notification of restricted majors, confirm that the version is current, and record the number of candidates and scores.
