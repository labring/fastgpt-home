---
title: Citations and Source Traceability for Laboratory Hazardous Chemical Purchasing and Records: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c065-f010
page_type: 行业问题页
application_area: education
meta_title: Lab Chemicals | Citations | Review
meta_description: Lab Chemicals: review citations for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Laboratory Hazardous Chemical Purchasing and Records: Trace Exceptions and Review Results

## What this category's data looks like

This page focuses on laboratory hazardous chemical procurement and ledger materials, covering three core types of records: hazardous chemical procurement applications, usage registrations, and inventory ledgers. Procurement applications include product name, specification, quantity, supplier, application date, and approval signature; usage registrations include the person taking the item, date of use, purpose, quantity, and custodian signature; inventory ledgers include balance quantity, batch, storage location, and inventory date. When the materials enter the knowledge base retrieval node, procurement applications and usage registrations serve as comparison sources, while the inventory ledger serves as the baseline reference, each retaining the original text passages and source identifiers for later nodes to refer back to and verify. The update rhythm is synchronized refresh at three points: procurement arrival, usage occurrence, and monthly inventory, with the latest signed receipt as the authoritative version. In terms of field characteristics, the same product name may appear as an abbreviation or full name in different materials, quantity units may be mixed among bottles, boxes, and liters, date formats differ between application date and registration date, and signature fields are easily missing in scanned documents.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each containing an original text fragment and a source identifier, and the length may be 0. The "exception list and review conclusion" is completed subsequently by an AI node, code node, or manual work. Even if no content is retrieved, the output chain still runs through.

| Object | Check | Verification action |
| --- | --- | --- |
| Hazardous chemical procurement application | Whether the product name, quantity, application date, and approval signature are consistent across the three materials | Retrieve the original text fragment of the procurement application, compare the full product name, quantity unit, and application date item by item, verify whether the approval signature field is complete, and record the cited source in `responseData` (non-streaming module results returned with detailed output enabled) |
| Usage registration | Whether the person taking the item, date of use, purpose, and custodian signature match the procurement application and inventory ledger | Open the citation marker to refer back to the original text of the usage registration, check whether the quantity taken matches the balance change in the inventory ledger, and inspect whether the custodian signature or receipt is missing |
| Inventory ledger | Whether the balance quantity, batch, storage location, and inventory date are synchronized with the procurement and usage records | Compare against the original text passage of the inventory ledger, verify the batch and storage location fields, confirm whether the version is the latest inventory version, and record the number of citations and the `quoteMaxToken` budget separately |
| Cited content output | The number of items in the citation array matches the hit materials; an empty array is also normal | Run a test with a question that matches no materials, confirm that the array is empty while the chain continues, and verify whether the cited fragments in `quoteList` can refer back to the original text passages |

## Three common errors

- Phenomenon: The name, quantity, and date of the same hazardous chemical do not match between the procurement application and the usage registration. Cause: The two materials are filled in by different stages, abbreviations and full names are mixed, quantity units are not unified, and dates are taken respectively as the application date and the registration date.
- Phenomenon: The inventory ledger version is not synchronized, and the old version is still hit by retrieval after inventory. Cause: The update rhythm does not cover the monthly inventory time point, the latest signed receipt does not enter the knowledge base in time, and retrieval still returns historical passages.
- Phenomenon: The usage registration lacks a custodian signature or receipt, and the exception record cannot be closed. Cause: The signature field is missing in the scanned document, or the receipt is not archived together with the usage record, so signature information cannot be verified in the cited fragments.

## How to verify the setup

Acceptance of this feature: ask a question with original text support, and check whether the citation array and markers can refer back to the original text; then ask a question with no matching materials, confirm that the array is empty while the chain runs through, and record the number of citations and the `quoteMaxToken` budget separately, without comparing the two for equality.

Business test: create an exception record, see whether it can be traced back to the source materials, verify whether the original text fragments of the procurement application, usage registration, and inventory ledger can all be referred back to, and whether the review conclusion is supported by original records and the reviewer's signature.

- In the node, check whether the selected knowledge base collections and their vector models are consistent, open the search parameter panel, and verify the values item by item.
- In the conversation, open the citation markers, compare each citation against the source document to verify whether it can refer back to the original text passage, and confirm that the cited fragment is consistent with the original text.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
