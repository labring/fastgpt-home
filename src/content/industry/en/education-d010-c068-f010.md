---
title: Citations and Source Traceability for Journal Review, Proofreading and Editorial Quality: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c068-f010
page_type: 行业问题页
application_area: education
meta_title: Journal Editing | Citations | Operations
meta_description: Journal Editing: review citations for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Journal Review, Proofreading and Editorial Quality: Coordinate Operations and Application Handover

## What this category's data looks like

Journal three-review-three-proof and editorial quality materials include three-review forms, proofs, proofreading records, signed receipts, and version notes. The three-review form records the fields, dates, and signatures of the initial review, re-review, and final review; the proof marks revision traces and proof rounds; the proofreading record registers the fields, quantities, and responsible persons of each proofreading round. When these materials enter the knowledge base retrieval node, each plays a different role: the three-review form provides the process and signature basis, the proof provides the original text fragments and revision comparison, and the proofreading record provides clues for checking rounds and quantities. The material source is the editorial department's internal archive, and the update cadence is synchronized by issue or proofreading round. The field characteristics are concentrated in name, quantity, date, signature, and receipt. During deployment, operations, and application handover, the version, connection, and task records must be aligned, then checked item by item against the handover list to see which record is missing.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text fragment and a source identifier, and the length can be 0. The handover-ready deployment status and operation records are completed by subsequent AI nodes, code nodes, or manual work. Even if no content is found, the output chain still runs through.

| Object | Check | Verification action |
| --- | --- | --- |
| Three-review form | Whether the fields, dates, and signatures are consistent with the proof and proofreading record | Open the three-review form and compare it with the proof, check the name, quantity, date, signature, and receipt, and record the number of items in the citation array |
| Proof | Whether the original text fragments and citation sources can be traced back, and whether the version is synchronized | Open the citation superscript in the conversation, compare it with the original proof text, and check the cited fragments and source identifiers in `responseData` (non-streaming module results returned with detailed output enabled) |
| Proofreading record | Whether the rounds, fields, quantities, and dates match the three-review form | Check the proofreading record against the three-review form item by item, mark any missing signature or receipt, and record the number of array items separately |
| Search parameters | Consistent with the values set in the knowledge base retrieval section | Open the search parameters panel and check item by item, verify that `quoteMaxToken` is the citation content budget, and use `quoteList` to view citation details |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the three-review form and the proofreading record. Cause: The two materials' versions are not synchronized, or the field definitions differ at entry.
- Symptom: The cited fragments do not match the original proof text. Cause: First check whether this round hit and which material was hit, then look at trimming; do not directly attribute it to length trimming.
- Symptom: There is an answer but the citation array is empty, or there is no citation superscript in the answer. Cause: An empty citation array does not mean retrieval failed; an empty array is a normal output. A missing superscript requires checking the associated knowledge base and search parameters.

## How to verify the setup

This feature's acceptance: ask a question with original-text support, and check whether the citation array and superscript can trace back to the original text; then ask a question with no matching material, and confirm that the array is empty while the chain runs through. Use `quoteMaxToken` to check the tokens of the cited text, and record the number of array items separately; do not compare the two for equality.

Business test: check once item by item against the handover list to see which record is missing; check whether the version, connection, and task records are consistent, and mark any missing signature or receipt.

- In the node, check the selected collections and their vector models, and confirm that the associated knowledge bases use the same vector model.
- Run a test with a query that has no matching material, see that the output is empty while the chain continues, and record the citation details in `quoteList` within `responseData`.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
