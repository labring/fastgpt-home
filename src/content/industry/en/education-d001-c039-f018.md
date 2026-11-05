---
title: Reranking and Hybrid Retrieval for Exam Organization and Misconduct Handling: Find Supporting Evidence
slug: /en/industry/education-d001-c039-f018
page_type: 行业问题页
application_area: education
meta_title: Exam Administration | Reranking | Evidence
meta_description: Exam Administration: review reranking for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Reranking and Hybrid Retrieval for Exam Organization and Misconduct Handling: Find Supporting Evidence

## What this category's data looks like

This page addresses exam administration and violation handling scenarios, and the materials include three types: exam administration manuals, examination room records, and violation fact records. Exam administration manuals specify the organizational process and handling basis; examination room records record the time, location, invigilators, and abnormal situations session by session; violation fact records register the person involved, behavior description, and handling opinion item by item. All three types of materials carry version numbers, effective dates, and signature fields, and each enters retrieval as an independent candidate source: exam administration manuals provide rule provisions, examination room records provide session facts, and violation fact records provide case evidence. In terms of update cadence, exam administration manuals are re-versioned as regulations are revised, while record sheets and fact records are generated one by one by session and event. There are situations where the same event has inconsistent names, quantities, or dates across the two materials, as well as unsynchronized versions, missing signatures, or missing receipts, so retrieval results must retain traceable original sources.

## Configuration and implementation checks

This step is performed by the reranking model in the retrieval service, which outputs ranked candidates and rerank scores. "Basis items that can be traced back to the original text" are then completed by citation trimming and answer generation. Hybrid retrieval runs both the vector and full-text paths and merges the results; after merging, the scope is large and similarity filtering cannot be applied directly, so a reranking model is usually then used to sort and filter by rerank score.

| Object | Check | Verification action |
| --- | --- | --- |
| Hybrid retrieval | Both the vector and full-text paths are enabled, and candidates come from both paths | Check the switches for both paths in the search parameters, inspect the value of `searchMode`, and confirm whether the candidate sources cover both types of materials |
| Reranking model | It is bound and used for sorting and filtering, and the order and scores before and after reranking can be compared | Record the number of candidates and scores before reranking, then record the order and rerank scores of the top few after reranking, and check whether `usingReRank` is in effect |
| Exam administration manual | The version is the current one, the provisions match the original text, and the effective date and signatures are complete | Check the version number and effective date, inspect the signature field and receipt, and confirm that the names, quantities, and dates of the provisions match those in the examination room records and violation fact records |
| Examination room records and violation fact records | The names, quantities, and dates of the same event match across the two materials, and signatures and receipts are not missing | Compare the event names, quantities, and dates in the two materials session by session, check signatures and receipts, and confirm that the items can be traced back to the original text |

## Three common errors

- Symptom: the names, quantities, and dates of the same record do not match between the examination room records and the violation fact records. Cause: the two materials are entered separately without cross-checking, and retrieval results are returned independently.
- Symptom: the provisions of the exam administration manual have been re-versioned, but retrieval still returns the old-version basis. Cause: versions are not synchronized, old-version materials have not been removed, and candidates are not distinguished by effective date.
- Symptom: basis items lack signatures or receipts and cannot serve as evidence for replying to parents. Cause: the signature fields in the record sheets and fact records are not filled in or the receipts are not archived, and retrieval only takes the body text without verifying signature status.

## How to verify the setup

Acceptance for this feature: compare the order and rerank scores of the top three before and after enabling reranking, record the number of candidates, `limit`, and the changes before and after `similarity` filtering, and confirm that `usingReRank` is in effect and that scores are used for filtering.

Business test: ask a basis question that spans materials, see whether the answer gives traceable sources, check the names, quantities, dates, and signature receipts, and confirm that the tokens and array item count of the cited text are recorded separately.

- Check the switches for the vector and full-text paths in the search parameters, inspect `searchMode` and `usingReRank`, and record the number of candidates and scores before and after reranking.
- Compare the names, quantities, and dates in the examination room records and violation fact records session by session, and check the exam administration manual's version number, effective date, signatures, and receipts.
