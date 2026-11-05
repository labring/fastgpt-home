---
title: Workflow Orchestration for Compulsory Education Dropout Prevention: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c009-f008
page_type: 行业问题页
application_area: education
meta_title: Dropout Prevention | Workflows | Intake
meta_description: Dropout Prevention: review workflows for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Compulsory Education Dropout Prevention: Handle Questions and Collect Missing Information

## What this category's data looks like

Materials for the compulsory education dropout prevention and school retention category mainly consist of dropout risk ledgers, return-to-school persuasion records, and home visit records, submitted by schools and townships, updated by semester or month. Fields include student name, class, risk level, persuasion date, home visit date, signature, and receipt. When materials enter the question-and-answer intake and missing-item follow-up questioning function, the dropout risk ledger serves as the basis for the risk list and level, the persuasion records serve as the basis for the persuasion process and results, and the home visit records serve as the basis for household communication and signed receipts. The dates and signatures of the three must corroborate one another, and names and quantities must be consistent.

## Configuration and implementation checks

| Object | Check | Verification action |
| --- | --- | --- |
| Dropout risk ledger | Whether fields, dates, and signatures are complete, and whether names and quantities are consistent | Check the ledger header and filled-in items, compare how the same student's name, grade, and risk level are written on different pages; use `variables` to reference node output, and check whether the branch pointed to by `nodeId` obtains the ledger fields |
| Return-to-school persuasion record | Whether the date, persuader, signature, and receipt match up | Compare the persuasion date with the ledger date one by one, and check whether the persuader's signature and receipt are missing; run a trial once, reference the selection result variable in subsequent nodes, and confirm that the branch direction is consistent with the record |
| Home visit record | Whether the home visit date, parent signature, and version are synchronized | Check the home visit record date against the ledger update date, and inspect the parent signature field; if the same session enters the interaction repeatedly, check whether the node state corresponding to `nodeId` has been overwritten, and confirm whether follow-up questions are generated when the version is not synchronized |

## Three common errors

- Symptom: the name, quantity, and date of the same record in the ledger and the persuasion records do not match. Cause: the two materials were entered separately without field comparison, and missing items were not identified.
- Symptom: the home visit record version was not synchronized, and the old version's signature and receipt are missing. Cause: after the materials were updated they were not uniformly replaced, and version management was absent.
- Symptom: after selecting an option, the default branch is still followed, and the process stops after the interaction is completed. Cause: the options and branch connections were not checked one by one, and the selection result variable was not passed correctly.

## How to verify the setup

Acceptance of this function: run trials option by option, and check the branch direction and interaction state in the run records; check the node state corresponding to `nodeId` and the `variables` passing result.

Business test: submit a question missing key information and see whether it asks follow-up questions first before answering.

- In the user selection node, check the options and branch connections one by one, trigger once, and view the node state in the run records.
- Reference the selection result variable in subsequent nodes and do a trial run once to confirm that the branch direction is consistent with the interaction state record.
