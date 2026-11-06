---
title: Workflow Orchestration for Research Project Annual Progress and Acceptance: Track Progress and Check Statistics
slug: /en/industry/education-d006-c060-f008
page_type: 行业问题页
application_area: education
meta_title: Research Progress | Workflows | Progress
meta_description: Research Progress: review workflows for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Research Project Annual Progress and Acceptance: Track Progress and Check Statistics

## What this category's data looks like

This page addresses the scenario of annual progress and acceptance of research projects. The material sources are three types of documents—annual progress reports, mid-term review materials, and acceptance reports—along with the supporting progress record working papers. The update cadence is weekly recording, monthly aggregation, and submission by milestone. Annual progress reports focus on the completion status of phase tasks and resource investment; mid-term review materials focus on indicator comparison and deviation explanations; acceptance reports focus on the results list and signed receipts. When these three types of materials enter workflow orchestration, each plays a different role: annual progress reports provide the progress baseline, mid-term review materials provide the verification criteria, and acceptance reports provide the final confirmation basis. Field characteristics are concentrated in names, quantities, dates, signatures, and receipts. The same record must keep fields consistent across the three materials, and the latest submitted draft prevails as the version.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction status records. The "Progress Table and Statistical Criteria Description" is continued and completed by subsequent nodes according to the branch. When a node is triggered, the conversation enters an interactive state and the workflow status is recorded. After the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Annual progress report | Whether fields, dates, and signatures are consistent with the working papers | Compare names, quantities, and dates one by one; check the signature column and receipts; reference `variables` to record discrepancies |
| Mid-term review materials | Whether the name, quantity, and date of the same record match between the report and the review materials | Cross-check by record number; check whether versions are synchronized; use `nodeId` to locate the branch source |
| Acceptance report | Whether the results list and signed receipts are complete | Check the acceptance conclusion and attachment list; check for missing signatures or receipt items; record exception explanations |
| Progress table and statistical criteria description | Whether the record count matches the statistical count and whether the criteria are written in the header | Use weekly records to verify the totals; check whether the criteria and exceptions are clearly stated; reference `variables` to leave an audit trail |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the annual progress report and the mid-term review materials. Cause: The two materials are maintained separately, without cross-checking and version synchronization.
- Symptom: The acceptance report is missing signatures or receipts, and the materials are returned. Cause: The signature step was not included in the progress records, and receipts were not archived together with the materials.
- Symptom: After selecting an option, the default branch is still followed, and the process stops after the interaction is completed. Cause: The options and branch connections were not checked one by one, and the selection result variable was not passed to subsequent nodes.

## How to verify the setup

This feature acceptance: Try running each option one by one, check the branch direction and interaction status in the run records, and confirm that options correspond one-to-one with branches and that the selection result variable has been passed to subsequent nodes.

Business testing: Use weekly records to verify the totals, see whether the criteria and exceptions are clearly stated, and check whether the record count matches the statistical count and whether the criteria are written in the header.

- In the node, check the options and branch connections one by one, and trigger once to view the node status in the run records.
- Reference the selection result variable in a subsequent node and run it once to check whether the same session repeatedly enters the interaction.
