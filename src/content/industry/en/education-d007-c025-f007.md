---
title: Conversation Records and Traceability for Graduate Education Process Management: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c025-f007
page_type: 行业问题页
application_area: education
meta_title: Graduate Education | Chat Records | Review
meta_description: Graduate Education: review chat records for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Graduate Education Process Management: Trace Exceptions and Review Results

## What this category's data looks like

Graduate training process management involves three core types of materials: training plans, thesis proposals, and mid-term assessment forms. They are submitted level by level by supervisors, schools, and graduate schools, and their update cadence advances by semester and key milestones. Training plans carry course and credit fields, thesis proposals carry topic selection, dates, and review signatures, and mid-term assessment forms carry progress, number of achievements, and assessment conclusions. When these three types of materials enter the conversation logs and auditing feature, each plays an evidentiary role: training plans are used to compare course names and credit counts, thesis proposals are used to verify topic selection dates and signature receipts, and mid-term assessment forms are used to verify the number of achievements and assessment conclusion dates. Field characteristics are concentrated in four categories: names, quantities, dates, and signatures. The same record is prone to differences in name spelling, inconsistent quantity definitions, contradictory date order, missing signatures, or unsynchronized receipts across different materials. During auditing, the three types of materials need to be aligned field by field to form a traceable exception list.

## Configuration and implementation checks

The conversation records interface (by application and session dimension) outputs only the session message list and the total record count, including role and citation information. The exception list and review conclusions must be handled afterward by humans or an external system. This interface pulls pages by application and session dimension, and the returned results distinguish between the two role types, question and answer, and include citation and elapsed-time fields.

| Object | Check | Verification action |
| --- | --- | --- |
| Training plan | Whether the course name, credit count, study date, and supervisor signature are consistent with the thesis proposal and mid-term assessment form | Pull records by application and session dimension, check `chatId` and `dataId`, and compare the name and quantity of the same course in the two materials |
| Thesis proposal | Whether the topic name, proposal date, review signature, and receipt match the training plan and mid-term assessment form | Page through to retrieve all records, view the citation and elapsed-time fields in `value`, and check whether the proposal date and signature are missing |
| Mid-term assessment form | Whether the number of achievements, assessment conclusion, assessment date, and responsible person's signature are synchronized with the thesis proposal and training plan | Check the total record count total and response `code` of 200, compare the number of achievements and assessment conclusion date one by one, and confirm where the version is not synchronized |
| Conversation records interface output | Whether the session message list and total record count cover all exception clues, and whether the role and citation information are complete | Pull two pages in a row and compare the total and offset, and sample one record to check the role, citation information, and time |

## Three common errors

- Symptom: The name and credit count of the same course do not match between the training plan and the mid-term assessment form. Cause: The two materials are entered separately, without field alignment and version synchronization, resulting in inconsistent name spelling and quantity definitions.
- Symptom: The thesis proposal date is later than the mid-term assessment form date, and the signature field is blank. Cause: The material submission order is reversed, and signatures and receipts are not updated with the version, creating date contradictions and missing signatures.
- Symptom: The interface returns empty but there are sessions in the UI, or only the first page is retrieved. Cause: The sources of the application and session identifiers are inconsistent, and the pagination parameters are not pulled continuously, causing the total record count and offset to mismatch.

## How to verify the setup

Feature acceptance: page through by total record count total to retrieve all records, sample one record to check the role, citation information, and time, and confirm response `code` of 200 and complete list fields.

Business testing: create one exception record, see whether it can be traced back to the source material, and check the names, quantities, dates, and signatures of the training plan, thesis proposal, and mid-term assessment form.

- In the request parameters, check the source of the application and session identifiers, confirm they are consistent with the actual application and actual session, and pull two pages in a row to compare the total and offset.
- Open one record to check the citation and elapsed-time fields, confirm that the number of citations is the array length, and that the tokens of the citation text are recorded separately and are not compared for equality with the number of array items.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
