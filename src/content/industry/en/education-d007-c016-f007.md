---
title: Conversation Records and Traceability for School Safety Inspections and Incident Reporting: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c016-f007
page_type: 行业问题页
application_area: education
meta_title: Campus Safety | Chat Records | Review
meta_description: Campus Safety: review chat records for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for School Safety Inspections and Incident Reporting: Trace Exceptions and Review Results

## What this category's data looks like

School safety hazard inspections and campus incident reporting involve three types of materials: safety inspection checklists, hazard rectification ledgers, and emergency incident reports. Safety inspection checklists record item by item according to area and inspection item, including inspection date, inspector signature, and hazard description; hazard rectification ledgers register the rectification responsible person, rectification deadline, and acceptance signature by hazard number; emergency incident reports record the incident occurrence time, location, involved personnel, and handling process, and attach a receipt. The material sources are daily patrols, special inspections, and incident reporting, and the update rhythm is immediate registration after each inspection or incident. When the three types of materials enter the conversation logs and audit function, they respectively serve as the original evidence of anomaly clues: safety inspection checklists provide the discovery time and inspector, hazard rectification ledgers provide the rectification closed loop and responsible signature, and emergency incident reports provide the incident process and handling receipt. The field characteristics are concentrated in four categories: name, quantity, date, and signature, which are used for subsequent anomaly tracing and manual review.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), outputting a session message list and total record count, including role and reference information. The "anomaly list and review conclusion" is then completed manually or by an external system. Conversation records are pulled in pages by application and session dimension, and the returned results distinguish between the two role types of question and answer, and carry reference and duration fields.

| Object | Check | Verification action |
| --- | --- | --- |
| Safety inspection checklist | Whether the inspection date, inspector signature, and hazard description are complete, and whether the name and quantity of the same hazard in the ledger are consistent | Look up the safety inspection checklist by inspection date, verify the inspector signature and hazard description, and then compare item by item with the hazard rectification ledger for name and quantity |
| Hazard rectification ledger | Whether the rectification responsible person, rectification deadline, and acceptance signature are complete, and whether the version is synchronized with the latest inspection checklist | Open the hazard rectification ledger, verify the rectification deadline and acceptance signature, and confirm that the ledger version is consistent with the safety inspection checklist date |
| Emergency incident report | Whether the incident occurrence time, location, involved personnel, and handling receipt correspond, and whether the signature or receipt is missing | Retrieve the emergency incident report, verify the occurrence time and location, and check whether the handling receipt and signature are complete |
| Conversation record interface | Whether the session message list and total record count correspond, and whether the role and reference information are traceable | Pull in pages by application and session dimension, pull two consecutive pages to compare the total record count total and offset, and open a single record to verify the role, reference information, and `dataId` |

## Three common errors

- Phenomenon: The name, quantity, or date of the same hazard in the safety inspection checklist and the hazard rectification ledger do not match. Cause: The two materials are registered separately, no cross-check is performed, and the versions are not synchronized.
- Phenomenon: The emergency incident report lacks a handling receipt or responsible person signature. Cause: After incident handling, the receipt was not supplemented in time, and the signature step was skipped.
- Phenomenon: The conversation record interface returns empty but there are sessions on the interface. Cause: Only the first page was retrieved or the application and session identifiers are inconsistent, and the total record count total does not match the actual number of messages.

## How to verify the setup

Acceptance of this function: Page through and retrieve all records according to the total record count total, sample one record to verify the role, reference information, and time, and confirm that the response `code` of 200 and `_id`, `dataId` and `value` are traceable.

Business test: Create an anomaly record, see whether the source material can be traced, and verify whether the name, quantity, date, and signature of the anomaly in the safety inspection checklist, hazard rectification ledger, and emergency incident report are consistent.

- Pull conversation records in pages by application and session dimension, pull two consecutive pages to compare the total record count total and offset, and confirm that the number of messages and the number of sessions are not the same quantity.
- Extract one anomaly record, verify the order of question and answer roles, reference information, and duration fields, and then compare item by item with the safety inspection checklist, hazard rectification ledger, and emergency incident report for name, quantity, date, and signature.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
