---
title: Conversation Records and Traceability for College Entrance Exam Application Eligibility: Track Progress and Check Statistics
slug: /en/industry/education-d006-c051-f007
page_type: 行业问题页
application_area: education
meta_title: Entrance Exam Eligibility | Chat Records | Progress
meta_description: Entrance Exam Eligibility: review chat records for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for College Entrance Exam Application Eligibility: Track Progress and Check Statistics

## What this category's data looks like

The data for this category looks like this: General College Entrance Examination registration qualification review involves three types of materials: the college entrance examination registration form, household registration and student status proof, and materials for children accompanying migrant workers. The registration form is filled out and signed for confirmation by the candidate; the household registration and student status proof is issued by the public security and the school; the materials for children accompanying migrant workers include residence permit, social insurance payment records, and proof of parental employment. Materials are submitted centrally according to the registration cycle, with fields mainly including name, ID number, household registration address, student status number, school attended, guardian information, signature, and receipt date. When entering this function, the three types of materials each serve as independent record sources: the registration form provides the candidate's basic fields, the household registration and student status proof provides the basis for qualification determination, and the materials for children accompanying migrant workers provide evidence of additional conditions. The three must be aligned in the progress table by the same candidate identifier, and the material source and version date must be marked separately.

## Configuration and implementation checks

Configuration and implementation checks: This step is executed by the dialogue record interface (by application and session dimension), outputting a session message list and total record count, including role and reference information. The "Progress Table and Statistical Caliber Description" is then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Dialogue record interface | The total record count matches the pagination offset, and role fields alternate | Paginate through all records by `chatId`, verify total and response `code` of 200, sample one to check `dataId` and `value` |
| College entrance examination registration form | Name, ID number, signature, and receipt date are consistent within the form | Check each field and signature column of the registration form item by item, confirm the receipt date is not earlier than the submission date |
| Household registration and student status proof | Household registration address and student status number match between the proof and the registration form | Compare the name, household registration address, student status number, and issuance date of the same candidate in the two materials |
| Materials for children accompanying migrant workers | Dates and quantities of residence permit, social insurance records, and employment proof match | Check guardian name, document number, number of social insurance months, and residence permit validity period; check for missing signature or receipt |

## Three common errors

- Phenomenon: The name or household registration address of the same candidate does not match between the registration form and the household registration and student status proof. Cause: Material versions are not synchronized, or they were not aligned by the same identifier during entry.
- Phenomenon: In the materials for children accompanying migrant workers, the number of social insurance months and residence permit dates are inconsistent in quantity and date between the two proofs. Cause: Different issuance times, and version dates were not marked.
- Phenomenon: The registration form or receipt lacks a signature, but the progress table still records it as received. Cause: The signature column and receipt date were not checked during registration, and exceptions were not written into the caliber description.

## How to verify the setup

How to verify the setup: Acceptance of this function: paginate through all records by total record count, sample one to check role, reference information, and time; check the message identifiers and content fields `_id`, `dataId` and `value`, and confirm that total corresponds to response `code` of 200.

Business test: Use one week of records to verify the total, and see whether the caliber and exceptions are clearly written; the number of records is counted by message records, the number of sessions is recorded separately, the number of references is recorded by array length, and reference text tokens are verified separately.

- Pull records by application and session identifier, pull two consecutive pages and compare total and offset, confirm the number of records matches the total.
- Open one record to check the role field, reference field, and duration field, confirm that message roles correspond to the original conversation and reference information is complete.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
