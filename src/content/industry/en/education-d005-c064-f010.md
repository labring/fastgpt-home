---
title: Citations and Source Traceability for University Laboratory Safety Classification: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c064-f010
page_type: 行业问题页
application_area: education
meta_title: Lab Safety Categories | Citations | Versions
meta_description: Lab Safety Categories: review citations for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for University Laboratory Safety Classification: Maintain Document Versions and Changes

## What this category's data looks like

In the university laboratory safety grading and classification scenario, materials entering the knowledge base retrieval typically include laboratory grading and classification tables, hazard source lists, and safety responsibility statements. The grading and classification table records room names, category levels, hazard source types, and determination dates; the hazard source list records names, quantities, storage locations, and update dates; the safety responsibility statement contains responsible persons, signatures, and receipt dates. These materials are often maintained by different departments at different times, with inconsistent update rhythms. The names, quantities, and dates of the same record in two materials can easily fail to match, and version desynchronization or missing signature receipts also occur from time to time. When entering this function, the three types of materials are associated as retrieval sources respectively: the grading and classification table is used to determine categories and responsibility attribution, the hazard source list is used to verify quantities and locations, and the safety responsibility statement is used to confirm whether signatures and receipts are complete, jointly supporting subsequent comparison and ledger generation.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and source identifier, and the length can be 0. The "version ledger and change records" are subsequently completed by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Laboratory grading and classification table | Check whether the name, category level, hazard source type, and determination date are consistent with the hazard source list | Open the citation superscript to compare against the original paragraph, compare field by field, and record discrepancies |
| Hazard source list | Check whether the quantity, storage location, and update date match the receipt date of the responsibility statement | Cross-check the fields of the same record in the two materials and mark inconsistent items |
| Safety responsibility statement | Check whether the responsible person, signature, and receipt date are complete | Compare against the citation source identifier to confirm that the signature field and receipt date have no omissions |
| Citation content output | The number of returned items is consistent with the matched materials; being empty is also normal | Run a test with a question that has no matching materials, and see whether the output is empty while the pipeline continues |

## Three common errors

- Phenomenon: The name and quantity of the same record do not match between the grading and classification table and the hazard source list. Cause: The two materials are maintained by different departments at different times, with inconsistent update rhythms, and no cross-checking was performed.
- Phenomenon: The hazard source list has been updated, but the responsibility statement remains at the old version. Cause: Versions are not synchronized, and there is a lack of a unified change record and version number tracking mechanism.
- Phenomenon: The signature field or receipt date of the responsibility statement is missing, and the cited fragment cannot point back to the complete original text. Cause: Material archiving is incomplete, and after retrieval hits, the source identifiers were not checked one by one.

## How to verify the setup

Acceptance of this function: first ask a question with original text evidence, check whether the citation array and superscript can point back to the original paragraph, and record the array length and the `quoteMaxToken` budget for separate verification; then ask a question with no matching materials, and confirm that the array is empty while the pipeline runs through.

Business test: change one piece of content, see whether the version number and citations are updated synchronously, and check whether the cited fragments in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` are updated as the original text changes.

- In the node, check the selected collections and their vector models, confirm that the associated knowledge bases use the same vector model, and open the search parameter panel to check the values item by item.
- Run a test with a question that has no matching materials, see whether the output is empty while the pipeline continues, and at the same time check against the source documents whether each citation can point back to the original paragraph.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
