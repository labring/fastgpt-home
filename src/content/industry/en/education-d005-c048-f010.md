---
title: Citations and Source Traceability for Sino-Foreign Education Establishment and Annual Reports: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c048-f010
page_type: 行业问题页
application_area: education
meta_title: Joint Education | Citations | Versions
meta_description: Joint Education: review citations for version tracking. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Sino-Foreign Education Establishment and Annual Reports: Maintain Document Versions and Changes

## What this category's data looks like

The establishment and annual reports of Chinese-foreign cooperative education institutions involve materials such as the establishment application, cooperation agreement, and articles of association, and the fields, dates, and signatures of the three must correspond to one another. The establishment application carries the institution name, education level, cooperating parties, and proposed majors; the cooperation agreement stipulates the rights and responsibilities of both parties, the term, and the signature page; the articles of association set out the governance structure, rules of procedure, and the clauses for signing and taking effect. When the materials enter the knowledge base retrieval node, each participates in hits as an independent source, and the citation output points back to specific paragraphs and source identifiers based on the original text fragments. The update rhythm usually follows material revisions, supplementary agreement signing, and the annual report filing cycle; if the name, quantity, or date of the same record does not match across two materials, the versions are not synchronized, or signatures or receipts are missing, the cited fragments will become disconnected from the current version.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text fragment and a source identifier, and the length may be 0. The version ledger and change records are completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Establishment application | Whether the institution name, education level, cooperating parties, proposed majors, and date and signature are consistent with the cooperation agreement and articles of association | Compare the corresponding paragraphs of the application with the cooperation agreement and articles of association field by field, and record discrepancies and their source identifiers |
| Cooperation agreement | Whether the rights and responsibilities of both parties, the term, the signature page, and the receipt are complete, and whether the clause numbers are consistent with the references in the articles of association | Check the signature page and receipt, compare the reference positions of the clause numbers in the articles of association, and mark the version number |
| Articles of association | Whether the governance structure, rules of procedure, and effective clauses correspond to the wording in the establishment application and cooperation agreement | Compare the clauses of the articles of association with the names, quantities, and dates in the other two materials, and confirm that the current version is unique |
| Citation content output | The number of returned items is consistent with the materials hit, and being empty is also normal | Run a test with a question that has no matching materials, and see whether the output is empty while the chain continues; record the array length and `quoteMaxToken`, and do not compare the two for equality |

## Three common errors

- Phenomenon: The same institution name is written differently in the application and the articles of association, and the dates also do not match. Cause: The two materials were revised separately, without field-level comparison and version synchronization.
- Phenomenon: The cooperation agreement has already been replaced with a new version, but the knowledge base still hits the old clauses. Cause: The old version is traceable but the current version is not marked, and citations were not synchronized with the update.
- Phenomenon: The signature page or receipt is missing, and the cited fragment cannot point back to complete signing information. Cause: The material archive is incomplete, and the retrieved paragraph itself lacks a signature or receipt.

## How to verify the setup

Acceptance of this function: ask a question with textual support, check whether the citation array and superscript can point back to the original text, and inspect the source identifier of `quoteList` in `responseData` (non-streaming module results returned with detailed output enabled); then ask a question with no matching materials, and confirm that the array is empty while the chain runs through.

Business test: change one piece of content and see whether the version number and citations are updated in sync.

- Open the search parameter panel and check the values item by item, confirming that the selected knowledge base uses the same vector model.
- Open the citation superscript in the conversation, compare it with the source documents, and record the number of citations and the `quoteMaxToken` budget one by one.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
