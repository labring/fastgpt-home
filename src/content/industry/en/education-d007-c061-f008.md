---
title: Workflow Orchestration for Research Outcome Registration and Intellectual Property: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c061-f008
page_type: 行业问题页
application_area: education
meta_title: Research IP | Workflows | Review
meta_description: Research IP: review workflows for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Research Outcome Registration and Intellectual Property: Trace Exceptions and Review Results

## What this category's data looks like

This category's data involves three types of materials: achievement registration forms, patent disclosure documents, and software copyright materials. The sources are submissions from research groups, responses returned by agencies, and receipts from registration institutions, and the update cadence advances with nodes such as submission, correction, acceptance, and authorization. The three types of materials have different field emphases: the achievement registration form contains the achievement name, completers, date, and responsible person's signature; the patent disclosure document contains the technical solution, inventors, filing date, and agency receipt; the software copyright materials contain the version number, development completion date, ownership of rights, and signatures/seals. When entering the exception tracing and manual review workflow, the three types of materials serve respectively as the comparison baseline, the object to be verified, and the source of signature receipts, and are used to locate differences in names, quantities, and dates for the same record, and to generate an exception list and review conclusions.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branches), outputting branch directions and interaction state records. The "exception list and review conclusions" are completed by subsequent nodes continuing execution according to the branches. When the user selection node is triggered, the conversation enters an interactive state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Achievement registration form | Whether the fields, dates, and signatures are consistent with the patent disclosure document and software copyright materials | Compare names, quantities, and dates field by field, check the responsible person's signature and registration receipt, and reference `variables` and `nodeId` to locate the source record |
| Patent disclosure document | Whether the filing date, inventors, and technical name match the registration form and copyright materials | Check the agency receipt and version number, mark an exception when the disclosure document version is not synchronized, and record the branch corresponding to `nodeId` |
| Software copyright materials | Whether the version number, development completion date, ownership of rights, and signatures/seals are complete | Check the signatures/seals and receipt, check whether the version is synchronized, write to the exception list when signatures or receipts are missing, and reference `variables` to pass the selection result |
| User selection node | Whether each option corresponds to one branch, and whether the interaction state is recorded | Check the options and branch connections one by one, trigger once to view the node status in the run record, and test-run to confirm that the selection result variable has been passed to subsequent nodes |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the achievement registration form and the patent disclosure document. Cause: The two materials are filled in separately, without field-level comparison and version synchronization.
- Symptom: The version of the software copyright materials is not synchronized, and the old development completion date is still referenced. Cause: After the materials were updated, they were not written back to the registration form, and a version check step is missing.
- Symptom: The review conclusion lacks a signature or receipt, and the exception list cannot be handed to the responsible person for handling. Cause: The reviewer did not sign the materials, and the agency receipt was not archived.

## How to verify the setup

Acceptance of this feature: test-run each option one by one, check the branch direction and interaction state in the run record, confirm that each option corresponds to one branch, that the selection result variable has been passed to subsequent nodes, and verify by referencing `variables` and `nodeId`.

Business test: create an exception record and see whether it can be traced back to the source material.

- In the node, check the options and branch connections one by one, and trigger once to view the node status in the run record.
- Reference the selection result variable in a subsequent node and test-run once to confirm that the branch direction is correct.
