---
title: Citations and Source Traceability for Research Budget Adjustments and Reimbursement: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c059-f010
page_type: 行业问题页
application_area: education
meta_title: Research Finance | Citations | Access
meta_description: Research Finance: review citations for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Research Budget Adjustments and Reimbursement: Manage Authorized Access and External Services

## What this category's data looks like

In the research funding budget adjustment and reimbursement scenario, materials usually include three types: budget adjustment applications, reimbursement forms, and contract invoices. Budget adjustment applications record amount changes between accounts, reasons, and approval signatures; reimbursement forms carry expense details, amounts, dates, and handler signatures; contract invoices provide the counterparty, quantity, amount, and invoice date. When these three types of materials enter the knowledge base retrieval node, each is cited and output as an independent source, and the cited snippets retain the original wording and source identifier. Sources are mostly financial system exports, scanned copies, or external archive links, and the update rhythm is mainly batch submission; after version iteration, it is common for old copies not to be synchronized. In terms of field characteristics, the account name, quantity, and date for the same transaction may not match between the application and the reimbursement form, and the signature or receipt of the contract invoice may also be missing. Authorized access and external services require that the visitor's identity match the visible scope, with unauthorized content not visible; when opened to parents or superiors, only the citation sources and traceability information within the authorized scope are presented.

## Configuration and implementation checks

This part is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original snippet and source identifier, and the length can be 0. The externally available entry point and authorization scope are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Budget adjustment application | Whether the account name, adjustment amount, date, and approval signature are consistent between the application and the reimbursement form | Open the citation marker to compare against the original paragraph, verify the name, quantity, date, and signature, and record `quoteList` |
| Reimbursement form | Whether the expense details, handler signature, and the quantity, amount, and invoice date of the contract invoice can correspond | Compare the cited snippets with the source documents one by one, and mark for supplementation when signatures or receipts are missing |
| Contract invoice | Whether the counterparty, quantity, amount, and invoice date are consistent with the reimbursement form records | Verify the number of entries in the citation array and the number of matched materials, and record the array length separately |
| Associated knowledge base | Whether the selected collection is a knowledge base of the same vector model | Verify the selected collection and vector model in the node, and confirm the `responseData` (non-streaming module results returned with detailed output enabled) structure |

## Three common errors

- Phenomenon: The account name, quantity, and date of the same record do not match between the application and the reimbursement form. Cause: The two materials are filled in by different stages, and field-level comparison and receipt synchronization have not been done.
- Phenomenon: The version is not synchronized, and the old application is still cited. Cause: After the new version is submitted, the old copy is not withdrawn or marked invalid, and retrieval still hits the old snippet.
- Phenomenon: Signatures or receipts are missing, and the cited snippet cannot point back to the complete approval chain. Cause: The scanned copy is missing pages or the signature page was not attached during archiving, so the citation covers only part of the original text.

## How to verify the setup

This feature's acceptance: ask a question with original-text evidence, and verify whether the citation array and markers can point back to the original text; then ask a question with no matching materials, confirm that the array is empty while the pipeline runs through, and record the array length and the `quoteMaxToken` budget, without comparing the two for equality.

Business test: access once with a restricted identity, see whether the visible scope matches the setting, and unauthorized content is not visible.

- Open the citation markers in the conversation, and verify the original snippets and source identifiers one by one against the source documents
- Try a test run with a question that has no matching materials, see that the output is empty while the pipeline continues, and verify the `quoteList` return structure

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
