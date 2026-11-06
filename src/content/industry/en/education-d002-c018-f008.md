---
title: Workflow Orchestration for Undergraduate Curriculum Planning: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c018-f008
page_type: 行业问题页
application_area: education
meta_title: Program Revision | Workflows | Checks
meta_description: Program Revision: review workflows for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Undergraduate Curriculum Planning: Compare Documents and Locate Differences

## What this category's data looks like

This page addresses the undergraduate program revision scenario, covering three types of materials: program plans, course syllabi, and credit structure tables. Program plans come from the academic affairs office templates and departmental submissions, course syllabi are submitted by the course-offering units, and credit structure tables are exported from the academic affairs system. The update cadence is centralized collection at the start of each revision round, with rolling replacement as feedback comes in during the revision period. Field characteristics center on course name, course code, credits, class hours, offering semester, signature, and date. When entering this feature, the program plan serves as the master record carrying the course system and total credit basis, the course syllabus serves as the per-course comparison document providing name and credit details, and the credit structure table serves as the summary basis for checking quantities and credit distribution. The three have different roles, and the name, quantity, and date of the same course across the three materials must be alignable item by item, and the version and signature receipts must also be traceable to the same round.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. After triggering, the conversation enters the interaction state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the chosen option. The discrepancy list is then completed by subsequent nodes continuing execution along the branch.

| Object | Check | Verification action |
| --- | --- | --- |
| Program plan | Whether the course name, course code, credits, class hours, offering semester, and signature date are consistent item by item with the course syllabus | Check the options and branch connections one by one in the node, compare the fields of the same course in the two materials, write inconsistent items into the branch direction record, and reference `nodeId` to locate the node |
| Course syllabus | Whether the name, credits, class hours, and offering semester of the same course align with the program plan and credit structure table, and whether the version is from the same round | Trigger an interaction state, view the node status in the run record, check names and quantities course by course, mark items whose versions are not synchronized, and pass the selection result variable to subsequent nodes |
| Credit structure table | Whether the credit quantity of each module, total credits, and date are consistent with the summary basis of the program plan and course syllabus, and whether signatures and receipts are complete | Reference the selection result variable in a subsequent node and run a trial, check the summary quantities and dates, list separately those missing signatures or receipts, and record the branch direction |
| Discrepancy list | The name, quantity, or date of the same record does not match across two materials, or the version is not synchronized, or signatures/receipts are missing | Continue execution along the branch to generate discrepancy items, annotate each item with the material source and field, submit to the reviewer for confirmation, and write back |

## Three common errors

- Symptom: The name or credits of the same course do not match between the program plan and the course syllabus. Cause: The two materials are submitted by different units, and no item-by-item field comparison was performed.
- Symptom: The course syllabus version is not synchronized with the program plan round, and the old version is still in circulation. Cause: Replacement materials were not collected by the same round, and version marking is missing.
- Symptom: The credit structure table is missing signatures or receipts, and the summary quantities do not match the details. Cause: The signature step was not synchronized with material collection, and receipts were not archived.

## How to verify the setup

Acceptance of this feature: run a trial for each option, check the branch directions and interaction states in the run record, confirm that options and branches correspond one to one, and that the selection result variable has been passed to subsequent nodes, referencing `variables` and `nodeId` for location.

Business test: use one real record to find fields inconsistent with the ledger, check names, quantities, dates, and signature receipts, and submit discrepancy items to the reviewer for confirmation and write-back.

- Check the options and branch connections one by one in the node, trigger an interaction state, and view the node status in the run record.
- Reference the selection result variable in a subsequent node and run a trial, continue execution along the branch to generate the discrepancy list, and submit it to the reviewer for confirmation and write-back.
