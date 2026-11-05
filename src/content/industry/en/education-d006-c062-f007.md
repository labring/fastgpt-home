---
title: Conversation Records and Traceability for Research Ethics Review: Track Progress and Check Statistics
slug: /en/industry/education-d006-c062-f007
page_type: 行业问题页
application_area: education
meta_title: Research Ethics | Chat Records | Progress
meta_description: Research Ethics: review chat records for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Research Ethics Review: Track Progress and Check Statistics

## What this category's data looks like

This page addresses the research ethics review scenario. Materials include ethics review applications, informed consent form templates, and risk assessment forms. Sources are the original documents submitted by the institutional ethics committee intake window and the project team, and the update cadence advances by intake batch and revision round. When entering the conversation logs and audit feature, the three types of materials each play a different role: the ethics review application serves as the main record, carrying the project name, intake number, and review status; the informed consent form template serves as attachment material, carrying the version number, signature field, and receipt information; the risk assessment form serves as a supporting form, carrying the risk level, assessment date, and signature field. Field characteristics are concentrated in four categories: name, quantity, date, and signature. The same record must keep the name consistent, quantity consistent, and date consistent across the three materials, the version number must be synchronized, and signatures and receipts must be complete. The conversation records interface pulls paginated data by application and session dimensions, returning a session message list and the total record count, including role and citation information, for manual or external systems to register, export, and review accordingly.

## Configuration and implementation checks

This step is executed by the conversation records interface (by application and session dimensions), outputting a session message list and the total record count, including role and citation information. The "progress table and statistical scope description" is then completed manually or by an external system. The message list is not a version ledger of business materials; it is used only as conversation evidence.

| Object | Check | Verification action |
| --- | --- | --- |
| Ethics review application | Check the project name, intake number, review status, date, and signature field, and confirm item-by-item correspondence with the informed consent form template and risk assessment form | Pull paginated data by application and session dimensions, check that `chatId` matches the actual session, and after paging through all records, compare the total record count total with response `code` of 200 |
| Informed consent form template | Check that the version number, signature field, and receipt field are consistent with the project name and date in the ethics review application | Open a single record and check the role field; message roles correspond to the original conversation, and citation information and elapsed-time fields are queryable |
| Risk assessment form | Check that the risk level, assessment date, and signature field are consistent with the quantity and date in the ethics review application and informed consent form template | Check the pagination parameters offset and pageSize, pull two consecutive pages and compare the total record count total, and confirm that the offset and item count match |
| Conversation records interface | Return the message list and total record count by application and session dimensions, distinguish the two role types of question and answer, and include citation and elapsed-time fields | Open a record and check `dataId` and `value`, and confirm that the citation text and elapsed-time fields are complete |

## Three common errors

- Symptom: The project name, quantity, and date of the same record do not match between the ethics review application and the informed consent form template. Cause: The two materials are registered separately, without backfilling and checking against the same intake number.
- Symptom: The version of the informed consent form template is not synchronized, and the signature field and receipt field are missing. Cause: The revision round was not registered in the progress table, and the old version is still referenced.
- Symptom: The interface returns empty but there are sessions in the UI, or only the first page is retrieved. Cause: The sources of the application and session identifiers are inconsistent, and the pagination parameters were not pulled continuously.

## How to verify the setup

Feature acceptance: page through all records by total record count, sample one record to check the role, citation information, and time, confirm that `_id`, `dataId` and `value` are queryable, the status code is 200, and the total record count total matches the list length.

Business testing: use one week of records to check the totals, see whether the scope and exceptions are clearly stated, and confirm that the record count matches the statistical count and the scope is written in the table header.

- Pull paginated data by application and session dimensions, pull two consecutive pages and check the total record count and advance the offset by the number of records retrieved, and confirm that the number of records matches the total.
- Open a single record and check the role, citation information, and elapsed-time fields, confirm that the citation count is recorded separately by array length, and check the tokens of the citation text separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
