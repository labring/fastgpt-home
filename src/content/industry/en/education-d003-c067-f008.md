---
title: Workflow Orchestration for Peer Review Organization: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c067-f008
page_type: 行业问题页
application_area: education
meta_title: Peer Review | Workflows | Intake
meta_description: Peer Review: review workflows for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Peer Review Organization: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the Q&A intake and missing-item follow-up scenario for peer review organizations. The materials come from three types of records: review invitations, expert review comments, and author revision notes. The update cadence advances round by round with manuscript circulation, and the fields cover names, quantities, dates, signatures, and acknowledgments. Review invitations play the role of invitation and acknowledgment; expert review comments play the role of review conclusions and signatures; author revision notes play the role of point-by-point responses and version marking. After the three types of materials enter the workflow, the intake step first extracts question items and fields, then the missing-item identification step compares whether the names, quantities, and dates of the same record across different materials are consistent, and checks whether version synchronization and signature acknowledgments are complete. Finally, the completed question items are routed by branch to the handler.

## Configuration and implementation checks

This part is executed by workflow nodes (user selection and branching), outputting branch directions and interaction status records. "Intake records and completed question items" are continued and completed by subsequent nodes according to the branch. When a node is triggered, the conversation enters an interactive state and records the workflow status. After the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Review invitation | Whether the date, signature, and acknowledgment of the review invitation are complete, and whether the name and quantity of the same record match the expert review comments | In the node, check the options and branch connections one by one, trigger once to view the node status in the run records, and reference `variables` to confirm that the selection result variable has been passed to subsequent nodes |
| Expert review comments | Whether the name, quantity, date, and signature of the expert review comments are consistent with the review invitation and author revision notes, and whether the version is synchronized | In subsequent nodes, reference `nodeId` and the selection result variable and run a trial once, comparing whether the fields of the same record across the three materials fail to match |
| Author revision notes | Whether the version marking and acknowledgment of the author revision notes are synchronized, and whether the point-by-point responses cover the missing items in the expert review comments | In the node, check the options and branch connections one by one, confirm that missing items are identified and followed up on, and that answers are based on the materials |
| Intake records and completed question items | Whether missing items are identified and followed up on, whether answers fall on the material fields, and whether the branch direction is consistent with the selection result | In subsequent nodes, reference `variables` and run a trial once, check the branch direction and interaction status in the run records, and confirm that the process has not stopped |

## Three common errors

- Symptom: after selecting an option, the default branch is still taken. Cause: the options and branch connections were not checked one by one, and the selection result variable was not correctly passed to subsequent nodes.
- Symptom: the name, quantity, and date of the same record fail to match across two materials. Cause: the review invitation and expert review comments were not compared by field, and the versions were not synchronized.
- Symptom: a missing signature or acknowledgment still proceeds to the next stage. Cause: the intake step did not list signatures and acknowledgments as missing items, and follow-up was not triggered.

## How to verify the setup

Acceptance for this feature: run trials for each option one by one, check the branch direction and interaction status in the run records, and confirm that `variables`, `nodeId`, and the selection result variable are correctly referenced in subsequent nodes.

Business test: submit a question missing key information and see whether it first follows up before answering, and check whether the follow-up items fall on the fields of the review invitation, expert review comments, and author revision notes.

- In the node, check the options and branch connections one by one, trigger once to view the node status in the run records, and confirm that the process continues downward after the interaction is completed.
- In subsequent nodes, reference the selection result variable and run a trial once, comparing whether the name, quantity, date, and signature acknowledgment of the same record across two materials are consistent.
