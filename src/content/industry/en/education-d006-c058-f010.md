---
title: Citations and Source Traceability for Research Project Task Agreement Signing: Track Progress and Check Statistics
slug: /en/industry/education-d006-c058-f010
page_type: 行业问题页
application_area: education
meta_title: Research Agreements | Citations | Progress
meta_description: Research Agreements: review citations for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Research Project Task Agreement Signing: Track Progress and Check Statistics

## What this category's data looks like

In the scenario of signing research project task books, materials usually include three types: the project task book, the subject task breakdown table, and the budget book. The task book provides the project name, undertaking unit, start and end dates, and signature page; the breakdown table breaks the subject down to the task level, with responsible persons, milestone dates, and quantities; the budget book lists budget categories, amounts, and preparation dates. When the three types of materials enter the knowledge base retrieval node, their roles differ: the task book is the main record source, the breakdown table is used to verify subject names and quantities, and the budget book is used to verify dates and amount calibers. The update rhythm follows the signing batch; within the same batch, multiple materials may be uploaded successively, and field characteristics are concentrated in names, quantities, dates, signatures, and receipts. Progress records and statistical verification require that the number of records match the statistical count, the caliber is written in the header, and the field correspondences between materials must be traceable back to the original text.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each containing an original text fragment and a source identifier, and the length can be 0. The progress table and statistical caliber description are completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Project task book | Whether the fields, dates, and signatures are consistent with the signing record | Open the citation superscript to trace back to the original paragraph, verify the project name, start and end dates, and signature page; record the number of citations, and separately check the `quoteMaxToken` budget |
| Subject task breakdown table | Whether the subject names, quantities, and milestone dates match the task book | Compare the subject names and quantities in the breakdown table and the task book one by one, and mark the version source where dates are inconsistent |
| Budget book | Whether the budget categories, amounts, preparation dates, and signature receipts are complete | Verify the budget book date and signature receipt, and list separately the entries missing signatures or receipts |
| Citation content output | The number of returned entries is consistent with the matched materials, and being empty is also normal | Run a test with a question that has no matching materials, and see whether the array is empty while the chain continues; check the output structure in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match between the task book and the breakdown table. Cause: The two materials are filled in by different stages, and no field-level comparison was performed.
- Phenomenon: The budget book version is not synchronized, and old-version amounts coexist with new-version budget categories. Cause: The upload batches differ, and the version and effective date were not marked.
- Phenomenon: Signatures or receipts are missing, but the record still enters the statistics. Cause: The signing process is not closed-loop, and the materials were not checked for completeness.

## How to verify the setup

This feature acceptance: ask a question with original text evidence, and check whether the citation array and superscript can trace back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through.

Business test: use one week of records to verify the totals, and see whether the caliber and exceptions are clearly written.

- Open the citation superscript, and verify the original text fragments and source identifiers one by one against the source documents.
- Check the values item by item in the search parameter panel, and confirm that the associated knowledge base uses the same vector model.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
