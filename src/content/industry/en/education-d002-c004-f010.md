---
title: Citations and Source Traceability for Kindergarten and Family Communication: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c004-f010
page_type: 行业问题页
application_area: education
meta_title: Family Communication | Citations | Checks
meta_description: Family Communication: review citations for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Kindergarten and Family Communication: Compare Documents and Locate Differences

## What this category's data looks like

Kindergarten home-school co-education communication materials include notices sent by teachers, parent responses, observation records of children's performance in kindergarten, a ledger of committed items and response times, a classification table of parent requests, and delivery receipts for notices. When these materials enter the knowledge base retrieval node, each plays a different role: notices and receipts serve as the source for delivery verification, observation records serve as the basis for comparing descriptions of children's performance, the commitment ledger serves as the baseline for response times and items, and the request classification table serves as the reference for feedback categorization. The update cadence is usually daily or weekly, synchronized into the knowledge base along with communication records, and field characteristics include child name, date, item name, quantity description, response status, and request category. Materials are cited in the form of original text fragments, for subsequent nodes to perform field comparison and discrepancy localization.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original text fragment and a source identifier, and the length may be 0. The "discrepancy list" is then completed by a subsequent AI node, code node, or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Ledger of committed items and response times | The commitment content and response time for the same item of the same child are consistent across the two materials | Locate the original commitment text and the response record in the citation array, compare item name, date, and response status field by field, and write inconsistent fields into the discrepancy list |
| Observation records of children's performance in kindergarten | The teacher's statement is consistent with the performance description in the observation record | Check the behavior description in the cited fragment against the original text of the observation record, verify whether the statement matches the observation record, mark mismatched fields, and record the source identifier |
| Parent request classification table | Parent feedback has been categorized in the classification table and the category is consistent | Find the original feedback text and the classification entry in the cited content, check whether the request category is missing or misclassified, and list uncategorized items in the discrepancy list |
| Notice delivery receipt | The notice delivery status is consistent with the receipt record | Compare the notice title, send date, and receipt status in the cited fragment, check whether the delivery fields are consistent, and record discrepancies for the reviewer to confirm |

## Three common errors

- Phenomenon: A committed item cannot find a corresponding entry in the response record. Cause: Commitments and responses belong to different materials, and retrieval hits one but not the other, so the hit source must be reviewed before making a judgment.
- Phenomenon: The teacher's statement is inconsistent with the description in the observation record. Cause: The two materials are filled in by different people, with different wording and observation perspectives, so field-by-field comparison must be based on the original text fragments.
- Phenomenon: Parent feedback is uncategorized or misclassified. Cause: The classification table updates lag behind the communication records, and the cited fragments cover only part of the materials, so classification entries need to be supplemented.

## How to verify the setup

This feature's acceptance: ask a question with original-text support, and check whether the citation array and the citation markers can point back to the original text; then ask a question with no matching material, and confirm that the array is empty while the pipeline still runs through. Record the number of array entries; view the tokens of the cited text separately against the `quoteMaxToken` budget, and do not compare the two for equality.

Business test: use one real record to find a field inconsistent with the ledger, write that field into the discrepancy list, and hand it to the reviewer for confirmation and write-back.

- Open the citation markers to compare against the source documents, verify the cited fragments against the original paragraphs one by one, and check whether the number of entries in the citation array in `responseData` (non-streaming module results returned with detailed output enabled) matches the hit materials.
- Open the search parameter panel and verify the values item by item, confirm that the selected knowledge base uses the same vector model, and check whether the cited content output in `quoteList` is empty while the pipeline still runs through.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
