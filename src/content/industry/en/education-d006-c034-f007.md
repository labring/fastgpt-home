---
title: Conversation Records and Traceability for Public Vocational Skills Level Assessment: Track Progress and Check Statistics
slug: /en/industry/education-d006-c034-f007
page_type: 行业问题页
application_area: education
meta_title: Skills Certification | Chat Records | Progress
meta_description: Skills Certification: review chat records for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Public Vocational Skills Level Assessment: Track Progress and Check Statistics

## What this category's data looks like

The materials for progress records and statistical verification of social evaluation of vocational skill level certification include the evaluation implementation plan, candidate registration forms, assessor dispatch forms, as well as progress tables and statistical scope descriptions in weekly or monthly reports. The implementation plan gives the evaluation occupation, level, batch, and date arrangements; the registration form carries the candidate's identity, declared level, and signature; the dispatch form carries the assessor's division of work, arrival date, and signature. The three types of materials are updated by batch, and the fields include name, quantity, date, signature, and receipt. When entering the conversation record function, the materials themselves are not written into the interface; the interface only provides conversation evidence by application and session dimensions, for manual or external system registration, export, and review, forming progress tables and statistical scope descriptions.

## Configuration and implementation checks

This part is executed by the conversation record interface (by application and session dimensions), outputting the session message list and total record count, including role and reference information. The progress table and statistical scope description are then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Evaluation implementation plan | The name, quantity, date, and signature are consistent between the plan and the progress table, and the scope is written in the header | Retrieve the plan fields by batch, compare them item by item with the progress table, and check the signature and receipt |
| Candidate registration form | The name, quantity, and date of the same candidate match in the two materials, and the versions are synchronized | Sample one registration record, check the declared level and signature, and then compare it with the statistical scope description |
| Assessor dispatch form | The assessor's division of work, arrival date, and signature are complete; if a signature or receipt is missing, mark it as an exception | Check the signature column of the dispatch form, compare it with the progress table totals, and record exception items |
| Conversation record interface | The total record count matches the statistical count, and the role and reference information are queryable | Page through to retrieve all records by total record count, and check `_id`, `dataId` and `value`, and response `code` of 200 |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match in the two materials. Cause: The scope was not unified during registration, and the progress table and statistical scope description were not written in the header.
- Symptom: The versions are not synchronized, and the fields of the plan, registration form, and dispatch form are inconsistent. Cause: The update rhythms differ, and the old version was not voided, causing the totals to fail to match.
- Symptom: Signatures or receipts are missing, and the record count is less than the statistical count. Cause: Receipts were not collected during the material circulation process, and exception items were not marked in the progress table.

## How to verify the setup

This function's acceptance: page through to retrieve all records by total record count, sample one to check the role, reference information, and time, confirm that response `code` of 200 is consistent with the total record count, and check `_id`, `dataId` and `value`.

Business test: use one week of records to check the totals, and see whether the scope and exceptions are clearly written.

- Paginate by application and session dimensions, pull two consecutive pages, and compare the total record count and offset.
- Open one record to check the role field, reference information, and duration field, and register exception items.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
