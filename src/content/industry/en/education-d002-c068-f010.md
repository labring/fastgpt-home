---
title: Citations and Source Traceability for Journal Review, Proofreading and Editorial Quality: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c068-f010
page_type: 行业问题页
application_area: education
meta_title: Journal Editing | Citations | Checks
meta_description: Journal Editing: review citations for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Journal Review, Proofreading and Editorial Quality: Compare Documents and Locate Differences

## What this category's data looks like

This page addresses the journal three-review three-proofreading and editorial quality scenario; materials include three-review forms, proofs, proofreading records, and supporting ledgers. The three-review form carries the fields, dates, and signatures of initial review, re-review, and final review; the proof reflects layout, page numbers, and textual change marks; the proofreading record logs the discrepancies, responsible persons, and receipts of each round of proofreading. Materials enter in batches by review round and proofreading round, and the update cadence advances with manuscript circulation; common fields are name, quantity, date, signature, and version number. After entering the knowledge base retrieval node, the three-review form, proof, and proofreading record each serve as citable original-text sources, for later field comparison, ledger writing, and report generation to refer back to the original paragraphs.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original-text snippet and a source identifier, and the length may be 0. The "discrepancy list" is then completed by a subsequent AI node, code node, or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Three-review form | Whether the name, quantity, date, and signature are consistent with the proof and proofreading record | Compare the three-review form with the ledger field by field, record inconsistent items, and annotate the source paragraph |
| Proof | Whether the layout, page numbers, and textual changes are in sync with the proofreading record | Open the citation superscript to refer back to the original proof text, and check the version number and change marks |
| Proofreading record | Whether each round's discrepancies, responsible person, and receipt are complete | Check records missing signatures or receipts, and register items pending supplementation |
| Cited content output | The number of returned entries matches the hit materials; being empty is also normal | Run a test with a question that matches no materials, and see that the output is empty while the chain continues |

## Three common errors

- Symptom: the name, quantity, and date of the same record do not match between the three-review form and the proof. Cause: the two were entered separately, without field-level comparison.
- Symptom: the proof has been updated, but the proofreading record still points to the old version. Cause: the version was not synchronized, and the paragraph referred back to by the citation does not match the current material.
- Symptom: the proofreading record is missing a signature or receipt. Cause: the circulation step was not closed-loop, and the fields are incomplete when the material enters retrieval.

## How to verify the setup

This feature's acceptance: first ask a question that has original-text support, and check whether the citation array and superscripts can refer back to the original text; then ask a question that matches no materials, and confirm that the array is empty while the chain runs through.

Business test: use one real record to find fields that are inconsistent with the ledger.

- Open the search parameter panel and check item by item, confirming that the selected knowledge base uses the same vector model; record the number of citations, and note that `quoteMaxToken` is only the citation content budget and is not compared for equality with the number of entries.
- Open the citation superscripts in the conversation, check `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` against the source documents, and confirm that each citation can refer back to the original paragraph.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
