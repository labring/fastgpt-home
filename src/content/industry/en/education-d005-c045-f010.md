---
title: Citations and Source Traceability for Off-Campus Training Registration and Compliance: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c045-f010
page_type: 行业问题页
application_area: education
meta_title: Training Compliance | Citations | Versions
meta_description: Training Compliance: review citations for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Off-Campus Training Registration and Compliance: Maintain Document Versions and Changes

## What this category's data looks like

For off-campus training compliance filing and penalty response, materials are mainly of three types: school operating licenses, course filing materials, and fee disclosure. Sources are approval receipts, filing receipts, and retained disclosure copies. In terms of fields, school operating licenses focus on name, number, validity period, and issuance date; course filing materials focus on course name, number of class hours, filing date, and signature; fee disclosure focuses on fee items, amounts, disclosure date, and receipt. The update cadence follows license renewal, course adjustments, fee changes, and receipt re-signing. When entering the knowledge base retrieval node, the three types of materials serve as citation sources, each carrying the traceability role of subject qualification, course scope, and fee basis, with cited snippets corresponding one-to-one to source identifiers.

## Configuration and implementation checks

This part is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text snippet and source identifier, and the length can be 0. The version ledger and change records are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| School operating license | Whether the name, number, validity period, issuance date, and signature are consistent with the filing receipt | In the node, check the selected knowledge base and embedding model, open the citation marker to point back to the original license paragraph, and record the source identifier in `quoteList` |
| Course filing materials | Whether the course name, number of class hours, and filing date match across the two materials | Initiate retrieval with the same course name, verify that the number of citation array entries matches the hit filing materials, and compare dates and quantities one by one |
| Fee disclosure | Whether the fee items, amounts, disclosure date, and receipt are complete and are the current version | Check that the search parameters match the values in the knowledge base retrieval section, confirm that the old disclosure version is not cited, and that the cited snippet points back to the current disclosure document |
| Cited content output | The number of returned entries matches the hit materials; empty is also normal | Run a test with a question that has no matching materials, see that the array is empty while the chain continues, and record the citation array length separately in `responseData` (non-streaming module results returned with detailed output enabled) |

## Three common errors

- Phenomenon: The same course name is written differently in two filing materials, and the cited snippets each point to one. Cause: Material versions are not synchronized, the old version is not marked as invalid, and retrieval hits both at the same time.
- Phenomenon: The amount in the fee disclosure does not match the amount in the receipt, and the citation marker points to the disclosure document. Cause: After the disclosure was updated, the receipt was not re-signed, and the ledger did not record the change date and signature status.
- Phenomenon: There is an answer but the citation array is empty, or the cited snippets do not match the original text. Cause: No materials were hit in this round, or the hit materials do not carry source identifiers. First check the number of hits and sources, then look at the `quoteMaxToken` budget.

## How to verify the setup

Acceptance for this feature: ask a question with an original-text basis, and check whether the citation array and citation markers can point back to the original text; then ask a question with no matching materials, confirm that the array is empty while the chain runs through, record the citation count by array length, and treat `quoteMaxToken` only as the citation text budget, without comparing the two for equality.

Business test: change one piece of content and see whether the version number and citations update synchronously; if a citation limit is involved, check the tokens of the cited text, and record the array length separately.

- Open the search parameter panel and check item by item, confirm that the values match those in the knowledge base retrieval section, and check that the selected knowledge base uses the same embedding model.
- In the conversation, open the citation markers, check the original text snippets and source identifiers one by one against the source documents, and confirm that the current version is unique and the old version is traceable.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
