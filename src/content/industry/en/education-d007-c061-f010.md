---
title: Citations and Source Traceability for Research Outcome Registration and Intellectual Property: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c061-f010
page_type: 行业问题页
application_area: education
meta_title: Research IP | Citations | Review
meta_description: Research IP: review citations for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Research Outcome Registration and Intellectual Property: Trace Exceptions and Review Results

## What this category's data looks like

Research achievement registration and intellectual property management involves three core types of materials: achievement registration forms, patent disclosure documents, and software copyright materials. Achievement registration forms record the achievement name, contributors, date, and unit signature; patent disclosure documents carry the technical solution, inventors, application milestones, and receipts; software copyright materials include the version number, development completion date, and signature/seal page. The three types of materials often come from different handlers and different batches, with inconsistent update rhythms, and each has its own emphasis in field definitions. When the materials enter the knowledge base retrieval node, each participates in vector search as an independent source, and after a hit, enters the citation content array in the form of an original text snippet plus a source identifier, for subsequent use in comparing fields, checking dates and signatures, and tracing version differences.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs a citation content array, each entry containing an original text snippet and a source identifier, and the length can be 0. The "exception list and review conclusions" are completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Achievement registration form | The four items—name, contributors, date, and unit signature—must be consistent with the corresponding fields in the patent disclosure document, and the date must not be later than the application milestone of the disclosure document | Open the citation marker to refer back to the original paragraph, compare the two materials field by field, record inconsistent items, and annotate the source identifier |
| Patent disclosure document | The inventors, technical solution name, and application date must be consistent with the registration form, and receipts must be complete | Check the receipt fields and signature columns in the cited snippet, and check whether the source identifier returned by `quoteList` points to the same record |
| Software copyright materials | The version number and development completion date must be synchronized with the registration form and disclosure document, and the signature/seal page must not be missing | Compare against the original text snippets in the citation array, verify the version number and date, and record missing signatures or receipts in the exception list |
| Citation content output | The number of returned entries is consistent with the hit materials; being empty is also normal, and the output pipeline continues to work | Run a trial with a question that has no matching materials to confirm the array is empty while the pipeline is not interrupted; record the array length and separately check the `quoteMaxToken` budget |

## Three common errors

- Symptom: The name or quantity of the same achievement does not match across two materials. Cause: Handlers entered them separately without field-level cross-checking, and the cited snippets each hit independently.
- Symptom: Versions are not synchronized, causing conflicts between dates and version numbers. Cause: Materials are updated in batches, and old versions remain in the knowledge base and still participate in retrieval, so citation sources point to old paragraphs.
- Symptom: Missing signatures or receipts, and exception records cannot be closed. Cause: Scanned copies of materials are incomplete, the signature column in the cited snippet is empty, and there is no original record support during review.

## How to verify the setup

Acceptance of this feature: ask a question with original-text support and check whether the citation array and markers can refer back to the original text; then ask a question with no matching materials, confirm the array is empty while the pipeline works, and record the array length and the `quoteMaxToken` budget, without comparing the two for equality.

Business test: create an exception record, see whether it can be traced to the source material, and confirm that the exception has original record support and is handed to the responsible person for handling after the reviewer signs.

- In the conversation, open the citation markers and check whether the source identifiers in `responseData` (non-streaming module results returned with detailed output enabled) are consistent with the original paragraphs against the source documents.
- Open the search parameter panel and check the values item by item, confirm that the selected knowledge base uses the same vector model, and run a trial with a no-match question to test the empty-array scenario.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
