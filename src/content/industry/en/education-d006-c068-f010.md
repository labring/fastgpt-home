---
title: Citations and Source Traceability for Journal Review, Proofreading and Editorial Quality: Track Progress and Check Statistics
slug: /en/industry/education-d006-c068-f010
page_type: 行业问题页
application_area: education
meta_title: Journal Editing | Citations | Progress
meta_description: Journal Editing: review citations for progress tracking. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Journal Review, Proofreading and Editorial Quality: Track Progress and Check Statistics

## What this category's data looks like

In the scenario of the three-review three-proofread process and editorial quality in journals, materials are mainly of three types: three-review forms, proofs, and proofreading records. The sources are internal editorial circulation documents, typesetting receipts, and proofreading signature pages, and the update cadence follows each issue's manuscript circulation and weekly summaries. The three-review form carries the dates and signatures of the initial review, re-review, and final review; the proof carries the version number, page numbers, and revision marks; the proofreading record carries the proofreading rounds, error types, and receipts. When these three types of materials enter the knowledge base retrieval node, each serves as a citable original passage for subsequent field comparison, ledger writing, and report generation. Field characteristics center on four types: name, quantity, date, and signature. The same record often has mismatched name, quantity, and date across two materials, unsynchronized versions, or missing signatures or receipts.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original passage and a source identifier, and the length may be 0. The "progress table and statistical scope description" is completed afterward by a subsequent AI node, code node, or manually. The number of citations is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality.

| Object | Check | Verification action |
| --- | --- | --- |
| Three-review form | Fields include the dates and signatures of the initial review, re-review, and final review; the name, quantity, and date must match the proof and proofreading record | Open the three-review form and the corresponding proof, check the dates and signatures item by item, and see whether the cited passage in `responseData` (non-streaming module results returned with detailed output enabled) can point back to the original text of that form |
| Proof | The version number, page numbers, and revision marks must be synchronized with the proofreading record; if the version is not synchronized, it is regarded as inconsistent | Compare the proof version number with the proofreading record rounds, and check whether the citation source identifier in `quoteList` points to the same version |
| Proofreading record | The proofreading rounds, error types, and receipts must be complete; if a signature or receipt is missing, it is listed as an exception | Check the proofreading records and receipts round by round, and see whether the number of items in the citation array matches the materials hit |
| Statistical scope description | The number of records matches the statistical count, the scope is written in the header, and exceptions are listed separately | Use one week of records to check the total, and verify that `quoteMaxToken` only constrains the tokens of the cited text, while the number of array items is recorded separately |

## Three common errors

- Phenomenon: the name, quantity, and date of the same record do not match between the three-review form and the proof. Cause: the two materials circulate separately, and the fields are not backfilled according to the same scope.
- Phenomenon: the proof version is not synchronized, and the proofreading record still points to the old version. Cause: no receipt after revision, and the version number is not updated with the material.
- Phenomenon: the proofreading record lacks a signature or receipt, but it is still included in the total during statistics. Cause: exceptions are not listed separately, and the scope is not written in the header.

## How to verify the setup

Acceptance of this feature: ask a question with original-text support, and check whether the citation array and superscripts can point back to the original text; then ask a question with no matching material, and confirm that the array is empty while the chain still runs through.

Business test: use one week of records to check the total, and see whether the scope and exceptions are clearly written.

- Open the search parameter panel and check item by item, confirm that the associated knowledge base uses the same vector model, and record the number of citations and the value of `quoteMaxToken`.
- Run a test with a query that has no matching material, see that the output is empty while the chain continues, and then compare against the source documents to check whether each citation can point back to the original passage.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
