---
title: Conversation Records and Traceability for International Student Admissions and Enrollment Records: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c049-f007
page_type: 行业问题页
application_area: education
meta_title: International Students | Chat Records | Review
meta_description: International Students: review chat records for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for International Student Admissions and Enrollment Records: Trace Exceptions and Review Results

## What this category's data looks like

International student admissions and enrollment management involves three types of materials: admission brochures, admission letters, and visa application forms, which respectively carry the program name and program duration, the admission decision and registration date, and the visa type and signature receipt. The materials are updated according to admission batches and enrollment registration milestones, and the fields include name, passport number, program, quantity, date, and signature field. After entering the conversation logs and audit feature, admission brochures are used to compare program and program duration definitions, admission letters are used to verify admission dates and signatures, and visa application forms are used to verify visa types and receipt completeness. The three types of materials serve as cross-references for each other in exception tracing; the name, quantity, and date of the same record must be aligned across materials, and the version and signature status must be confirmed one by one.

## Configuration and implementation checks

The conversation record interface (by application and session dimension) outputs only the session message list and the total record count, including role and reference information; the exception list and review conclusions must be handled afterward by humans or an external system. The interface pulls pages by application and session identifier, and the returned results distinguish between the two role types, question and answer, and include reference and duration fields.

| Object | Check | Verification action |
| --- | --- | --- |
| Admission brochure | The program name, program duration, and admission batch fields must be consistent with the admission letter, and the date and signature fields must be complete | Check the source of the application and session identifiers in the request parameters, compare the total record count and offset by paging, and sample one record to inspect the role and reference fields |
| Admission letter | The admission date, registration date, and signature field must correspond to the visa application form receipt, and the quantity and name must have no conflicts | Page through to retrieve all records by total record count, check the alternating order of questions and answers in the list, and open one record to verify the reference and duration |
| Visa application form | The visa type, receipt, and signature must be consistent with the admission letter date, and differences must be marked when the version is not synchronized | Pull two pages consecutively to compare the total count and offset, check whether the returned list is empty while the interface shows a session, and verify the number of references and the duration field |
| Conversation record | The total record count is the number of message records, the role field distinguishes questions from answers, and the reference and duration fields are traceable | Use `chatId` to locate the session, use `dataId` to locate a single record, and use `value` to view references and duration |

## Three common errors

- Symptom: The program name for the same student does not match between the admission brochure and the admission letter. Cause: The material versions are not synchronized, and the admission letter was not written back after the brochure was updated.
- Symptom: The visa application form lacks a signature or receipt, and is inconsistent with the admission letter date. Cause: Manual review did not check the signature field and date field one by one.
- Symptom: The interface returns empty but there is a session in the interface, and the exported records lack references. Cause: Paging only retrieved the first page, and did not page through to retrieve all records by total record count.

## How to verify the setup

This feature acceptance: page through to retrieve all records by total record count, sample one record to verify the role, reference information, and time, the status code is 200, and the total record count is total.

Business test: create an exception record, see whether the source material can be traced, and verify the name, quantity, date, and signature of the admission brochure, admission letter, and visa application form.

- Use `chatId` and `dataId` to locate records, use `value` to view references and duration, and compare the total record count and offset by paging.
- Verify the name, quantity, date, and signature of the admission brochure, admission letter, and visa application form one by one, and mark items with unsynchronized versions and missing signatures.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
