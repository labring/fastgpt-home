---
title: Conversation Records and Traceability for Research Ethics Review: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c062-f007
page_type: 行业问题页
application_area: education
meta_title: Research Ethics | Chat Records | Operations
meta_description: Research Ethics: review chat records for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Research Ethics Review: Coordinate Operations and Application Handover

## What this category's data looks like

This category's data looks like this: For the deployment, operations, and application handover of research ethics review, materials fall into three categories: ethics review applications, informed consent form templates, and risk assessment forms. Sources are institutional ethics committees and project teams, and the update cadence changes with project initiation, revisions, and annual re-review. Field characteristics: each material contains applicant, project name, review number, version number, date, signature, and receipt fields. When entering the conversation logs and auditing feature, the three material types each play different roles: the ethics review application provides the review object and conclusion, the informed consent form template provides the signed version and receipt, and the risk assessment form provides the risk level and disposition record. Together, the three form the verification worksheet for the handover form, and version, date, and signature must be aligned item by item.

## Configuration and implementation checks

Configuration and implementation checks: The conversation record interface (by application and session dimension) only outputs the session message list and the total record count, including role and reference information; the handover-ready deployment status and operation records must be continued by humans or an external system. This step pulls session evidence by pagination along the application and session dimensions; the returned list distinguishes the two role types, question and answer, and carries reference and elapsed-time fields.

| Object | Check | Verification action |
| --- | --- | --- |
| Ethics review application | Review number, version number, date, and signature are consistent between the application and the receipt | Pull session records by `chatId`, verify the application number and receipt date, and confirm the signature field is complete |
| Informed consent form template | Template version number, signing date, and receipt are consistent within the same batch of materials | Open a single record to verify the reference information in `dataId` and `value`, and compare the template version |
| Risk assessment form | Risk level, disposition date, and signature correspond across the three materials | Page through to retrieve all records, verify against the total record count total and response `code` of 200, and sample one record to compare the risk level and date |
| Deployment status and operation records | Version, connection, and task records are consistent across all three | Verify item by item against the handover form, and confirm the source of the application and session identifiers matches reality |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the ethics review application and the informed consent form template. Cause: The two materials are updated separately, versions are not synchronized, and signatures or receipts are missing.
- Symptom: The interface returns empty but sessions appear in the UI. Cause: The sources of the application and session identifiers are inconsistent, or only the first page was retrieved and the total record count was not paged through to completion.
- Symptom: Exported records lack references. Cause: The reference and elapsed-time fields were not verified together with the single record, and the reference count and the reference content budget were conflated.

## How to verify the setup

How to verify the setup: Acceptance for this feature: page through to retrieve all records by the total record count, sample one record to verify the role, reference information, and time, and confirm that the message identifiers and content fields `_id`, `dataId` and `value` correspond correctly, with response `code` of 200.

Business test: verify item by item once against the handover form, see which record item is missing, and confirm that version, connection, and task records are consistent across all three.

- Pull two pages in succession and compare the total record count and offset to confirm the pagination parameters match the total.
- Open one record to verify the reference and elapsed-time fields, record the reference count separately, and do not compare the array length as equal to the reference content budget.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
