---
title: Workflow Orchestration for Research Ethics Review: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c062-f008
page_type: 行业问题页
application_area: education
meta_title: Research Ethics | Workflows | Operations
meta_description: Research Ethics: review workflows for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Research Ethics Review: Coordinate Operations and Application Handover

## What this category's data looks like

Research ethics review materials include ethics review applications, informed consent form templates, and risk assessment forms. Their sources are institutional ethics committees and project teams, and their update cadence changes with project phases and regulatory adjustments. Field characteristics center on subject information, risk level, signature date, and version number, and the three materials often circulate in parallel. When entering workflow orchestration, the ethics review application serves as the mainline trigger node, while the informed consent form template and risk assessment form serve as reference materials for parallel branches, each carrying a version number and a signature receipt. When materials are passed between nodes, field names, quantities, and dates must remain consistent within the same record. If versions are not synchronized or a signature receipt is missing, subsequent branches cannot continue.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branches), outputting branch direction and interaction state records. The handover-ready deployment state and operation records are completed by subsequent nodes continuing execution according to the branches. When the user selection node is triggered, the conversation enters an interaction state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Ethics review application | Whether fields, dates, and signatures align item by item with the informed consent form template and risk assessment form | Check options and branch connections one by one in the node, and inspect the application number and signature date |
| Informed consent form template | Whether the version number and signature receipt are synchronized with the ethics review application | Trigger a user selection node once, and view the node status and template version in the run records |
| Risk assessment form | Whether the risk level, quantity, and date are consistent with the application and the consent form | Reference the selection result variable in a subsequent node and run a trial once, and check the risk level |
| User selection node | Whether each option corresponds to one branch and the branch direction is correct | Check options and branch connections one by one in the node, and record `nodeId` and `variables` |

## Three common errors

- Symptom: The name and quantity for the same subject number do not match between the application and the consent form. Cause: The versions of the two materials are not synchronized, and field mapping was not checked against the same record.
- Symptom: The date on the risk assessment form is inconsistent with the signature date on the ethics review application. Cause: The update cadence differs, and an old version entered the branch without a receipt.
- Symptom: The informed consent form template is missing a signature or receipt but still follows the default branch. Cause: The selection result variable was not passed to subsequent nodes, and the interaction state was not recorded.

## How to verify the setup

This feature acceptance: run trials option by option, check the branch direction and interaction state in the run records, and confirm that `variables` and `nodeId` can be referenced in subsequent nodes.

Business test: check item by item once according to the handover form, and see which record is missing

- Check options and branch connections one by one in the node, and record the branch direction and interaction state
- Reference the selection result variable in a subsequent node and run a trial once, and check that the version, connection, and task record are consistent
