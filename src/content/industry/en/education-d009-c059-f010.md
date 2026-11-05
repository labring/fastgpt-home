---
title: Citations and Source Traceability for Research Budget Adjustments and Reimbursement: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c059-f010
page_type: 行业问题页
application_area: education
meta_title: Research Finance | Citations | Multilingual
meta_description: Research Finance: review citations for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Research Budget Adjustments and Reimbursement: Handle Multilingual Materials and Terminology

## What this category's data looks like

In the research funding budget adjustment and reimbursement scenario, materials include three types: budget adjustment applications, reimbursement forms, and contract invoices. Budget adjustment applications record inter-account quota changes, application dates, and approval signatures; reimbursement forms carry expense details, quantities, amounts, handler and reviewer signatures; contract invoices provide transaction names, invoice dates, amounts, and signed receipts from both parties. The three types of materials often circulate in multilingual versions. The same term has different translations in documents of different languages, the name, quantity, and date of the same record do not match across two materials, and versions are not synchronized or signed receipts are missing. When materials enter the knowledge base retrieval node, each is retrieved as an independent citation source, and the original text fragments are returned together with source identifiers, providing traceable original-text evidence for subsequent terminology comparison and ledger generation. The update cadence advances in sync with material versions.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation contents, each containing an original text fragment and a source identifier, and the length can be 0. The "unified terminology table and comparison draft" is completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Budget adjustment application | Whether the account name, adjustment amount, application date, and approval signature are consistent with the corresponding records in the contract invoice | Open the citation marker to trace back to the original paragraph, and compare fields, dates, and signatures item by item |
| Reimbursement form | Whether the expense name, quantity, date, and handler/reviewer signatures match the budget adjustment application and contract invoice | Check the cited fragments in `responseData` (non-streaming module results returned with detailed output enabled) against the source documents, and record inconsistencies |
| Contract invoice | Whether the transaction name, invoice date, amount, and signed receipt are synchronized with the versions of the other two materials | Use `quoteList` to expand the source identifier, and confirm whether the version number and receipt are complete |
| Citation content array | The number of returned items is consistent with the hit materials; being empty is also normal | Run a trial with a question that has no matching materials, and see whether the array is empty while the pipeline continues |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the budget adjustment application and the reimbursement form. Cause: The two materials were entered separately and their versions are not synchronized, so the cited fragments each trace back to different versions of the original text.
- Symptom: The contract invoice lacks a signature or receipt, but the reimbursement form has already entered circulation. Cause: The material versions are not synchronized, and the signature step was not updated together with the citation source, so the missing item is only discovered during traceability.
- Symptom: There is no citation marker in the answer, or there is an answer but the citation array is empty. Cause: No materials were hit in this round, or the cited fragments do not match the original text; first check the hit situation, then check trimming.

## How to verify the setup

Acceptance for this feature: ask a terminology question that has original-text evidence, check whether the citation array and markers can trace back to the original text, and record the number of array items; then ask a question with no matching materials, confirm that the array is empty while the pipeline runs through, and note that `quoteMaxToken` is only the citation content budget and is not compared for equality with the number of items.

Business test: sample three terms and check whether their spellings are consistent throughout the document, whether the translated names can trace back to the original text, and verify the source identifiers in `quoteList` within `responseData`.

- In the node, check whether the selected knowledge base collections and their vector models are consistent, and open the search parameter panel to verify the values item by item.
- Run a trial with a question that has no matching materials, see whether the citation array is empty while the output pipeline continues, and then open the citation marker to compare against the source documents.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
