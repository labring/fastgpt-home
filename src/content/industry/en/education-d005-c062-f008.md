---
title: Workflow Orchestration for Research Ethics Review: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c062-f008
page_type: 行业问题页
application_area: education
meta_title: Research Ethics | Workflows | Versions
meta_description: Research Ethics: review workflows for version tracking. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Research Ethics Review: Maintain Document Versions and Changes

## What this category's data looks like

Research ethics review involves three types of materials: ethics review applications, informed consent form templates, and risk assessment forms. An ethics review application contains the project name, review category, date, and signature field; an informed consent form template contains the study name, version number, signature and acknowledgment fields; a risk assessment form contains risk items, quantity, level, assessment date, and signature. The material sources are the institutional ethics committee template library and successive revision drafts, and the update cadence is triggered by regulatory or protocol adjustments. When entering workflow orchestration, the three types of materials each assume a role: the ethics review application is the main record, while the informed consent form template and risk assessment form are referenced materials, and fields, dates, and signatures must correspond item by item.

## Configuration and implementation checks

This stage is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. The "version ledger and change records" are completed by subsequent nodes continuing execution according to the branch. When a node is triggered, the conversation enters an interactive state and records the workflow state; after the user completes a selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Ethics review application | Fields, dates, and signatures must correspond item by item with the referenced materials | Check the options and branch connections one by one in the node, and confirm that the project name, review category, date, and signature field in the application are consistent with the informed consent form template and risk assessment form |
| Informed consent form template | The version number and the signature and acknowledgment fields must correspond to the current version | Trigger once, check the node status in the run record, and verify whether the template version number, signature date, and acknowledgment fields are synchronized with the application record |
| Risk assessment form | Risk items, quantity, level, assessment date, and signature must be traceable | Reference `variables` in subsequent nodes and run a test once, and verify whether the risk item names, quantity, level, assessment date, and signature correspond to the application and template |
| Version ledger and change records | The current version is unique, old versions are traceable, and references are synchronized | Reference `nodeId` and `variables` in subsequent nodes, and verify whether the version number, change date, and reference location in the ledger are updated synchronously with content modifications |

## Three common errors

- Symptom: The project name, quantity, and date for the same record do not match between the application and the informed consent form template. Cause: The materials were revised separately without writing back to the main record, and the field sources are not unified.
- Symptom: The risk assessment form has been updated, but the application and template still reference the old version. Cause: The version was not synchronized, the old version was not marked as invalid, and the reference path was not adjusted with the change.
- Symptom: The informed consent form template lacks a signature or acknowledgment field, and the signature field in the application is empty. Cause: The signing and acknowledgment steps were not included in the change records, and the version ledger does not cover signature status.

## How to verify the setup

Acceptance for this feature: run tests option by option, check the branch directions and interaction states in the run records, confirm that the selection result variables have been passed to subsequent nodes, and verify whether the `nodeId` and `variables` references are correct.

Business test: change one piece of content, see whether the version number and references are updated synchronously, and confirm that the current version is unique, old versions are traceable, and references are synchronized.

- Check the options and branch connections one by one in the node, and confirm that each option corresponds to one branch
- Trigger the user selection node once, check the node status in the run record, and confirm that the process continues after the interaction is completed
