---
title: Workflow Orchestration for Daily Kindergarten Care Management: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c001-f008
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Care | Workflows | Intake
meta_description: Kindergarten Care: review workflows for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Daily Kindergarten Care Management: Handle Questions and Collect Missing Information

## What this category's data looks like

This page focuses on kindergarten childcare daily life management materials, covering three categories: daily life schedule tables, morning and afternoon check records, and child health observation records. The sources are daily entries by class teachers and childcare workers, aggregated by the health room, with an update cadence of daily clearing and weekly closing, archived monthly. Field characteristics center on dates, activity segment names, child names, observation items, quantities, signatures, and receipts. The three categories of materials play different roles when entering this feature: the daily life schedule table provides the timeline and activity segment baseline, the morning and afternoon check records provide the day's health screening results, and the child health observation records provide the basis for individual tracking; together, the three form the comparison draft for missing-item identification and follow-up questioning.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. Acceptance records and the completed follow-up questions are continued and completed by subsequent nodes according to the branches. When the user selection node is triggered, the conversation enters an interaction state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Daily life schedule table | Fields, dates, and signatures: whether activity segment names, start and end times, dates, and teacher signatures are complete | Check activity segment names and start and end times item by item, compare dates and signature fields, and verify options and branch connections one by one in the node |
| Morning and afternoon check records | Fields, dates, and signatures: whether child names, check times, abnormal items, and health worker signatures are complete | Check names and check times, compare abnormal item descriptions and signatures, and trigger one viewing of the node status in the run records |
| Child health observation records | Fields, dates, and signatures: whether observation items, record dates, follow-up measures, and parent receipts are complete | Check observation items and dates, compare follow-up measures and receipts, reference `variables` in subsequent nodes, and run a trial once |
| Acceptance records and completed follow-up questions | Whether missing items are identified and followed up on, and whether answers are based on materials | Reference `nodeId` and `variables` in subsequent nodes, and check whether the follow-up questions correspond to material fields |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match across two materials. Cause: The daily life schedule table and the morning and afternoon check records are filled in independently, lacking unified field mapping and cross-comparison.
- Symptom: Versions are not synchronized, and an old schedule table is still referenced. Cause: The update cadence is not aligned, and archived and in-use versions are not marked and distinguished, causing the comparison baseline to drift.
- Symptom: Signatures or receipts are missing and are only completed after follow-up questioning. Cause: The acceptance step does not list signatures and receipts as required fields, and missing-item identification does not cover such fields.

## How to verify the setup

This feature's acceptance: run a trial for each option, check the branch directions and interaction states in the run records, and confirm that `variables` and `nodeId` are correctly referenced in subsequent nodes.

Business test: submit a question missing key information and see whether it asks a follow-up question before answering.

- Verify options and branch connections one by one in the node, and confirm that each option corresponds to one branch.
- Trigger the user selection node once, and view the node status and interaction state records in the run records.
