---
title: Citations and Source Traceability for Journal Review, Proofreading and Editorial Quality: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c068-f010
page_type: 行业问题页
application_area: education
meta_title: Journal Editing | Citations | Review
meta_description: Journal Editing: review citations for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Journal Review, Proofreading and Editorial Quality: Trace Exceptions and Review Results

## What this category's data looks like

This page addresses the scenario of the three-review three-proof and editorial quality of journals; the materials include three types: three-review forms, proofs, and proofreading records. The three-review form carries the fields, dates, and signatures of the initial review, re-review, and final review, and is the original credential of the process nodes; the proof carries the text and layout status after typesetting, and is the physical draft for comparing names, quantities, and dates; the proofreading record carries the changes and receipts of each proofreading, and is the tracking clue for version synchronization and signature completeness. The three types of materials enter the knowledge base by issue and batch, and the update rhythm follows the progress of the editorial process: the three-review form is archived as each review is completed, the proof is replaced with each round of revision, and the proofreading record is registered with each proofreading round. Field characteristics are concentrated in record number, manuscript name, quantity, date, signature, and receipt; the same record must keep its fields consistent across multiple materials. When the materials enter the citation sources and traceability function, each plays the role of being able to point back to the original text paragraph, for subsequent use in comparing fields, writing ledgers, and generating reports.

## Configuration and implementation checks

The citation output of the knowledge base retrieval node outputs only an array of citation content, each entry containing the original text fragment and source identifier, and the length can be 0; the exception list and review conclusions must be done subsequently by AI nodes, code nodes, or humans. The citation content is output as an array, and the length can be 0; even if no content is found, the output chain will still run through.

| Object | Check | Verification action |
| --- | --- | --- |
| Three-review form | Whether the fields, dates, and signatures match the proof and proofreading record | Check item by item the names, quantities, dates, and signatures of the initial review, re-review, and final review; when inconsistencies are found, point back to the original text paragraph and record them |
| Proof | Whether the version is synchronized with the current proofreading round, and whether the names, quantities, and dates are consistent | Compare against the changes and receipts in the proofreading record, check the proof round and signatures, and confirm that the citation fragment can point back to the original text |
| Proofreading record | Whether the signatures or receipts are complete, and whether the fields of the same record are consistent in the two materials | Check the signature and receipt of each proofreading round, compare the record number and date, and use `quoteList` to locate the material where the difference lies |
| Citation content output | The number of returned entries matches the materials hit; being empty is also normal | Run a test with a question that matches no material, and see that the output is empty while the chain continues; record the number of citations by array length, and check `quoteMaxToken` separately as the content budget |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the three-review form and the proof. Cause: The two materials were not updated synchronously in the same batch, and the field sources are not synchronized.
- Symptom: The proof has been replaced with a new round, but the proofreading record still remains at the old version. Cause: The versions are not synchronized, and the revision round is disconnected from the registration round.
- Symptom: The proofreading record lacks a signature or receipt, and the responsible person cannot be found during tracing. Cause: The signature and receipt were not archived with the proofreading round, and the original record is incomplete.

## How to verify the setup

This function's acceptance: ask a question with original-text support, and check whether the citation array and the superscript can point back to the original text; then ask a question with no matching material, confirm that the array is empty while the chain runs through, and check that the number of citations in `responseData` (non-streaming module results returned with detailed output enabled) and the `quoteMaxToken` budget are recorded separately.

Business test: create an exception record, see whether the source material can be traced, confirm that the exception has original-record support and the reviewer's signature, and then hand it to the person in charge for handling.

- Turn on citation superscripts, compare against the source documents one by one, check whether the citation fragments are consistent with the original text paragraphs, and record the array length.
- Check whether the selected knowledge base uses the same vector model, open the search parameter panel and check the values item by item, and confirm the `quoteMaxToken` and `quoteList` settings.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
