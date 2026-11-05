---
title: Conversation Records and Traceability for College Entrance Exam Application Eligibility: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c051-f007
page_type: 行业问题页
application_area: education
meta_title: Entrance Exam Eligibility | Chat Records | Versions
meta_description: Entrance Exam Eligibility: review chat records for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for College Entrance Exam Application Eligibility: Maintain Document Versions and Changes

## What this category's data looks like

This category's data involves three core types of materials: the college entrance examination registration form, household registration and student status certificates, and materials for children accompanying migrant workers. The college entrance examination registration form is filled in by the candidate and initially reviewed by the school, with fields including name, ID number, examination subject category, signature, and date; the household registration and student status certificates are issued by the public security authorities and the school, with fields including household registration address, student status number, start and end dates of enrollment, seal, and receipt; the materials for children accompanying migrant workers are provided by parents and relevant departments, with fields including residence permit number, social insurance payment records, proof of parent-child relationship, and signature. The pace of material updates advances with review batches, and common changes include information corrections, supplementary certificates, and version replacements. When the three types of materials enter the conversation log and audit function, each participates as an independent record in the version ledger and change records, respectively assuming the roles of registration information verification, identity and student status verification, and confirmation of accompanying migrant worker eligibility.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), outputting a session message list and total record count, including role and reference information. The "version ledger and change records" are then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| College entrance examination registration form | Fields, dates, and signatures must be consistent with the household registration and student status certificates; the name, quantity, and date of the same record must not fail to match | Check the source of the application and session identifiers in the request parameters, open a single record to verify the role field, references, and elapsed time, and confirm that signatures and receipts are complete |
| Household registration and student status certificates | The household registration address, student status number, and start and end dates of enrollment must be cross-consistent with the materials for children accompanying migrant workers, and the version number must be updated in sync | Pull two pages in succession to compare the total record count and offset, check whether the old version is traceable and whether references are synchronized, and verify seals and dates |
| Materials for children accompanying migrant workers | The dates and signatures of the residence permit number, social insurance payment records, and proof of parent-child relationship must be consistent with the registration form; missing signatures or receipts must be flagged | Page through by total record count to retrieve all records, sample one record to verify the role, reference information, and time, and confirm that the `_id`, `dataId` and `value` fields can be located |
| Conversation record interface output | The total record count is the number of message records, not the number of sessions; response `code` of 200 and total must match | Use offset and pageSize to page through, verify that message roles correspond to the original conversation in the list, and record the number of references separately by array length |

## Three common errors

- Phenomenon: The same candidate's name is written differently in the registration form and the household registration certificate, and the quantity or date does not match. Cause: Material sources are not synchronized, and fields were not cross-checked item by item.
- Phenomenon: Old-version materials are still being referenced, and the version number was not updated with the content. Cause: After changes, the knowledge base or external documents were not updated in sync, and references were not refreshed.
- Phenomenon: Materials for children accompanying migrant workers lack signatures or receipts, and the review cannot be closed. Cause: Omissions occurred during material collection, and missing items were not flagged at registration.

## How to verify the setup

This function's acceptance: page through by total record count to retrieve all records, sample one record to verify the role, reference information, and time, confirm that response `code` of 200 is consistent with total, record the number of references by array length, and ensure `_id`, `dataId` and `value` can be located.

Business test: change one piece of content, see whether the version number and references are updated in sync, and confirm that the current version is unique, the old version is traceable, and references are synchronized.

- Pull two pages in succession to compare the total record count and offset, confirm that only the first page was not retrieved, and check the case where the interface returns empty but sessions exist on the interface.
- Open a record to verify the reference and elapsed time fields, confirm that the exported record includes references, verify the tokens of the reference text separately, and record the array count separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
