---
title: Citations and Source Traceability for Self-Study Exam Records and Graduation Review: Track Progress and Check Statistics
slug: /en/industry/education-d006-c054-f010
page_type: 行业问题页
application_area: education
meta_title: Self-Study Exams | Citations | Progress
meta_description: Self-Study Exams: review citations for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Self-Study Exam Records and Graduation Review: Track Progress and Check Statistics

## What this category's data looks like

The materials for self-taught examination registration and graduation review mainly consist of three types: registration archives, course qualification certificates, and graduation application forms. The fields cover name, ID number, course code, course name, qualification date, score, signature, and receipt date. Registration archives carry the basic identity and enrollment status, course qualification certificates carry the evidence of passing individual subjects, and graduation application forms carry the graduation application and review conclusion. When these three types of materials enter this function, each serves as a retrievable original source and does not substitute for one another: registration archives are used to verify identity and enrollment, course qualification certificates are used to verify the number of courses and qualification dates, and graduation application forms are used to verify the application batch and signature receipt. Source identifiers point to specific documents and paragraphs, and the update cadence rolls by batch. When a new batch of materials replaces the old batch, version markers must be synchronized to avoid mismatches in names, quantities, and dates for the same record across two materials.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original text snippet and a source identifier, and the length may be 0. The progress table and statistical scope description are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Registration archives | Whether the name, ID number, enrollment status, and signature are consistent with the course qualification certificates and graduation application forms | Open the citation marker to trace back to the original paragraph, and compare the names and dates across the three materials field by field |
| Course qualification certificates | Whether the course code, course name, qualification date, score, and receipt match the records in the registration archives | Check the qualification certificate date against the registration date in the registration archives, and inspect for missing signatures or receipts |
| Graduation application forms | Whether the application batch, review conclusion, signature, and receipt date are consistent with the total of the course qualification certificates | Compare the summary in the application form against the number of qualification certificates, and record items whose versions are not synchronized |
| Cited content output | The number of returned entries matches the matched materials; an empty result is also normal | Run a test with a question that matches no materials, and see whether the array is empty while the pipeline continues |

## Three common errors

- Symptom: the name or quantity of the same course does not match across two materials. Cause: different entry batches, without unifying the scope by course code.
- Symptom: the qualification date is inconsistent between the qualification certificate and the registration archives. Cause: versions are not synchronized, and the old batch of materials has not been replaced.
- Symptom: the graduation application form lacks a signature or receipt. Cause: the material circulation step has not been completed, and the review conclusion cannot be traced back.

## How to verify the setup

This function's acceptance: ask a question with an original-text basis, check whether the citation array and markers can trace back to the original text, and confirm that the cited snippets in `quoteList` within `responseData` (non-streaming module results returned with detailed output enabled) are consistent with the source documents; then ask a question that matches no materials, and confirm that the array is empty while the pipeline runs through.

Business test: use one week of records to verify the totals, see whether the scope and exceptions are clearly stated, record the number of citations separately by array length, and treat `quoteMaxToken` only as the citation content budget; do not compare the two for equality.

- Open the search parameter panel and check item by item, confirm that the associated knowledge base uses the same vector model, and record the number of citations and the value of `quoteMaxToken`.
- Open the citation markers in the conversation, verify against the source documents whether each citation can trace back to the original paragraph, and check items missing signatures or receipts.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
