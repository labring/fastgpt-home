---
title: Workflow Orchestration for National Key Research and Development Applications: Find Supporting Evidence
slug: /en/industry/education-d001-c057-f008
page_type: 行业问题页
application_area: education
meta_title: National R&D Grants | Workflows | Evidence
meta_description: National R&D Grants: review workflows for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for National Key Research and Development Applications: Find Supporting Evidence

## What this category's data looks like

National Key R&D Program project applications involve three types of materials: the project application form, the budget application form, and the cooperation agreement. The project application form contains the project name, undertaking unit, task indicators, start and end dates, and signature fields; the budget application form contains subject amounts, calculation basis, matching funds, and seals; the cooperation agreement contains partner names, task division, funding allocation, signing date, and receipt. The material sources are the application system and the archives room, and the update cadence is synchronized with the application stage and correction notices. The three types of materials play different roles when entering the workflow: the project application form serves as the main basis, the budget application form provides the funding basis, and the cooperation agreement locks in the partners and division of labor. The field characteristic is that the same record often appears in multiple materials with different names, quantities, and dates, and versions and signature receipts need to be compared one by one.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. "Basis items that can be traced back to the original text" are completed by subsequent nodes continuing execution according to the branch. When the node is triggered, the conversation enters an interaction state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Project application form | Whether the fields, dates, and signatures match the budget application form and cooperation agreement | Check item by item the project name, undertaking unit, task indicators, start and end dates, and signature fields, record the locations of discrepancies, and compare in the run record the branch direction corresponding to `nodeId` |
| Budget application form | Whether the subject amounts, calculation basis, matching funds, and seals are consistent with the project application form | Check the amounts, quantities, and dates of the same record, check whether the version number and seal receipt are synchronized, and confirm that the selection result variable referenced in `variables` has been passed in |
| Cooperation agreement | Whether the partner names, task division, funding allocation, signing date, and receipt are complete | Compare against the project application form and budget application form, mark items missing signatures or receipts, and run a trial in a subsequent node to check the `variables` values |
| User selection node | Whether the options and branches correspond one-to-one, and whether the interaction state is recorded | Check the options and branch connections one by one in the node, trigger once, and view the node state and `nodeId` branch direction in the run record |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match across two materials. Cause: The application form and budget form were revised separately, without field-level comparison.
- Symptom: Versions are not synchronized, and current materials are mixed with old versions. Cause: After a correction notice, only one document was updated, while the remaining materials are still old versions.
- Symptom: Signatures or receipts are missing, and items cannot be traced back to the original text. Cause: The cooperation agreement signing process was not closed-loop, and receipts were not archived.

## How to verify the setup

This feature acceptance: run trials option by option, check the branch direction and interaction state in the run record, confirm that the branch corresponding to `nodeId` is consistent with the option, and check that the selection result variable in `variables` has been passed to subsequent nodes.

Business test: ask a basis question that spans materials, and see whether the answer gives a traceable source.

- Check the options and branch connections one by one in the node, trigger once, and view the node state and `nodeId` branch direction in the run record.
- Reference the selection result variable in `variables` in a subsequent node and run a trial once, confirming that the branch direction is consistent with the interaction state record.
