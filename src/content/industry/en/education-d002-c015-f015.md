---
title: Knowledge Base Retrieval for School Mental Health Screening and Referrals: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c015-f015
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | Retrieval | Checks
meta_description: Student Mental Health: review retrieval for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for School Mental Health Screening and Referrals: Compare Documents and Locate Differences

## What this category's data looks like

This page addresses the category of primary and secondary school mental health screening and referral. Materials come from three types: screening plans, interview records, and referral forms. Screening plans are updated per semester and include screening subjects, scale names, implementation dates, and signatures of persons in charge; interview records are generated per session and include student names, interview dates, interviewers, and signatures; referral forms are issued as needed and include referral subjects, referral reasons, referral dates, and receipts from receiving parties. When the three types of materials enter knowledge base retrieval, each participates in recall as an independent source fragment. Screening plans provide the field baseline, while interview records and referral forms provide individual records, used to compare whether the name, quantity, date, and signature of the same subject are consistent across two materials, and to locate version discrepancies and missing items.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The discrepancy list is completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Mental health screening plan | Screening subject name, scale name, implementation date, and signature of person in charge are consistent between the plan and the ledger | Retrieve plan fragments using synonymous questions, verify name, date, and signature fields, and record the number of candidates and scores |
| Interview record | Student name, interview date, and interviewer signature are consistent between the record and the referral form | Retrieve interview records, switch `searchMode` to compare semantic, full-text, and hybrid candidates, and verify dates and signatures |
| Referral form | Referral subject, referral reason, referral date, and receipt from receiving party are consistent with the ledger | Retrieve referral forms, view candidates after `similarity` filtering, and verify receipt fields and version synchronization status |
| Knowledge base retrieval service | Candidate fragments and similarity scores are returned after pattern, merge, rerank, filter, and limit trimming | Toggle rerank on and off in the search test, compare the ranking of the top few results; separately record the array length and the tokens of cited text after `limit` trimming |

## Three common errors

- Symptom: The name or date of the same student does not match between the interview record and the referral form. Cause: The two materials are entered separately, without field-level comparison and version synchronization.
- Symptom: After the screening plan is updated, the interview record still references the old scale name or old implementation date. Cause: The version is not synchronized, and retrieval hits old fragments.
- Symptom: The referral form lacks the receipt from the receiving party or the interview record lacks a signature. Cause: When archiving materials, signature and receipt fields are not verified, and retrieval only returns candidates.

## How to verify the setup

Acceptance of this feature: Test once each with synonymously rewritten questions, compare candidates and scores, then toggle rerank on and off to observe the ranking of the top few results, and record the number of candidates and scores.

Business test: Use one real record to find fields inconsistent with the ledger, submit to the reviewer for confirmation and write back.

- In the search test, switch `searchMode` to compare candidate fragments and scores across semantic, full-text, and hybrid modes.
- View the number of candidates after `similarity` filtering, and separately record the array length and the tokens of cited text after `limit` trimming.
