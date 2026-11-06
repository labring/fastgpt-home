---
title: Conversation Records and Traceability for Kindergarten Healthcare and Meal Management: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c003-f007
page_type: 行业问题页
application_area: education
meta_title: Child Health and Meals | Chat Records | Versions
meta_description: Child Health and Meals: review chat records for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Kindergarten Healthcare and Meal Management: Maintain Document Versions and Changes

## What this category's data looks like

Kindergarten health care and meal management involves materials such as ingredient names and specifications, retention sample times and batches, disinfection periods, and absence cause classification. These materials come from purchase documents, retention sample records, disinfection registration forms, menus, and attendance sheets, and are updated daily or weekly. When entering the conversation record interface, each material is carried in the form of session messages: the question side registers document and batch information, and the answer side cites the current version content along with citation information and latency fields. The division of roles among materials is: menus and purchase categories are used to compare consistency, retention sample batches and documents are used to check correspondence, disinfection periods are used to check record completeness, and absence cause classification is used to unify terminology. The version ledger and change records need to be registered, exported, and reviewed manually or by an external system based on the session message list and total record count returned by the interface.

## Configuration and implementation checks

This step is performed by the conversation record interface (by application and session dimension), outputting a session message list and total record count, including roles and citation information. The "version ledger and change records" are then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Ingredient names and specifications | Whether the menu and purchase categories are consistent | Pull records by application and session identifier, check whether the ingredient names and specifications in the question and answer match the purchase categories, and check whether `chatId` corresponds to the actual session |
| Retention sample times and batches | Whether the documents and retention sample batches match | Open a single record to check the citation information and latency fields, confirm that the retention sample time and batch are consistent in the question and answer, and record the number of citations as the array length |
| Disinfection periods | Whether the disinfection records are missing periods | Page through to retrieve all records, check the alternating order of the question and answer by the role field, confirm that no disinfection periods are missing, and that the total record count matches the offset |
| Absence cause classification | Whether the classification terminology is unified | Check the tokens of the cited text and the number of array items in a single record, confirm that the absence cause classification is unique in the current version and that the old version is traceable |

## Three common errors

- Symptom: the documents and retention sample batches do not match. Cause: the batch registered on the question side and the version cited on the answer side are not synchronized, and the old retention sample record is still being cited.
- Symptom: the menu and purchase categories are inconsistent. Cause: the ingredient names and specifications in the session messages were not updated according to the current version, and the citation information points to outdated content.
- Symptom: the disinfection records are missing periods. Cause: pagination only retrieved the first page, the total record count and offset were not checked, and some session messages were omitted.

## How to verify the setup

This feature acceptance: page through to retrieve all records according to the total record count, sample one record to check the role, citation information, and time, confirm that the status code is 200 and consistent with total, and check the `dataId` and `value` fields.

Business test: change one piece of content and see whether the version number and citation are updated synchronously.

- Pull two pages in succession and compare the total and offset to confirm that the number of records matches total, avoiding retrieving only the first page.
- Open one record to check the citation and latency fields, check that the number of citations is the array length, and record the tokens of the cited text separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
