---
title: Citations and Source Traceability for Off-Campus Training Registration and Compliance: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c045-f010
page_type: 行业问题页
application_area: education
meta_title: Training Compliance | Citations | Multilingual
meta_description: Training Compliance: review citations for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Off-Campus Training Registration and Compliance: Handle Multilingual Materials and Terminology

## What this category's data looks like

This category's data involves three core types of materials: the school operating license, course filing materials, and fee disclosure. The school operating license states the institution name, school address, license number, validity period, and issuing authority seal; the course filing materials include the course name, number of class hours, textbook version, target students, and filing date; the fee disclosure includes fee items, standards, refund rules, and disclosure date. The three types of materials often exist in parallel in multiple language versions, and the same term must be mutually traceable across different languages. When the materials enter the knowledge base retrieval node, each participates in vector search as an independent source, and the citation output returns the original text snippet and source identifier based on the hit material, for subsequent field comparison, ledger writing, and report generation. In terms of update cadence, license renewal, course adjustments, and fee changes all produce new versions; if old versions are not synchronized, the name, quantity, and date of the same record can easily fail to match across two materials, and missing signatures or receipts also need to be checked out in the citation snippets.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text snippet and source identifier, and the length can be 0. The "unified terminology glossary and comparison draft" is then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| School operating license | The license number, institution name, validity period, and issuing authority seal are consistent across language versions and can be traced back to the original text | Check the license fields and seal one by one in the citation array, use `quoteList` to expand the source identifier, and confirm there is no discrepancy in name and date |
| Course filing materials | The course name, number of class hours, textbook version, and filing date are consistent with the corresponding records in the fee disclosure | Extract three terms for the same course, check whether the wording is consistent throughout the document, and verify whether the number of citation entries in `responseData` (non-streaming module results returned with detailed output enabled) matches the number of hit materials |
| Fee disclosure | Fee items, standards, refund rules, disclosure date, and signature receipt are complete, and the version is synchronized with the filing materials | Open the citation superscript to compare with the source document, verify that `quoteMaxToken` is the citation content budget, and record the number of array entries separately without making an equality comparison |

## Three common errors

- Phenomenon: the same institution name is written differently in the license and the course filing materials. Cause: multilingual versions have not unified terminology, old versions have not been synchronously replaced, and citation snippets each trace back to different original texts.
- Phenomenon: the number of class hours or fee dates do not match between the two materials. Cause: versions are not synchronized, the update changes only one place, the other place still retains the old value, and they are presented side by side after retrieval hits.
- Phenomenon: the fee disclosure lacks a signature or receipt. Cause: the materials were not completed when archived, the citation output still returns snippets, and manual field comparison is needed for correction.

## How to verify the setup

This feature acceptance: ask a question with original-text support, and check whether the citation array and superscripts can trace back to the original text; then ask a question with no matching materials, confirm the array is empty while the pipeline runs through, and verify that `quoteMaxToken` and the number of array entries are recorded separately.

Business test: extract three terms and check whether the wording is consistent throughout the document

- In the node, check whether the selected knowledge base collections and their vector models are consistent, and open the search parameter panel to check the values item by item
- Run a trial with a question that has no matching materials, see that the output is empty while the pipeline continues, then open the citation superscript to compare with the source document and check whether each citation can trace back to the original text paragraph

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
