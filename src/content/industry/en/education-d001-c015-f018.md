---
title: Reranking and Hybrid Retrieval for School Mental Health Screening and Referrals: Find Supporting Evidence
slug: /en/industry/education-d001-c015-f018
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | Reranking | Evidence
meta_description: Student Mental Health: review reranking for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Reranking and Hybrid Retrieval for School Mental Health Screening and Referrals: Find Supporting Evidence

## What this category's data looks like

This category involves three types of materials: psychological screening plans, interview records, and referral forms. Screening plans record the scale name, screening date, screening target scope, and the signature of the person in charge; interview records record the interview time, interviewee, problem description, and the interviewer's signature; referral forms record the referral target, reason for referral, receiving party, and receipt signature. The three types of materials are updated by semester or academic year, and the version is determined by date and signature. When entering this function, the screening plan serves as the source of the screening basis, the interview record serves as a supplement to the individual situation, and the referral form serves as the voucher for the referral action, each taking on the roles of basis items, process records, and result receipts. When material fields are inconsistent, the current version with complete signatures prevails, making it easier to refer back to the original text.

## Configuration and implementation checks

This step is performed by the reranking model in the retrieval service, which outputs the sorted candidates and rerank scores. "Basis items that can be traced back to the original text" are then completed by citation trimming and answer generation. Hybrid retrieval simultaneously runs vector and full-text paths and merges the results. After merging, the scope is large and similarity filtering cannot be directly applied, so a reranking model is usually used to sort and filter by rerank score.

| Object | Check | Verification action |
| --- | --- | --- |
| Hybrid retrieval | Both vector and full-text paths are enabled, and the results from both paths have been merged | Check the switches for both paths in the search parameters, see whether candidates come from both paths at the same time, and record the number of candidates and scores |
| Reranking model | Bound and used for sorting and filtering; the order and scores before and after reranking can be compared | Compare the order and scores before and after reranking, check the values of `usingReRank` and `searchMode`, and record the number of candidates and scores |
| Psychological screening plan | The scale name, screening date, and signature of the person in charge in the screening plan match the current version | Check the plan fields, date, and signature, and confirm consistency with the names, quantities, and dates in the interview records and referral forms |
| Referral form | The referral target, reason for referral, and receipt signature in the referral form match the original text | Check the referral form fields, date, and signature, confirm the receipt is complete, and cross-check with the screening plan and interview records |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the screening plan and the interview record. Cause: The two materials are updated separately without cross-checking, so the basis items cannot refer back to the same original text.
- Symptom: The referral form lacks a signature or receipt, and the version is not synchronized. Cause: The referral process is not closed-loop, the old version is still retrieved, and the current version and historical version are mixed.
- Symptom: There are many candidates but the top few are irrelevant, and the results are clearly biased toward keyword hits. Cause: After merging, the scope is large, rerank score filtering is not used, and similarity filtering appears to fail.

## How to verify the setup

Acceptance for this function: compare the order and scores of the top three before and after enabling reranking, check the values of `usingReRank`, `searchMode`, `similarity`, and `limit`, record changes in the number of candidates and scores, and confirm that the top three are more relevant after reranking.

Business test: ask a basis question that spans materials, see whether the answer gives traceable sources, and check the number of citations and citation text tokens; record the array length separately.

- Check the switches for both paths in the search parameters, confirm that both vector and full-text paths are enabled, and see whether candidates come from both paths at the same time.
- Compare the order and scores before and after reranking, filter by rerank score, check the values of `usingReRank` and `similarity`, and record the number of candidates and scores.
