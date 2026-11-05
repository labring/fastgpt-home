---
title: Workflow Orchestration for School Moral Education and Class Teacher Work: Track Progress and Check Statistics
slug: /en/industry/education-d006-c014-f008
page_type: 行业问题页
application_area: education
meta_title: Pastoral Education | Workflows | Progress
meta_description: Pastoral Education: review workflows for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for School Moral Education and Class Teacher Work: Track Progress and Check Statistics

## What this category's data looks like

This page focuses on progress records and statistical verification for school moral education and homeroom teacher work. The material sources include three categories: thematic class meeting plans, student comprehensive quality records, and home visit records. Thematic class meeting plans are submitted weekly or monthly, containing the activity theme, time, number of participants, and a signature field; student comprehensive quality records are updated per semester or stage, containing fields such as ideological and moral character, academic level, physical and mental health, and the homeroom teacher's signature; home visit records are filled in per visit, containing the home visit date, student name, home visit content, and parent receipt. After these materials enter the workflow, each assumes a different role: thematic class meeting plans correspond to activity progress and attendance statistics, student comprehensive quality records correspond to stage evaluations and summaries, and home visit records correspond to the number of home-school contacts and feedback verification. In terms of update rhythm, class meeting plans and home visit records are mostly updated weekly, while comprehensive quality records are updated monthly or per semester. In terms of field characteristics, dates, names, quantities, signatures, and receipts are the key points for verification. It often happens that the same record has mismatched names, quantities, or dates across two materials, versions are not synchronized, or signatures or receipts are missing.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction status records. The "Progress Table and Statistical Caliber Description" is continued and completed by subsequent nodes according to the branch. When the user selection node is triggered, the conversation enters an interactive state and records the workflow status. After the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Thematic class meeting plan | Fields include theme, date, number of participants, signature; check whether the name, quantity, and date are consistent with the weekly report | Check the options and branch connections one by one in the node, and reference `variables` and `nodeId` to view the branch direction |
| Student comprehensive quality record | Fields include ideological and moral character, academic level, physical and mental health, homeroom teacher signature; check whether the date and signature are complete | Trigger once, view the node status in the run record, and check whether the `variables` referenced by subsequent nodes take effect |
| Home visit record | Fields include home visit date, student name, home visit content, parent receipt; check whether the receipt and date match | Reference the selection result variable in a subsequent node and run a trial once to confirm the branch direction and interaction status record |
| Progress table and statistical caliber description | The caliber is written in the header, and the number of records matches the statistical number; check whether exceptions are clearly stated | Use one week of records to verify the total, see whether the caliber and exceptions are clearly stated, and check the branch corresponding to `nodeId` |

## Three common errors

- Phenomenon: The same record has mismatched names, quantities, or dates across two materials. Cause: Thematic class meeting plans and comprehensive quality records are filled in independently, without unified calibers and verification nodes.
- Phenomenon: Versions are not synchronized, and old-version class meeting plans are mixed with new-version home visit records. Cause: The materials have different update rhythms, and the workflow does not distinguish versions and times by branch.
- Phenomenon: Signatures or receipts are missing, making it impossible to confirm the validity of records during statistics. Cause: Home visit records and class meeting plans do not have signature and receipt verification steps, and the interaction status is not fully recorded.

## How to verify the setup

Acceptance of this feature: Run trials for each option one by one, check the branch direction and interaction status in the run record, confirm that each option corresponds to one branch, the selection result variable has been passed to subsequent nodes, and `variables` and `nodeId` can be checked.

Business test: Use one week of records to verify the total, see whether the caliber and exceptions are clearly stated, whether the number of records matches the statistical number, and whether the caliber is written in the header.

- Check the options and branch connections one by one in the node, trigger once to view the node status in the run record, and confirm that the process continues after the interaction is completed.
- Reference the selection result variable in a subsequent node and run a trial once, check the correspondence between `variables` and `nodeId`, and confirm that the branch direction and interaction status record are complete.
