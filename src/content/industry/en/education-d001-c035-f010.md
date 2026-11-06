---
title: Citations and Source Traceability for Enterprise Employee Skills Assessment: Find Supporting Evidence
slug: /en/industry/education-d001-c035-f010
page_type: 行业问题页
application_area: education
meta_title: Employee Skills | Citations | Evidence
meta_description: Employee Skills: review citations for evidence lookup. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Enterprise Employee Skills Assessment: Find Supporting Evidence

## What this category's data looks like

This page addresses the scenario of enterprise independent skill talent evaluation. Materials include the enterprise evaluation filing form, evaluation specifications, and the candidate roster. The filing form states the evaluation entity, occupational direction, filing date, and seal; the evaluation specifications state the level, modules, assessment methods, and scoring criteria; the roster states candidate names, ID numbers, declared levels, and signed receipts. The three types of materials are archived by batch and updated as filings change, specifications are revised, and lists are supplemented. After entering the knowledge base retrieval node, the filing form serves as the basis for the entity and scope, the evaluation specifications serve as the basis for levels and assessment, and the roster serves as the basis for personnel and declarations, each being cited as original text fragments. Field characteristics are concentrated in four categories: names, quantities, dates, and signatures. When comparing across materials, inconsistent expressions of the same record are most likely to occur.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text fragment and a source identifier, and the length may be 0. "Basis items that can be traced back to the original text" are completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Enterprise evaluation filing form | Whether the entity, occupational direction, filing date, and seal correspond to the evaluation specifications | Open the citation marker to trace back to the original filing form text, and verify the three fields: name, date, and signature |
| Evaluation specifications | Whether the level, modules, assessment methods, and scoring criteria are the current version | Compare the version number and effective date, and confirm that the cited fragment comes from the current text, not an old version |
| Candidate roster | Whether candidate names, ID numbers, declared levels, and signed receipts are complete | Trace back item by item to the original roster text, verify the quantity and signature column, and record missing items |
| Citation content output | The number of returned items is consistent with the matched materials; being empty is also normal | Run a test with a question that has no matching materials, see that the output is empty while the pipeline continues, and record the array length and the `quoteMaxToken` budget |

## Three common errors

- Phenomenon: The same candidate's name and quantity do not match between the roster and the filing form. Cause: The two materials were entered separately, and no cross-material field comparison was performed.
- Phenomenon: The evaluation specifications cite old-version levels and modules. Cause: The version was not synchronized, and the current text did not replace the archived materials.
- Phenomenon: The filing form or roster lacks signatures and receipts, yet the cited fragments are still treated as basis. Cause: The signature column was not checked when the materials were archived, and retrieval returns them according to the original text.

## How to verify the setup

Acceptance of this feature: ask a question with original-text basis, check whether the citation array and markers can trace back to the original text, and view the cited fragments in `quoteList` of `responseData` (non-streaming module results returned with detailed output enabled); then ask a question with no matching materials, and confirm that the array is empty while the pipeline runs through.

Business test: ask a cross-material basis question and see whether the answer provides a traceable source.

- In the node, verify whether the selected knowledge base collections and their vector models are consistent, and open the search parameter panel to check the values item by item.
- Run a test with a question that has no matching materials, record the array length and the `quoteMaxToken` budget, and do not compare the two for equality.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
