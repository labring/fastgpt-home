---
title: Conversation Records and Traceability for Public Vocational Skills Level Assessment: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c034-f007
page_type: 行业问题页
application_area: education
meta_title: Skills Certification | Chat Records | Review
meta_description: Skills Certification: review chat records for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Public Vocational Skills Level Assessment: Trace Exceptions and Review Results

## What this category's data looks like

This page addresses the scenario of social evaluation of vocational skill level certification. The materials include the evaluation implementation plan, candidate registration forms, and assessor dispatch forms. These materials come from evaluation institutions and test sites and are updated by batch or certification cycle. The fields cover candidate name, ID number, occupation (work type), level, assessor name and certificate number, date, and signature. When entering this function, the evaluation implementation plan provides framework information such as batch and occupation level, the candidate registration form provides candidate identity and application information, and the assessor dispatch form provides assessor dispatch and signature information. Together, the three constitute the source materials for exception tracing, used to compare whether the name, quantity, date, and signature of the same record are consistent, and to identify unsynchronized versions and missing signatures or receipts.

## Configuration and implementation checks

This step is performed by the conversation record interface (by application and session dimension), which outputs the session message list and the total number of records, including role and reference information. The "exception list and review conclusions" are then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Evaluation implementation plan | Whether the fields, dates, and signatures are consistent with the candidate registration form and the assessor dispatch form | Check the batch, occupation (work type), level, date, and signature; compare the name and quantity of the same record |
| Candidate registration form | Whether the fields, dates, and signatures are consistent with the evaluation implementation plan and the assessor dispatch form | Check the candidate name, ID number, declared occupation and level, date, and signature; compare quantity and date |
| Assessor dispatch form | Whether the fields, dates, and signatures are consistent with the evaluation implementation plan and the candidate registration form | Check the assessor name, certificate number, dispatch date, and signature; compare the name and quantity of the same record |
| Conversation record interface (by application and session dimension) | The total number of records matches the pagination parameters, and the role and reference information can be verified | Use `chatId` to pull the session message list, verify `dataId` and `value`, retrieve all pages, then sample one record to verify the role, reference, and time |

## Three common errors

- Symptom: the same candidate name is written differently in the registration form and the implementation plan. Cause: inconsistent entry sources or unsynchronized versions, resulting in mismatched names.
- Symptom: the assessor dispatch form lacks a signature or receipt. Cause: the dispatch process is not closed-loop, the signature step is omitted, and it cannot be confirmed that the dispatch took effect.
- Symptom: the dates or quantities in the registration form and the implementation plan do not match. Cause: materials are updated in batches and the old version is not replaced, resulting in inconsistent dates and quantities for the same record.

## How to verify the setup

This function's acceptance: paginate through all records according to the total record count total, and sample one record to verify the role, reference information, and time; the status code is 200, verified using `_id`, `dataId` and `value`.

Business test: create an exception record and see whether the source material can be traced

- Pull records by application and session dimension, verify the total record count and offset, and confirm that both pages are fully retrieved
- Open a record to verify the role, reference information, and duration field, and register the exception list and review conclusions

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
