---
title: Conversation Records and Traceability for Continuing Education Training Hour Recognition: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c038-f007
page_type: 行业问题页
application_area: education
meta_title: Continuing Education | Chat Records | Versions
meta_description: Continuing Education: review chat records for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Continuing Education Training Hour Recognition: Maintain Document Versions and Changes

## What this category's data looks like

This category's data involves three types of materials: course filing forms, study certificates, and hour recognition forms. Fields include course name, number of hours, start and end dates, signatures, and receipts. Course filing forms come from the course-providing institution, study certificates are issued by the learner's organization, and hour recognition forms are consolidated by the recognition body. The update cadence varies with course batches and recognition cycles. The name, quantity, and dates of the same record often fail to match across the two materials, and unsynchronized versions, missing signatures, or missing receipts also occur from time to time. When the materials enter the conversation logs and auditing feature, the course filing form and study certificate serve as evidence on the question side, while the hour recognition form serves as the conclusion on the answer side. Each retains its role and citation information for later comparison against the version ledger and change records.

## Configuration and implementation checks

This step is performed by the conversation record interface (by application and session dimension), which outputs the session message list and the total record count, including role and citation information. The version ledger and change records are then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Course filing form | Fields include course name, number of hours, start and end dates, and signature, and must match the study certificate item by item | Pull the session message list by `chatId`, and check the course name and number of hours in the records on the question side |
| Study certificate | Fields include learner name, course name, number of hours, and receipt, and the dates must fall within the filing form's period | Open a single record by `dataId`, and check the dates and quantities in the citation information on the answer side |
| Hour recognition form | Fields include recognition conclusion, signature, and recognition date, and citations must point to the current version | View the details of a single record by `value`, and check whether the number of citations and the citation text tokens correspond to the current version |
| Version ledger and change records | The current version is unique, old versions are traceable, citations are synchronized, and the total record count and response `code` of 200 are queryable | Pull two pages in a row and compare total with the offset; after changing one piece of content, see whether the version number and citations are updated in sync |

## Three common errors

- Symptom: The name, quantity, and dates of the same record do not match between the course filing form and the study certificate. Cause: The two materials are registered separately, without item-by-item field comparison for the same record.
- Symptom: The hour recognition form cites old-version content, and the current version and old version coexist. Cause: The version was not synchronized, and the knowledge base or external documents were not updated after the change.
- Symptom: The study certificate lacks a signature or receipt, yet the recognition form is still cited. Cause: The signature and receipt fields were not validated when the materials entered the feature, and the omission was only discovered during auditing.

## How to verify the setup

Feature acceptance: Page through by the total record count total to retrieve everything, sample one record to check the role, citation information, and time, and confirm response `code` of 200 and that the list distinguishes questions from answers.

Business test: Change one piece of content, see whether the version number and citations are updated in sync, and check the records corresponding to the message identifiers and content fields `_id`, `dataId` and `value`.

- Pull two pages in a row and compare total with the offset to confirm that the number of records matches the total, avoiding retrieving only the first page.
- Open one record and check the citation and elapsed-time fields, confirming that the number of citations is the array length and that the citation text tokens are recorded separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
