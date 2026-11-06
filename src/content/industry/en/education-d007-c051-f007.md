---
title: Conversation Records and Traceability for College Entrance Exam Application Eligibility: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c051-f007
page_type: 行业问题页
application_area: education
meta_title: Entrance Exam Eligibility | Chat Records | Review
meta_description: Entrance Exam Eligibility: review chat records for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for College Entrance Exam Application Eligibility: Trace Exceptions and Review Results

## What this category's data looks like

This category's data involves three core types of materials: the college entrance examination registration form, household registration and student status certificates, and materials for children accompanying migrant workers. The registration form is filled in by the candidate and initially reviewed by the school, with fields including name, ID number, examination category, and signature date; the household registration and student status certificates are issued by the public security authorities and the school, with fields including household registration address, student status number, start and end dates of enrollment, and seal; the materials for children accompanying migrant workers are provided by parents and the social security department, with fields including residence permit number, number of months of social security contributions, labor contract term, and receipt signature. When these three types of materials enter the conversation log and audit function, each assumes an evidentiary role: the registration form is the primary record, the household registration and student status certificates are used to compare names and student status dates, and the materials for children accompanying migrant workers are used to verify residence and social security conditions. Materials are submitted centrally by registration batch, and the update rhythm is three rounds: initial review, re-review, and final review, with each round producing a new version. Field characteristics manifest as the need for the name, date, and quantity in the same record to align item by item across the two types of materials, and signatures and receipts are indispensable.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), outputting a session message list and total record count, including role and reference information. The "exception list and review conclusions" are then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| College entrance examination registration form | Name, ID number, examination category, and signature date are consistent item by item with the household registration and student status certificates | Retrieve the registration form and household registration and student status certificates, compare name, student status number, and start and end dates of enrollment, and check whether signatures and seals are complete |
| Household registration and student status certificates | Household registration address, student status number, and start and end dates of enrollment do not conflict with the registration form | Open a single record to check the role field and reference information, use `chatId` to locate the session, use `dataId` to locate the message, and use `value` to view reference details |
| Materials for children accompanying migrant workers | Residence permit number, number of months of social security contributions, labor contract term, and receipt signature are complete | Compare the residence permit number and social security months, check whether the labor contract term covers the registration period, and confirm the receipt signature and date |
| Conversation record interface | The total record count total and response `code` of 200 are queryable, and the pagination offset and count match | Page through to retrieve all records according to the total record count, pull two consecutive pages to compare offset and count, and sample one record to check role, reference information, and time |

## Three common errors

- Phenomenon: the same candidate's name is written differently in the registration form and the household registration and student status certificates. Cause: the two materials were entered separately, name field alignment was not performed, and versions were not synchronized.
- Phenomenon: the social security months in the materials for children accompanying migrant workers do not match the quantity filled in the registration form. Cause: social security data updates lag, material versions were not synchronized, and item-by-item comparison was not performed during review.
- Phenomenon: the household registration and student status certificates lack a school seal or receipt signature. Cause: signatures were omitted during material circulation, and manual review did not check the signature column and receipt.

## How to verify the setup

Acceptance of this function: page through to retrieve all records according to the total record count total, sample one record to check role, reference information, and time, confirm response `code` of 200, and use `_id`, `dataId` and `value` to locate the record.

Business test: create an exception record and see whether the source material can be traced.

- Page through to retrieve all records according to the total record count, pull two consecutive pages to compare offset and count, and confirm that the total record count and response `code` of 200 are consistent.
- Sample one record to check the role field, reference information, and elapsed time, use `chatId` to locate the session, use `dataId` to locate the message, and use `value` to view reference details.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
