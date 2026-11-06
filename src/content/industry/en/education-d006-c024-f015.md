---
title: Knowledge Base Retrieval for Graduate Admissions Interviews and Selection: Track Progress and Check Statistics
slug: /en/industry/education-d006-c024-f015
page_type: 行业问题页
application_area: education
meta_title: Graduate Admissions | Retrieval | Progress
meta_description: Graduate Admissions: review retrieval for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Graduate Admissions Interviews and Selection: Track Progress and Check Statistics

## What this category's data looks like

This page focuses on progress records and statistical verification for graduate admissions re-examination and admission. Source materials include the re-examination plan, candidate score sheets, transfer lists, and progress records summarized weekly. The re-examination plan provides process nodes, dates, and signature fields; the candidate score sheets carry the preliminary examination and re-examination score fields; the transfer lists record transfer batches, destinations, and receipt status. When these three types of materials enter knowledge base retrieval and recall, each plays a different role: the re-examination plan provides the basis for process and statistical criteria, the candidate score sheets provide the working draft for verifying quantities and scores, and the transfer lists provide clues for list consistency and signature receipts. The update rhythm advances by admissions batch, with one concentrated update before the re-examination, one during the re-examination, and one before and after the proposed admission announcement. Fields are mainly candidate number, name, major, date, quantity, and signature. The name, quantity, and date of the same record may not match across different materials. When versions are not synchronized or signature receipts are missing, it is necessary to return to the hit snippets and related materials and verify item by item.

## Configuration and implementation checks

This step is performed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after pattern, merge, rerank, filter, and upper-limit trimming). The "progress table and statistical criteria description" is completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Re-examination plan | Whether the fields, dates, and signatures are consistent with the progress records | In the search test, switch `searchMode`, compare semantic, full-text, and hybrid recall, check the dates and signature fields in the plan snippets, and record the number of candidates and scores |
| Candidate score sheets | Whether the name, quantity, and date of the same candidate match between the score sheets and the progress table | Use the candidate number or name for synonym-rewritten retrieval, verify the score fields and totals in the hit snippets, record the array count separately, and when the reference upper limit is involved, look only at the reference text tokens |
| Transfer lists | Whether the list, dates, and receipts of the transfer lists and progress records are consistent | Compare the ranking of the first few items before and after enabling `usingReRank`, check whether the list snippets contain signatures or receipts, and if necessary adjust `limit` to observe candidate trimming |
| Progress table and statistical criteria description | Whether the header states the statistical criteria and exceptions, and whether the record count and statistical count match | Use one week's records to verify the totals, and check item by item whether the criteria, exceptions, and signature receipts are clearly stated |

## Three common errors

- Symptom: The name or quantity of the same candidate does not match between the score sheets and the progress table. Cause: The versions of the two materials are not synchronized, or the field criteria differ at entry.
- Symptom: The dates of the transfer lists and progress records are inconsistent, and receipts are missing. Cause: After the list was updated, it was not written back to the progress table, and signatures or receipts were not archived.
- Symptom: There are many candidates but the ones ranked first are all irrelevant, and the answer lacks key paragraphs. Cause: The retrieval mode does not match the material form, or rerank and similarity filtering are not enabled.

## How to verify the setup

Feature acceptance: test once each with synonym-rewritten questions, compare candidates and scores, then toggle rerank on and off to see the ranking of the first few items; at the same time switch `searchMode`, observe the impact of `similarity` and `limit` on the number of candidates, and verify the order before and after `usingReRank`.

Business testing: use one week's records to verify the totals and see whether the criteria and exceptions are clearly stated; the record count and statistical count should match, the criteria should be written in the header, and then it can go into the weekly or monthly report.

- In the knowledge base search test, test once each with synonym questions, record the number of candidates and scores, and compare the order of the first few items before and after enabling rerank.
- Use one week's records to verify the totals, check the fields, dates, and signatures of the re-examination plan, candidate score sheets, and transfer lists, and write the criteria and exceptions into the header.
