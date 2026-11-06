---
title: Citations and Source Traceability for National Key Research and Development Applications: Track Progress and Check Statistics
slug: /en/industry/education-d006-c057-f010
page_type: 行业问题页
application_area: education
meta_title: National R&D Grants | Citations | Progress
meta_description: National R&D Grants: review citations for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for National Key Research and Development Applications: Track Progress and Check Statistics

## What this category's data looks like

National Key R&D Program project applications involve three types of materials: the project application form, the budget application form, and the cooperation agreement. The project application form carries the research objectives, task breakdown, assessment indicators, and participating units, with many fields and dense dates; the budget application form carries budget subjects, amounts, sources, and calculation bases, with strict requirements on numerical definitions; the cooperation agreement carries partner names, task division, funding allocation, and signatures/seals, with signatures and receipts being the requirements for validity. The three types of materials undergo multiple rounds of iteration during the application cycle, with frequent version updates. The names, quantities, and dates of the same record often appear inconsistent across two materials, and versions not being synchronized or missing signature receipts also occur from time to time. After the materials enter the knowledge base retrieval node, each serves as a retrievable source participating in citation output, providing the original-text basis for subsequent field comparison, ledger writing, progress table generation, and statistical definition explanations. The update rhythm aligns with the application form submission node, budget adjustment node, and agreement signing node, and is collected weekly or monthly.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original-text fragment and a source identifier, and the length can be 0. The "progress table and statistical definition explanation" is then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Project application form | Whether the project name, task number, start and end dates, participating units, and signature page are consistent with the budget application form and cooperation agreement | Compare the name, quantity, and date fields of the three materials item by item, check the signature page and receipt, and record discrepancy items |
| Budget application form | Whether the budget subject names, amounts, sources, and calculation bases correspond to the task breakdown in the project application form, and whether the dates and versions are synchronized | Open the search parameter panel to check the values, use `quoteMaxToken` to check the citation text budget, and record the array item count separately |
| Cooperation agreement | Whether the partner names, task division, funding allocation, signing date, and signature/seal receipt are complete and consistent with the application form | Open the citation superscript in the conversation, compare against the source document, and check whether each citation can point back to the original paragraph |
| Cited content output | The number of returned items is consistent with the matched materials; being empty is also normal, and the output pipeline continues | Run a test with a question that has no matching materials, see that the output is empty while the pipeline runs through, and check the `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` fields |

## Three common errors

- Symptom: The same project name is written differently in the project application form and the budget application form. Cause: The two materials were filled in by different personnel in different rounds, without field-level synchronization verification.
- Symptom: The cooperation agreement signing date is later than the application form submission date, and the versions are not synchronized. Cause: After multiple rounds of agreement revisions, it was not backfilled into the application form, and version management lacks a unified ledger.
- Symptom: The budget application form lacks a signature or receipt, and the cited fragment does not match the original text. Cause: The scanned copy is incomplete, or after the citation matches the material, it enters statistics without pointing back to the original paragraph.

## How to verify the setup

Acceptance of this function: ask a question with an original-text basis, and check whether the citation array and superscript can point back to the original text; then ask a question with no matching materials, confirm that the array is empty while the pipeline runs through, and check the `quoteList` within `responseData` fields.

Business test: use one week of records to check the totals, see whether the definitions and exceptions are clearly written, and confirm that the record count and statistical count match and the definitions are written in the table header.

- Check item by item whether the selected knowledge bases use the same vector model, and open the search parameter panel to check whether the values are consistent with the knowledge base retrieval section.
- Run a test with a question that has no matching materials, confirm that the citation array is empty while the pipeline continues, then open the citation superscript to compare against the source document and check whether each citation can point back to the original text.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
