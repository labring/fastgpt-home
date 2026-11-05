---
title: Citations and Source Traceability for Journal Review, Proofreading and Editorial Quality: Find Supporting Evidence
slug: /en/industry/education-d001-c068-f010
page_type: 行业问题页
application_area: education
meta_title: Journal Editing | Citations | Evidence
meta_description: Journal Editing: review citations for evidence lookup. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Journal Review, Proofreading and Editorial Quality: Find Supporting Evidence

## What this category's data looks like

This page centers on the journal three-stage review and three-proof correction and editorial quality, aggregating three types of materials: three-stage review forms, proofs, and proofreading records, for business basis query and citation source traceability. The three-stage review forms record the fields, dates, and signatures of the initial review, re-review, and final review; the proofs carry layout and text change traces; the proofreading records register each proofreading round, the responsible person, and the receipt. Materials enter the knowledge base in batches by issue and proofreading round, the update rhythm follows the editorial process nodes, and the version is based on the current manuscript. When entering this function, the three-stage review forms, proofs, and proofreading records each participate as retrievable materials in hits, providing original text snippets and source identifiers for cross-material basis questions, facilitating subsequent field comparison, ledger writing, or report generation.

## Configuration and implementation checks

This link is executed by the citation output of the knowledge base retrieval node, outputting an array of citation content, each entry containing an original text snippet and a source identifier, and the length can be 0. "Basis entries that can be traced back to the original text" are subsequently completed by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Three-stage review form | Whether the fields, dates, and signatures are complete and consistent with the current manuscript | Open the three-stage review form, check item by item the fields, dates, and signatures of the initial review, re-review, and final review, then compare with the proofs and proofreading records for the name, quantity, and date of the same record |
| Proof | Whether the layout and text change traces can be traced back to the original text paragraph | Open the citation superscript in the conversation, compare against the proof source document, and check the original text snippet and source identifier of each citation in `responseData` (non-streaming module results returned with detailed output enabled) |
| Proofreading record | Whether each proofreading round, the responsible person, and the receipt match, and whether the version is synchronized | Check the proofreading round, responsible person, and receipt of the proofreading record, check whether the name, quantity, and date of the same record are consistent across the two materials, and confirm the version is the current manuscript |
| Search parameters | Whether the values are consistent with the values set in the knowledge base retrieval section | Open the search parameters panel and check item by item; when the citation upper limit is involved, check the tokens of the citation text, record the array count separately, and do not compare the count with `quoteMaxToken` for equality |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the three-stage review form and the proofreading record. Cause: The two registration time points differ or there is a transcription typo, and no cross-material field comparison was performed.
- Symptom: The proof and the current manuscript version are not synchronized, and the citation snippet does not match the original text. Cause: After revision, only one material was updated, while the other still retains the old version, and retrieval hits the old version.
- Symptom: The three-stage review form or proofreading record lacks a signature or receipt, and the basis entries cannot be closed-loop. Cause: The process node was not completed before archiving, and the materials were not supplemented with signatures when entering the knowledge base.

## How to verify the setup

This function's acceptance: ask a question with an original text basis, and check whether the citation array and superscript can be traced back to the original text; then ask a question with no matching materials, and confirm the array is empty while the link runs through. You can combine `quoteList` within `responseData` to view the citation snippets and source identifiers.

Business test: ask a cross-material basis question, see whether the answer gives a traceable source, and check whether the fields, dates, and signatures among the three-stage review form, proofs, and proofreading records match.

- Run a test with a question that has no matching materials, see whether the output is empty while the link continues, and record the array count.
- Open the citation superscript in the conversation, compare against the source document, and check whether each citation can be traced back to the original text paragraph.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
