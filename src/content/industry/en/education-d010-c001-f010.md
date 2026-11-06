---
title: Citations and Source Traceability for Daily Kindergarten Care Management: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c001-f010
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Care | Citations | Operations
meta_description: Kindergarten Care: review citations for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Daily Kindergarten Care Management: Coordinate Operations and Application Handover

## What this category's data looks like

Kindergarten childcare daily life management materials consist mainly of daily life schedules, morning and afternoon health check records, and child health observation records. When they enter the knowledge base retrieval node, they respectively take on three roles: timeline, health screening, and individual observation. The daily life schedule provides activity names, time periods, and responsible persons; the morning and afternoon health check records provide dates, body temperatures, and abnormality flags; the child health observation records provide observation items, frequencies, and signatures. The update cadence rolls by shift and date, and the field characteristics are concentrated in dates, quantities, names, and signature receipts. After the materials enter this feature, the citation output is only responsible for pointing back to the original text snippets and source identifiers; it does not write ledgers or produce difference lists for subsequent nodes.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation contents, each containing an original text snippet and a source identifier, and the length can be 0. The handover-ready deployment status and operation records are completed subsequently by AI nodes, code nodes, or manual work; the citation array itself does not undertake comparison or signature receipts.

| Object | Check | Verification action |
| --- | --- | --- |
| Daily life schedule | Whether activity names, time periods, responsible persons, dates, and signatures match the morning and afternoon health check records and health observation records | Open the citation markers and point back to the original paragraphs one by one, check the fields and dates, and record the number of citations |
| Morning and afternoon health check records | Whether dates, body temperatures, abnormality flags, quantities, and signature receipts are consistent with the schedule and observation records | Check the selected knowledge base collections and vector models, and verify whether the citation snippets correspond to the original text |
| Child health observation records | Whether observation items, frequencies, dates, signatures, and receipts are consistent with the schedule and morning and afternoon health check records | Run a trial with a question that has no matching materials, see whether the output is empty while the flow continues, and record `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` |
| Citation content output | The number of returned items is consistent with the matched materials; empty is also normal, and do not compare it for equality with `quoteMaxToken` | Open the search parameter panel and check item by item; record the number of citations separately, and count the tokens of the citation text separately |

## Three common errors

- Symptom: The names, quantities, and dates of the same record do not match between the schedule and the morning and afternoon health check records. Cause: The correspondence between citation snippets and the original text was not traced back item by item, and the fields were not checked by date and signature.
- Symptom: Versions are not synchronized, and the old version of the schedule and the new version of the observation records are cited at the same time. Cause: The associated knowledge base collections were not checked against the vector model, and the update cadence did not roll by shift.
- Symptom: Signatures or receipts are missing, and records are missing when checking the handover form item by item. Cause: The citation array only outputs original text snippets and source identifiers; signature receipts must be completed by subsequent nodes or manually.

## How to verify the setup

Feature acceptance: ask a question with original text support, and check whether the citation array and markers can point back to the original text; then ask a question with no matching materials, confirm that the array is empty while the flow completes, and record `quoteList` within `responseData`.

Business testing: check once item by item according to the handover form, see which record is missing, and whether the version, connection, and task records are consistent.

- In the node, check the selected knowledge base collections and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Open the search parameter panel and check item by item; record the number of citations separately, count the tokens of the citation text separately, and do not compare it for equality with `quoteMaxToken`.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
