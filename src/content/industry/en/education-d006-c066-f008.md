---
title: Workflow Orchestration for Initial Review of Academic Journal Submissions: Track Progress and Check Statistics
slug: /en/industry/education-d006-c066-f008
page_type: 行业问题页
application_area: education
meta_title: Journal Submissions | Workflows | Progress
meta_description: Journal Submissions: review workflows for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Initial Review of Academic Journal Submissions: Track Progress and Check Statistics

## What this category's data looks like

This category's data for preliminary review of academic journal submissions includes three types of materials: submitted manuscripts, author information forms, and plagiarism check reports. Submitted manuscripts are submitted by authors and contain the title, author attribution, affiliation, abstract, and main text, with the date based on the submission system receipt; author information forms are generated from the editorial office template and contain name, order, affiliation, contact information, and a signature field; plagiarism check reports are exported by the plagiarism check tool and contain the total text duplication ratio, the single largest repeated source, and the detection time. When the three types of materials enter workflow orchestration, their roles differ: submitted manuscripts are the primary key source for progress records, author information forms are used to verify attribution and signatures, and plagiarism check reports are used to verify dates and conclusions. The update rhythm is record-as-received with weekly aggregation, and the field characteristics are same names written differently across multiple sources, inconsistent date formats, and signatures and receipts prone to being missing.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. The "progress table and statistical scope description" is continued and completed by subsequent nodes according to the branch. When the user selection node is triggered, the conversation enters an interaction state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Submitted manuscript | The manuscript number and title must be consistent between the progress table and the plagiarism check report, the submission date and receipt date must match, and if the receipt is missing it is not counted in this week's total | Compare the title and date in the progress table and plagiarism check report one by one by manuscript number, verify whether the receipt is retained, and check the options and branch connections one by one in the node |
| Author information form | The attribution order and affiliation must be consistent between the author information form and the submitted manuscript, the signature field must have a signature or electronic receipt, and the version must be the latest | Compare name, order, affiliation, and signature field row by row, check the version number and update date, and reference the selection result variable in subsequent nodes and run a trial once |
| Plagiarism check report | The total text duplication ratio and detection time must be consistent between the plagiarism check report and the progress table, and the same manuscript must not have two reports with different dates | Compare the detection time and conclusion by manuscript number, verify whether the report version is synchronized, and trigger one check of the node status in the run records |
| Progress table and statistical scope description | The record count and statistical count must match, the scope must be written in the header, and exceptional cases must be noted in the table | Use one week of records to verify the total, and check item by item whether the header scope and exception notes are clearly written |

## Three common errors

- Phenomenon: The title or date of the same manuscript does not match between the progress table and the plagiarism check report. Cause: The two materials are entered separately, and field-level comparison by manuscript number was not performed.
- Phenomenon: The signature field of the author information form is empty or the receipt is missing, yet it is still counted in this week's total. Cause: Progress records did not set signatures and receipts as counting conditions, and exceptions were not noted.
- Phenomenon: After selecting an option, the default branch is still followed, and the process stops after the interaction is completed. Cause: The options and branch connections were not checked one by one, or the same session repeatedly entered the interaction.

## How to verify the setup

Acceptance of this feature: run a trial for each option one by one, check the branch direction and interaction state in the run records, confirm that each option corresponds to one branch and that the selection result variable has been passed to subsequent nodes, and review by referencing `variables` and `nodeId` in subsequent nodes.

Business test: use one week of records to verify the total, and see whether the scope and exceptions are clearly written.

- Check the options and branch connections one by one in the node, and trigger one check of the node status in the run records
- Use one week of records to verify the total, check item by item whether the header scope and exception notes are clearly written, and reference the selection result variable in subsequent nodes and run a trial once
