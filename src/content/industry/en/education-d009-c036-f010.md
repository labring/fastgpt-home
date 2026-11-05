---
title: Citations and Source Traceability for Professional Qualification Exam Applications: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c036-f010
page_type: 行业问题页
application_area: education
meta_title: Professional Exams | Citations | Multilingual
meta_description: Professional Exams: review citations for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Professional Qualification Exam Applications: Handle Multilingual Materials and Terminology

## What this category's data looks like

In the scenario of registration review for professional and technical personnel vocational qualification examinations, materials are mainly of three types: registration forms, educational certificates, and work experience certificates, plus receipts and signature pages. The three types of materials have different field emphases: the registration form carries name, ID number, examination subjects, and date; the educational certificate carries institution, major, certificate number, and graduation date; the work experience certificate carries position, start and end dates, employer name, and signature. When handling multilingual materials and terminology, the translated name of the same term in the registration form and the educational certificate must be consistent, and must be able to point back to the original text paragraph. The material update rhythm changes with batches and supplementary submissions; if versions are not synchronized, the name, quantity, and date of the same record in two materials will not match. After these materials enter the knowledge base retrieval node, each participates as an independent source in citation output, providing traceable original text fragments for subsequent field comparison, ledger writing, and report generation.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text fragment and a source identifier, and the length can be 0. The "unified terminology table and comparison draft" is then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Registration form | Whether the fields, dates, and signature are consistent with the educational certificate and work experience certificate, and whether the name, quantity, and date of the same record match | Open the citation superscript and check the registration form fields against the source document; record the number of citations as the array length |
| Educational certificate | Whether the institution, major, certificate number, and graduation date are consistent with the registration form, and whether the translated name can point back to the original text | Check the cited fragments against the original text paragraphs one by one; view the cited content and source identifier in `responseData` (non-streaming module results returned with detailed output enabled) |
| Work experience certificate | Whether the position, start and end dates, employer name, and signature or receipt are complete, and whether the versions are synchronized | Check the signature and receipt pages; confirm that the cited fragments can point back to the original text of this material |
| Cited content output | The number of returned items is consistent with the matched materials; being empty is also normal | Run a test with a question that matches no materials, and see that the array is empty while the pipeline continues; `quoteMaxToken` is only the citation content budget |

## Three common errors

- Symptom: the name, quantity, and date of the same record in the registration form and the educational certificate do not match. Cause: the versions of the two materials are not synchronized, or the same terminology table was not used during entry.
- Symptom: the work experience certificate lacks a signature or receipt, and the cited fragments cannot point back to the complete original text. Cause: supplementary materials were not returned, or the scanned copy is missing the signature page.
- Symptom: there is no citation superscript in the answer, or there is an answer but the citation array is empty. Cause: no materials were matched in this round, or the matched materials did not enter the citation output pipeline.

## How to verify the setup

Acceptance of this feature: ask a question with original text evidence, and check whether the citation array and superscript can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the pipeline runs through.

Business test: sample three terms and check whether their usage is consistent throughout the whole document.

- In the node, check the selected knowledge base collections and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Open the search parameter panel and check item by item, confirming that the values are consistent with those set in the knowledge base retrieval section.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
