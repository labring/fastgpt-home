---
title: Workflow Orchestration for Research Ethics Review: Track Progress and Check Statistics
slug: /en/industry/education-d006-c062-f008
page_type: 行业问题页
application_area: education
meta_title: Research Ethics | Workflows | Progress
meta_description: Research Ethics: review workflows for progress tracking. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Research Ethics Review: Track Progress and Check Statistics

## What this category's data looks like

Research ethics review involves three types of materials: ethics review applications, informed consent form templates, and risk assessment forms. Applications are submitted by researchers, templates come from the institutional version repository, and risk forms are filled out by the project team. In terms of update cadence, applications are submitted according to project milestones, templates are revised annually or when regulations change, and risk forms are refilled when the protocol is adjusted. Field characteristics center on names, quantities, dates, and signatures: the project name, number of subjects, and submission date in the application; the version number and signature block in the template; and the assessment date and responsible person's signature in the risk form. When these three types of materials enter workflow orchestration, the application serves as the main record that triggers branches, the template serves as a reference document to verify the version, and the risk form serves as the basis for exceptions to decide whether to take the supplementary review branch. Mismatched fields will directly affect the direction of subsequent nodes.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction status records. The "progress table and statistical criteria description" is continued and completed by subsequent nodes according to the branch. When the user selection node is triggered, the conversation enters an interactive state and records the workflow status; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Ethics review application | The name, quantity, date, and signature are consistent within the application and correspond to the template version number | Check the options and branch connections one by one in the node, and use `variables` to reference the selection result for a trial run |
| Informed consent form template | The version number and signature block are complete, and the template date matches the date referenced in the application | Trigger a user selection node once, and check the node status and `nodeId` in the run record |
| Risk assessment form | The assessment date, responsible person's signature, and exception explanation are clearly written, and the quantity is consistent with the application | Reference `variables` in subsequent nodes and run a trial to confirm the branch direction and interaction status record |
| Progress table and statistical criteria description | The recorded count matches the statistical count, the criteria are written in the header, and exceptions are listed separately | Use one week of records to verify the totals, and check whether the criteria and exceptions are clearly written |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the application and the risk form. Cause: The two materials are filled out separately, and field comparison is not done before submission.
- Symptom: The template version is not synchronized, and the application references the signature block of an old version. Cause: After the version repository is updated, the application is not written back, and the node branch still follows the old version.
- Symptom: The risk form lacks a signature or receipt, but the progress table still includes it in the total. Cause: The statistical criteria do not list exceptions separately, and signatures are not checked one by one during verification.

## How to verify the setup

Acceptance of this feature: Run trials for each option one by one, check the branch direction and interaction status in the run record, and confirm that `nodeId` and `variables` are passed correctly.

Business test: Use one week of records to verify the totals, and check whether the criteria and exceptions are clearly written

- Check the options and branch connections one by one in the node, and confirm that each option corresponds to one branch
- Reference the selection result variable in subsequent nodes and run a trial once, then check the branch direction and interaction status record
