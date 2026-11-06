---
title: Conversation Records and Traceability for Vocational College Skills Competition Organization: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c033-f007
page_type: 行业问题页
application_area: education
meta_title: Skills Competitions | Chat Records | Versions
meta_description: Skills Competitions: review chat records for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Vocational College Skills Competition Organization: Maintain Document Versions and Changes

## What this category's data looks like

Vocational college skills competition organization involves three types of materials: competition regulations, registration forms, and training plans. Each type has field, date, and signature requirements. Competition regulations include event name, group, time and location, scoring criteria, and signature field; registration forms include contestant name, ID number, student status number, competition event, supervising instructor, date, and receipt; training plans include phase objectives, class hour arrangements, supervising instructor signature, and date. The material sources are the school's academic affairs and competition affairs departments, and the update rhythm is centralized revision before the competition, temporary adjustment during the competition, and archiving after the competition. When entering the conversation logs and auditing function, the three types of materials each serve as sources of session evidence: regulations are used to verify events and times, registration forms are used to verify personnel and events, and training plans are used to verify phases and signatures. The name, quantity, or date of the same record not matching across two materials, versions not being synchronized, and missing signatures or receipts are common inconsistencies.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), which outputs a session message list and total record count, including role and reference information. The "version ledger and change records" are then completed manually or by an external system. The interface only retrieves session evidence and does not write business ledgers.

| Object | Check | Verification action |
| --- | --- | --- |
| Competition regulations | The event name, group, time and location, scoring criteria, and signature field are internally consistent within the regulations and match the registration form and training plan | Pull records by application and session identifier, verify that `chatId` matches the actual session, and compare regulation fields and reference information item by item |
| Registration form | Contestant name, ID number, student status number, competition event, supervising instructor, date, and receipt are complete, and the name, quantity, and date of the same record do not conflict | Retrieve all records by pagination, verify `dataId` and role fields, and check that registration form entries correspond to regulation events |
| Training plan | Phase objectives, class hour arrangements, supervising instructor signature, and date are complete, and the version number and references are updated in sync | Open a single record to verify the reference and duration fields in `value`, and confirm that the training plan version number matches the number of references |

## Three common errors

- Phenomenon: the name or quantity of the same contestant does not match across two materials. Cause: the registration form and training plan were revised separately without cross-checking, and the field sources are not synchronized.
- Phenomenon: the competition regulations have changed the time, but the registration form and training plan still use the old date. Cause: versions are not synchronized, the old version is not marked invalid, and references still point to old content.
- Phenomenon: the training plan lacks the supervising instructor signature or the registration form lacks the receipt. Cause: no signature and receipt checkpoints were set in the material circulation process, and no review was performed before archiving.

## How to verify the setup

This function's acceptance: paginate through all records according to the total record count total, and when the status code is 200, sample one record to verify the role, reference information, and time, confirm that the number of references in `value` equals the array length, and record the tokens of the reference text separately.

Business test: change one piece of content and see whether the version number and references are updated in sync.

- Pull two pages consecutively and compare total with the offset to confirm that the number of records matches the total, avoiding retrieving only the first page.
- Open one record to verify the role field and the reference and duration fields, and confirm that message roles correspond to the original conversation and that the number of references is recorded separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
