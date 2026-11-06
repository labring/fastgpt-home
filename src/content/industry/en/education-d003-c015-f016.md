---
title: Forms and User Interaction for School Mental Health Screening and Referrals: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c015-f016
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | Forms | Intake
meta_description: Student Mental Health: review forms for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for School Mental Health Screening and Referrals: Handle Questions and Collect Missing Information

## What this category's data looks like

This page focuses on the category of mental health screening and referral in primary and secondary schools. The source materials include three types: psychological screening plans, interview records, and referral forms. Psychological screening plans are prepared by school psychological teachers on a semester basis, and include screening subjects, scale names, dates, and signatures of persons in charge; interview records are filled in by homeroom teachers or psychological teachers on each occasion, and include student names, interview dates, key question items, and conclusions; referral forms are initiated by psychological teachers, and include referral subjects, reasons for referral, receiving institutions, and receipt signatures. When these three types of materials enter this function, their roles differ: screening plans provide the field framework and the basis for required items, while interview records and referral forms provide specific question items and clues for completion. The update rhythm is centralized submission at the beginning of the semester, with supplementary case-by-case entries during the semester. In terms of field characteristics, the names, quantities, and dates of the same record in the plan and the interview record must be consistent, and version numbers and signature receipts must be synchronized.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, and outputs the field values filled in by the user (passed to subsequent nodes after submission). "Intake records and completed question items" are then completed by subsequent nodes or manually. Form fields correspond one-to-one with the material fields to be collected, required markers cover key material fields, and after submission the field values are available for reference by subsequent nodes.

| Object | Check | Verification action |
| --- | --- | --- |
| Form fields | Correspond item by item with the field names of the psychological screening plan, interview records, and referral forms; missing items can be identified as items pending follow-up | Check the field names one by one in the node configuration, reference the fields with `formInputResult`, and run a trial |
| Required markers | Key material fields are marked as required; when items are missing, submission is blocked and follow-up questions are triggered | Check the required settings one by one, use `userSelect` to select the missing field, and observe the follow-up question |
| Field passing after submission | Subsequent nodes can retrieve the corresponding field values, and intake records and completed question items can be generated accordingly | Reference the field in subsequent nodes and run a trial, checking names, quantities, dates, and signature receipts |
| Interview records and referral forms | The names, quantities, and dates of the same record match across the two materials, and versions are synchronized | Compare dates and signature fields one by one; return records missing signatures or receipts for supplementary entry |

## Three common errors

- Phenomenon: The name, quantity, and date of the same student do not match between the screening plan and the interview record. Cause: The two materials are entered separately, without field-level comparison and version synchronization.
- Phenomenon: A referral form lacks the receiving institution's signature or receipt, but the process still continues. Cause: Required markers do not cover the signature and receipt fields, so submission is not blocked.
- Phenomenon: The dialogue stops in the interaction state, and subsequent nodes cannot retrieve values. Cause: Required items can be submitted even when empty, or field names are inconsistent with subsequent references.

## How to verify the setup

Acceptance of this function: fill in once and submit, check the field values retrieved by subsequent nodes, and confirm that `formInputResult` and `selectResult`, and field passing all work normally.

Business test: submit a question missing key information and see whether it asks follow-up questions before answering.

- Check the field names and required settings one by one in the node configuration to ensure they correspond one-to-one with the fields of the three types of materials.
- Reference the fields in subsequent nodes and run a trial to check whether names, quantities, dates, and signature receipts are consistent.
