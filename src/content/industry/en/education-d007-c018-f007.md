---
title: Conversation Records and Traceability for Undergraduate Curriculum Planning: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c018-f007
page_type: 行业问题页
application_area: education
meta_title: Program Revision | Chat Records | Review
meta_description: Program Revision: review chat records for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Undergraduate Curriculum Planning: Trace Exceptions and Review Results

## What this category's data looks like

Undergraduate program revision involves three types of materials: program plans, course syllabi, and credit structure tables. Fields include course name, credit count, course start date, and signature field. The program plan provides the overall framework and revision version; the course syllabus carries the objectives and assessment methods of a single course; the credit structure table summarizes the credits of each module and the total credits. The materials come from academic affairs system exports and department submissions. The update cadence usually advances by academic year or revision batch, and multiple versions commonly run in parallel. When entering the conversation logs and audit function, each of the three types of materials serves as a basis for review: the program plan is used to check course names and total credits, the course syllabus is used to check course start dates and signatures, and the credit structure table is used to check the number of modules and the total credits. The conversation record API pulls by application and session dimensions, providing raw session evidence for subsequent exception tracing.

## Configuration and implementation checks

This step is performed by the conversation record API (by application and session dimensions), outputting a list of session messages and the total record count, including role and reference information. The exception list and review conclusions are then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Program plan | Course names, total credits, revision date, and signature field must align item by item with the course syllabus and credit structure table | Pull records by application and session dimensions, verify that `chatId` matches the actual session, then paginate to retrieve all records |
| Course syllabus | Course start date, course name, and signature receipt must be consistent with the program plan and credit structure table | Open a single record to verify the role field and reference information, and confirm that `dataId` corresponds to a specific message |
| Credit structure table | Module credit counts and totals must match the program plan and course syllabus | Pull two consecutive pages and compare the total record count total and offset, confirming response `code` of 200 and no missing pages |
| Conversation record API | Pagination parameters, role field, reference, and duration fields must be complete and queryable | Verify the reference and duration in `value`, record the number of references as the array length, and do not compare it for equality with its budget |

## Three common errors

- Symptom: The name and credit count of the same course do not match between the program plan and the course syllabus. Cause: The two materials were revised separately, and no field-level cross-check was performed.
- Symptom: The credit structure table has been updated, but the course syllabus is still the old version, and dates and signatures are missing. Cause: Versions were not synchronized, and receipts were not collected with the revision batch.
- Symptom: The API returns empty but there are sessions in the interface, and exported records lack references. Cause: Pagination only retrieved the first page, or records were not fully retrieved by application and session dimensions.

## How to verify the setup

Acceptance for this function: paginate through all records based on the total record count, sample one record to verify role, reference information, and time, and confirm that response `code` of 200 is consistent with the total record count total.

Business test: create an exception record, see whether it can be traced back to the source material, and verify the names, counts, dates, and signatures in the program plan, course syllabus, and credit structure table.

- Verify that the application and session identifiers match the actual application and actual session, and confirm that the source of `chatId` is correct.
- Pull two consecutive pages and compare the total record count and offset, confirming that role fields alternate and that reference and duration fields can be opened.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
