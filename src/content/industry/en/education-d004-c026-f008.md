---
title: Workflow Orchestration for Degree Awards and Certificate Information Reporting: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c026-f008
page_type: 行业问题页
application_area: education
meta_title: Degree Certificates | Workflows | Handover
meta_description: Degree Certificates: review workflows for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Degree Awards and Certificate Information Reporting: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This category's data covers three types of materials: degree application forms, thesis review forms, and defense resolutions. The sources are the training unit and the defense committee, and the update cadence advances with the review, defense, and degree committee milestones. The degree application form records applicant information, courses, and achievements; the thesis review form carries review opinions and conclusions; the defense resolution fixes the defense time, voting results, and signatures. The three types of materials play different roles when entering the workflow: the degree application form serves as the foundational data source, the thesis review form serves as the review basis, and the defense resolution serves as the final conclusion evidence. Field characteristics center on name, student ID, thesis title, date, signature, and receipt. The same record must keep names, quantities, and dates consistent across the three materials, and only when versions and signatures are complete can it enter the reporting stage.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. "Signable material drafts and handover records" are then completed by subsequent nodes continuing execution along the branch. When the user selection node is triggered, the conversation enters an interaction state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Degree application form | Fields complete, responsible person clear, version and date consistent | Check name, student ID, thesis title, date, and signature item by item; use `variables` to compare the name and quantity of the same record across two materials |
| Thesis review form | Review opinions, conclusions, date, and signature complete | Check whether the review conclusion corresponds to the voting result in the defense resolution; check for unsynchronized versions and missing signatures or receipts |
| Defense resolution | Defense time, voting result, signature, and receipt consistent | Check that the defense date is consistent with the date on the degree application form; confirm the receipt has been signed for; record the branch direction corresponding to `nodeId` |
| Handover record | Responsible person clear, version and date consistent | Draft one according to the template and complete one handover; check whether missing items are blocked |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the degree application form and the defense resolution. Cause: The two were entered separately, without field comparison and version synchronization.
- Symptom: The version of the thesis review form is not synchronized, and the review conclusion is inconsistent with the voting result in the defense resolution. Cause: The materials were not written back after updating, and the version and date were not checked during handover.
- Symptom: The defense resolution lacks a signature or receipt, and the report is returned. Cause: The handover step did not check the signature and receipt, and the responsible person did not confirm at the node.

## How to verify the setup

Feature acceptance: Try running each option, check the branch direction and interaction state in the run record, confirm that the selection result variable has been passed to subsequent nodes via `variables`, and record the branch corresponding to `nodeId`.

Business test: Draft one according to the template and complete one handover; see whether missing items are blocked.

- Check the options and branch connections one by one in the node, trigger once, and view the node status in the run record
- Reference the selection result variable in a subsequent node and run it once to confirm that after selecting a certain option it follows the corresponding branch and does not follow the default branch
