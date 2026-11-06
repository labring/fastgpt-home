---
title: Conversation Records and Traceability for Compulsory Education Dropout Prevention: Track Progress and Check Statistics
slug: /en/industry/education-d006-c009-f007
page_type: 行业问题页
application_area: education
meta_title: Dropout Prevention | Chat Records | Progress
meta_description: Dropout Prevention: review chat records for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Compulsory Education Dropout Prevention: Track Progress and Check Statistics

## What this category's data looks like

Compulsory education dropout prevention and control materials are mainly of three types: dropout risk ledgers, return-to-school persuasion records, and home visit records. They are reported weekly or monthly by schools and townships, and their fields include student name, date, signature, and receipt. Ledger records contain risk level and follow-up person; persuasion records contain the number of persuasion attempts and results; home visit records contain visit time and parent signature. When the materials enter the conversation log and auditing function, the ledger and persuasion records serve as the basis for progress registration, and the home visit records serve as supporting evidence; the conversation record interface only provides the session message list and the total record count, including role and reference information, based on which manual staff or external systems register, export, and review, forming the progress table and statistical scope description.

## Configuration and implementation checks

This step is performed by the conversation record interface (by application and session dimension), which outputs the session message list and the total record count, including role and reference information. The "progress table and statistical scope description" is then completed by manual staff or an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Dropout risk ledger | Fields include student name, risk level, follow-up person, date, and signature; the names, quantities, and dates must be consistent with the persuasion records and home visit records | Retrieve the ledger weekly and compare name, date, and quantity item by item against the persuasion records and home visit records; separately flag any missing signature or receipt |
| Persuasion record | Fields include number of persuasion attempts, result, date, and signature; must correspond to the risk level and follow-up person in the ledger | Use one week of records to check the totals, verify whether the number of persuasion attempts matches the number of follow-ups in the ledger, and write the scope and exceptions into the header |
| Home visit record | Fields include visit time, parent signature, and receipt; the dates must be consistent with the ledger and persuasion records | Sample one record to check the role, reference information, and time; page through to retrieve the total record count and verify the message identifiers and content fields `_id`, `dataId` and `value` |
| Conversation record interface | Paginate by application and session dimension, returning the total record count and response `code` of 200; roles distinguish questions from answers | Pull two consecutive pages and compare the total count and offset; open a single record to check the reference and elapsed-time fields, and confirm that the total record count matches the statistical count |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the ledger and the persuasion record. Cause: The two are registered separately and not checked against the same scope, resulting in discrepancies in the statistical count.
- Symptom: Home visit records lack a parent signature or receipt, and persuasion records lack the follow-up person's signature. Cause: The material circulation step was not synchronized, and signatures and receipts were not archived together with the records.
- Symptom: The ledger version was not synchronized, and the old version is still in use. Cause: After updating, it was not uniformly replaced, and the dates and quantities in the two materials became inconsistent.

## How to verify the setup

This function's acceptance: page through by total record count to retrieve all records, and sample one record to check the role, reference information, and time; confirm response `code` of 200 and that the total record count matches the statistical count.

Business test: use one week of records to check the totals, see whether the scope and exceptions are clearly written, and check whether the names, quantities, and dates of the ledger, persuasion records, and home visit records are consistent.

- Paginate by application and session dimension, pull two consecutive pages and compare the total count and offset, and confirm that the total record count is consistent with the statistical count.
- Check the fields, dates, and signatures of the ledger, persuasion records, and home visit records one by one; after supplementary entry of any missing signature or receipt, include them in the weekly or monthly report.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
