---
title: Citations and Source Traceability for Journal Review, Proofreading and Editorial Quality: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c068-f010
page_type: 行业问题页
application_area: education
meta_title: Journal Editing | Citations | Versions
meta_description: Journal Editing: review citations for version tracking. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Journal Review, Proofreading and Editorial Quality: Maintain Document Versions and Changes

## What this category's data looks like

This page addresses the journal three-stage review and three-proof correction and editorial quality scenario, focusing on citation sources and traceability in material versions and change maintenance. The materials include three types: three-stage review forms, proofs, and proofreading records. The three-stage review forms carry the fields, dates, and signatures of the initial review, re-review, and final review; the proofs carry the traces of layout and text changes; the proofreading records carry the error registrations and receipts of each proofreading round. When the three enter the knowledge base retrieval node, each is cited as an independent source, and each fragment in the citation array points back to the original passage of the corresponding material. In terms of update rhythm, the three-stage review forms advance with the review rounds, the proofs iterate with the proofreading rounds, and the proofreading records are backfilled with each proofreading round; version numbers and citations must be maintained in sync. In terms of field characteristics, the names, quantities, and dates of the same record in the three materials must be consistent, signatures and receipts must be complete, and unsynchronized versions will directly cause citations to fail to match the original text.

## Configuration and implementation checks

This link is executed by the citation output of the knowledge base retrieval node, which outputs a citation content array, each entry containing an original fragment and a source identifier, and the length can be 0. The version ledger and change records are subsequently completed by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Three-stage review form | Whether the fields, dates, and signatures of the initial review, re-review, and final review are consistent with the proofs and proofreading records | In the node, check the selected collection and vector model, open the search parameter panel and check item by item, then compare against the original passages of the three-stage review form |
| Proof | Whether the proofreading round, the names and quantities of changed places, and the dates match the proofreading records | Run a trial with a question that has no matching material, see that the output is empty while the chain continues, then open the citation marker and compare against the original text of the proof |
| Proofreading record | Whether the error registrations, receipts, and signatures of each proofreading round are complete, and whether the version number is synchronized | In the conversation, open the citation marker, compare against the source document, record the number of array entries, and separately check the tokens of the citation text |
| Citation content output | The number of returned entries is consistent with the matched materials, and being empty is also normal | View `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList`, confirm that `quoteMaxToken` only constrains the citation text budget, and record the number of array entries separately |

## Three common errors

- Symptom: The names, quantities, and dates of the same record in the three-stage review form and the proofreading record do not match. Cause: The two materials are updated separately, without field comparison and version alignment.
- Symptom: The proof has been changed, but the knowledge base citation still points to the old-version fragment. Cause: The version is not synchronized, the old version is traceable but the current version is not unique, and the citation is not updated when one place is changed.
- Symptom: The three-stage review form lacks the final review signature, and the proofreading record lacks the receipt. Cause: Signatures and receipts are not archived with the materials, and the citation fragment cannot point back to the complete original text.

## How to verify the setup

This feature's acceptance: ask a question with original-text support, and check whether the citation array and markers can point back to the original text; then ask a question with no matching material, and confirm that the array is empty while the chain runs through.

Business test: change one place of content, and see whether the version number and citation are updated in sync.

- In the node, check the selected knowledge base collections and their vector models, and confirm that what is associated is a knowledge base of the same vector model.
- Open the search parameter panel and check the values item by item, and run a trial with a question that has no matching material, confirming that the output is empty while the chain continues.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
