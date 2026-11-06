---
title: Citations and Source Traceability for Research Project Task Agreement Signing: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c058-f010
page_type: 行业问题页
application_area: education
meta_title: Research Agreements | Citations | Review
meta_description: Research Agreements: review citations for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Research Project Task Agreement Signing: Trace Exceptions and Review Results

## What this category's data looks like

In the scenario of signing research project task books, the materials mainly cover three types: the project task book, the subject task breakdown table, and the budget book. The project task book provides the overall project objectives, the undertaking unit, the start and end dates, and the signature section; the subject task breakdown table breaks the research content down to the subject level, listing subject names, responsible persons, participating units, and milestone dates; the budget book lists funding amounts, calculation bases, and matching sources by category. The three types of materials serve as mutual references during the signing stage: the task book defines the boundaries, the breakdown table defines the division of labor, and the budget book defines the resources. The materials mostly come from scans of offline stamped documents, system exports, or returns from collaboration platforms, and their update rhythm is synchronized with the signing rounds, often involving version replacements and supplementary signing receipts. Field characteristics are concentrated in four categories: names, quantities, dates, and signatures. The same record in two materials is prone to inconsistencies in name wording, quantity definitions, and date order, and unsynchronized versions or missing receipts also occur from time to time.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and source identifier, and the length can be 0. The "exception list and review conclusion" is completed afterward by a subsequent AI node, code node, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Project task book | Check whether the project name, undertaking unit, start and end dates, and signature section are consistent with the breakdown table and budget book | Open the citation marker to point back to the original paragraph, compare names, quantities, dates, and signatures field by field, and record inconsistencies |
| Subject task breakdown table | Check whether the subject names, responsible persons, participating units, and milestone dates are consistent with the task book and budget book | Use `quoteList` to expand the cited fragment and confirm the correspondence between the wording and values of the subject-level fields in the two materials |
| Budget book | Check whether the category names, funding amounts, calculation bases, and matching sources match the task book and breakdown table | Compare against the values in the search parameter panel, check the tokens of the cited text and the `quoteMaxToken` budget, and record the number of array items separately |
| Cited content output | The number of returned items is consistent with the matched materials; empty is also normal, and the chain continues to run through | Run a test with a question that has no matching materials, and see that the array is empty while the chain continues, and the citation field in `responseData` (non-streaming module results returned with detailed output enabled) is returned normally |

## Three common errors

- Symptom: the name, quantity, and date of the same record do not match between the task book and the breakdown table. Cause: the two materials are filled in by different roles, and the definitions and versions are not unified.
- Symptom: the budget book categories are inconsistent with the task book wording, and the cited fragment does not match the original text. Cause: the versions are not synchronized, and the old draft is retrieved while the new draft has not been entered into the knowledge base.
- Symptom: the signature section or receipt is missing, and the exception record cannot be traced back to the source material. Cause: the supplementary signing process is not closed-loop, and the scanned copy is not updated with the version.

## How to verify the setup

Acceptance of this feature: ask a question with original-text support and check whether the citation array and markers can point back to the original text; then ask a question with no matching materials and confirm that the array is empty while the chain runs through.

Business test: create an exception record and see whether it can be traced back to the source material

- In the node, check whether the selected knowledge base collections and their vector models are consistent, then open the search parameter panel and check the values item by item
- Run a test with a question that has no matching materials, confirm that the citation array is empty while the chain continues, and check the citation field structure in `responseData`

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
