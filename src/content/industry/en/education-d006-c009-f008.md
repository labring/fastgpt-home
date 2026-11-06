---
title: Workflow Orchestration for Compulsory Education Dropout Prevention: Track Progress and Check Statistics
slug: /en/industry/education-d006-c009-f008
page_type: 行业问题页
application_area: education
meta_title: Dropout Prevention | Workflows | Progress
meta_description: Dropout Prevention: review workflows for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Compulsory Education Dropout Prevention: Track Progress and Check Statistics

## What this category's data looks like

Compulsory education dropout prevention and school retention materials mainly consist of dropout risk ledgers, persuasion-to-return records, and home visit records. They are submitted by schools and townships and updated weekly or monthly. Ledger fields include student name, student ID number, risk level, follow-up date, and responsible person; persuasion-to-return records include persuasion time, method, result, and parent signature; home visit records include home visit date, teacher signature, and parent receipt. When the materials enter workflow orchestration, the ledger serves as the main table providing the record count and statistical base, while persuasion-to-return records and home visit records serve as detail rows supplementing dates and signatures. Together, the three support the progress table and the explanation of statistical criteria.

## Configuration and implementation checks

| Object | Check | Verification action |
| --- | --- | --- |
| Dropout risk ledger | Fields include risk level and signature column; dates, return-to-school persuasion records, and home visit records can be matched | Check options and branch connections one by one in the node, and run a trial using `nodeId` and `variables` |
| Return-to-school persuasion record | Quantity and dates are consistent with the ledger; signatures or receipts are not missing | Trigger a user selection once, and check the node status and branch direction in the run record |
| Home visit record | Names, dates, and receipts align with the return-to-school persuasion record, and versions are synchronized | Reference the selection result variable in subsequent nodes and run a trial to verify the totals and the metric header |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the ledger and the persuasion-to-return record. Cause: The two materials were entered separately, without one-by-one comparison and version synchronization.
- Symptom: The home visit record lacks a teacher signature or parent receipt. Cause: The material collection step did not verify signatures and receipts, and the record directly entered statistics.
- Symptom: After selecting an option, the default branch is still followed. Cause: The options and branch connections were not checked one by one, and after the interaction is completed the process stops or the same session repeatedly enters the interaction.

## How to verify the setup

Feature acceptance: run trials for each option one by one, check the branch direction and interaction status in the run records, and confirm that `variables` and `nodeId` are referenced correctly.

Business test: use one week of records to check the totals, and see whether the criteria and exceptions are clearly stated.

- Check the options and branch connections one by one in the node, trigger it once, and view the node status in the run records.
- Reference the selection result variable in subsequent nodes and run a trial once, and check the dates and signatures of the ledger, persuasion-to-return records, and home visit records.
