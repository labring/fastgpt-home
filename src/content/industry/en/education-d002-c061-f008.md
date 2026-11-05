---
title: Workflow Orchestration for Research Outcome Registration and Intellectual Property: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c061-f008
page_type: 行业问题页
application_area: education
meta_title: Research IP | Workflows | Checks
meta_description: Research IP: review workflows for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Research Outcome Registration and Intellectual Property: Compare Documents and Locate Differences

## What this category's data looks like

Research achievement registration and intellectual property management involves three types of materials: achievement registration forms, patent disclosure documents, and software copyright materials. Achievement registration forms are filled in by project teams and updated by batch, with fields including achievement name, contributors, date, quantity, and signature; patent disclosure documents are submitted by inventors and iterate with versions, with fields including technology name, inventors, filing date, list of drawings, and signature; software copyright materials are organized by development teams and updated at registration milestones, with fields including software name, version number, completion date, code volume, and receipt. When the three types of materials enter the material verification and discrepancy localization workflow, the achievement registration form serves as the master ledger, while patent disclosure documents and software copyright materials serve as comparison sources; names, quantities, dates, and signatures are checked field by field, and after discrepancies are localized, they are handed to the reviewer for confirmation and written back.

## Configuration and implementation checks

This step is executed by a workflow node (user selection and branching), outputting branch directions and interaction state records. The "discrepancy list" is then completed by subsequent nodes continuing execution according to the branch. When the user selection node is triggered, the conversation enters an interaction state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Achievement registration form | Whether the name, quantity, date, and signature are consistent with the patent disclosure document | Compare the two materials field by field, record inconsistent fields, and use `variables` to pass the discrepancy values |
| Patent disclosure document | Whether the version number, filing date, and list of drawings are synchronized with the ledger | Check the version and date fields, and use `nodeId` in subsequent nodes to locate the source node |
| Software copyright materials | Whether the software name, version number, completion date, and receipt are complete | Check the signature and receipt; mark missing items as pending review and write them into the interaction state record |
| User selection node | Whether each option corresponds to one branch and the branch direction is correct | Trial-run each option and check the branch direction and interaction state in the run record |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the achievement registration form and the patent disclosure document. Cause: The two materials are filled in separately, and no field-level comparison was performed.
- Symptom: The version of the software copyright materials is not synchronized, and an old version of the disclosure document is still referenced. Cause: Re-verification was not triggered after the version update.
- Symptom: The patent disclosure document lacks a signature or the software copyright materials lack a receipt. Cause: The signature and receipt fields were not checked after the interaction was completed.

## How to verify the setup

This feature's acceptance: trial-run each option, check the branch direction and interaction state in the run record, and confirm that `variables` has been passed to subsequent nodes and that `nodeId` points to the correct source node.

Business test: use one real record to find fields inconsistent with the ledger, hand them to the reviewer for confirmation, and write them back.

- In the user selection node, check each option and branch connection one by one, and trial-run once to view the interaction state record
- Reference the selection result variable in subsequent nodes and trial-run to confirm that the discrepancy list continues execution according to the branch
