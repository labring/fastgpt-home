---
title: Workflow Orchestration for National Key Research and Development Applications: Track Progress and Check Statistics
slug: /en/industry/education-d006-c057-f008
page_type: 行业问题页
application_area: education
meta_title: National R&D Grants | Workflows | Progress
meta_description: National R&D Grants: review workflows for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for National Key Research and Development Applications: Track Progress and Check Statistics

## What this category's data looks like

National Key R&D Program project applications involve three types of materials: the project application form, the budget application form, and the cooperation agreement. The project application form is jointly filled in by the applicant unit and participating units, is updated according to the application notice, and its fields include project name, principal investigator, start and end dates, participating units, and signature page; the budget application form comes from finance and the project leader, is updated according to the budget preparation basis, and its fields include subject name, quantity, amount, and self-raised matching funds; the cooperation agreement comes from the cooperating parties, is updated according to signing progress, and its fields include cooperating party name, task division, funding allocation, and signatures/seals. When these three types of materials enter workflow orchestration, each serves as an independent verification object: the project application form provides the task and indicator basis, the budget application form provides the quantity and amount basis, and the cooperation agreement provides the participant and signature basis. The three are grouped by the same project number for subsequent progress recording and statistical verification comparison.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction status records. The "progress table and statistical basis description" is then completed by subsequent nodes continuing execution according to the branch. When the user selection node is triggered, the conversation enters an interactive state and the workflow status is recorded; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Project application form | Check against the budget application form and cooperation agreement whether the project name, number of participating units, start and end dates, and signature page are consistent | Check the options and branch connections one by one in the node, reference `variables` to record the selection result, and after a trial run view the node status in the run record |
| Budget application form | Check against the project application form and cooperation agreement whether the subject name, quantity, amount, and self-raised matching funds match | Reference the variable corresponding to `nodeId` in subsequent nodes and run a trial once to confirm that the selection result variable has been passed to subsequent nodes |
| Cooperation agreement | Check against the project application form and budget application form whether the cooperating party name, funding allocation, signing date, and signature/seal receipt are complete | Trigger a user selection node once and view whether the node status and branch direction in the run record correspond to the selected option |
| Progress table and statistical basis description | The recorded count and statistical count match, the basis is written in the header, and exceptional cases are noted in the table | Use one week of records to verify the total, check whether the basis and exceptions are clearly written, then proceed to the weekly or monthly report |

## Three common errors

- Symptom: the name, quantity, and date of the same record do not match between the project application form and the budget application form. Cause: the two materials are updated separately and are not grouped and compared by the same project number.
- Symptom: the cooperation agreement version is not synchronized, and the signature page is inconsistent with the latest task division. Cause: the version returned by the cooperating party is not aligned with the version of the application materials, and a version verification step is missing.
- Symptom: signatures or receipts are missing, but the progress table still includes them in the total. Cause: the statistical basis does not list signature status as an exception item, so a difference arises between the recorded count and the statistical count.

## How to verify the setup

Feature acceptance: run a trial for each option one by one, check the branch direction and interaction status in the run record, confirm that each option corresponds to one branch, and that the selection result variable has been passed to subsequent nodes.

Business testing: use one week of records to verify the total, see whether the basis and exceptions are clearly written, and proceed to the weekly or monthly report only after the recorded count and statistical count match.

- Check the options and branch connections one by one in the node, and after triggering once view the node status and branch direction in the run record.
- Reference the variables corresponding to `variables` and `nodeId` in subsequent nodes and run a trial once to confirm that the selection result variable has been passed in.
