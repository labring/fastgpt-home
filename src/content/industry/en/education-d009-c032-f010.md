---
title: Citations and Source Traceability for Technical College Program Management: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c032-f010
page_type: 行业问题页
application_area: education
meta_title: Technical Colleges | Citations | Multilingual
meta_description: Technical Colleges: review citations for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Technical College Program Management: Handle Multilingual Materials and Terminology

## What this category's data looks like

This category's data covers three types of materials: student registration forms, teaching plans, and skills training records. Fields include student name, major name, course name, training item, quantity, date, and signature. During multilingual materials and terminology processing, student registration forms provide identity and registration status, teaching plans provide courses and week numbers, and skills training records provide training items and assessment results. Together, the three support a unified terminology glossary and a comparison draft. The material update rhythm is registration at the start of each semester, plan adjustments during the semester, and training archiving at the end of the semester. Versions are prone to mismatches in names, quantities, and dates for the same record across two materials, or missing signatures and receipts. When materials enter the knowledge base retrieval node, each is cited as an independent source. Each entry in the citation array contains the original text snippet and source identifier, used for subsequent field comparison, ledger writing, and report generation.

## Configuration and implementation checks

| Object | Check | Verification action |
| --- | --- | --- |
| Student Registration Form | Student name, major name, registration date, and signature are written consistently across the three documents and can be traced back to the source text | Check the name, major, and date fields one by one in the citation array, open the citation markers to compare with the source documents, and record the number of citations in `responseData` (non-streaming module results returned with detailed output enabled) |
| Teaching Plan | Course name, week number, and credit hours are consistent across materials with the teaching plan version number, and no version is out of sync | Check the name and quantity of the same course in the two documents, verify the version number and date, and confirm that the cited excerpts correspond to the original paragraphs |
| Skills Training Record | Training items, assessment results, signatures, and receipts are complete, and the name, quantity, and date of the same record match across the two documents | Sample three terms to check whether their wording is consistent throughout the document, verify the signature and receipt fields, and inspect the citation source identifiers in `quoteList` |
| Unified Terminology List and Comparison Draft | The same term is consistent throughout the document, the translated name can be traced back to the source text, and the citation array is not a discrepancy list | Use the method of sampling three terms to check the wording throughout the document, confirm that the number of citations matches the hit materials, and ensure the pipeline works even with an empty array |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the student registration form and the teaching plan. Cause: The two materials are updated separately, without cross-material field comparison and version synchronization.
- Symptom: The skills training record lacks a signature or receipt, and the citation snippet does not match the original text. Cause: The signature was not completed when the material was archived, and the citation source identifier does not trace back to the original paragraph.
- Symptom: There is no citation marker in the answer, and the citation array is empty. Cause: No materials were hit in this round. An empty array is normal output and does not mean retrieval failed. You need to check hits first, then check trimming.

## How to verify the setup

This feature's acceptance: ask a terminology question with original text support, check whether the citation array and markers can trace back to the original text, and record the number of citations in `responseData` and the `quoteMaxToken` budget values separately; then ask a question with no matching materials, and confirm that the array is empty while the chain goes through.

Business test: sample three terms to check whether the writing is consistent throughout, and check the fields, dates, and signatures of the student registration form, teaching plan, and skills training record.

- Open the citation marker, compare the citation snippet with the original paragraph one by one against the source document, record the number of citations and the `quoteMaxToken` value, and do not compare the two for equality.
- Run a test with a question that has no matching materials, observe that the output is empty while the chain continues, and confirm that an empty array is normal output.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
