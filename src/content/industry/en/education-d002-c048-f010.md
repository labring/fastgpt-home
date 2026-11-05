---
title: Citations and Source Traceability for Sino-Foreign Education Establishment and Annual Reports: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c048-f010
page_type: 行业问题页
application_area: education
meta_title: Joint Education | Citations | Checks
meta_description: Joint Education: review citations for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Sino-Foreign Education Establishment and Annual Reports: Compare Documents and Locate Differences

## What this category's data looks like

The data for this category looks like this: Material verification and discrepancy location for the establishment and annual reports of Sino-Foreign cooperative education institutions revolve around three types of materials: the establishment application, the cooperation agreement, and the articles of association. The establishment application carries the institution name, education level, enrollment scale, and submission date; the cooperation agreement stipulates the names of the Chinese and foreign parties, contribution amounts, signing date, and validity period; the articles of association specify the governance structure, responsible persons, signature, and receipt requirements. The material sources are the application system and the archived ledger, and the update rhythm rolls forward with the establishment, change, and annual report milestones. When the three types of materials enter the knowledge base retrieval node, each is cited as an independent source, and the cited snippets point back to the original paragraphs, used for subsequent comparison of whether the name, quantity, and date of the same record are consistent, and to locate discrepancies such as unsynchronized versions, missing signatures, or receipts.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each containing the original snippet and source identifier, and the length can be 0. The "discrepancy list" is completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Establishment application | Whether the institution name, education level, enrollment quantity, submission date, and signature correspond to the cooperation agreement and articles of association | Open the citation corner mark to point back to the original paragraph, compare the name, quantity, and date field by field, and record inconsistent items |
| Cooperation agreement | Whether the names of the Chinese and foreign parties, contribution amounts, signing date, validity period, and signature receipt are consistent with the application and articles of association | Check the number of citation array entries and the hit materials, and check whether the citation text under the `quoteMaxToken` budget is complete |
| Articles of association | Whether the governance structure, responsible persons, signature, and receipt requirements are synchronized with the application and cooperation agreement | Use `responseData` (non-streaming module results returned with detailed output enabled) to view the citation output, use `quoteList` to locate the specific snippet, and mark places where the version is not synchronized |
| Associated knowledge base | The selected knowledge base is of the same vector model, and the collection and vector model are consistent within the node | Check the selected collections and their vector models in the node, and confirm that the citation source can be traced back |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match between the establishment application and the cooperation agreement. Cause: The two materials were revised separately, no field-level comparison was made, and the cited snippets did not point back to the same paragraph.
- Phenomenon: The versions of the articles of association and the cooperation agreement are not synchronized, and the cited snippets point to the old version. Cause: The knowledge base was not reindexed as the materials were updated, retrieval hit the old paragraphs, and the discrepancy was carried into subsequent comparison.
- Phenomenon: The materials lack signatures or receipts, but the citation array still returns snippets. Cause: The citation output only reflects the hit content and does not judge whether the materials are complete; the signature and receipt fields need manual verification.

## How to verify the setup

Acceptance of this feature: ask a question with original text support, and check whether the citation array and corner marks can point back to the original text; then ask a question with no matching materials, confirm that the array is empty while the pipeline runs through, and record the number of citations and the `quoteMaxToken` budget for separate verification.

Business test: use one real record to find fields inconsistent with the ledger, hand it to the reviewer for confirmation, and write back.

- Open the search parameter panel and check item by item, confirm that the values are consistent with the knowledge base retrieval section, and record the number of citations separately according to the array length
- Open the citation corner marks in the conversation, compare with the source documents, use `quoteList` to locate snippets, and mark inconsistent items in name, quantity, and date

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
