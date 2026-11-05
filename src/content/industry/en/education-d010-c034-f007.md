---
title: Conversation Records and Traceability for Public Vocational Skills Level Assessment: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c034-f007
page_type: 行业问题页
application_area: education
meta_title: Skills Certification | Chat Records | Operations
meta_description: Skills Certification: review chat records for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Public Vocational Skills Level Assessment: Coordinate Operations and Application Handover

## What this category's data looks like

In the deployment, operations, and application handover of social evaluation of vocational skill level certification, the materials include the evaluation implementation plan, candidate registration forms, and assessor dispatch forms. The evaluation implementation plan states the certification occupation, level, time, and test site; the registration forms record candidate identity, declared level, and payment; the dispatch forms register assessor qualifications, sessions, and signatures. When these three types of materials enter the conversation log and auditing function, each plays a different role: the implementation plan provides the certification batch and process basis, the registration forms provide the candidate-dimension roster, and the dispatch forms provide the assessor attendance and signature evidence. Materials are updated by batch, and the field characteristics are date, quantity, name, signature, and receipt. If the name, quantity, or date of the same record does not match across two materials, the versions are not synchronized, or signatures or receipts are missing, the handover form will have missing items.

## Configuration and implementation checks

The conversation record interface (by application and session dimension) outputs only the session message list and the total record count, including role and reference information; the handover-ready deployment status and operation records must be continued manually or by an external system. This step only takes session evidence and does not write business ledgers; the number of messages and the number of sessions are not the same quantity.

| Object | Check | Verification action |
| --- | --- | --- |
| Evaluation implementation plan | The certification occupation, level, batch date, and assessor dispatch form and registration forms match item by item, and signatures and receipts are complete | Retrieve the implementation plan by batch, check dates, quantities, names, and signatures against the registration forms and dispatch forms, and record missing items in the handover form |
| Candidate registration forms | Candidate names, identities, and declared levels match the implementation plan batch, and the assessor dispatch form sessions correspond | Page through by session dimension to retrieve all records, compare the registration form roster with the dispatch form sessions, and check signatures and receipts |
| Assessor dispatch form | Assessor qualifications, sessions, and signatures match the dates in the implementation plan and registration forms, and versions are synchronized | Open a single record to check the role, reference information, and elapsed time, and use `_id`, `dataId` and `value` to locate session evidence |
| Conversation record interface | the total record count matches the accumulated pagination rows; check the response code separately, each message has an identified role, and reference and elapsed-time fields are visible | Pull two pages in succession to compare the total record count and offset, sample one record to check the role, reference information, and time, and record the reference count separately by array length |

## Three common errors

- Symptom: The name, quantity, or date of the same record does not match between the implementation plan and the registration forms. Cause: The two entries come from different sources and were not checked uniformly by batch.
- Symptom: The dispatch form version is not synchronized, and assessor sessions are misaligned with the implementation plan batch. Cause: The update cadence is inconsistent, and item-by-item comparison was not performed during handover.
- Symptom: The registration forms or dispatch forms lack signatures or receipts, and the handover form has missing items. Cause: No evidence was retained during material circulation, making it impossible to trace during review.

## How to verify the setup

This function's acceptance: page through by total record count to retrieve all records, sample one record to check the role, reference information, and time, and confirm the status code is 200.

Business test: check item by item once according to the handover form, see which record is missing, and add missing items to the next shift handover.

- Page through by application and session dimension, use `chatId` to check the session source, and pull two pages in succession to compare the total record count and offset.
- Open a single record to check the role, reference information, and elapsed time, use `dataId` and `value` to locate it, and record the reference count separately by array length.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
