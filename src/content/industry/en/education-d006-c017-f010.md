---
title: Citations and Source Traceability for Undergraduate Program Establishment and Adjustment: Track Progress and Check Statistics
slug: /en/industry/education-d006-c017-f010
page_type: 行业问题页
application_area: education
meta_title: Undergraduate Programs | Citations | Progress
meta_description: Undergraduate Programs: review citations for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Undergraduate Program Establishment and Adjustment: Track Progress and Check Statistics

## What this category's data looks like

The progress records and statistical verification for undergraduate program setup and dynamic adjustment involve three types of materials: program setup application forms, talent cultivation plans, and expert review opinions. The application form carries the proposed program name, code, length of study, degree-granting category, and application date; the talent cultivation plan records the course structure, credits and class hours, practical components, and version date; the expert review opinions record the review conclusion, list of experts, signatures, and receipt date. When these three types of materials enter the knowledge base retrieval node, they are respectively retrieved and back-referenced as citation sources, for subsequent field comparison, ledger writing, and report generation. The update cadence advances by application batch and review round, and material versions are synchronized with revisions to the cultivation plan. Field characteristics are concentrated in four categories: names, quantities, dates, and signatures: the same program may be written differently in two materials, the number of courses and total credits may not match, the application date and review date may span versions, and signatures or receipts may be missing. These characteristics make it necessary for progress records and statistical verification to be grounded in header definitions and exception notes.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each entry containing an original text snippet and a source identifier, and the length may be 0. The "progress table and statistical definition notes" are completed subsequently by AI nodes, code nodes, or manual work. The number of citations is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality; the citation limit concerns the tokens of the citation text, while the array entry count is recorded separately.

| Object | Check | Verification action |
| --- | --- | --- |
| Program setup application form | Whether the fields, dates, and signatures are consistent with the talent cultivation plan and expert review opinions | Check the program name, code, length of study, degree-granting category, application date, and signature field, and back-reference the original text paragraphs |
| Talent cultivation plan | Whether the version of the course structure, credits and class hours, and practical components is synchronized with the application form | Check the number of courses, total credits, and plan version date, and compare the names and quantities in the two materials |
| Expert review opinions | Whether the review conclusion, list of experts, signatures, and receipt date are complete | Check the review date, expert signatures, and receipts, and check whether signatures or receipts are missing |
| Citation content output | Whether the number of returned entries matches the materials hit; being empty is also normal | Run a test with a question that matches no materials, and see whether the output is empty while the pipeline continues; open the citation markers in the conversation, compare against the source documents, and check the values of `responseData` (non-streaming module results returned with detailed output enabled), `quoteList`, and `quoteMaxToken` |

## Three common errors

- Symptom: The program name and course quantity for the same record do not match between the application form and the talent cultivation plan. Cause: The two materials were revised separately under different versions, without field-level synchronization and back-reference verification.
- Symptom: The signatures or receipts in the expert review opinions are missing, yet the progress table still records the item as completed. Cause: Material collection and ledger registration are disconnected, and the signature pages were not archived together with the review opinions.
- Symptom: The citation snippets do not match the original text, or the answer has content while the citation array is empty. Cause: First check whether this round hit anything and which material was hit, then look at trimming; an empty array is a normal output.

## How to verify the setup

This feature's acceptance: ask a question with original-text support, and check whether the citation array and markers can back-reference the original text; then ask a question that matches no materials, and confirm that the array is empty while the pipeline runs through.

Business test: use one week of records to verify the totals, see whether the definitions and exceptions are clearly written, whether the record count and statistical count match, and whether the definitions are written into the header.

- Open the search parameter panel and check item by item, confirm that the associated knowledge base uses the same vector model, and record the number of citations and the value of `quoteMaxToken`.
- Open the citation markers in the conversation, compare against the source documents, check the original text snippets and source identifiers one by one, and check whether `quoteList` within `responseData` can be back-referenced.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
