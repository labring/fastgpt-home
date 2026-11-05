---
title: Citations and Source Traceability for National Key Research and Development Applications: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c057-f010
page_type: 行业问题页
application_area: education
meta_title: National R&D Grants | Citations | Review
meta_description: National R&D Grants: review citations for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for National Key Research and Development Applications: Trace Exceptions and Review Results

## What this category's data looks like

National Key R&D Program project applications involve three core types of materials: the project application form, the budget application form, and the cooperation agreement. The project application form carries the research objectives, task breakdown, and assessment indicators; the budget application form carries the funding categories, calculation basis, and annual allocation; the cooperation agreement carries the division of labor among participating units, intellectual property ownership, and signed receipt confirmations. Materials are usually submitted centrally by application batch, and the update cadence advances round by round with guideline release, preliminary application, formal application, and budget review. Field characteristics manifest as follows: the name, quantity, date, and amount of the same record must remain consistent across multiple materials, and version numbers, signature pages, and receipt pages must be archived in sync. When materials enter the knowledge base retrieval node, each participates in vector search as an independent source, and the citation output is only responsible for providing the original text snippet and source identifier; afterward, the AI node, code node, or a human uses these to compare fields, write ledgers, and generate reports.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation contents, each containing an original text snippet and a source identifier, and the length may be 0. The exception list and review conclusions are then completed by the subsequent AI node, code node, or a human.

| Object | Check | Verification action |
| --- | --- | --- |
| Project application form | Check whether the names and dates of the research objectives, task breakdown, and assessment indicators are consistent with the division of labor in the cooperation agreement | Open the citation superscript to compare against the original paragraphs, record the number of entries in the citation array, and separately record the `quoteMaxToken` budget |
| Budget application form | Check whether the funding categories, quantities, and annual allocation dates match the task cycle in the project application form | Compare the original text snippets item by item, and check whether the version number, signature page, and receipt page are archived in sync |
| Cooperation agreement | Check whether the names of participating units, intellectual property ownership, signatures, and receipts are complete and version-consistent | View the citation source identifier in `responseData` (non-streaming module results returned with detailed output enabled), and refer back to the original paragraphs to confirm the signature and seal positions |
| Knowledge base retrieval node | Confirm that the selected knowledge base uses the same vector model, and that the search parameters match the values in the knowledge base retrieval section | Use `quoteList` to view the matched materials, and run a test query with no matching question to confirm that the array is empty while the pipeline still works |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the project application form and the budget application form. Cause: The two materials are filled in separately without cross-checking, and after citation hits, no item-by-item reference back to the original text is made.
- Symptom: The cooperation agreement version is not synchronized, and the signature page or receipt is missing. Cause: When materials are updated by batch, the old version is not archived, and the citation output only provides snippets without continuing to check signature and seal completeness.
- Symptom: The answer has citation superscripts but the citation array is empty. Cause: No materials were matched in this round, or the matched materials did not enter the citation output; an empty array is a normal output and does not mean retrieval failed.

## How to verify the setup

Acceptance of this feature: ask a question with original-text support, and check whether the citation array and superscripts can refer back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the pipeline still works.

Business test: create an exception record, see whether the source material can be traced, and check that the number of citations and the `quoteMaxToken` budget are recorded separately, without performing an equality comparison.

- Open the search parameter panel and check item by item the selected knowledge base and vector model, confirming they are in the same vector model set
- Open the citation superscripts in the conversation, and compare against the source documents to check whether each citation can refer back to the original paragraph

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
