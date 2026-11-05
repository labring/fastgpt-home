---
title: Workflow Orchestration for Peer Review Organization: Track Progress and Check Statistics
slug: /en/industry/education-d006-c067-f008
page_type: 行业问题页
application_area: education
meta_title: Peer Review | Workflows | Progress
meta_description: Peer Review: review workflows for progress tracking. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Peer Review Organization: Track Progress and Check Statistics

## What this category's data looks like

This page is for peer review organizations. The materials come from three types of records: review invitations, expert review comments, and author revision notes, updated weekly or monthly. Review invitations contain the manuscript title, invitation date, and expert confirmation status; expert review comments contain the comment body, submission date, and signature; author revision notes contain point-by-point responses, revision dates, and receipts. The three types of materials play different roles when entering workflow orchestration: review invitations are used to verify the invitation and confirmation nodes, expert review comments are used to verify the comment submission and signature nodes, and author revision notes are used to verify the revision and receipt nodes. Field characteristics are concentrated in four categories: name, quantity, date, and signature, and the update rhythm is synchronized with review rounds.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branches), outputting branch directions and interaction status records. The "progress table and statistical criteria description" is continued and completed by subsequent nodes according to the branch. When a node is triggered, the conversation enters an interaction state and records the workflow status. After the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Review invitation | Fields include manuscript title, invitation date, and expert confirmation status; the date and signature must be consistent with the expert review comments | Check the options and branch connections one by one in the node, trigger once to view the node status in the run record, and reference the selection result variable in a subsequent node and do a trial run |
| Expert review comments | Fields include the comment body, submission date, and signature; the name, quantity, and date of the same record must match the review invitation | Check whether the comment submission date and signature are complete, check whether the version is synchronized, and verify the branch direction corresponding to `nodeId` in the run record |
| Author revision notes | Fields include point-by-point responses, revision dates, and receipts; missing signatures or receipts are treated as exceptions and written into the header | Check whether the revision dates and receipts are complete, and check whether the name and quantity of the same record are consistent across the two materials |
| Progress table and statistical criteria description | The header must state the statistical criteria and exceptions, and the number of records must match the statistical count | Use one week of records to check the totals, check whether the criteria and exceptions are clearly stated, and verify the `variables` reference results in the run record |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the review invitation and the expert review comments. Cause: The two materials are maintained separately and are not checked against the same manuscript number and date criteria.
- Symptom: The version of the author revision notes is not synchronized, and revision dates and receipts are missing. Cause: The revised manuscript and receipt are sent separately, and the interaction status and selection result are not recorded in the node branch.
- Symptom: After selecting an option, the default branch is still followed, and the process stops after the interaction is completed. Cause: The options and branch connections were not checked one by one, or repeated entry into the interaction in the same session was not recorded as a status.

## How to verify the setup

Acceptance for this feature: trial run each option one by one, check the branch direction and interaction status in the run record, confirm that options and branches correspond one to one, and check whether `nodeId` and `variables` are passed as expected.

Business test: use one week of records to check the totals, see whether the criteria and exceptions are clearly stated, confirm that the number of records matches the statistical count, and state the statistical criteria and exceptions in the header.

- Check the options and branch connections one by one in the node, trigger once to view the node status in the run record, and confirm that the interaction status is recorded.
- Reference the selection result variable in a subsequent node and do a trial run, check the branch direction, and confirm that the same session does not repeatedly enter the interaction.
