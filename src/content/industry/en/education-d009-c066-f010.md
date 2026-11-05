---
title: Citations and Source Traceability for Initial Review of Academic Journal Submissions: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c066-f010
page_type: 行业问题页
application_area: education
meta_title: Journal Submissions | Citations | Multilingual
meta_description: Journal Submissions: review citations for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Initial Review of Academic Journal Submissions: Handle Multilingual Materials and Terminology

## What this category's data looks like

In the initial review stage of academic journal submissions, multilingual materials and terminology handling involve three types of materials: the submitted manuscript, the author information form, and the plagiarism check report. The manuscript carries the main text and references, the author information form records names, affiliations, authorship order, and dates, and the plagiarism check report provides duplicated passages and their sources. When the materials enter the knowledge base retrieval node, the node outputs only an array of cited content, each item containing the original passage and a source identifier, and the length may be 0; the unified terminology list and the comparison draft must be handled next by subsequent AI nodes, code nodes, or manual work. The update rhythm of materials follows the manuscript version; the same manuscript may undergo revision, replacement, and supplementary materials, and when versions are not synchronized, the names, quantities, and dates in the two materials easily fail to match, and missing signatures or receipts may also occur. In terms of field characteristics, the manuscript is mainly paragraphs and terminology, the author information form is mainly structured fields, and the plagiarism check report is mainly passages and source identifiers.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original passage and a source identifier, and the length may be 0. The "unified terminology list and comparison draft" is completed next by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Submitted manuscript | Whether the same term is written consistently throughout and whether the translated name can refer back to the original passage | Open the source document at the citation superscript, compare the original passage and source identifier item by item, and record the number of citations |
| Author information form | Whether the names, quantities, and dates of the same record match across the two materials, and whether signatures or receipts are complete | Check the author information form side by side with the manuscript title page for fields, dates, and signatures, and register any inconsistencies separately |
| Plagiarism check report | Whether the duplicated passages and source identifiers can refer back to the original text, and whether the version is synchronized with the current manuscript | Open the citation superscript to compare with the source document of the plagiarism check report, and verify the passage positions and version dates |
| Citation content output | Whether the number of returned items matches the materials hit, and being empty is also normal | Run a test with a question that has no matching materials, and see whether the output is empty while the chain continues; then check the cited passages in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` |

## Three common errors

- Phenomenon: the same author name is written differently in the author information form and the manuscript title page. Cause: the two materials' versions are not synchronized, or the unified fields were not checked during data entry.
- Phenomenon: the number of duplicated passages in the plagiarism check report does not match the manuscript main text. Cause: the report was generated based on an old version, and after the manuscript was replaced it was not reissued or not synchronized.
- Phenomenon: the author information form lacks a signature or receipt, yet the manuscript has already entered the next stage. Cause: material collection and circulation records were not checked item by item, and omitted items were not registered.

## How to verify the setup

Acceptance of this feature: ask a question with textual evidence, and check whether the citation array and superscripts can refer back to the original text; then ask a question with no matching materials, confirm that the array is empty while the chain runs through, and at the same time record the number of array items and separately inspect the `quoteMaxToken` budget, without comparing the two for equality.

Business test: sample three terms to check whether their writing is consistent throughout, and verify whether the translated names can refer back to the original passages.

- In the node, check whether the selected knowledge base collections and their vector models are consistent, and open the search parameter panel to verify the values item by item.
- Run a test with a question that has no matching materials, confirm that the citation array is empty while the output chain continues, then open the citation superscript to compare with the source document.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
