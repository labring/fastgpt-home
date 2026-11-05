---
title: Citations and Source Traceability for Research Project Task Agreement Signing: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c058-f010
page_type: 行业问题页
application_area: education
meta_title: Research Agreements | Citations | Intake
meta_description: Research Agreements: review citations for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Research Project Task Agreement Signing: Handle Questions and Collect Missing Information

## What this category's data looks like

The signing of scientific research project task books involves three types of materials: the project task book, the subject task breakdown table, and the budget book. The project task book provides the overall objectives, period, and approval signature section; the subject task breakdown table carries the subject names, responsible persons, quantities, and start and end dates; the budget book carries the subject amounts, calculation basis, and signature section. Materials are often uploaded in batches by different departments, and the update rhythm changes with version rounds: after the task book is revised, the breakdown table and budget book are often synchronized with a lag. When the three enter the Q&A acceptance and missing-item follow-up question function, the task book and breakdown table are used to compare field definitions, and the budget book is used to verify amounts and signature receipts; if the dates, names, and quantities in the materials do not match across the two documents, or if the versions are not synchronized, or signatures and receipts are missing, this constitutes a missing item, and a follow-up question must be asked before answering.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and source identifier, and the length can be 0. The "acceptance record and completed question items" are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Project task book | Whether the fields, dates, and signatures can be traced back to the original paragraphs | Open the citation superscript in the conversation and check the approval signature section and start and end dates against the original task book text |
| Subject task breakdown table | Whether the names, quantities, and dates of the same record do not match across the two materials | Compare the breakdown table with the task book field by field, and record discrepancies in names, quantities, and dates |
| Budget book | Whether the versions are synchronized and whether signatures or receipts are missing | Check the budget book version number and signature section, and confirm whether the receipt is updated together with the version |
| Knowledge base retrieval node | The cited content is output as an array, the length can be 0, and the chain still runs through normally | Try running a question with no matching materials and see whether the array in `responseData` (non-streaming module results returned with detailed output enabled) is empty while the chain continues; record the number of citations separately, `quoteMaxToken` is only used as the content budget and is not compared for equality with the number of citations |

## Three common errors

- Phenomenon: The names, quantities, and dates of the same subject do not match across the two materials. Cause: After the task book is revised, the breakdown table is not synchronized, field definitions diverge, and the missing item is not identified and followed up with a question.
- Phenomenon: The budget book version is not synchronized, and signatures or receipts are missing. Cause: When the version round is updated, only the main text is replaced, and the approval page and receipt are not synchronized, and no item-by-item verification is performed during acceptance.
- Phenomenon: The answer has citation superscripts but the cited fragments do not match the original text. Cause: It is not first verified which material was hit in this round, and the issue is directly attributed to truncation, ignoring the correspondence verification between the citation and the original text.

## How to verify the setup

Acceptance of this function: Ask a question with original text support, and check whether the citation array and superscripts can trace back to the original paragraphs; then ask a question with no matching materials, confirm that the array is empty while the chain runs through, and record the number of citations in `quoteList`.

Business test: Ask a question missing key information, and see whether a follow-up question is asked before answering; after the missing item is identified and followed up with a question, the answer has material support.

- Open the search parameter panel and check item by item, confirming that the selected knowledge base uses the same vector model, and the values are consistent with the knowledge base retrieval section
- Try running a question with no matching materials, and see whether the output is empty while the chain continues; record the number of citations separately, `quoteMaxToken` is only used as the content budget

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
