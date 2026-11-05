---
title: Reranking and Hybrid Retrieval for Training Provider Admissions and Inquiry Follow-Up: Find Supporting Evidence
slug: /en/industry/education-d001-c043-f018
page_type: 行业问题页
application_area: education
meta_title: Training Admissions | Reranking | Evidence
meta_description: Training Admissions: review reranking for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Reranking and Hybrid Retrieval for Training Provider Admissions and Inquiry Follow-Up: Find Supporting Evidence

## What this category's data looks like

In the enrollment consultation conversion scenario for training institutions, the materials entering the business evidence query mainly fall into three categories: enrollment brochures, consultation records, and trial class schedules. Enrollment brochures are updated by class term and include course name, number of class hours, fee basis, refund terms, and date of issuance; consultation records are retained by consultation round and include parent concerns, commitment basis, follow-up status, and consultant signature; trial class schedules are arranged weekly and include trial time, instructor, classroom, and visit receipt. When the three types of materials enter hybrid retrieval, each plays a different role: enrollment brochures serve as the external commitment basis draft, consultation records serve as process traces, and trial class schedules serve as visit evidence. During querying, the two retrieval paths are recalled and then merged, resulting in a large candidate range, which requires the reranking model to sort by rerank score and filter, after which citation trimming and answer generation produce evidence items that can point back to the original text. In terms of update rhythm, brochures change versions with class terms, consultation records are appended with each communication, and trial class schedules roll forward with scheduling; fields and signature status need to be checked item by item.

## Configuration and implementation checks

This step is executed by the reranking model in the retrieval service, which outputs the sorted candidates and rerank scores. The "evidence items that can point back to the original text" are then completed by citation trimming and answer generation. Hybrid retrieval simultaneously runs the vector and full-text paths and merges the results; after merging, the range is large and similarity filtering cannot be applied directly, so the reranking model is usually then used to sort and filter by rerank score.

| Object | Check | Verification action |
| --- | --- | --- |
| Enrollment brochure | The class term, course name, number of class hours, fee basis, refund terms, and date of issuance must match the current version, and signatures or seals must be complete | Check the two-path switches for `searchMode` in the search parameters, confirm that both vector and full-text are enabled, and compare against the brochure's date of issuance and class term |
| Consultation record | The name, quantity, and date of the same record must match across the two materials, and the consultant signature and receipt must not be missing | Compare the ordering and scores before and after reranking, check whether candidates come from both paths at the same time, and verify the consultation records and brochure basis item by item |
| Trial class schedule | The trial time, instructor, classroom, and visit receipt must be consistent with the visit date in the consultation record; those whose versions are not synchronized must be marked | After binding `usingReRank`, filter by rerank score, record the number of candidates and scores, and then verify the trial schedule and consultation record dates |
| Hybrid retrieval candidates | The two-path results have been merged; the number of candidates and rerank scores can be recorded, and similarity filtering does not take effect directly | Check the `similarity` and `limit` settings, and see whether the merged candidates come from both the vector and full-text paths at the same time |

## Three common errors

- Phenomenon: The course name and number of class hours for the same record do not match between the enrollment brochure and the consultation record. Cause: After the brochure changed versions, the consultation record was not synchronized, and the unsynchronized versions led to divergent commitment bases.
- Phenomenon: The visit date in the trial class schedule is inconsistent with the visit date in the consultation record. Cause: After the schedule was rolled forward, the old record was not backfilled, so the dates in the two materials do not match.
- Phenomenon: The consultation record lacks a consultant signature or the trial visit lacks a receipt, so the evidence item cannot point back. Cause: The process traces are incomplete, and signatures and receipts were not completed along with the communication.

## How to verify the setup

Acceptance for this feature: compare the order and scores of the first three items before and after enabling reranking, check the number of candidates and changes in rerank scores, and confirm that `usingReRank` has been used for sorting and filtering.

Business test: ask a cross-material evidence question and see whether the answer provides a traceable source.

- Check `searchMode` in the search parameters, confirm that both vector and full-text paths are enabled, and record the number of merged candidates and rerank scores.
- Compare the ordering and scores before and after reranking, and verify item by item the names, quantities, dates, and signature receipts of the enrollment brochures, consultation records, and trial class schedules.
