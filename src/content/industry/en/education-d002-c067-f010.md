---
title: Citations and Source Traceability for Peer Review Organization: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c067-f010
page_type: 行业问题页
application_area: education
meta_title: Peer Review | Citations | Checks
meta_description: Peer Review: review citations for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Peer Review Organization: Compare Documents and Locate Differences

## What this category's data looks like

This page focuses on material verification and discrepancy localization for peer review organizations. The materials come from three types: review invitations, expert review comments, and author revision notes. Review invitations are sent by editors and include the manuscript title, submission date, and expert name; expert review comments are submitted by reviewers and include the comment body, review date, and signature; author revision notes are returned by authors and include revision items, version number, and receipt. The update rhythms of the three material types are not synchronized: review invitations arrive first, expert comments follow, and author revision notes come last. It often happens that the name, quantity, or date of the same record does not match across two materials, the version is not synchronized, or a signature or receipt is missing. When materials enter the knowledge base retrieval node, each is indexed as an independent document. The citation output is only responsible for pointing back to the original text and does not perform field comparison.

## Configuration and implementation checks

The citation output of the knowledge base retrieval node only outputs an array of cited content, each item containing the original text snippet and source identifier. The length can be 0. The discrepancy list must be handled subsequently by an AI node, code node, or manually. Even if no content is found, the output pipeline still completes. The number of citations is the array length, and `quoteMaxToken` is the citation content budget. The two are not compared for equality.

| Object | Check | Verification action |
| --- | --- | --- |
| Review invitation | Whether the manuscript title, submission date, expert name, and invitation receipt are consistent with the ledger | Open the citation marker and verify the name, date, and receipt fields against the source document |
| Expert review comments | Whether the comment body, review date, and signature are consistent with the corresponding record in the review invitation | Use `quoteList` to view the cited snippet and check whether the review date and signature are missing |
| Author revision notes | Whether the revision items, version number, and receipt date are consistent with the expert comments | Check whether the version number is synchronized, and mark discrepancies when a signature or receipt is missing |
| Citation content output | The number of returned items is consistent with the matched materials; being empty is also normal | Run a test with a question that matches no materials and see whether the array in `responseData` (non-streaming module results returned with detailed output enabled) is empty while the pipeline continues |

## Three common errors

- Symptom: The manuscript title of the same record does not match between the review invitation and the expert comments. Cause: The two materials are entered independently, no field-level comparison is performed, and citations only point back to the original text without judging consistency.
- Symptom: The version number in the author revision notes is not synchronized with the version referenced by the expert comments. Cause: After the revision notes are returned, they are not written back to the ledger; the citation array only displays snippets and does not mark version differences.
- Symptom: Expert review comments lack a signature or author revision notes lack a receipt. Cause: When materials enter the knowledge base, the signature field is not validated, and the citation output does not assume confirmation of authorization scope.

## How to verify the setup

Feature acceptance: Ask a question with original-text support, check whether the citation array and markers can point back to the original text, and check the source identifier in `quoteList`; then ask a question with no matching materials, and confirm that the array is empty while the pipeline completes.

Business testing: Use a real record to find fields inconsistent with the ledger, record which of the name, quantity, or date does not match, and submit it to the reviewer for confirmation and write-back.

- In the node, check whether the selected knowledge base uses the same vector model, and verify item by item that the search parameters match the values in the knowledge base retrieval section
- Run a test with a question that has no matching materials, confirm that the citation array is empty while the output pipeline continues, record the array length separately, and count the tokens of the citation text separately

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
