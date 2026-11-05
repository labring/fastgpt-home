---
title: Conversation Records and Traceability for Enterprise Employee Skills Assessment: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c035-f007
page_type: 行业问题页
application_area: education
meta_title: Employee Skills | Chat Records | Operations
meta_description: Employee Skills: review chat records for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Enterprise Employee Skills Assessment: Coordinate Operations and Application Handover

## What this category's data looks like

Enterprise independent skilled talent evaluation relies on three types of materials: filing forms, evaluation specifications, and candidate rosters. Fields include name, trade, level, date, and signature, with updates by batch or year. When the materials enter the conversation logs and auditing function, the filing form provides the evaluation institution and occupation name, the evaluation specifications provide assessment modules and scoring criteria, and the roster provides candidate identity and application relationships. Together, the three form a traceable session evidence chain.

## Configuration and implementation checks

The conversation record interface (by application and session dimension) only outputs the session message list and total record count, including role and reference information. The handover-ready deployment status and operation records must be continued manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Enterprise evaluation filing form | Institution name, occupation name, filing date, and signature must be consistent with the evaluation specifications | Check the institution and occupation fields in the evaluation specifications item by item against the filing form, and verify signatures and receipts |
| Evaluation specifications | Assessment modules, scoring criteria, and version date must correspond to the roster batch | Compare the specification version date with the roster batch date, and check for missing signatures or receipts |
| Candidate roster | Candidate names, trades, levels, and counts must be consistent with the filing form | Check the number of people in the filing form against the roster count, and verify dates and signatures |
| Conversation record interface | Paginate by application and session dimension, returning the total record count and role field | Use `chatId` to locate the session, page through to retrieve all records, and verify `dataId` and `value` |

## Three common errors

- Symptom: The same candidate name does not match in count between the roster and the filing form. Cause: The two materials are updated on different schedules, and one side was not synchronized.
- Symptom: The evaluation specification version date is inconsistent with the roster batch date. Cause: The version was not synchronized, and the old specification version is still in use.
- Symptom: The filing form is missing signatures or receipts. Cause: During handover, the signature fields and receipt records were not checked item by item.

## How to verify the setup

Acceptance of this function: Page through to retrieve all records according to the total record count, sample one record to verify the role, reference information, and time, confirm response `code` of 200, ensure the total record count matches the list length, record the number of references separately by array length, and verify the reference text tokens separately.

Business test: Check item by item once according to the handover list, see which item record is missing, and verify the fields, dates, and signatures of the filing form, evaluation specifications, and roster.

- Use `chatId` to locate the session, page through to retrieve all records, verify the total record count and offset, and confirm response `code` of 200.
- Sample one record to verify the role, reference information, and time, and verify `dataId` and `value`.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
