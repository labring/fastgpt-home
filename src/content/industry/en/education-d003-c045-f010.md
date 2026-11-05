---
title: Citations and Source Traceability for Off-Campus Training Registration and Compliance: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c045-f010
page_type: 行业问题页
application_area: education
meta_title: Training Compliance | Citations | Intake
meta_description: Training Compliance: review citations for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Off-Campus Training Registration and Compliance: Handle Questions and Collect Missing Information

## What this category's data looks like

In the scenario of off-campus training compliance filing and penalty response, the materials entering the Q&A intake and missing-item follow-up stage are mainly of three types: school operating license, course filing materials, and fee disclosure. The school operating license usually contains the institution name, school address, license number, validity period, and issuance date; the signature field and official seal are common missing items. Course filing materials cover the course name, number of class hours, instructor, filing date, and version number; the name or quantity of the same course is prone to inconsistency across different versions. Fee disclosure includes fee items, standards, disclosure date, and receipt signature; cases of missing signature or receipt are relatively common. When the three types of materials enter this feature, each serves as a citation source for the knowledge base retrieval node, providing the original-text basis for the intake record and the completed follow-up items. The material update cadence follows filing changes, annual inspections, and disclosure cycles, and fields and dates need to be compared one by one.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each entry containing an original-text snippet and a source identifier, and the length may be 0. The intake record and the completed follow-up items are then handled by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| School operating license | Whether the name, address, license number, validity period, issuance date, signature, and official seal are complete and consistent with the course filing materials | Open the citation marker to point back to the original-text paragraph, compare dates and signatures field by field, and record missing items |
| Course filing materials | Whether the course name, number of class hours, instructor, filing date, and version number correspond to the fee disclosure and license information | Check the name, quantity, and date of the same course in the two materials, and mark places where the version has not been synchronized |
| Fee disclosure | Whether the fee items, standards, disclosure date, and receipt signature are complete and consistent with the filing materials | Check the receipt signature and disclosure date, and confirm that missing signatures or receipts are included in the follow-up items to be completed |
| Citation content array | The number of returned entries is consistent with the hit materials; being empty is also normal; `quoteMaxToken` only constrains the citation text budget | Run a test with a question that has no matching materials to see whether the array is empty while the chain continues; check the citation snippets in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` |

## Three common errors

- Symptom: the same institution name is written differently in the school operating license and the course filing materials. Cause: the filing version was not synchronized, and the old-version materials were not replaced, causing the fields to mismatch.
- Symptom: the number of course class hours is inconsistent between the filing materials and the fee disclosure. Cause: the filing was not backfilled after the disclosure was updated, and the dates and quantities in the two materials are disconnected.
- Symptom: the fee disclosure lacks a receipt signature, but the intake record still shows the materials are complete. Cause: missing-item identification did not cover the signature field, and the follow-up step was not triggered.

## How to verify the setup

Feature acceptance: ask a question that has an original-text basis, and check whether the citation array and markers can point back to the original text; then ask a question with no matching materials, confirm that the array is empty while the chain runs through, and record the number of citations and the `quoteMaxToken` budget for separate checks.

Business test: submit a question missing key information, and see whether it asks follow-up questions before answering, and whether the intake record and the completed follow-up items list the missing items.

- In the conversation, open the citation markers, check the citation snippets against the source documents one by one against the original-text paragraphs, and confirm that each citation can point back.
- Open the search parameter panel and check the values item by item, then run a test with a question that has no matching materials to confirm that the output is empty while the chain continues.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
