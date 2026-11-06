---
title: Conversation Records and Traceability for Academic Misconduct Reports and Investigations: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c063-f007
page_type: 行业问题页
application_area: education
meta_title: Research Misconduct | Chat Records | Versions
meta_description: Research Misconduct: review chat records for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Academic Misconduct Reports and Investigations: Maintain Document Versions and Changes

## What this category's data looks like

This category involves three core types of materials: report materials, investigation reports, and expert appraisal opinions. Report materials are submitted by the reporter and record the reported conduct, time, involved personnel, and evidence list; investigation reports are produced by the investigation team and state the investigation process, findings of fact, and handling recommendations; expert appraisal opinions are issued by the expert panel and provide professional judgments on disputed facts. All three types of materials contain name, quantity, date, signature, and receipt fields, and after entering the knowledge base they must be maintained by version. The update cadence follows the advancement of investigation stages; each node—acceptance, preliminary review, formal investigation, and handling decision—produces a new version, and old versions must be retained and traceable. Field characteristics center on the fact that the name, quantity, and date of the same record must be consistent across materials, signatures and receipts must be complete, and citations must be synchronized with versions.

## Configuration and implementation checks

This step is performed by the conversation record interface (by application and session dimension), which outputs the session message list and total record count, including role and citation information. The "version ledger and change records" are then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Report materials | Name, quantity, date, and signature must match the investigation report and expert appraisal opinion | Pull records by `chatId`, verify the citations and elapsed time in `dataId` and `value`, and compare the fields of the three types of materials |
| Investigation report | The version number is unique, old versions are traceable, and citations are updated synchronously | Page through to retrieve all records, confirm no omissions by the total record count total and response `code` of 200, and verify roles and citations one by one |
| Expert appraisal opinion | Signatures and receipts are complete, and dates are consistent with investigation nodes | Open a single record to verify citation information and time fields, and compare the dates and signatures of the appraisal opinion and the investigation report |
| Version ledger and change records | The current version is unique, and after changing one piece of content the version number and citations are synchronized | After changing one piece of content, re-pull the records to see whether the version number and citations are updated synchronously |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match between the report materials and the investigation report. Cause: The two types of materials are registered separately and are not merged and checked under the same version number.
- Phenomenon: The investigation report has been updated, but the expert appraisal opinion still cites the old version. Cause: The version was not synchronized, and citations were not refreshed together with the change records.
- Phenomenon: The expert appraisal opinion lacks a signature or receipt. Cause: No mandatory check for signature and receipt fields was set up in the material circulation step.

## How to verify the setup

This feature's acceptance: page through by total record count to retrieve all records, sample one record to verify role, citation information, and time, and confirm that `_id`, `dataId` and `value` can correspond.

Business test: change one piece of content and see whether the version number and citations are updated synchronously.

- Pull two pages in succession and compare the total record count and offset to confirm that the number of records matches the total.
- Open one record and verify the citation and elapsed time fields to confirm that a single record shows citations and elapsed time.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
