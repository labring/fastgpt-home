---
title: Knowledge Base Retrieval for Off-Campus Training Registration and Compliance: Find Supporting Evidence
slug: /en/industry/education-d001-c045-f015
page_type: 行业问题页
application_area: education
meta_title: Training Compliance | Retrieval | Evidence
meta_description: Training Compliance: review retrieval for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Off-Campus Training Registration and Compliance: Find Supporting Evidence

## What this category's data looks like

In the off-campus training compliance filing and penalty response scenario, materials are concentrated in three categories: school operating licenses, course filing materials, and fee disclosure. A school operating license contains the approving authority, validity period, operating content, and signature; course filing materials contain the course name, class hours, instructor, and filing date; fee disclosure contains fee items, standards, refund methods, and disclosure receipt. The update cadence is that after a license is reissued, course filing is synchronized, and fee disclosure is updated monthly or quarterly. When these three categories of materials enter the knowledge base retrieval service, they participate in recall in the role of candidate snippet sources: the license provides the basis for subject qualification, course filing provides the basis for course compliance, and fee disclosure provides the basis for fee compliance. In terms of field characteristics, the name, quantity, and date of the same record in two materials may not match, and versions may not be synchronized or signatures and receipts may be missing, causing basis entries to be unable to point back to the original text.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after pattern, merge, rerank, filter, and limit trimming). Basis entries that can point back to the original text are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| School operating license | The approving authority, validity period, operating content, and signature fields are complete, and the subject name matches that in the course filing materials | In the search test, switch `searchMode` to semantic, full-text, or hybrid, compare candidate snippets and scores, and check the signature and date in the original license text |
| Course filing materials | The course name, class hours, instructor, and filing date fields are complete, and the course name and quantity match those in the fee disclosure | Test once each with synonymous rewritten questions, observe the number of candidates and scores, and compare the ranking of the top few items before and after enabling `usingReRank` |
| Fee disclosure | The fee items, standards, refund methods, and disclosure receipt fields are complete, and the subject name and date match those in the school operating license | Adjust the `similarity` filter threshold, record the number of candidates and scores, check the tokens and array count of the quoted text, and confirm that key snippets of the original text are still retained after `limit` trimming |

## Three common errors
- Symptom: The name, quantity, and date of the same course in two materials do not match, and the basis entry cannot point back. Cause: Cross-material field verification was not performed during material entry, and versions were not synchronized.
- Symptom: The school operating license has been reissued, but the course filing materials are still the old version, and the candidate snippets returned by retrieval are inconsistent with the current materials. Cause: The update cadence was not aligned, and the old version was not removed in time.
- Symptom: The fee disclosure lacks a signature or receipt, and although the candidate snippet is recalled, it cannot serve as an effective basis. Cause: Material archiving is incomplete, and no completeness check was performed before retrieval.

## How to verify the setup

Acceptance for this feature: test once each with synonymous rewritten questions, compare candidates and scores, then toggle rerank on and off to observe the ranking of the top few items; at the same time, record the number of candidates and scores, and check the effects of `searchMode`, `usingReRank`, `similarity`, and `limit`.

Business test: ask a cross-material basis question and see whether the answer provides a traceable source.

- In the knowledge base search test, for the same question, test once each with synonymous rewritten questions, record the number of candidates and scores, and switch `searchMode` to compare recall differences.
- Enable and disable `usingReRank` to compare changes in the ranking of the top few items; adjust `similarity` and `limit`, check the tokens and array count of the quoted text, and confirm that key snippets of the original text are still retained after trimming.
