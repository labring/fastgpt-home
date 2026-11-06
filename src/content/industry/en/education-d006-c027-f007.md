---
title: Conversation Records and Traceability for Graduate Employment Contracts and Destination Statistics: Track Progress and Check Statistics
slug: /en/industry/education-d006-c027-f007
page_type: 行业问题页
application_area: education
meta_title: Graduate Destinations | Chat Records | Progress
meta_description: Graduate Destinations: review chat records for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Graduate Employment Contracts and Destination Statistics: Track Progress and Check Statistics

## What this category's data looks like

Materials in the category of university employment contract signing and graduation destination statistics typically include three types: employment agreements, graduation destination registration forms, and employer certificates. Employment agreements are signed by students and employers, recording the signing employer name, unified social credit code, signing date, and signatures of both parties; graduation destination registration forms are filled out by students and preliminarily reviewed by departments, recording the destination type, employer name, reporting date, and departmental opinion; employer certificates are issued by employers, recording the hired position, onboarding time, and the employer's stamped receipt. When these three types of materials enter the conversation record interface, each assumes a different role: employment agreements and employer certificates serve as original vouchers, used to verify the fact and date of signing; graduation destination registration forms serve as the source for aggregated statistics, used to tally destination categories and headcounts. Materials are updated weekly or monthly, and field characteristics are concentrated in four categories: name, quantity, date, and signature.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), outputting a session message list and total record count, including role and reference information. The progress table and statistical scope description are then completed manually or by an external system. The interface only retrieves session evidence and does not write to business ledgers.

| Object | Check | Verification action |
| --- | --- | --- |
| Employment agreement | The signing employer name, signing date, and signatures of both parties must be consistent with the registration form | Pull session records by `chatId`, and compare the employer name and date in the agreement and the registration form |
| Graduation destination registration form | The destination type, employer name, and reporting date must correspond to the employer certificate | Use `dataId` to locate a single record, and check the date fields of the registration form and the certificate |
| Employer certificate | The hired position, onboarding time, and employer's stamped receipt must be complete | Open the `value` field to view references and elapsed time, and confirm whether the certificate receipt is retained with the record |
| Conversation record interface | The total record count matches the number of items per page, and each message has an identified role | Pull two consecutive pages and compare total with offset, and confirm the status code is 200 |

## Three common errors

- Phenomenon: The same graduate's employer name is written differently in the employment agreement and the graduation destination registration form. Cause: The two materials were filled out by different handlers, and no name normalization was performed.
- Phenomenon: The onboarding date on the employer certificate does not match the reporting date on the registration form. Cause: Versions were not synchronized, and the registration form was not revised after the certificate was issued.
- Phenomenon: Some records lack the employer's stamped receipt or departmental signature. Cause: No receipt verification was set up in the material circulation step, allowing missing items to enter the statistics.

## How to verify the setup

This feature acceptance: Page through by total record count total to retrieve all records, sample one record to check the role, reference information, and time, and confirm the status code is 200.

Business test: Use one week of records to check the totals, and see whether the scope and exceptions are clearly stated.

- Pull two pages of records by application and session identifier, compare total with offset, and confirm the record counts are consistent.
- Open a single record to check the references and elapsed time in `value`, and record the number of items in the reference array.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
