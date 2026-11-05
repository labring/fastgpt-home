---
title: Conversation Records and Traceability for Journal Publication Licensing and Annual Verification: Track Progress and Check Statistics
slug: /en/industry/education-d006-c069-f007
page_type: 行业问题页
application_area: education
meta_title: Journal Licensing | Chat Records | Progress
meta_description: Journal Licensing: review chat records for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Journal Publication Licensing and Annual Verification: Track Progress and Check Statistics

## What this category's data looks like

This page centers on progress records and statistical reconciliation for journal publication licenses and annual verification. The materials come from three categories: journal publication licenses, annual verification forms, and rectification reports. They are updated weekly or monthly, and their fields include name, quantity, date, and signature. The journal publication license provides the entity and the scope of the license, the annual verification form provides the annual submission and verification conclusion, and the rectification report provides the problem items and the receipt. When these three categories of materials enter the conversation records and auditing function, each plays an evidentiary role: the license proves that the qualification continues to exist, the verification form proves annual fulfillment, and the rectification report proves that the problem has been closed out. Conversation records are pulled in pages by application and session dimensions, returning a list of session messages and the total number of records, including role and reference information, so that manual staff or external systems can register, export, and review based on them. The progress table and the explanation of statistical criteria are then completed by manual staff or an external system; the message list does not serve as a version ledger for business materials.

## Configuration and implementation checks

This step is executed by the conversation records interface (by application and session dimensions), which outputs a list of session messages and the total number of records, including role and reference information. The progress table and the explanation of statistical criteria are then completed by manual staff or an external system. The conversation records interface only retrieves session evidence; it does not write to the business ledger.

| Object | Check | Verification action |
| --- | --- | --- |
| Journal publication license | Fields, dates, and signatures are consistent between the license and the verification form | Check the license name, quantity, date, and signature, and compare them with the same items in the annual verification form |
| Annual verification form | The number of records matches the statistical count, and the criteria are written in the header | Use one week of records to check the total, and check whether the criteria and exceptions are clearly stated |
| Rectification report | The name, quantity, and date of the same record match across the two materials | Check the name, quantity, date, and receipt signature in the rectification report and the verification form |
| Conversation records interface | The total number of records matches the number of items per page, and each message has an identified role | Page through by `chatId` to retrieve all records, and check `dataId`, `value`, and the total record count total |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the license and the verification form. Cause: The two materials are registered separately, and no field-level comparison was performed.
- Symptom: The rectification report version was not synchronized, and the old version is still listed in the progress table. Cause: After the version was updated, it was not written back to the verification form and the progress table.
- Symptom: The verification form lacks a signature or receipt, but the number of records is still counted in the total. Cause: The statistical criteria did not list exceptions separately, causing the number of records and the statistical count to fail to match.

## How to verify the setup

This function's acceptance: Page through by the total record count total to retrieve all records, sample one record to check the role, reference information, and time; response `code` of 200 indicates a normal return; check `_id`, `dataId` and `value`.

Business test: Use one week of records to check the total, and see whether the criteria and exceptions are clearly stated.

- Pull two consecutive pages by `chatId`, compare the offset and the total record count total, and confirm the cases where only the first page is retrieved or an empty result is returned.
- Open one record to check the role, reference, and elapsed-time fields, and check whether the exported records are missing references.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
