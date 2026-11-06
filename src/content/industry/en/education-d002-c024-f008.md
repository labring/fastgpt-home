---
title: Workflow Orchestration for Graduate Admissions Interviews and Selection: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c024-f008
page_type: 行业问题页
application_area: education
meta_title: Graduate Admissions | Workflows | Checks
meta_description: Graduate Admissions: review workflows for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Graduate Admissions Interviews and Selection: Compare Documents and Locate Differences

## What this category's data looks like

In the graduate admissions re-examination and admission scenario, the materials entering the material verification and discrepancy location stage are mainly of three types: the re-examination plan, the candidate score table, and the adjustment list. The re-examination plan is usually released by batch and contains the process, time, scoring, and signature fields; the candidate score table records item by item by subject and candidate, including preliminary examination scores, re-examination scores, and dates; the adjustment list is updated by round and contains candidate names, quantities, preferences, and receipt status. The three types of materials come from different sources and have different update rhythms, and field naming and date conventions often differ. When entering workflow orchestration, the re-examination plan serves as the rule basis, the candidate score table serves as the score comparison benchmark, and the adjustment list serves as the object checklist; together they support the consistency determination of the name, quantity, and date of the same object across two materials, and locate fields missing signatures or receipts.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. The "discrepancy list" is completed by subsequent nodes continuing execution according to the branch. When the user selection node is triggered, the conversation enters an interaction state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Re-examination plan | Whether the batch, date, and signature fields in the plan are consistent with the corresponding records in the candidate score table and adjustment list | Check the options and branch connections one by one in the user selection node, trigger once and then view the node status in the run record, and compare the plan batch with the list round |
| Candidate score table | Whether the name, quantity, and date of the same candidate match across the two materials | Reference the selection result variable in subsequent nodes and run a trial once, and check the name, number of score entries, and date fields of the same candidate in the score table and adjustment list |
| Adjustment list | Whether the list round and version are synchronized, and whether receipts and signatures are complete | Check the options and branch connections one by one in the node, inspect the list version and receipt fields, and mark records missing signatures or receipts |
| Discrepancy list | Whether inconsistent fields have been located and point to the specific object and field | Reference `variables` and `nodeId` in subsequent nodes, output the discrepancy list according to the branch direction, and hand it to the reviewer for confirmation and write-back |

## Three common errors

- Symptom: The same candidate's name is written differently in the score table and the adjustment list, and the quantity or date does not match. Cause: The two materials come from different sources and have different update rhythms, and the field conventions have not been unified.
- Symptom: The adjustment list has been updated to a new round, but the score table is still the old version, causing deviations in the verification results. Cause: The versions are not synchronized, and there is a lack of unified version markers and comparison benchmarks.
- Symptom: The re-examination plan or adjustment list is missing signatures or receipts, and the discrepancy list cannot be closed. Cause: The signature and receipt fields are not included in the verification scope, and the review step omits them.

## How to verify the setup

This feature acceptance: run trials option by option, check the branch directions and interaction states in the run record, and confirm that each option corresponds to one branch and that the selection result variable has been passed to subsequent nodes.

Business test: use one real record to find fields inconsistent with the ledger, verify the name, quantity, date, and signature/receipt, locate discrepancies, and hand them to the reviewer for confirmation and write-back.

- Check the options and branch connections one by one in the user selection node, trigger once and then view the node status in the run record, and confirm that execution continues downward after the interaction is completed.
- Reference `variables` and `nodeId` in subsequent nodes and run a trial once, and verify the name, quantity, date, and signature/receipt fields of the same object across the two materials.
