---
title: Workflow Orchestration for Degree Awards and Certificate Information Reporting: Find Supporting Evidence
slug: /en/industry/education-d001-c026-f008
page_type: 行业问题页
application_area: education
meta_title: Degree Certificates | Workflows | Evidence
meta_description: Degree Certificates: review workflows for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Degree Awards and Certificate Information Reporting: Find Supporting Evidence

## What this category's data looks like

Degree conferral and certificate information reporting involves three core types of materials: degree application forms, thesis review forms, and defense resolutions. The degree application form contains basic personal information, the degree category applied for, course grades, and a signature field; the thesis review form contains the reviewer, review comments, score, and date; the defense resolution contains the defense committee members, voting result, resolution date, and chair's signature. The three types of materials are usually updated by batch or semester, exist in both paper and electronic versions, and field naming and date formats may be inconsistent across different schools. When entering workflow orchestration, the degree application form serves as the main record anchor, while the thesis review form and defense resolution serve as supporting materials, each taking on the role of field comparison and basis back-reference, used to verify whether names, quantities, dates, and signatures are consistent.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. Basis items that can back-reference the original text are continued by subsequent nodes according to the branch. When the user selection node is triggered, the conversation enters an interaction state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Degree application form | Whether fields, dates, and signatures match the thesis review form and defense resolution | Check the options and branch connections one by one in the node, trigger once and view the node status in the run record, and reference `variables` and `nodeId` in subsequent nodes for a trial run |
| Thesis review form | Whether the name, quantity, and date of the same record are consistent with the degree application form and defense resolution | Verify the reviewer, review comments, score, and date fields, and compare expression differences for the same record across the three materials |
| Defense resolution | Whether the defense committee members, voting result, resolution date, and chair's signature are complete and the version is current | Check whether signatures and receipts are missing, confirm that the resolution date does not conflict with the dates on the application form and review form, and mark as pending confirmation when the version is not synchronized |
| User selection node | Each option corresponds to one branch, and the selection result variable has been passed to subsequent nodes | Check the options and branch connections one by one in the node, trigger once and view the node status in the run record, and confirm that `variables` and `nodeId` can be referenced in subsequent nodes |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the degree application form and the thesis review form. Cause: The two entries were made at different times or field naming is inconsistent, and there is no cross-material comparison step.
- Symptom: The defense resolution version is not synchronized, and an old signature page is referenced as the current basis. Cause: After the version update, it was not marked invalid, and the workflow still references the old material.
- Symptom: The thesis review form lacks the reviewer's signature, or the defense resolution lacks the chair's signature and receipt. Cause: Material collection is incomplete, and no signature and receipt completeness check was performed before entering the workflow.

## How to verify the setup

Feature acceptance: Try each option one by one, check the branch direction and interaction state in the run record, confirm that each option corresponds to one branch and that the selection result variable has been passed to subsequent nodes, and reference `variables` and `nodeId` to verify the transfer.

Business test: Ask a cross-material basis question, see whether the answer gives a back-referenceable source, and check that the basis comes from the institution’s materials, the version is current, and the item matches the original text.

- Check the options and branch connections one by one in the node, trigger once and view the node status in the run record, and confirm that the process continues downward after the interaction is completed.
- Reference the selection result variable and `nodeId` in a subsequent node for a trial run, confirm that the branch direction is consistent with the interaction state record, and check whether cross-material basis items can back-reference the original text.
