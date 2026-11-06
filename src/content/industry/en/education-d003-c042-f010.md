---
title: Citations and Source Traceability for Corporate Sales and Product Training: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c042-f010
page_type: 行业问题页
application_area: education
meta_title: Sales Training | Citations | Intake
meta_description: Sales Training: review citations for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Corporate Sales and Product Training: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the enterprise sales product training scenario, covering three types of materials—product manuals, response-line materials, and channel training schedules—and lays out citation sources and traceability in Q&A intake and missing-item follow-up questions. Product manuals provide product parameters, functional boundaries, and version dates; response-line materials provide common objection handling and script boundaries; channel training schedules provide course arrangements, participant targets, and signed receipts. When the three types of materials enter the knowledge base retrieval node, each plays a different role: product manuals are used to confirm product facts and versions, response-line materials are used to confirm response boundaries, and channel training schedules are used to confirm training arrangements and responsible signatures. In terms of update cadence, product manuals are updated with version iterations, response-line materials are adjusted with channel strategy, and channel training schedules are updated by batch. Field characteristics include material name, quantity, date, signature, and receipt; the same record may show mismatched names, quantities, or dates across different materials, unsynchronized versions, or missing signatures or receipts. Intake records and completed follow-up items must be based on the cited content array, ensuring that answers have material evidence.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs a cited content array, each entry containing an original text snippet and a source identifier, and the length may be 0. "Intake records and completed follow-up items" are then completed by subsequent AI nodes, code nodes, or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| Product manual | Whether fields, dates, and signatures are consistent with the intake record | Check the product name, quantity, version date, and signature field in the product manual, confirm they correspond item by item with the intake record, and record the number of citations and the `quoteMaxToken` budget |
| Response-line material | Whether the script boundaries and dates match the product manual | Compare the response boundaries, quantities, and dates in the material, check whether they are consistent with the product manual, mark inconsistencies as missing items, and ask follow-up questions |
| Channel training schedule | Whether the schedule fields, dates, and signed receipts are complete | Check the course name, participant targets, dates, and signed receipts in the channel training schedule; when a signature or receipt is missing, trigger a follow-up question, and inspect the citation array in `responseData` (non-streaming module results returned with detailed output enabled) |
| Cited content output | The number of citations matches the hit materials; being empty is also normal | Run a test with a question that matches no materials, confirm the citation array is empty while the chain continues, and open `quoteList` to compare against the source document markers |

## Three common errors

- Symptom: the name, quantity, or date of the same record does not match between the product manual and the response-line material. Cause: the two materials have different update cadences, and no field-level comparison or version synchronization was performed.
- Symptom: the channel training schedule lacks a signature or receipt, and the intake record cannot confirm responsibility. Cause: the receipt field was not synchronized after the schedule was updated, or the signature step was not included in material archiving.
- Symptom: the answer has content but the citation array is empty, or the cited snippets do not match the original text. Cause: no materials were hit in this round, or the hit materials and cited snippets were not traced back to the original paragraphs item by item.

## How to verify the setup

This feature's acceptance: ask a question that has original-text evidence, and check whether the citation array and markers can trace back to the original text; then ask a question that matches no materials, and confirm the array is empty while the chain runs through.

Business test: raise a question that is missing key information, and see whether it asks a follow-up question before answering.

- Open the search parameter panel and check item by item, confirm that the associated knowledge base uses the same vector model, and record the number of citations and the `quoteMaxToken` budget; do not compare the two for equality.
- Open the citation markers in the conversation, verify against the source documents whether each citation can trace back to the original paragraph, and check whether the citation arrays in `quoteList` and `responseData` are consistent.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
