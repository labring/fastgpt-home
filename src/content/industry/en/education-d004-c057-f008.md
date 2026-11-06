---
title: Workflow Orchestration for National Key Research and Development Applications: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c057-f008
page_type: 行业问题页
application_area: education
meta_title: National R&D Grants | Workflows | Handover
meta_description: National R&D Grants: review workflows for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for National Key Research and Development Applications: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This category's data looks like
National Key R&D Program project applications involve three types of materials: the project application form, the budget application form, and the cooperation agreement. The sources are the application guidelines, the unit's basic information, and agreements with collaborating parties, and the update cadence rolls with application batches. The project application form fields include project name, responsible person, start and end dates, and signature page; the budget application form fields include subject name, quantity, amount, preparation date, and approval signature; the cooperation agreement fields include collaborating party name, task division, funding allocation, signing date, and receipt. When the three types of materials enter the workflow, the project application form serves as the main record, while the budget application form and cooperation agreement serve as supporting records, each taking on the roles of field source and responsibility handover.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branches), outputting branch direction and interaction state records. "Signable material drafts and handover records" are then completed by subsequent nodes continuing execution along the branches. When the user selection node is triggered, the conversation enters an interaction state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Project application form | Project name, responsible person, start and end dates, and signature page are complete, and the name, quantity, and dates match the same record in the budget application form and cooperation agreement | Check the options and branch connections one by one in the node, and reference `variables` and `nodeId` to view the branch direction |
| Budget application form | Subject name, quantity, amount, preparation date, and approval signature are complete, and the quantity and dates match the same record in the project application form | Trigger once, view the node status in the run record, and check whether the interaction state is recorded |
| Cooperation agreement | Collaborating party name, task division, funding allocation, signing date, and receipt are complete, and the version is synchronized with the project application form | Reference the selection result variable in a subsequent node and run a trial once, and check whether the receipt and signature have any missing items |
| Handover record | The responsible person is clear, the version and date are consistent, and the acceptance fields for the next stage are complete | Draft one according to the template and complete one handover, and check whether missing items are blocked |

## Three common errors

- Symptom: The name, quantity, and dates of the same record do not match between the project application form and the budget application form. Cause: The two materials were drafted separately and the fields were not checked against the same record.
- Symptom: The cooperation agreement version is not synchronized, and the signing date and receipt are missing. Cause: After the version was updated, it was not written back to the handover record, and the signature and receipt did not flow with the version.
- Symptom: After the interaction is completed, the process stops, and even after selecting an option it still follows the default branch. Cause: The options and branch connections were not checked one by one, and the selection result variable was not passed to subsequent nodes.

## How to verify the setup

Acceptance for this feature: run trials for each option one by one, check the branch direction and interaction state in the run record, confirm that options and branches correspond one to one, and that `variables` and `nodeId` can be referenced in subsequent nodes.

Business test: draft one according to the template and complete one handover, see whether missing items are blocked, and after the fields are complete, the responsible person is clear, and the version and date are consistent, submit it to the next stage for acceptance.

- Check the options and branch connections one by one in the node, and trigger once to view the node status in the run record.
- Reference the selection result variable in a subsequent node and run a trial once, and check whether the name, quantity, and dates of the same record are consistent in the two materials.
