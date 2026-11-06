---
title: Workflow Orchestration for National Key Research and Development Applications: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c057-f008
page_type: 行业问题页
application_area: education
meta_title: National R&D Grants | Workflows | Access
meta_description: National R&D Grants: review workflows for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for National Key Research and Development Applications: Manage Authorized Access and External Services

## What this category's data looks like

National Key R&D Program project applications involve three types of materials: project application forms, budget application forms, and cooperation agreements. The project application form contains the project name, undertaking unit, start and end dates, task breakdown, and signature page; the budget application form contains subject names, quantities, amounts, and dates; the cooperation agreement contains partner unit names, division of work, quantities, and signature receipts. The three types of materials are updated intensively during the application window, versions iterate frequently, and there are many cross-references between fields. When the materials enter workflow orchestration, the project application form serves as the main record, while the budget application form and cooperation agreement serve as related materials providing quantities, dates, and signature information respectively, for the authorized access and external services stages to route by visibility scope.

## Configuration and implementation checks

This stage is executed by workflow nodes (user selection and branching), outputting branch directions and interaction status records. "Externally available entry points and authorization scope" are completed by subsequent nodes continuing execution according to the branch. When the user selection node is triggered, the conversation enters an interaction state and records the workflow status; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Project application form | Whether the name, date, and signature page are consistent across the three types of materials | Check the project name, start and end dates, and signature page item by item, compare the same record in the budget application form and cooperation agreement, and check for missing signatures or receipts |
| Budget application form | Whether the subject names, quantities, and dates match the project application form | Check the subject names and quantities, compare the date fields, confirm the version is synchronized with the project application form, and record inconsistencies |
| Cooperation agreement | Whether the partner unit names, division of work, quantities, and signature receipts are complete | Check the partner unit names and quantities, inspect the signatures and receipts, and confirm consistency with the project application form version |
| User selection node | Each option corresponds to one branch, and the interaction status is recorded | Check the options and branch connections one by one in the node, trigger it once to view the node status in the run records, reference `variables` and `nodeId` in subsequent nodes, and perform a trial run |

## Three common errors

- Symptom: The name and quantity of the same record do not match between the project application form and the budget application form. Cause: The two materials are maintained separately, versions are not synchronized, and fields are not cross-checked.
- Symptom: The cooperation agreement lacks signatures or receipts, and the date is inconsistent with the project application form. Cause: The signature process and the application process run in parallel, receipts are not archived, and dates are not backfilled.
- Symptom: After selecting an option, the default branch is still taken, and the process stops after the interaction is completed. Cause: The options and branch connections were not checked one by one, and the interaction status was not confirmed in the run records.

## How to verify the setup

Acceptance of this feature: perform a trial run for each option, check the branch direction and interaction status in the run records, confirm that each option corresponds to one branch, and that the process continues after the interaction is completed.

Business test: access once with a restricted identity, see whether the visibility scope matches the settings, and that unauthorized content is not visible.

- Check the options and branch connections one by one in the node, and trigger it once to view the node status in the run records.
- Reference `variables` and `nodeId` in subsequent nodes and perform a trial run once to confirm that the selection result variable has been passed to the subsequent nodes.
