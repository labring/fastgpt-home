---
title: Citations and Source Traceability for Research Budget Adjustments and Reimbursement: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c059-f010
page_type: 行业问题页
application_area: education
meta_title: Research Finance | Citations | Checks
meta_description: Research Finance: review citations for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Research Budget Adjustments and Reimbursement: Compare Documents and Locate Differences

## What this category's data looks like

In the research funding budget adjustment and reimbursement scenario, materials typically come from three categories: budget adjustment applications, reimbursement forms, and contract invoices. Budget adjustment applications record accounts, amount changes, and approval signatures; reimbursement forms record expense details, quantities, dates, and handler signatures; contract invoices record names, quantities, dates, amounts, and invoicing information. Materials enter the knowledge base in batches, with update cadence following the application and reimbursement cycles, and fields primarily consisting of names, quantities, dates, signatures, and receipts. When entering this feature, the three types of materials each serve as retrievable sources, providing citation output to locate the original text passages and offering a basis for subsequent comparison.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation contents, each containing an original text snippet and a source identifier, and the length can be 0. The "discrepancy list" is subsequently completed by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Budget adjustment application | Whether the names, quantities, and dates are consistent with the reimbursement form and contract invoice, and whether signatures and receipts are complete | Open the citation marker to trace back to the original text, compare field by field against the ledger, and record inconsistent items |
| Reimbursement form | Whether the names, quantities, and dates are consistent with the budget adjustment application and contract invoice, and whether versions are synchronized | Verify the cited snippets against the source documents, check signatures and receipts, and mark discrepant fields |
| Contract invoice | Whether the names, quantities, and dates are consistent with the budget adjustment application and reimbursement form, and whether the invoicing information corresponds | Compare against the citation sources, confirm the field correspondence, and write into the discrepancy list |
| Knowledge base retrieval node | Whether the selected knowledge bases use the same vector model, and whether the number of citation array entries matches the hit materials | Verify the selected collections and vector model, inspect `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList`, and record the array length and `quoteMaxToken` budget |

## Three common errors

- Phenomenon: The names, quantities, and dates of the same record do not match between the budget adjustment application and the reimbursement form. Cause: Material versions are not synchronized, or fields come from different sources during entry, and discrepancies are only discovered after tracing back the cited snippets.
- Phenomenon: The reimbursement form lacks signatures or receipts, and the contract invoice information is inconsistent with the application. Cause: Signatures were not completed in the circulation process, or invoice information was not written back to the ledger after updates, resulting in mismatched fields.
- Phenomenon: There are no citation markers in the answer, or the cited snippets do not match the original text. Cause: The corresponding material was not hit in this round, or a different record was hit; the hit situation must be checked first before examining the trimming.

## How to verify the setup

Acceptance of this feature: Ask a question with original text evidence, and check whether the citation array and markers can trace back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the pipeline runs through.

Business test: Use a real record to find fields inconsistent with the ledger, submit to the reviewer for confirmation, and write back.

- Open the search parameter panel and check item by item, confirm that the values are consistent with those in the knowledge base retrieval section, record the number of citations and the `quoteMaxToken` budget, and do not compare the two for equality.
- Open the citation markers in the conversation, compare against the source documents, verify whether each citation can trace back to the original text passage, and check the source identifiers in `quoteList` within `responseData`.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
