---
title: Conversation Records and Traceability for Off-Campus Training Registration and Compliance: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c045-f007
page_type: 行业问题页
application_area: education
meta_title: Training Compliance | Chat Records | Operations
meta_description: Training Compliance: review chat records for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Off-Campus Training Registration and Compliance: Coordinate Operations and Application Handover

## What this category's data looks like

This category of off-campus training compliance filing and penalty response involves three core types of materials: the school operating license, course filing materials, and fee disclosure. The school operating license fields include institution name, address, validity period, and signature; the course filing materials fields include course name, class hours, instructor, and date; the fee disclosure fields include fee item, amount, refund rules, and signature. The material sources are the approval authority's receipt and the institution's own retained copies, and the update cadence is synchronization upon license changes, course adjustments, and fee adjustments. When entering the deployment, operations, and application handover stage, the school operating license is used to confirm the entity's qualifications, the course filing materials are used to check the course and record names and quantities, and the fee disclosure is used to check dates and signatures. If the name, quantity, or date of the same record does not match across the two materials, the versions are not synchronized, or a signature or receipt is missing, the handover form will have missing items.

## Configuration and implementation checks

A. This step is executed by the conversation record interface (by application and session dimension), outputting the session message list and total record count, including role and citation information. "Handover-ready deployment status and operation records" are then completed by a human or an external system. The conversation record interface pulls pages by application and session dimension, distinguishes the two role types of question and answer in the returned results, and includes citation and elapsed-time fields.

| Object | Check | Verification action |
| --- | --- | --- |
| Application and session identifiers | Consistent with the actual application and actual session | Check the source of `chatId` and `appId` in the request parameters, and confirm that the two identifiers correspond to the application and session on the handover form |
| Pagination parameters | The number of records matches the total record count | Pull two consecutive pages and check the total record count and advance the offset by the number of records retrieved, confirming that the status code is 200 and that only the first page was not retrieved |
| Role field | message roles correspond to the original conversation | Look at the order of the two role types in the returned list, and sample one record to check `dataId` against the role field |
| Citation and elapsed-time fields | A single record shows citation and elapsed time | Open one record and check the citation information and elapsed-time field in `value`; record the citation count separately by array length |

## Three common errors

- Symptom: The name, quantity, and date of the same course record do not match between the course filing materials and the fee disclosure. Cause: The two materials are updated separately and are not synchronized and checked against the same version.
- Symptom: The school operating license version is not synchronized, and the handover form still references the old version. Cause: After the license change, the deployment status and operation records were not backfilled, so the version was not synchronized.
- Symptom: The fee disclosure is missing a signature or receipt, and the handover form has missing items. Cause: The signature page and receipt were not collected during material circulation, so item-by-item verification was impossible at registration.

## How to verify the setup

Acceptance of this feature: Page through to retrieve all records by total record count, sample one record to check the role, citation information, and time, confirm that the status code is 200 and consistent with the total record count total, and record the citation count separately by array length.

Business test: Verify item by item once against the handover form, see which record item is missing, and confirm that the fields, dates, and signatures of the school operating license, course filing materials, and fee disclosure are complete.

- Verify item by item the application and session identifiers, pagination parameters, role field, and citation and elapsed-time fields on the handover form; mark missing items and hand them over to operations or the next shift.
- Check the fields, dates, and signatures of the school operating license, course filing materials, and fee disclosure; when names, quantities, or dates do not match, roll back the registration and recheck.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
