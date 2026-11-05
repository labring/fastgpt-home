---
title: Citations and Source Traceability for Foreign Teacher Recruitment and Course Scheduling: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c050-f010
page_type: 行业问题页
application_area: education
meta_title: Foreign Teachers | Citations | Versions
meta_description: Foreign Teachers: review citations for version tracking. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Foreign Teacher Recruitment and Course Scheduling: Maintain Document Versions and Changes

## What this category's data looks like

This page addresses document versioning and change maintenance in the context of foreign teacher appointment and course scheduling. The core materials are appointment contracts, work permit materials, and course schedules. The appointment contract states the position, appointment period, compensation, and signature page; the work permit materials state the permit category, validity period, and receipt; the course schedule states the course name, weekly class hours, teaching dates, and teaching assignments. When these three types of materials enter the knowledge base retrieval node, each serves as a citable original source, and the cited content is output as an array, with each entry containing the original text snippet and source identifier. The update cadence is triggered by material changes: contract renewal or clause revision, permit extension or change, and course schedule adjustment or instructor replacement all require retaining the old version and generating a new version. The field characteristic is that the same record must maintain consistent names, quantities, and dates across the contract, permit, and course schedule, and must have a signature or receipt.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, with each entry containing the original text snippet and source identifier, and the length may be 0. The version ledger and change records are completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Appointment contract | Check whether the position name, appointment start and end dates, signature page, and receipt are consistent with the current version | Open the citation marker to trace back to the original contract paragraph, and compare fields and dates item by item |
| Work permit materials | Check whether the permit category, validity period, issue date, and receipt align with the contract appointment period | In the retrieval node, check the selected collection and vector model, and verify the search parameters item by item |
| Course schedule | Check whether the course name, weekly class hours, teaching dates, and teaching assignments match the contract position | Run a trial query with no matching materials, and see whether the cited content is empty while the pipeline continues |
| Cited content output | The number of returned entries matches the hit materials; empty is also normal | Record the array length, and separately check the tokens of the cited text and the `quoteMaxToken` budget |

## Three common errors

- Symptom: The name, quantity, or date of the same record does not match between the contract and the course schedule. Cause: The materials were revised separately and were not updated synchronously under the same version number.
- Symptom: The cited snippet does not match the original text. Cause: Without first checking whether there was a hit in this round and which material was hit, the issue was directly attributed to length truncation.
- Symptom: Old-version materials are still cited, and the current version is not unique. Cause: Versions were not synchronized, signatures or receipts are missing, and change records were not documented.

## How to verify the setup

Acceptance for this feature: Ask a question with original-text support, check whether the cited content array and citation markers can trace back to the original paragraphs, and check the source identifiers in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList`.

Acceptance for this feature: Ask a question with no matching materials, and confirm that the cited content array is empty while the output pipeline still runs through.

- In the node, check the selected collections and their vector models, and confirm that the knowledge bases associated are those of the same vector model.
- Open the search parameter panel and verify item by item, confirming that the values are consistent with those set in the knowledge base retrieval section.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
