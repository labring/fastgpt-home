---
title: Conversation Records and Traceability for School Admissions and Enrollment Organization: Track Progress and Check Statistics
slug: /en/industry/education-d006-c008-f007
page_type: 行业问题页
application_area: education
meta_title: School Admissions | Chat Records | Progress
meta_description: School Admissions: review chat records for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for School Admissions and Enrollment Organization: Track Progress and Check Statistics

## What this category's data looks like

This page is intended for primary and secondary school enrollment organizations. The materials come from three categories: enrollment plans, application material lists, and admission lists. The enrollment plan contains batches, dates, and approval signatures; the application material list contains student names, ID numbers, quantities, and receipts; the admission list contains admission batches, names, dates, and signatures. The materials are updated weekly or monthly, and the fields are characterized by names, quantities, dates, and signatures. When entering the conversation record interface, the enrollment plan serves as the source of definitions, the application material list serves as the basis for details, and the admission list serves as the object for result verification; the three respectively assume the roles of definitions, details, and results, jointly supporting the progress table and the explanation of statistical definitions.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimensions), outputting the session message list and the total number of records, including role and citation information. The progress table and the explanation of statistical definitions are then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Enrollment plan | Names, dates, and signatures are consistent between the plan and the progress table | Pull records by application and session dimensions, check the plan name, date, and signature fields, and confirm the total number of records and response `code` of 200 |
| Application material list | Quantities, dates, and receipts match between the list and the statistical table | Use `chatId` to locate the session, page through to retrieve all records, check the list quantities and receipt dates, and record the number of citations |
| Admission list | Names, batches, and dates are consistent between the list and the statistical table | Use `dataId` to extract one record, check the role, citation information, and time, and confirm the list names and batches |
| Session message list | Roles alternate and citation and duration fields are visible | Open `value` to view the role, citation, and duration of a single record, and confirm the order of questions and answers |

## Three common errors

- Phenomenon: The names, quantities, and dates of the same record do not match between the application material list and the admission list. Cause: The two material versions were not synchronized, and verification was not performed according to the same definitions during registration.
- Phenomenon: The dates and signatures in the enrollment plan and the progress table are inconsistent. Cause: After the plan was revised, the progress table was not backfilled, and missing signatures or receipts were not promptly supplemented.
- Phenomenon: The interface returns empty but there are sessions in the interface. Cause: The sources of the application and session identifiers are inconsistent, or only the first page was retrieved without paging through to retrieve all records.

## How to verify the setup

Acceptance of this function: page through to retrieve all records according to the total number of records, extract one record to check the role, citation information, and time, and confirm that response `code` of 200 matches the total number of records total.

Business test: use one week of records to verify the totals, and see whether the definitions and exceptions are clearly stated.

- Pull records by application and session dimensions, pull two consecutive pages to compare the offset and total number of records, and confirm that the number of records matches the total.
- Open a single record to check the role, citation information, and duration, and confirm that the number of citations and the citation text tokens are recorded separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
