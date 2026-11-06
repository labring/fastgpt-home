---
title: Citations and Source Traceability for Journal Review, Proofreading and Editorial Quality: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c068-f010
page_type: 行业问题页
application_area: education
meta_title: Journal Editing | Citations | Handover
meta_description: Journal Editing: review citations for material handover. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Journal Review, Proofreading and Editorial Quality: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

The materials for journal three-stage review, three-proofreading, and editorial quality center on three types: the three-stage review form, the proof, and the proofreading record. The three-stage review form records the fields, dates, and signatures of the initial review, re-review, and final review; the proof carries the layout and textual change marks; the proofreading record registers errors and responsibility handover round by round. When the materials enter the knowledge base retrieval node, each plays a different role: the three-stage review form is the starting point of the responsibility chain, the proof is the site of layout and text, and the proofreading record is the ledger of errors and receipts. The update rhythm advances by journal issue, and each issue forms a set of signable material drafts and handover records. Field characteristics center on name, quantity, date, version number, signature, and receipt. Common inconsistencies appear when the name, quantity, and date of the same record do not match across two materials, versions are not synchronized, or signatures or receipts are missing.

## Configuration and implementation checks

The citation output of the knowledge base retrieval node outputs only an array of citation content, each entry containing the original text fragment and source identifier; the length can be 0, and the signable material drafts and handover records must be continued by subsequent AI nodes, code nodes, or humans. The deliverable of this link is citation fragments for subsequent field comparison, and it does not assume the responsibility of a difference list, ledger, or report.

| Object | Check | Verification action |
| --- | --- | --- |
| Three-stage review form | Whether the fields, dates, and signatures are complete, and whether the name, quantity, and date are consistent with the proof and proofreading record | Open the citation superscript, check the fields and signatures of the initial review, re-review, and final review against the source document, and record the number of array entries and the `quoteMaxToken` budget |
| Proof | Whether the layout and textual changes correspond one by one to the proofreading record, and whether the version number and date are synchronized | In the conversation, refer back to the original paragraph, check whether the change marks on the proof correspond one by one to the entries in the proofreading record, and check whether the citation fragments in `responseData` (non-streaming module results returned with detailed output enabled) can be traced back |
| Proofreading record | Whether the error registration, responsibility handover, and receipt of each round are complete, and whether signatures are missing | Check the error entries, responsible person signatures, and receipts of the proofreading record round by round, and confirm that the name, quantity, and date of the same record are consistent across different materials |
| Associated knowledge base | Whether the selected knowledge bases use the same vector model and cover the three-stage review form, proof, and proofreading record | In the node, check the selected collections and their vector models, open the search parameter panel, and check the values item by item |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match between the three-stage review form and the proofreading record. Cause: During drafting, comparison was not performed according to a unified field template, and the two places each wrote their own.
- Phenomenon: The proof has been updated to a new version, while the three-stage review form and proofreading record remain on the old version. Cause: The version was not synchronized, and the version number and date were not checked during handover.
- Phenomenon: The proofreading record lacks a signature or receipt, and the handover chain breaks at a certain link. Cause: Responsibility handover was not confirmed item by item, and the signature and receipt fields were skipped.

## How to verify the setup

This feature acceptance: Ask a question with an original-text basis, and check the number of citation array entries and whether the superscripts can trace back to the original paragraph; then ask a question with no matching material, confirm that the array is empty while the chain continues to run through, and distinguish between the array length and the `quoteMaxToken` budget.

Business test: Draft one according to the template and complete one handover, and see whether missing items are blocked.

- Open the citation superscript, check item by item against the source document whether the citation fragments correspond to the original paragraphs, and record the number of array entries.
- Open the search parameter panel, check item by item whether the values are consistent with the values set in the knowledge base retrieval section, and confirm that the `quoteList` field can trace back to the original text.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
