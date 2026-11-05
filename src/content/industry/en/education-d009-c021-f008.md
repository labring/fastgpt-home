---
title: Workflow Orchestration for Enrollment Changes and Graduation Eligibility: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c021-f008
page_type: 行业问题页
application_area: education
meta_title: Graduation Eligibility | Workflows | Multilingual
meta_description: Graduation Eligibility: review workflows for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Enrollment Changes and Graduation Eligibility: Handle Multilingual Materials and Terminology

## What this category's data looks like

Student status changes and graduation eligibility review involve three types of materials: leave/resumption of studies applications, major transfer applications, and graduation review checklists. Sources are academic affairs system exports and departmental submissions, with update cadence rolling along with semester batches and review milestones. Leave/resumption of studies applications contain change type, effective date, and approval signature; major transfer applications contain transferring-in and transferring-out majors, course mapping, dates, and signatures; graduation review checklists contain credits, course names, quantities, review conclusions, and receipts. When the three types of materials enter the workflow, they respectively serve the roles of basis for status change, explanation of major change, and verification of graduation conclusions, and fields and dates must be aligned item by item.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. The "unified terminology glossary and comparison draft" is completed next by subsequent nodes continuing execution according to the branch.

| Object | Check | Verification action |
| --- | --- | --- |
| Leave/resumption of studies application | Whether the fields, dates, and signatures are consistent with the major transfer application on change type and effective date | Trial-run each option one by one, check the branch direction and interaction state in the run records, and verify `variables` and `nodeId` |
| Major transfer application | Whether the name, quantity, and date of the same record match across the two materials | Reference the selection result variable in subsequent nodes, and compare course name and date fields |
| Graduation review checklist | Whether the version is synchronized, and whether signatures or receipts are missing | Sample three terms to check whether the wording is consistent throughout, and check the receipt field |
| Unified terminology glossary and comparison draft | Whether the same term is consistent throughout, and whether the translated name can refer back to the source text | After continuing execution according to the branch, verify the translated names item by item by referring back to the source text |

## Three common errors

- Symptom: The name and date of the same record do not match between the leave/resumption of studies application and the major transfer application. Cause: The versions of the two materials are not synchronized, and the fields are not aligned item by item.
- Symptom: The graduation review checklist is missing signatures or receipts. Cause: The review node has not collected all receipts, and the process proceeds to the next step with the signature field left blank.
- Symptom: A certain option is selected but the default branch is still taken. Cause: The options and branch connections have not been checked one by one, and the selection result variable has not been passed to subsequent nodes.

## How to verify the setup

Acceptance of this feature: Trial-run each option one by one, check the branch direction and interaction state in the run records, and check whether `variables` and `nodeId` are passed as expected.

Business test: Sample three terms to check whether the wording is consistent throughout.

- Check the options and branch connections one by one in the node, and trigger once to view the node status in the run records.
- Reference the selection result variable in a subsequent node and trial-run once to confirm that the process continues downward after the interaction is completed.
