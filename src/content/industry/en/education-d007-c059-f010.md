---
title: Citations and Source Traceability for Research Budget Adjustments and Reimbursement: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c059-f010
page_type: 行业问题页
application_area: education
meta_title: Research Finance | Citations | Review
meta_description: Research Finance: review citations for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Research Budget Adjustments and Reimbursement: Trace Exceptions and Review Results

## What this category's data looks like

Research funding budget adjustment and reimbursement materials include three categories: budget adjustment applications, reimbursement forms, and contract invoices. A budget adjustment application records the adjusted account, amount, reason, and approval signature, with dates falling in the application and approval stages; a reimbursement form records expense details, quantity, date, and handler signature, and is the direct voucher for expenditure; a contract invoice records the contract number, invoicing name, amount, and signed receipt, and is the external basis. When the three categories of materials enter the knowledge base retrieval node, each is retrieved as an independent citation source, and upon a hit is returned as an original text snippet plus a source identifier. The materials update at different rhythms: budget adjustments sync with approval, reimbursement forms are submitted by batch, and contract invoices update with invoicing and receipts. Field characteristics are concentrated in name, quantity, date, signature, and version number.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each entry containing an original text snippet and a source identifier, and the length may be 0. The "anomaly list and review conclusion" is completed afterward by a subsequent AI node, code node, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Budget adjustment application | Check whether the name, amount, date, and signature of the application and approval are consistent, and whether the version is in sync | Open the citation marker, compare against the original paragraph, and record field differences and missing signatures |
| Reimbursement form | Check whether the name, quantity, date, and receipt of the reimbursement form and contract invoice match | Compare the citation snippets one by one, check for differences in quantity and date, and verify whether the receipts are complete |
| Contract invoice | Check whether the contract number, invoicing name, amount, and signed receipt are consistent with the reimbursement form | Locate the original contract and invoice text in the citation content, and compare the number and amount fields |
| Citation content output | The number of returned entries matches the materials hit, and being empty is also normal | Run a trial with a question that has no matching materials, see that the output is empty while the chain continues, and record the array length and the `quoteMaxToken` budget |

## Three common errors

- Symptom: the name, quantity, and date of the same expenditure do not match between the reimbursement form and the contract invoice. Cause: the two materials are entered in different stages, the field definitions are not unified, the citation snippets are returned independently of each other, and the differences are not compared.
- Symptom: a budget adjustment application has been approved but the reimbursement form still cites the old version. Cause: the version is not in sync, the new approval has not replaced the old material, the retrieval hit is still the old snippet, and the citation source identifier points to the old document.
- Symptom: the contract invoice lacks a signature or receipt, yet the reimbursement form has already entered review. Cause: material archiving is incomplete, the citation array returns snippets but lacks the signature page, and the reviewer has not checked the receipts one by one.

## How to verify the setup

This feature's acceptance: ask a question with original-text support, and check whether the citation array and markers can point back to the original text; then ask a question with no matching materials, confirm that the array is empty while the chain runs through, and record the array entry count and the `quoteMaxToken` budget, without comparing the two for equality.

Business test: create an anomaly record and see whether it can be traced back to the source material

- Open the citation markers in the conversation, compare against the source documents, check the original text snippets and source identifiers one by one, and inspect the citation array length in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList`
- Run a trial with a question that has no matching materials, confirm that the output is empty while the chain continues, and separately record the citation entry count and the `quoteMaxToken` budget

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
