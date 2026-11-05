---
title: Citations and Source Traceability for Foreign Teacher Recruitment and Course Scheduling: Track Progress and Check Statistics
slug: /en/industry/education-d006-c050-f010
page_type: 行业问题页
application_area: education
meta_title: Foreign Teachers | Citations | Progress
meta_description: Foreign Teachers: review citations for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Foreign Teacher Recruitment and Course Scheduling: Track Progress and Check Statistics

## What this category's data looks like

Foreign teacher appointment and course scheduling involves three types of materials: appointment contracts, work permit materials, and course schedules. Fields include teacher name, passport number, contract term, position, number of class hours, teaching class, effective date, and signature field. When the materials enter the citation output of the knowledge base retrieval node, each plays a different role: the appointment contract provides the original text of the position and term, the work permit materials provide the original text of the permit number and validity period, and the course schedule provides the original text of the class, week number, and class hours. The update rhythm is collected weekly, with new signings, renewals, course adjustments, and supplementary signings each leaving a trace. Progress records and statistical verification require that the recorded numbers match the statistical numbers, with the criteria written into the table header. The cited content is output as an array, each entry containing an original text fragment and a source identifier, and the length can be 0.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original text fragment and a source identifier, and the length can be 0. The "Progress Table and Statistical Criteria Description" is then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Appointment contract | Whether the contract term, position, number of class hours, and signature field correspond item by item with the course schedule | Open the citation marker to trace back to the original contract text, verify the effective date and signature field, and record the array length and the `quoteMaxToken` budget |
| Work permit materials | Whether the permit number and validity period are consistent with the appointment contract dates, and whether the receipts are complete | Trace back to the original permit text to verify the number and validity period, compare with the contract dates, and check the citation source identifier in `responseData` (non-streaming module results returned with detailed output enabled) |
| Course schedule | Whether the class, week number, and number of class hours are consistent with the contract criteria, and whether the versions are synchronized | Trace back to the original course schedule text, verify the week number and total class hours, and check the source paragraphs in `quoteList` |
| Citation content output | Whether the number of returned entries matches the hit materials; being empty is also normal | Run a trial with a question that has no matching materials, and see whether the array is empty while the pipeline continues |

## Three common errors

- Symptom: The same teacher's name spelling or number of class hours does not match between the contract and the course schedule. Cause: The two materials were entered separately, and the fields and dates were not verified against a unified standard.
- Symptom: The version of the work permit materials is not synchronized, and the old permit number is still cited. Cause: The update rhythm was not collected weekly, and new signing and renewal materials were not replaced in time.
- Symptom: The appointment contract lacks a signature or receipt, and the course schedule lacks confirmation. Cause: The signature field and receipt were not included in the material completeness check, and the original text was not traced back during citation.

## How to verify the setup

Acceptance of this feature: Ask a question with original text evidence, and verify whether the citation array and markers can trace back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the pipeline runs through.

Business test: Use one week of records to verify the totals, and see whether the criteria and exceptions are clearly written.

- Open the citation markers one by one, verify the original text fragments and source identifiers against the source documents, record the number of citations, i.e., the array length, and separately record the `quoteMaxToken` budget.
- Verify whether the selected knowledge bases use the same vector model, check the source paragraphs in `quoteList` within `responseData`, and confirm that the citations correspond to the original text.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
