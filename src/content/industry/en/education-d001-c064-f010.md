---
title: Citations and Source Traceability for University Laboratory Safety Classification: Find Supporting Evidence
slug: /en/industry/education-d001-c064-f010
page_type: 行业问题页
application_area: education
meta_title: Lab Safety Categories | Citations | Evidence
meta_description: Lab Safety Categories: review citations for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for University Laboratory Safety Classification: Find Supporting Evidence

## What this category's data looks like

The safety grading and classification of university laboratories is a core ledger of campus safety management, and the materials usually include three types: the laboratory grading and classification table, the hazard source list, and the safety responsibility statement. The grading and classification table records, by room or laboratory unit, the category level, hazard source names and quantities, responsible person, and date; the hazard source list itemizes names, quantities, storage locations, and control measures for chemicals, gas cylinders, radiation sources, biological samples, etc.; the safety responsibility statement sets out the responsible person, signature, receipt, and signing date. The three types of materials are filled in by different positions at different times, with differing update rhythms: the grading and classification table changes as laboratories are adjusted, the hazard source list changes with procurement and disposal, and the responsibility statement is signed by academic year or upon personnel changes. After entering this function, the grading and classification table provides the level determination fields, the hazard source list provides the hazard source entry and quantity fields, and the safety responsibility statement provides the signature and date fields, together forming the basis sources that can be traced back to the original text.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text fragment and a source identifier, and the length may be 0. The "basis entries that can be traced back to the original text" are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Laboratory grading and classification table | Whether the category level, hazard source names and quantities, responsible person, and date can be matched item by item with the hazard source list | Open the citation superscript in the conversation, compare it with the original paragraph of the grading and classification table, and check the names, quantities, and dates |
| Hazard source list | Whether the hazard source entry names, quantities, storage locations, and control measures are consistent with the grading and classification table | Run a trial with a cross-material question and see whether the citation array gives a traceable source in the hazard source list |
| Safety responsibility statement | Whether the responsible person, signature, receipt, and signing date are complete, and whether the version is the current one | Check the signature and date fields in the cited fragment and confirm consistency with the current version of the responsibility statement |
| Cited content output | The number of returned items is consistent with the materials hit, and being empty is also normal | Run a trial with a question that matches no materials, see whether the output is empty while the chain continues, and record `quoteMaxToken` and the number of array items |

## Three common errors

- Phenomenon: the name or quantity of the same hazard source does not match between the grading and classification table and the hazard source list. Cause: the two materials are filled in by different positions at different times, and no field comparison was performed.
- Phenomenon: the signature or receipt in the responsibility statement is missing, and the date is still an old version. Cause: after personnel changes, the signing was not synchronized, and the version was not synchronized.
- Phenomenon: the answer has content but the citation array is empty, or the cited fragment does not match the original text. Cause: no materials were hit in this round, or a different material was hit, and it should not be directly attributed to length truncation.

## How to verify the setup

This function's acceptance: ask a question with an original-text basis and check whether the citation array and superscripts can be traced back to the original text; then ask a question with no matching materials, confirm that the array is empty while the chain runs through, and record the number of array items and `quoteMaxToken` respectively.

Business test: ask a cross-material basis question, see whether the answer gives a traceable source, and check the citation fields in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList`.

- In the node, check whether the selected knowledge base collections and their vector models are consistent, and open the search parameter panel to check the values item by item.
- Run a trial with a question that matches no materials, confirm that the citation array is empty while the chain continues, and then compare each citation against the source document to see whether it can be traced back to the original paragraph.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
