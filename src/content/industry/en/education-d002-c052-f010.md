---
title: Citations and Source Traceability for College Admissions and Application Placement: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c052-f010
page_type: 行业问题页
application_area: education
meta_title: College Admissions | Citations | Checks
meta_description: College Admissions: review citations for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for College Admissions and Application Placement: Compare Documents and Locate Differences

## What this category's data looks like

This page addresses the scenario of general higher education institution admissions and enrollment filing. Materials include three categories: enrollment plans, filing rules, and admission rosters. Enrollment plans are organized by institution-major group and include planned enrollment numbers, selected examination subjects, batches, and remarks; they are published annually and updated on a rolling basis with supplementary volunteer recruitment. Filing rules include filing ratios, tie-breaking sorting, withdrawal conditions, and time nodes; they are usually issued in the form of notices or measures, and versions change frequently. Admission rosters record candidates one by one and include candidate number, name, institution-major group, filing score, admission status, and signature fields, signed separately by the admissions department and the reviewer. When these three categories of materials enter the knowledge base retrieval node, each is cited as an independent source: enrollment plans are used to verify planned enrollment numbers and subject requirements, filing rules are used to verify rule versions and dates, and admission rosters are used to verify the name, quantity, date, and signature receipt of the same candidate record. The citation output retains the original text snippet and source identifier for subsequent comparison.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text snippet and a source identifier, and the length may be 0. The "discrepancy list" is completed subsequently by an AI node, code node, or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Enrollment plan | Whether the name, planned enrollment number, selected examination subjects, and publication date of the same major group are consistent across the two materials | In the node, verify the selected collection and vector model, and compare item by item the planned enrollment number, subjects, and dates in the enrollment plan and admission roster |
| Filing rules | Whether the rule version, filing ratio, tie-breaking sorting, and effective date of the same batch are consistent, and whether signatures or receipts are missing | Open the search parameter panel and verify the values item by item, compare the original rule text with the roster execution records, and check for unsynchronized versions and signature fields |
| Admission roster | Whether the candidate number, name, filing score, admission status, and date of the same candidate record are consistent across the two materials | Run a test query with a question that has no matching materials, and see whether the output is empty while the pipeline continues; then open the citation markers to compare against the source documents |
| Cited content output | The number of returned items matches the hit materials; empty is also normal; each citation can point back to the original paragraph | Record the array length and the tokens of the cited text, and verify the three fields `quoteMaxToken`, `responseData` (non-streaming module results returned with detailed output enabled), and `quoteList` respectively |

## Three common errors

- Symptom: The name or filing score of the same candidate does not match between two rosters. Cause: Material versions are not synchronized, and the old roster is still being cited; first verify the hit materials and version dates.
- Symptom: The planned enrollment number in the enrollment plan is inconsistent with the number of records in the admission roster. Cause: After supplementary volunteer recruitment, plan adjustments were not written back to the ledger; compare publication dates and signature fields to locate the discrepancy.
- Symptom: There are no citation markers in the answer, or the cited snippet does not match the original text. Cause: First verify whether there was a hit in this round and which material was hit, then check trimming; do not directly attribute it to length trimming.

## How to verify the setup

This feature's acceptance: ask a question with original-text support, and verify whether the cited content array and markers can point back to the original paragraph; then ask a question with no matching materials, and confirm that the array is empty while the pipeline runs through.

Business test: use one real record to find a field inconsistent with the ledger, record the array item count and the tokens of the cited text, and verify `quoteMaxToken`, `responseData`, and `quoteList` respectively.

- In the node, verify the selected knowledge base collections and their vector models, confirm they use the same vector model, and then run the test again.
- Open the search parameter panel and verify the values item by item, keeping them consistent with the values set in the knowledge base retrieval section.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
