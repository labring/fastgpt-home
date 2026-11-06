---
title: Citations and Source Traceability for Journal Review, Proofreading and Editorial Quality: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c068-f010
page_type: 行业问题页
application_area: education
meta_title: Journal Editing | Citations | Multilingual
meta_description: Journal Editing: review citations for multilingual work. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Journal Review, Proofreading and Editorial Quality: Handle Multilingual Materials and Terminology

## What this category's data looks like

Journal three-review three-proof and editorial quality materials include three-review forms, proofs, and proofreading records, and often carry multilingual materials and terminology comparisons. The three-review form records the fields and signature dates for initial review, re-review, and final review; the proof carries the layout, page numbers, and traces of changes; the proofreading record lists error types, quantities, and handling results. When the materials enter the knowledge base retrieval node, they are first grouped into the associated knowledge base by the same vector model, and then the hit snippets and source identifiers are returned as a cited content array, for subsequent field comparison, ledger writing, and report generation. The update rhythm advances with proof rounds; each proof round produces a new version, and the old version must be marked as void. Field characteristics center on names, quantities, dates, signatures, and receipts; multilingual materials also carry the source language and translated names. Checking whether the writing of three sampled terms is consistent throughout the whole text is a common acceptance action.

## Configuration and implementation checks

This part is executed by the citation output of the knowledge base retrieval node, which outputs a cited content array, each entry containing the original snippet and source identifier, and the length may be 0. The "unified terminology list and comparison draft" is completed next by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Three-review form | Whether the fields, dates, and signatures are complete, and whether the name and quantity of the same record can be matched with the proof | Open the three-review form and check the initial review, re-review, and final review fields item by item; use `quoteList` to view the source identifier and trace back to the original paragraph |
| Proof | Whether the layout, page numbers, and traces of changes are consistent with the proofreading record, and whether the versions are synchronized | Compare the proof with the proofreading record, and verify the name, quantity, and date of the same record; use `responseData` (non-streaming module results returned with detailed output enabled) to record the number of citations, and record the array length separately |
| Proofreading record | Whether the error types, quantities, and handling results are consistent with the three-review form receipt, and whether any signatures are missing | Check whether the writing of three sampled terms is consistent throughout the whole text; use `quoteMaxToken` to verify the citation text budget, and record the array entry count separately |
| Multilingual terminology comparison draft | Whether the translated names can trace back to the original text, and whether the writing of the same term is unified throughout the whole text | Compare the original snippets and source identifiers one by one to confirm that the translated names can be traced back; for inconsistencies, go back to the hit materials and judge again |

## Three common errors

- Phenomenon: the name, quantity, and date of the same record do not match between the three-review form and the proof. Cause: the two materials' versions are not synchronized, or the same field standard was not used for verification during entry.
- Phenomenon: the proofreading record lacks a signature or receipt. Cause: the signature approval was not completed during the proof round flow, and the materials entered retrieval first; cited snippets can still be returned, but the basis is incomplete.
- Phenomenon: the cited snippets do not match the original text. Cause: first check whether this round hit anything and which material was hit, then look at trimming; an empty citation array does not mean retrieval failed.

## How to verify the setup

Acceptance of this function: ask a question with an original-text basis, and check whether the cited content array and footnote markers can trace back to the original paragraph; then ask a question with no matching materials, and confirm that the array is empty while the output chain runs through, that the citation count is recorded by array length, and that `quoteMaxToken` is only a content budget and the two are not compared for equality.

Business test: check whether the writing of three sampled terms is consistent throughout the whole text, and confirm that the translated names can trace back to the original text.

- Open the search parameter panel and check the values item by item, confirming that they are consistent with the settings in the knowledge base retrieval section; in the node, check the selected collections and their vector models.
- Try running with a query that has no matching materials, and see that the output is empty while the chain continues; then open the citation footnote markers and check against the source documents whether each citation can trace back to the original text.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
