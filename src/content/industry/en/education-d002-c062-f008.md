---
title: Workflow Orchestration for Research Ethics Review: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c062-f008
page_type: 行业问题页
application_area: education
meta_title: Research Ethics | Workflows | Checks
meta_description: Research Ethics: review workflows for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Research Ethics Review: Compare Documents and Locate Differences

## What this category's data looks like

In the research ethics review scenario, materials are usually maintained separately by researchers, ethics secretaries, and committee members, with three common types: ethics review applications, informed consent form templates, and risk assessment forms. The application contains the project name, number of subjects, start and end dates, and signature fields; the consent form template contains the version number, version date, signature page, and receipt; the risk assessment form contains the risk level, handling measures, assessment date, and signature. Material sources are dispersed, and the update rhythm is affected by protocol revisions, version upgrades, and supplementary signatures by committee members. The field characteristics are consistency anchors centered on names, quantities, dates, and signatures. When entering workflow orchestration, the three types of materials each assume the role of verification objects: the application serves as the main record, while the consent form template and risk assessment form serve as comparison materials, used to locate discrepancies in the name, quantity, and date of the same record across the two materials.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction status records. The "discrepancy list" is completed by subsequent nodes continuing execution according to the branch. When the user selection node is triggered, the conversation enters an interactive state and records the workflow status. After the selection is completed, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Ethics review application | Whether the project name, number of subjects, start and end dates, and signature fields are consistent with the consent form template and risk assessment form | Check the options and branch connections one by one in the node, reference `variables` and `nodeId` to locate fields, and record inconsistent fields |
| Informed consent form template | Whether the version number, version date, signature page, and receipt are synchronized with the application and risk assessment form | Trigger an interaction, check the node status in the run record, and compare cases of unsynchronized versions and missing signatures |
| Risk assessment form | Whether the risk level, handling measures, assessment date, and signature are aligned with the application and consent form template | Reference the selection result variable in subsequent nodes and run a trial once, output the discrepancy list for the reviewer to confirm and write back |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match between the application and the consent form template. Cause: The two materials are maintained separately, lacking a unified field anchor and comparison step.
- Phenomenon: The consent form template version is not synchronized, and the signature page is still the old version. Cause: After the version upgrade, material verification was not triggered, and the version number and version date were not written back to the ledger.
- Phenomenon: The risk assessment form lacks a signature or receipt, but the process still continues. Cause: After the interaction is completed, the signature field was not verified according to the branch, and the status record did not cover the supplementary signature step.

## How to verify the setup

Acceptance of this feature: Run trials option by option, check the branch direction and interaction status in the run record, and confirm that `variables` and `nodeId` can be referenced in subsequent nodes.

Business test: Use a real record to find fields inconsistent with the ledger, form a discrepancy list, submit it to the reviewer for confirmation, and write it back.

- In the user selection node, check the options and branch connections one by one, and confirm that each option corresponds to one branch.
- Trigger an interaction, check the node status in the run record, and confirm that the selection result variable has been passed to subsequent nodes.
