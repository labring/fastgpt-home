---
title: Conversation Records and Traceability for School Mental Health Screening and Referrals: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c015-f007
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | Chat Records | Versions
meta_description: Student Mental Health: review chat records for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for School Mental Health Screening and Referrals: Maintain Document Versions and Changes

## What this category's data looks like

This page addresses the scenario of mental health screening and referral in primary and secondary schools. Materials include psychological screening plans, interview records, and referral forms. Fields involve name, class, screening scale score, interview date, referral reason, signature, and receipt. Sources are school psychological centers and homeroom teacher reports, and the update cadence rolls with semester screening, re-evaluation, and referral processes. When materials enter the conversation log and auditing function, the screening plan serves as the basis for determination, while interview records and referral forms serve as process evidence. Each is retained in the form of session messages, with roles distinguishing questions and answers, and citation information marking the source of materials. The version ledger and change records are registered accordingly by humans or external systems, ensuring the current version is unique, old versions are traceable, and citations are synchronized.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), outputting a session message list and total record count, including roles and citation information. The "version ledger and change records" are then completed by humans or external systems.

| Object | Check | Verification action |
| --- | --- | --- |
| Psychological screening plan | Whether fields, dates, and signatures are complete, and whether the version number is unique | Check the scale name, screening date, and signature field in the plan, and compare the current version number in the knowledge base with the citation source |
| Interview record | Whether the name, count, and date of the same record are consistent across the two materials | Extract one interview record, check the `_id`, `dataId` and `value` fields, and compare the date and number of people in the referral form |
| Referral form | Missing signature or receipt, version not synchronized | Check the signature and receipt fields of the referral form, verify the number of citations and the `quoteMaxToken` budget, and record the array length separately |
| Conversation record interface | Whether the total record count and status code are normal | Paginate through all records by total count, confirm response `code` of 200, and sample one record to check role, citation information, and time |

## Three common errors

- Symptom: The name, count, and date of the same interview record do not match between the screening plan and the referral form. Cause: The two materials are registered separately, and the citation information from the conversation record interface is not used for cross-checking.
- Symptom: The referral form lacks a signature or receipt, and the version is not synchronized. Cause: When updating the knowledge base or external documents, only one place is changed, the old version is still cited, and the signature field is not updated with the version.
- Symptom: The interface returns empty but there are sessions in the UI. Cause: The application and session identifiers come from inconsistent sources, or only the first page is retrieved without paginating through all records by total count.

## How to verify the setup

This feature's acceptance: paginate through all records by total count, sample one record to check role, citation information, and time, confirm response `code` of 200, and check the `_id`, `dataId` and `value` fields.

Business test: change one piece of content, see whether the version number and citations are updated synchronously, and confirm the current version is unique, old versions are traceable, and citations are synchronized.

- Pull two consecutive pages and compare the total record count and offset to confirm the pagination parameters match the total count.
- Open one record to check the citation and latency fields, verify the number of citations equals the array length, and record the citation text tokens separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
