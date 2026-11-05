---
title: Workflow Orchestration for Daily Kindergarten Care Management: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c001-f008
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Care | Workflows | Review
meta_description: Kindergarten Care: review workflows for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Daily Kindergarten Care Management: Trace Exceptions and Review Results

## What this category's data looks like

This category's data centers on three types of materials: the daily life schedule, morning and afternoon health check records, and child health observation records. The daily life schedule is arranged weekly by class teachers, with fields including activity name, start and end times, activity location, and lead teacher's signature; morning and afternoon health check records are filled in by health workers at entry and after nap, with fields including child's name, body temperature, oral, hand, foot, and skin condition, handling opinion, inspector's signature, and date; child health observation records are supplemented at any time by childcare workers during activity and meal segments, with fields including observation time, description of performance, water and food intake, abnormality marker, and recorder's signature. The three types of materials update at different rhythms: the schedule is adjusted weekly, morning and afternoon health checks are updated every half day, and health observations are updated by segment. When entering the exception tracing and manual review function, the schedule serves as the timeline and basis for locating responsible persons, morning and afternoon health check records serve as the exception trigger source, and health observation records serve as process corroboration; together the three support the exception list and review conclusions.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch direction and interaction state records. When the user selection node is triggered, the conversation enters an interaction state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the selected option. The "exception list and review conclusions" are then completed by subsequent nodes continuing execution along the branch.

| Object | Check | Verification action |
| --- | --- | --- |
| Daily life schedule | The activity name, start and end times, lead teacher's signature, and date must match the corresponding activity in the morning and afternoon health check records; if the name and time of the same activity do not match across the two materials, it is regarded as an exception clue | Extract the abnormal time period and lead teacher from the schedule, compare them with the signature and date for the same activity in the morning and afternoon health check records, and in the verification action reference `nodeId` to locate the branch source |
| Morning and afternoon health check records | The child's name, body temperature, oral, hand, foot, and skin condition, handling opinion, inspector's signature, and date must be complete; missing signature or receipt is regarded as pending review | Retrieve the morning and afternoon health check records by child's name and date, check the handling opinion and signature fields, mark records with missing items as abnormal, and write them into `variables` for reference by subsequent nodes |
| Child health observation records | The observation time, description of performance, water and food intake, abnormality marker, and recorder's signature must match the conclusion for the same child on the same date in the morning and afternoon health check records; if the quantity or date does not match, it is regarded as a version not synchronized | Using child's name and date as the primary key, link the health observation records with the morning and afternoon health check records, check whether the abnormality marker and handling opinion are consistent, and record the differing fields when they are inconsistent |

## Three common errors

- Phenomenon: The body temperature value for the same child on the same date does not match between the morning and afternoon health check records and the health observation records. Cause: The two materials are filled in by different roles at different segments, and no same-day cross-check was performed.
- Phenomenon: The daily life schedule has been adjusted weekly, but the morning and afternoon health check records still reference the old activity name and time. Cause: The schedule version was not synchronized to the check step, and the lead teacher and health worker each hold a different version.
- Phenomenon: The health observation record has an abnormality marker but the handling opinion field is blank, and the inspector's signature is missing. Cause: The recorder only made the marker without adding a handling opinion, and the review step did not intercept records missing signatures.

## How to verify the setup

Acceptance of this function: run through each option one by one, and check the branch direction and interaction state in the run records; confirm that each option corresponds to one branch, trigger once and check whether the node state is recorded, and run once referencing the selection result variable in a subsequent node.

Business test: create an abnormal record and see whether it can be traced back to the source material; from the exception list, trace back to the morning and afternoon health check records and health observation records, check whether the child's name, date, and signature are consistent, and confirm that the review conclusion is supported by the original records.

- In the user selection node, check the options and branch connections one by one, confirm that each option corresponds to one branch, and avoid still taking the default branch after selecting an option.
- After triggering an interaction once, check the node state in the run records, confirm that the process continues downward after the interaction is completed, and that the process does not stop or repeatedly enter the interaction in the same session.
