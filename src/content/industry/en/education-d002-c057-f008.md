---
title: Workflow Orchestration for National Key Research and Development Applications: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c057-f008
page_type: 行业问题页
application_area: education
meta_title: National R&D Grants | Workflows | Checks
meta_description: National R&D Grants: review workflows for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for National Key Research and Development Applications: Compare Documents and Locate Differences

## What this category's data looks like

National Key R&D Program project applications involve three types of materials: the project application form, the budget application form, and the cooperation agreement. The project application form is uploaded centrally by the research management department of the lead institution during the application window period, and its fields include project name, project number, start and end dates, participating institutions, and signature page; the budget application form is filled in item by item by the finance department according to budget subjects, and its fields include subject name, amount, funding source, calculation basis, and signature/seal; the cooperation agreement is provided separately by each participating institution, and its fields include partner name, task division, funding allocation, signing date, and seal. The three types of materials come from different sources and are updated at inconsistent rhythms: the application form is often revised over multiple rounds due to review comments, the budget form is resubmitted as subjects are adjusted, and the agreement is supplemented with signatures as participants are added or removed. When the materials enter the workflow orchestration function, the project application form serves as the main record providing baseline fields, while the budget application form and cooperation agreement serve as comparison materials providing fields to be verified. After the three are aligned by project and project number identifiers, they enter the verification and discrepancy location stage.

## Configuration and implementation checks

This stage is executed by workflow nodes (user selection and branching), outputting branch directions and interaction status records. When the user selection node is triggered, the conversation enters an interactive state and records the workflow status. After the user completes the selection, execution continues along the branch corresponding to the selected option. The "discrepancy list" is completed by subsequent nodes continuing execution along the branch. The node does not make choices for the user, nor does it produce business deliverables.

| Object | Check | Verification action |
| --- | --- | --- |
| Project application form | Whether the project name, project number, start and end dates, and signature page are consistent with the budget application form and cooperation agreement | Compare the names, quantities, and dates of the three materials field by field, use `variables` to record discrepant fields, and mark missing signatures or receipts |
| Budget application form | Whether the budget subject names, amounts, funding sources, and calculation bases correspond to the project application form | Check quantities and dates item by item according to subjects, write discrepancies into the branch result corresponding to `nodeId`, and check whether versions are synchronized |
| Cooperation agreement | Whether the partner name, task division, funding allocation, signing date, and seal are complete | Check the names and quantities of participating institutions, compare the signing date with the project start and end dates, and list separately any missing signatures or receipts |
| Discrepancy list | Whether the name, quantity, and date of the same object are consistent in the two materials | Summarize inconsistent fields, submit them to the reviewer for confirmation and write-back, and determine the subsequent processing path according to the branch direction |

## Three common errors

- Phenomenon: The same project has different ways of writing the names of participating institutions in the project application form and the cooperation agreement. Cause: Each participant fills them in according to its own habits, without verification against a unified standard.
- Phenomenon: The amount in the budget application form does not match the funding allocation in the project application form. Cause: Versions were not synchronized after subject adjustments, and the old version of the budget form is still in use.
- Phenomenon: The cooperation agreement lacks signatures or receipts, and the signature page of the application form is incomplete. Cause: The supplementary signing process of participants is delayed, and page-by-page checks were not performed when materials were summarized.

## How to verify the setup

Function acceptance: Try running each option one by one, check the branch direction and interaction status in the run records, confirm that each option corresponds to one branch, and confirm that the process continues downward after the interaction is completed.

Business test: Use one real record to find fields inconsistent with the ledger, and check whether the name, quantity, and date of that record are consistent in the project application form, budget application form, and cooperation agreement.

- In the node, check the options and branch connections one by one, and trigger once to view the node status in the run records.
- Reference the selection result variable in a subsequent node and run a trial once to confirm that the variable has been passed to the subsequent node.
