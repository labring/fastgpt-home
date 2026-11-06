---
title: Citations and Source Traceability for Peer Review Organization: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c067-f010
page_type: 行业问题页
application_area: education
meta_title: Peer Review | Citations | Intake
meta_description: Peer Review: review citations for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Peer Review Organization: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the question acceptance and missing-item follow-up scenarios of peer review organizations. The materials include three types: review invitations, expert review comments, and author revision notes. A review invitation carries the manuscript title, submission date, expert identity, and receipt signature; expert review comments carry the review conclusion, comment items, submission date, and signature; author revision notes carry point-by-point responses, revised manuscript version, date, and signature. When these three types of materials enter the knowledge base retrieval node, each is retrieved and referenced back as a citation source, used to compare whether the name, quantity, and date of the same record are consistent, and to identify missing items such as unsynchronized versions, missing signatures, or missing receipts. The update rhythm advances with review rounds; each round produces a new version and receipt, and old and new versions coexist. The field characteristics are multiple sources, multiple dates, and multiple signature positions. The same question item may be scattered across different materials, so missing items must first be identified and then followed up to be completed.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation contents, each containing an original text snippet and a source identifier, and the length may be 0. The acceptance record and the question items to be completed are then handled by subsequent AI nodes, code nodes, or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| Review invitation | Check whether the manuscript title, submission date, expert identity, and receipt signature are complete, and whether they match the same record in the expert review comments | In the node, check the selected collections and their vector models, open the citation marker to compare against the source document, and use `quoteList` to view hit details |
| Expert review comments | Check the review conclusion, comment items, submission date, and signature, and whether the number and dates of response items in the author revision notes are consistent | Run a test with a question that has no matching materials, see that the output is empty while the chain continues, and record the number of array entries and the tokens of the citation text |
| Author revision notes | Check the point-by-point responses, revised manuscript version, date, and signature, and determine whether the version is synchronized and whether signatures or receipts are missing | Open the search parameter panel and check each item, confirm that the values are consistent with those set in the knowledge base retrieval section, and when `quoteMaxToken` is involved, only check the citation text budget |
| Citation content output | Check that the number of returned entries matches the matched materials; empty is also normal, and each citation can be traced back to the original paragraph | In the conversation, open the citation marker, compare against the source document, and confirm that the citation array in `responseData` (non-streaming module results returned with detailed output enabled) corresponds to the markers |

## Three common errors

- Symptom: there is no citation marker in the answer. Cause: the citation array is empty or the citations do not correspond to the original text; first check whether this round hit anything and which material was hit, then look at trimming.
- Symptom: the name, quantity, and date of the same record do not match between the review invitation and the expert review comments. Cause: versions are not synchronized, and old and new versions coexist; compare item by item by date and signature position.
- Symptom: the author revision notes are missing a signature or receipt. Cause: the materials are incomplete, and the missing items were not identified and followed up; first follow up to complete them, then forward to the handler.

## How to verify the setup

Acceptance of this feature: ask a question with original-text support, and check whether the citation array and markers can be traced back to the original text; then ask a question with no matching materials, confirm that the array is empty while the chain runs through, and separately record the number of array entries and the tokens of the citation text.

Business test: submit a question missing key information, and see whether it follows up first before answering, and whether the follow-up items correspond to the missing items in the review invitation, expert review comments, and author revision notes.

- In the node, check the selected knowledge base collections and their vector models, open the search parameter panel and check each value item by item, and when `quoteMaxToken` is involved, only check the citation text budget.
- Run a test with a question that has no matching materials, see that the output is empty while the chain continues, open the citation marker to compare against the source document, and confirm that the citation array in `quoteList` and `responseData` corresponds to the markers.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
