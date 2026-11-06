---
title: Citations and Source Traceability for Journal Review, Proofreading and Editorial Quality: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c068-f010
page_type: 行业问题页
application_area: education
meta_title: Journal Editing | Citations | Intake
meta_description: Journal Editing: review citations for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Journal Review, Proofreading and Editorial Quality: Handle Questions and Collect Missing Information

## What this category's data looks like

This page focuses on the journal three-review three-proof and editorial quality scenario; the materials include three types: three-review forms, proofs, and proofreading records. The three-review form carries the fields, dates, and signatures of the initial review, re-review, and final review; the proof carries layout and text revision traces; the proofreading record carries the fields, dates, and signatures of each proofreading round. After the materials enter the knowledge base retrieval node, each serves as a citable original-text passage that supports citation output. The update cadence rolls with the journal publication cycle; each issue's new three-review forms, new proofs, and new proofreading records enter the same knowledge base collection. Field characteristics center on record name, quantity, date, signature, and receipt; the same record often shows mismatched name, quantity, or date across two materials, with versions not synchronized, or missing signatures or receipts. The materials have different roles: the three-review form is used to check review rounds and signatures, the proof is used to check text and layout, and the proofreading record is used to check proofreading rounds and dates.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each entry containing an original-text snippet and a source identifier, and the length may be 0. "Intake records and items to be completed" is then carried out by subsequent AI nodes, code nodes, or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| Three-review form | Whether fields, dates, and signatures are complete, and whether the name, quantity, and date of the same record are consistent across the two materials | Open the original three-review form, check the initial review, re-review, and final review fields and signatures item by item, then compare the name, quantity, and date of the same record against the proof and proofreading record |
| Proof | Whether versions are synchronized, and whether revision traces correspond to the proofreading record | Retrieve the proof and the corresponding proofreading record for that round, check the layout and text revision traces, confirm where versions are not synchronized, and record it |
| Proofreading record | Whether the fields, dates, and signatures of each proofreading round are complete, and whether receipts are missing | Check the fields, dates, and signatures one by one by proofreading round, inspect the receipts, and list missing items as items to be completed |
| Citation content output | The number of returned entries matches the materials hit; being empty is also normal | Run a trial with a question that has no matching materials, and see that the output is empty while the chain continues; open the citation markers to compare against the source documents |

## Three common errors

- Symptom: the name, quantity, and date of the same record do not match across the two materials. Cause: the three-review form, proof, and proofreading record are each maintained independently, with no cross-checking.
- Symptom: versions are not synchronized, and the proof does not correspond to the proofreading record. Cause: after revision, only one material was updated while the other remained at the old version.
- Symptom: signatures or receipts are missing, and the intake records and items to be completed are incomplete. Cause: during review-round handoff, signatures were not added in time, and receipts were not archived with the materials.

## How to verify the setup

Acceptance of this feature: ask a question with original-text support, check whether the citation array and markers can point back to the original text, and confirm that every citation can point back to an original-text passage; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through.

Business test: raise a question that lacks key information, and see whether it asks a follow-up before answering.

- Open the search parameter panel and check item by item, confirming that the associated knowledge base uses the same vector model; run a trial with a question that has no matching materials, and record the citation array length and the `quoteList` in `responseData` (non-streaming module results returned with detailed output enabled).
- Open the citation markers in the conversation, and compare the citation snippets against the source documents and the original text; if a citation limit is involved, check the tokens of the citation text, record the array entry count separately, and do not compare the entry count with `quoteMaxToken` for equality.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
