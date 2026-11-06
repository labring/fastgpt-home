---
title: Workflow Orchestration for Sino-Foreign Education Establishment and Annual Reports: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c048-f008
page_type: 行业问题页
application_area: education
meta_title: Joint Education | Workflows | Checks
meta_description: Joint Education: review workflows for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Sino-Foreign Education Establishment and Annual Reports: Compare Documents and Locate Differences

## What this category's data looks like

This page focuses on the establishment and annual reports of Sino-Foreign cooperative education institutions. The material sources are the establishment application, cooperation agreement, articles of association, and annual report ledger. The establishment application carries the institution name, education level, enrollment scale, and signature page; the cooperation agreement carries the names of both Chinese and foreign parties, contribution amounts, signing dates, and seals; the articles of association carry the governance structure, rules of procedure, and effective date. The annual report ledger records the fields submitted over the years. The material update rhythm is centralized submission during the establishment phase and rolling annual submission during the annual report phase. After entering this function, the three types of materials and the ledger each participate as independent objects in field, date, and signature verification, used to locate discrepancies in names, quantities, and dates for the same record across two materials, and to mark entries with unsynchronized versions, missing signatures, or missing receipts, forming a draft discrepancy list.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. The "discrepancy list" is completed by subsequent nodes continuing execution according to the branch. When this node is triggered, the conversation enters an interactive state and records the workflow state. After the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Establishment application | Institution name, education level, enrollment quantity, and signature date are consistent between the application and the ledger | Compare the application and ledger field by field; write discrepancies into the discrepancy list and annotate the field location |
| Cooperation agreement | Names of both Chinese and foreign parties, contribution amounts, signing dates, seals, and signatures are complete | Compare names and quantities in the agreement and articles of association; separately mark entries missing signatures or receipts |
| Articles of association | Governance structure, rules of procedure, and effective date are consistent with the statements in the application | Check dates and names in the articles of association and application; for entries with unsynchronized versions, reference `variables` records |
| User selection node | Each option corresponds to one branch, and the selection result variable has been passed to subsequent nodes | Check options and branch connections one by one in the node; after a trial run, view `nodeId` and `variables` in the run record |

## Three common errors

- Phenomenon: The same institution name is written differently in the establishment application and the cooperation agreement. Cause: The two materials were drafted separately without field-level alignment, so names and quantities do not match.
- Phenomenon: The version date of the articles of association is inconsistent with that of the establishment application. Cause: After revision, only one material was updated, the versions were not synchronized, and the old version remains in the ledger.
- Phenomenon: The cooperation agreement is missing signatures or receipts. Cause: The signing process was not closed-loop, scanned copies and originals were not checked, and signature pages and receipts were not archived.

## How to verify the setup

This function's acceptance: run trial executions for each option one by one, check the branch directions and interaction states in the run records, and confirm that each option corresponds to one branch and that the selection result variable has been passed to subsequent nodes.

Business test: use one real record to find fields inconsistent with the ledger, locate name, quantity, or date discrepancies, and write them into the discrepancy list.

- In the user selection node, check options and branch connections one by one, run a trial execution once, and view the node status and `nodeId` in the run record.
- In subsequent nodes, reference the selection result variable `variables` and run a trial execution to confirm that the branch direction is consistent with the interaction state record.
