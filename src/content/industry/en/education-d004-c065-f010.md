---
title: Citations and Source Traceability for Laboratory Hazardous Chemical Purchasing and Records: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c065-f010
page_type: 行业问题页
application_area: education
meta_title: Lab Chemicals | Citations | Handover
meta_description: Lab Chemicals: review citations for material handover. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Laboratory Hazardous Chemical Purchasing and Records: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This category covers laboratory hazardous chemical procurement and ledger data. Materials include hazardous chemical procurement applications, usage registration, inventory ledgers, as well as issuable drafts and handover records formed around material drafting and responsibility handover. Procurement applications focus on product name, specification, quantity, supplier, purpose, and approval signature; usage registration focuses on the person taking the materials, date of taking, quantity, remaining quantity, and receipt; inventory ledgers focus on opening balance, inbound, outbound, closing balance, and inventory count date. When materials enter the knowledge base retrieval node, each plays the role of being cited and back-referenced: procurement applications and usage registration provide field basis, inventory ledgers provide quantity and date benchmarks, and handover records provide clues for responsible persons and receipt confirmation. The update rhythm advances with procurement batches, usage frequency, and inventory count cycles, and versions and dates must be synchronized. Field characteristics are that the name, quantity, and date of the same record in multiple materials must be consistent, signatures and receipts cannot be missing, and version numbers and issuance dates must correspond.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and source identifier, and the length can be 0. Issuable material drafts and handover records are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Hazardous chemical procurement application | Whether the product name, specification, quantity, supplier, purpose, and approval signature in the procurement application are complete, and whether the date and version are consistent | Draft a procurement application according to the template, check the fields and signature, and observe whether missing items are blocked |
| Usage registration | Whether the person taking the materials, date of taking, quantity, remaining quantity, and receipt in the usage registration are complete, and whether they match the quantity in the procurement application | Run through a usage handover once, compare the name, quantity, and date in the two materials, and record any inconsistencies |
| Inventory ledger | Whether the opening balance, inbound, outbound, closing balance, and inventory count date in the inventory ledger are consistent with the procurement application and usage registration | Check the quantity and date in the ledger against the two materials, and check whether the version and date are synchronized |
| Cited content output | The number of items in the citation array matches the hit materials; being empty is also normal, and each citation can back-reference the original paragraph | Run a test with a question that has no matching materials, confirm that the array is empty while the chain runs through, and record the cited text tokens separately |

## Three common errors

- Symptom: The name, quantity, and date of the same record in the procurement application and usage registration do not match. Cause: During drafting, comparison was not made according to the same field template, and item-by-item verification was missing before handover.
- Symptom: The inventory ledger version was not synchronized, resulting in two versions of quantities coexisting. Cause: After inventory counting, the version number and date were not updated synchronously, and the old version was still cited.
- Symptom: The usage registration lacks a signature or receipt, and the responsible person is unclear. Cause: During the handover step, signatures and receipts were not collected completely according to the template, and receipt records were not archived with the materials.

## How to verify the setup

This feature acceptance: ask a question with original text basis, and check whether the citation array and superscript can back-reference the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through. When citation limits are involved, check the tokens of the cited text, record the number of array items separately, and `quoteMaxToken` is the citation content budget and is not used for equality comparison; if necessary, view the citation fields in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList`.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- In the node, check the selected knowledge base collections and their vector models, open the search parameter panel and check the values item by item, and confirm they are consistent with the settings in the knowledge base retrieval section.
- In the conversation, open the citation superscript, compare with the source documents, check whether each citation can back-reference the original paragraph, and record the number of items in the citation array.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
