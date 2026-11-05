---
title: Citations and Source Traceability for Laboratory Hazardous Chemical Purchasing and Records: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c065-f010
page_type: 行业问题页
application_area: education
meta_title: Lab Chemicals | Citations | Checks
meta_description: Lab Chemicals: review citations for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Laboratory Hazardous Chemical Purchasing and Records: Compare Documents and Locate Differences

## What this category's data looks like

In the laboratory hazardous chemical procurement and ledger scenario, materials typically include three types: hazardous chemical procurement applications, requisition registrations, and inventory ledgers. Procurement applications record the product name, specification, quantity, supplier, application date, and approval signature; requisition registrations record the requisitioner, requisition quantity, requisition date, and requisitioner signature; inventory ledgers record the balance quantity, inbound date, outbound date, and custodian signature. These materials enter the knowledge base retrieval node in document or table form, each playing a different role: procurement applications are used to verify the procurement source and approval chain, requisition registrations are used to verify actual consumption and requisition receipts, and inventory ledgers are used to verify balances and date continuity. The material update cadence is affected by procurement batches, requisition frequency, and inventory counting cycles. Field characteristics are mainly names, quantities, dates, and signatures, and version synchronization and receipt completeness are the key points of verification.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text fragment and a source identifier, and the length can be 0. The discrepancy list must be produced subsequently by an AI node, code node, or manual work; the citation array itself is not a discrepancy list, ledger, or report.

| Object | Check | Verification action |
| --- | --- | --- |
| Hazardous chemical procurement application | Whether the name, quantity, date, and signature are consistent with the inventory ledger | Locate the original text fragment of the procurement application in the cited content, verify the product name, quantity, application date, and approval signature, and record the source identifier |
| Requisition registration | Whether the requisition quantity, requisition date, and requisitioner signature are consistent with the outbound records in the inventory ledger | Open the citation marker to compare against the original text of the requisition registration, verify the quantity and date, and check whether the requisitioner signature or receipt is missing |
| Inventory ledger | Whether the balance quantity, inbound date, outbound date, and custodian signature are continuous and version-synchronized | Compare the original text fragments of the ledger one by one against the procurement applications and requisition registrations, and mark fields where the name, quantity, or date do not match |
| Knowledge base retrieval node | The length of the cited content array matches the hit materials, and the chain still runs even when it is empty | Run a test with a question that has no matching materials, and check that the citation array in `responseData` (non-streaming module results returned with detailed output enabled) is empty while the chain continues; open `quoteList` to verify the search parameters and cited fragments |

## Three common errors

- Symptom: The name or quantity of the same record does not match between the procurement application and the inventory ledger. Cause: Abbreviated product names, inconsistent quantity units, or unsynchronized versions at the time of entry; the hit materials must first be verified before locating the discrepancy fields.
- Symptom: The date or requisitioner signature is missing between the requisition registration and the inventory ledger. Cause: The requisition receipt was not archived in time or the signature process was not completed, making it impossible to align the two materials item by item.
- Symptom: There are no citation markers in the answer, or the cited fragments do not match the original text. Cause: The corresponding materials were not hit in this round or the citation source identifiers are misaligned; this cannot be directly attributed to length truncation, and the hit situation should be verified first.

## How to verify the setup

Acceptance of this feature: ask a question that has original text support, and verify whether the cited content array and citation markers can point back to the original paragraphs; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through. The number of citations is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality. When citation limits are involved, verify the tokens of the cited text, and record the array item count separately.

Business test: use a real record to find fields that are inconsistent with the ledger, hand them to the reviewer for confirmation, and write them back.

- In the node, verify whether the selected knowledge base collections and their vector models use the same vector model
- Open the search parameter panel to verify the values item by item, and run a test with a question that has no matching materials to see that the citation array is empty while the chain continues

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
