---
title: Conversation Records and Traceability for Research Ethics Review: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c062-f007
page_type: 行业问题页
application_area: education
meta_title: Research Ethics | Chat Records | Versions
meta_description: Research Ethics: review chat records for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Research Ethics Review: Maintain Document Versions and Changes

## What this category's data looks like

Research ethics review involves three types of materials: ethics review applications, informed consent form templates, and risk assessment forms, each containing fields, dates, and signatures. The materials come from versions submitted by institutional ethics committees and researchers, and the update cadence changes with protocol revisions, regulatory adjustments, and annual continuing review. When entering this feature, the ethics review application serves as the main record carrying review opinions and receipts, the informed consent form template serves as an attachment that changes with version numbers, and the risk assessment form serves as supporting material that corresponds item by item with the dates, quantities, and names in the application. Conversation logs are retained by application and session dimensions, used to trace references to materials and change discussions during the review process, but they do not directly generate a version ledger.

## Configuration and implementation checks

This step is performed by the conversation record interface (by application and session dimensions), outputting a session message list and the total record count, including role and reference information. The version ledger and change records are then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Ethics review application | Fields, dates, and signatures are consistent between the application and the receipt | Check the application number, review date, and signature field, and compare whether the receipt is the same version |
| Informed consent form template | Version number and references are updated in sync | After changing one piece of content, see whether the version number increments and whether the old version remains traceable |
| Risk assessment form | The name, quantity, and date of the same record match between the application and the form | Compare the three columns of name, quantity, and date item by item, and mark differences |
| Conversation record interface | The total record count and role and reference information are complete | Page through by `chatId` to retrieve all records, and sample one to check the role and references |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the application and the risk assessment form. Cause: The two materials are maintained separately, without cross-comparison and unified registration.
- Symptom: After the informed consent form template is revised, the reference in the application still points to the old version. Cause: The version number was not synchronized; the old version is traceable but the reference was not updated.
- Symptom: The receipt or signature field is missing, and the review record is incomplete. Cause: The material circulation step did not verify signatures and receipts, and completeness was not checked at registration.

## How to verify the setup

Feature acceptance: Page through by total record count to retrieve all records, sample one to check the role, reference information, and time, the status code is 200, the total record count total matches the number of list entries, the reference count is recorded separately by array length, and when the reference upper limit is involved, check the tokens of the reference text.

Business test: Change one piece of content and see whether the version number and references are updated in sync.

- Retrieve records by application and session dimensions, use `chatId` and `dataId` to locate a single message, and check the role and reference fields.
- Compare the fields, dates, and signatures of the application, informed consent form template, and risk assessment form item by item, register differences, and update the knowledge base or external documents.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
