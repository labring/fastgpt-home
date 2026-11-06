---
title: Citations and Source Traceability for College Admissions and Application Placement: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c052-f010
page_type: 行业问题页
application_area: education
meta_title: College Admissions | Citations | Intake
meta_description: College Admissions: review citations for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for College Admissions and Application Placement: Handle Questions and Collect Missing Information

## What this category's data looks like

Materials in the regular higher education institution admissions enrollment and filing stage mainly consist of enrollment plans, filing rules, and admission rosters, sourced from provincial admissions and examination institutions and university admissions offices, updated in batches as batches progress, with fields including institution major group, planned number, filing ratio, candidate number, admitted major, date, and signature. Enrollment plans provide planned numbers by major and subject selection requirements; filing rules provide filing ratio, tie-breaking ranking, and adjustment criteria; admission rosters provide the actual admission list and receipts. When these three types of materials enter the Q&A acceptance and missing-item follow-up function, plans and rules serve as the basis for determination, and rosters serve as result evidence; if a question mentions only an institution or batch but lacks major, subject category, or date, the acceptance record first marks the missing item and asks the questioner for follow-up, and after completion the handling staff processes it.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text snippet and source identifier, and the length can be 0. The "acceptance record and completed question items" are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Enrollment plan | Fields include institution major group, major name, planned number, subject selection requirements, date, and signature; the name and quantity of the same major in two plans must be consistent | Retrieve the original plan paragraph, compare major names, planned numbers, and signature fields, check whether the selected knowledge base uses the same vector model, and record the number of citations and the `quoteMaxToken` budget |
| Filing rules | Fields include filing ratio, tie-breaking ranking, adjustment and withdrawal criteria; the version number and effective date must be synchronized with the current batch | Open the search parameter panel and check the values item by item, use `quoteList` to view hit snippets, and confirm that the rule version is not lagging behind the current batch |
| Admission roster | Fields include candidate number, admitted major, admission date, and receipt signature; the criteria of the roster, plan, and rules must be mutually traceable | Open the citation markers in the conversation, compare against the source documents, confirm that each citation can be traced back to the original paragraph, and separately mark rows missing signatures or receipts |
| Acceptance record | Missing items are identified and followed up, answers are based on materials, and after the question items are completed, it is transferred to handling staff | Run a test with a question missing key information, see whether it first asks for follow-up before answering, and check the length of the citation array in `responseData` (non-streaming module results returned with detailed output enabled) |

## Three common errors

- Phenomenon: The name and quantity of the same major in two plans do not match. Cause: The materials belong to different batches or different sources, and the hit materials were not first checked before comparing fields.
- Phenomenon: The filing rule version is not synchronized, and the cited snippet is inconsistent with the current batch criteria. Cause: The knowledge base was not updated with the batch, and retrieval hit an old-version paragraph.
- Phenomenon: The admission roster lacks a signature or receipt, but the answer gives a conclusion. Cause: The missing item was not identified and followed up, and it directly entered the answering step.

## How to verify the setup

This function's acceptance: ask a question with original-text evidence, check whether the citation array and markers can be traced back to the original paragraph, and record the array length and the `quoteMaxToken` budget; do not compare the two for equality; then ask a question with no matching materials, and confirm that the array is empty while the pipeline runs through.

Business test: ask a question missing key information, and see whether it first asks for follow-up before answering.

- Open the citation markers and check item by item whether the cited snippets correspond to the original paragraphs against the source documents.
- Run a test with a question that has no matching materials, and confirm that the citation array is empty while the output pipeline continues to run through.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
