---
title: Citations and Source Traceability for Foreign Teacher Recruitment and Course Scheduling: Find Supporting Evidence
slug: /en/industry/education-d001-c050-f010
page_type: 行业问题页
application_area: education
meta_title: Foreign Teachers | Citations | Evidence
meta_description: Foreign Teachers: review citations for evidence lookup. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Foreign Teacher Recruitment and Course Scheduling: Find Supporting Evidence

## What this category's data looks like

Foreign teacher appointment and course scheduling materials usually include three types: appointment contracts, work permit materials, and course schedules, all of which are the institution's own texts. The appointment contract states the position, appointment period, teaching hours, and signature page; the work permit materials contain the permit number, validity period, unit name, and receipt; the course schedule lists the week number, class, teacher, and number of teaching hours. When these three types of materials enter the knowledge base retrieval node, each plays a different role: the contract and permit materials are used to answer the appointment basis, and the course schedule is used to answer the scheduling basis, all cited as original text fragments. The update rhythm changes with the semester and appointment period, and common fields include name, date, quantity, and signature.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original text fragment and a source identifier, and the length can be 0. The basis entries that can be traced back to the original text are completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Appointment contract | The fields include position, appointment period, teaching hours, and signature page; the date and quantity must be consistent with the work permit materials | Open the contract scan, check the signature and date fields, and compare them with the unit name and validity period in the work permit materials |
| Work permit materials | The permit number, validity period, unit name, and receipt are complete, and the version is current | Check the permit number and validity period, inspect the receipt and signature, and confirm that they are consistent with the teacher's name in the course schedule |
| Course schedule | The week number, class, teacher, and number of teaching hours match, and the version is synchronized with the contract appointment period | Verify the teacher and number of teaching hours week by week, compare with the contract appointment period, and check the signature or receipt at the end of the table |
| Citation content output | The number of returned entries is consistent with the matched materials; being empty is also normal | Run a test with a question that has no matching materials, see that the output is empty while the chain continues, record the number of array entries, and separately record the `quoteMaxToken` budget |

## Three common errors

- Symptom: The same teacher's name spelling or number of teaching hours does not match between the contract and the course schedule. Cause: The two materials were entered separately, and the fields were not cross-checked.
- Symptom: The work permit materials are still an old version, and the validity period is inconsistent with the current appointment period. Cause: The version was not synchronized, and the new permit did not replace the old scan.
- Symptom: The course schedule lacks a signature or receipt, and the cited fragment does not match the original text. Cause: A signature was missed when the materials were archived, or the citation matched another document with the same name.

## How to verify the setup

This feature acceptance: ask a question with an original text basis, check whether the citation array and superscript can trace back to the original text, and view the source identifier in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList`; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through.

Business test: ask a basis question across materials, see whether the answer gives a traceable source, and record the number of citations separately by array length, without comparing it for equality with `quoteMaxToken`.

- Turn on the citation superscript, compare each citation against the source document to check whether it can trace back to the original text paragraph, and record the number of array entries
- Check that the values in the search parameter panel are consistent with the knowledge base retrieval section, and confirm that the selected knowledge base uses the same vector model

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
