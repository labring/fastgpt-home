---
title: Citations and Source Traceability for Off-Campus Training Registration and Compliance: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c045-f010
page_type: 行业问题页
application_area: education
meta_title: Training Compliance | Citations | Review
meta_description: Training Compliance: review citations for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Off-Campus Training Registration and Compliance: Trace Exceptions and Review Results

## What this category's data looks like

This page is for off-campus training compliance filing and penalty response scenarios. Materials include three types: school operating license, course filing materials, and fee disclosure. The school operating license provides the entity name, address, validity period, and issuance date. The course filing materials provide course name, class hours, teachers, and filing date. The fee disclosure provides fee items, standards, refund rules, and disclosure date. All three types of materials contain signature and receipt fields, and the update cadence changes with approval, changes, renewal, and disclosure adjustments. When entering this feature, the school operating license, course filing materials, and fee disclosure are each linked as independent knowledge bases. The knowledge base retrieval node matches original text fragments by question, outputs a cited content array, and each entry contains the original text fragment and source identifier, for subsequent comparison of names, quantities, dates, signatures, and receipts, forming an exception list and review conclusion.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs a cited content array. Each entry contains the original text fragment and source identifier, and the length can be 0. The exception list and review conclusion are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| School operating license | Whether the entity name, address, validity period, issuance date, and signature receipt are consistent with the course filing materials | Retrieve the original text fragment of the school operating license from the cited content, compare item by item with the name and date of the same record in the course filing materials, and mark if the signature or receipt is missing |
| Course filing materials | Whether the course name, class hours, teachers, filing date, and version match the fee disclosure | Use the citation array to point back to the original paragraph of the course filing materials, verify the name, quantity, and date of the same course in the two materials, and record if the version is not synchronized |
| Fee disclosure | Whether the fee items, standards, refund rules, disclosure date, and signature receipt are complete | Open the citation marker to compare against the source document of the fee disclosure, verify the disclosure date and receipt, and separately record the array length when the citation is empty |
| Cited content output | The number of returned entries is consistent with the matched materials; empty is also normal; the cited fragments can point back to the original text | Run a test with a question that has no matching materials to see whether the array is empty while the chain still runs; then verify `quoteMaxToken` and the cited text in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` |

## Three common errors

- Symptom: The name and class hours of the same course do not match between the course filing materials and the fee disclosure. Cause: The two materials are updated separately, no comparison of names and quantities for the same record is done, and the cited fragments do not point back to the original text.
- Symptom: After the school operating license is renewed, the course filing materials still cite the old version date. Cause: The version is not synchronized, the citation array matches the old original text, and the consistency between the issuance date and the filing date is not checked.
- Symptom: The fee disclosure lacks a signature or receipt, and there is no citation marker in the answer. Cause: The material does not include the signature page, retrieval does not match that paragraph, and an empty citation array is mistakenly judged as retrieval failure.

## How to verify the setup

Acceptance of this feature: ask a question with original text support, and verify whether the citation array and markers can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain still runs.

Business test: create an exception record, see whether it can be traced to the source material, and record the number of citations and the `quoteMaxToken` budget; do not compare the two for equality.

- In the node, verify the selected knowledge bases and their vector models, open the search parameter panel to check the values item by item, and view `quoteList` to confirm the matched materials.
- In the conversation, open the citation markers, compare the source documents for names, quantities, dates, signatures, and receipts, record the number of citations separately, and count cited text tokens separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
