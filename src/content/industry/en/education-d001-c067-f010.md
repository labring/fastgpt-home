---
title: Citations and Source Traceability for Peer Review Organization: Find Supporting Evidence
slug: /en/industry/education-d001-c067-f010
page_type: 行业问题页
application_area: education
meta_title: Peer Review | Citations | Evidence
meta_description: Peer Review: review citations for evidence lookup. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Peer Review Organization: Find Supporting Evidence

## What this category's data looks like

For business basis lookup in peer review organizations, materials usually include three types: review invitations, expert review comments, and author revision notes. Review invitations record the invitation time, reviewer, manuscript number, and receipt status; expert review comments record comment items, dates, and signatures; author revision notes record point-by-point responses, version numbers, and submission dates. When the materials enter the knowledge base retrieval node, each is vectorized as an independent source, and the citation output returns the original text and source identifier according to the hit snippet. In terms of update cadence, revision notes are often replaced as versions iterate, review comments and invitations may be supplemented in batches, and receipt and signature statuses tend to lag. Field characteristics are concentrated in names, quantities, dates, signatures, and version numbers. When comparing across materials, it is necessary to trace each item back to the original passage and confirm that the basis comes from the materials in this repository and that the version is current.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original snippet and source identifier, and the length may be 0. The basis items that can be traced back to the original text are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Review invitation | Whether the invitation date, reviewer, manuscript number, receipt, and signature are complete and consistent with the current version | Open the citation marker to trace back to the original invitation text, and check the source identifier in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` |
| Expert review comments | Whether the comment items, dates, signatures, and manuscript number can be matched item by item with the invitation record | Check the cited snippets against the source document, and register the number of records and the `quoteMaxToken` budget separately |
| Author revision notes | Whether the point-by-point responses, version number, submission date, and receipt are synchronized with the current materials | Open the search parameter panel to check the values, and confirm that the number of items in the citation array matches the hit materials |
| Comparison of the same record across materials | Whether the names, quantities, and dates are consistent in the two materials, and whether missing signatures or receipts are marked | Run a trial with a cross-material question, and check whether the citation array can trace back to the respective original passages |

## Three common errors

- Symptom: the dates for the same manuscript number do not match between the invitation and the revision notes. Cause: the versions are not synchronized, and old-version materials are still being hit.
- Symptom: the number of review comment items is inconsistent with the number of responses in the revision notes. Cause: the two materials were supplemented in batches, and no cross-material field comparison was performed.
- Symptom: the answer has content but the citation array is empty. Cause: no materials were hit in this round; an empty array is a normal output and does not mean retrieval failed.

## How to verify the setup

This feature's acceptance: ask a question with an original-text basis, and check whether the citation array and markers can trace back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the pipeline still runs through.

Business test: ask a cross-material basis question, and see whether the answer provides a traceable source.

- In the conversation, open the citation markers and check the cited snippets against the source document item by item against the original passages.
- Run a trial with a question that has no matching materials, see that the output is empty while the pipeline continues, and separately record the number of items in the array.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
