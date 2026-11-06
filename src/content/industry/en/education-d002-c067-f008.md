---
title: Workflow Orchestration for Peer Review Organization: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c067-f008
page_type: 行业问题页
application_area: education
meta_title: Peer Review | Workflows | Checks
meta_description: Peer Review: review workflows for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Peer Review Organization: Compare Documents and Locate Differences

## What this category's data looks like

This page addresses the material verification and discrepancy location scenario for peer review organizations. Materials come from three types of documents: review invitations, expert review comments, and author revision notes. The update cadence rolls forward with review rounds, and field characteristics center on names, quantities, dates, and signature receipts. Review invitations serve as the baseline for review targets and deadlines, expert review comments serve as the evidence for review conclusions and signatures, and author revision notes serve as the comparison for point-by-point responses and version markers. When these three types of materials enter workflow orchestration, each first retains its original fields, and then the user selects nodes to determine whether to proceed to the next round of comparison, so that the names, quantities, and dates of the same record across two materials have a traceable comparison path, providing stable input for generating the discrepancy list.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. The "discrepancy list" is completed by subsequent nodes continuing execution along the branch. When the user selection node is triggered, the conversation enters an interactive state and records the workflow state. After the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Review invitation | Whether the name, quantity, date, and signature receipt are consistent with the ledger | Check the options and branch connections one by one in the node, and reference `variables` to record the review target and deadline fields |
| Expert review comments | Whether the review conclusion, date, and signature correspond to the invitation record | Trigger once, check the node status in the run record, and compare the branch direction corresponding to `nodeId` |
| Author revision notes | Whether the point-by-point responses, version markers, and receipts are synchronized | Reference this variable in subsequent nodes and run a test once, checking the discrepancies in the three columns of name, quantity, and date |
| Discrepancy list | Whether the fields of the same object match across the two materials | Summarize inconsistent fields according to the branch direction, submit to the reviewer for confirmation, and write back to the ledger |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match across the two materials. Cause: The options and branch connections were not checked one by one, causing the comparison target to be misaligned.
- Symptom: The review invitation and author revision note versions are not synchronized. Cause: The process stops after the interaction is completed, and subsequent nodes do not continue execution along the branch.
- Symptom: Expert review comments lack a signature or receipt. Cause: A certain option was selected but the default branch was still followed, and the interaction state record does not reflect the actual selection.

## How to verify the setup

This feature acceptance: Run a test for each option one by one, check the branch direction and interaction state in the run record, and confirm the correspondence between `variables`, `nodeId`, and the options.

Business test: Use a real record to find fields inconsistent with the ledger, submit to the reviewer for confirmation, and write back.

- Check the options and branch connections one by one in the node, and trigger once to view the node status in the run record
- Reference the selection result variable in subsequent nodes and run a test once, checking the discrepancies in the three columns of name, quantity, and date
