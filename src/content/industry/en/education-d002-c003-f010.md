---
title: Citations and Source Traceability for Kindergarten Healthcare and Meal Management: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c003-f010
page_type: 行业问题页
application_area: education
meta_title: Child Health and Meals | Citations | Checks
meta_description: Child Health and Meals: review citations for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Kindergarten Healthcare and Meal Management: Compare Documents and Locate Differences

## What this category's data looks like

This page addresses kindergarten health care and meal management scenarios. Materials include procurement documents, menu plans, retention sample records, disinfection records, absence cause registration, and ledgers. Procurement documents are issued by suppliers and record ingredient names and specifications; menu plans are compiled by the health office and list daily meals and categories; retention sample records register time and sampler by batch; disinfection records are registered entry by entry by disinfection period; absence cause registration falls under the category of absence due to illness; the ledger is the consolidated master record. After these materials enter the knowledge base retrieval node, they are recalled as citation sources. Each citation retains the original text fragment and source identifier for subsequent field comparison. The update cadence is daily or per batch. Field characteristics are mainly names, quantities, dates, batches, periods, and cause classification. The same object may be written inconsistently across different materials.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each containing the original text fragment and source identifier, and the length may be 0. The "discrepancy list" is completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Procurement documents and retention sample records | Whether ingredient names and specifications, retention sample time and batch are consistent | Compare names, specifications, batches, and dates one by one in the citation array, mark inconsistent fields, and record the number of citations and the respective values of `quoteMaxToken` |
| Menu plans and procurement categories | Whether the categories listed in the menu are consistent with the procurement categories | Open the citation marker to trace back to the original paragraph, verify category names and quantities, and write discrepancies into the field pending review |
| Disinfection records | Whether disinfection periods are continuous and whether any periods are missing | Verify the periods in the citation fragments one by one by date, list missing periods separately, and do not modify the original records |
| Absence cause registration and ledger | Whether the absence cause classification is consistent with the ledger | Use one real record to compare the cause classification field, confirm that the citation source can be traced back, and hand discrepancies to the reviewer for write-back |

## Three common errors

- Phenomenon: documents and retention sample batches do not match. Cause: the same ingredient has different batch formats in different materials, the citation fragments were not traced back to the original text one by one, and they were misjudged as the same batch during comparison.
- Phenomenon: menu and procurement categories are inconsistent. Cause: the menu lists categories by meal, while procurement lists names by specification. After citation recall, alignment was not performed by category field, causing discrepancies to be missed.
- Phenomenon: disinfection records are missing periods. Cause: disinfection periods are registered in segments in the original text, the citation array recalled only some fragments, and without checking the materials hit in this round, it was attributed to trimming.

## How to verify the setup

This feature acceptance: ask a question with original-text evidence, check whether the citation array and markers can trace back to the original text, and record the number of citations and the respective values of `quoteMaxToken`; then ask a question with no matching materials to confirm that the array is empty while the pipeline still runs through.

Business test: use one real record to find a field inconsistent with the ledger, hand it to the reviewer for confirmation and write-back. When the citation array is empty, first check the materials hit in this round, then check trimming.

- In the node, verify whether the selected knowledge base uses the same vector model, open the search parameter panel to check the values item by item, and inspect the citation array and `quoteList` field in `responseData` (non-streaming module results returned with detailed output enabled).
- Run a trial with a question that has no matching materials, confirm that the citation array is empty while the pipeline continues, then compare the source documents to check whether the citation fragments are consistent with the original text.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
