---
title: Citations and Source Traceability for School Safety Inspections and Incident Reporting: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c016-f010
page_type: 行业问题页
application_area: education
meta_title: Campus Safety | Citations | Checks
meta_description: Campus Safety: review citations for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for School Safety Inspections and Incident Reporting: Compare Documents and Locate Differences

## What this category's data looks like

For school safety hazard inspections and campus incident reporting, materials fall into three categories: safety inspection forms, hazard rectification ledgers, and emergency incident reports. Safety inspection forms are filled out by inspectors by location, including inspection items, dates, and signatures; hazard rectification ledgers are compiled by safety officers, including hazard names, quantities, rectification deadlines, responsible persons, and receipts; emergency incident reports are submitted by duty personnel, including incident names, occurrence dates, number of people involved, and handling signatures. The three types of materials have different update rhythms: inspection forms weekly, ledgers monthly, and incident reports as they occur. After entering the knowledge base retrieval node, safety inspection forms provide original locations and dates, ledgers provide rectification status and quantities, and incident reports provide incident details and signatures. The three serve as mutual verification bases for locating discrepancies in names, quantities, and dates of the same object across two materials.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each containing the original text snippet and source identifier, and the length can be 0. The "discrepancy list" is completed subsequently by AI nodes, code nodes, or manual work; this node is only responsible for handing over the matched original text snippets and source identifiers.

| Object | Check | Verification action |
| --- | --- | --- |
| Safety inspection form | Inspection item names, inspection dates, and inspector signatures correspond item by item with ledger records | Retrieve the original text snippet of this form from the citation array, compare it with the ledger for the same location's name, date, and signature, and record inconsistent fields |
| Hazard rectification ledger | Hazard names, quantities, rectification deadlines, and receipts correspond with inspection forms and incident reports | Open the citation marker to refer back to the ledger paragraph, and verify whether the name, quantity, and date of the same hazard are consistent across the two materials |
| Emergency incident report | Incident names, occurrence dates, number of people involved, and handling signatures correspond with the ledger | Use `quoteList` to expand the citation entry, compare it with the report's original text and ledger records, and mark fields missing signatures or receipts |
| Associated knowledge base and search parameters | The selected collection uses the same vector model, and search parameter values are consistent with the knowledge base retrieval section | Verify the vector model of each selected knowledge base item by item, open the search parameter panel to check the values, and record `quoteMaxToken` and the number of citations in `responseData` (non-streaming module results returned with detailed output enabled) |

## Three common errors

- Phenomenon: The name, quantity, and date of the same hazard do not match between the inspection form and the ledger. Cause: The two materials were filled out by different people using different standards, without field alignment.
- Phenomenon: The ledger has been updated to a new version, but the inspection form is still the old version, and the cited snippet does not match the original text. Cause: Versions were not synchronized, and the retrieval hit historical materials.
- Phenomenon: The incident report lacks a signature or receipt, the citation array is empty, but the chain continues. Cause: The materials are incomplete; an empty array is a normal output and does not mean retrieval failure.

## How to verify the setup

This feature's acceptance: ask a question with original text evidence, and verify whether the citation array and markers can refer back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain completes.

Business test: use a real record to find fields inconsistent with the ledger, write them into the discrepancy list for the reviewer to confirm and write back.

- Open the citation markers and verify item by item whether the cited snippets match the original paragraphs against the source documents
- Record the number of citations and `quoteMaxToken`; record the number of citations separately by array length, and do not compare it for equality with the budget

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
