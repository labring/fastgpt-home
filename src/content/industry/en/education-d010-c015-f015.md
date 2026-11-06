---
title: Knowledge Base Retrieval for School Mental Health Screening and Referrals: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c015-f015
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | Retrieval | Operations
meta_description: Student Mental Health: review retrieval for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for School Mental Health Screening and Referrals: Coordinate Operations and Application Handover

## What this category's data looks like

This page addresses the primary and secondary school mental health screening and referral scenario. Material sources include three categories: psychological screening plans, interview records, and referral forms, with an update cadence that rolls forward by semester and by case milestone. Screening plans provide scale names, screening dates, and class counts; interview records carry student names, interview times, and interviewer signatures; referral forms record referral destinations, receipts, and receiving signatures. When these three categories of material enter the knowledge base retrieval and recall function, they serve respectively as retrieval corpus and verification basis: screening plans and interview records are used to compare the names, counts, and dates of the same record; referral forms are used to verify whether signatures and receipts are complete. During the deployment, operations, and application handover stage, material versions and retrieval candidates must remain traceable, so that items can be checked one by one at shift handover.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after mode, merge, rerank, filter, and limit trimming). The handover-ready deployment status and operation records are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Psychological screening plan | The scale names, screening dates, and class counts in the plan correspond item by item with the interview records and referral forms, and the dates and counts are consistent | In the knowledge base search test, switch `searchMode`, compare the number of candidates and scores returned by the semantic, full-text, and hybrid modes, and record the differences |
| Interview record | The student names, interview times, and interviewer signatures in the interview record are consistent with the screening plan roster and the referral form recipient | Turn rerank on and off, compare the order of the top few candidates; check whether the key original text snippets retained after `similarity` filtering contain signatures and dates |
| Referral form | The referral destination, receipt status, and receiving signature correspond with the interview record conclusions and screening plan conclusions, with no missing items | After `limit` trimming, record the tokens and array count of the cited text separately; check item by item whether signatures and receipts are complete |
| Deployment status and operation records | Version, connection, and task records are consistent, and retrieval candidates can correspond to material versions | Check item by item once according to the handover sheet, and see which record is missing; check the `usingReRank` switch state and the sorting records before and after rerank |

## Three common errors

- Symptom: The name or count of the same student does not match between the screening plan and the interview record, and the referral form date is inconsistent with the interview time. Cause: Material versions are not synchronized, and retrieval candidates are not aligned by version.
- Symptom: The referral form lacks a receiving signature or receipt, and it cannot be confirmed at handover whether the referral was completed. Cause: Items were missed in the material archiving step, and retrieval recall did not cover the signature field.
- Symptom: The same question cannot be recalled when rephrased, and although there are many candidates, the ones ranked at the top are all irrelevant. Cause: The retrieval mode does not match the material form, rerank is not enabled, or similarity filtering is too strict.

## How to verify the setup

Acceptance of this function: Test once each with synonym-rewritten questions, compare candidates and scores, then turn rerank on and off to observe the ordering of the top few; check the three records `searchMode`, `similarity`, and `usingReRank`.

Business test: Check item by item once according to the handover sheet, and see which record is missing; check whether the fields, dates, and signatures of the screening plan, interview record, and referral form are consistent.

- In the knowledge base search test, switch retrieval modes, compare the number of candidates and scores, and record the values of `searchMode` and `similarity`.
- Turn rerank on and off, compare the order of the top few candidates, and record the `usingReRank` state and the number of cited items after `limit` trimming.
