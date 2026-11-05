---
title: Conversation Records and Traceability for School Mental Health Screening and Referrals: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c015-f007
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | Chat Records | Review
meta_description: Student Mental Health: review chat records for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for School Mental Health Screening and Referrals: Trace Exceptions and Review Results

## What this category's data looks like

This page addresses the scenario of mental health screening and referral in primary and secondary schools, with materials drawn from three types: psychological screening plans, interview records, and referral forms. The screening plan provides the scale name, screening date, and a signature field for the responsible teacher; the interview record carries the student's name, interview time, chief complaint, and the interviewer's signature; the referral form records the referral subject, referral date, receiving party, and receipt signature. When these three types of materials enter the exception tracing and manual review function, the screening plan serves as the basis for exception determination, the interview record serves as the original record support for the exception, and the referral form serves as the disposition destination voucher. Materials are updated according to the semester screening rhythm, entered in a concentrated manner after each screening, and referral forms are supplemented at any time as individual cases progress. Field characteristics are concentrated in four items: name, quantity, date, and signature. The same record should maintain consistent names, consistent quantities, connected dates, and complete signatures across the three materials, and the version is based on the latest screening batch.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), outputting a session message list and the total number of records, including role and reference information. The "exception list and review conclusion" is then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Psychological screening plan | The three items of scale name, screening date, and responsible teacher signature match between the plan and the interview record, and the version is the latest screening batch | Pull records by application and session dimension, verify the correspondence between `chatId` and `value`, turn to the last page indicated by total, and sample one entry to compare the plan date with the interview date |
| Interview record | The student's name, interview time, chief complaint, and interviewer signature are complete, and the name, quantity, and date of the same record are consistent across the plan and the referral form | Open a single record to verify the role field and reference information, confirm that message roles correspond to the original conversation, record the number of references separately by array length, verify the reference text tokens separately, and do not compare `quoteMaxToken` |
| Referral form | The referral subject, referral date, receiving party, and receipt signature are complete, and the name, quantity, and date connect with those in the interview record | Use `dataId` to locate a single message, verify the order of the referral date and interview date, check whether the receipt signature field is empty, and when the status code is 200 confirm that the returned list is non-empty |
| Exception list and review conclusion | Exceptions are supported by original records, the reviewer's signature is complete, and the source materials can be traced | Trace back from the exception list to the interview records and referral forms, confirm that each exception corresponds to at least one original record, and register the total number of records and the number of list entries separately |

## Three common errors

- Phenomenon: The name or quantity of the same student does not match between the screening plan and the interview record. Cause: When entering data, records were not merged by the same student identifier; the two materials were registered independently, lacking a cross-check step.
- Phenomenon: The referral form date is earlier than the interview record date, or the version is not synchronized. Cause: The referral form was supplemented before the interview, the old version was not voided, the new version did not overwrite it, and the date field was not validated for order.
- Phenomenon: The exception list has a conclusion but lacks the reviewer's signature or receipt. Cause: The review process only registered the conclusion without leaving a signature field, the receipt was archived before being collected, and signatures and receipts were not included as required items in the exception list.

## How to verify the setup

This function's acceptance: paginate through all records according to the total number of records, sample one entry to verify the role, reference information, and time, confirm the status code is 200 and the list is non-empty, record the number of references by array length, verify the reference text tokens separately, and do not perform an equality comparison with `quoteMaxToken`.

Business test: create an exception record, see whether the source materials can be traced, and verify whether the four items of name, quantity, date, and signature are consistent between the interview record and the referral form.

- Pull two consecutive pages and compare total with the offset to confirm that the number of records matches the total, avoiding retrieving only the first page.
- Open a record and verify the message identifiers and content fields `_id`, `dataId` and `value` to confirm consistency with the actual application and actual session.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
