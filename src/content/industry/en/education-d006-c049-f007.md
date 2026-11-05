---
title: Conversation Records and Traceability for International Student Admissions and Enrollment Records: Track Progress and Check Statistics
slug: /en/industry/education-d006-c049-f007
page_type: 行业问题页
application_area: education
meta_title: International Students | Chat Records | Progress
meta_description: International Students: review chat records for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for International Student Admissions and Enrollment Records: Track Progress and Check Statistics

## What this category's data looks like

International student admissions and enrollment management involves three types of materials: admission brochures, admission letters, and visa application forms. The sources are the admissions office, academic departments, and visa affairs positions, and the update cadence rolls with batches and visa cycles. Admission brochures contain the program name, application requirements, deadline, and signature/seal fields; admission letters contain the admission number, name, program, registration date, and signature; visa application forms contain the passport number, name, study period, and receipt. When these three types of materials enter the conversation logs and audit function, they serve respectively as the basis for admissions criteria, proof of admission results, and proof of visa progress, each taking on a different field verification role.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), outputting a session message list and total record count, including role and citation information. The "progress table and statistical criteria description" is then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Admission brochure | Program name, application deadline, and signature/seal fields match the corresponding fields in the admission letter | Take one copy each of the brochure and the admission letter, compare the name, date, and signature field by field, and record discrepancies |
| Admission letter | Admission number, name, and registration date can be matched in the visa application form receipt | Page through all records by admission number, and check whether `chatId` and `dataId` point to the same session |
| Visa application form | Passport number, study period, and receipt signature do not conflict with the admission letter date | Open a single record, check the citation information and elapsed-time fields, and confirm that the number of citations and text tokens in `value` are recorded separately |
| Conversation record interface output | The total record count total equals the cumulative count page by page, and the status code is 200 | Pull two pages in succession to compare the offset and total, and sample one record to check the role, citation information, and time |

## Three common errors

- Symptom: The program name and registration date for the same student do not match between the brochure and the admission letter. Cause: Versions were not synchronized, and the old brochure fields were not updated with the admission batch.
- Symptom: The visa application form receipt lacks a signature, or the receipt date is inconsistent with the admission letter date. Cause: The signed document was not collected during material circulation, and the date is based on manual entry.
- Symptom: The interface returns empty but there are sessions in the UI, or only the first page is retrieved. Cause: Pagination parameters were not pulled continuously by session dimension, and the total record count was mistaken for the number of sessions.

## How to verify the setup

This feature's acceptance: page through all records by total record count, sample one record to check the role, citation information, and time, and confirm the status code is 200 and that `_id`, `dataId` and `value` are queryable.

Business test: use one week of records to verify the totals, and see whether the criteria and exceptions are clearly stated.

- Pull page by page by application and session dimension, compare the cumulative count with the total record count total, and write discrepancies into the header of the criteria description table.
- Sample one record, open the citation and elapsed-time fields, check that the number of citations is the array length, and that the citation text tokens are recorded separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
