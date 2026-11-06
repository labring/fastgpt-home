---
title: Citations and Source Traceability for Vocational School Student Internships: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c030-f010
page_type: 行业问题页
application_area: education
meta_title: Student Internships | Citations | Checks
meta_description: Student Internships: review citations for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Vocational School Student Internships: Compare Documents and Locate Differences

## What this category's data looks like

The materials for vocational school student internship management mainly consist of internship agreements, internship plans, and internship logs, supplemented by enterprise receipts and signature pages. Sources are mostly academic affairs system exports, scanned copies stamped by enterprises, and uploads by supervising teachers. The update rhythm advances by batch: agreements precede plans, plans precede logs, logs are appended weekly or daily, and receipts are added at month-end or at the end of a batch. Field characteristics center on four categories: name, quantity, date, and signature: agreements state the position name and internship period, plans state rotation arrangements and headcount, and logs state the day's position, work hours, and supervising teacher's signature. When the three types of materials enter this feature, their roles differ: agreements serve as baseline materials providing object names and start/end dates, plans serve as arrangement materials providing positions and headcount, and logs serve as process materials providing item-by-item records and signed receipts. During verification, use the same object as the anchor, place the fields from the three types of materials side by side, then locate the discrepant fields and hand them to the reviewer for confirmation and write-back.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text snippet and source identifier, and the length may be 0. The "discrepancy list" is completed subsequently by an AI node, code node, or manually. The cited content is output as an array, and the length may be 0; even if no content is retrieved, the output chain still runs through.

| Object | Check | Verification action |
| --- | --- | --- |
| Internship agreement | Whether the same student's name, internship start/end dates, and position name are consistent between the agreement and the ledger, and whether signatures and stamps are complete | In the knowledge base retrieval node, check the selected collection and vector model, open the citation marker to point back to the original agreement paragraph, and record field discrepancies |
| Internship plan | Whether the same batch's position names, headcount, and rotation dates are consistent between the plan and the ledger, and whether versions are synchronized | Check that the search parameters match the values in the knowledge base retrieval section, use `quoteMaxToken` to view the cited content budget, and record the array item count separately |
| Internship log | Whether the same record's date, work hours, supervising teacher's signature, and receipt are consistent between the log and the ledger, and whether missing signatures or receipts are marked | Run a test with a question that has no matching materials, observe that the citation array in `responseData` (non-streaming module results returned with detailed output enabled) is empty while the chain continues, then compare against the original text to supplement discrepancies |
| Cited content output | The number of returned items matches the materials hit; empty is also normal; whether each citation can point back to the original paragraph | Open the citation marker to compare against the source document, check whether the original text snippet in `quoteList` corresponds to the source identifier, and register discrepancies item by item |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match between the agreement and the plan. Cause: The two materials were uploaded in different batches, and the field definitions were not unified; it is necessary to first verify the hit materials and then locate the discrepant fields.
- Phenomenon: The date or work hours in the log and the ledger are inconsistent. Cause: Versions are not synchronized, and the old version of the log is still participating in retrieval in the knowledge base; it is necessary to check versions by batch and write back the review results.
- Phenomenon: There is no citation marker in the answer, or the cited snippet does not match the original text. Cause: First check whether this round hit anything and which material was hit, then look at trimming; do not directly attribute it to length trimming.

## How to verify the setup

Acceptance of this feature: Ask a question with original text support and check whether the citation array and markers can point back to the original text; then ask a question with no matching materials and confirm that the array is empty while the chain runs through.

Business test: Use a real record to find fields inconsistent with the ledger, register discrepancies in name, quantity, date, or signature, and hand them to the reviewer for confirmation and write-back.

- In the node, check the selected knowledge base collections and their vector models, open the search parameter panel, and verify the values item by item.
- Open the citation marker to compare against the source document, check whether each citation can point back to the original paragraph, and record the array item count and cited content budget.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
