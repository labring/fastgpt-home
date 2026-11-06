---
title: Conversation Records and Traceability for Student Discipline and Appeals: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c023-f007
page_type: 行业问题页
application_area: education
meta_title: Student Appeals | Chat Records | Review
meta_description: Student Appeals: review chat records for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Student Discipline and Appeals: Trace Exceptions and Review Results

## What this category's data looks like

This page addresses the student disciplinary and appeal handling category. The materials include three types: disciplinary fact materials, disciplinary decision documents, and appeal letters. Disciplinary fact materials record the time, location, involved persons, and quantity of items, and are usually filled in by counselors or the student affairs department; disciplinary decision documents state the disciplinary level, the clauses relied upon, the effective date, and the issuer's signature; appeal letters are submitted by students and include the appeal request, factual grounds, submission date, and receipt. The three types of materials correspond to one another in fields, dates, and signatures. When they enter the conversation logs and auditing function, they serve respectively as original evidence, decision basis, and appeal process records for exception tracing and manual review. Materials are updated by semester or event batch. It is common for the same record to have inconsistent names, quantities, or dates across two materials, for versions not to be synchronized, and for signatures or receipts to be missing.

## Configuration and implementation checks

This step is performed by the conversation record interface (by application and session dimension), which outputs a session message list and the total number of records, including role and reference information. The "exception list and review conclusions" are then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Disciplinary fact materials | Names, quantities, and dates match the disciplinary decision document item by item, and signatures are complete | Take one exception record, check the names, quantities, and dates in the materials, and compare them with the corresponding fields and signatures in the disciplinary decision document |
| Disciplinary decision document | The disciplinary level, clauses relied upon, and effective date correspond to the appeal letter receipt | Open the disciplinary decision document, check the level, clauses, and date, then check whether the appeal letter receipt is synchronized |
| Appeal letter | The appeal request, factual grounds, submission date, and receipt are complete | Pull the session messages by `chatId`, check the appeal letter fields and receipt, and confirm there are no missing items |
| Conversation record interface output | The total number of records total matches response `code` of 200, and role and reference information are queryable | Pull two pages consecutively and compare total with the offset, sample one record to check the role, reference information, and elapsed time, record the reference count separately by array length, and check the tokens of the reference text separately |

## Three common errors

- Symptom: The names, quantities, and dates of the same record do not match between the disciplinary fact materials and the disciplinary decision document. Cause: The two materials are registered separately without cross-checking.
- Symptom: The version of the disciplinary decision document is not synchronized, and the appeal letter cites clauses from an old version. Cause: After the materials are updated, the associated records are not written back, and the version number is missing.
- Symptom: The appeal letter lacks a signature or receipt, and the issuer field of the disciplinary decision document is blank. Cause: No signature verification is set in the circulation step, and receipts are not archived.

## How to verify the setup

Pull records by application and session identifier, check that `chatId` matches the actual session, and inspect the pagination parameters and total.

Open a single record, check the role field, reference information, and elapsed time, and confirm that the reference count and the `quoteMaxToken` budget are recorded separately.

- This feature's acceptance: page through by the total number of records to retrieve all of them, sample one record to check the role, reference information, and time, confirm that the total number of records total matches response `code` of 200, record the reference count separately by array length, and use `dataId` and `value` to locate a single record.
- Business test: create one exception record and see whether the source material can be traced.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
