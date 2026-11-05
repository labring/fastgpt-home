---
title: Workflow Orchestration for Research Outcome Registration and Intellectual Property: Find Supporting Evidence
slug: /en/industry/education-d001-c061-f008
page_type: 行业问题页
application_area: education
meta_title: Research IP | Workflows | Evidence
meta_description: Research IP: review workflows for evidence lookup. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Research Outcome Registration and Intellectual Property: Find Supporting Evidence

## What this category's data looks like

This category's data involves three types of materials: achievement registration forms, patent disclosure documents, and software copyright materials. Achievement registration forms record the achievement name, completers, registration date, and organizational seal; patent disclosure documents carry the technical solution, inventors, filing date, and review signature; software copyright materials include the software name, version number, development completion date, and ownership receipt. Once the three types of materials enter the workflow, their roles differ: achievement registration forms are used to check the basic achievement fields, patent disclosure documents are used to compare technical content and dates, and software copyright materials are used to verify the version and signature chain. The material source is archived documents from the research management department, and the update cadence is synchronized in batches with achievement declarations, patent submissions, and software copyright registrations. Field characteristics are concentrated in names, quantities, dates, signatures, and receipts. When the same record spans materials, inconsistencies easily arise in name spelling, quantity definitions, and date order, and versions may not be synchronized or signatures may be missing.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. "Basis items that can refer back to the original text" are completed by subsequent nodes continuing execution according to the branch. When a node is triggered, the conversation enters an interaction state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Achievement registration form | Whether the name, quantity, date, and signature match the patent disclosure document and software copyright materials | In the node, check the options and branch connections one by one, use `nodeId` to locate the branch where the material is located, and after a trial run check the node status in the run record |
| Patent disclosure document | Whether the inventors, filing date, and technical solution name are consistent with the achievement registration form and software copyright materials | In a subsequent node, reference `variables` and run a trial once, check whether the selection result variable has been passed to the subsequent node, and confirm that there are no missing date or signature items |
| Software copyright materials | Whether the software name, version number, development completion date, and ownership receipt are synchronized with the other two materials | Trigger an interaction once, check the node status in the run record, verify whether the version number and receipt are complete, and confirm that the branch direction corresponds to the option |
| User selection node | Whether each option corresponds to one branch, and whether the process continues after the interaction is completed | In the node, check the options and branch connections one by one, and after a trial run check the transfer of `variables` and `nodeId`, confirming that the default branch was not taken and the process did not stop |

## Three common errors

- Symptom: The name, quantity, or date of the same achievement does not match across two materials. Cause: The achievement registration form and patent disclosure document are archived separately, field definitions are not unified, and cross-material comparison lacks items that refer back to the original text.
- Symptom: The version of the software copyright materials is not synchronized, and the old name and development completion date are still used. Cause: The material update cadence differs, the version number is not refreshed in sync with the registration form and disclosure document, and the version is not checked after branch selection.
- Symptom: The patent disclosure document lacks a signature or the software copyright materials lack a receipt, and the basis items cannot refer back. Cause: The signature and receipt fields are not validated when the materials enter the workflow, and they are not checked in subsequent nodes after the interaction is completed.

## How to verify the setup

Acceptance of this feature: run trials for each option one by one, check the branch direction and interaction state in the run record, confirm that each option corresponds to one branch, that the process continues after the interaction is completed, and check the transfer of `variables` and `nodeId`.

Business test: ask a cross-material basis question and see whether the answer provides a traceable source, whether the basis comes from the institution’s materials, whether the version is current, and whether the items match the original text.

- Run trials for each option one by one, check the branch direction and interaction state in the run record, and confirm that the default branch was not taken and the process did not stop.
- In a subsequent node, reference the selection result variable and run a trial once, and check whether the basis items that can refer back to the original text come from the institution’s materials and whether the version is current.
