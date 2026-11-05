---
title: Citations and Source Traceability for Research Project Task Agreement Signing: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c058-f010
page_type: 行业问题页
application_area: education
meta_title: Research Agreements | Citations | Operations
meta_description: Research Agreements: review citations for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Research Project Task Agreement Signing: Coordinate Operations and Application Handover

## What this category's data looks like

In the scenario of signing scientific research project task books, the materials include three types: project task books, topic task breakdown tables, and budget books. The project task book provides the project name, undertaking unit, start and end dates, and signature fields; the topic task breakdown table breaks the research content down into topics, subtasks, and responsible persons, with milestone dates; the budget book lists budget subjects, amounts, sources, and approval signatures. When these three types of materials enter the knowledge base retrieval node, their roles differ: the task book is the primary record source, the breakdown table is used to verify topic names and quantities, and the budget book is used to verify funding subjects and dates. In terms of update rhythm, multiple rounds of revisions often occur during the signing stage, and version numbers, signing dates, and receipt statuses change successively. If old-version materials are not synchronized, retrieval will hit both old and new fragments at the same time. In terms of field characteristics, names, quantities, dates, signatures, and version numbers are anchors for cross-material comparison. The same record may be written inconsistently in different materials, and it is necessary to trace each cited fragment back to the original paragraph one by one.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original fragment and a source identifier, and the length can be 0. Even if no content is retrieved, the output chain will still run through. The deployable state and operation records that can be handed over are completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Project task book | Check whether the project name, start and end dates, and signature fields are complete, and whether they are consistent with the corresponding fields in the breakdown table and budget book | In the node, view the cited fragments, trace them back to the original paragraphs of the task book, and record the three items: name, date, and signature; at the same time, view the number of items in the citation array in `responseData` (non-streaming module results returned with detailed output enabled) |
| Topic task breakdown table | Check the topic names, number of subtasks, responsible persons, and milestone dates, and whether the same record matches that in the task book and budget book | Open the citation markers to compare against the original text of the breakdown table, and compare names and quantities one by one; record the array length separately, and do not compare the number of items with `quoteMaxToken` for equality |
| Budget book | Check the funding subjects, amounts, sources, approval signatures, and version number, and confirm that they are synchronized with the versions of the task book and breakdown table | In the search parameter panel, check the values, open the cited fragments to see whether `quoteList` points to the original text of the budget book; if signatures or receipts are missing, note them on the handover form |
| Handover form | Check whether the version, connection, and task records are consistent, and record which item is missing | Check item by item according to the handover form once, and record missing items; when the citation array is empty, state that it is empty while the chain runs through |

## Three common errors

- Phenomenon: The same topic name is written differently in the task book and the breakdown table. Cause: During revision, only one material was changed and the other was not synchronized, so retrieval hits both old and new fragments at the same time.
- Phenomenon: The amount in the budget book does not match the quantity in the task book. Cause: Multiple rounds of adjustment before signing, version numbers were not synchronized, and old-version fragments still remain in the knowledge base and are retrieved.
- Phenomenon: Cited fragments do not match the original text. Cause: First check whether this round hit and which material was hit, then look at trimming, and do not directly attribute it to length trimming.

## How to verify the setup

Acceptance of this function: ask a question with original-text support, check whether the citation array and markers can trace back to the original paragraphs, and view the number of citations and the `quoteList` source identifier in `responseData`; then ask a question with no matching material, and confirm that the array is empty while the chain runs through.

Business test: check item by item according to the handover form once, see which record is missing, and write whether the version, connection, and task records are consistent into the handover form.

- In the node, check the selected knowledge base collections and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Open the search parameter panel and check the values item by item, and use a question with no matching material for a trial run to see whether the output is empty while the chain continues.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
