---
title: Conversation Records and Traceability for Enterprise Employee Skills Assessment: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c035-f007
page_type: 行业问题页
application_area: education
meta_title: Employee Skills | Chat Records | Review
meta_description: Employee Skills: review chat records for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Enterprise Employee Skills Assessment: Trace Exceptions and Review Results

## What this category's data looks like

This page addresses the enterprise independent skilled-talent evaluation category; the materials come from enterprise evaluation filing forms, evaluation specifications, and candidate rosters. The filing form records the evaluation agency, occupation name, level, and filing date; the evaluation specification records the assessment method, scoring criteria, and module weights; the roster records candidate names, ID numbers, declared occupations, and signature fields. The three types of materials enter the conversation logs and auditing function by batch; the filing form and evaluation specification serve as the evaluation basis, while the roster serves as the personnel list, each playing a different role. The update cadence adjusts with batches, and common fields include name, quantity, date, signature, and receipt. When the materials enter the function, the filing form and specification are used to check the evaluation criteria, the roster is used to check personnel and signatures, and conversation records serve only as session evidence and are not written into business ledgers.

## Configuration and implementation checks

This step is performed by the conversation record interface (by application and session dimension), which outputs the session message list and total record count, including role and reference information. The "exception list and review conclusion" is then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Enterprise evaluation filing form | Whether the occupation name, level, and filing date in the filing form are consistent with the corresponding fields in the evaluation specification and roster | Compare the filing form with the evaluation specification and roster item by item for name, quantity, date, and signature fields, and check whether signatures and receipts are complete |
| Evaluation specification | Whether the assessment method, scoring criteria, and module weights in the specification are synchronized with the batch information in the filing form and roster | Check the specification version number and effective date, confirm consistency with the batch dates in the filing form and roster, and record items whose versions are not synchronized |
| Candidate roster | Whether the candidate names, ID numbers, declared occupations, and signatures in the roster are consistent with the records in the filing form and evaluation specification | Check name, quantity, date, and signature one by one, mark records missing signatures or receipts, and form an exception list |
| Conversation record interface | Paginate by application and session dimension, returning the session message list and total record count, including role and reference information | Use `chatId` to check the session identifier, retrieve all pages and check total against response `code` of 200, and sample one record to check the `dataId` and `value` fields |

## Three common errors

- Symptom: the name, quantity, and date of the same record do not match between the filing form and the roster. Cause: the two materials are maintained separately and are not synchronized after batch changes, resulting in differences in field values.
- Symptom: the evaluation specification version is not synchronized, and the old scoring criteria are still in use. Cause: after the specification is updated, no receipt confirmation is made, and the filing form and roster still reference the old version.
- Symptom: the roster is missing signatures or receipts, and the review conclusion cannot be signed off. Cause: the material collection step is not closed-loop, the signature field is empty, and exception records lack support from original records.

## How to verify the setup

This function's acceptance: retrieve all pages by total record count, sample one record to check role, reference information, and time, confirm that total is consistent with response `code` of 200, record the reference count separately by array length, and check reference text tokens separately.

Business test: create an exception record, see whether the source material can be traced, check the fields, dates, and signatures of the filing form, evaluation specification, and roster, and form an exception list and review conclusion.

- Paginate and retrieve conversation records by application and session dimension, check that `chatId` is consistent with the actual session, compare total and offset across pages, and confirm that the record count matches.
- Sample one record to check the `dataId` and `value` fields, confirm that reference and duration fields are visible, and then compare name, quantity, date, and signature item by item with the filing form, evaluation specification, and roster.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
