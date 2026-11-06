---
title: Citations and Source Traceability for Corporate Sales and Product Training: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c042-f010
page_type: 行业问题页
application_area: education
meta_title: Sales Training | Citations | Operations
meta_description: Sales Training: review citations for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Corporate Sales and Product Training: Coordinate Operations and Application Handover

## What this category's data looks like

Deployment, operations, and application handover for enterprise sales product training often involves three types of materials: product manuals, sales terminology, and channel training schedules. Product manuals carry version numbers, connection parameters, and task lists; sales terminology carries field definitions and quantity expressions; channel training schedules carry dates, instructors, and signed receipts. When the materials enter the knowledge base retrieval node, each participates as an independent source in citation output and does not perform difference comparison. The update cadence follows version releases, sales terminology iterations, and training schedule scheduling. Field characteristics include name, quantity, date, version, signature, and receipt. The three types of materials must correspond item by item on the handover form. If any field is missing or misaligned, it will be exposed when operations takes over or during the next shift's verification.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and source identifier, and the length can be 0. "Handover-ready deployment status and operation records" are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Product manual | Whether the fields and dates of the version number, connection parameters, and task list are consistent with the handover form, and whether the signature column is complete | Check the version number and connection parameters page by page, compare the number of task list entries, and check signatures and receipts |
| Sales terminology | Whether the name, quantity, and date of the same record match the product manual, and whether the version is synchronized | Extract the fields in the sales terminology, compare them item by item with the manual, and mark inconsistencies in name, quantity, and date |
| Channel training schedule | Whether the schedule dates, instructor signatures, and receipts are consistent with the handover form records; if signatures or receipts are missing, mark them | Check dates and signatures row by row according to the schedule, confirm receipts are complete, and record missing items |
| Citation output | The number of citations is consistent with the matched materials; being empty is also normal | Run a test with a question that has no matching materials, see that the array is empty while the pipeline continues, and record the number of entries and the `quoteMaxToken` budget |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the product manual and the sales terminology. Cause: The two materials have different update cadences, fields are not synchronized, and no item-by-item comparison was performed during handover.
- Symptom: The version is not synchronized, and the deployment status and operation records cite old parameters. Cause: After the materials were updated, the knowledge base was not re-associated, and retrieval still hit old fragments.
- Symptom: The handover form lacks signatures or receipts, and the schedule and manual cannot be closed-loop. Cause: The signature step was omitted, receipts were not archived, and items were missing during verification.

## How to verify the setup

Acceptance for this feature: ask a question with source evidence and check whether the citation array and superscripts can point back to the original text; then ask a question with no matching materials and confirm that the array is empty while the pipeline runs through. Check the number of citations and the `quoteList` field in `responseData` (non-streaming module results returned with detailed output enabled); record the number separately, and `quoteMaxToken` only checks the tokens of the cited text and does not perform equality comparison.

Business test: verify item by item once according to the handover form, see which record is missing, and cover the fields, dates, and signatures of the product manual, sales terminology, and channel training schedule.

- In the node, check the selected collections and their vector models, and confirm that the associated knowledge base uses the same vector model.
- Open the search parameter panel and check item by item, confirming that the values are consistent with those set in the knowledge base retrieval section.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
