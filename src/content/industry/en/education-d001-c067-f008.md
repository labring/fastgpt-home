---
title: Workflow Orchestration for Peer Review Organization: Find Supporting Evidence
slug: /en/industry/education-d001-c067-f008
page_type: 行业问题页
application_area: education
meta_title: Peer Review | Workflows | Evidence
meta_description: Peer Review: review workflows for evidence lookup. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Peer Review Organization: Find Supporting Evidence

## What this category's data looks like

Common materials for business basis queries by peer review organizations include review invitations, expert review comments, and author revision notes. A review invitation contains the invitation date, reviewer name, manuscript number, and receipt signature; expert review comments contain the date the comments were issued, the expert signature, the manuscript title, and the quantity; author revision notes contain the revision date, point-by-point responses, and the author signature. These materials are updated with each review round, and the title, quantity, and date of the same record in two materials can easily fail to match; versions not being synchronized, or missing signatures or receipts, also occur from time to time. When entering workflow orchestration, review invitations are used to initiate basis verification, expert review comments provide the basis for judgment, and author revision notes are used to refer back to the original text items.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branches), outputting branch directions and interaction state records. "Basis items that can refer back to the original text" are completed by subsequent nodes continuing execution according to the branches.

| Object | Check | Verification action |
| --- | --- | --- |
| Review invitation | Fields include invitation date, reviewer name, manuscript number, and receipt signature; the date and signature must match those in the expert review comments | Check the options and branch connections one by one in the node, use `nodeId` to locate the node, and trigger it once to see the node status in the run record |
| Expert review comments | Fields include the date the comments were issued, the expert signature, the manuscript title, and the quantity; the title and quantity must be consistent with the author revision notes | Reference `variables` in subsequent nodes and run a trial once to check whether the selection result variable has been passed to subsequent nodes |
| Author revision notes | Fields include the revision date, point-by-point responses, and the author signature; the version must be current and connect with the date of the review comments | Check the options and branch connections one by one in the node, and trigger it once to view the node status in the run record |
| User selection node | Each option corresponds to one branch; when entering the node the state is recorded, and the selection result variable has been passed to subsequent nodes | Check the options and branch connections one by one in the node, use `nodeId` to locate the node, reference `variables` in subsequent nodes, and run a trial once |

## Three common errors

- Symptom: The title and quantity of the same record do not match between the review invitation and the expert review comments. Cause: The two materials are entered separately, and no field-level comparison has been done.
- Symptom: The version of the author revision notes is not synchronized and still references review comments from an old round. Cause: After the materials were updated, they were not synchronized to the version referenced by the workflow.
- Symptom: The review invitation lacks a receipt signature, and the expert review comments lack a signature. Cause: When the materials were archived, the signature fields and receipt status were not verified.

## How to verify the setup

Acceptance of this feature: run a trial for each option one by one, check the branch direction and interaction state in the run record, and use `nodeId` to locate the node and `variables` to check whether the selection result variable has been passed to subsequent nodes.

Business test: ask a cross-material basis question, see whether the answer gives a referenceable source, and check that the tokens of the quoted text and the number of array items are recorded separately.

- Check the options and branch connections one by one in the node, trigger it once to view the node status in the run record, and confirm that the selection result variable has been passed to subsequent nodes.
- Use `nodeId` to locate the node, reference `variables` in subsequent nodes, and run a trial once to check the branch direction and interaction state records.
