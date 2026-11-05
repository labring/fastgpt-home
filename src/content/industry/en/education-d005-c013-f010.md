---
title: Citations and Source Traceability for School Teacher Training Credits: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c013-f010
page_type: 行业问题页
application_area: education
meta_title: Teacher Credits | Citations | Versions
meta_description: Teacher Credits: review citations for version tracking. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for School Teacher Training Credits: Maintain Document Versions and Changes

## What this category's data looks like

This page addresses the scenario of credit management for primary and secondary school teacher training. The materials include three types: training notices, credit recognition forms, and participant lists. The training notice provides the project name, training start and end dates, and the organizing unit, and is the source basis for the credit recognition form; the credit recognition form records the teacher's name, ID number, course name, number of class hours, and recognition conclusion, and requires the reviewer's signature; the participant list records the participants, attendance days, and sign-in receipts. When these three types of materials enter the knowledge base retrieval node, each serves as an independent citation source, and after a retrieval hit, they are returned as original text fragments with source identifiers. The update rhythm changes with training batches: the release of new notices, revision of recognition forms, and supplementary entry of lists all generate new versions. Field characteristics are concentrated in names, dates, class hours, signatures, and receipts. The same record is prone to mismatch across different materials, requiring a version ledger and change records to mark the current version, retain old versions, and synchronize citations.

## Configuration and implementation checks

The citation output of the knowledge base retrieval node outputs only an array of citation content, each item containing an original text fragment and a source identifier. Its length can be 0. The version ledger and change records must be handled subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Training notice | Whether the project name, training start and end dates, organizing unit, and document number are consistent with the credit recognition form | In the retrieval results, refer back to the original paragraphs one by one, check the date and document number fields, and record the citation source identifiers |
| Credit recognition form | Whether the teacher's name, class hours, recognition conclusion, and reviewer's signature are complete, and whether the quantity matches the participant list | Open the citation markers to compare against the source documents, separately mark entries missing signatures or receipts, and write them into the change records |
| Participant list | Whether the participants, attendance days, and sign-in receipts correspond one by one with the recognition form | Run a test with a question that has no matching materials, see whether the citation array is empty while the pipeline continues, then check the number of items when there is a hit |
| Knowledge base retrieval node | Whether the associated knowledge base uses the same vector model, and whether the search parameter values are consistent with the knowledge base retrieval section | Open the search parameter panel and check item by item, and record `quoteMaxToken` and the citation text tokens of `quoteList` in `responseData` (non-streaming module results returned with detailed output enabled) |

## Three common errors

- Phenomenon: The same teacher's name or class hours do not match between the recognition form and the participant list. Cause: The two materials were revised separately, no version ledger was established, and the old version is still hit by retrieval.
- Phenomenon: The training notice date has been updated, but the recognition form still cites the old date. Cause: The version was not synchronized, the citation source identifier still points to the old version fragment, and no change record was made.
- Phenomenon: The recognition form lacks the reviewer's signature or the participant list lacks sign-in receipts. Cause: The signature fields were not checked when the materials were archived, and after retrieval hits, they directly entered the citation array.

## How to verify the setup

Acceptance of this feature: ask a question with original text support, and check whether the citation content array and citation markers can refer back to the original paragraphs; then ask a question with no matching materials, and confirm that the array is empty while the output pipeline runs through.

Business test: change one piece of content and see whether the version number and citations are updated synchronously; the number of citations is recorded separately according to the array length, and `quoteMaxToken` is only the citation content budget, so the two are not compared for equality.

- In the node, check the selected knowledge base collections and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Open the search parameter panel and check the values item by item, and run a test with a question that has no matching materials to see whether the output is empty while the pipeline continues.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
