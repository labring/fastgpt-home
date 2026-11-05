---
title: Conversation Records and Traceability for Research Outcome Registration and Intellectual Property: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c061-f007
page_type: 行业问题页
application_area: education
meta_title: Research IP | Chat Records | Review
meta_description: Research IP: review chat records for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Research Outcome Registration and Intellectual Property: Trace Exceptions and Review Results

## What this category's data looks like

The data in this category looks like this
Research achievement registration and intellectual property management involves three core types of materials: achievement registration forms, patent disclosure documents, and software copyright materials. Achievement registration forms record the achievement name, contributors, registration date, and responsible person's signature; patent disclosure documents carry the technical solution, inventors, filing date, and receipt; software copyright materials include the software name, version number, development completion date, and seal. The three types of materials play different roles when entering the conversation logs and audit function: achievement registration forms serve as the basis for registration, patent disclosure documents serve as technical disclosure evidence, and software copyright materials serve as proof of ownership. The material sources are the research management system, agency receipts, and internal approval flows, and the update cadence advances with achievement declaration, patent submission, and copyright registration milestones. Field characteristics are concentrated in four categories: name, quantity, date, and signature. The same record often has mismatched names, quantities, and dates between two materials, unsynchronized versions, and missing signatures or receipts.

## Configuration and implementation checks

How to configure it
This step is executed by the conversation record interface (by application and session dimension), outputting a session message list and total record count, including role and reference information. The "exception list and review conclusions" are then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Achievement registration form | The name, quantity, date, and signature must match the patent disclosure document and software copyright materials item by item | Check the achievement name, number of contributors, and registration date in the registration form and disclosure document, and verify whether the responsible person's signature and receipt are complete |
| Patent disclosure document | The technical solution name, inventors, and filing date must correspond to the achievement registration form, and the version number must be the latest | Compare the name, inventors, and filing date in the disclosure document and registration form, and confirm that when the version is not synchronized, the latest receipt prevails |
| Software copyright materials | The software name, version number, and development completion date must be consistent with the registration form, and the seal must be complete | Check the name, version number, and date in the copyright materials and registration form, and verify whether the seal and receipt are missing |
| Conversation record interface | Paginate by application and session dimension, returning a message list and total record count | Use `chatId` and `dataId` to locate the session and individual record, and verify the role, reference, and duration fields in `value` |

## Three common errors

- Symptom: The name, number of contributors, and date of the same achievement do not match between the registration form and the disclosure document. Cause: The two materials are filled in at different stages, and no cross-check was performed.
- Symptom: The version is not synchronized; the disclosure document has been updated while the registration form is still the old version. Cause: The update milestone did not notify the registration step, and there is no version receipt.
- Symptom: Missing signature or receipt; the achievement registration form has no responsible person's signature, and the copyright materials have no seal. Cause: The approval flow is not closed-loop, and material circulation lacks receipt records.

## How to verify the setup

How to confirm it is configured correctly
Acceptance of this feature: paginate through all records by total record count total, sample one record to verify the role, reference information, and time, and confirm response `code` of 200 and that `_id`, `dataId` and `value` correspond.

Business test: create an exception record, see whether it can be traced back to the source material, and verify the name, quantity, date, and signature in the achievement registration form, patent disclosure document, and software copyright materials.

- Paginate by application and session dimension, pull two consecutive pages, compare the total record count and offset, and verify that the role field matches the original conversation.
- Open a single record to verify the reference and duration fields, confirm that the number of references equals the array length, and record the reference content budget separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
