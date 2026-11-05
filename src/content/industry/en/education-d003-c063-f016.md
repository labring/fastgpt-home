---
title: Forms and User Interaction for Academic Misconduct Reports and Investigations: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c063-f016
page_type: 行业问题页
application_area: education
meta_title: Research Misconduct | Forms | Intake
meta_description: Research Misconduct: review forms for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Academic Misconduct Reports and Investigations: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the academic misconduct report investigation and handling category. Materials come from three types: report materials, investigation reports, and expert appraisal opinions, updated according to the pace of intake, follow-up questions, and referral. Report materials are submitted by the reporter and include the name of the reported person, the paper involved, time, factual description, and attachments; investigation reports are issued by the investigation team and include the investigation process, findings, handling recommendations, date, and signature; expert appraisal opinions are issued by the expert panel and include the appraisal matters, basis, conclusions, date, and signature. When these three types of materials enter this feature, each assumes a field-source role: report materials provide intake elements, investigation reports provide process and conclusion fields, and expert appraisal opinions provide professional judgment fields. Field characteristics fall into five categories: name, quantity, date, signature, and receipt, and must be checked item by item.

## Configuration and implementation checks

This step is performed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The "intake record and items to be completed" is then handled by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and the workflow state is recorded. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Report materials | Whether the fields of the report materials are consistent with the name, quantity, and date in the investigation report and expert appraisal opinion, and whether the signature or receipt is complete | Check the field names and required settings one by one in the node configuration, reference the fields after submission, and run a test |
| Investigation report | Whether the findings, handling recommendations, date, and signature in the investigation report correspond to the expert appraisal opinion, and whether the versions are in sync | Reference this field in subsequent nodes and run a test, and check whether the date and signature are missing |
| Expert appraisal opinion | Whether the appraisal matters, basis, conclusions, date, and signature match the report materials and investigation report | Check the required settings one by one, and confirm that subsequent nodes can retrieve the corresponding field values after submission |
| formInput field values | Whether the field values filled in by the user are fully passed to subsequent nodes, and whether submission is possible when required items are empty | Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a test |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the report materials and the investigation report. Cause: The two materials are filled in separately, no cross-check is performed, and the fields are not compared item by item.
- Symptom: The investigation report version is not in sync, and the expert appraisal opinion references conclusions from an old version. Cause: After the version was updated, it was not resubmitted, and subsequent nodes still retrieve the old field values.
- Symptom: The report materials lack a signature or receipt, and the investigation report lacks a date. Cause: The required marker does not cover the signature and receipt fields, and empty values are not blocked at submission.

## How to verify the setup

This feature's acceptance: fill in the form once and submit, check the field values retrieved by subsequent nodes, confirm that the `formInputResult` and `selectResult` field values are fully passed in, and confirm that submission is not possible when required items are empty.

Business test: submit a question that lacks key information, see whether it first asks a follow-up question before answering, and whether the follow-up content corresponds to the missing fields in the report materials, investigation report, and expert appraisal opinion.

- Check the field names and required markers one by one in the node configuration, and ensure that the signature, receipt, and date fields are marked as required.
- Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a test, and confirm that the corresponding field values can be retrieved after submission.
