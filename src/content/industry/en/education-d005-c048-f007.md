---
title: Conversation Records and Traceability for Sino-Foreign Education Establishment and Annual Reports: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c048-f007
page_type: 行业问题页
application_area: education
meta_title: Joint Education | Chat Records | Versions
meta_description: Joint Education: review chat records for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Sino-Foreign Education Establishment and Annual Reports: Maintain Document Versions and Changes

## What this category's data looks like

The materials for the establishment and annual reports of Chinese-Foreign cooperative education institutions usually include the establishment application, the cooperation agreement, the articles of association, as well as the change explanations and receipts in subsequent annual reports. These materials are formed by application batch and year, and their update cadence follows the approval milestones and the annual report cycle. The fields are concentrated in the institution name, number of programs, enrollment date, signatures and seals, and attachment numbers. When the materials enter the conversation log and audit function, each plays a different role: the establishment application provides the field baseline, the cooperation agreement provides the source of dates and signatures, the articles of association provide the basis for names and quantities, and the annual report receipt provides the basis for changes. If the name, quantity, or date of the same record does not match across two materials, or if the versions are not synchronized, or signatures and receipts are missing, subsequent references will be inaccurate.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), which outputs the session message list and the total record count, including role and reference information. The version ledger and change records are then completed manually or by an external system. The total record count is the number of message records, not the number of sessions. The conversation interface only retrieves session evidence and does not write to the business ledger.

| Object | Check | Verification action |
| --- | --- | --- |
| Establishment application | The institution name, number of programs, date, and signature must be consistent with the cooperation agreement | Pull records by application and session dimension, check `chatId` and `dataId`, and compare the fields of the establishment application and the cooperation agreement |
| Cooperation agreement | The date and signature must match the articles of association and the annual report receipt | Open a single record to check the reference information and elapsed time, and confirm that the agreement date is consistent with the articles of association date |
| Articles of association | The basis for names and quantities must be synchronized with the establishment application and the cooperation agreement | Pull two consecutive pages and compare the total record count total and the offset, and confirm that the articles of association name is consistent with the establishment application |
| Annual report receipt | If the signature or receipt is missing, it must be marked as pending supplementation | Use `value` to view the details of a single record, and check whether the receipt is updated with the version |

## Three common errors

- Phenomenon: The name, quantity, or date of the same record does not match between the establishment application and the cooperation agreement. Cause: The two materials are maintained separately and are not checked against the same version baseline.
- Phenomenon: Old-version materials are still referenced, and the version number and references are not updated in sync. Cause: After a change, only one place was modified, and the ledger and external documents were not written back.
- Phenomenon: Receipts or signatures are missing, but the materials appear complete. Cause: At registration time, only the message list was retrieved, and the signature and receipt fields were not checked item by item.

## How to verify the setup

Acceptance of this feature: Page through by the total record count total to retrieve all records; when the status code is 200, sample one record to check the role, reference information, and time, and confirm that `_id`, `dataId` and `value` are queryable.

Business test: Change one piece of content and see whether the version number and references are updated in sync.

- Pull pages by application and session dimension, pull two consecutive pages and compare the total record count total and the offset, and confirm that the number of records matches.
- Open one record to check the role field, reference information, and elapsed time, and confirm that message roles correspond to the original conversation and that the number of references is recorded separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
