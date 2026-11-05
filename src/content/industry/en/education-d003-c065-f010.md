---
title: Citations and Source Traceability for Laboratory Hazardous Chemical Purchasing and Records: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c065-f010
page_type: 行业问题页
application_area: education
meta_title: Lab Chemicals | Citations | Intake
meta_description: Lab Chemicals: review citations for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Laboratory Hazardous Chemical Purchasing and Records: Handle Questions and Collect Missing Information

## What this category's data looks like

This page focuses on laboratory hazardous chemical procurement and ledger, and the materials include three types: hazardous chemical procurement applications, requisition registrations, and inventory ledgers. Procurement applications provide the product name, specification, quantity, supplier, application date, and approval signature; requisition registrations provide the requisitioner, requisition date, purpose, actual issued quantity, and custodian signature; inventory ledgers provide the balance quantity, storage location, inventory date, and review signature. When the three types of materials enter the knowledge base retrieval node, each serves as a citable original source, and each citation in the answer must point back to the corresponding paragraph. Materials are updated by batch, procurement applications follow the approval flow, requisition registrations are recorded per instance, and inventory ledgers are synchronized by inventory cycle. Field characteristics center on name, quantity, date, and signature, and the same record often differs between two materials because the version is not synchronized or a receipt is missing.

## Configuration and implementation checks

This part is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text snippet and a source identifier, and the length may be 0. The acceptance record and the follow-up questions to be completed are then handled by subsequent AI nodes, code nodes, or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| Hazardous chemical procurement application | Whether the product name, specification, quantity, application date, and approval signature in the application form are complete, and whether the name and quantity can be matched with the requisition registration and inventory ledger | In the citation output, point back to the original paragraphs of the application form one by one, and check the fields and signature; use `responseData` (non-streaming module results returned with detailed output enabled) to view the node return structure and confirm that the number of citations matches the hit materials |
| Requisition registration | Whether the requisitioner, requisition date, purpose, actual issued quantity, and custodian signature are complete, and whether the date and quantity of the same record are consistent in the two materials | Open the citation marker to compare with the original requisition registration text, and check the date and quantity; if the citation is empty, confirm whether no material was hit in this round, and do not directly judge the retrieval as failed |
| Inventory ledger | Whether the balance quantity, storage location, inventory date, and review signature are complete, and whether the version is synchronized with the procurement application and requisition registration | Check the ledger fields and signature item by item, and inspect the version synchronization status; when the citation upper limit is involved, check the tokens of the cited text, record the array item count separately, and `quoteMaxToken` is only used as the content budget |
| Knowledge base retrieval node | Whether the associated knowledge base uses the same vector model, and whether the search parameter values are consistent with the knowledge base retrieval section | In the node, check the selected collection and vector model, open the search parameter panel and check item by item; use `quoteList` to view the citation details and their correspondence to the original text |

## Three common errors

- Symptom: There is no citation marker in the answer. Cause: The citation array is empty or the citations have not been mapped to the original text, so first check whether this round hit anything and which material was hit.
- Symptom: The name, quantity, and date of the same record do not match between the procurement application and the inventory ledger. Cause: The version is not synchronized, or the two materials were updated separately without cross-checking.
- Symptom: The requisition registration is missing a signature or receipt. Cause: The registration step is not closed-loop, and the fields are incomplete when the material enters retrieval, so follow-up questions must be asked to complete them before answering.

## How to verify the setup

This feature's acceptance: ask a question with original-text support, and check whether the citation array and citation markers can point back to the original text; then ask a question with no matching material, and confirm that the array is empty while the pipeline still runs through.

Business test: ask a question missing key information, and see whether it asks follow-up questions first before answering.

- Run a trial with a question that has no matching material, see that the output is empty while the pipeline continues, and record the array item count.
- Open the citation markers in the conversation, and check the original text snippets and source identifiers one by one against the source documents.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
