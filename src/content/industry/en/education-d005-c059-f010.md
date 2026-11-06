---
title: Citations and Source Traceability for Research Budget Adjustments and Reimbursement: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c059-f010
page_type: 行业问题页
application_area: education
meta_title: Research Finance | Citations | Versions
meta_description: Research Finance: review citations for version tracking. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Research Budget Adjustments and Reimbursement: Maintain Document Versions and Changes

## What this category's data looks like

In the research funding budget adjustment and reimbursement scenario, materials entering the knowledge base retrieval node typically include three categories: budget adjustment applications, reimbursement forms, and contract invoices. Budget adjustment applications play the role of explaining inter-account amount changes and the approval chain; reimbursement forms play the role of documenting actual expenditure details and handler signatures; contract invoices play the role of corroborating counterparties, amounts, and invoice dates. These materials come from financial system exports, scanned document archives, and manual supplementary entry. Their update cadence follows approval workflows and monthly closing. The same transaction may leave fields in three places: the application, the reimbursement, and the contract. Field characteristics center on names, quantities, dates, signatures, and receipts: account names, expense item names, quantity units, occurrence dates, approval dates, signature fields, and receipt numbers. After materials enter this feature, each is cited as a retrievable original text passage, used for subsequent field comparison, ledger writing, and report generation.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content. Each entry contains an original text fragment and a source identifier, and the length may be 0. The version ledger and change records are completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Budget adjustment application | Check whether the account name, adjustment amount, effective date, and approval signature are consistent with the reimbursement form | Locate the original application fragment in the citation array, compare the account and date fields, and record the source identifier |
| Reimbursement form | Check whether the expense item name, quantity, occurrence date, handler signature, and receipt are complete | Use `responseData` (non-streaming module results returned with detailed output enabled) to inspect the node return structure, and compare each cited fragment against the document fields one by one |
| Contract invoice | Check whether the counterparty, amount, invoice date, and contract number match across the three materials | Open the citation marker to trace back to the original text, and check the source identifier and document passage in `quoteList` |
| Knowledge base retrieval node | Check that the selected collection uses the same vector model, that the number of citations matches the hit materials, and that an empty result is also normal | Run a test with a question that has no matching materials, confirm the array is empty while the chain continues, and record the `quoteMaxToken` budget |

## Three common errors

- Symptom: The account name, quantity, and date for the same record do not match between the budget adjustment application and the reimbursement form. Cause: The two materials were entered at different stages, field definitions were not unified, and fields were not compared one by one after retrieval hits.
- Symptom: The contract invoice has been updated, but the knowledge base still returns the old fragment, and the version number and citation are out of sync. Cause: After the update, the document was not re-ingested or the old document was not replaced, so retrieval still hits the historical passage.
- Symptom: The reimbursement form lacks a handler signature or receipt number, and the cited fragment cannot support the approval chain. Cause: The scanned document has missing pages or supplementary entry was omitted, so the retrieved passage itself is incomplete.

## How to verify the setup

Feature acceptance: Ask a question that has original text support, and check whether the citation array and markers can trace back to the original text; then ask a question with no matching materials, and confirm the array is empty while the chain still runs.

Business test: Change one piece of content and see whether the version number and citation update in sync.

- Open the search parameter panel and check each value item by item, confirming it is consistent with the settings in the knowledge base retrieval section; record the number of citations separately by array length, and treat `quoteMaxToken` only as the citation content budget, without comparing the two for equality.
- Open the citation markers in the conversation and check against the source documents whether each citation can trace back to the original text passage; if a citation does not match the original text, first check whether this turn had a hit and which material was hit, then check trimming.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
