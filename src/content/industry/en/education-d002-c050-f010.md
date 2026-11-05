---
title: Citations and Source Traceability for Foreign Teacher Recruitment and Course Scheduling: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c050-f010
page_type: 行业问题页
application_area: education
meta_title: Foreign Teachers | Citations | Checks
meta_description: Foreign Teachers: review citations for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Foreign Teacher Recruitment and Course Scheduling: Compare Documents and Locate Differences

## What this category's data looks like

In the scenario of foreign teacher appointment and course scheduling, materials fall into three categories: appointment contracts, work permit materials, and course schedules. Appointment contracts include position, appointment period, salary, and signature page; work permit materials include name, ID number, permit category, validity period, and issuance receipt; course schedules include course name, class, weekly hours, instructor, and semester start and end dates. When these three types of materials enter the knowledge base retrieval node, each participates in vector search as an independent source. Contracts and permit materials are used to verify identity and appointment period, while course schedules are used to verify instructor and class hours. In terms of update cadence, contracts are updated by appointment batch, permit materials are updated upon issuance and renewal, and course schedules are updated by semester or schedule adjustment. Field characteristics are that names, ID numbers, dates, quantities, and signature status are scattered across different sources. The same object may have mismatched names, quantities, or dates in two materials. When versions are not synchronized or signatures and receipts are missing, discrepancies need to be located.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text snippet and source identifier, and the length can be 0. The discrepancy list is then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Appointment contract | Check whether the name, position, appointment start and end dates, salary amount, and signature page in the contract are complete | Locate the original contract snippet in the cited content, and verify the source identifier and signature field of that citation in `responseData` (non-streaming module results returned with detailed output enabled) |
| Work permit materials | Check whether the name, ID number, permit category, validity period, and issuance receipt in the permit materials are consistent | Open the citation marker to refer back to the original permit text, and verify the source document and validity period field in `quoteList` |
| Course schedule | Check whether the course name, class, weekly hours, instructor, and semester start and end dates match the contract appointment period | Compare the original course schedule snippets one by one in the citation array, and record fields with inconsistent names, quantities, or dates |
| Cited content output | The number of returned entries matches the hit materials; being empty is also normal | Run a test with a question that has no matching materials, confirm the array is empty while the pipeline runs through, and record the array length |

## Three common errors

- Phenomenon: The same teacher's name is written differently in the contract and permit materials. Cause: The two materials were entered in different stages, and name normalization was not performed.
- Phenomenon: The weekly hours in the course schedule are inconsistent with the contract agreement. Cause: Versions were not synchronized, and only one side's material was updated after schedule adjustment.
- Phenomenon: The permit materials lack an issuance receipt or the contract lacks a signature page. Cause: Scanned copies were not completed, and the cited snippets only cover the main text.

## How to verify the setup

Acceptance of this feature: first ask a question with original text evidence, and check whether the citation array and markers can refer back to the original text; then ask a question with no matching materials, confirm the array is empty while the pipeline runs through, and record the array length and the `quoteMaxToken` budget.

Business test: use one real record to find fields inconsistent with the ledger, and compare names, quantities, dates, and signature status item by item.

- In the node, verify whether the selected knowledge base collections and their vector models are consistent
- Open the search parameter panel and verify the values item by item; when citation limits are involved, verify the tokens of the cited text, and record the array entry count separately

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
