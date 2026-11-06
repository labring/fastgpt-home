---
title: Workflow Orchestration for Academic Misconduct Reports and Investigations: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c063-f008
page_type: 行业问题页
application_area: education
meta_title: Research Misconduct | Workflows | Intake
meta_description: Research Misconduct: review workflows for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Academic Misconduct Reports and Investigations: Handle Questions and Collect Missing Information

## What this category's data looks like

The academic misconduct report investigation and handling category has three types of material sources: report materials, investigation reports, and expert appraisal opinions. The update rhythm advances step by step with the intake, investigation, and appraisal stages, and the field characteristics are concentrated in name, quantity, date, and signature, receipt. When report materials enter this function, they take on the role of original clues, used to identify missing question items; investigation reports take on the role of process records, used to check whether the name, quantity, and date of the same record are consistent; expert appraisal opinions take on the role of professional conclusions, used to verify signature and version synchronization. After the three types of materials enter the Q&A intake and missing-item follow-up step, workflow nodes first determine whether the information is complete, missing items are identified and followed up on, answers must have material basis, and then it is transferred to the handler.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch direction and interaction state records. "Intake records and supplemented question items" are continued and completed by subsequent nodes according to the branch. When the user selection node is triggered, the conversation enters the interaction state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Report materials | Category check dimensions: whether name, quantity, date and signature, and receipt are complete | Compare item by item the name, quantity, and date in the report materials and the investigation report; when signature or receipt is missing, mark it as a missing item and follow up |
| Investigation reports | Category check dimensions: whether the name, quantity, and date of the same record match across the two materials | Check the options and branch connections one by one in the node, and reference `variables` and `nodeId` to record the branch direction |
| Expert appraisal opinions | Category check dimensions: whether the version is synchronized and whether the signature is complete | Trigger one interaction, view the node status in the run record, and confirm that the selection result variable has been passed to subsequent nodes |
| Intake records and supplemented question items | Missing items are identified and followed up on, and answers have material basis | Reference this variable in subsequent nodes and run a trial once to check whether missing items are followed up on and whether answers are accompanied by material basis |

## Three common errors

- Symptom: the name, quantity, and date of the same record do not match between the report materials and the investigation report. Cause: the two materials were not compared item by item according to the same field criteria, and missing items were not identified.
- Symptom: the version of the expert appraisal opinion is not synchronized, and it still enters the next step even though signature or receipt is missing. Cause: the version and signature were not verified at intake, and missing-item follow-up was not triggered.
- Symptom: after selecting an option, it still follows the default branch, and the process stops after the interaction is completed. Cause: the options and branch connections were not checked one by one, and the selection result variable was not passed correctly.

## How to verify the setup

Acceptance for this function: run trials for each option one by one, check the branch direction and interaction state in the run record, confirm that each option corresponds to one branch and that the selection result variable has been passed to subsequent nodes, and use `variables` and `nodeId` to locate nodes.

Business test: submit a question that lacks key information, and see whether it first follows up before answering, and whether the answer is accompanied by the name, quantity, date, and signature basis from the report materials, investigation report, and expert appraisal opinions.

- Check the options and branch connections one by one in the node, trigger one interaction, then view the node status in the run record to confirm that there is no repeated entry into the interaction.
- Reference the selection result variable in subsequent nodes and run a trial once to check whether the intake records and supplemented question items continue to execute according to the branch and are transferred to the handler.
