---
title: Workflow Orchestration for National Key Research and Development Applications: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c057-f008
page_type: 行业问题页
application_area: education
meta_title: National R&D Grants | Workflows | Multilingual
meta_description: National R&D Grants: review workflows for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for National Key Research and Development Applications: Handle Multilingual Materials and Terminology

## What this category's data looks like

National Key R&D Program project applications involve three types of materials: the project application form, the budget application form, and the cooperation agreement. The project application form contains research objectives, task breakdown, participating units, start and end dates, and signature pages; the budget application form contains subject amounts, sources and matching funds, budget years, and seals; the cooperation agreement contains partner names, task division, funding allocation, signing dates, and receipts. In the three types of materials, the names, quantities, and dates of the same record must correspond to one another; after a version update, they must be replaced in sync, and signatures and receipts must be complete. During multilingual materials and terminology processing, the project application form provides the Chinese terminology and the basis for translated names, the budget application form provides numeric and date fields, and the cooperation agreement provides entity names and signing information; the three together enter workflow orchestration to form a unified terminology table and a bilingual comparison draft.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. The "unified terminology table and bilingual comparison draft" is then completed by subsequent nodes continuing execution according to the branch. When the user selection node is triggered, the conversation enters the interaction state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Project application form | The name, date, and signature fields must be consistent with the budget application form and the cooperation agreement | Compare field by field the project name, start and end dates, and participating units across the three materials, and check whether the signature pages and receipts are complete |
| Budget application form | The quantities, amounts, and budget years must correspond to the project application form and the cooperation agreement | Check the subject amounts, matching fund sources, and budget years, and check whether the quantities and dates of the same record match across the two materials |
| Cooperation agreement | The partner names, task division, and signing dates must be consistent with the other two materials | Check the partner names, task division, funding allocation, and signing dates, and check whether versions are in sync and whether signatures and receipts are missing |
| Unified terminology table and bilingual comparison draft | The same term is consistent throughout the entire text, and the translated name can refer back to the source text | In subsequent nodes, reference `variables` and `nodeId`, and extract three terms to check whether their usage is consistent throughout the entire text |

## Three common errors

- Symptom: The same project name is written differently in the project application form and the budget application form. Cause: The two materials were updated separately, versions were not synchronized, and fields were not cross-checked.
- Symptom: The funding amount in the cooperation agreement does not match the budget application form. Cause: Quantity and date fields were entered separately, lacking a unified terminology table and a bilingual comparison draft that refers back to the source text.
- Symptom: The project application form is missing a signature or receipt, yet the process still continues. Cause: Signatures and receipts were not included in branch judgment, and material completeness was not verified after the interaction was completed.

## How to verify the setup

Acceptance of this feature: Try running each option one by one, check the branch directions and interaction states in the run records, and confirm that the options match the branch connections and that the selection result variable has been passed to subsequent nodes.
Business testing: Extract three terms to check whether their usage is consistent throughout the entire text, and check that the translated names can refer back to the source text.

- In the node, check the options and branch connections one by one; after triggering once, view the node status and branch directions in the run records.
- In subsequent nodes, reference `variables` and `nodeId` and run once to confirm that the selection result variable has been passed and that the process continues execution after the interaction is completed.
