---
title: Workflow Orchestration for Research Ethics Review: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c062-f008
page_type: 行业问题页
application_area: education
meta_title: Research Ethics | Workflows | Multilingual
meta_description: Research Ethics: review workflows for multilingual work. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Research Ethics Review: Handle Multilingual Materials and Terminology

## What this category's data looks like

Research ethics review materials consist mainly of ethics review applications, informed consent form templates, and risk assessment forms; their sources are researcher submissions, ethics committee receipts, and revised versions, and their update cadence changes with review rounds and revision cycles. Field characteristics center on subject names, sample quantities, review dates, and signature and receipt fields. When materials enter the workflow, the ethics review application serves as the main record carrying the review number and version number, the informed consent form template serves as the comparison draft carrying terminology and translated names, and the risk assessment form serves as the source of risk items and dates and signatures. Multilingual materials and terminology handling require a unified glossary and comparison draft, so that the same term is consistent throughout and translated names can refer back to the source text, and the result is finally delivered for external release.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. "Unified glossary and comparison draft" is continued and completed by subsequent nodes according to the branch. When triggered, the conversation enters an interaction state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Ethics review application | Fields include review number, version number, subject names, sample quantities, review dates, and signature fields; the names, quantities, and dates of the same record in the two materials must match | Check the options and branch connections one by one in the node, reference `variables` and `nodeId`, and run a trial once to view the node status in the run record |
| Informed consent form template | Fields include terminology and translated names, version date, signature, and receipt; the same term must be consistent throughout and translated names must refer back to the source text; if the version is not synchronized, it must be marked | Reference the selection result variable in subsequent nodes and run a trial once, and check the terminology wording and source-text back-reference in the comparison draft |
| Risk assessment form | Fields include risk items, quantities, dates, and signatures; if signatures or receipts are missing, it must not enter the external release branch | Trigger a user selection node once, view the node status and branch direction in the run record, and check the signature and receipt fields |

## Three common errors

- Phenomenon: the same subject name or sample quantity does not match between the ethics review application and the risk assessment form. Cause: the two materials are maintained separately, and no field-level comparison is performed in the unified glossary and comparison draft.
- Phenomenon: the informed consent form template version is not synchronized, and old-version terminology is still circulating in the process. Cause: after revision, the user selection node was not triggered to reconfirm the branch, and the run record lacks a version marker.
- Phenomenon: the risk assessment form lacks a signature or receipt but still enters the external release branch. Cause: the branch judgment does not treat signatures and receipts as verification items, and the interaction state record does not intercept it.

## How to verify the setup

Acceptance of this feature: run trials for each option one by one, and check the branch direction and interaction state in the run record; confirm that each option corresponds to one branch, that the selection result variable has been passed to subsequent nodes, and verify by referencing `variables` and `nodeId`.

Business test: sample three terms and check whether their wording is consistent throughout, check that translated names can refer back to the source text, and confirm that the unified glossary and comparison draft have been delivered for external release.

- Check the options and branch connections one by one in the node, trigger a user selection node once, and view the node status and branch direction in the run record.
- Reference the selection result variable in subsequent nodes and run a trial once, and check whether the wording of the three terms in the unified glossary and comparison draft is consistent throughout.
