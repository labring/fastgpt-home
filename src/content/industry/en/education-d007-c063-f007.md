---
title: Conversation Records and Traceability for Academic Misconduct Reports and Investigations: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c063-f007
page_type: 行业问题页
application_area: education
meta_title: Research Misconduct | Chat Records | Review
meta_description: Research Misconduct: review chat records for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Academic Misconduct Reports and Investigations: Trace Exceptions and Review Results

## What this category's data looks like

This page addresses the category of investigation and handling of academic misconduct reports. Materials include three types: report materials, investigation reports, and expert appraisal opinions. Sources are the acceptance registration, investigation process, and expert review stages, and the update cadence is synchronized in stages with the progress of the investigation. Field characteristics center on four types: name, quantity, date, and signature. The three types of materials each play different roles: report materials provide the original clues and claims, investigation reports record the verification process and conclusions, and expert appraisal opinions provide professional judgment. When the materials enter the conversation logs and auditing feature, the conversation record interface pulls the session message list and total record count by application and session dimensions, serving as the original record support for abnormal traceability. Manual staff or external systems then register, export, and review based on this, forming an exception list and review conclusions.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimensions), outputting the session message list and total record count, including role and citation information. The "exception list and review conclusions" are then completed by manual staff or external systems.

| Object | Check | Verification action |
| --- | --- | --- |
| Report materials | Whether the name, quantity, date, and signature are consistent between the report materials and the investigation report | Check the name, quantity, and date fields in the report materials and the investigation report, check whether signatures and receipts are complete, and use `chatId` to locate the corresponding session |
| Investigation report | Whether the version is synchronized, and whether the original record can be traced when signatures or receipts are missing | Compare the version number and date of the investigation report, verify whether the name, quantity, and date in the expert appraisal opinions match, and use `dataId` to locate a single record |
| Expert appraisal opinions | Whether the fields, date, and signature of the expert appraisal opinions are consistent with the investigation report | Check item by item the name, quantity, date, and signature of the expert appraisal opinions, check whether the citation information is complete, and use `value` to view the details of a single record |
| Exception list and review conclusions | Exceptions are supported by original records, and the reviewer has signed | Page through by total record count to retrieve all records, sample one record to check the role, citation information, and time, and confirm that the exception list and review conclusions are supported by original records and signed |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the report materials and the investigation report. Cause: The two materials are registered separately and are not checked against the same field definitions.
- Symptom: The version of the investigation report is not synchronized, and the expert appraisal opinions cite conclusions from an old version. Cause: After the version was updated, it was not synchronized to the appraisal step, and version comparison was lacking.
- Symptom: The report materials or expert appraisal opinions lack signatures or receipts. Cause: The circulation step did not require signatures and receipts, and no check was performed at archiving.

## How to verify the setup

This feature's acceptance: page through by the total record count total to retrieve all records, sample one record to check the role, citation information, and time, confirm that response `code` of 200 is consistent with the returned list, and use `_id`, `dataId` and `value` to locate records.

Business test: create an exception record and see whether the source material can be traced.

- Pull two pages consecutively and check the total record count and advance the offset by the number of records retrieved to confirm that the pagination parameters match the total count.
- Open a record to check the role field and citation and elapsed-time fields, and confirm that the citation count and citation text tokens are recorded separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
