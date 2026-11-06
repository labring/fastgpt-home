---
title: Citations and Source Traceability for Off-Campus Training Registration and Compliance: Track Progress and Check Statistics
slug: /en/industry/education-d006-c045-f010
page_type: 行业问题页
application_area: education
meta_title: Training Compliance | Citations | Progress
meta_description: Training Compliance: review citations for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Off-Campus Training Registration and Compliance: Track Progress and Check Statistics

## What this category's data looks like

In the off-campus training compliance filing and penalty response scenario, the materials entering the knowledge base retrieval node are mainly of three types: scanned copies of school operation licenses, course filing materials, and fee disclosure documents. The school operation license provides the institution name, address, validity period, and issuance date; the course filing materials provide the course name, class hours, instructor, and filing number; the fee disclosure provides fee items, standards, refund rules, and disclosure date. These materials are usually updated weekly or monthly, versions iterate frequently, field names may not be consistent across different materials, and signature and receipt positions are not fixed. After the materials enter this function, each serves as a retrievable original text fragment for subsequent field comparison, ledger writing, and report generation.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each containing an original text fragment and a source identifier, and the length can be 0. The "progress table and statistical scope description" is then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| School operation license | Check the institution name, address, validity period, issuance date, and signature field, and confirm consistency with the subject information in the course filing materials | Locate the original license fragment in the citation output, compare dates and signatures field by field, and record discrepancies |
| Course filing materials | Check the course name, class hours, instructor, filing number, and version date, and confirm consistency with the course information in the fee disclosure | Open the citation marker to trace back to the original text, and check whether the quantity and dates of the same-named course match across the two materials |
| Fee disclosure | Check the fee items, standards, refund rules, disclosure date, and receipt, and confirm synchronization with the version of the course filing materials | Use the citation array to trace each item back to the original paragraph, and check whether signatures or receipts are missing |
| Citation content output | The number of returned items matches the hit materials; being empty is also normal; `quoteList` in `responseData` (non-streaming module results returned with detailed output enabled) can be used to view hit details | Run a test with a question that has no matching materials, and see whether the output is empty while the pipeline continues; `quoteMaxToken` only checks the citation text budget, and the array item count is recorded separately |

## Three common errors

- Symptom: The name or quantity of the same course does not match between the filing materials and the fee disclosure. Cause: The two materials were filled in by different personnel at different times, versions were not synchronized, and there is no unified field scope.
- Symptom: The institution address or validity period date is inconsistent between the license and the filing materials. Cause: After the materials were updated, the old version was not synchronously replaced, and historical fragments were hit during citation.
- Symptom: The fee disclosure lacks a signature or receipt, and the citation fragment cannot trace back to the complete original text. Cause: The disclosure step did not complete the signature process, and the scanned copy is missing key pages.

## How to verify the setup

This function's acceptance check: ask a question with original text support, and check whether the citation array and markers can trace back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the pipeline runs through. Check the hit records of `quoteList` in `responseData`; `quoteMaxToken` only checks citation text tokens, and the array item count is recorded separately.

Business test: use one week of records to verify the totals, and see whether the scope and exceptions are clearly written.

- Run a test with a question that has no matching materials, and confirm that the citation array is empty while the output pipeline continues to run through.
- Open the citation markers in the conversation, compare them with the source documents, and check whether each citation can trace back to the original paragraph.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
