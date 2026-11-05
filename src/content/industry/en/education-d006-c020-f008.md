---
title: Workflow Orchestration for Grade Entry and Credit Recognition: Track Progress and Check Statistics
slug: /en/industry/education-d006-c020-f008
page_type: 行业问题页
application_area: education
meta_title: Grades and Credits | Workflows | Progress
meta_description: Grades and Credits: review workflows for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Grade Entry and Credit Recognition: Track Progress and Check Statistics

## What this category's data looks like

In the grade entry and credit recognition scenario, materials usually include three types: transcripts, deferred exam applications, and makeup exam arrangements. Transcripts come from exports of the academic affairs system or submissions by course instructors, updated by semester or course batch, with fields including course name, student ID, score, credits, instructor signature, and date. Deferred exam applications are submitted by students and reviewed by the department, with fields including application reason, original exam date, review opinion, and signature. Makeup exam arrangements are published by academic affairs or the department, with fields including makeup exam time, location, invigilation, and receipt. When these three types of materials enter workflow orchestration, the transcript serves as the main record carrying scores and credits, while deferred exam applications and makeup exam arrangements serve as the basis for exceptions and follow-up actions, respectively determining whether the record enters the makeup exam branch or the deferred exam handling branch. In terms of update cadence, transcripts change with entry batches, deferred exam applications and makeup exam arrangements change according to approval and exam scheduling nodes, and among field characteristics, dates, signatures, and quantities are the three most prone to version differences.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch direction and interaction state records. The "progress table and statistical criteria description" is continued and completed by subsequent nodes according to the branch. When a node is triggered, the conversation enters an interaction state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Transcript | Check against the deferred exam application and makeup exam arrangement whether the name, quantity, and date of the same record are consistent; check whether signatures and receipts are complete | Check the options and branch connections one by one in the node, and after a trial run, view the node status in the run records to confirm that the branch direction is consistent with the selected option |
| Deferred exam application | Check against the transcript the original exam date, course name, and student ID; check whether the review opinion and signature are complete | Reference the selection result in `variables` in a subsequent node and run a trial once to confirm that the deferred exam branch is correctly triggered |
| Makeup exam arrangement | Check against the transcript the makeup exam time, location, and course name; check whether the invigilation signature and receipt are synchronized | Check the branch connection corresponding to `nodeId` in the run records to confirm that the makeup exam branch is consistent with the interaction state record |
| Progress table and statistical criteria description | The record count and statistical count match, the criteria are written in the header, and exceptions are noted in the header | Use one week of records to check the totals and see whether the criteria and exceptions are clearly written; check the tokens budget of the referenced text, and record the array item count separately |

## Three common errors

- Symptom: The course name, quantity, and date of the same record do not match between the transcript and the deferred exam application. Cause: The two materials are entered separately, and field-level verification is not performed before branching.
- Symptom: The makeup exam arrangement version is not synchronized, and the old version is still referenced. Cause: After the exam scheduling update, the interaction node is not re-triggered, and the branch still continues execution according to the old record.
- Symptom: The deferred exam application lacks a signature or receipt, but the transcript has already entered statistics. Cause: The interaction state record is not bound to the signature and receipt fields, and the branch judgment only looks at the option.

## How to verify the setup

This feature's acceptance: run trials option by option, and check the branch direction and interaction state in the run records; reference `variables` in a subsequent node and check the connection corresponding to `nodeId` to confirm that the selection result variable has been passed.

Business test: use one week of records to check the totals and see whether the criteria and exceptions are clearly written.

- Check the options and branch connections one by one in the node, and after triggering an interaction once, view the node status in the run records.
- Reference the selection result variable in a subsequent node and run a trial once to confirm that the branch corresponding to the selected option is executed.
