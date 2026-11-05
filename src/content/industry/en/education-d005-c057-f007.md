---
title: Conversation Records and Traceability for National Key Research and Development Applications: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c057-f007
page_type: 行业问题页
application_area: education
meta_title: National R&D Grants | Chat Records | Versions
meta_description: National R&D Grants: review chat records for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for National Key Research and Development Applications: Maintain Document Versions and Changes

## What this category's data looks like

This category's data covers three types of materials involved in National Key R&D Program project applications: the project application form, the budget application form, and the cooperation agreement. Fields include name, quantity, date, and signature. The materials come from application system exports and offline countersigned documents, and the update cadence rolls with application milestones. When the three types of materials enter the conversation record feature, each serves as the question and answer context of session evidence, and they do not directly generate a version ledger. The project application form carries tasks and indicators, the budget application form carries funding and budget subjects, and the cooperation agreement carries division of labor and receipts. The name, quantity, and date of the same record across the three materials must be checked item by item; unsynchronized versions and missing signatures are high-frequency problems.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), which outputs a session message list and the total record count, including role and reference information. The version ledger and change records are then completed manually or by an external system. The interface only retrieves session evidence and does not write to the business ledger.

| Object | Check | Verification action |
| --- | --- | --- |
| Project application form | Name, quantity, date, and signature must be consistent with the budget application form and the cooperation agreement | Pull records by application and session identifier, and verify the sources of the `chatId` and `value` fields |
| Budget application form | Funding subjects, quantity, date, and signature must be consistent with the project application form and the cooperation agreement | Pull two pages in succession and compare the total record count total and the offset, and confirm response `code` of 200 |
| Cooperation agreement | Division of labor, quantity, date, and receipt signature must be consistent with the two application forms | Open a single record and verify the role, reference information, and time, and record the number of items in the reference array |
| Session message list | The two roles of message roles correspond to the original conversation, and the reference and elapsed time fields are visible | Use `dataId` to locate a single message, and verify the reference text tokens and array length |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the project application form and the budget application form. Cause: The two materials are maintained separately, and no field-level comparison was performed.
- Symptom: The cooperation agreement has been updated, but the project application form still references the old version. Cause: The version was not synchronized, and the reference was not updated with the content.
- Symptom: The cooperation agreement lacks a signature or receipt. Cause: The countersigning process was not closed-loop, and material archiving is incomplete.

## How to verify the setup

Feature acceptance: Page through by total record count to retrieve everything, and sample one record to verify the role, reference information, and time.

Business test: Change one piece of content and see whether the version number and reference are updated synchronously.

- Verify that the application and session identifiers match the actual application and actual session, and confirm response `code` of 200.
- Pull two pages in succession and compare the total record count and the offset, the number of items in the reference array, and the reference text tokens.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
