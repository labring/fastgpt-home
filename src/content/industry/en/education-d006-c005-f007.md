---
title: Conversation Records and Traceability for Kindergarten Safety and Emergency Drills: Track Progress and Check Statistics
slug: /en/industry/education-d006-c005-f007
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Safety | Chat Records | Progress
meta_description: Kindergarten Safety: review chat records for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Kindergarten Safety and Emergency Drills: Track Progress and Check Statistics

## What this category's data looks like

The materials on this page are progress records and statistical verification for kindergarten safety protection and emergency drills, covering four types of records: hazard items and rectification deadlines, drill headcount and sign-in, access control and school bus inspection items, and responsible person signatures. The sources are daily registration forms within the week, drill plans and sign-in sheets, inspection checklists, and signature pages. The update rhythm is weekly aggregation and monthly review, with one round of verification completed before the weekly report. When the materials enter the conversation logs and auditing function, the registration forms and checklists serve as business working papers organized manually or by an external system, while the conversation record interface provides the session message list and total record count by application and session dimension. The two have different roles: the former is the source of business definitions, and the latter is the source of session evidence. Field characteristics include hazard number, rectification deadline, drill session, sign-in headcount, inspection item, signature status, and record time.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), outputting the session message list and total record count, including role and reference information. The "progress table and statistical definition description" is then completed manually or by an external system, for inclusion in the weekly or monthly report.

| Object | Check | Verification action |
| --- | --- | --- |
| Hazard items and rectification deadlines | Each hazard item has a rectification deadline and a traceable status; unclosed items are listed separately in the header definitions | Export the hazard list weekly, verify deadlines and closure status item by item, and confirm complete retrieval against the total record count total and response `code` of 200 |
| Drill headcount and sign-in | Drill records match the plan sessions and headcount; the sign-in sheet matches the statistical count | Take one week of drill records, verify the plan, sign-in, and totals by session, and write exceptions in the header definitions |
| Access control and school bus inspection items | No inspection items are missing, and each item has a responsible person's signature | Verify signatures item by item against the inspection checklist, retrieve all pages, then sample one record to verify role, reference information, and time |
| Session message records | The two roles of message roles correspond to the original conversation, and a single record shows references and elapsed time | Use `chatId` to locate the session, and open a single record by `dataId` and `value` to verify the reference and elapsed time fields |

## Three common errors

- Phenomenon: The hazard list shows rectification completed, but the weekly report total still includes unclosed items. Cause: The rectification deadline and closure status were not updated synchronously, and exceptions were not written in the header definitions.
- Phenomenon: The drill record headcount does not match the plan, and the sign-in sheet total does not match. Cause: Supplementary sign-ins and temporary adjustments were not backfilled into the plan, resulting in a discrepancy between the record count and the statistical count.
- Phenomenon: Access control and school bus inspection items are missing, and the signature page lacks the responsible person. Cause: The inspection checklist versions were not unified, and missing items were not marked and supplemented during the weekly verification.

## How to verify the setup

Acceptance of this function: retrieve all pages by total record count, sample one record to verify role, reference information, and time, and confirm that `_id`, `dataId` and `value` are consistent with the response.

Business test: use one week of records to verify the totals, check whether the definitions and exceptions are clearly written, and confirm that the record count matches the statistical count.

- Pull two consecutive pages and compare the total and offset to confirm that the number of records matches the total and the status code is 200.
- After exporting the weekly records, verify hazard closure, drill sign-in, and inspection item signatures, and write exceptions into the header definitions.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
