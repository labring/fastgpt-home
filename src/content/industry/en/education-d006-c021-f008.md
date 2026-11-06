---
title: Workflow Orchestration for Enrollment Changes and Graduation Eligibility: Track Progress and Check Statistics
slug: /en/industry/education-d006-c021-f008
page_type: 行业问题页
application_area: education
meta_title: Graduation Eligibility | Workflows | Progress
meta_description: Graduation Eligibility: review workflows for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Enrollment Changes and Graduation Eligibility: Track Progress and Check Statistics

## What this category's data looks like

This page addresses the scenario of student status changes and graduation eligibility review. The materials come from three types of forms: leave/resumption of studies applications, major transfer applications, and graduation review checklists, updated weekly or monthly. Field characteristics center on application type, change date, approval signature, receipt number, review conclusion, and statistical scope notes. Leave/resumption of studies applications record the start and end times of a student's suspension or resumption of studies and the approval chain; major transfer applications record the original major, target major, assessment result, and effective semester; graduation review checklists record course credits, required components, eligibility determination, and exception notes. After the three types of materials enter the workflow, they respectively assume the roles of triggering branches, supplementary evidence, and summary reconciliation. The progress table and statistical scope notes are completed by subsequent nodes continuing execution along the branches.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. The "progress table and statistical scope notes" are completed by subsequent nodes continuing execution along the branches. When the user selection node is triggered, the conversation enters an interactive state and records the workflow state. After the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Leave/resumption of studies application | Whether fields, dates, and signatures are complete; whether the name, quantity, and date of the same record are consistent between the progress table and the application form | Compare application type, change date, approval signature, and receipt number one by one; check options and branch connections one by one in the node; confirm that the selection result variable has been passed to subsequent nodes |
| Major transfer application | Whether the original major, target major, assessment result, and effective semester are consistent with the checklist; whether versions are synchronized | Check the application batch and checklist version number; trigger an interactive state once; view the node status in the run record; confirm that the branch direction corresponds to the selected option |
| Graduation review checklist | Whether course credits, required components, eligibility determination, and exception notes are clearly written; whether missing signatures or receipts are marked | Check checklist items and statistical scope notes item by item; reference `variables` in subsequent nodes and run a trial; use `nodeId` to locate the interactive node record |
| Progress table and statistical scope notes | Whether the number of records matches the statistical count; whether the scope is written in the header; whether exceptions are listed separately | Use one week of records to check the total; check the header scope and exception notes; confirm that branch directions and interaction state records are traceable |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the progress table and the application form. Cause: The two types of materials are entered separately, and field-level comparison and receipt verification are not performed at the branch merge point.
- Symptom: The major transfer application and graduation review checklist versions are not synchronized, and conclusions from an old batch override a new batch. Cause: The materials update at different paces, and nodes do not distinguish branch directions by version number.
- Symptom: A leave/resumption of studies application lacks a signature or receipt, but the progress table still includes it in the total. Cause: After the interaction is completed, the process stops, and exceptions are not written into the header of the statistical scope notes.

## How to verify the setup

Feature acceptance: Run trials for each option one by one, check the branch directions and interaction states in the run record, confirm that each option corresponds to one branch, that the selection result variable has been passed to subsequent nodes, and use `nodeId` to locate the interactive node and reference `variables` for one trial run.

Business testing: Use one week of records to check the total, see whether the scope and exceptions are clearly written, and confirm that the number of records matches the statistical count and that the scope is written in the header.

- Check options and branch connections one by one in the node, trigger an interactive state once, and view the node status in the run record.
- Use one week of records to check the total, check the header scope and exception notes, and confirm that the name, quantity, and date of the same record are consistent in the two materials.
