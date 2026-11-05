---
title: Workflow Orchestration for University Laboratory Safety Classification: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c064-f008
page_type: 行业问题页
application_area: education
meta_title: Lab Safety Categories | Workflows | Review
meta_description: Lab Safety Categories: review workflows for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for University Laboratory Safety Classification: Trace Exceptions and Review Results

## What this category's data looks like

Laboratory safety grading and classification materials at universities center on the laboratory grading and classification table, the hazard source list, and the safety responsibility statement. The grading and classification table registers entries one by one by room number, hazard source category, and risk level, with fixed date and signature columns; the hazard source list itemizes names, quantities, and storage locations by chemical, gas cylinder, and equipment, and is often cross-referenced with the responsibility statement; the safety responsibility statement is signed by responsible person, room, and committed items, and both the receipt and the signature are indispensable. The three types of materials come from different sources: the grading and classification table is filled in by the laboratory administrator, the hazard source list is compiled by the safety officer, and the responsibility statement is signed by the person in charge. The update cadence is quarterly review plus ad hoc changes, and when changes occur the version number and date must be synchronized. When entering the exception tracing and manual review workflow, the grading and classification table provides the grading basis, the hazard source list provides the exception source entries, and the responsibility statement provides the signature and receipt evidence; the fields, dates, and signatures of the three must be aligned item by item in order to form a traceable exception list and review conclusion.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting the branch direction and interaction state records. The "exception list and review conclusion" is then completed by subsequent nodes continuing execution according to the branch. When the user selection node is triggered, the conversation enters the interaction state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Laboratory grading and classification table | Whether room number, hazard source category, risk level, date, and signature are consistent with the hazard source list | Compare names, quantities, dates, and signature columns item by item, and check whether `variables` carries the grading fields into the branch |
| Hazard source list | Whether the names and quantities of chemicals, gas cylinders, and equipment match between the two materials | Extract the exception entry and trace it back to the original row in the list, and check whether the node corresponding to `nodeId` references the selection result variable |
| Safety responsibility statement | Whether the responsible person, room, committed items, and receipt signature are complete and the versions are synchronized | Check the signature and receipt date; record missing items in the exception list and annotate the source material |
| Exception record | Whether the exception is supported by an original record and whether the reviewer has signed | Create an exception record, trace it along `variables` and `nodeId` to the source material, and check the signature |

## Three common errors

- Phenomenon: the name, quantity, and date of the same record do not match between the grading and classification table and the hazard source list. Cause: the two materials use different reporting standards and no cross-comparison was performed.
- Phenomenon: the responsibility statement version is not synchronized, and the old version's signature is still in circulation. Cause: after the change, the version number and date were not updated, and the receipt was not re-signed.
- Phenomenon: the exception record lacks a signature or receipt, and the review conclusion cannot be finalized. Cause: the review step did not enforce checking the signature column and receipt date.

## How to verify the setup

Acceptance of this feature: run through each option, check the branch direction and interaction state in the run record, and confirm that `variables` and `nodeId` are correctly referenced by subsequent nodes.

Business test: create an exception record and see whether it can be traced back to the source material.

- In the user selection node, check the options and branch connections one by one, and run it once to view the node status in the run record.
- Reference the selection result variable in a subsequent node and run it to confirm that the exception list and review conclusion are completed by the subsequent node continuing execution according to the branch.
