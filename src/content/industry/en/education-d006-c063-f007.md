---
title: Conversation Records and Traceability for Academic Misconduct Reports and Investigations: Track Progress and Check Statistics
slug: /en/industry/education-d006-c063-f007
page_type: 行业问题页
application_area: education
meta_title: Research Misconduct | Chat Records | Progress
meta_description: Research Misconduct: review chat records for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Academic Misconduct Reports and Investigations: Track Progress and Check Statistics

## What this category's data looks like

This category's data looks like this

Investigation and handling of academic misconduct reports involves three types of materials: report materials, investigation reports, and expert appraisal opinions. Their sources are acceptance registration, submission by the investigation team, and issuance by experts, and their update cadence advances with investigation milestones. When these three types of materials enter the conversation log and auditing feature, they play different roles: report materials serve as original leads, investigation reports serve as process conclusions, and expert appraisal opinions serve as professional judgments. Field characteristics center on name, quantity, date, and signature. The same record often shows mismatches in name, quantity, and date across two materials, versions are not synchronized, and signatures or receipts are missing. Progress records and statistical reconciliation require that the number of records match the statistical count and that the statistical basis is written into the table header. Before entering a weekly or monthly report, use one week of records to reconcile the totals and check whether the statistical basis and exceptions are clearly stated.

## Configuration and implementation checks

How to configure it

This step is executed by the conversation log interface (by application and session dimension), which outputs the session message list and the total number of records, including role and reference information. The "progress table and statistical basis description" is then completed manually or by an external system. The message list is not a version ledger of business materials; the conversation interface only retrieves session evidence and does not write to the business ledger.

| Object | Check | Verification action |
| --- | --- | --- |
| Report materials | Name, quantity, date, and signature must correspond to the investigation report; the acceptance receipt must not be missing | Check the name, quantity, date, and signature of the report materials against the investigation report, and compare the fields of the same record across the two materials |
| Investigation report | The conclusion date and signature must connect with the expert appraisal opinions, and the version must be synchronized | Check the date and signature of the investigation report against the expert appraisal opinions, and confirm that when versions are not synchronized, the latest signed version prevails |
| Expert appraisal opinions | The number of cited items and the cited text of the appraisal opinions must be recorded separately, with complete signatures and receipts | Check the number of cited items and the cited text of the appraisal opinions; record the array item count separately and do not make an equality comparison between the item count and the citation content budget |
| Conversation log interface (by application and session dimension) | Paginate and pull by application and session dimension, returning the total number of records and response `code` of 200 | Use `chatId` and `dataId` to check records, paginate through all records according to the total number of records, and open `value` to check role, reference information, and time |

## Three common errors

- Symptom: the name, quantity, and date of the same record do not match between the report materials and the investigation report. Cause: the two materials are registered separately and are not checked against the same record identifier.
- Symptom: the versions of the investigation report and the expert appraisal opinions are not synchronized, and signatures or receipts are missing. Cause: versions were not synchronized after the materials were updated, and no receipt was kept at the signature step.
- Symptom: the interface returns empty but sessions appear in the UI, or only the first page is retrieved. Cause: the sources of the application and session identifiers are inconsistent, and the pagination parameters do not paginate through all records according to the total number of records.

## How to verify the setup

How to confirm the setup is correct

Acceptance for this feature: paginate through all records according to the total number of records, sample one record to check role, reference information, and time, confirm response `code` of 200, and use `_id`, `dataId` and `value` to check record ownership and details.

Business test: use one week of records to reconcile the totals, check whether the statistical basis and exceptions are clearly stated, and confirm that the number of records matches the statistical count and that the statistical basis is written into the table header.

- Paginate and pull by application and session dimension, pull two consecutive pages and compare the total number of records and the offset, and confirm that the number of records matches the total.
- Open one record to check role, reference information, and duration fields, and confirm that message roles correspond to the original conversation and that references and durations are visible.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
