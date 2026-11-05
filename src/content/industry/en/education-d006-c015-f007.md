---
title: Conversation Records and Traceability for School Mental Health Screening and Referrals: Track Progress and Check Statistics
slug: /en/industry/education-d006-c015-f007
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | Chat Records | Progress
meta_description: Student Mental Health: review chat records for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for School Mental Health Screening and Referrals: Track Progress and Check Statistics

## What this category's data looks like

This page addresses the scenario of mental health screening and referral in primary and secondary schools. The materials come from three types of business materials: psychological screening plans, interview records, and referral forms. The screening plan provides scales and determination fields; the interview records carry the interview date, interviewer, interviewed student, signature, and receipt; the referral form carries the referral destination, referral date, and receiving party's receipt. These materials are updated weekly or monthly, and the fields are mainly names, quantities, dates, and signatures. When entering the conversation record function, the screening plan, interview records, and referral forms serve only as sources of session evidence. The conversation record interface retrieves the session message list and total record count by application and session dimensions. Based on this, manual staff or external systems register the progress table and statistical scope description, and complete review and destination registration.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimensions), outputting the session message list and total record count, including role and citation information. The "progress table and statistical scope description" is then completed by manual staff or external systems.

| Object | Check | Verification action |
| --- | --- | --- |
| Psychological screening plan | The plan name, version date, screening dimensions, and determination scope should be consistent with the interview records and referral forms | Check the plan name and version date, page through to retrieve the full total record count, sample one record to check the role, citation information, and time |
| Interview records | The interview date, interviewer, interviewed student, signature, and receipt should match the screening plan and referral forms | Check the source of `chatId` in the request parameters, pull two consecutive pages to compare the total record count total and offset, and observe the order of the two role types in the returned list |
| Referral form | The referral destination, referral date, and receiving party's receipt should be consistent with the interview records and the screening plan name and quantity | Open one record to check `dataId` and `value`, confirm the citation and elapsed time fields, and check whether the signature or receipt is complete |
| Conversation record interface | The total record count is the number of message records, which is not the same quantity as the number of business sessions; response `code` of 200 indicates a successful request | Page through to retrieve all records by total record count, check that the number of citations equals the array length, record citation text tokens separately, and do not compare them for equality with `quoteMaxToken` |

## Three common errors

- Symptom: The same student's name, quantity, and date do not match between the screening plan and the interview records. Cause: The two materials are registered separately and are not checked against the same scope.
- Symptom: The referral form version is not synchronized, and the receiving party's receipt is missing. Cause: After the materials were updated, they were not written back, and the signature and receipt were not archived together with the version.
- Symptom: The interface returns empty but there are sessions in the interface, or only the first page is retrieved. Cause: The sources of the application and session identifiers are inconsistent, and the pagination offset is not pulled continuously.

## How to verify the setup

This feature's acceptance: page through to retrieve all records by total record count total, sample one record to check the role, citation information, and time, confirm response `code` of 200, and check the message identifiers and content fields `_id`, `dataId` and `value`.

Business test: use one week of records to check the totals, see whether the scope and exceptions are clearly written, and check whether the names, quantities, dates, and signatures of the screening plan, interview records, and referral forms are consistent.

- Pull pages by application and session dimensions, pull two consecutive pages to compare the total record count total and offset, and confirm that the number of records matches the total.
- Open one record to check the role, citation, and elapsed time fields, check that the number of citations equals the array length, and record citation text tokens separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
