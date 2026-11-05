---
title: Workflow Orchestration for Academic Misconduct Reports and Investigations: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c063-f008
page_type: 行业问题页
application_area: education
meta_title: Research Misconduct | Workflows | Checks
meta_description: Research Misconduct: review workflows for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Academic Misconduct Reports and Investigations: Compare Documents and Locate Differences

## What this category's data looks like

This page focuses on material verification and discrepancy localization in the investigation and handling of academic misconduct reports, involving three types of sources: report materials, investigation reports, and expert appraisal opinions. Report materials are submitted by the reporter and often contain original records, correspondence, and attachment lists; investigation reports are written by the investigation team and contain factual findings, evidence indexes, and conclusions; expert appraisal opinions are issued by external experts and contain the appraisal scope, methods, and signature page. The three types of materials have different update rhythms: report materials are appended as supplementary evidence is added, investigation reports are revised as verification progresses, and appraisal opinions are countersigned after finalization. Field characteristics center on names, quantities, dates, signatures, and receipts. The same record must be compared item by item across the three materials, and version numbers and attachment numbers are the key anchors for locating discrepancies. After materials enter the workflow, nodes carry the selection and branching, and subsequent nodes complete the discrepancy list according to the branches.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting the branch direction and interaction state records. The "discrepancy list" is then completed by subsequent nodes continuing execution according to the branches. When the user selection node is triggered, the conversation enters an interactive state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Report materials | Whether the names, quantities, dates, and receipts are consistent with the investigation report | Compare the names, quantities, and dates of the same record item by item, and mark items missing signatures or receipts; check the options and branch connections one by one in the node, and confirm the fields referencing `variables` |
| Investigation report | Whether the version number, signature page, and expert appraisal opinions are synchronized | Check where the version is not synchronized, and verify the signature page and the conclusions of the appraisal opinions; trigger a user selection node once and view the node status and `nodeId` in the run record |
| Expert appraisal opinions | Whether the appraisal scope, methods, and dates correspond to the report materials | Compare the appraisal scope with the description in the report materials, and verify the dates and signatures; reference the selection result `variables` in a subsequent node and run a trial once |
| Discrepancy list | Whether the names, quantities, and dates of the same object match across the two materials | Summarize inconsistent fields according to the branch direction, submit them to the reviewer for confirmation, and write them back to the ledger |

## Three common errors

- Symptom: The names and quantities of the same record do not match between the report materials and the investigation report. Cause: The two sources were entered separately, without field-level comparison and version anchoring.
- Symptom: The investigation report has been revised, but the expert appraisal opinions still reference the old version of the data. Cause: The version was not synchronized, and the attachment numbers and dates were not updated with the revision.
- Symptom: The appraisal opinions lack signatures or the report receipt is missing. Cause: The countersignature process after finalization was not closed-loop, and the signature page and receipt were not verified during material archiving.

## How to verify the setup

This feature acceptance: run trials option by option, and verify the branch direction and interaction state in the run record; confirm that the selection result variable `variables` has been passed to subsequent nodes, and verify the node status corresponding to `nodeId`.

Business test: use one real record to find fields inconsistent with the ledger, mark the name, quantity, and date discrepancy items, and submit them to the reviewer for confirmation and write-back.

- In the user selection node, check the options and branch connections one by one, trigger once, and view the node status in the run record.
- Reference the selection result variable in a subsequent node and run a trial once to confirm that the branch direction is consistent with the interaction state record.
