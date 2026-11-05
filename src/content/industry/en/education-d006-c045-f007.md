---
title: Conversation Records and Traceability for Off-Campus Training Registration and Compliance: Track Progress and Check Statistics
slug: /en/industry/education-d006-c045-f007
page_type: 行业问题页
application_area: education
meta_title: Training Compliance | Chat Records | Progress
meta_description: Training Compliance: review chat records for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Off-Campus Training Registration and Compliance: Track Progress and Check Statistics

## What this category's data looks like

This category's data involves three types of materials: school operating license, course filing materials, and fee disclosure. The school operating license includes the institution name, address, validity period, and signature and seal; the course filing materials include the course name, class hours, teaching time, textbook version, and review signature; the fee disclosure includes fee items, amounts, refund rules, disclosure date, and receipt. The sources of the materials are the approval authority's receipt, the institution's internal filing form, disclosure photos, and ledgers. The update cadence is weekly or monthly aggregation, with immediate supplementary entry when there are changes or inspections. When the materials enter the conversation logs and audit function, their roles differ: the license and disclosure serve as the compliance baseline, while course filing serves as the process basis; together, the three support progress records and statistical verification. The field characteristics are that the name, quantity, and date of the same record may be inconsistent across two materials, versions are not synchronized, and signatures or receipts are missing.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), outputting the session message list and total record count, including role and reference information. The "progress table and statistical scope description" is then completed manually or by an external system. The message list is not a version ledger of business materials; it serves only as session evidence.

| Object | Check | Verification action |
| --- | --- | --- |
| School operating license | Institution name, address, validity period, and signature and seal are complete, and the date is consistent with the filing form | Check the source of the application and session identifiers in the request parameters, and open a record to view the role field and reference information |
| Course filing materials | Course name, class hours, teaching time, and review signature match, and the version is synchronized | Pull two pages in succession to compare the total record count and offset, and check whether the role field matches the original conversation between question and answer |
| Fee disclosure | Fee items, amounts, refund rules, disclosure date, and receipt have no omissions | Open a record to check the reference and duration fields, and confirm that the number of references equals the array length |
| Conversation record interface | The total record count matches the number of paginated items, and the status code is 200 | Page through by total record count to retrieve all records, and sample one record to check the role, reference information, and time |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the license and course filing. Cause: The two materials are registered separately, without cross-checking and a unified scope.
- Symptom: The version of the course filing materials is not synchronized, and the old version is still in use. Cause: The ledger was not updated in time after changes, and the version number and effective date were not marked.
- Symptom: The fee disclosure lacks a signature or receipt and cannot be traced. Cause: The signed document was not collected after disclosure, the receipt was not archived, and it cannot be provided during inspection.

## How to verify the setup

This function's acceptance: page through by total record count to retrieve all records, sample one record to check the role, reference information, and time, confirm that the `_id`, `dataId` and `value` fields exist, and the status code is 200.

Business test: use one week of records to verify the total, check whether the scope and exceptions are clearly stated, and verify whether the total record count is consistent with the statistical count.

- Pull pages by application and session dimension, pull two pages in succession to compare the total record count and offset, and confirm that the number of records matches the total.
- Open a single record to check the role field, reference and duration fields, record the number of references separately by array length, and verify the tokens of the reference text separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
