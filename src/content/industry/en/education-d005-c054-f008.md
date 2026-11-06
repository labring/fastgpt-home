---
title: Workflow Orchestration for Self-Study Exam Records and Graduation Review: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c054-f008
page_type: 行业问题页
application_area: education
meta_title: Self-Study Exams | Workflows | Versions
meta_description: Self-Study Exams: review workflows for version tracking. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Self-Study Exam Records and Graduation Review: Maintain Document Versions and Changes

## What this category's data looks like

This category's data looks like this
Self-taught examination registration records and graduation review involve three types of materials: registration archives, course qualification certificates, and graduation application forms. Registration archives record the candidate's identity, major, and course scores, with fields including name, ID number, major code, qualification date, and handler signature; course qualification certificates are issued by the provincial examination office, with fields including course name, credits, qualification time, and certificate number; graduation application forms are filled out by the candidate and reviewed at two levels by the host institution and the provincial examination office, with fields including major name, intended graduation time, signature, and receipt. The material sources are exports from the provincial examination office system, summaries from host institutions, and candidate submissions, and the update cadence changes with examination periods and review batches. When entering workflow orchestration, the three types of materials respectively serve as the archive ledger, single-subject evidence, and graduation conclusion carrier, and the version ledger needs to cover field-level changes.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branches), outputting branch directions and interaction state records. The "version ledger and change records" are continued and completed by subsequent nodes according to the branches. When the user selection node is triggered, the conversation enters an interactive state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Registration archive | Whether name, ID number, major code, qualification date, and handler signature are consistent between the archive and the qualification certificate | Check the options and branch connections one by one in the node, compare the archive and qualification certificate fields, and record discrepancies |
| Course qualification certificate | Whether course name, credits, qualification time, and certificate number match the score records in the archive | Reference the selection result variable in subsequent nodes and run a trial once, checking whether the `variables` passed value points to the correct material |
| Graduation application form | Whether major name, intended graduation time, two-level signatures, and receipt are complete and consistent with the archive | Trigger an interaction once, view the node status and `nodeId` in the run record, and confirm that the signature and receipt fields have been synchronized |
| Version ledger | Whether the current version is unique, old versions are traceable, and references are synchronized | After changing one field, check whether the version number and references are updated synchronously, and check whether old version records are retained |

## Three common errors

- Symptom: The course name, count, or date of the same record does not match between the registration archive and the course qualification certificate. Cause: The two materials are entered in different steps, lacking field-level comparison and a unified version baseline.
- Symptom: The graduation application form has been updated, but external documents referencing that form still show the old version content. Cause: The version was not synchronized, references were not refreshed with the current version, and the old version and current version coexist.
- Symptom: The graduation application form lacks the signature of the host institution or the provincial examination office, and the receipt has not been returned. Cause: After the interaction is completed, the process stops, or a certain option was selected but the default branch was still taken, and subsequent nodes did not continue execution.

## How to verify the setup

Acceptance for this feature: run trials for each option one by one, check the branch direction and interaction state in the run record, and confirm that each option corresponds to one branch and that the selection result variable has been passed to subsequent nodes.

Business test: change one piece of content, see whether the version number and references are updated synchronously, and check whether the old version is traceable and whether the reference text's tokens and array item count are recorded separately.

- Check the options and branch connections one by one in the node, confirm that each option corresponds to one branch, and check whether the `nodeId` and `variables` references are correct.
- Trigger a user selection once, view the node status in the run record, and confirm that the process continues after the interaction is completed and does not re-enter the interaction.
