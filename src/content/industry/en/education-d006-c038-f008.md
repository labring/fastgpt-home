---
title: Workflow Orchestration for Continuing Education Training Hour Recognition: Track Progress and Check Statistics
slug: /en/industry/education-d006-c038-f008
page_type: 行业问题页
application_area: education
meta_title: Continuing Education | Workflows | Progress
meta_description: Continuing Education: review workflows for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Continuing Education Training Hour Recognition: Track Progress and Check Statistics

## What this category's data looks like

Continuing education credit recognition involves three types of materials: course filing forms, study certificates, and credit recognition forms. The course filing form is submitted by the training institution before the class starts, with fields including course name, number of class hours, start and end dates, and instructor signature; its update cadence is filing by class session. The study certificate is obtained by the learner after completing the study, with fields including learner, course name, completion date, and institution seal or receipt. The credit recognition form is compiled by the recognizing unit, with fields including recognized credit hours, recognition date, and reviewer signature. When these three types of materials enter the workflow, the course filing form provides the course and class-hour baseline, the study certificate provides the individual completion fact, and the credit recognition form handles aggregation and signature confirmation. The names, quantities, and dates of the three must be aligned item by item; version synchronization and complete signature receipts are the prerequisites for subsequent statistical verification.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction status records. When the user selection node is triggered, the conversation enters an interactive state and records the workflow status; after the user completes the selection, execution continues along the branch corresponding to the selected option. The progress table and statistical scope description are completed by subsequent nodes continuing execution according to the branch.

| Object | Check | Verification action |
| --- | --- | --- |
| Course filing form | Whether the course name, number of class hours, start and end dates, and instructor signature are consistent with the study certificate | Compare the course name and number of class hours item by item, check the start and end dates and signature field, and review the branch direction and `nodeId` in the node run record |
| Study certificate | Whether the learner, course name, completion date, and institution seal or receipt are complete | Check the learner name and course name, check the completion date and seal, reference `variables` in subsequent nodes, and run a trial once |
| Credit recognition form | Whether the recognized credit hours, recognition date, and reviewer signature align with the filing form and certificate | Check the total recognized credit hours against the item-by-item records, check the recognition date and reviewer signature, and review whether the interaction status is recorded as parsed |
| Progress table and statistical scope description | Whether the record count matches the statistical count, whether the scope is written in the header, and whether exceptions are clearly stated | Use one week of records to verify the total, check the header scope and exception notes, and check the node status and branch direction |

## Three common errors

- Symptom: The name and number of class hours for the same course do not match between the filing form and the study certificate. Cause: The two materials were entered separately, were not checked item by item against unified fields, and versions were not synchronized.
- Symptom: The study certificate lacks an institution seal or receipt, but it has already been counted in the recognition form. Cause: The signature and receipt were not checked during the material collection step, and it went directly into aggregation.
- Symptom: After selecting an option, the default branch is still followed, or the process stops after the interaction is completed. Cause: The options and branch connections were not checked one by one, and the selection result variable was not passed to subsequent nodes.

## How to verify the setup

Acceptance for this feature: run trials for each option one by one, check the branch direction and interaction status in the run record, confirm that each option corresponds to one branch, that `variables` has been passed to subsequent nodes, that the node status is recorded as parsed, and that `nodeId` corresponds to the branch direction.

Business test: use one week of records to verify the total, check whether the scope and exceptions are clearly stated, and check whether the record count matches the statistical count.

- In the node, check the options and branch connections one by one, trigger once, and then review the node status and branch direction in the run record.
- Reference the selection result variable in subsequent nodes and run a trial once, use one week of records to verify the total, and check the header scope and exception notes.
