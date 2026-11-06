---
title: Citations and Source Traceability for Research Outcome Registration and Intellectual Property: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c061-f010
page_type: 行业问题页
application_area: education
meta_title: Research IP | Citations | Checks
meta_description: Research IP: review citations for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Research Outcome Registration and Intellectual Property: Compare Documents and Locate Differences

## What this category's data looks like

Research achievement registration and intellectual property management involves three types of materials: achievement registration forms, patent disclosure documents, and software copyright materials. Achievement registration forms record the achievement name, contributors, registration date, and quantity, and are usually compiled in batches by the research management department; patent disclosure documents carry the technical solution, inventors, filing date, and signatures, and are submitted by the inventors and reviewed; software copyright materials include the software name, version number, development completion date, and signed receipt, and are organized and submitted by the developers. When these three types of materials enter the knowledge base retrieval node, each is associated as an independent source, and after a retrieval hit they are returned as citation snippets for use in subsequent field comparison. The update cadence of the materials varies: registration forms are updated centrally by quarter or year, disclosure documents are supplemented as the filing progresses, and copyright materials are archived after registration. In terms of field characteristics, names, quantities, dates, signatures, and receipts are the key items for cross-material verification, and version synchronization and signature completeness directly affect the judgment of material consistency.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each entry containing the original text snippet and a source identifier, and the length can be 0. The discrepancy list is then completed by a subsequent AI node, code node, or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Achievement registration form | Whether the name, quantity, date, and signature are consistent with the ledger | Locate the achievement name, contributors, registration date, and quantity fields in the citation snippets, and compare them item by item with the ledger |
| Patent disclosure document | Whether the inventors, filing date, and signature are complete and correspond to the registration form | Check the inventors, filing date, and signature field in the cited source, and check whether the signature or receipt is missing |
| Software copyright materials | Whether the software name, version number, development completion date, and signature are synchronized | Compare the name, version number, and date in the citation snippets, and mark a discrepancy when the version is not synchronized |
| Citation content output | The number of returned entries matches the hit materials, and being empty is also normal | Run a test with a question that has no matching materials, observe that the citation array in `responseData` (non-streaming module results returned with detailed output enabled) is empty while the pipeline continues; verify that `quoteMaxToken` only constrains the citation text budget, and record the array entry count separately |

## Three common errors

- Symptom: The name or quantity of the same achievement does not match between the registration form and the disclosure document. Cause: The two materials are filled in by different stages, and no cross-material field verification was performed.
- Symptom: The version number of the software copyright materials is inconsistent with the date on the registration form. Cause: The version was not synchronized, and the old version of the materials remains in the knowledge base without being replaced.
- Symptom: The disclosure document lacks a signature or receipt, and the signature field in the citation snippet is empty. Cause: The signing was not completed at the submission stage, and completeness was not verified when the materials were archived.

## How to verify the setup

Acceptance of this feature: ask a question that has textual support, and check whether the citation array and footnote markers can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the pipeline runs through.

Business test: use a real record to find a field that is inconsistent with the ledger, record the cited source and original text paragraph in `quoteList`, and have the reviewer confirm and write it back.

- In the node, verify whether the selected knowledge base collections and their vector models are consistent
- Open the search parameter panel and check the values item by item, confirming that the token budget for citation text and the array entry count are recorded separately

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
