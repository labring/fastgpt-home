---
title: Citations and Source Traceability for Off-Campus Training Registration and Compliance: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c045-f010
page_type: 行业问题页
application_area: education
meta_title: Training Compliance | Citations | Checks
meta_description: Training Compliance: review citations for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Off-Campus Training Registration and Compliance: Compare Documents and Locate Differences

## What this category's data looks like

This page addresses material verification and discrepancy localization in off-campus training compliance filing and penalty response, covering three types of materials: school operation licenses, course filing materials, and fee disclosure. A school operation license typically includes the institution name, operation address, permitted items, validity period, issuing authority, and signature/seal; course filing materials include course name, class hours, target students, textbook version, filing date, and handler signature; fee disclosure includes fee items, standards, refund rules, disclosure date, and receipt. The three types of materials come from different sources and update at different rhythms: licenses and filings are mostly updated annually or upon changes, while fee disclosures are updated as items are adjusted. After entering the knowledge base retrieval node, each of the three types of materials serves as a citable original source; the node returns an array of cited content based on the associated knowledge base, for use in subsequent field comparisons.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each containing an original text snippet and a source identifier, and the length may be 0. The "discrepancy list" is completed subsequently by an AI node, code node, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| School operation license | Whether the institution name, operation address, permitted items, validity period, issuing authority, and signature/seal are consistent between the license and the ledger | Retrieve the original license citation, compare field by field with the ledger, and mark discrepancies in name, date, and signature |
| Course filing materials | Whether the course name, class hours, target students, textbook version, filing date, and handler signature are consistent with the license and fee disclosure | Open the citation marker to refer back to the original paragraph, and verify the course name, quantity, date, and signature receipt |
| Fee disclosure | Whether the fee items, standards, refund rules, disclosure date, and receipt are consistent with the filing materials and ledger | Compare the disclosure date and receipt, and check whether versions are synchronized and whether signatures or receipts are missing |
| Citation content output | The number of returned entries matches the hit materials; being empty is also normal | Run a test with a question that matches no materials, and see whether the output is empty while the pipeline continues |

## Three common errors

- Symptom: The name, class hours, and filing date of the same course do not match across two materials. Cause: The materials are updated separately, and no field-level comparison or write-back was performed.
- Symptom: The fee disclosure has been adjusted, but the course filing materials are still the old version. Cause: Versions are not synchronized, and the source identifier and date were not checked during citation.
- Symptom: The license or receipt lacks a signature. Cause: Material archiving is incomplete, and signature and receipt fields were not checked item by item during verification.

## How to verify the setup

Feature acceptance: Ask a question with original text support, and check whether the citation array and markers can refer back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the pipeline runs through.

Business test: Use a real record to find fields inconsistent with the ledger, record the number of citations and the `quoteMaxToken` budget, and view the source identifier in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList`.

- In the node, check the selected knowledge base collections and their vector models, and confirm they are consistent with the search parameters set in the knowledge base retrieval section.
- Open the search parameter panel and check item by item, record the number of citations and the `quoteMaxToken` budget, and check the source identifier in `quoteList` within `responseData`.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
