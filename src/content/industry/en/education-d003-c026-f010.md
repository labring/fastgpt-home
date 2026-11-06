---
title: Citations and Source Traceability for Degree Awards and Certificate Information Reporting: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c026-f010
page_type: 行业问题页
application_area: education
meta_title: Degree Certificates | Citations | Intake
meta_description: Degree Certificates: review citations for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Degree Awards and Certificate Information Reporting: Handle Questions and Collect Missing Information

## What this category's data looks like

The data in this category looks like this: Degree conferral and certificate information reporting involves three types of materials: degree application forms, thesis review forms, and defense resolutions, which respectively carry application information, review conclusions, and defense voting results. Degree application form fields include degree type, discipline/major, application date, and signature; thesis review forms include reviewer, review conclusion, review date, and signature; defense resolutions include defense committee roster, voting result, defense date, and chair signature. Materials enter the Q&A acceptance and missing-item follow-up function according to the batch reporting rhythm. Each material enters the citation array as an original text fragment with a source identifier, for subsequent nodes to compare fields, dates, and signatures. If the same record's name, quantity, or date does not match across two materials, if versions are not synchronized, or if a signature or receipt is missing, all of this will be exposed during missing-item identification and follow-up questioning.

## Configuration and implementation checks

Configuration and implementation checks: This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each item containing an original text fragment and a source identifier, and the length can be 0. "Acceptance records and completed question items" are then handled by subsequent AI nodes, code nodes, or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| Degree application form | Whether fields, dates, and signatures are complete, and whether the name, quantity, and date can match those in the thesis review form and defense resolution | Locate the original text fragment of the degree application form in the citation array, compare degree type, discipline/major, application date, and signature item by item, and record missing items |
| Thesis review form | Whether reviewer, review conclusion, review date, and signature are complete, and whether they are consistent with the records in the degree application form | Open the citation marker to point back to the original paragraph, verify the review conclusion and review date, and mark fields inconsistent with the degree application form |
| Defense resolution | Whether the defense committee roster, voting result, defense date, and chair signature are complete, and whether the version is synchronized with the other two materials | Verify the original text of the defense resolution against the citation source, check signatures and receipts, confirm version synchronization, and then forward to the handler |
| Knowledge base retrieval node | Whether the associated knowledge base uses the same vector model, and whether the number of citation content output items matches the hit materials | Open the search parameter panel to check the values, run a test with a question that has no matching materials, and see whether the array is empty while the pipeline continues |

## Three common errors

- Symptom: The same record's name, quantity, or date does not match between the degree application form and the defense resolution. Cause: The two materials are filled in separately, no field-level comparison is performed, and missing-item follow-up is not triggered.
- Symptom: The thesis review form version is not synchronized, and the citation fragment does not match the original text. Cause: After the material is updated, it is not re-entered into retrieval, and the citation still points to the old version's paragraph.
- Symptom: The defense resolution lacks a signature or receipt, but a citation marker appears in the answer. Cause: The citation array only reflects hit materials, not whether signatures and receipts are complete.

## How to verify the setup

Acceptance for this feature: Ask a question with original text support, and check whether the citation array and markers can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the pipeline runs through. When citation limits are involved, check the tokens of the citation text, record the number of array items separately; the number of citation items is the array length, and `quoteMaxToken` is the citation content budget, and the two are not compared for equality.

Business test: Ask a question missing key information, and see whether it first asks a follow-up before answering.

- In the conversation, open the citation markers, verify against the source documents whether each citation can point back to the original paragraph, and check the citation information in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList`.
- Run a test with a question that has no matching materials, see whether the citation content output is empty while the pipeline continues, and record the number of array items and the tokens of the citation text.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
