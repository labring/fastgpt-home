---
title: Citations and Source Traceability for Professional Qualification Exam Applications: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c036-f010
page_type: 行业问题页
application_area: education
meta_title: Professional Exams | Citations | Intake
meta_description: Professional Exams: review citations for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Professional Qualification Exam Applications: Handle Questions and Collect Missing Information

## What this category's data looks like

For professional and technical personnel qualification examination registration review, the materials are mainly the registration form, education certificate, and work experience certificate; the sources are the applicant's uploads and the handler's receipt, and the update cadence rolls forward as batches progress. The registration form carries the name, ID number, examination specialty, work unit, and signature field; the education certificate carries the school name, specialty, graduation date, and certificate number; the work experience certificate carries the start and end dates, position title, unit seal, and handler signature. When these three types of materials enter the citation output of the knowledge base retrieval node, each serves as a retrievable original-text passage; the citation array gives the original-text snippets and source identifiers according to hits, and the chain still runs through when it is empty. The field characteristics are concentrated in five categories: names, quantities, dates, signatures, and receipts. If the same record does not match across two materials, versions are not synchronized, or a signature or receipt is missing, missing-item follow-up becomes a necessary step.

## Configuration and implementation checks

This link is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original-text snippet and a source identifier, and the length may be 0. The "intake record and items to be completed" is then handled by subsequent AI nodes, code nodes, or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| Registration form | Check the name, ID number, examination specialty, work unit, and signature field; dates and quantities must be aligned item by item with the education certificate and work experience certificate | In the node, view the citation array, open the citation marker to trace back to the original-text passage of the registration form, and record the number of citations in `responseData` (non-streaming module results returned with detailed output enabled) |
| Education certificate | Check the school name, specialty, graduation date, and certificate number; when the name and date of the same record do not match across the two materials, list it as a missing item | Compare each cited snippet against the source document, confirm that the citation corresponds to the original text, and view the original-text snippet and source identifier in `quoteList` |
| Work experience certificate | Check the start and end dates, position title, unit seal, and handler signature; when a signature or receipt is missing, enter follow-up | Run a trial with a question that has no matching materials, see that the citation array is empty while the chain continues, and record the array count separately |
| Search parameters | Be consistent with the values set in the knowledge base retrieval section; `quoteMaxToken` is the citation content budget, check the tokens of the cited text, and do not compare array counts for equality | Open the search parameters panel and check item by item, confirming that the associated knowledge base uses the same vector model |

## Three common errors

- Symptom: there is no citation marker in the answer. Cause: the citation array is not displayed with the answer, or the matched material does not trace back to the original-text passage; first check whether there was a hit in this round and which material was hit.
- Symptom: the name and date of the same record do not match between the registration form and the education certificate. Cause: the versions of the two materials are not synchronized, or the fields were not compared item by item at upload, and the missing item was not identified and followed up.
- Symptom: the work experience certificate lacks a signature or receipt. Cause: the material circulation step did not collect everything, the intake record and items to be completed were not generated, and the handler cannot transfer it accordingly.

## How to verify the setup

This feature's acceptance: ask a question with original-text support, check whether the citation array and citation markers can trace back to the original text, and confirm that each citation can trace back to the source document; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through.

Business test: submit a question missing key information, see whether it follows up before answering, and whether the intake record and items to be completed are completed by subsequent nodes or humans.

- In the conversation, open the citation markers, compare each cited snippet against the source document to confirm it corresponds to the original text, and record the citation count and the `quoteMaxToken` budget values separately.
- Run a trial with a question that has no matching materials, confirm that the citation array is empty while the output chain continues, and then check the search parameters and the vector model of the associated knowledge base item by item.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
