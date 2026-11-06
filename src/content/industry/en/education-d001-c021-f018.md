---
title: Reranking and Hybrid Retrieval for Enrollment Changes and Graduation Eligibility: Find Supporting Evidence
slug: /en/industry/education-d001-c021-f018
page_type: 行业问题页
application_area: education
meta_title: Graduation Eligibility | Reranking | Evidence
meta_description: Graduation Eligibility: review reranking for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Reranking and Hybrid Retrieval for Enrollment Changes and Graduation Eligibility: Find Supporting Evidence

## What this category's data looks like

This page addresses the category of student status changes and graduation eligibility review. Materials include leave/resumption applications, major transfer applications, and graduation review checklists. Leave/resumption applications contain the change type, effective date, signature field, and receipt; major transfer applications contain the names of the transfer-in and transfer-out majors, assessment conclusion, date, and signature; graduation review checklists contain course names, credit counts, review conclusion, and signature. The three types of materials are updated by semester batch, and the current effective version prevails. When entering this function, leave/resumption applications and major transfer applications serve as candidates for change basis, while graduation review checklists serve as candidates for eligibility determination. Each retains the original paragraphs and metadata for subsequent citation trimming and answer generation to refer back to the original text.

## Configuration and implementation checks

The reranking model in the retrieval service only outputs the sorted candidates and reranking scores; the basis entries that can refer back to the original text must be handled next by citation trimming and answer generation. Hybrid retrieval simultaneously runs the vector and full-text paths and merges the results. After merging, the scope is large and similarity filtering cannot be applied directly; typically the reranking model is then used to sort and filter by reranking score.

| Object | Check | Verification action |
| --- | --- | --- |
| Leave/resumption application | Fields include change type, effective date, signature, and receipt, and are consistent with the current version | Check `searchMode` and `usingReRank` in the search parameters to confirm both paths are enabled and bound to the reranking model |
| Major transfer application | The names of the transfer-in and transfer-out majors, assessment conclusion, date, and signature can be traced back to the original text | Compare the number of candidates and scores before and after reranking to see whether the top few come from both the vector and full-text paths |
| Graduation review checklist | Course names, credit counts, review conclusion, and signature are consistent in the current version | Use `similarity` and `limit` to control the candidate scope, and check the tokens and array count of the cited text one by one |
| Reranking model | Bound and used for sorting and filtering, and scores can be used for filtering | Compare the ordering and scores before and after reranking to confirm that the number of candidates and score changes are reasonable |

## Three common errors

- Symptom: The name, quantity, or date of the same record does not match across two materials. Cause: Change applications and review checklists are maintained separately, and no cross-material field comparison was performed.
- Symptom: Cited entries point to old-version materials. Cause: Versions were not synchronized, and the current effective version was not updated into the candidates with the batch.
- Symptom: Basis entries lack a signature or receipt. Cause: Scanned materials are incomplete, and the signature field and receipt were not validated during field extraction.

## How to verify the setup

This function's acceptance: compare the order and scores of the top three before and after enabling reranking, and check the number of candidates and score changes.

Business test: ask a cross-material basis question and see whether the answer provides traceable sources.

- Check `searchMode`, `usingReRank`, `similarity`, and `limit` in the search parameters to confirm the switch status of both paths and the reranking binding status.
- Check the tokens and array count of the cited text one by one, record them separately, and do not compare the number of citations with the citation content budget as equal.
