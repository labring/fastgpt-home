---
title: Citations and Source Traceability for Peer Review Organization: Track Progress and Check Statistics
slug: /en/industry/education-d006-c067-f010
page_type: 行业问题页
application_area: education
meta_title: Peer Review | Citations | Progress
meta_description: Peer Review: review citations for progress tracking. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Peer Review Organization: Track Progress and Check Statistics

## What this category's data looks like

This page focuses on progress records and statistical reconciliation for peer review organizations; the materials include three types: review invitations, expert review comments, and author revision notes. Review invitations record the invitation date, expert name, review round, and receipt signature; expert review comments record the comment submission date, review conclusion, and expert signature; author revision notes record revision items, author reply date, and signature. After these three types of materials enter the knowledge base retrieval node, each serves as a retrievable citation source, respectively taking on the traceability role for invitation progress, comment progress, and revision progress. The update cadence is weekly or monthly aggregation, and the field characteristics are concentrated in dates, names, quantities, signatures, and receipts. The progress table and statistical scope description must state the statistical scope, exceptional cases, and counting rules in the header, so that later comparison of whether the number of records matches the statistical count can be facilitated.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each item containing the original text fragment and source identifier, and the length can be 0. The "progress table and statistical scope description" is then completed by a subsequent AI node, code node, or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Review invitation | Fields include invitation date, expert name, review round, and receipt signature; the date and signature must be aligned item by item with the expert review comments and author revision notes | In the citation array, trace each item back to the original invitation text by source identifier, check whether the date, name, round, and signature are complete, and record the number of array items |
| Expert review comments | Fields include comment submission date, review conclusion, and expert signature; the name, quantity, and date of the same record in the two materials must be consistent | Open the citation marker to compare against the source document, check the comment date and signature, and verify whether the name and quantity match the invitation record |
| Author revision notes | Fields include revision items, author reply date, and signature; the version must be synchronized with the expert review comments | Use the citation fragment to trace back to the original revision note text, check the number of revision items, reply date, and signature, and confirm that places where the version is not synchronized have been marked |
| Search parameters | Consistent with the values set in the knowledge base retrieval section; the citation content is output as an array, and the length can be 0 | Open the search parameter panel and check item by item, and record `quoteMaxToken` as the citation content budget; record the number of array items separately |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the review invitation and the expert review comments. Cause: The two materials are entered separately, and cross-checking by the same record key is not performed, resulting in deviations in the statistical count.
- Symptom: The author revision notes and expert review comments are not synchronized in version. Cause: After the revision notes are updated, they are not written back to the progress table, and the citation fragment still points to the old version, so the dates and items do not match during verification.
- Symptom: The review invitation lacks a receipt signature, and the expert review comments lack a signature. Cause: The signature step is not recorded in the fields, and the statistical scope does not include exceptional cases in the header, so it is impossible to determine whether to include them in the total.

## How to verify the setup

Acceptance of this function: ask a question with source evidence, check whether the citation array and markers can trace back to the original text, and check whether the citation fragments and source identifiers of `quoteList` in `responseData` (non-streaming module results returned with detailed output enabled) correspond; then ask a question with no matching material, and confirm that the array is empty while the pipeline runs through.

Business test: use one week of records to verify the total, see whether the scope and exceptions are clearly stated, whether the number of records matches the statistical count, and whether the header states the statistical scope and counting rules.

- In the node, check the selected knowledge base collections and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Run a test with a query that has no matching material, see that the output is empty while the pipeline continues, and separately record the number of array items and the `quoteMaxToken` budget.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
