---
title: Conversation Records and Traceability for Self-Study Exam Records and Graduation Review: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c054-f007
page_type: 行业问题页
application_area: education
meta_title: Self-Study Exams | Chat Records | Versions
meta_description: Self-Study Exams: review chat records for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Self-Study Exam Records and Graduation Review: Maintain Document Versions and Changes

## What this category's data looks like

This category involves three types of materials: registration records, course qualification certificates, and graduation application forms. Registration records contain the candidate's basic information, examination registration number, major name, ID document number, scores for each subject, and the date obtained; course qualification certificates contain the course code, course name, qualification date, and the seal of the examining institution; graduation application forms contain the name, major, number of courses, graduation conclusion, and the reviewer's signature and date. The sources of the materials are exports from the provincial examination office system, receipts from the examining institution, and scans of originals submitted by candidates. The update cadence rolls forward according to examination periods and graduation batches; individual subject qualification certificates are updated as scores are released, and graduation application forms are updated as review conclusions are made. Field characteristics are concentrated in four categories: names, quantities, dates, and signatures. When the three types of materials enter the conversation record function, each has a different role: registration records serve as the verification baseline, course qualification certificates serve as the basis for item-by-item comparison, and graduation application forms serve as the carrier of conclusions; all are retained as traces in the form of conversation messages for subsequent registration and review.

## Configuration and implementation checks

This step is performed by the conversation record interface (by application and session dimension), which outputs a list of conversation messages and the total number of records, including roles and reference information. The version ledger and change records are then completed manually or by an external system. The interface only retrieves conversation evidence and does not write to the business ledger.

| Object | Check | Verification action |
| --- | --- | --- |
| Registration records | Name, examination registration number, major name, and ID document number are consistent item by item with the course qualification certificates and graduation application form; dates and signatures are complete | Locate the candidate's record in the conversation message list, check the role field and reference information, and compare the names, quantities, and dates of the three materials |
| Course qualification certificates | Course code, course name, and qualification date are consistent with the score records in the registration records; the examining institution's seal and receipt are complete | Pull the conversation records by `chatId`, use `dataId` to locate a single message, and check the reference text and signature receipt |
| Graduation application form | Name, major, number of courses, and graduation conclusion are consistent with the summary of the registration records and course qualification certificates; the reviewer's signature and date are complete | Page through to retrieve all records, check the reference content in the `value` field, and confirm that the number of courses matches the number of qualification certificates |
| Conversation records | The total number of records matches the pagination offset, message roles correspond to the original conversation, and a single record contains references and elapsed time | Pull two pages in succession to compare the total number of records and the offset, and open one record to check the role, reference information, and time |

## Three common errors

- Symptom: The same candidate's name is written differently in the registration records and the graduation application form. Cause: At data entry, it was not unified according to the ID document; the two materials are maintained separately, and there is no cross-material comparison step.
- Symptom: The date on the course qualification certificate does not match the score date in the registration records. Cause: Score release and qualification certificate printing belong to different batches, versions were not synchronized, and the old version was not marked as invalid.
- Symptom: The graduation application form lacks the reviewer's signature or receipt. Cause: The review process was not closed-loop; signatures and receipts were not included as traces in the conversation records, making it impossible to trace during review.

## How to verify the setup

This function's acceptance: page through by the total number of records to retrieve all, and sample one record to check the role, reference information, and time; confirm that response `code` of 200 matches the total number of records total, and record the number of references separately by array length.

Business test: change one piece of content and see whether the version number and references are updated synchronously

- In the request parameters, check the source of the application and session identifiers, confirm that they are consistent with the actual application and actual session, and use `chatId` to locate the session.
- Pull two pages in succession to compare the total number of records and the offset, and confirm that the number of records matches; open a single record to check the role, reference, and elapsed time fields.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
