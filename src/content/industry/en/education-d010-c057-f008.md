---
title: Workflow Orchestration for National Key Research and Development Applications: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c057-f008
page_type: 行业问题页
application_area: education
meta_title: National R&D Grants | Workflows | Operations
meta_description: National R&D Grants: review workflows for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for National Key Research and Development Applications: Coordinate Operations and Application Handover

## What this category's data looks like

National Key R&D Program project application materials mainly consist of the project application form, budget application form, and cooperation agreement. Their source is the application notices and templates issued by the special program management department, and the update cadence advances with application batches and supplementary notices. Their field characteristics center on names, quantities, dates, signatures, and receipts. The project application form carries the research objectives, task breakdown, and assessment indicators, and after entering the workflow it participates in branch decisions as the main record; the budget application form carries subject amounts, calculation bases, and annual allocation, and after entering the workflow it is compared item by item with the main record; the cooperation agreement carries the division of labor among participating units, funding disbursement, and signature/seal information, and after entering the workflow it is used to verify the completeness of signatures and receipts. The names, quantities, and dates of the three types of materials on the same record must be consistent, versions must be synchronized, and signatures and receipts must not be missing, before they can enter the deployment, operations, and application handover stage.

## Configuration and implementation checks

This stage is executed by workflow nodes (user selection and branches), outputting branch directions and interaction status records. The handover-ready deployment status and operation records are completed by subsequent nodes continuing execution according to the branches. When the user selection node is triggered, the conversation enters the interaction state and records the workflow status; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Project application form | Whether the names, quantities, and dates on the same record are consistent with the budget application form and cooperation agreement, whether versions are synchronized, and whether signatures and receipts are complete | In the user selection node, check the options and branch connections one by one; after triggering once, view the node status in the run records, and reference `variables` in a subsequent node for a trial run |
| Budget application form | Whether the names, quantities, and dates on the same record are consistent with the project application form and cooperation agreement, whether versions are synchronized, and whether signatures and receipts are complete | Reference `variables` in a subsequent node and perform a trial run; check whether the options correspond to the branch connections, and confirm that the branch direction pointed to by `nodeId` is consistent with the interaction status record |
| Cooperation agreement | Whether the names, quantities, and dates on the same record are consistent with the project application form and budget application form, whether versions are synchronized, and whether signatures and receipts are complete | In the node, check the options and branch connections one by one; after triggering once, view the node status in the run records, and confirm that the branch direction corresponding to `nodeId` is consistent with the interaction status record |

## Three common errors

- Symptom: The names, quantities, and dates of the same record do not match between the project application form and the budget application form. Cause: The two materials are maintained separately, no item-by-item comparison is performed, and versions are not synchronized.
- Symptom: The cooperation agreement lacks signatures or receipts, making it impossible to confirm the division of labor among participating units and funding disbursement during handover. Cause: The signature/seal process is not closed-loop, and receipts are not archived.
- Symptom: After selecting an option, the default branch is still followed, and the process stops after the interaction is completed. Cause: The options and branch connections were not checked one by one, and the interaction status record was not checked.

## How to verify the setup

Acceptance of this feature: run a trial for each option one by one, check the branch direction and interaction status in the run records, and confirm that the `variables` and `nodeId` references are correct.

Business testing: check item by item once according to the handover form, see which record is missing, and whether the version, connection, and task record are consistent.

- In the user selection node, check the options and branch connections one by one; after triggering once, view the node status in the run records.
- Reference `variables` in a subsequent node and perform a trial run; check the branch direction corresponding to `nodeId` and the interaction status record.
