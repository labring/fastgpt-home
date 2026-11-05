---
title: Workflow Orchestration for Initial Review of Academic Journal Submissions: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c066-f008
page_type: 行业问题页
application_area: education
meta_title: Journal Submissions | Workflows | Intake
meta_description: Journal Submissions: review workflows for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Initial Review of Academic Journal Submissions: Handle Questions and Collect Missing Information

## What this category's data looks like

In the preliminary review scenario for academic journal submissions, the common materials are of three types: submitted manuscripts, author information forms, and plagiarism check reports. Submitted manuscripts are usually submitted by authors in the submission system and contain the title, author names, affiliations, abstract, main text, and references; version updates mostly occur during the revision stage. Author information forms are often uploaded together with the manuscript or submitted later by the corresponding author, and contain names, order, affiliations, contact information, signature, and date. Plagiarism check reports are exported from the plagiarism check system and contain the check time, total text similarity ratio, largest single-source similarity, and a description of the check scope. When the three types of materials enter the Q&A intake and missing-item follow-up function, their roles differ: the submitted manuscript is the main basis, used to judge whether the research content matches the column; the author information form is used to verify the authorship order, affiliations, and signature receipt; the plagiarism check report is used to verify whether the check date, version, and manuscript correspond. Field characteristics are concentrated in four categories: names, quantities, dates, and signatures. The update rhythm changes with revisions and supplementary submissions, and it is prone to inconsistencies in name spelling, author counts, and dates for the same record across different materials, or unsynchronized versions, missing signatures, and missing receipts.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. "Intake records and follow-up items to be completed" are continued and completed by subsequent nodes according to the branch. When the node is triggered, the session enters the interaction state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Submitted manuscript | Whether the manuscript name, author count, and submission date are consistent with the author information form and plagiarism check report, and whether the version is synchronized | Compare the names, quantities, and dates in the three materials item by item, check the options and branch connections one by one in the node, and confirm that inconsistent items enter the follow-up branch |
| Author information form | Whether the authorship order, affiliations, signature, and receipt date are complete, and whether they are consistent with the manuscript authorship | Check the signature field and receipt date, mark missing items as items to be followed up, record the selection result after triggering the interaction state, and reference `variables` in a subsequent node for a trial run |
| Plagiarism check report | Whether the check date and check scope correspond to the manuscript version, and whether the source of the total text similarity ratio is traceable | Check the order of the check time and the manuscript submission date, confirm the version corresponding to the report; view the node status and branch direction corresponding to `nodeId` in the run record |
| Intake records and items | Whether missing items are identified and followed up, whether answers are based on materials, and whether branches execute according to the selected option | Trigger an interaction and view the node status in the run record; confirm that the selection result variable has been passed to subsequent nodes, avoiding the case where selecting an option still follows the default branch |

## Three common errors

- Symptom: the same author's name spelling or count does not match across two materials. Cause: the author information form and the manuscript are submitted separately, no field-level comparison is performed, and the authorship order and affiliations are not checked in sync.
- Symptom: the plagiarism check report date is earlier than the current manuscript version, and the check scope is inconsistent with the main text. Cause: the version is not synchronized, no re-check is performed after revision, and the correspondence between the report and the manuscript is not confirmed at intake.
- Symptom: the author information form lacks a signature or receipt, yet the intake record still continues to flow. Cause: missing-item identification does not reach the follow-up branch, after the interaction is completed the corresponding branch is not followed according to the selected option, and the case is transferred to the handler before the items are completed.

## How to verify the setup

Function acceptance: run trials option by option, check the branch direction and interaction state in the run record, confirm that each option corresponds to one branch and that the selection result variable has been passed to subsequent nodes, and reference `variables` and `nodeId` in subsequent nodes to check the state records.

Business test: submit a question missing key information, see whether it asks for follow-up before answering, confirm that missing items are identified and followed up, that answers are based on materials, and then transfer to the handler.

- Check the options and branch connections one by one in the node, and after triggering an interaction, view the node status and branch direction in the run record.
- Reference the selection result variable in a subsequent node and run a trial once, checking whether the names, quantities, dates, and signatures of the submitted manuscript, author information form, and plagiarism check report are consistent.
