---
title: Conversation Records and Traceability for Research Ethics Review: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c062-f007
page_type: 行业问题页
application_area: education
meta_title: Research Ethics | Chat Records | Review
meta_description: Research Ethics: review chat records for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Research Ethics Review: Trace Exceptions and Review Results

## What this category's data looks like

Research ethics review application materials, informed consent form templates, and risk assessment forms are the primary basis for exception tracing and manual review. Application materials record the study name, responsible person, start and end dates, and ethics number; informed consent form templates correspond to subject notification, signature fields, and version date; risk assessment forms register the risk level, handling measures, and reviewer signature. The three types of materials are submitted by researchers, registered by the ethics secretary, and reviewed by committee members, with update cadence changing with version revisions and annual reviews. When entering the conversation logs and auditing feature, application materials assume the role of the primary record, while informed consent form templates and risk assessment forms serve as cross-check sources, used to compare whether the name, quantity, date, and signature of the same record are consistent.

## Configuration and implementation checks

| Object | Check | Verification action |
| --- | --- | --- |
| Ethics Review Application | Application number, study name, principal investigator, start and end dates, ethics number, and signature are complete | Pull records by `chatId` and session identifier, and check whether the application fields correspond to the referenced information in the conversation records |
| Informed Consent Form Template | Subject notification, signature section, version date, and receipt fields are consistent | Open a single record and check whether `dataId` is synchronized with the template version date and signature section |
| Risk Assessment Form | Risk level, handling measures, reviewer signature, and date are traceable | Page through all records by total count and check whether the risk description in `value` is consistent with the risk assessment form fields |
| Conversation Record Interface | The total number of records matches the pagination offset, and the status code is 200 | Pull two pages consecutively and compare the total number of records, total, with the offset; check whether the role field matches the original conversation and the number of references |

## Three common errors

- Symptom: The study name, subject count, and dates of the same record do not match between the application materials and the informed consent form template. Cause: The two materials are registered separately, without backfilling and checking against the same number.
- Symptom: The risk assessment form version is not synchronized, and the old version's handling measures are still referenced. Cause: After the template was updated, the version date and receipt were not re-registered, and the reviewer did not confirm.
- Symptom: The application materials lack the reviewer's signature or the informed consent form lacks a receipt. Cause: The registration step did not validate the signature fields, and the review conclusion was not supported by the original records.

## How to verify the setup

Feature acceptance: Page through by total record count to retrieve all, sample one record to check the role, reference information, and time, and confirm that `_id`, `dataId` and `value` can locate the original record.

Business test: Create an exception record and see whether it can be traced back to the source material

- Pull records by application and session identifier, compare the total record count with the offset, and confirm the status code is 200
- Open a single record to check the role, reference, and duration fields, register the exception list, and hand it to the responsible person for handling

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
