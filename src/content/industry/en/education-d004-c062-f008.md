---
title: Workflow Orchestration for Research Ethics Review: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c062-f008
page_type: 行业问题页
application_area: education
meta_title: Research Ethics | Workflows | Handover
meta_description: Research Ethics: review workflows for material handover. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Research Ethics Review: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

In the research ethics review scenario, materials mainly consist of ethics review applications, informed consent form templates, and risk assessment forms. The sources are the institutional review board and the project team, and the update cadence advances with protocol revisions, annual reviews, and project closeout milestones. Field characteristics center on subject names, sample quantities, dates, version numbers, signatures, and receipts. When entering workflow orchestration, the ethics review application assumes the role of the primary record, while the informed consent form template and risk assessment form serve as supporting materials. The three must maintain consistent names, quantities, and dates for the same record, synchronized versions, and complete signatures and receipts. Workflow nodes are responsible for triggering user selections during material circulation, recording interaction states, and driving branch directions, so that issuable material drafts and handover records are completed by subsequent nodes continuing execution along the branches.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. Issuable material drafts and handover records are completed by subsequent nodes continuing execution along the branches. When a node is triggered, the conversation enters an interaction state and records the workflow state. After the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Ethics review application | Fields complete, responsible person clear, version and date consistent | Verify the subject names, sample quantities, dates, and signatures in the application, and confirm they are consistent with the informed consent form template and risk assessment form; check the options and branch connections one by one in the node, and reference `variables` in a subsequent node for a trial run |
| Informed consent form template | Fields complete, responsible person clear, version and date consistent | Verify the names, quantities, dates, and version numbers in the template, and confirm they match the ethics review application and risk assessment form; trigger a user selection node once and check the node status and `nodeId` in the run record |
| Risk assessment form | Fields complete, responsible person clear, version and date consistent | Verify the names, quantities, dates, and signature receipts in the risk assessment form, and confirm they are consistent with the ethics review application and informed consent form template; check whether the process continues after the interaction is completed, to avoid still following the default branch after selecting a certain option |
| Handover record | Fields complete, responsible person clear, version and date consistent | Verify the responsible person, date, version, and receipt in the handover record, and confirm they are synchronized with the three materials; reference the selection result variable in a subsequent node and perform a trial run to confirm the branch direction is correct |

## Three common errors

- Symptom: The same subject name, sample quantity, or date does not match between the ethics review application and the informed consent form template. Cause: The field sources were not unified during material drafting, and versions were not synchronized.
- Symptom: The version number of the risk assessment form is inconsistent with the version number of the ethics review application, yet the handover record is still signed off according to the old version. Cause: After the version update, it was not synchronized to all materials, and the node branch did not execute according to the latest option.
- Symptom: The informed consent form template lacks a signature or the handover record lacks a receipt, yet the process still proceeds to the next stage. Cause: Field completeness was not blocked in the node interaction state, and subsequent nodes did not continue execution along the branch.

## How to verify the setup

Acceptance for this feature: run trials for each option one by one, and check the branch direction and interaction state in the run record; reference `variables` and `nodeId` in subsequent nodes to confirm that the selection result variable has been passed to the subsequent nodes, and that the process continues execution after the interaction is completed.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- Check the options and branch connections one by one in the node, trigger a user selection node once, and check the node status in the run record.
- Reference the selection result variable in a subsequent node and perform a trial run to confirm that the branch direction and interaction state records are correct.
