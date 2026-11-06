---
title: Workflow Orchestration for Kindergarten and Family Communication: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c004-f008
page_type: 行业问题页
application_area: education
meta_title: Family Communication | Workflows | Intake
meta_description: Family Communication: review workflows for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Kindergarten and Family Communication: Handle Questions and Collect Missing Information

## What this category's data looks like

The material on this page comes from the kindergarten home-school co-education communication scenario, covering four types of records: committed matters and response times, descriptions of children's performance, classification of parents' requests, and notification delivery. Daily communication enters in forms such as class notifications, parent inquiries, observation records, and receipt feedback. The update cadence rolls daily or weekly, and fields include time, child's name, matter category, request description, commitment content, delivery status, etc. When entering this function, the workflow node first identifies whether the question lacks key information; if items are missing, it triggers follow-up questions; the material itself does not directly produce acceptance records, but serves as the basis for subsequent nodes to continue execution along branches, respectively taking on the roles of commitment verification, performance comparison, request classification, and delivery confirmation.

## Configuration and implementation checks

This step is executed by the workflow node (user selection and branching), outputting branch direction and interaction status records. "Acceptance records and completed question items" are completed by subsequent nodes continuing execution along branches. When triggered, the conversation enters an interaction state and records the workflow status; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Committed matters and response times | Whether the commitment has been responded to, and whether the time falls within the agreed range | Check the options and branch connections one by one in the node, and reference `variables` to see whether the commitment fields are passed along with the branch |
| Descriptions of children's performance | Whether the statement is consistent with the observation record | Trigger once, check the node status in the run record, and compare the description with the observation record fields |
| Classification of parents' requests | Whether the feedback has been classified into the correct request category | Reference the selection result variable in a subsequent node and run a trial once, checking whether the variable points to the correct category branch |
| Notification delivery | Whether the delivery status corresponds to the receipt record | Locate the branch node by `nodeId`, and check whether the delivery status under that branch is consistent with the receipt record |

## Three common errors

- Symptom: A parent's question lacks key information but receives an answer directly. Cause: The interaction state was not entered first to ask follow-up questions, and the missing item was not identified before proceeding to the default branch.
- Symptom: A commitment is marked as handled while its response remains missing. Cause: The commitment fields were not passed along with the branch, and subsequent nodes continued execution along the default path.
- Symptom: The description of the child's performance does not match the observation record. Cause: The description fields were not compared with the observation record, and the feedback entered the handling stage without being classified.

## How to verify the setup

Acceptance for this function: run trials for each option one by one, check the branch direction and interaction status in the run record, confirm that each option corresponds to one branch and that the selection result variable has been passed to subsequent nodes, and use `variables` and `nodeId` to locate and verify.

Business test: submit a question that lacks key information and see whether it asks follow-up questions first before answering.

- Check the options and branch connections one by one in the node, and confirm that each option corresponds to one branch.
- Trigger once, check the node status in the run record, and confirm that the process continues execution after the interaction is completed.
