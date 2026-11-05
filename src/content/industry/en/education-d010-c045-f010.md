---
title: Citations and Source Traceability for Off-Campus Training Registration and Compliance: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c045-f010
page_type: 行业问题页
application_area: education
meta_title: Training Compliance | Citations | Operations
meta_description: Training Compliance: review citations for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Off-Campus Training Registration and Compliance: Coordinate Operations and Application Handover

## What this category's data looks like

In the off-campus training compliance filing and penalty response scenario, the core materials are of three types: school operation licenses, course filing materials, and fee disclosure. The school operation license provides subject qualification fields and validity dates; the course filing materials provide course names, number of class hours, filing dates, and handler signatures; the fee disclosure provides fee items, amounts, disclosure dates, and receipts. The materials enter the knowledge base retrieval node as scanned copies and ledger tables, each serving the role of source identification. The update cadence rolls forward with filing changes, disclosure adjustments, and archiving of penalty receipts. The field characteristic is that the same record has differences in names, quantities, and dates across multiple materials, and version numbers and signature receipts are easily missing. After these materials enter this feature, they are output as citation sources respectively, for subsequent use in comparing fields, writing ledgers, and generating reports.

## Configuration and implementation checks

This link is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each entry containing the original text snippet and source identification, and the length can be 0. The handover-ready deployment status and operation records are completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| School operation license | Whether the subject name, license number, validity date, and signature are consistent with the course filing materials | Open the corner mark in the citation output, check field by field against the source document, and record discrepancy items |
| Course filing materials | Whether the course name, number of class hours, filing date, and handler signature match the fee disclosure | Run a test with a question that has no matching materials, see whether the output is empty while the pipeline continues, then check the number of citations in `responseData` (non-streaming module results returned with detailed output enabled) |
| Fee disclosure | Whether the fee items, amounts, disclosure date, and receipts are complete, and whether the version is in sync | Open the search parameter panel and check item by item, confirming that the citation snippets in `quoteList` can point back to the original paragraphs |
| Citation content output | The number of returned entries is consistent with the matched materials; empty is also normal | Verify that `quoteMaxToken` is the citation content budget, record the array entry count separately, and do not compare the two for equality |

## Three common errors

- Symptom: The name, quantity, and date of the same course do not match across two materials. Cause: The filing materials and fee disclosure are updated separately, no field-level comparison is performed, and the citation snippets each point back to different versions.
- Symptom: The version is not in sync, and the citation corner mark points to an old disclosure. Cause: The old materials in the knowledge base have not been taken down, retrieval hits the old snippets, and the output pipeline still runs through.
- Symptom: Signatures or receipts are missing, and the ledger cannot be closed. Cause: The handler signature page was omitted when archiving the scanned copies; although the citation array is non-empty, it lacks the source of key fields.

## How to verify the setup

Feature acceptance: Ask a question with original-text support, and check whether the citation array and corner marks can point back to the original text; then ask a question with no matching materials, confirm that the array is empty while the pipeline runs through, and check the citation entry count records in `quoteList` within `responseData`.

Business testing: Check item by item once according to the handover sheet, see which record is missing, and focus on checking the fields, dates, and signatures of the school operation license, course filing materials, and fee disclosure.

- In the node, check the selected knowledge base collections and their vector models, and confirm that the selected knowledge bases use the same vector model
- Open the search parameter panel and check the values item by item, keeping them consistent with those set in the knowledge base retrieval section

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
