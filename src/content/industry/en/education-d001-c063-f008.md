---
title: Workflow Orchestration for Academic Misconduct Reports and Investigations: Find Supporting Evidence
slug: /en/industry/education-d001-c063-f008
page_type: 行业问题页
application_area: education
meta_title: Research Misconduct | Workflows | Evidence
meta_description: Research Misconduct: review workflows for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Academic Misconduct Reports and Investigations: Find Supporting Evidence

## What this category's data looks like

This category covers the investigation and handling of academic misconduct reports, and the materials include three types: report materials, investigation reports, and expert appraisal opinions. Report materials are submitted by the reporter and include the reported person's information, statement of facts, evidence list, and submission date; investigation reports are issued by the investigation team and include the investigation process, findings, handling recommendations, and the team leader's signature; expert appraisal opinions are issued by the expert panel and include the appraisal matters, analysis opinions, appraisal conclusions, and expert signatures. The three types of materials play different roles when entering the workflow: report materials trigger the acceptance branch, investigation reports enter the determination branch, and expert appraisal opinions enter the review branch. Materials are updated in batches as the investigation stage progresses, and the version is based on the issuance date and document number; fields must be checked against the name, quantity, date, and signature receipt.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting the branch direction and interaction status records. The "basis items that can be traced back to the original text" are completed by subsequent nodes continuing execution according to the branch. When a node is triggered, the conversation enters an interactive state and records the workflow status; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Report materials | The reported person's name, statement of facts, evidence quantity, and submission date must be consistent with the citations in the investigation report, and signatures and receipts must be complete | Compare the names, quantities, and dates in the two materials item by item, verify the signatures and receipts, and check the options and branch connections one by one in the node |
| Investigation report | The evidence items cited in the findings must be traceable back to the original text of the report materials, and the version must be the current issued version | Check the investigation report's document number and issuance date, trace the cited items back to the original text, reference `variables` in subsequent nodes, and run a trial once |
| Expert appraisal opinions | The appraisal matters, analysis opinions, and appraisal conclusions must correspond to the scope determined in the investigation report, and the expert signatures must be complete | Check the appraisal matters and conclusions in the expert appraisal opinions, compare them with the determination scope of the investigation report, and view the `nodeId` status in the run records |
| User selection node | Each option corresponds to one branch, and the selection result variable has been passed to subsequent nodes | Trigger once to view the node status in the run records, reference `variables` in subsequent nodes and run a trial, and check the branch direction of `nodeId` |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the report materials and the investigation report. Cause: The two materials were entered separately, and cross-material field comparison and traceback verification were not performed.
- Symptom: The expert appraisal opinion cited in the investigation report is an old version, and the conclusion is inconsistent with the current version. Cause: The versions were not synchronized, and the issuance date and document number were not included in the comparison.
- Symptom: The report materials lack a receipt or the investigation report lacks the team leader's signature, yet they still enter the determination branch. Cause: The signature and receipt fields were not set as check items before entering the branch.

## How to verify the setup

Acceptance of this feature: run trials option by option, check the branch direction and interaction status in the run records, confirm that each option corresponds to one branch and that the selection result variable has been passed to subsequent nodes, and check the references to `nodeId` and `variables`.

Business test: ask a cross-material basis question and see whether the answer provides a traceable source.

- Check the options and branch connections one by one in the node, and trigger once to view the node status in the run records.
- Reference `variables` in subsequent nodes and run a trial once, and check the branch direction of `nodeId` and the interaction status records.
