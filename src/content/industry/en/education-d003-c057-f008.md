---
title: Workflow Orchestration for National Key Research and Development Applications: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c057-f008
page_type: 行业问题页
application_area: education
meta_title: National R&D Grants | Workflows | Intake
meta_description: National R&D Grants: review workflows for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for National Key Research and Development Applications: Handle Questions and Collect Missing Information

## What this category's data looks like

This category's data covers three types of materials: the project application form, the budget application form, and the cooperation agreement. The project application form contains research objectives, task breakdown, and assessment indicators, with fields mainly consisting of text and dates; the budget application form contains subject amounts, calculation bases, and undertaking units, with fields mainly consisting of numerical values and ratios; the cooperation agreement contains partner names, division of labor, and signatures/seals, with fields mainly consisting of names and signature dates. The material sources are application system entries and offline sealed scanned copies, and the update cadence is multiple rounds of revision within the application window, with version numbers and receipt dates needing to be checked round by round. When the three types of materials enter the Q&A acceptance and missing-item follow-up function, the project application form plays the role of the basis for research content and indicators, the budget application form plays the role of the basis for funding and subjects, and the cooperation agreement plays the role of the basis for partners and signatures/seals; both missing-item identification and follow-up questions must cite the corresponding material fields.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. "Acceptance records and items to be completed" are then continued and completed by subsequent nodes according to the branches. When the user selection node is triggered, the conversation enters the interaction state and the workflow state is recorded; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Project application form | Name, quantity, and date are compared item by item with the budget application form and cooperation agreement, and signatures and receipts are complete | Check whether the start and end dates of the research period are consistent with the signature date of the cooperation agreement, and check whether the number of assessment indicators is the same in the two materials |
| Budget application form | Subject amounts and calculation bases are traceable, and the undertaking unit name is consistent with the cooperation agreement | Check whether the equipment cost and material cost amounts correspond to the task breakdown in the project application form, and check whether the undertaking unit name is consistent with the signature/seal name in the cooperation agreement |
| Cooperation agreement | Partner names, division of labor, signatures, and receipts are complete, and the version is synchronized with the latest application form | Check whether the partner names are consistent with the undertaking unit in the budget application form, and check whether the signature page or receipt date is missing |
| User selection node | Each option corresponds to one branch, the interaction state is recorded, and the selection result variable is passed to subsequent nodes | Check the options and branch connections one by one in the node, trigger it once to view the node state in the run record, reference `variables` in a subsequent node and run a trial once |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the project application form and the budget application form. Cause: The two materials are filled in separately without cross-checking.
- Symptom: The cooperation agreement version is not synchronized, and the signature page or receipt is missing. Cause: The offline sealed scanned copy was not returned and updated along with the application form.
- Symptom: After selecting an option, the default branch is still followed, and the process stops after the interaction is completed. Cause: The options and branch connections were not checked one by one, and the `nodeId` reference is misaligned.

## How to verify the setup

This function's acceptance: run trials option by option, check the branch direction and interaction state in the run record, confirm that each option corresponds to one branch and that the selection result variable has been passed to subsequent nodes, and check the `variables` and `nodeId` references.

Business test: submit a question missing key information and see whether it first asks a follow-up question before answering; the follow-up content must cite fields from the project application form, budget application form, or cooperation agreement.

- In the user selection node, check the options and branch connections one by one, and trigger it once to view the node state in the run record.
- Reference the selection result variable in a subsequent node and run a trial once, and check whether `variables` and `nodeId` point to the correct branch.
