---
title: Conversation Records and Traceability for Research Outcome Registration and Intellectual Property: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c061-f007
page_type: 行业问题页
application_area: education
meta_title: Research IP | Chat Records | Versions
meta_description: Research IP: review chat records for version tracking. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Research Outcome Registration and Intellectual Property: Maintain Document Versions and Changes

## What this category's data looks like

This category's data covers three types of materials: achievement registration forms, patent disclosure documents, and software copyright materials. Achievement registration forms record the name, contributors, date, and signature; patent disclosure documents carry the technical solution, inventors, application milestones, and approval signatures; software copyright materials include source code, specifications, version numbers, and stamped receipts. The three types of materials come from scattered sources, and their update cadence is driven by project initiation, application, change, and archiving milestones. Field characteristics center on names, quantities, dates, signatures, and receipts. When the materials enter the conversation log and audit feature, each serves as a cited source of session evidence, used to trace back which material and which version were referenced in a given registration or change discussion, rather than directly generating a business ledger.

## Configuration and implementation checks

This step is performed by the conversation record interface (by application and session dimension), which outputs the session message list and the total record count, including role and citation information. The "version ledger and change records" are then completed manually or by an external system. The interface only retrieves session evidence and does not write to the business ledger.

| Object | Check | Verification action |
| --- | --- | --- |
| Achievement registration form | Name, quantity, date, signature, and receipt are aligned item by item with the patent disclosure document and software copyright materials | Pull records by application and session identifier, verify the `chatId` source, and compare the fields of the same record across the three materials |
| Patent disclosure document | Inventors, application milestones, and technical solution version are consistent with the registration form and copyright materials | Page through to retrieve all records, verify that role fields appear alternately, and check the `dataId` correspondence |
| Software copyright materials | Version number, source code list, and stamped receipt are in sync with the registration form and disclosure document | Open a single record to verify the citation and elapsed-time fields in `value`, and confirm that the citation count and citation text tokens are recorded separately |
| Conversation record interface output | The total record count total matches response `code` of 200, and the pagination parameters are consistent | Pull two consecutive pages and compare the offset and total, and confirm the order of the two role types, question and answer |

## Three common errors

- Symptom: the name, quantity, and date of the same achievement do not match across two materials. Cause: registration and disclosure are maintained separately and are not backfilled against the same record.
- Symptom: the version is not synchronized, and the old version is still cited. Cause: after a change, the knowledge base or external documents were not updated, and the citation points to an invalid version.
- Symptom: missing signature or receipt. Cause: the material circulation step was not closed-loop, and the approval signature and receipt fields were not verified at archiving time.

## How to verify the setup

Acceptance of this feature: page through by the total record count total to retrieve all records, sample one record to verify the role, citation information, and time, and confirm response `code` of 200.

Business test: change one piece of content and see whether the version number and citation are updated in sync.

- Verify the source of the application and session identifiers, and confirm they match the actual application and actual session.
- Pull two consecutive pages and compare the total and offset, and confirm that the record count matches the total.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
