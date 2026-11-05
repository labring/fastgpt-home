---
title: Conversation Records and Traceability for Kindergarten Healthcare and Meal Management: Track Progress and Check Statistics
slug: /en/industry/education-d006-c003-f007
page_type: 行业问题页
application_area: education
meta_title: Child Health and Meals | Chat Records | Progress
meta_description: Child Health and Meals: review chat records for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Kindergarten Healthcare and Meal Management: Track Progress and Check Statistics

## What this category's data looks like

Kindergarten health care and meal management involves four types of materials: ingredient names and specifications, retention sample times and batches, disinfection periods, and absence cause classification. Ingredient acceptance forms and purchase orders are summarized daily, retention sample records are registered by meal batch, disinfection records are registered by period, and absence registrations are classified by cause. When the materials enter this feature, the conversation record interface pulls the session message list and total record count by application and session dimension, distinguishes question and answer roles, and includes citation and elapsed-time fields; the progress table and statistical scope description are registered, exported, and reviewed accordingly by humans or external systems. The update cadence is daily registration, weekly reconciliation, and monthly summarization, and the field characteristics are batch number, period, cause category, and specification name, used to check whether the record count and statistical count match.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), which outputs the session message list and total record count, including role and citation information. The "progress table and statistical scope description" is then completed by humans or external systems for registration, export, and review; the message list is not used as the version ledger for business materials.

| Object | Check | Verification action |
| --- | --- | --- |
| Ingredient names and specifications | The categories and specifications on the purchase order and acceptance form are consistent, and the record count and statistical count match | Page through by `chatId` to retrieve all records, check whether the documents and retention sample batches correspond, and write the scope in the table header |
| Retention sample times and batches | The retention sample batch matches the document batch; missing periods must be marked as exceptions | Page through by the total record count total to retrieve all records, and sample one record to check the role, citation information, and time |
| Disinfection periods | The disinfection record periods are continuous; missing periods are explained separately | Open one record to check the `dataId` and `value` fields, and confirm the period and citation |
| Absence cause classification | The cause classification is consistent with the statistical scope; exceptions are stated clearly | Use one week of records to check the totals, and see whether the scope and exceptions are clearly written |

## Three common errors

- Symptom: the documents and retention sample batches do not match. Cause: retention sample registration is by meal batch, while the acceptance form is by arrival batch, and the two numbering sets have not been unified in the table header scope.
- Symptom: the menu and purchase categories are inconsistent. Cause: the menu is scheduled weekly, while purchasing is ordered daily, and the category names and specifications are not aligned, so they cannot be merged during statistics.
- Symptom: disinfection records are missing periods. Cause: disinfection is registered by period, shift handover periods are not backfilled, and a difference appears between the statistical total and the record count.

## How to verify the setup

Feature acceptance: page through by the total record count to retrieve all records, sample one record to check the role, citation information, and time, confirm that response `code` of 200 is consistent with total, and check the message identifiers and content fields `_id`, `dataId` and `value`.

Business test: use one week of records to check the totals, and see whether the scope and exceptions are clearly written.

- Pull two pages in a row and compare the total and offset to confirm that the number of records matches the total.
- Open one record to check the citation and elapsed-time fields, and confirm that a single record shows the citation and elapsed time.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
