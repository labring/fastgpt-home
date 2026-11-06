---
title: Reranking and Hybrid Retrieval for Undergraduate Program Establishment and Adjustment: Find Supporting Evidence
slug: /en/industry/education-d001-c017-f018
page_type: 行业问题页
application_area: education
meta_title: Undergraduate Programs | Reranking | Evidence
meta_description: Undergraduate Programs: review reranking for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Reranking and Hybrid Retrieval for Undergraduate Program Establishment and Adjustment: Find Supporting Evidence

## What this category's data looks like

This page addresses the category of undergraduate program setup and dynamic adjustment. The materials come from three types of on-campus documents: program setup application forms, talent cultivation plans, and expert review opinions. The update cadence is synchronization by academic year or by batch: application forms are submitted with the application batch, cultivation plans are updated with revised versions, and review opinions are updated with review meeting sessions. In terms of field characteristics, the application form contains the program name, code, degree-granting category, program duration, enrollment scale, signature, and date; the cultivation plan contains the curriculum system, credit structure, practical components, version number, and effective date; the review opinions contain the expert list, review conclusion, signature, and receipt. When the materials enter the hybrid retrieval and reranking function, the three document streams each serve as candidate sources, the reranking model uniformly sorts the merged candidates, and citation trimming and answer generation then use the reranking score to filter out evidence items that can be traced back to the original text, for use in replying to parents or writing into plans.

## Configuration and implementation checks

This step is executed by the reranking model in the retrieval service, which outputs the sorted candidates and reranking scores. The "evidence items that can be traced back to the original text" are then completed by citation trimming and answer generation. Hybrid retrieval simultaneously runs the vector and full-text paths and merges the results. After merging, the scope is large and similarity filtering cannot be applied directly, so the reranking model is usually then used to sort and filter by reranking score.

| Object | Check | Verification action |
| --- | --- | --- |
| Program setup application form | Fields include program name, code, degree-granting category, program duration, enrollment scale, signature, and date; the name, quantity, and date in the same record in the cultivation plan must match | Verify the program name and code against the original application form, then compare item by item with the cover of the cultivation plan; check whether the signature and date fields are complete and whether the receipt is fully attached |
| Talent cultivation plan | Fields include curriculum system, credit structure, practical components, version number, and effective date; the version must be the current version | Verify whether the version number and effective date are the current ones, then compare with the program duration and enrollment scale listed in the application form; check whether the revision record and approval signature are synchronized |
| Expert review opinions | Fields include expert list, review conclusion, signature, and receipt; the conclusion must point to the same program record as the application form and cultivation plan | Verify the expert list and review conclusion, then compare with the program name in the application form and the version number in the cultivation plan; check whether the signature and receipt are missing |
| Hybrid retrieval and reranking | Both the vector and full-text paths are enabled and merged, and the reranking model is bound and used for sorting and filtering | In the search parameters, verify the switches for both paths and `searchMode`, compare the number of candidates and scores before and after reranking, and filter by reranking score; check whether the values of `usingReRank`, `similarity`, and `limit` match the candidate scale |

## Three common errors

- Symptom: the name or enrollment quantity of the same program does not match between the application form and the cultivation plan. Cause: the two materials were filled in by different handlers, no field-level comparison was made before submission, and the date conventions are also inconsistent.
- Symptom: the cultivation plan version is not synchronized, and retrieval still hits the old curriculum system. Cause: after revision, the current on-campus file was not replaced, the version number and effective date were not updated, and the reranking score cannot distinguish old from new.
- Symptom: the expert review opinions lack a signature or receipt, and although candidates are recalled, they cannot be traced back to the original text. Cause: the review meeting session materials were not archived completely, and during citation trimming, the verifiable signature page and receipt page cannot be found.

## How to verify the setup

Acceptance of this function: compare the order and scores of the top three items before and after enabling reranking, check whether the number of candidates and the reranking scores change, and confirm that `usingReRank` is enabled and that the values of `similarity` and `limit` match the candidate scale.

Business test: ask a cross-material evidence question and see whether the answer gives traceable sources, for example whether the program name, version number, and signature date can respectively point to the original sections of the application form, cultivation plan, and review opinions.

- In the search parameters, verify the switches for the vector and full-text paths and `searchMode`, confirm that both result sets have been merged, and then compare the number of candidates and scores before and after reranking.
- Check the program name, quantity, date, version number, signature, and receipt in the application form, cultivation plan, and expert review opinions one by one, mark the items that do not match, and trace them back to the original page numbers.
