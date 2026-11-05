---
title: Conversation Records and Traceability for Academic Misconduct Reports and Investigations: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c063-f007
page_type: 行业问题页
application_area: education
meta_title: Research Misconduct | Chat Records | Operations
meta_description: Research Misconduct: review chat records for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Academic Misconduct Reports and Investigations: Coordinate Operations and Application Handover

## What this category's data looks like

This page addresses the scenario of investigating and handling academic misconduct reports. The materials include three categories: report materials, investigation reports, and expert appraisal opinions. Report materials are registered by the intake officer, investigation reports are issued by the investigation team, and expert appraisal opinions are submitted by external experts; all three enter the system in parallel under the same case. The field characteristics center on names, quantities, dates, and signatures: report materials record the reported person, the matter, and the submission date; investigation reports record the investigation conclusion, participant signatures, and the receipt; expert appraisal opinions record the appraiser, the appraisal date, and the seal. The update cadence advances by case stage, with each node—intake, investigation, appraisal, and review—producing a new version. When the materials enter the conversation logs and auditing feature, each assumes an evidentiary role: report materials are used to verify the original claims, investigation reports are used to verify the handling chain, and expert appraisal opinions are used to verify the basis for professional judgment. All three must leave a trace under the same application and session dimension, so that they can be compared item by item during handover.

## Configuration and implementation checks

This step is performed by the conversation record interface (by application and session dimension), which outputs the session message list and the total record count, including role and reference information. "Handover-ready deployment status and operation records" are then completed by a human or an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Report materials | Names, quantities, dates, and signatures must be consistent with the investigation report | Pull the session message list by `chatId`, and verify the report material fields against the corresponding items in the investigation report |
| Investigation report | The version number is in sync with the expert appraisal opinion; a missing signature or receipt means inconsistency | Locate the single record by `dataId`, and verify the report version against the appraisal opinion date |
| Expert appraisal opinion | The appraiser, appraisal date, and seal are all present and consistent with the investigation report | Open `value` to verify the reference information and the elapsed-time field, and confirm the appraisal opinion reference is complete |
| Conversation record interface output | The total record count total matches the pagination offset, and the status code is 200 | Pull two pages in succession and compare the total count with the offset; sample one record to verify the role, reference, and time |

## Three common errors

- Symptom: The names and quantities of the same record do not match between the report materials and the investigation report. Cause: The two materials are registered separately and the fields are not aligned under the same case dimension.
- Symptom: The investigation report version is not synced to the expert appraisal opinion. Cause: The appraisal opinion was issued based on an old version of the report, and the version number was not updated.
- Symptom: The handover form is missing a signature or receipt. Cause: The investigation conclusion has been written in, but the participant signatures and receipt were not retained together with the record.

## How to verify the setup

This feature's acceptance: page through using the total record count total to retrieve everything, sample one record to verify the role, reference information, and time, and confirm the status code is 200 and the list fields are complete.

Business test: verify once item by item against the handover form, see which record is missing, and focus on comparing the names, quantities, dates, and signatures of the report materials, investigation reports, and expert appraisal opinions.

- In the request parameters, verify the source of the application and session identifiers, and confirm they match the actual application and actual session.
- Pull two pages in succession and compare the record count with the total count, and check whether the offset and pagination parameters match.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
