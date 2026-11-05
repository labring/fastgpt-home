---
title: Workflow Orchestration for Grade Entry and Credit Recognition: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c020-f008
page_type: 行业问题页
application_area: education
meta_title: Grades and Credits | Workflows | Intake
meta_description: Grades and Credits: review workflows for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Grade Entry and Credit Recognition: Handle Questions and Collect Missing Information

## What this category's data looks like

In the grade entry and credit recognition scenario, materials mainly consist of transcripts, deferred examination applications, and makeup examination arrangements. Sources are education administration system exports and college submissions, and the update cadence follows examination weeks and semester milestones. Transcripts carry course names, credits, grades, and instructor signatures; deferred examination applications record the application reason, date, and approval signature; makeup examination arrangements provide the makeup examination time, location, and receipt. When the three types of materials enter the workflow, their roles differ: transcripts serve as the basis for recognition, deferred examination applications serve as explanations for absence from examinations, and makeup examination arrangements serve as credentials for subsequent examinations. Field characteristics center on course names, credit counts, examination dates, and signature receipts. The same record often has mismatched names, counts, or dates across two materials, and unsynchronized versions or missing signatures and receipts can also block acceptance.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. Acceptance records and the questions to be completed are continued and completed by subsequent nodes according to the branches. When the user selection node is triggered, the conversation enters an interaction state and records the workflow state. After the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Transcript | Whether the course name, credits, grade, and instructor signature are complete, and whether the date falls within the current semester | Check the course name and credit count on the transcript, compare them with the corresponding records in the deferred examination application, and inspect the signature field and date field |
| Deferred examination application | Whether the application reason, date, and approval signature are complete, and whether they are consistent with the absence record on the transcript | Check the course name, date, and approval signature in the deferred examination application, and compare them with the time and location in the makeup examination arrangement |
| Makeup examination arrangement | Whether the makeup examination time, location, and receipt are clear, and whether they correspond to the course in the deferred examination application | Check the course name, date, and receipt in the makeup examination arrangement, and inspect whether they are consistent with the records in the transcript and deferred examination application |
| User selection node | Each option corresponds to one branch, the interaction state is recorded, and the selection result variable has been passed to subsequent nodes | In the node, check the options and branch connections one by one, trigger once to view the node state in the run record, reference `variables` in a subsequent node and run a trial, and check the branch direction corresponding to `nodeId` |

## Three common errors

- Symptom: The name or credit count of the same course does not match across two materials. Cause: The transcript and deferred examination application are entered separately without cross-comparison, resulting in inconsistent recognition bases.
- Symptom: The makeup examination arrangement has been updated, but the transcript still shows the old date. Cause: Versions are not synchronized, the material update cadences are inconsistent, and an expired record is referenced during acceptance.
- Symptom: The deferred examination application lacks an approval signature or the makeup examination arrangement lacks a receipt. Cause: Signatures and receipts are omitted during material submission, and missing items are not identified and followed up on during acceptance.

## How to verify the setup

Feature acceptance: Run trials option by option, check the branch direction and interaction state in the run record, confirm that each option corresponds to one branch, that the process continues after the interaction is completed, and that the selection result variable has been passed to subsequent nodes, and check the references to `variables` and `nodeId`.

Business test: Submit a question that lacks key information, see whether it first follows up before answering, confirm that the missing item is identified and followed up on, and that the answer has a material basis.

- In the user selection node, check the options and branch connections one by one, trigger an interaction once, and view the node state and branch direction in the run record.
- Reference the selection result variable in a subsequent node and run a trial once, check the passing of `variables` and `nodeId`, and confirm that the process has not stopped and has not re-entered the interaction.
