---
title: Citations and Source Traceability for Research Budget Adjustments and Reimbursement: Track Progress and Check Statistics
slug: /en/industry/education-d006-c059-f010
page_type: 行业问题页
application_area: education
meta_title: Research Finance | Citations | Progress
meta_description: Research Finance: review citations for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Research Budget Adjustments and Reimbursement: Track Progress and Check Statistics

## What this category's data looks like

Materials for progress records and statistical verification of research funding budget adjustments and reimbursements include three types: budget adjustment applications, reimbursement forms, and contract invoices. Budget adjustment applications carry the adjusted account, original budget amount, adjusted amount, application date, and approval signature; reimbursement forms carry the expense name, quantity, amount, occurrence date, and handler signature; contract invoices carry the contract number, invoice number, invoice date, amount, and receipt. When the materials enter the knowledge base retrieval node, each serves as a cited original passage for the citation output to trace back to its source. The update rhythm is weekly collection and monthly aggregation, and the field characteristics are concentrated in four places: name, quantity, date, and signature. If the name, quantity, and date of the three types of materials on the same record do not match, or if versions are not synchronized or signatures/receipts are missing, the subsequent ledger and totals will be distorted. Therefore, the progress table and statistical scope description must first clarify the field sources and exception handling.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original passage fragment and source identifier, and the length may be 0. The progress table and statistical scope description are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Budget adjustment application | Whether the adjusted account, original budget amount, adjusted amount, application date, and approval signature are complete, and whether the date and signature can correspond to the contract invoice | Open the citation marker in the citation output to trace back to the original passage, compare fields and dates item by item, and record entries missing signatures or receipts |
| Reimbursement form | Whether the expense name, quantity, amount, occurrence date, and handler signature are consistent with the budget adjustment application, and whether the name, quantity, and date on the same record match | Use the cited fragment to trace back to the original text, verify the quantity and date, and when inconsistencies are found, note whether the versions are synchronized |
| Contract invoice | Whether the contract number, invoice number, invoice date, amount, and receipt are consistent with the reimbursement form, and whether signatures or receipts are missing | Verify the invoice date and amount against the source document, check the receipt, and record the number of citations and the `quoteList` in `responseData` (non-streaming module results returned with detailed output enabled) |
| Cited content output | Whether the number of returned entries matches the matched materials; being empty is also normal; whether the cited fragment can trace back to the original text | Run a test with a question that has no matching materials to see whether the array is empty while the pipeline still runs; when the citation limit is involved, check the tokens of the cited text, record the array length separately, and treat `quoteMaxToken` only as the content budget |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the budget adjustment application and the reimbursement form. Cause: The two materials are entered separately and are not checked against the same field scope, causing deviations in subsequent statistical totals.
- Symptom: The contract invoice version is not synchronized, and the old invoice number or amount is still cited. Cause: After the materials are updated, they are not re-collected, the cited fragment still points to the old passage, and the latest original text is not traced back during verification.
- Symptom: The reimbursement form lacks the handler signature or the contract invoice lacks the receipt. Cause: During material circulation, signatures and receipts are not fully collected; the citation output only outputs the cited content array, and field completeness is checked by subsequent nodes or manually.

## How to verify the setup

Acceptance of this feature: ask a question with original-text support and check whether the citation array and citation markers can trace back to the original text; then ask a question with no matching materials and confirm that the array is empty while the pipeline still runs. The number of citations is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality. If the citation limit is involved, check the tokens of the cited text and record the array length separately.

Business test: use one week of records to verify the totals and see whether the scope and exceptions are clearly stated. Check whether the name, quantity, date, and signature of the three types of materials—budget adjustment applications, reimbursement forms, and contract invoices—match, and whether exception entries are noted in the header scope.

- Open the citation markers, compare them one by one against the source documents, confirm that each citation can trace back to the original passage, and record the length of the citation array.
- Run a test with a question that has no matching materials, confirm that the output is empty while the pipeline continues, and at the same time verify that the search parameters are consistent with the values in the knowledge base retrieval section.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
