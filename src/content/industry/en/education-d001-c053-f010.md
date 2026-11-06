---
title: Citations and Source Traceability for College Admissions Health Examination Organization: Find Supporting Evidence
slug: /en/industry/education-d001-c053-f010
page_type: 行业问题页
application_area: education
meta_title: Admissions Health Exams | Citations | Evidence
meta_description: Admissions Health Exams: review citations for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for College Admissions Health Examination Organization: Find Supporting Evidence

## What this category's data looks like

This category's data covers three types of materials involved in the organization of college admissions physical examinations: physical examination forms, re-examination applications, and restricted-major notifications. They respectively record the candidate's physical indicators and conclusions, re-examination requests and approvals, and the scope of restricted majors and notification receipts. The materials are updated by admissions batch or year, and the fields include name, ID number, examination items, conclusion, date, signature, and receipt. When entering the knowledge base retrieval node, the physical examination form serves as the main record, the re-examination application serves as process material, and the restricted-major notification serves as the notification evidence; each is indexed as an independent document or segment. The name, quantity, and date for the same candidate may not match across different materials. When versions are not synchronized or signatures are missing, the correspondence between cited snippets and the original text must be checked one by one by tracing back to the source.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original snippet and source identifier, and the length may be 0. The "basis items that can be traced back to the original text" are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Physical examination form | Whether the name, ID number, examination items, conclusion, date, and signature are complete, and whether the name and quantity of the same record match across the two materials | Open the citation marker and compare field by field against the source document; check whether the cited snippet in `responseData` (non-streaming module results returned with detailed output enabled) is consistent with the original paragraph |
| Re-examination application | Whether the application reason, original examination conclusion, application date, approval signature or receipt are complete, and whether the version is synchronized with the current physical examination form | Open the citation marker in the conversation and trace back to the original text of the re-examination application; check the document version pointed to by the source identifier in `quoteList` |
| Restricted-major notification | Whether the restricted major name, quantity, notification date, candidate signature or receipt correspond to the physical examination conclusion, and whether the date of the same record matches across the two materials | Run a cross-material question and check whether the number of items in the citation array matches the hit materials; check that `quoteMaxToken` only constrains the citation text budget, while the number of array items is recorded separately |
| Knowledge base collection | Whether the selected knowledge base uses the same vector model, and whether the search parameters are consistent with the values in the knowledge base retrieval section | Check the selected collection and vector model in the node; open the search parameter panel and verify each item |

## Three common errors

- Symptom: The name or item quantity of the same candidate does not match between the physical examination form and the re-examination application. Cause: The two materials are entered in different stages, and no field-level comparison is performed; the discrepancy is only exposed after the cited snippets are each traced back to the original text.
- Symptom: The date of the restricted-major notification is inconsistent with the date of the physical examination conclusion, and the versions are not synchronized. Cause: The notification material uses an old template, the knowledge base is not updated with the current version, and the citation still points to the old paragraph.
- Symptom: The re-examination application lacks a signature or receipt, but the answer gives seemingly complete evidence. Cause: The citation array only returns hit snippets and does not verify the signature field; manual tracing back to the original text is required to check completeness.

## How to verify the setup

Acceptance of this feature: ask a question with original-text evidence and check whether the citation array and markers can trace back to the original text; then ask a question with no matching material and confirm that the array is empty while the pipeline still runs.

Business test: ask a cross-material evidence question, see whether the answer provides traceable sources, and check whether the number of citations matches the hit materials.

- Open the citation marker, check the cited snippets against the original paragraphs in the source document one by one, record the number of array items, and do not compare the number of items with `quoteMaxToken` for equality.
- Run a test with a question that has no matching material, confirm that the citation array is empty while the output pipeline continues, and then check the source identifiers in `quoteList` within `responseData`.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
