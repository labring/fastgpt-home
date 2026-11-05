---
title: Conversation Records and Traceability for Research Project Task Agreement Signing: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c058-f007
page_type: 行业问题页
application_area: education
meta_title: Research Agreements | Chat Records | Versions
meta_description: Research Agreements: review chat records for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Research Project Task Agreement Signing: Maintain Document Versions and Changes

## What this category's data looks like

At the signing stage of a research project task book, materials usually include three types: the project task book, the subject task breakdown table, and the budget book. The task book carries the research objectives, assessment indicators, and signature block; the task breakdown table breaks the subject down to the undertaking unit, person in charge, and milestone dates; the budget book lists budget categories, amounts, and calculation basis. These materials mostly flow in from three sources: internal drafting, return from external units, and supplementary entry of scanned copies. The update rhythm advances with signing rounds, and it is common for the name, quantity, and date of the same record to fail to match across two materials, for versions not to be synchronized, and for signatures or receipts to be missing. When materials enter the conversation record function, the task book and breakdown table are used to compare against the wording confirmed in the conversation, and the budget book is used to check whether the referenced content is consistent with the registered version; the conversation side only provides conversation evidence and does not handle ledger registration.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and conversation dimension), outputting a conversation message list and total record count, including role and reference information. The "version ledger and change record" is then completed manually or by an external system. The message list is pulled by pagination according to application and conversation identifiers, and the returned results distinguish between the two role types, question and answer, and carry reference and elapsed-time fields.

| Object | Check | Verification action |
| --- | --- | --- |
| Project task book | The signature in the signature block and the receipt date must be consistent with the budget book and breakdown table, and the version number must point to the current version | Pull records by application and conversation dimension, check that `chatId` is consistent with the actual conversation, and compare the signature date and registered version item by item |
| Subject task breakdown table | The undertaking unit, person in charge, and milestone dates must correspond to the main text of the task book, and the old version must be traceable | Pull two pages consecutively and check the total record count and advance the offset by the number of records retrieved, then sample one record to check the role field and reference information |
| Budget book | The budget category names, quantities, and amounts must match the task book and breakdown table, and references must be synchronized | Open a single record to check the reference and elapsed-time fields; record the reference text tokens separately, and record the number of array entries separately |
| Version ledger and change record | The current version must be unique, the old version must be traceable, references must be synchronized, and changes must leave traceable records for review | After changing one piece of content, pull again and check whether the version number and references are updated synchronously; archive response `code` of 200 together with the total record count total |

## Three common errors

- Symptom: the name, quantity, and date of the same subject fail to match across two materials. Cause: the task book and breakdown table were drafted separately, no field-level comparison was performed after return, and the old draft was directly reused during registration.
- Symptom: the budget book categories have already been adjusted, but the task book still references the old version. Cause: versions were not synchronized, the change was completed only within a single material, and references were not updated with the current version.
- Symptom: the signature block lacks a signature or receipt, but the material still enters registration. Cause: returned copies and scanned copies were mixed together, no item-by-item check was performed against the signature block, and missing items were not intercepted.

## How to verify the setup

This function's acceptance: page through by total record count to retrieve all records, and sample one record to check the role, reference information, and time; check the message identifiers and content fields `_id`, `dataId` and `value`, and confirm that response `code` of 200 matches the total record count total.

Business test: change one piece of content and see whether the version number and references are updated synchronously; the old version must still be traceable, the current version must be unique, the number of references must be recorded according to array length, and the reference text tokens must be recorded separately.

- Pull two pages consecutively by application and conversation dimension, check the total record count and advance the offset by the number of records retrieved, and confirm that the number of records matches the total, avoiding retrieving only the first page.
- Open one record to check the role field, reference, and elapsed-time fields; during registration, write the change reason, change author, and effective date into the version ledger, and archive the old version so it remains traceable.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
