---
title: Citations and Source Traceability for Laboratory Hazardous Chemical Purchasing and Records: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c065-f010
page_type: 行业问题页
application_area: education
meta_title: Lab Chemicals | Citations | Multilingual
meta_description: Lab Chemicals: review citations for multilingual work. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Laboratory Hazardous Chemical Purchasing and Records: Handle Multilingual Materials and Terminology

## What this category's data looks like

This category covers laboratory hazardous chemical procurement and ledgers, and its materials include three types: procurement applications, requisition registrations, and inventory ledgers. Procurement applications provide the product name, specification, quantity, supplier, and application date; requisition registrations provide the requisitioner, requisitioned quantity, purpose, date, and signature; inventory ledgers provide the balance quantity, batch, storage location, and inventory count date. In multilingual material and terminology handling scenarios, translated names, abbreviations, and CAS number formats for the same chemical may coexist across different materials, and must be converged using a unified terminology glossary and comparison draft. When materials enter the citation output of the knowledge base retrieval node, each is recalled as an independent citation fragment, and the source identifier points to the original paragraph. The update cadence is synchronized by batch or monthly; when versions are not synchronized, old translated names and new ledgers are mixed. The field characteristics are four types: name, quantity, date, and signature, which are the anchors for subsequent comparison and ledger writing.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each containing an original fragment and a source identifier, and the length may be 0. The "unified terminology glossary and comparison draft" is completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Procurement application | Whether the same chemical name, quantity, application date, and supplier are consistent between the application and the ledger, and whether signatures are complete | Take one procurement application, locate its original fragment in the citation array, and verify the name, quantity, date, and signature fields |
| Requisition registration | Whether the requisitioned quantity, requisition date, requisitioner, and receipt match between the registration and the ledger, and whether versions are synchronized | Open the citation marker in the conversation, compare it with the source document, verify whether the requisitioned quantity and date are consistent, and record the number of citations |
| Inventory ledger | Whether the balance quantity, batch, storage location, and inventory count date close with the procurement and requisition records, and whether missing signatures or receipts are marked | Verify the ledger fields and citation fragments item by item; when the citation limit is involved, verify the tokens of the citation text, and record the array length separately |
| Citation content output | The number of returned entries is consistent with the matched materials; being empty is also normal, and the chain continues to run through | Run a test with a question that has no matching materials, see that the output is empty while the chain continues, and check the `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` fields |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the procurement application and the inventory ledger. Cause: Multilingual translated names are not unified, versions are not synchronized, and old materials are mixed with new ledgers.
- Symptom: The requisition registration lacks a signature or receipt, but the ledger still shows it as requisitioned. Cause: When materials enter the citation output, only fragments are recalled, no comparison is made with the signature field, and subsequent nodes do not point back to the original text.
- Symptom: The citation fragment does not match the original text, and there is no citation marker in the answer. Cause: First check whether this round hit anything and which material was hit, then look at trimming, and do not directly attribute it to length trimming.

## How to verify the setup

Acceptance for this feature: ask a question with original-text support, and verify whether the citation array and markers can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through. Check that `quoteMaxToken` is the content budget and that the number of citations is the array length; do not compare the two for equality.

Business test: sample three terms and check whether their spellings are consistent throughout the entire text, verify that the same term is consistent throughout and that translated names can point back to the original text, and complete this before external release.

- In the node, verify the selected knowledge base collections and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Open the search parameter panel and verify item by item, confirming that the values are consistent with those set in the knowledge base retrieval section.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
