---
title: Reranking and Hybrid Retrieval for Initial Review of Academic Journal Submissions: Find Supporting Evidence
slug: /en/industry/education-d001-c066-f018
page_type: 行业问题页
application_area: education
meta_title: Journal Submissions | Reranking | Evidence
meta_description: Journal Submissions: review reranking for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Reranking and Hybrid Retrieval for Initial Review of Academic Journal Submissions: Find Supporting Evidence

## What this category's data looks like

In the initial review stage of academic journal submissions, the materials usually include the submitted manuscript, the author information form, and the plagiarism check report. The manuscript carries the main text and references, the author information form records authorship, affiliation, funding, and contact details, and the plagiarism check report gives duplicate sources and paragraph markers. The three types of materials enter the system with the submission batch, and the update cadence advances with the initial review rounds. It is common for the same record to have mismatched names, quantities, or dates across two materials, for versions not to be synchronized, and for signatures or receipts to be missing. When entering the reranking and hybrid retrieval feature, the manuscript and the author information form serve as the basis sources, while the plagiarism check report serves as corroborating evidence; each retains its original paragraph and field positions for later citation trimming and answer generation back-references.

## Configuration and implementation checks

This step is executed by the reranking model in the retrieval service, which outputs the sorted candidates and rerank scores. The "basis entries that can back-reference the original text" are then completed by citation trimming and answer generation. Hybrid retrieval runs both the vector and full-text paths simultaneously and merges the results; after merging, the scope is large and similarity filtering cannot be applied directly, so the reranking model is usually used again to sort and filter by rerank score.

| Object | Check | Verification action |
| --- | --- | --- |
| Submitted manuscript | The main text and reference paragraphs can be matched to the original text, and the version is the current draft | Check whether `searchMode` enables both the vector and full-text paths, and see whether candidates come from both paths |
| Author information form | The authorship, affiliation, funding, and contact fields are consistent with the manuscript, and dates and signatures are complete | Compare the order and scores before and after reranking, record the number of candidates and scores, and check whether `usingReRank` is bound |
| Plagiarism check report | The duplicate sources and paragraph markers can back-reference the original manuscript text, and the receipt is complete | Check the `similarity` threshold and the `limit` number of candidates, and see whether the top few are relevant |
| Hybrid retrieval results | The two paths' results have been merged, candidates come from both paths, and they can back-reference the original text | View the number of candidates and scores after rerank-score filtering, check the tokens of the cited text, and record the array count separately |

## Three common errors

- Symptom: the same record has mismatched names, quantities, or dates between the manuscript and the author information form. Cause: the two materials were not synchronized to the same version, and the field sources are independent of each other.
- Symptom: the plagiarism check report version is not synchronized, and the paragraph markers are inconsistent with the current draft. Cause: the manuscript was modified again after the report was generated, and the receipt was not updated.
- Symptom: there are many candidates but the top few are irrelevant, and the results are clearly biased toward keyword hits. Cause: after hybrid retrieval merging, the scope is large and rerank-score filtering was not used.

## How to verify the setup

Feature acceptance: compare the order and scores of the top three before and after enabling reranking, check the changes in the number of candidates and scores, and confirm that `usingReRank` is bound and used for sorting and filtering.

Business test: ask a basis question that spans materials, see whether the answer gives a back-referenceable source, and check that the tokens of the cited text and the array count are recorded separately.

- In the search parameters, check the two-path switches of `searchMode`, confirm that both the vector and full-text paths are enabled, and then see whether candidates come from both paths.
- Compare the order and scores before and after reranking, record the number of candidates and scores, and check the current state of `usingReRank`, `similarity`, and `limit`.
