---
title: Workflow Orchestration for Degree Awards and Certificate Information Reporting: Track Progress and Check Statistics
slug: /en/industry/education-d006-c026-f008
page_type: 行业问题页
application_area: education
meta_title: Degree Certificates | Workflows | Progress
meta_description: Degree Certificates: review workflows for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Degree Awards and Certificate Information Reporting: Track Progress and Check Statistics

## What this category's data looks like

This page addresses the degree conferral and certificate information reporting scenario. The materials come from three types of paper or electronic forms: degree application forms, thesis review forms, and defense resolutions, updated weekly or monthly. The degree application form carries the applicant's basic information, discipline direction, and the proposed degree category to be conferred, and is the starting point for record counts and statistical counts; the thesis review form provides the review conclusion, review date, and reviewer signature, and is used to check whether the name and date of the same record are consistent; the defense resolution records the defense conclusion, voting result, and chair signature, and is the basis for determining whether the record enters the reporting scope. After the three types of materials enter the workflow, they respectively take on the roles of field source, date corroboration, and signature receipt. The progress table and statistical scope description need to align the names, quantities, and dates of the three item by item, and write exceptional situations into the table header.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. The "progress table and statistical scope description" is then completed by subsequent nodes continuing execution according to the branch. When a node is triggered, the conversation enters an interaction state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Degree application form | Whether the fields, dates, and signatures are consistent with the thesis review form | Check the options and branch connections one by one in the node, trigger once and then view the node status in the run records, and reference `variables` and `nodeId` in a subsequent node to do a trial run |
| Thesis review form | Whether the review conclusion, review date, and reviewer signature are complete | Compare the name, quantity, and date of the same record in the degree application form and the defense resolution; list separately any that lack a signature or receipt |
| Defense resolution | Whether the defense conclusion, voting result, and chair signature are aligned with the statistical scope | Use one week of records to check the totals, check whether the scope and exceptions are written into the table header, and confirm that the branch direction is consistent with the interaction state records |
| Progress table and statistical scope description | Whether the record counts and statistical counts match, and whether the scope is written into the table header | Summarize weekly or monthly, check the totals against the item-by-item records, and confirm that exceptional situations have been noted |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the degree application form and the thesis review form. Cause: The two materials are entered separately, and no field-level comparison is done in the node.
- Symptom: The version is not synchronized, and the defense resolution still uses the old review conclusion. Cause: After the materials are updated, the interaction state is not re-triggered, and the branch still follows the default path.
- Symptom: A signature or receipt is missing, but the statistical count is still included in the total. Cause: The scope is not written into the table header, and exceptional situations are not marked separately in the progress table.

## How to verify the setup

This feature's acceptance: run a trial for each option one by one, check the branch direction and interaction state in the run records, and confirm that `variables` has been passed to subsequent nodes and that `nodeId` corresponds correctly.

Business test: use one week of records to check the totals, and see whether the scope and exceptions are clearly written.

- Check the options and branch connections one by one in the node, trigger once and then view the node status in the run records.
- Reference the selection result variable in a subsequent node and do a trial run once, confirming that the branch direction is consistent with the interaction state records.
