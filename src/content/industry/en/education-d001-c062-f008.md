---
title: Workflow Orchestration for Research Ethics Review: Find Supporting Evidence
slug: /en/industry/education-d001-c062-f008
page_type: 行业问题页
application_area: education
meta_title: Research Ethics | Workflows | Evidence
meta_description: Research Ethics: review workflows for evidence lookup. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Research Ethics Review: Find Supporting Evidence

## What this category's data looks like

Research ethics review involves three types of materials: ethics review applications, informed consent form templates, and risk assessment forms. The application records the project name, acceptance number, submission date, and responsible person's signature; the consent form template records the version number, revision date, subject signature field, and receipt; the risk assessment form records the risk level, assessment date, and reviewer's signature. After the materials enter the workflow, the application serves as the main record, while the consent form template and risk assessment form serve as comparison materials for subsequent nodes to check field by field the name, quantity, date, and signature. The update rhythm rolls with project acceptance and revisions, and the current effective version prevails. The field characteristic is that the same record often appears across materials, and the name, quantity, and date need to be aligned item by item; missing signatures or receipts are considered incomplete.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. "Basis items that can refer back to the original text" are completed by subsequent nodes continuing execution according to the branch. When the node is triggered, the conversation enters an interactive state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Ethics review application | Fields include project name, acceptance number, submission date, and responsible person's signature, and must be aligned item by item with the consent form template and risk assessment form | In the node, check the options and branch connections one by one, use `variables` to reference the selection result, and view the `nodeId` status in the run record |
| Informed consent form template | The version number and revision date must be currently effective, and the subject signature field and receipt must not be missing | Trigger a user selection node once, and in the run record check whether the material version and signature receipt are complete |
| Risk assessment form | The risk level, assessment date, and reviewer's signature must be consistent with the name, quantity, and date in the application record | In a subsequent node, reference the selection result variable and run a trial once, checking whether the cross-material dates and quantities match |
| User selection node | Each option corresponds to one branch; when entering the node the state is recorded, and the selection result is passed to subsequent nodes | Run a trial for each option one by one, and check the branch direction and interaction state in the run record |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match across two materials. Cause: The application and consent form template are maintained separately, without cross-material field-by-field comparison.
- Symptom: The version is not synchronized, and the revision date of the consent form template is earlier than the current version. Cause: After revision, the comparison material was not updated synchronously, and the old version is still referenced.
- Symptom: Missing signature or receipt, and the risk assessment form has no reviewer's signature. Cause: The signature field was not verified during material circulation, and the process directly entered the next stage after interaction was completed.

## How to verify the setup

Acceptance of this feature: Run a trial for each option one by one, check the branch direction and interaction state in the run record, and confirm that each option corresponds to one branch and that the selection result variable has been passed to subsequent nodes.

Business test: Ask a cross-material basis question, see whether the answer gives a citable source, and check that the basis comes from the institution’s materials, that the version is current, and that the items match the original text.

- In the node, check the options and branch connections one by one, use `variables` to reference the selection result, and run a trial once.
- Trigger a user selection node once, view the `nodeId` status and branch direction in the run record, and confirm that the process continues after the interaction is completed.
