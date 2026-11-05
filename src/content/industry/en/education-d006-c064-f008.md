---
title: Workflow Orchestration for University Laboratory Safety Classification: Track Progress and Check Statistics
slug: /en/industry/education-d006-c064-f008
page_type: 行业问题页
application_area: education
meta_title: Lab Safety Categories | Workflows | Progress
meta_description: Lab Safety Categories: review workflows for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for University Laboratory Safety Classification: Track Progress and Check Statistics

## What this category's data looks like

This page addresses the scenario of university laboratory safety grading and classification. The materials come from three types of ledgers: the grading and classification table, the hazard source list, and the safety responsibility letter, typically updated weekly or monthly. The grading and classification table records the laboratory name, category level, hazard source type and quantity, responsible person, date, and signature field; the hazard source list records specific hazard source entries, quantities, storage locations, and update dates; the safety responsibility letter records the responsibility hierarchy, signatures, and receipts. When the three types of materials enter the workflow, their roles differ: the grading and classification table serves as the main record providing laboratory and level fields, the hazard source list serves as the detail source for verifying quantities and dates, and the safety responsibility letter serves as the signature and receipt credential for verifying completeness. The same record may have mismatched names, quantities, or dates across the three materials, unsynchronized versions, or missing signatures and receipts. Therefore, it is necessary to write the progress records and statistical criteria into the header, and then verify the totals item by item according to branches.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branches), outputting branch directions and interaction state records. The "progress table and statistical criteria description" is completed by subsequent nodes continuing execution according to branches. When a node is triggered, the conversation enters an interaction state and records the workflow state. After the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| User selection node | Each option corresponds to one branch; options and branch connections need to be checked one by one | Check options and branch connections one by one in the node; after a trial run, view the branch directions and interaction state in the run records |
| Laboratory grading and classification table | Fields, dates, and signatures need to match the hazard source list and safety responsibility letter | Compare the name, quantity, date, and signature receipt in the grading and classification table, hazard source list, and safety responsibility letter one by one by laboratory name and date |
| Hazard source list | The number of hazard source entries and update dates need to be consistent with the grading and classification table | Use one week of records to verify the totals, check whether the criteria and exceptions are clearly stated, and reference `variables` in subsequent nodes for a trial run |
| Safety responsibility letter | Signatures and receipts must not be missing, and the version must be synchronized with the grading and classification table | Check the signature field and receipt, and confirm that the branch direction corresponding to `nodeId` is consistent with the interaction state record |

## Three common errors

- Phenomenon: The name, quantity, or date of the same laboratory do not match across two materials. Cause: The grading and classification table and the hazard source list are updated separately and are not verified according to the same criteria.
- Phenomenon: Versions are not synchronized, and an old version of the responsibility letter is still referenced. Cause: Inconsistent update rhythms and lack of version verification actions.
- Phenomenon: Missing signatures or receipts. Cause: The totals include a responsibility letter whose signed copy remains uncollected.

## How to verify the setup

This feature acceptance: run trials option by option, check the branch directions and interaction state in the run records, and confirm that `variables` have been passed to subsequent nodes and that `nodeId` corresponds to the correct branch connections.

Business testing: use one week of records to verify the totals, check whether the criteria and exceptions are clearly stated, and confirm that the record count and statistical count match and that the criteria are written into the header.

- Check options and branch connections one by one in the node, trigger once, and view the node status and branch directions in the run records.
- Reference the selection result variable in subsequent nodes and run a trial once, verifying the one-week record totals and the statistical criteria description.
