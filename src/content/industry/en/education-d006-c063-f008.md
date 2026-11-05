---
title: Workflow Orchestration for Academic Misconduct Reports and Investigations: Track Progress and Check Statistics
slug: /en/industry/education-d006-c063-f008
page_type: 行业问题页
application_area: education
meta_title: Research Misconduct | Workflows | Progress
meta_description: Research Misconduct: review workflows for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Academic Misconduct Reports and Investigations: Track Progress and Check Statistics

## What this category's data looks like

In the category of investigation and handling of academic misconduct reports, materials come from three types: report materials, investigation reports, and expert appraisal opinions. They are updated weekly, and fields include name, quantity, date, signature, and receipt. Report materials are the entry point, recording the reported person, the matter, and the evidence list; investigation reports carry forward the verification process, stating conclusions and handling recommendations; expert appraisal opinions provide professional judgment on disputed points. When the three types of materials enter workflow orchestration, each has a different role: report materials provide the initial record and branching basis, investigation reports complete the investigation progress and statistical scope, and expert appraisal opinions lock down disputed fields and exception explanations. Workflow nodes advance according to user selections, and branch directions and interaction status records are kept as traces. The progress table and statistical scope explanation are completed by subsequent nodes continuing execution according to the branch, and finally enter the weekly or monthly report.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction status records. The "progress table and statistical scope explanation" is then completed by subsequent nodes continuing execution according to the branch. Each option corresponds to one branch; when triggered, the conversation enters an interaction state and records the workflow status. After the user completes the selection, execution continues downward according to the corresponding option.

| Object | Check | Verification action |
| --- | --- | --- |
| Report materials | Category verification dimensions: whether the reported person's name, number of matters, acceptance date, and receipt signature are complete, and whether they are consistent with the first paragraph of the investigation report | Check the options and branch connections one by one in the node, trigger once to view the node status in the run record, and reference the selection result variable in a subsequent node for a trial run |
| Investigation report | Category verification dimensions: whether the investigation conclusion name, evidence quantity, report date, and signature correspond item by item with the report materials, and whether the version is synchronized | Compare the three columns of name, quantity, and date in the two materials, mark inconsistencies, and confirm whether the branch direction and interaction status records cover that exception |
| Expert appraisal opinions | Category verification dimensions: whether the appraisal opinion name, involved quantity, issuance date, and expert signature are consistent with the investigation report; missing signatures or receipts are listed separately | Reference the selection result variable in a subsequent node and run a trial once, and check whether the expert appraisal opinion fields enter the statistical scope explanation along with the branch |
| Progress table and statistical scope explanation | The recorded count and statistical count match, the scope is written in the header, and exceptions and missing signatures or receipts are noted in the header | Use one week of records to verify the total, check whether the scope and exceptions are clearly written, and verify that the tokens and array item count of the referenced text are recorded separately |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match between the report materials and the investigation report. Cause: The two materials are entered separately, not checked item by item according to unified fields, and the versions are not synchronized.
- Phenomenon: Expert appraisal opinions lack signatures or receipts but are still included in the total during statistics. Cause: The progress table does not treat signatures and receipts as an independent scope, and exceptions are not noted in the header.
- Phenomenon: After selecting an option, the default branch is still followed, and the process stops after the interaction is completed. Cause: The options and branch connections were not checked one by one, and the selection result variable was not referenced in subsequent nodes.

## How to verify the setup

Acceptance of this function: run trials for each option one by one, check the branch direction and interaction status in the run record, confirm that each option corresponds to one branch and that the selection result variable has been passed to subsequent nodes, and record `variables`, `nodeId`, and the interaction status.

Business test: use one week of records to verify the total, see whether the scope and exceptions are clearly written, and whether the recorded count and statistical count match.

- Check the options and branch connections one by one in the node, trigger once to view the node status in the run record, and confirm that the interaction status is recorded.
- Reference the selection result variable in a subsequent node and run a trial once, and check whether the header of the progress table and statistical scope explanation clearly states the scope and exceptions.
