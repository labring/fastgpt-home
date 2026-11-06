---
title: Citations and Source Traceability for Laboratory Hazardous Chemical Purchasing and Records: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c065-f010
page_type: 行业问题页
application_area: education
meta_title: Lab Chemicals | Citations | Versions
meta_description: Lab Chemicals: review citations for version tracking. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Laboratory Hazardous Chemical Purchasing and Records: Maintain Document Versions and Changes

## What this category's data looks like

Laboratory hazardous chemical procurement and ledgers involve three types of materials: procurement applications, usage registrations, and inventory ledgers. Fields include name, specification, quantity, date, signature, and receipt. Procurement applications record the item name and requested quantity; usage registrations record the recipient and purpose; inventory ledgers record the balance and batch. When materials enter the knowledge base retrieval node, each participates in vector search as a citable original text fragment. The citation output returns only the hit fragment and source identifier, and does not perform field comparison. In terms of update cadence, after any material is revised, the old version must be archived, the current version must be unique, and citations must be updated to point to the new version.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation contents, each containing an original text fragment and a source identifier, and the length may be 0. The "version ledger and change record" is then completed by subsequent AI nodes, code nodes, or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Procurement application | Name, specification, quantity, date, and signature must correspond consistently with the usage registration and inventory ledger | Check the fields of the same record in the application form and the ledger, and confirm that signatures and receipts are complete |
| Usage registration | Recipient, purpose, quantity, and date must be traceable back to the original paragraph; when the version is not synchronized, the current version prevails | Open the citation marker and verify the date and quantity against the source document |
| Inventory ledger | Balance quantity and batch must match the procurement and usage records, and the old version must be traceable | Change one quantity and see whether the version number and citation are updated in sync |
| Citation content output | The number of returned entries matches the hit materials; being empty is also normal; the array length is not compared for equality with `quoteMaxToken` | Run a test with a question that has no matching materials, see that the array is empty while the chain continues, and record the number of entries separately |

## Three common errors

- Symptom: The quantity and date of the same record do not match between the procurement application and the inventory ledger. Cause: After the material was revised, the old version was not archived, and the citation still points to the old fragment.
- Symptom: There is no citation marker in the answer, or the cited fragment does not match the original text. Cause: This round did not hit the corresponding material, or it hit another material.
- Symptom: The usage registration lacks a signature or receipt, and the version is not synchronized. Cause: The update cadence was not fixed, and after changing one piece of content, the version number and citation were not synchronized.

## How to verify the setup

Acceptance for this feature: ask a question with original-text support and check whether the citation array and markers can point back to the original text; then ask a question with no matching materials and confirm that the array is empty while the chain runs through.

Business test: change one piece of content and see whether the version number and citation are updated in sync.

- In the node, check the selected knowledge base collections and their vector models, and open the search parameter panel to check the values item by item.
- Run a test with a question that has no matching materials, see that the citation array in `responseData` (non-streaming module results returned with detailed output enabled) is empty while the chain continues, and record the array entry count and the `quoteMaxToken` budget separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
