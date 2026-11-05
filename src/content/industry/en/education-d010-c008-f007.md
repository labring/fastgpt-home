---
title: Conversation Records and Traceability for School Admissions and Enrollment Organization: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c008-f007
page_type: 行业问题页
application_area: education
meta_title: School Admissions | Chat Records | Operations
meta_description: School Admissions: review chat records for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for School Admissions and Enrollment Organization: Coordinate Operations and Application Handover

## What this category's data looks like

This page addresses three types of materials for primary and secondary school admissions organizations: admission plans, application material lists, and admission lists. The admission plan contains batches, time nodes, and responsible signatures; the application material list contains student names, ID numbers, material names and quantities, and receipt dates; the admission list contains admission batches, names, list sequence numbers, and public announcement signatures. Materials are updated by admission season, with one version formed at each batch's application deadline and admission public announcement. Fields are characterized by names, quantities, dates, and signatures. When entering the conversation record function, the admission plan serves as the business context of the application to which the session belongs, while the application material list and admission list serve as the objects to be checked item by item in the session, used to compare whether the names, quantities, and dates of the same record are consistent across the two materials, and to check versions and signature receipts.

## Configuration and implementation checks

This step is performed by the conversation record interface (by application and session dimension), which outputs the session message list and total record count, including roles and reference information. "Handover-ready deployment status and operation records" are then completed manually or by an external system. The message list is not a version ledger of business materials; it serves only as session evidence for registration and review.

| Object | Check | Verification action |
| --- | --- | --- |
| Conversation record interface (by application and session dimension) | The application and session identifiers are consistent with the actual application and actual session | Check the sources of the two identifiers in the request parameters, confirm that `chatId` corresponds to the actual session, and after paging through all records, verify the total record count total and response `code` of 200 |
| Admission plan | Batches, time nodes, and responsible signatures are consistent between the plan and the handover form | Compare the batches, dates, and signatures in the plan item by item; record any missing signature or receipt in the handover form for supplementation |
| Application material list | Student names, ID numbers, material names, and quantities match across the two materials | Check names, quantities, and receipt dates item by item according to the list, open a single record to verify `dataId` and reference information |
| Admission list | Admission batches, names, list sequence numbers, and public announcement signatures are consistent with the application material list | Verify list sequence numbers and names, compare public announcement dates and signatures, and mark discrepancies for versions that are not synchronized |

## Three common errors

- Symptom: The names, quantities, and dates of the same record do not match between the admission plan and the application material list. Cause: The two materials are registered separately, without field-by-field comparison against the same record.
- Symptom: The admission list version is not synchronized, and the handover form still references the old version. Cause: After the version update, the effective date and signature receipt were not marked on the handover form.
- Symptom: The interface returns empty but there are sessions in the interface, or only the first page is retrieved. Cause: The pagination parameters were not pulled across two pages to compare the total count and offset, and the sources of the application and session identifiers are inconsistent.

## How to verify the setup

Acceptance of this function: page through all records according to the total record count, sample one record to verify the role, reference information, and time, confirm that a single record in `value` shows references and elapsed time, and verify the total record count total and response `code` of 200.

Business test: check once item by item according to the handover form, see which record is missing, and compare the fields, dates, and signatures of the admission plan, application material list, and admission list.

- Pull two pages consecutively to compare the total record count and offset, confirm that the two role types, question and answer, appear alternately, and separately record the number of references and the tokens of the reference text.
- Check the names, quantities, dates, and signatures of the admission plan, application material list, and admission list item by item according to the handover form; supplement any missing signature or receipt before handover.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
