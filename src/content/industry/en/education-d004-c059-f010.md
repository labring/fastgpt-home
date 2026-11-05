---
title: Citations and Source Traceability for Research Budget Adjustments and Reimbursement: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c059-f010
page_type: 行业问题页
application_area: education
meta_title: Research Finance | Citations | Handover
meta_description: Research Finance: review citations for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Research Budget Adjustments and Reimbursement: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

Research funding budget adjustments and reimbursement material drafting and responsibility handover revolve around three types of materials: budget adjustment applications, reimbursement forms, and contract invoices. Budget adjustment applications record account, amount, adjustment reason, and approval date; reimbursement forms record expense details, quantity, amount, handler, and signature; contract invoices record contract name, invoice number, invoice date, and receipt. When these three types of materials enter the knowledge base retrieval node, each is retrieved as a citation source, providing original text snippets and source identifiers for subsequent field comparison, ledger writing, and report generation. In terms of update cadence, budget adjustment applications update with approval nodes, reimbursement forms update as the reimbursement process advances, and contract invoices update with invoicing and receipt. Field characteristics center on name, quantity, date, signature, and receipt. The same record's name, quantity, and date in two materials easily fail to match; versions not synchronized or missing signatures/receipts cause missing items to be blocked during handover.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation contents, each containing an original text snippet and a source identifier, and the length can be 0. "Signable material drafts and handover records" are subsequently completed by AI nodes, code nodes, or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| Budget adjustment application | Whether the account, amount, adjustment reason, and approval date are consistent across the two materials, and whether signatures are complete | Check the account name, amount, and date in the application and reimbursement form, confirm signatures and receipts; check the number of items in the citation content array and the source identifiers |
| Reimbursement form | Whether the expense details, quantity, amount, handler, and signature match the contract invoice | Compare item by item the name, quantity, and date in the reimbursement form and contract invoice, check whether versions are synchronized; check whether the citation snippets in `responseData` (non-streaming module results returned with detailed output enabled) can point back to the original text |
| Contract invoice | Whether the contract name, invoice number, invoice date, and receipt are consistent with the budget adjustment application | Check the name, amount, and date in the contract invoice and budget adjustment application, confirm the receipt; check whether the source identifiers in `quoteList` correspond to the original paragraphs |
| Knowledge base retrieval node | Whether the selected knowledge base uses the same vector model, and whether the citation content output goes through even when empty | Check the selected collection and vector model in the node; test with a question that has no matching materials, see that the array is empty while the pipeline continues; check that `quoteMaxToken` is the citation content budget, and record the number of items separately |

## Three common errors

- Symptom: The same record's name, quantity, and date in the budget adjustment application and reimbursement form do not match. Cause: During drafting, fields were not compared one by one according to the template, and there was no unified check before handover.
- Symptom: The versions of the contract invoice and reimbursement form are not synchronized, and signatures or receipts are missing. Cause: After materials were updated, they were not synchronized to related records, and signatures and receipts were not checked during handover.
- Symptom: There are no citation superscripts in the answer, or the citation snippets do not match the original text. Cause: First check whether this round hit and which material was hit, then look at trimming, and do not directly attribute it to length trimming.

## How to verify the setup

Acceptance for this feature: Ask a question with original text evidence, and check whether the citation content array and citation superscripts can point back to the original text; then ask a question with no matching materials, confirm that the array is empty while the pipeline goes through, and record the number of items and the `quoteMaxToken` budget.

Business test: Draft one according to the template and complete one handover, see whether missing items are blocked, and confirm that fields are complete, responsible parties are clear, and versions and dates are consistent.

- In the knowledge base retrieval node, check the selected knowledge base and vector model, open the search parameter panel, and check the values item by item.
- Test with a question that has no matching materials, see that the citation content array is empty while the pipeline continues; open the citation superscripts in the conversation, and check `quoteList` within `responseData` against the source documents.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
