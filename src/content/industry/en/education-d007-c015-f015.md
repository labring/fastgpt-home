---
title: Knowledge Base Retrieval for School Mental Health Screening and Referrals: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c015-f015
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | Retrieval | Review
meta_description: Student Mental Health: review retrieval for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for School Mental Health Screening and Referrals: Trace Exceptions and Review Results

## What this category's data looks like

In the scenario of mental health screening and referral in primary and secondary schools, materials include psychological screening plans, interview records, referral forms, and receipts. The screening plan provides scale dimensions, administration dates, and responsible persons; interview records document student status, interview dates, and interviewer signatures; referral forms list the reason for referral, the receiving party, and the receipt status. These materials enter the knowledge base in document or table form, are indexed by the retrieval node, and are made available for recall. The update cadence is semester- or event-driven: centralized ingestion after the new student census, and supplementary entry at any time for daily referrals. Field characteristics are concentrated in four categories: names, quantities, dates, and signatures. The same record often appears in different materials with inconsistent name spellings, different quantity definitions, and misaligned dates. When entering this feature, the screening plan provides the basis for judgment, interview records provide process evidence, and referral forms and receipts provide destination evidence; together, the three support exception tracing.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The exception list and review conclusions are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Psychological screening plan | The scale dimensions, administration date, and responsible person fields are complete, and can correspond to the same student identifier in the interview records | In the search test, use a combination of student identifier and date to search, check whether the plan fields in the returned candidates are consistent with the interview records, and record the number of candidates and the score |
| Interview records | The interview date, interviewer, and signature fields are complete, and the same record name is consistent with the spelling in the screening plan | Switch `searchMode` to semantic, full-text, or hybrid, compare whether the candidates include both types of materials, and check whether the signature field is missing |
| Referral form and receipt | The reason for referral, receiving party, and receipt status fields are complete, and the date chain connects with the interview records | Search using the reason for referral keywords, check whether the receipt is recalled together with the referral form, and record the `similarity` score and the number of candidates |
| Retrieval parameters | After `usingReRank` is enabled, the top candidates are closer to the query intent, and after `limit` trimming, key chunks of the original text are still retained | Compare the order of the top candidates before and after enabling rerank, separately record the number of items in the citation array, and check whether the tokens of the cited text are within budget |

## Three common errors

- Symptom: The same student has different name spellings in the screening plan and interview records, so they cannot be matched during tracing. Cause: Entry did not unify identifiers, and field comparison was not performed after retrieval hits.
- Symptom: The referral form date is earlier than the interview record date, breaking the time chain. Cause: Versions were not synchronized, and the original record date was not corrected during supplementary entry.
- Symptom: The receipt is missing or the signature column is empty, so the review conclusion lacks evidence. Cause: The referral process was not closed-loop, and signature and receipt fields were not validated when materials were ingested.

## How to verify the setup

Feature acceptance: test once each with synonym-rewritten questions, compare candidates and scores, then toggle rerank on and off to observe the ordering of the top candidates.

Business test: create an exception record and see whether the source material can be traced.

- In the search test, fix the question, switch `searchMode`, and record the number of candidates and the `similarity` score, checking whether the returned candidates cover the screening plan, interview records, and referral form.
- Run once before and after enabling `usingReRank`, separately record the number of items in the citation array, and check whether the cited text tokens exceed the budget, confirming that `limit` trimming did not lose key chunks.
