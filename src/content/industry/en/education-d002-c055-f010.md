---
title: Citations and Source Traceability for Adult College Entrance Applications and Admissions: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c055-f010
page_type: 行业问题页
application_area: education
meta_title: Adult Admissions | Citations | Checks
meta_description: Adult Admissions: review citations for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Adult College Entrance Applications and Admissions: Compare Documents and Locate Differences

## What this category's data looks like

The data for this category looks like this: Adult college entrance examination registration and admission management involves three types of materials: registration forms, preferential scoring materials, and admission rosters. The registration form contains the candidate's name, ID number, application level, subject category, registration point, and signature field; the preferential scoring materials contain the name of the bonus item, certificate number, issuance date, reviewer's signature, and receipt; the admission roster contains the admission batch, institution and major, candidate number, admission date, and handler's signature. Materials enter in batches by registration season and admission season; registration forms precede preferential scoring materials, and the admission roster is summarized after admission ends. When entering the knowledge base retrieval node, the three types of materials are each cited as independent sources, and cited snippets point back to specific paragraphs, used for subsequent comparison of whether the name, quantity, date, and signature of the same record are consistent.

## Configuration and implementation checks

Configuration and implementation checks: This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text snippet and source identifier, and the length can be 0. The "discrepancy list" is then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Adult college entrance examination registration form | The same candidate's name, ID number, and application level in the registration form and admission roster are consistent, and the signature field is not missing | Retrieve the registration form snippet from the cited content array, compare it field by field with the admission roster snippet, and record inconsistent items |
| Preferential scoring materials | The bonus item name, certificate number, and issuance date match in the two materials, and the reviewer's signature and receipt are complete | Open the citation marker to trace back to the original paragraph, check the date and signature field, and mark records missing a signature or receipt |
| Admission roster | The admission batch, institution and major, candidate number, and admission date are consistent with the corresponding record in the registration form, and the version is the latest summary | Use one real record to locate the roster snippet in the citation array, check it item by item against the ledger fields, and record discrepancies |
| Knowledge base retrieval node | The associated knowledge base uses the same vector model, the cited content array length can be 0, and the pipeline still runs when the array is empty | Check the selected knowledge base collection and vector model, run a test with a question that has no matching materials, and observe the `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` outputs |

## Three common errors

- Symptom: The same candidate's name or ID number in the registration form and admission roster does not match. Cause: The two materials were entered at different times, no field-level comparison was performed, and discrepancies were not written back to the ledger.
- Symptom: Preferential scoring materials are missing the reviewer's signature or receipt. Cause: The material circulation step was not synchronized, the version was not updated, and the signature field was left blank when archived.
- Symptom: The answer has content but the citation marker is missing, and the cited snippet does not match the original text. Cause: First check whether this round hit and which materials were hit, then look at trimming, and do not directly attribute it to length trimming.

## How to verify the setup

How to verify the setup: For this feature's acceptance, ask a question with original-text support and check whether the citation array and citation markers can point back to the original text; then ask a question with no matching materials, confirm the array is empty while the pipeline runs, and record the number of citations and the `quoteMaxToken` budget, without comparing the two for equality.

Business test: Use one real record to find a field inconsistent with the ledger, hand it to the reviewer for confirmation, and write it back.

- Open the citation markers, check item by item against the source document whether the cited snippets match the original paragraphs, and record inconsistent items.
- Run a test with a question that has no matching materials, confirm the cited content array is empty while the output pipeline continues, and check `quoteList` within `responseData`.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
