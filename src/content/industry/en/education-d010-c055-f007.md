---
title: Conversation Records and Traceability for Adult College Entrance Applications and Admissions: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c055-f007
page_type: 行业问题页
application_area: education
meta_title: Adult Admissions | Chat Records | Operations
meta_description: Adult Admissions: review chat records for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Adult College Entrance Applications and Admissions: Coordinate Operations and Application Handover

## What this category's data looks like

This category's data falls into three types of materials: registration forms, care bonus-point materials, and admission rosters. A registration form contains the candidate's basic information, application level and subject category, registration serial number, confirmation date, and handler's signature; care bonus-point materials contain the bonus item name, certificate number, review opinion, review date, and reviewer's signature; an admission roster contains the admission serial number, major name, planned number, admitted number, admission date, and responsible person's signature. The three types of materials each play a different role in the system: the registration form is the basis for basic identity and application, care bonus-point materials are the basis for eligibility and score value, and the admission roster is the basis for results and archiving. Materials are entered centrally by registration season, updated in batches during the review period, and finalized and archived after admission. The field characteristic is that multiple tables cross-reference the same candidate, and names, quantities, dates, and signatures must be aligned item by item.

## Configuration and implementation checks

This link is executed by the conversation record interface (by application and session dimension), outputting a session message list and total record count, including role and reference information. The handover-ready deployment status and operation records are then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Registration form | The registration serial number, name, application level and subject category, confirmation date, and handler's signature are complete within the form, and are consistent with the name, quantity, and date of the same candidate in the care bonus-point materials and admission roster | Check the sources of the two identifiers, application and session, in the request parameters, and compare the name, quantity, date, and signature of the registration form against the other two materials item by item |
| Care bonus-point materials | The bonus item name, certificate number, review opinion, review date, and reviewer's signature are complete within the materials, and are consistent with the name, quantity, and date of the same candidate in the registration form and admission roster | Pull two pages in succession to compare the total record count and offset, open one record to check the role field, references, and elapsed time, and confirm that the dates and signatures of the bonus-point materials match those of the registration form and admission roster |
| Admission roster | The admission serial number, major name, planned number, admitted number, admission date, and responsible person's signature are complete within the roster, and are consistent with the name, quantity, and date of the same candidate in the registration form and care bonus-point materials | Check the order of the two role types, question and answer, in the returned list, and check whether the name, quantity, date, and signature of the roster are consistent item by item with those of the registration form and care bonus-point materials |
| Conversation record | When pulling pages by application and session dimension, the returned results distinguish the two role types, question and answer, and carry reference and elapsed-time fields | Check the source of `chatId` in the request parameters, sample one record to check `dataId` and `value`, and confirm the total record count total and response `code` of 200 |

## Three common errors

- Symptom: The name or registration serial number of the same candidate does not match between the registration form and the admission roster. Cause: The two tables are entered separately and are not written back by the same registration serial number, resulting in inconsistent names, quantities, and dates.
- Symptom: Care bonus-point materials have a review opinion but lack the reviewer's signature or receipt. Cause: In the review step, the opinion is entered first and the signature is added later, and at handover the signature items are not checked item by item against the handover form.
- Symptom: The admission roster has been updated to a new version, while the registration form remains at the old version. Cause: The versions were not synchronized, and at handover only the connection and task records were checked, not the material version numbers.

## How to verify the setup

Acceptance of this feature: page through by total record count to retrieve all records, and sample one record to check the role, reference information, and time; check the message identifiers and content fields `_id`, `dataId` and `value`, confirm the total record count total and response `code` of 200, record the number of references separately by array length, and check the reference text tokens separately.

Business test: check once item by item against the handover form to see which item's record is missing; check whether the name, quantity, date, and signature of the registration form, care bonus-point materials, and admission roster are consistent item by item.

- Pull conversation records by page by application and session dimension, pull two pages in succession to compare the total record count and offset, and confirm the total record count total and response `code` of 200.
- Open one record to check the role field, references, and elapsed time, and check whether `_id`, `dataId` and `value` are consistent with the handover form.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
