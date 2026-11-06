---
title: Citations and Source Traceability for College Admissions Health Examination Organization: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c053-f010
page_type: 行业问题页
application_area: education
meta_title: Admissions Health Exams | Citations | Review
meta_description: Admissions Health Exams: review citations for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for College Admissions Health Examination Organization: Trace Exceptions and Review Results

## What this category's data looks like

This page addresses the scenario of exception tracing and manual review in university admissions physical examination organization. The materials include three types: physical examination forms, re-examination applications, and restricted-major notifications. The physical examination form records the candidate's basic information, examination results for each subject, and the signature and date of the chief examining physician, and serves as the original basis for determining exceptions; the re-examination application carries the re-examination items, reason for application, applicant's signature, and receipt, and is used to confirm whether an exception has entered the re-examination process; the restricted-major notification records the restricted conclusion, notification date, and the candidate's or parent's signature receipt, and is used to verify whether the notification was delivered. The three types of materials enter in a centralized manner by admissions batch. Physical examination forms arrive first, while re-examination applications and restricted-major notifications are supplemented at review checkpoints, with an update rhythm based on the batch cycle. Field characteristics are concentrated in name, candidate number, item name, quantity, date, and signature fields. The same record should remain consistent across the three materials, and after entering this function, each serves as a citation source participating in retrieval and comparison.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each containing an original text fragment and a source identifier, and the length may be 0. The "exception list and review conclusion" is completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Physical examination form | Whether the name, candidate number, item name, quantity, date, and chief examiner signature are consistent with the re-examination application | Open the citation marker to point back to the original paragraph in the physical examination form, and verify the fields and signature item by item |
| Re-examination application | Whether the re-examination items, reason for application, application date, and receipt signature are complete | Verify the cited fragment against the original application text, and confirm that the receipt and signature fields are not missing |
| Restricted-major notification | Whether the restricted conclusion, notification date, and candidate or parent signature receipt correspond to the conclusion in the physical examination form | Compare the original notification text with the conclusion in the physical examination form, and check whether the date and signature are synchronized |
| Knowledge base retrieval node | The associated knowledge base uses the same vector model, the citation content is output as an array, and the length may be 0 | Check the number of citation array entries in `responseData` (non-streaming module results returned with detailed output enabled), record the entry count and the `quoteMaxToken` budget separately, and verify the `quoteList` source identifier |

## Three common errors

- Symptom: The same candidate's name or item quantity does not match between the physical examination form and the re-examination application. Cause: The two materials were entered at different times, and unified fields were not backfilled by candidate number.
- Symptom: The date of the restricted-major notification is inconsistent with the conclusion date in the physical examination form. Cause: The notification version was not synchronized, and the old notification version remains in the knowledge base and is hit by retrieval.
- Symptom: The re-examination application lacks a receipt or has an empty signature field, but the cited fragment appears complete. Cause: The scanned copy is missing pages, and the citation only captures the body paragraph and does not cover the signature area.

## How to verify the setup

This function's acceptance: ask a question with an original-text basis, and check whether the citation array and citation markers can point back to the original text; then ask a question with no matching materials, confirm that the array is empty while the pipeline runs through, and check `quoteList` within `responseData`.

Business test: create an exception record, see whether the source material can be traced, and confirm that the exception is supported by original records and the reviewer's signature.

- Open the citation markers, compare each citation against the source document to check whether it can point back to the original paragraph, record the number of array entries, and verify the `quoteMaxToken` budget separately.
- Run a trial with a question that has no matching materials, observe that the output is empty while the pipeline continues, and confirm that an empty array is a normal output.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
