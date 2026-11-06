---
title: Conversation Records and Traceability for Research Outcome Registration and Intellectual Property: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c061-f007
page_type: 行业问题页
application_area: education
meta_title: Research IP | Chat Records | Operations
meta_description: Research IP: review chat records for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Research Outcome Registration and Intellectual Property: Coordinate Operations and Application Handover

## What this category's data looks like

This category's data covers three types of materials: achievement registration forms, patent disclosure documents, and software copyright materials. The sources are research management departments, inventors, legal affairs, and agencies, and the update cadence changes with filing, examination, and authorization milestones. Field characteristics include achievement name, contributors, date, quantity, signature, and receipt. When entering the conversation log and audit function, achievement registration forms handle achievement entries and contributor verification, patent disclosure documents handle technical solutions and inventor confirmation, and software copyright materials handle version and ownership records. In deployment, operations, and application handover, the three types of materials serve as sources of operation records, used to compare whether versions, connections, and task records are consistent.

## Configuration and implementation checks

This step is performed by the conversation record interface (by application and session dimension), outputting a session message list and total record count, including role and reference information. "Handover-ready deployment status and operation records" are then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Achievement registration form | Whether fields, dates, and signatures are consistent with the patent disclosure document | Verify the achievement name, contributors, date, quantity, signature, and receipt, and check whether the same record matches across the two materials |
| Patent disclosure document | Whether the inventor, technical solution, and date are consistent with the software copyright materials | Verify the inventor, technical solution, filing date, and signature, and check whether the version is synchronized and whether any receipt is missing |
| Software copyright materials | Whether the version, ownership, and date are consistent with the achievement registration form | Verify the version number, ownership, completion date, and signature, and check whether the name and quantity of the same record are consistent |
| Conversation record interface | Whether the total record count and status code are handover-ready | Page through by application and session dimension, verify `_id`, `dataId` and `value`, and confirm total and 200 |

## Three common errors

- Symptom: the name, quantity, and date of the same achievement do not match between the registration form and the disclosure document. Cause: the two materials were entered separately, without item-by-item comparison against the same record.
- Symptom: the version of the software copyright materials is not synchronized, and the handover form is missing a signature or receipt. Cause: after the version update, it was not written back to the registration form, and the signature step was not closed-loop.
- Symptom: the interface returns empty but there are sessions in the UI, or only the first page is retrieved. Cause: the application and session identifiers are inconsistent, and the pagination parameters did not page through all records according to the total record count.

## How to verify the setup

Acceptance for this feature: page through all records according to the total record count, sample one record to verify the role, reference information, and time, and confirm that `_id`, `dataId` and `value`, total, and 200 are consistent.

Business test: verify once item by item according to the handover form, and see which record item is missing.

- Pull records by application and session dimension, compare the total record count and offset, and confirm that question and answer each message has an identified role.
- Open one record to verify the reference and elapsed time fields, and check that the reference text tokens and array item count are recorded separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
