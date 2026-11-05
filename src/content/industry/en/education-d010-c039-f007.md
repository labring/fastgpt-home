---
title: Conversation Records and Traceability for Exam Organization and Misconduct Handling: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c039-f007
page_type: 行业问题页
application_area: education
meta_title: Exam Administration | Chat Records | Operations
meta_description: Exam Administration: review chat records for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Exam Organization and Misconduct Handling: Coordinate Operations and Application Handover

## What this category's data looks like

Materials in the exam organization and violation handling category include three types: exam administration manuals, examination room record sheets, and violation fact records. The exam administration manual specifies processes and field templates, examination room record sheets register candidates and abnormal situations by session, and violation fact records are filed as independent items with signatures and receipts attached. The material source is the current exam scheduling and examination room execution, the update cadence is aggregated by session or by day, and field characteristics include session number, candidate identifier, abnormal description, date, signature, and receipt. When entering the conversation logs and auditing feature, the exam administration manual serves as the field specification and version baseline, examination room record sheets provide raw entries per session, and violation fact records provide independent fact items requiring review; the three respectively correspond to specifications, entries, and facts, for the interface to pull by application and session dimension, after which manual staff or external systems register, export, and review accordingly.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), outputting a session message list and total record count, including role and reference information. The handover-ready deployment status and operation records are then completed by manual staff or external systems. The message list is not a version ledger of business materials; it serves only as conversation evidence.

| Object | Check | Verification action |
| --- | --- | --- |
| Exam administration manual | Fields and date specifications must be aligned item by item with the examination room record sheets and violation fact records, with consistent version numbers | Pull conversation records by `chatId`, verify the role, reference information, and time in `value`, and fill in the manual version column |
| Examination room record sheet | The name, quantity, and date of the same record must be consistent across the three materials, with complete signatures and receipts | Pull two consecutive pages and compare total with the offset, and sample one entry to verify `dataId` and the number of references |
| Violation fact record | The fact description, date, signature, and receipt must be from the same source as the examination room record sheet, with no missing items | Retrieve all records by application and session dimension, and verify the alternating order of roles and the tokens of the referenced text |
| Deployment status and operation records | Version, connection, and task records must be consistent, and each item on the handover form must be verifiable | Verify response `code` of 200 and the total record count total against the handover form, and confirm there are no missing pages or missing signatures |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the exam administration manual and the examination room record sheet. Cause: The two materials are registered separately, without backfilling and verification by the same session number.
- Symptom: The violation fact record is missing a signature or receipt, making it impossible to confirm at handover. Cause: Registration and review belong to different shifts, and receipts were not archived in sync with the records.
- Symptom: The interface returns empty but there are sessions on the interface, or only the first page is retrieved. Cause: The sources of the application and session identifiers are inconsistent, and the pagination offset was not pulled continuously.

## How to verify the setup

Feature acceptance: page through by total record count to retrieve everything, sample one entry to verify the role, reference information, and time, and confirm that response `code` of 200 and total match.

Business test: verify each item on the handover form once, and see which record item is missing.

- Verify the source of the application and session identifiers in the request parameters, and confirm they are consistent with the actual application and actual session.
- Pull two consecutive pages and compare the record count with the total, checking whether the offset is continuous and whether roles appear alternately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
