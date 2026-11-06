---
title: Conversation Records and Traceability for School Moral Education and Class Teacher Work: Track Progress and Check Statistics
slug: /en/industry/education-d006-c014-f007
page_type: 行业问题页
application_area: education
meta_title: Pastoral Education | Chat Records | Progress
meta_description: Pastoral Education: review chat records for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for School Moral Education and Class Teacher Work: Track Progress and Check Statistics

## What this category's data looks like

This page focuses on progress records and statistical verification of school moral education and homeroom teacher work. The materials include three categories: thematic class meeting plans, student comprehensive quality records, and home visit records. Thematic class meeting plans are archived by week or theme, with fields including activity name, date, host, number of participants, and signature; student comprehensive quality records are updated by semester or month, with fields including student name, evaluation dimension, date, and homeroom teacher signature; home visit records are registered per visit, with fields including student name, home visit date, teacher, and receipt. When these three categories of materials enter the conversation record interface, they are pulled as question or answer content in the session respectively, the role field distinguishes the source, and the citation and duration fields retain single-item evidence. In terms of update rhythm, class meeting plans change by week, comprehensive quality records change by evaluation cycle, and home visit records change as actual home visits occur. During statistical verification, the total number of records is the number of message records, not the number of sessions; material names, quantities, and dates need to be cross-checked against the two materials.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), outputting the session message list and the total number of records, including role and citation information. The progress table and statistical criteria description are then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Thematic class meeting plan | Fields include activity name, date, host, number of participants, and signature; the date and signature must be consistent with the weekly report | Use `chatId` to pull session records, and verify the role and citation information in `dataId` and `value` |
| Student comprehensive quality record | Fields include student name, evaluation dimension, date, and homeroom teacher signature; the quantity and date must be consistent with the monthly report totals | Retrieve all records by `chatId` with pagination, and compare the total number of records with the totals in the statistical criteria description |
| Home visit record | Fields include student name, home visit date, teacher, and receipt; missing receipts must be marked as exceptions in the criteria description | Open a single record to verify the role, citation information, and duration, and confirm whether the receipt field is complete |
| Conversation record interface output | The total number of records matches the pagination offset, the status code is 200, and each message has an identified role | Pull two consecutive pages to compare total and offset, and confirm that the citation and duration fields exist |

## Three common errors

- Phenomenon: The name and quantity of the same class meeting plan do not match between the weekly report and the monthly report. Cause: The two materials are registered separately and are not verified against the same session record.
- Phenomenon: The version of the student comprehensive quality record is not synchronized, and the old version date is mixed with the new evaluation cycle. Cause: After export, the date and signature were not re-verified against the session record.
- Phenomenon: Home visit records lack a signature or receipt, but the statistical totals still count them in the total. Cause: The criteria description did not clearly state the exceptions, and the total number of records and the number of valid records were not separated.

## How to verify the setup

This feature acceptance: page through all records by the total number of records, sample one record to verify the role, citation information, and time, and confirm that `_id`, `dataId` and `value` are consistent with response `code` of 200 and total.

Business test: use one week of records to verify the totals, check whether the criteria and exceptions are clearly stated, and verify the dates and signatures of thematic class meeting plans, student comprehensive quality records, and home visit records.

- Pull records by application and session dimension with pagination, pull two consecutive pages to compare total and offset, and confirm that the total number of records matches the statistical count.
- Sample one record to verify the role, citation information, and duration, and write the statistical criteria and exception notes in the header of the progress table.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
